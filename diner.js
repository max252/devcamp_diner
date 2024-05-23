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
}

function showMenu(food) {
  let text = "Index Name Type Price\n";

  for (let i = 0; i < food.length; i++) {
    text += `${i} ${food[i].name} ${food[i].type} ${food[i].price}\n`;
  }

  return text;
}

function showOrder(order, food) {
  let text = "Index Name Type Price Comment\n";
  let total = 0;

  for (let i = 0; i < order.length; i++) {
    text += `${i} ${food[order[i].index].name} ${food[order[i].index].type} ${food[order[i].index].price} ${order[i].comment}\n`;
    total += food[order[i].index].price;
  }

  text += `Total: ${total}\n`;

  return text;
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

output(showHelp());

let loopBool = true;

while (loopBool == true) {
  let choise = input("Select menu item?");

  switch (choise) {
    case "1": {
      output(showMenu(diner.foods));
      break;
    }

    case "2": {
      output(showMenu(diner.foods));
      let index = input("Select dish index?");

      if (checkIndex(index, diner.foods)) {
        order.addPosition(Number(index));
      } else {
        output("Error: Incorrect dish index");
      }

      break;
    }

    case "3": {
      output(showOrder(order.orders, diner.foods));
      let index = input("Select the dish index in your order?");

      if (checkIndex(index, order.orders)) {
        let comment = input("comment");
        order.addComment(Number(index), comment);
      } else {
        output("Error: Incorrect dish index in the order");
      }

      break;
    }

    case "4": {
      output(showOrder(order.orders, diner.foods));
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
