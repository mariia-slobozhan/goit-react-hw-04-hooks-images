import { Component } from "react";
import PropTypes from "prop-types";
import s from "./Button.module.css";

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className={s.button}>
        Load more
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  onBtnClick: PropTypes.func,
};
