"use strict";
var toConsole = false;

if (toConsole == true) {
  var readlineSync = require("readline-sync");
}

class Food {
  constructor({ name, type, price }) {
    this.name = name;
    this.type = type;
    this.price = price;
  }
}

class Foods {
  constructor() {
    this.foods = [];
  }

  newFood({ name, type = "entree", price = 0 }) {
    let p = new Food({ name, type, price });
    this.foods.push(p);
    return p;
  }

  showMenu() {
    let text = "Index Name Type Price\n";

    for (let i = 0; i < this.foods.length; i++) {
      text += `${i} ${this.foods[i].name} ${this.foods[i].type} ${this.foods[i].price}\n`;
    }

    return text;
  }
}

class Orders {
  constructor() {
    this.orders = [];
  }

  addPosition(index) {
    this.orders.push({ index: index, comment: "" });
  }

  addComment(index, comment) {
    this.orders[index]["comment"] = comment;
  }

  linkMenu(menu) {
    this.menu = menu;
  }

  showOrder() {
    let text = "Index Name Type Price Comment\n";
    let total = 0;

    for (let i = 0; i < this.orders.length; i++) {
      text += `${i} ${this.menu[this.orders[i].index].name} ${this.menu[this.orders[i].index].type} ${this.menu[this.orders[i].index].price} ${this.orders[i].comment}\n`;
      total += this.menu[this.orders[i].index].price;
    }

    text += `Total: ${total}\n`;

    return text;
  }
}

function showHelp() {
  let text =
    "1 Show menu\n" +
    "2 Select dish\n" +
    "3 Add comment\n" +
    "4 Show order\n" +
    "q Quit";

  return text;
}

function checkIndex(index, array) {
  let isnum = /^\d+$/.test(index);

  if (index >= 0 && index < array.length && isnum) {
    return true;
  }

  return false;
}

function output(text) {
  if (toConsole == true) {
    console.log(text);
  } else {
    alert(text);
  }
}

function input(text) {
  let inputText;

  if (toConsole == true) {
    inputText = readlineSync.question(text);
  } else {
    inputText = prompt(text);
  }

  return inputText;
}

const diner = new Foods();

diner.newFood({ name: "Soup with meat", type: "entree", price: 101 });
diner.newFood({ name: "Fish soup", type: "entree", price: 102 });
diner.newFood({ name: "Mushroom soup", type: "entree", price: 103 });
diner.newFood({
  name: "Mashed potatoes with a chop",
  type: "side",
  price: 104,
});
diner.newFood({ name: "Rice with meat", type: "side", price: 105 });
diner.newFood({ name: "Porridge with vegetables", type: "side", price: 106 });
diner.newFood({
  name: "Scrambled eggs with sausage",
  type: "side",
  price: 107,
});
diner.newFood({ name: "Pancakes with jam", type: "side", price: 108 });

const order = new Orders();
order.linkMenu(diner.foods);

output(showHelp());

let loopBool = true;

while (loopBool == true) {
  let choise = input("Select menu item?");

  switch (choise) {
    case "1": {
      output(diner.showMenu());
      break;
    }

    case "2": {
      output(diner.showMenu());
      let index = input("Select dish index?");

      if (checkIndex(index, diner.foods)) {
        order.addPosition(Number(index));
      } else {
        output("Error: Incorrect dish index");
      }

      break;
    }

    case "3": {
      output(order.showOrder(order.orders, diner.foods));
      let index = input("Select the dish index in your order?");

      if (checkIndex(index, order.orders)) {
        let comment = input("Enter a comment");
        order.addComment(Number(index), comment);
      } else {
        output("Error: Incorrect dish index in the order");
      }

      break;
    }

    case "4": {
      output(order.showOrder(order.orders, diner.foods));
      break;
    }

    case "q": {
      loopBool = false;
      break;
    }

    default: {
      output(showHelp());
    }
  }
}
