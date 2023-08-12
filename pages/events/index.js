import EventList from "@/components/events/event-list/eventList";
import { getAllEvents } from "@/dummy-data";

export default function EventsPage() {
  const allEvents = getAllEvents();

  return (
    <div>
      <h1>All Events Page Template</h1>

      <EventList events={allEvents} />
    </div>
  );
}
