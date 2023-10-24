import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import { api } from "@/helpers/api-util";
import { transformObjToArr } from "@/helpers/utility";

import ErrorAlert from "@/components/events/error-alert/error-alert";
import Button from "@/components/ui/button";
import EventList from "@/components/events/event-list/eventList";
import ResultsTitle from "@/components/events/events-search/results-title";

const fetcher = (...args) =>
  fetch(...args)
    .then(res => res.json())
    .then(data => transformObjToArr(data));

export default function FilteredEventsPage() {
  const [events, setEvents] = useState();
  const dataFilter = useRouter().query.eventsSlug;

  const { data, err, isLoading } = useSWR(api + "events.json", fetcher);
  useEffect(() => data && setEvents(data), [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  )

  // Loading Filter Route
  if (!events || isLoading) {
    return <Fragment>
      {pageHeadData}
      <ErrorAlert>Loading...</ErrorAlert>
    </Fragment>;
  }
  const [year, month] = dataFilter.map(Number);

  // Check if valid Filter
  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    err
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
          {err && <description>{err}</description>}
        </ErrorAlert>
        <div className="center">
          <Button link="/events/">Browse All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = events.filter(e => {
    const eDate = new Date(e.date);
    return eDate.getFullYear() === year && eDate.getMonth() === month - 1;
  });


  // Check if Events exist based on Filter
  if (!filteredEvents || !filteredEvents[0]) {
    pageHeadData = (
      <Head>
        <title>Filtered Events</title>
        <meta name="description" content={`No events are happening at ${month}/${year}`} />
      </Head>
    )
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Unfortunately, no events are happing at this time.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events/">Browse All Events</Button>
        </div>
      </Fragment>
    );
  } else {
    const currentDate = new Date(year, month - 1);
    pageHeadData = (
      <Head>
        <title>Filtered Events | {filteredEvents.length}</title>
        <meta name="description" content={`All events for ${month}/${year}`} />
      </Head>
    )
    return (
      <Fragment>
        {pageHeadData}
        <ResultsTitle date={currentDate} />
        <EventList events={filteredEvents} />
      </Fragment>
    );
  }
}

// Server-Side Rendering for prerendering the pages (cannot work with client fetching simultaneously)
// export async function getServerSideProps(context) {
//   const { params } = context;
//   const [year, month] = params.eventsSlug.map(Number);

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: { hasError: true }
//     }
//   }
//   const events = await getFilteredEvents({ year, month });

//   return { props: { events, date: { year, month } } };
// }