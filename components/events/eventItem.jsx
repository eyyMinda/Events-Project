import Link from "next/link";
import css from './styles/eventItem.module.css';
import commonCss from '../layout/styles/button.module.css';


export default function EventItem(props) {
  const { title, image, date, location, id } = props.event;

  const readableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={css.item}>
      <img src={'/' + image} alt={title} />
      <div className={css.content}>
        <div>
          <h2>{title}</h2>
          <div className={css.date}>
            <time>{readableDate}</time>
          </div>
          <div className={css.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className={css.actions}>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  )
}
