import type { Metadata } from "next";

// Every card URL carries a secret token: keep it out of search engines and
// out of the Referer header sent to other sites.
export const metadata: Metadata = {
  title: "Kartu Member",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-batik flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
