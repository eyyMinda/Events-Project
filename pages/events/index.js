import { Fragment } from "react";
import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list/eventList";
import EventsSearch from "@/components/events/events-search/eventsSearch";
import { useRouter } from "next/router";

export default function EventsPage() {
  const allEvents = getAllEvents();
  const router = useRouter();

  function handleFindEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={handleFindEvents} />
      <EventList events={allEvents} />
    </Fragment>
  );
}
