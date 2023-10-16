import { getFeaturedEvents } from "@/helpers/api-util";
import EventList from "@/components/events/event-list/eventList";

export default function HomePage(props) {
  return <EventList events={props.events} />;
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();

  return { props: { events, }, revalidate: 60 * 30 };
}