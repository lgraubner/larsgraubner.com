import { getCollection } from "astro:content";

// Drafts are visible in dev only.
export async function getPosts() {
  const posts = await getCollection(
    "blog",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { dateStyle: "long" });
}
