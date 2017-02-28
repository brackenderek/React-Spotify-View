'use strict';

import React from 'react';

require('styles//SearchInput.css');

let SearchInputComponent = function(props){
  
  return (
    <div className="search-input">
      <input type="text" onKeyUp={handleKeyup} onChange={handleChange} placeholder="Search for an Artist..." />
    </div>
  )

  // update state that the search value has changed
  function handleChange(e){
    props.updateSearchVal(e);
  }
  
  // check if enter key pressed, then perform the search
  function handleKeyup(e){
    if(e.key == 'Enter'){
      props.performSearchBarSearch();
    }
  }
};

SearchInputComponent.displayName = 'SearchInputComponent';

export default SearchInputComponent;
