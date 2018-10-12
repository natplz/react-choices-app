class Person {
  
  //Assign a default value for a parameter, if none is passed in
  constructor(name = "Anonymous",age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Yo wassup. My name is ${this.name}.`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

class Student extends Person {
  
  constructor(name, age, major) {
    
    //Call parent constructor. "Super" = parent
    super(name,age);
    this.major = major;
  }
  
  hasMajor() {
    //! sets it to a boolean and inverts it
    //!! sets it to a boolean and inverts it twice
    return !!this.major;
  }
  
  getDescription() {
    let description = super.getDescription();
    if (this.hasMajor()) {
      description += ` And his/her major is ${this.major}.`;
    }
    return description;
  }
}


class Traveler extends Person {
  
  constructor(name, age, homeLocation) {
    
    super(name,age);
    this.homeLocation = homeLocation;
  }
  
  getGreeting() {
    let greeting = super.getGreeting();
    if (this.homeLocation) {
      greeting += ` I am visiting from ${this.homeLocation}.`;
    }
    return greeting;
  }
}




const me = new Student("Natty P", 26, "Cognitive & Brain Science");
console.log(me.getDescription());

const neighbor = new Person();
console.log(neighbor.getDescription());

const neighborStudent = new Student();
console.log(neighborStudent.getDescription());

const traveler1 = new Traveler("Bob",36,"Chicago");
console.log(traveler1.getGreeting());



