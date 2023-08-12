import Link from "next/link";
import css from "./styles/mainHeader.module.css";
import { getHeaderRoutes } from "@/dummy-data";

export default function MainHeader(props) {
  const headerRoutes = getHeaderRoutes();
  const pathname = headerRoutes[0].pathname;
  const detailsPageRoute = headerRoutes[1];
  const filteredPage = headerRoutes[2];

  return (
    <ul className={css.header}>
      <li className={css.navigation}>
        <Link href="/">Home</Link>
      </li>

      <li className={css.navigation}>
        <Link href={pathname}>Events</Link>
      </li>

      <li className={css.navigation}>
        <Link href={pathname + detailsPageRoute.id}>
          Event Details ({detailsPageRoute.name})
        </Link>
      </li>

      <li className={css.navigation}>
        <Link
          href={{
            pathname: filteredPage.pathname,
            query: { year: filteredPage.year, month: filteredPage.month },
          }}>
          Filtered Events Page
        </Link>
      </li>
    </ul>
  );
}
