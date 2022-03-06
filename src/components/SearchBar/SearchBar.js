import './SearchBar.css';
import { useState } from 'react';

export function SearchBar({search, setSearch, setResetSearchButton, lang}) {
  const [searchBar, setSearchBar] = useState('');

  const handleSearchBar = (event) => {
    setSearchBar(event.target.value);
  };

  const onSearchClick = (event) => {
    event.preventDefault();

    if (searchBar === '') {
      return
    };

    setSearch(searchBar);
    setResetSearchButton(true);
  };

  return (
    <div className="SearchBar">
      <form 
        className='serach-bar-container'
        onSubmit={onSearchClick}
      >
        <input 
          type="text" 
          placeholder={lang ? 'Search contact' : 'Hľadaj kontakt'} 
          value={searchBar}
          onChange={handleSearchBar}
        />
        <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </div>
  );
}