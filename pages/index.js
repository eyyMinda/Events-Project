import Link from "next/link";
import css from '../components/layout/styles/mainHeader.module.css';

import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/eventList";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  const specificRoutes = [
    { id: 'e2', name: 'Networking For Introverts' }
  ]
  const pathname = '/events/';

  return (
    <div>
      <ul className={css.header}>
        <li className={css.navigation}>
          <Link href={{
            pathname
          }}>Events</Link>
        </li>
        <li className={css.navigation}>
          <Link href={{
            pathname: pathname + '[id]',
            query: { id: specificRoutes[0].id }
          }}>Event Details Page ({specificRoutes[0].name})</Link>
        </li>
        <li className={css.navigation}>
          <Link href={{
            pathname: pathname + '[year]/' + '[month]',
            query: { year: '2023', month: '8' }
          }}>Filtered Events Page</Link>
        </li>
      </ul>

      <EventList events={...featuredEvents} />
    </div>
  )
}
