class IndecisionApp extends React.Component {
  
  constructor(props) {
    super(props);
    
    //Bind event handlers
    this.handleChoose = this.handleChoose.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    
    //Set state
    this.state = {
      options: []
    };
  }
  
  handleChoose() {
    /* Math.random() returns a number between 0 and 0.999 inclusive */
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  
  handleDeleteOptions() {
    //We're creating an object in-line with the brackets, but we need to wrap it in parentheses as well, so the compiler doesn't think the brackets are the arrow function definition
    this.setState(() => ({ options:[] }) );
  }
  
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      
      //.filter gets called on every option and returns a new array with only the options that meet the boolean condition
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }));
  }
  
  handleAddOption(option) {
    
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
        
  }
  
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
        <Action 
          hasOptions={this.state.options.length > 0}
          handleChoose={this.handleChoose}
        />
        <Options 
          options={this.state.options} 
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}



const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}
Header.defaultProps = {
  title: "Indecision"
}



const Action = (props) => {
  return (
      <div>
        <button 
          onClick={props.handleChoose}
          disabled={!props.hasOptions} //Disabled if no options
        >
          What should I do?
        </button>
      </div>
    );
}



const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option to get started.</p>}
      {
        /* Loops through options array and prints out each one as an Option */
        props.options.map((option) => (
          <Option
            key={option}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
          /> 
        )) 
      }
    </div>
  );
}



const Option = (props) => {
  return (
      <div>
        {props.optionText}
        <button
          onClick={(e) => {
            props.handleDeleteOption(props.optionText)
          }}
        >Remove</button>
      </div>
    );
}


class AddOption extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined //No error by default
    };
  }
  
  //AddOption.handleAddOption
  handleAddOption(e) {
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
  }
  
  
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}



ReactDOM.render(<IndecisionApp options={["Harry","Sally"]}/>,document.getElementById("app"));









