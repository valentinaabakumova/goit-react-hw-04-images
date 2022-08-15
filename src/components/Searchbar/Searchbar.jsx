import { useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(query);
    setQuery('');
  };

  return (
    <MySearchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearch size={20} />
        </SearchFormButton>

        <SearchFormInput
          onChange={handleQueryChange}
          value={query}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="search secret images"
        />
      </SearchForm>
    </MySearchbar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const MySearchbar = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  padding: 20px 10px;
  color: white;
  background-color: rgba(12, 12, 12, 0.428);
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.21),
    0px 4px 5px 0px rgba(0, 0, 0, 0.15), 0px 1px 10px 0px rgba(0, 0, 0, 0.11);
  z-index: 100;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
`;

const SearchFormButton = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
    color: black;
  }
`;

const SearchFormInput = styled.input`
  display: inline-block;
  width: 100%;
  font-size: 20px;
  border: none;
  outline: none;
  font-family: monospace;
  padding-left: 4px;
  padding-right: 4px;
  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;

export default Searchbar;
