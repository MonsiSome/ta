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

const ZERO_BEFORE_NUM = 10;
const countDateDigits = dateToDigit => dateToDigit < ZERO_BEFORE_NUM ? '0' + dateToDigit : dateToDigit;

function estimateCost(text, lang, type = '.docx') {
  if (!text) return 0;
  const textLength = typeof text === 'number' ? text : text.length;
  const minCost = settingsPerLang.minCost[lang];

  const costPerSymbols = textLength * settingsPerLang.languages[lang];
  const costPerType = basicTypesOfFile.some(basicType => basicType === type) ? costPerSymbols 
    : costPerSymbols + (costPerSymbols * PERCENT_FOR_EXTRA_RESOURCES / 100);
  const costPerOrder = costPerType < minCost ? minCost : costPerType;

  return costPerOrder;
}

function estimateMinutes(text, lang, type = '.docx') {
  if (!text) return 0;
  const textLength = typeof text === 'number' ? text : text.length;
  const minutesPerSymbols = textLength / settingsPerLang.symbolsPerHour[lang] * ONE_HOUR_IN_MIN;

  const extraTime = basicTypesOfFile.some((basicType) => basicType === type) ? 0 
    : (minutesPerSymbols + OPEN_ORDER_PROCESSING_TIME_IN_MIN) * PERCENT_FOR_EXTRA_RESOURCES / 100;

  const preEstimateMinutes = OPEN_ORDER_PROCESSING_TIME_IN_MIN + extraTime + minutesPerSymbols;

  const minutesPerOrder = preEstimateMinutes < MIN_MINUTES_PER_ORDER ? MIN_MINUTES_PER_ORDER 
    : Math.ceil(preEstimateMinutes);

  return minutesPerOrder;
}

function estimateDeadline(leadTime, startOrderDate = new Date()) {
  if (!leadTime) return '';
  let deadline;
  let processingDate = new Date(startOrderDate);
  
  if (processingDate.getDay() < 6 && processingDate.getDay() > 0) {
    const COBofStartOrderDay = new Date(new Date(processingDate).setHours(19, 0, 0, 0));
    const freeTimeOfStartDay = (COBofStartOrderDay - processingDate) / 1000 / 60;

    if (freeTimeOfStartDay >= TWO_HOURS_IN_MIN && leadTime <= ONE_HOUR_IN_MIN) {
      return `Здамо за: одну годину`;
    }
    if (freeTimeOfStartDay >= TWO_HOURS_IN_MIN && leadTime <= TWO_HOURS_IN_MIN) {
      return `Здамо за: дві години`;
    }
  }

  while (leadTime > 0) {
    if (processingDate.getDay() < 6 && processingDate.getDay() > 0) {
      const COBofProcesOrderDay = new Date(new Date(processingDate).setHours(19, 0, 0, 0));
      const canUseTimeToday = (COBofProcesOrderDay - processingDate) / 1000 / 60;
      const freeTimeToday = canUseTimeToday - leadTime;
      if (freeTimeToday >= 0) {
        processingDate = new Date(COBofProcesOrderDay - freeTimeToday * 60 * 1000);
        leadTime = 0;
      } else {
        processingDate = new Date(COBofProcesOrderDay.getTime() + 15 * 3600 * 1000);
        leadTime -= canUseTimeToday;
      }
    } else {
      processingDate = new Date(processingDate.getTime() + 24 * 3600 * 1000);
      processingDate = new Date(processingDate.setHours(10, 0, 0, 0));
    }
  }
  
  if (processingDate.getMinutes() === 0) {
    deadline = new Date(processingDate);
  } else if (processingDate.getMinutes() < 30) {
    deadline = new Date(new Date(processingDate).setMinutes(30));
  } else {
    deadline = new Date(new Date(processingDate).setHours(processingDate.getHours() + 1, 0, 0, 0));
  }

  const deadlineInfo = {
    day: countDateDigits(deadline.getDate()),
    month: countDateDigits(deadline.getMonth()),
    year: deadline.getFullYear().toString().slice(-2),
    hours: countDateDigits(deadline.getHours()),
    minutes: countDateDigits(deadline.getMinutes())
  }
  const deadlineDateInfo = Object.values(deadlineInfo).slice(0, 3).join('.');
  const deadlineTimeInfo = Object.values(deadlineInfo).slice(-2).join(':');

  return `Термін виконання: ${deadlineDateInfo} о ${deadlineTimeInfo}`;
}

module.exports = {estimateCost, estimateMinutes, estimateDeadline};
