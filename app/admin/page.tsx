"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/admin/AdminProvider";

export default function AdminLoginPage() {
  const { login, isAdmin, setEditMode } = useAdmin();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err = await login(username, password);
    setBusy(false);
    if (err) setError(err);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm border border-line bg-cream-card p-8 md:p-10">
        <p className="font-script text-2xl text-copper">Rumarasa Nusantara</p>
        <h1 className="mt-1 font-serif text-3xl font-medium">Masuk Admin</h1>

        {isAdmin ? (
          <div className="mt-6 flex flex-col gap-4">
            <p className="text-[15px] font-light text-cocoa">
              Anda sudah masuk sebagai admin.
            </p>
            <Link
              href="/admin/member"
              className="rounded-full bg-espresso px-8 py-3.5 text-center text-sm tracking-[2px] text-ivory-soft uppercase transition-colors hover:bg-copper"
            >
              Kelola Member
            </Link>
            <Link
              href="/admin/reservasi"
              className="rounded-full bg-espresso px-8 py-3.5 text-center text-sm tracking-[2px] text-ivory-soft uppercase transition-colors hover:bg-copper"
            >
              Kelola Reservasi
            </Link>
            <button
              type="button"
              onClick={() => {
                setEditMode(true);
                router.push("/");
              }}
              className="cursor-pointer rounded-full bg-copper px-8 py-3.5 text-sm tracking-[2px] text-ivory uppercase transition-colors hover:bg-copper-light"
            >
              Buka Mode Edit
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs tracking-[1.5px] text-cocoa uppercase">Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="border border-tan bg-cream px-4 py-3 text-[15px] outline-none focus:border-copper"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs tracking-[1.5px] text-cocoa uppercase">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="border border-tan bg-cream px-4 py-3 text-[15px] outline-none focus:border-copper"
              />
            </label>
            {error && <p className="text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="mt-2 cursor-pointer rounded-full bg-espresso px-8 py-3.5 text-sm tracking-[2px] text-ivory-soft uppercase transition-colors hover:bg-copper disabled:opacity-60"
            >
              {busy ? "Memproses…" : "Masuk"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
