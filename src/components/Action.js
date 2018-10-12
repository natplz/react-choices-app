import React from 'react';


const Action = (props) => (
  <div>
    <button
      className="button button--big" 
      onClick={props.handleChoose}
      disabled={!props.hasOptions} //Disabled if no options
    >
      What should I do?
    </button>
  </div>
);

export default Action;