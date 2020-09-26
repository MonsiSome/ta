function countGiftOptions(candy, pineapple, apple, weight) {
  // Sorting through each gift type to get maximal available count of gifts
  var result = 0; // quantity of gift combinations
  for (var candyCounter = 0; candyCounter <= weight / candy; ++candyCounter) {
    for (var pineappleCounter = 0; pineappleCounter <= weight / pineapple; ++pineappleCounter) {
      for (var appleCounter = 0; appleCounter <= weight / apple; ++appleCounter) {
        if (candyCounter * candy + pineappleCounter * pineapple + appleCounter * apple == weight) {
          result++;
        }
      }
    }
  }
  return result;
}

function secretaryJimny(copiesQuantity, xeroxOne, xeroxTwo) {
  let fastXerox = Math.min(xeroxOne, xeroxTwo); //Finds the Xerox coping faster
  let slowXerox = Math.max(xeroxOne, xeroxTwo); //Finds the Xerox coping slower
  let xeroxedCopies = 1; // Variable counts quantity of ready copies, initialized with first copy
  let resultTime = fastXerox; // Variable counts all time, initialized with first copy made by fasterXerox
  let slowXeroxTime = 0; // Variable counts seconds of copying by faster Xerox per one slow Xerox copie

  while (xeroxedCopies < copiesQuantity) {
    //Cycle counts time and quantity of ready copies
    resultTime += fastXerox;
    slowXeroxTime += fastXerox;
    xeroxedCopies++;

    if (xeroxedCopies === copiesQuantity) break; // break if all copies are made

    if (slowXeroxTime >= slowXerox) {
      // Make copie on slow Xerox if enough time gone for making one copy on it
      xeroxedCopies++;
      slowXeroxTime -= slowXerox;
    }
  }
  return resultTime;
}

const fs = require('fs')
const employees = JSON.parse(fs.readFileSync('./employees.json'))
const recipes = JSON.parse(fs.readFileSync('./recipes.json'))
const prices = JSON.parse(fs.readFileSync('./prices.json'))

function selectInvitedEmployees(budget) {
  // Add key and value to the object
  const addKeyAndVlaueToObject = (key, value, object) =>
    ({
      ...object,
      [key]: value
    })
  // Remove key from object
  const removeKeyFormObject = (key, object) => {
    const {
      [key]: omit, ...result
    } = object
    return result
  }
  // Function that gets the price of drink reffering to the  object with ingredients and their costs
  const getDrinkPrice = drink =>
    Object.entries(recipes[drink])
    .map(ingredient => prices[ingredient[0]] * ingredient[1])
    .reduce((a, b) => a + b, 0)
  // Function that gets total price of array of drink
  const getTotalPrice = drinks =>
    drinks.map(drink => getDrinkPrice(drink))
    .reduce((a, b) => a + b, 0)
  // Function that reduce the budget of the party
  const reduceBudget = cost => {
    return budget -= cost
  }
  // Function that cheks if budget amount is still enough for candidat participation
  const checkIfCanParticipate = (candidate) => {
    if (budget >= candidate.cost) {
      reduceBudget(candidate.cost)
      return true
    }
    return false
  }
  return employees
    .map(emploee => addKeyAndVlaueToObject('cost', getTotalPrice(emploee.drinks), emploee))
    .sort((a, b) => a.cost - b.cost)
    .filter(candidate => checkIfCanParticipate(candidate))
    .map(participent => removeKeyFormObject('cost', participent))
    .sort((a, b) => a.id - b.id)
}
