"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

interface AdminContextValue {
  isAdmin: boolean;
  /** False until the refresh-cookie check on first load has finished. */
  ready: boolean;
  /** Authenticated API call for the back-office pages; retries once after a token refresh. */
  apiFetch: (path: string, init?: RequestInit) => Promise<Response>;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  saveContent: (key: string, value: string) => Promise<boolean>;
  patchItem: (collection: string, id: string, patch: Record<string, unknown>) => Promise<boolean>;
  createItem: (collection: string, body: Record<string, unknown>) => Promise<boolean>;
  deleteItem: (collection: string, id: string) => Promise<boolean>;
  uploadImage: (file: File) => Promise<string | null>;
  notify: (message: string) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside <AdminProvider>");
  return ctx;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const tokenRef = useRef<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const tryRefresh = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) return false;
      const json = (await res.json()) as { data: { access_token: string } };
      tokenRef.current = json.data.access_token;
      setIsAdmin(true);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Restore the session from the refresh cookie on first load.
  useEffect(() => {
    void tryRefresh().finally(() => setReady(true));
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [tryRefresh]);

  const authFetch = useCallback(
    async (path: string, init: RequestInit): Promise<Response> => {
      const doFetch = () =>
        fetch(`${API_URL}${path}`, {
          ...init,
          headers: {
            ...(init.headers ?? {}),
            ...(tokenRef.current ? { Authorization: `Bearer ${tokenRef.current}` } : {}),
          },
        });
      let res = await doFetch();
      if (res.status === 401) {
        if (await tryRefresh()) {
          res = await doFetch();
        } else {
          setIsAdmin(false);
          setEditMode(false);
        }
      }
      return res;
    },
    [tryRefresh],
  );

  // Stable identity, so back-office pages can list it as an effect dependency.
  const apiFetch = useCallback(
    (path: string, init: RequestInit = {}) => authFetch(path, init),
    [authFetch],
  );

  // After a successful save: purge the ISR cache, then re-render server
  // components so every visitor (and this page) sees the new content.
  const refreshData = useCallback(async () => {
    try {
      await fetch("/api/revalidate", { method: "POST" });
    } catch {
      // best effort — ISR expires on its own within a minute
    }
    router.refresh();
  }, [router]);

  const mutate = useCallback(
    async (path: string, init: RequestInit, successMsg: string): Promise<boolean> => {
      try {
        const res = await authFetch(path, init);
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as {
            error?: { message?: string };
          } | null;
          showToast(body?.error?.message ?? "Gagal menyimpan");
          return false;
        }
        showToast(successMsg);
        void refreshData();
        return true;
      } catch {
        showToast("Tidak bisa terhubung ke server");
        return false;
      }
    },
    [authFetch, refreshData, showToast],
  );

  const value: AdminContextValue = {
    isAdmin,
    ready,
    apiFetch,
    editMode,
    setEditMode,
    notify: showToast,
    login: async (username, password) => {
      try {
        const res = await fetch(`${API_URL}/api/v1/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const json = (await res.json().catch(() => null)) as {
          data?: { access_token: string };
          error?: { message?: string };
        } | null;
        if (!res.ok || !json?.data) {
          return json?.error?.message ?? "Login gagal";
        }
        tokenRef.current = json.data.access_token;
        setIsAdmin(true);
        setEditMode(true);
        return null;
      } catch {
        return "Tidak bisa terhubung ke server";
      }
    },
    logout: async () => {
      try {
        await fetch(`${API_URL}/api/v1/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch {
        // clearing local state is what matters
      }
      tokenRef.current = null;
      setIsAdmin(false);
      setEditMode(false);
    },
    saveContent: (key, val) =>
      mutate(
        `/api/v1/content/${key}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: val }),
        },
        "Tersimpan ✓",
      ),
    patchItem: (collection, id, patch) =>
      mutate(
        `/api/v1/${collection}/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        },
        "Tersimpan ✓",
      ),
    createItem: (collection, body) =>
      mutate(
        `/api/v1/${collection}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
        "Ditambahkan ✓",
      ),
    deleteItem: (collection, id) =>
      mutate(`/api/v1/${collection}/${id}`, { method: "DELETE" }, "Dihapus ✓"),
    uploadImage: async (file) => {
      const form = new FormData();
      form.append("file", file);
      try {
        const res = await authFetch("/api/v1/images", { method: "POST", body: form });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as {
            error?: { message?: string };
          } | null;
          showToast(body?.error?.message ?? "Upload gagal");
          return null;
        }
        const json = (await res.json()) as { data: { url: string } };
        return json.data.url;
      } catch {
        showToast("Tidak bisa terhubung ke server");
        return null;
      }
    },
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
      {isAdmin && <AdminBar />}
      {toast && (
        <div className="fixed bottom-24 left-5 z-[70] rounded-full bg-espresso px-5 py-2.5 text-sm text-ivory shadow-lg">
          {toast}
        </div>
      )}
    </AdminContext.Provider>
  );
}

function AdminBar() {
  const { editMode, setEditMode, logout } = useAdmin();
  return (
    <div className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 rounded-full bg-espresso/95 p-2 pl-4 text-ivory shadow-xl backdrop-blur">
      <Link
        href="/admin"
        className="text-xs tracking-[1.5px] uppercase underline-offset-4 hover:underline"
      >
        Admin
      </Link>
      <button
        type="button"
        onClick={() => setEditMode(!editMode)}
        className={`cursor-pointer rounded-full px-4 py-2 text-xs tracking-[1px] uppercase transition-colors ${
          editMode ? "bg-copper text-ivory" : "bg-ivory/15 text-ivory hover:bg-ivory/25"
        }`}
      >
        {editMode ? "Mode Edit: ON" : "Mode Edit: OFF"}
      </button>
      <button
        type="button"
        onClick={() => void logout()}
        className="cursor-pointer rounded-full bg-ivory/15 px-4 py-2 text-xs tracking-[1px] uppercase transition-colors hover:bg-ivory/25"
      >
        Keluar
      </button>
    </div>
  );
}
