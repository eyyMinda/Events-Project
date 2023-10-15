import { Fragment } from "react";
import { useRouter } from "next/router";
import { getFeaturedEvents, getFilteredEvents } from "@/helpers/api-util";

import ErrorAlert from "@/components/events/error-alert/error-alert";
import Button from "@/components/ui/button";
import EventList from "@/components/events/event-list/eventList";
import ResultsTitle from "@/components/events/events-search/results-title";

export default function FilteredEventsPage(props) {
  const router = useRouter();
  const dataFilter = router.query.eventsSlug;
  // Loading Filter Route
  if (!dataFilter) {
    return <ErrorAlert>Loading...</ErrorAlert>;
  }

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events/">Browse All Events</Button>
        </div>
      </Fragment>
    );
  }

  const { events, date } = props;

  // Check if Events exist based on Filter
  if (!events[0]) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Unfortunately, no events are happing at this time.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events/">Browse All Events</Button>
        </div>
      </Fragment>
    );
  } else {
    const currentDate = new Date(date.year, date.month - 1);

    return (
      <Fragment>
        <ResultsTitle date={currentDate} />
        <EventList events={events} />
      </Fragment>
    );
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  const [year, month] = params.eventsSlug.map(Number);

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: { hasError: true }
    }
  }
  const events = await getFilteredEvents({ year, month });

  return { props: { events, date: { year, month } } };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(event => {
    const [year, month] = event.date.split('-');

    return { params: { eventsSlug: [year, month] } };
  });

  return { paths, fallback: true };
}