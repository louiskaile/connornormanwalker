import type { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import {
  JOURNAL_POST_QUERY,
  JOURNAL_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { defaultJournalPosts } from "../stories.ts";

export type JournalImage = {
  _key?: string;
  _type?: "image";
  asset?: { _ref?: string; _type?: "reference" };
  alt?: string;
  caption?: string;
};

export type JournalPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: JournalImage;
  content?: Parameters<typeof PortableText>[0]["value"];
};

type TextBlock = {
  _type: string;
  children?: Array<{ text?: string }>;
};

function getLeadText(content: JournalPost["content"]) {
  if (!Array.isArray(content)) return undefined;

  const firstTextBlock = content.find((block) =>
    Boolean(
      block &&
        typeof block === "object" &&
        "_type" in block &&
        block._type === "block" &&
        "children" in block &&
        Array.isArray(block.children),
    ),
  ) as TextBlock | undefined;
  const text = firstTextBlock?.children
    ?.map((child) => child.text || "")
    .join("")
    .trim();

  return text || undefined;
}

export async function getStoryStaticParams() {
  const posts = await client
    .fetch<Array<{ slug: string }>>(JOURNAL_POSTS_QUERY)
    .catch(() => []);
  return (posts.length ? posts : defaultJournalPosts).map(({ slug }) => ({
    slug,
  }));
}

export async function getStory(slug: string) {
  const post = await client
    .fetch<JournalPost | null>(JOURNAL_POST_QUERY, { slug })
    .catch(() => null);
  const fallbackPost = defaultJournalPosts.find((entry) => entry.slug === slug);
  if (!post && !fallbackPost) return null;

  const title = post?.title || fallbackPost!.title;
  const content = Array.isArray(post?.content)
    ? post.content
    : post?.content
      ? [post.content]
      : [];
  const heroImage = post?.coverImage?.asset ? post.coverImage : undefined;

  return {
    content,
    excerpt: post?.excerpt?.trim() || getLeadText(content),
    heroImage,
    title,
  };
}
