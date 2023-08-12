import { useRouter } from "next/router";
import { getEventById } from "@/dummy-data";

import Button from "@/components/ui/button";
import ErrorAlert from "@/components/events/error-alert/error-alert";
import EventSummary from "@/components/events/event-details/event-summary";
import EventContent from "@/components/events/event-details/event-content";
import EventLogistics from "@/components/events/event-details/event-logistics";

export default function EventDetailsPage() {
  const router = useRouter();
  const event = getEventById(router.query.eventid);
  // const { id, title, location, date, image } = event;

  if (!event) {
    return (
      <ErrorAlert>
        Unfortunately, the event you are looking for was not found!
        <Button link="/events/">Back to Events</Button>
      </ErrorAlert>
    );
  }

  return (
    <div>
      <h1>Event Details Page</h1>
      <EventContent>
        <EventSummary title={event.title} />
        <EventLogistics event={event} />
      </EventContent>
    </div>
  );
}
