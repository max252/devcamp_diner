"use strict";
var toConsole = false;
const nowork = "nowork";
const intVal = ["breakfast", "lunch", "diner"];
const foodType = ["first", "second", "dessert"];
const error = -1;
const add = " ";
const addNum = 1;

let timeInterval = {
  "06:59": nowork,
  "11:59": intVal[0],
  "17:59": intVal[1],
  "23:59": intVal[2],
};

let menu = {
  [intVal[0]]: {
    [foodType[0]]: [
      { name: "Sandwich", price: 11 },
      { name: "Tortilla", price: 12 },
      { name: "Omelette", price: 13 },
    ],
    [foodType[1]]: [
      { name: "Roll", price: 5 },
      { name: "Pie", price: 6 },
      { name: "Croissant", price: 7 },
    ],
    [foodType[2]]: [
      { name: "Coffee", price: 2 },
      { name: "Juice", price: 3 },
      { name: "Tea", price: 1 },
    ],
  },
  [intVal[1]]: {
    [foodType[0]]: [
      { name: "Soup", price: 14 },
      { name: "Borsch", price: 15 },
      { name: "Okroshka", price: 16 },
    ],
    [foodType[1]]: [
      { name: "Puree", price: 3 },
      { name: "Cutlet", price: 4 },
      { name: "Sausage", price: 8 },
    ],
    [foodType[2]]: [
      { name: "Late", price: 1 },
      { name: "Coca", price: 2 },
      { name: "Tea", price: 3 },
    ],
  },
  [intVal[2]]: {
    [foodType[0]]: [
      { name: "Fish", price: 17 },
      { name: "Meat", price: 18 },
      { name: "Seafood", price: 19 },
    ],
    [foodType[1]]: [
      { name: "Bread", price: 11 },
      { name: "Apple", price: 10 },
      { name: "Banana", price: 9 },
    ],
    [foodType[2]]: [
      { name: "Wine", price: 321 },
      { name: "Vodka", price: 322 },
      { name: "Beer", price: 323 },
    ],
  },
};

const comments = ["Very good!", "Keep it going!!", "Give it some more!!!"];

if (toConsole == true) {
  var readlineSync = require("readline-sync");
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

  if (inputText) {
    return inputText;
  } else {
    return error;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkInt(num) {
  let isnum = /^\d+$/.test(num);

  if (isnum) {
    return true;
  }

  return false;
}

function timeMin(time) {
  if (time == error) {
    return error;
  }
  let a = time.split(":");

  if (a.length == 2) {
    if (checkInt(a[0]) == true && checkInt(a[1]) == true) {
      let hour = parseInt(a[0]);
      let min = parseInt(a[1]);

      if (hour >= 0 && hour <= 23 && min >= 0 && min <= 59) {
        return hour * 60 + min;
      }
    }
  }
  return error;
}

function detectInterval(time, intDict) {
  for (let key in intDict) {
    let timeInMinNow = timeMin(time);
    let timeInMinInt = timeMin(key);

    if (timeInMinNow == error || timeInMinInt == error) {
      return error;
    }

    if (timeInMinNow <= timeInMinInt) {
      return intDict[key];
    }
  }

  return nowork;
}

function maxDictMenu(dict) {
  let size = 0;
  for (const [key, value] of Object.entries(dict)) {
    value.forEach(checkValue);
  }

  function checkValue(value) {
    if (size < value["name"].length) {
      size = value["name"].length;
    }
  }
  return size;
}

function makeMenu(intNow, menuDict) {
  let text = `It is ${intNow} time.\n`;

  let size = maxDictMenu(menuDict) + addNum;
  for (const [key, value] of Object.entries(menuDict)) {
    text += `${key.toUpperCase()}:\n`;
    value.forEach(concatMenu);
    text += "\n";
  }

  function concatMenu(food) {
    text += `${food["name"].toUpperCase()}${add.repeat(size - food["name"].length)} --> ${food["price"]}\$\n`;
  }

  return text;
}

function makeFood(intNow, foodType, menu) {
  let text = `Choose your ${foodType} for ${intNow}:\n`;

  for (let i = 0; i < menu.length; i++) {
    text += `${menu[i].name.toUpperCase()}`;
    if (i < menu.length - 1) {
      text += " --OR-- ";
    }
  }
  text += "\n";

  return text;
}

function checkFood(menu, food) {
  for (let i = 0; i < menu.length; i++) {
    if (food.toUpperCase() === menu[i].name.toUpperCase()) {
      return i;
    }
  }
  return error;
}

function maxDictTotal(dict) {
  let size = 0;

  for (const [key, value] of Object.entries(dict)) {
    if (size < key.length) {
      size = key.length;
    }
  }

  return size;
}

function showTotal(choise) {
  let text = "Your choice:\n";
  let total = 0;

  let size = maxDictTotal(choise) + addNum;
  for (const [key, value] of Object.entries(choise)) {
    text += `${key}${add.repeat(size - key.length)} --> ${value}\$\n`;
    total += value;
  }
  text += `Total:${add.repeat(size - 1)}${total}\$`;

  return text;
}

function maxArr(arr) {
  let size = 0;

  for (let i = 0; i < arr.length; i++) {
    if (size < arr[i].length) {
      size = arr[i].length;
    }
  }

  return size;
}

let intNow = nowork;
do {
  intNow = detectInterval(input("What time is it now? HH:MM "), timeInterval);
  if (intNow != error) {
    if (intNow == nowork) {
      output("Now is not the time to eat.");
    }
  } else {
    output("Error: input time");
  }
} while (intNow == nowork || intNow == error);

output(makeMenu(intNow, menu[intNow]));

let choise = {};
let size = maxArr(foodType);
for (const [key, value] of Object.entries(menu[intNow])) {
  let tempBool = false;

  do {
    let food = input(makeFood(intNow, key, value));
    let index = checkFood(value, food);

    if (index != -1) {
      choise[
        `For the ${key.toUpperCase()}${add.repeat(size - key.length)}: ${food.toUpperCase()}`
      ] = menu[intNow][key][index]["price"];
      tempBool = true;
      output(comments[getRandomInt(comments.length)]);
    }

    if (tempBool == false) {
      output("Error: there is no such dish");
    }
  } while (tempBool == false);
}

output(showTotal(choise));
