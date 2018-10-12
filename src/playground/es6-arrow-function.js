//ES5
const square = function(x) {
  return x*x;
}
console.log(square(8));



//ES6
/*const squareArrow = (x) => {
  return x*x;
}*/

//"Return x*x" is implicit
const squareArrow = (x) => x*x;
console.log(squareArrow(13));



/*const getFirstName = (fullName) => {
  return fullName.split(" ")[0];
}*/
const getFirstName = (fullName) => fullName.split(" ")[0];
console.log(getFirstName("Aaron Pelz"));