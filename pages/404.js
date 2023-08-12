import { Fragment } from "react";
import ErrorAlert from "@/components/events/error-alert/error-alert";
import Button from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <Fragment>
      <ErrorAlert>
        <p>Page Not Found</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events/">Browse All Events</Button>
      </div>
    </Fragment>
  );
}
