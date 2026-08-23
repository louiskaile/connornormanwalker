import { client } from "@/sanity/lib/client";
import { CONTACT_PAGE_QUERY } from "@/sanity/lib/queries";

export type ContactDetail = { _key: string; label: string; url: string };
type ContactPageData = { contactDetails?: ContactDetail[] };

const defaultContactDetails: ContactDetail[] = [
  { _key: "email", label: "hello@cnw.com", url: "mailto:hello@cnw.com" },
  {
    _key: "instagram",
    label: "@connornormanwalker",
    url: "https://www.instagram.com/connornormanwalker/",
  },
  { _key: "phone", label: "07894063222", url: "tel:07894063222" },
];

export async function getContactDetails() {
  const page = await client
    .fetch<ContactPageData>(CONTACT_PAGE_QUERY)
    .catch(() => null);
  return page?.contactDetails?.length
    ? page.contactDetails
    : defaultContactDetails;
}
