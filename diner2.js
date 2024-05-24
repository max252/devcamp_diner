"use strict";
var toConsole = false;
const nowork = "nowork";
const intVal = ["breakfast", "lunch", "diner"];
const foodType = ["first", "second", "dessert"];
const error = -1;

let timeInterval = {
  "06:59": nowork,
  "11:59": intVal[0],
  "17:59": intVal[1],
  "23:59": intVal[2],
};

let menu = {
  [intVal[0]]: {
    [foodType[0]]: [
      { name: "bf01", price: 101 },
      { name: "bf02", price: 102 },
      { name: "bf03", price: 103 },
    ],
    [foodType[1]]: [
      { name: "bf11", price: 111 },
      { name: "bf12", price: 112 },
      { name: "bf13", price: 113 },
    ],
    [foodType[2]]: [
      { name: "bf31", price: 121 },
      { name: "bf32", price: 122 },
      { name: "bf33", price: 123 },
    ],
  },
  [intVal[1]]: {
    [foodType[0]]: [
      { name: "lc01", price: 201 },
      { name: "lc02", price: 202 },
      { name: "lc03", price: 203 },
    ],
    [foodType[1]]: [
      { name: "lc11", price: 211 },
      { name: "lc12", price: 212 },
      { name: "lc13", price: 213 },
    ],
    [foodType[2]]: [
      { name: "lc31", price: 211 },
      { name: "lc32", price: 212 },
      { name: "lc33", price: 213 },
    ],
  },
  [intVal[2]]: {
    [foodType[0]]: [
      { name: "dn01", price: 301 },
      { name: "dn02", price: 302 },
      { name: "dn03", price: 303 },
    ],
    [foodType[1]]: [
      { name: "dn11", price: 311 },
      { name: "dn12", price: 312 },
      { name: "dn13", price: 313 },
    ],
    [foodType[2]]: [
      { name: "dn31", price: 321 },
      { name: "dn32", price: 322 },
      { name: "dn33", price: 323 },
    ],
  },
};

const comments = ["random comment 1", "random comment 2", "random comment 3"];

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

function makeMenu(intNow, menuDict) {
  let text = `It is ${intNow} time.\n`;

  for (const [key, value] of Object.entries(menuDict)) {
    text += `${key} `;
    value.forEach(concatMenu);
    text += "\n";
  }

  function concatMenu(food) {
    text += `${food["name"]} - \$(${food["price"]}) `;
  }

  return text;
}

function makeFood(intNow, foodType, menu) {
  let text = `${intNow} ${foodType}\n`;

  for (let i = 0; i < menu.length; i++) {
    text += `${menu[i].name} `;
  }
  text += "\n";

  return text;
}

function checkFood(menu, food) {
  for (let i = 0; i < menu.length; i++) {
    if (food === menu[i].name) {
      return i;
    }
  }
  return error;
}

function showTotal(choise) {
  let text = "Your choice\n";
  let total = 0;

  for (const [key, value] of Object.entries(choise)) {
    text += `${key} - \$${value}\n`;
    total += value;
  }
  text += `Total: ${total}`;

  return text;
}

let intNow = nowork;
do {
  intNow = detectInterval(input("What time is it now? "), timeInterval);
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
for (const [key, value] of Object.entries(menu[intNow])) {
  let tempBool = false;

  do {
    let food = input(makeFood(intNow, key, value));
    let index = checkFood(value, food);

    if (index != -1) {
      choise[`${key} ${food}`] = menu[intNow][key][index]["price"];
      tempBool = true;
      output(comments[getRandomInt(comments.length)]);
    }

    if (tempBool == false) {
      output("Error: there is no such dish");
    }
  } while (tempBool == false);
}

output(showTotal(choise));
