import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import CustomModal from './CustomModal';


export default class IndecisionApp extends React.Component {
  
  state = {
    options: [],
    selectedOption: undefined
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }) );
  }

  handleChoose = () => {
    /* Math.random() returns a number between 0 and 0.999 inclusive */
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }) );
  };

  handleDeleteOptions = () => {
    //We're creating an object in-line with the brackets, but we need to wrap it in parentheses as well, so the compiler doesn't think the brackets are the arrow function definition
    this.setState(() => ({ options:[] }) );

  };
  
  handleDeleteOption = (optionToRemove) =>  {
    this.setState((prevState) => ({
      
      //.filter gets called on every option and returns a new array with only the options that meet the boolean condition
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }));
  };
  
  handleAddOption = (option) => {
    
    if (!option) {
      return "Enter valid value.";
      
    //IndexOf returns the index number of an option if it already exists in array
    //Returns -1 if an option doesn't yet exist
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists. Please choose another.";
    }
    //Don't ever alter "prevState" variable
    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }) );    
  };
  
  componentDidMount() {
    //If "options" in localStorage is invalid JSON data, JSON.parse() will throw an exception
    //Therefore, wrap this whole thing in a try statement
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState( () => ({ options }) );
      }
    } catch (e) {
      //Do nothing. There was bad JSON data in "options", so don't change state
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    
    //Save data to local storage
    //If number of options changed, we'll consider that an indication that a legitimate update took place, and take a snapshot
    if (this.state.options.length !== prevState.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options",json);
    }
  }
  
  componentWillUnmount() {
    console.log("Component will unmount...");
  }
  
  //All React components must define render(), which returns JSX
  render() {
    const subtitle = "Put your life in the hands of a computer.";
    
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action 
            hasOptions={this.state.options.length > 0}
            handleChoose={this.handleChoose}
          />
          <div className="widget">
            <Options 
              options={this.state.options} 
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption 
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <CustomModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}











