import Link from "next/link";
import css from "./styles/button.module.css";

export default function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link} className={css.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button type="button" className={css.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
