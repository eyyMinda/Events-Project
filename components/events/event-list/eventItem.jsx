import css from "./styles/eventItem.module.css";
import Image from "next/image";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import AddressIcon from "@/components/icons/address-icon";
import DateIcon from "@/components/icons/date-icon";
import Button from "@/components/ui/button";

export default function EventItem(props) {
  const { title, image, date, location, id } = props.event;
  const imageAlt = title?.split(" ").join("-") || "event-img";

  const readableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={css.item}>
      <Image
        className={css.skeleton}
        src={"/" + image}
        width={250}
        height={160}
        alt={imageAlt}
      />
      <div className={css.content}>
        <div>
          <h2>{title}</h2>
          <div className={css.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={css.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className={css.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={css.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
