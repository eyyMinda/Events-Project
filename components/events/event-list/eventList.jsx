import EventItem from "./eventItem";
import css from "./styles/eventList.module.css";

export default function EventList(props) {
  const { events } = props;

  return (
    <ul className={css.list}>
      {events.map(event => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}
