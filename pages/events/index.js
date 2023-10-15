import { Fragment } from "react";
import { getAllEvents } from "@/helpers/api-util";
import EventList from "@/components/events/event-list/eventList";
import EventsSearch from "@/components/events/events-search/eventsSearch";
import { useRouter } from "next/router";

export default function EventsPage(props) {
  const { events } = props;
  const router = useRouter();

  function handleFindEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={handleFindEvents} />
      <EventList events={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return { props: { events }, revalidate: 60 };
}
