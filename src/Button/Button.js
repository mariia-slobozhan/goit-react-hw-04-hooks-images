import PropTypes from "prop-types";
import s from "./Button.module.css";

export default function Button({ onClick }) {
  return (
    <button onClick={onClick} type="button" className={s.button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onBtnClick: PropTypes.func,
};
