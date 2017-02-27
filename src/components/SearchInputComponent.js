'use strict';

import React from 'react';

require('styles//SearchInput.css');

let SearchInputComponent = function(props){
  return (
    <div className="search-input">
      <input type="text" onKeyUp={handleKeyup} onChange={handleChange} placeholder="Search for an Artist..." />
    </div>
  )

  function handleChange(e){
    props.updateSearchVal(e);
  }
  
  function handleKeyup(e){
    if(e.key == 'Enter'){
      props.performSearchBarSearch();
    }
  }
};

SearchInputComponent.displayName = 'SearchInputComponent';

// Uncomment properties you need
// SearchInputComponent.propTypes = {};
// SearchInputComponent.defaultProps = {};

export default SearchInputComponent;
