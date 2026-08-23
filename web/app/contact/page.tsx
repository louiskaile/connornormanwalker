import { redirect } from "next/navigation";

export default function ContactPage() {
  redirect("/about?view=contact");
}
