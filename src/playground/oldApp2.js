console.log("Indecision App is running!");

const appRoot = document.getElementById("app");

const app = {
  title:"Indecision App",
  subtitle:"Put your life in the hands of a computer.",
  options: []
};


/*Event Handlers*/
const onFormSubmit = (e) => {
  //Stop default page refresh + putting variables in GET format in URL
  e.preventDefault();
  
  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";
    renderApp();
  }
}

const onRemoveAll = () => {
  app.options=[];
  renderApp();
};

const onMakeDecision = () => {
  /* Math.random() returns a number between 0 and 0.999 inclusive */
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};



const renderApp = () => {
  const template = (
  <div>
    <h1 id="someid">{app.title}</h1>
    
    {/* Subtitle. This will only display <p> tags if subtitle exists */}
    {(app.subtitle && <p>{app.subtitle}</p>)}
    <p>{(app.options.length > 0) ? "You have options: " : "No options: "}{app.options.length}</p>
    <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
    <ol>
      {
        /* Subtitle. This will only display <p> tags if subtitle exists */
        app.options.map((option) => {
          return <li key={option}>{option}</li>
        })
      }
    </ol>
    <form onSubmit={onFormSubmit}>
      <input type="text" name="option"/>
      <button>Add Option</button>
    </form>
    <button onClick={onRemoveAll}>Remove All</button>
    
  </div>
  );
  ReactDOM.render(template,appRoot);
}



renderApp();
