"use strict";
module.exports.correctingPrice = (arrayDishes, arrayElements) => {
  if (Array.isArray(arrayElements) && arrayElements.length) {
    //check if price is differ
    arrayDishes.forEach(function (entry) {
      if (arrayElements.find((v) => v.id === entry.id)) {
        arrayElements.find((v) => v.id === entry.id).price = entry.price;
        arrayElements.find((v) => v.id === entry.id).name = entry.name;
      }
    });

    //if items in cart, set items and total from cookie
    let sumTotal = 0;
    arrayElements.forEach((item) => {
      sumTotal += item.price * item.quantity;
    });
    return {
      items: arrayElements,
      total: sumTotal,
    };
  }
  return {
    items: [],
    total: 0,
  };
};
