import css from "./styles/event-logistics.module.css";
import Image from "next/image";
import AddressIcon from "@/components/icons/address-icon";
import DateIcon from "@/components/icons/date-icon";

import LogisticsItem from "./logistics-item";

function EventLogistics(props) {
  const { date, location, image, imageAlt } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = location.replace(", ", "\n");

  return (
    <section className={css.logistics}>
      <div className={css.image}>
        <Image src={'/' + image} width={600} height={300} alt={imageAlt || "event-img"} />
      </div>
      <ul className={css.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
