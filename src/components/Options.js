import React from 'react';
import Option from './Option';


const Options = (props) => {
  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Your Options</h3>
        <button
          className="button button--remove"
          onClick={props.handleDeleteOptions}
        >
          Remove All
        </button>
      </div>
      { props.options.length === 0 &&
        <p className="widget__message">
          Please add an option to get started.
        </p>
      }
      {
        /* Loops through options array and prints out each one as an Option */
        props.options.map((option, index) => (
          <Option
            key={option}
            optionText={option}
            count={index + 1}
            handleDeleteOption={props.handleDeleteOption}
          /> 
        )) 
      }
    </div>
  );
}

export default Options;