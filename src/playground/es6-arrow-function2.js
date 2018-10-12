/* Important things to know about arrow functions: 
 * "Arguments" object no longer exists
 * "This" keyword is no longer "bound" for arrow functions
 */

//ES5 function. Arguments object still works
const add = function(a, b) {
  console.log(arguments);
  return a+b;
}

//ES6 arrow function. this doesn't work now
/*const add = (a, b) => {
  console.log(arguments);
  return a+b;
}*/

console.log(add(55,1));



//ES5 function
const user = {
  name: "Natty",
  cities: ["Columbus, Boston, Hanoi, Madison, Washington DC"],
  //"This" keyword works with a function bound to an object
  printPlacesLived: function() {
    console.log(this.name);
    console.log(this.cities);
    
    //"This" keyword doesn't work for a function not bound to an object. "This.name" doesn't mean anything here
    /*this.cities.forEach(function(city) {
      console.log(this.name + " has lived in " + city);
    });*/
    
    //However, since arrow functions don't bind "this", using "this" just takes the parent value! So this works!
    this.cities.forEach((city) => {
      console.log(this.name + " has lived in " + city);
    });
  }
}
user.printPlacesLived();


//New way to describe an ES5 function:
const object = {

  //Instead of:
  printPlacesLived: function() {
  },
  
  //It's this:
  printPlacesLived() {
  }
  
}



//"Map" function is a method of all arrays. It's like foreach, except it actually returns a NEW array of all the same items in the original array, with some logic applied to them


const multiplier = {
  numbers: [1, 54, 77, 5, 23, 124354434],
  multiplyBy: 3,
  multiply() {
    return this.numbers.map((number) => number = number * this.multiplyBy);
  }
}
console.log(multiplier.multiply());


