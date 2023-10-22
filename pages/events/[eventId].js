import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";

import Head from "next/head";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/events/error-alert/error-alert";
import EventSummary from "@/components/events/event-details/event-summary";
import EventContent from "@/components/events/event-details/event-content";
import EventLogistics from "@/components/events/event-details/event-logistics";
import Comments from "@/components/input/comments";

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
    const { id, title, location, date, image, description } = props.event;

    return (
      <Fragment>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>

        <EventSummary title={title} />
        <EventLogistics
          date={date}
          location={location}
          image={image}
          imageAlt={title.split(' ').join('-')}
        />
        <EventContent>
          <p>{description}</p>
        </EventContent>
        <Comments eventId={id} />
      </Fragment>
    );
  }
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId) || null;

  return { props: { event }, revalidate: 60 };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return { paths, fallback: true };
}
