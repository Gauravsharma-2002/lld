// solid thing

// advantages
// 1. duplicacy
// easy to maintain
// flexible software
// reduce complexity

// HOW
// Single Responsibility princile
// open closed principle
// liskov subsitution principle
// interface segment principle
// dependency inversion principle

// single responsibility

//  a Class should have only one reason to change

// means a class should only change for one thing only
// consider an example here that

class marker {
  color;
  price;
  name;
  year;
  marker(name, price, year, color) {
    this.name = name;
    this.price = price;
    this.year = year;
    this.color = color;
  }
}

class invoice {
  marker = new marker(); // this can be read as invoice class "has a relation with marker"
  quantity;
  // see the implementation of this class
  calculateTotal() {
    return (price = marker.price * this.quantity);
  }
  printInvoice() {
    console.log(`${this.calculateTotal()}`);
  }
  saveToDB() {
    console.log("saving to Db");
  }
}

// now see the implementation of the invoice class what does it shows
// it has 3 methods
// calculate price + printInvoice + saveToDb thing
// now in feature it is very possible that the implemetation of these thing would be changed
// because the logic associated to them might change

// lets take an example here
//  you want to print on another display instead of consoling it
//  or you change your database
// or you want to apply different invoice calcuation logic
//  than what might you do
// you would change the class
//  considering all changes , there is multiple reasons to change the class which diobeys the single responsibility principle
//  you should have to imporve this

// changed approach
class invoice1 {
  marker = new marker();
  quantity = 0;

  invoice1(marker, quantity) {
    this.marker = marker;
    this.quantity = quantity;
  }
  //only handling the invoice generation part
  calculateTotal() {
    return (price = this.marker.price * this.quantity);
  }
}

// to print we only need the invoice details not the entire marker details
//  so we are using it only
class PrintInvoice {
  invoice = new invoice1();
  printInvoice(invoice) {
    this.invoice = invoice;
  }
  printLogic() {
    // any way you want to print
  }
}
class saveToDB {
  invoice = new invoice1();
  saveToDB(invoice) {
    this.invoice = invoice;
  }
  saveLogic() {
    //  any mean you wish to save your data
  }
}

//  now here what is happening here is that we only change the class for one reason
//  and the class has only what it needs
// make it EASY TO MAINTAIN THE CODE

// OPEN CLOSE  PRINCIPLE

//  this States that "OPEN FOR EXTENSTION BUT CLOSED FOR MODIFICATION"

//  means , you will understand it by example
// lets suppose you get and requirement over a already tested and working class saveToDB
//  to store it in file system
//  how to be done

//  simple ha
// reiplementation of save class or modification of save calss
class saveToDB1 {
  invoice = new invoice();
  saveToDB(invoice) {
    this.invoice = invoice;
  }
  saveLogic() {
    //  any mean you wish to save your data
  }
  saveToFS() {
    //  saving to fs
  }
}
//  but this is voilating the OPEN CLOSE Principle
// we are modifying the class instead we should extend the class instead of modifying it

// interface saveToDB{
//     save(invoice);
// }

class saveToFs extends saveToDB {
  save() {
    // save logic for this
  }
}
//  incase we added another database to work on
class saveToMongoDb extends saveToDB {
  save() {
    // save logic to save for another db
  }
}

// now we extended the capabilieties of save class without modifying it   this is what we want
//  so similirly if we want more feature it can be simply done by extension instead of modification

// LISKOV PRINCIPLE : states that " Class B a SUBTYPE OF class A , then we should be able to replace the Object of A with B without Breaking Down the Behaviour of program "

///means we can use the object of a derived class in place of its parent class and there would be no breakage there
// what Could be the possible breakage
//  suppose the derived class doesn;t requires feature of parent class hence discards it or throw an error on its occurance
// in such case what is being done is that, the derived class is narrowing down the true nature of the parent class and we cannot use the object of derived class on the place of parent class

//  Example:
//  parent class
class Bike {
  turnOnEngine() {}
  accelrate() {}
}
// derived child class
class motorcycle extends Bike {
  isEngineOn;
  speed;

  turnOnEngine() {
    this.isEngineOn = true;
  }
  accelrate() {
    this.speed = 0;
    // updating speed at an interval of 1 second
    setInterval(() => {
      this.speed + 10;
    }, 1000);
  }
}

class Cycle extends Bike {
  turnOnEngine() {
    // throw  Error no engine
  }
  accelrate() {
    this.speed = 0;
    setInterval(() => {
      this.speed + 10;
    }, 1000);
  }
}
// OBSERVATION : now see here that we can use the object of motorcycle instead of Bike But cannot use object of Cycle instead of Cycle because Class cycle is donwgrading Bikes's one of feature that might lead to error or breakge when there is following code which utilises the feature in feature
