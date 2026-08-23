import { client } from "@/sanity/lib/client";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";

export type NavigationItem = { _key: string; label: string; url: string };

const defaultItems: NavigationItem[] = [
  { _key: "stories", label: "Stories", url: "/stories" },
  { _key: "gallery", label: "Gallery", url: "/gallery" },
  { _key: "about", label: "About", url: "/about" },
  { _key: "contact", label: "Contact", url: "/contact" },
];

export async function getNavigationItems() {
  const items = await client
    .fetch<NavigationItem[]>(NAVIGATION_QUERY)
    .catch(() => []);
  return items?.length ? items : defaultItems;
}
