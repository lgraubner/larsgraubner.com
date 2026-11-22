import rss from "@astrojs/rss";
import { getPosts } from "@/lib/posts";

export async function GET() {
  const posts = await getPosts();

  return rss({
    title: "Lars Graubner",
    description:
      "Notes on software architecture, coding agents, and shipping software.",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
