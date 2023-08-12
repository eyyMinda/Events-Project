import css from "./styles/error-alert.module.css";

function ErrorAlert(props) {
  return <div className={css.alert}>{props.children}</div>;
}

export default ErrorAlert;
