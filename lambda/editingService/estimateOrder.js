const settingsPerLang = {
  languages: {
    RU: 0.05,
    UA: 0.05,
    EN: 0.12
  },
  minCost: {
    RU: 50,
    UA: 50,
    EN: 120
  },
  symbolsPerHour: {
    RU: 1333,
    UA: 1333,
    EN: 333
  }
}
const basicTypesOfFile = ['.doc', '.docx', '.rtf'];

const PERCENT_FOR_EXTRA_RESOURCES = 20;
const MIN_MINUTES_PER_ORDER = 60;
const OPEN_ORDER_PROCESSING_TIME_IN_MIN = 30;

const ONE_HOUR_IN_MIN = 60;
const TWO_HOURS_IN_MIN = 120;
// const ZERO_BEFORE_NUM = 10;
// const countDateDigits = dateToDigit => dateToDigit < ZERO_BEFORE_NUM ? '0' + dateToDigit : dateToDigit;

function estimateCost(text, lang, type = '.docx') {
  const textLength = typeof text === 'number' ? text : text.length;
  const minCost = settingsPerLang.minCost[lang];

  const costPerSymbols = textLength * settingsPerLang.languages[lang];
  const costPerType = basicTypesOfFile.some(basicType => basicType === type) ? costPerSymbols 
    : costPerSymbols + (costPerSymbols * PERCENT_FOR_EXTRA_RESOURCES / 100);
  const costPerOrder = costPerType < minCost ? minCost : costPerType;

  return costPerOrder;
}

function estimateMinutes(text, lang, type = '.docx') {
  const textLength = typeof text === 'number' ? text : text.length;
  const minutesPerSymbols = textLength / settingsPerLang.symbolsPerHour[lang] * ONE_HOUR_IN_MIN;

  const extraTime = basicTypesOfFile.some((basicType) => basicType === type) ? 0 
    : (minutesPerSymbols + OPEN_ORDER_PROCESSING_TIME_IN_MIN) * PERCENT_FOR_EXTRA_RESOURCES / 100;

  const preEstimateMinutes = OPEN_ORDER_PROCESSING_TIME_IN_MIN + extraTime + minutesPerSymbols;

  const minutesPerOrder = preEstimateMinutes < MIN_MINUTES_PER_ORDER ? MIN_MINUTES_PER_ORDER 
    : Math.ceil(preEstimateMinutes);

  return minutesPerOrder;
}

console.log(estimateMinutes(1333, 'RU', '.docx'));



module.exports = {estimateCost, estimateMinutes}