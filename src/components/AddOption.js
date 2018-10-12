import React from 'react';


export default class AddOption extends React.Component {
  
  state = {
    error: undefined //No error by default
  };

  // constructor(props) {
  //   super(props);
  //   this.handleAddOption = this.handleAddOption.bind(this);
  // }
  
  //AddOption.handleAddOption
  handleAddOption = (e) => {
    //Stop default page refresh + putting variables in GET format in URL
    e.preventDefault();
    
    //.trim() clears leading and trailing white space
    const option = e.target.elements.option.value.trim();  
    
    //Call IndecisionApp.handleAddOption and handle potential errors
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }) );
    //"error" here is the same as "error: error"
    
    if(!error) {
      e.target.elements.option.value = "";
    }
  };
  
  render() {
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.handleAddOption}>
          <input className="add-option__input" type="text" name="option" />
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}