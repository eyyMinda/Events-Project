import { Fragment } from "react";
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

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Unfortunately, the event you are looking for was not found.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events/">Browse All Events</Button>
        </div>
      </Fragment>
    );
  } else {
    const { title, location, date, image, description } = event;

    return (
      <Fragment>
        <EventSummary title={title} />
        <EventLogistics
          date={date}
          location={location}
          image={image}
          imageAlt={title}
        />
        <EventContent>
          <p>{description}</p>
        </EventContent>
      </Fragment>
    );
  }
}
