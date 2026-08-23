import { client } from "@/sanity/lib/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";

export type AboutLink = { _key?: string; label: string; url: string };
type AboutPageData = {
  page?: {
    title?: string;
    intro?: string;
    contactLinks?: AboutLink[];
    newsletterHeading?: string;
    newsletterFields?: string[];
    creditHeading?: string;
    creditLink?: AboutLink;
  };
};

const defaultIntroduction =
  "Earlier this summer, we travelled to northern Italy with Artisans of Devizes, one of our most trusted partners in stone. It was a trip built around knowledge, access, and craft: an opportunity to witness the journey of marble from mountain to slab, and to deepen our understanding of the material we so often specify in our projects. We began by the sea, in the quiet elegance of Forte dei Marmi, underfoot, the Apuan Alps rising behind the town—the source of Italy’s most iconic marble just out of sight. Our first evening, spent at the beachfront restaurant Maitò dal 1960, set the tone: local, unfussy, and quietly beautiful.";
const defaultContactLinks: AboutLink[] = [
  {
    _key: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/connornormanwalker/",
  },
  { _key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/" },
  {
    _key: "email",
    label: "hello@connornormanwalker.com",
    url: "mailto:hello@connornormanwalker.com",
  },
  { _key: "phone", label: "07894063222", url: "tel:07894063222" },
];

export async function getAboutPage() {
  const data = await client
    .fetch<AboutPageData>(ABOUT_PAGE_QUERY)
    .catch(() => null);
  return {
    contactLinks: data?.page?.contactLinks?.length
      ? data.page.contactLinks
      : defaultContactLinks,
    creditHeading: data?.page?.creditHeading || "Design and Developed",
    creditLink: data?.page?.creditLink || {
      label: "Louis Kaile",
      url: "https://louiskaile.com/",
    },
    introduction: data?.page?.intro || defaultIntroduction,
    newsletterFields: data?.page?.newsletterFields?.length
      ? data.page.newsletterFields
      : ["First Name", "Last Name", "Email"],
    newsletterHeading: data?.page?.newsletterHeading || "Newsletter",
    title: data?.page?.title || "About",
  };
}
