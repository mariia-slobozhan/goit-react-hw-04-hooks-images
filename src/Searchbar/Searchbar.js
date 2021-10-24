import { Component } from "react";
import PropTypes from "prop-types";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import s from "./SearchBar.module.css";

class Searchbar extends Component {
  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.query.trim() === "") {
      toast.warn("Type some request word");
      return;
    }
    this.props.handleFormSubmit(this.state.query);
    this.setState({ query: "" });
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>
              <AiOutlineSearch />
            </span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.string,
};
