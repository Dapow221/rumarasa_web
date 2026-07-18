import { revalidatePath } from "next/cache";

// Purges the ISR cache for the landing page so admin edits show up on the
// next render instead of waiting out the revalidate window. Cache purging is
// idempotent and non-destructive, so no auth is required.
export function POST() {
  revalidatePath("/");
  return Response.json({ revalidated: true });
}
