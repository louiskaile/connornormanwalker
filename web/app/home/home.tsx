import { getNavigationItems } from "./home.ts";
import { SiteNavigation } from "@/app/components/site-navigation/site-navigation";
import styles from "@/app/components/styles/module/home.module.scss";
import { HomeNavigation } from "./home-navigation";

export default async function HomePage() {
  return (
    <main className={styles.page}>
      <HomeNavigation items={await getNavigationItems()} />
      <SiteNavigation className={styles.siteNavigation} />
    </main>
  );
}
