console.log("App.js is running!");

var app = {
  title:"Indecision App",
  subtitle:"Put your life in the hands of a computer.",
  optionss: ["One","Two"]
};

//JSX - JavaScript XML
var template = (
  <div>
    <h1 id="someid">{app.title}</h1>
    {/* This will only display <p> tags if subtitle exists */}
    {(app.subtitle && <p>{app.subtitle}</p>)}
    <p>{(app.options && app.options.length > 0) ? "You have options! " : "No options"}</p>
  </div>
);
var appRoot = document.getElementById("app");



//Object
var user = {
  name:"Bob",
  age: 31,
  location: "Paris"
};
function getLocation(location) {
  if (location) {
    return <p>Location: {location}</p>;
  }
  return undefined;
}


var templateTwo = (
  <div>
    <h1>{user.name ? user.name : "Anonymous"}</h1>
    {(user.age && user.age >= 30) && <p>Age: {user.age} </p>}
    {getLocation(user.location)}
  </div>
);

//This renders our application
//Arg 1: JSX template to render
//Arg 2: DOM Element (location to render JSX)
ReactDOM.render(template, appRoot);
