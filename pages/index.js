import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list/eventList";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return <EventList events={featuredEvents} />;
}
