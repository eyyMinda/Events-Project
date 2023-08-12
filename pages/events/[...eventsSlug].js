import { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "@/dummy-data";

import ErrorAlert from "@/components/events/error-alert/error-alert";
import Button from "@/components/ui/button";
import EventList from "@/components/events/event-list/eventList";
import ResultsTitle from "@/components/events/events-search/results-title";

export default function FilteredEventsPage() {
  const router = useRouter();
  const dataFilter = router.query.eventsSlug;
  // Loading Filter Route
  if (!dataFilter) {
    return <ErrorAlert>Loading...</ErrorAlert>;
  }

  // Check if Valid Filter Route
  const year = +dataFilter[0];
  const month = +dataFilter[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
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

  // Get Filtered Events
  const filteredEvents = getFilteredEvents({ year, month });

  // Check if Events exist based on Filter
  if (!filteredEvents[0]) {
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
    const date = new Date(year, month - 1);

    return (
      <Fragment>
        <ResultsTitle date={date} />
        <EventList events={filteredEvents} />
      </Fragment>
    );
  }
}
