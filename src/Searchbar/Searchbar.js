import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import s from "./SearchBar.module.css";

export default function Searchbar({ handleFormSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback((e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (query.trim() === "") {
        toast.warn("Type some request word");
        return;
      }
      handleFormSubmit(query);
      setQuery("");
    },
    [handleFormSubmit, query]
  );

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
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
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func,
};
