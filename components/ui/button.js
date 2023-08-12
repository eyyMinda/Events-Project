import Link from "next/link";
import css from "./button.module.css";

export default function Button(props) {
  return (
    <Link href={props.link} className={css.btn}>
      {props.children}
    </Link>
  );
}
