import { getFeaturedEvents } from "@/helpers/api-utility";
import EventList from "@/components/events/event-list/eventList";
import NewsletterRegistration from "@/components/input/newsletter-registration";

export default function HomePage(props) {
  return <>
    <EventList events={props.events} />;
    <NewsletterRegistration />
  </>
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();

  return { props: { events, }, revalidate: 60 * 30 };
}