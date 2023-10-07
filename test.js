const currentDate = new Date();
console.log(currentDate);

// Set the date to the first day of the next month
currentDate.setMonth(currentDate.getMonth(), 1);
currentDate.setDate(currentDate.getDate() - 1);

console.log(currentDate);
