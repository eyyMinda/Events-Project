import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";

import Button from "@/components/ui/button";
import ErrorAlert from "@/components/events/error-alert/error-alert";
import EventSummary from "@/components/events/event-details/event-summary";
import EventContent from "@/components/events/event-details/event-content";
import EventLogistics from "@/components/events/event-details/event-logistics";

export default function EventDetailsPage(props) {
  if (!props.event && props.event !== null) {
    return <ErrorAlert>Loading...</ErrorAlert>;
  } else if (props.event === null) {
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
    const { title, location, date, image, description } = props.event;

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

export async function getStaticProps(context) {
  const eventid = context.params.eventid;
  const event = await getEventById(eventid) || null;

  return { props: { event }, revalidate: 60 };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: { eventid: event.id } }));

  return { paths, fallback: true };
}