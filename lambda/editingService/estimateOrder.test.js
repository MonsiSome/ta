const { expect } = require('@jest/globals');
const { estimateCost, estimateMinutes, estimateDeadline } = require('../editingService/estimateOrder');

describe('Estimate Cost: ', () => {

  test('should return total cost for RU order', () => {
    expect(estimateCost(920, 'RU', '.docx')).toBe(50);
    expect(estimateCost(920, 'RU', '.none')).toBeCloseTo(55.2);
    expect(estimateCost(100300, 'RU', '.docx')).toBe(5015);
    expect(estimateCost(100300, 'RU', '.none')).toBe(6018);
  });

  test('should return total cost for EN order', () => {
    expect(estimateCost(920, 'EN', '.docx')).toBe(120);
    expect(estimateCost(920, 'EN', '.none')).toBeCloseTo(132.48);
    expect(estimateCost(100300, 'EN', '.docx')).toBe(12036);
    expect(estimateCost(100300, 'EN', '.none')).toBeCloseTo(14443.2);
  });

  test('should return value more or equal than 50 for RU lang', () => {
    expect(estimateCost(20, 'RU', '.docx')).toBeGreaterThanOrEqual(50);
    expect(estimateCost(20, 'RU', '.none')).toBeGreaterThanOrEqual(50);
    expect(estimateCost(999, 'RU', '.docx')).toBeGreaterThanOrEqual(50);
    expect(estimateCost(999, 'RU')).toBeGreaterThanOrEqual(50);
    expect(estimateCost(920, 'RU', '.docx')).toBeGreaterThanOrEqual(50);
    expect(estimateCost(800, 'RU', '.docx')).toBeGreaterThanOrEqual(50);
    expect(estimateCost(800, 'RU', '.none')).toBeGreaterThanOrEqual(50);
    expect(estimateCost(833, 'RU', '.none')).toBeGreaterThanOrEqual(50);
  });

  test('should return value more or equal than 120 for EN lang', () => {
    expect(estimateCost(20, 'EN', '.docx')).toBeGreaterThanOrEqual(120);
    expect(estimateCost(20, 'EN', '.none')).toBeGreaterThanOrEqual(120);
    expect(estimateCost(20, 'EN')).toBeGreaterThanOrEqual(120);
    expect(estimateCost(333, 'EN', '.docx')).toBeGreaterThanOrEqual(120);
    expect(estimateCost(920, 'EN', '.docx')).toBeGreaterThanOrEqual(120);
    expect(estimateCost(920, 'EN', '.none')).toBeGreaterThanOrEqual(120);
    expect(estimateCost(999, 'EN', '.docx')).toBeGreaterThanOrEqual(120);
  });
  
  test('sould be defined', () => {
    expect(estimateCost(920, 'RU')).toBeDefined();
    expect(estimateCost(920, 'RU')).not.toBeUndefined();
    expect(estimateCost(920, 'RU')).toBeTruthy();
    expect(estimateCost(920, 'RU', '.docx')).toBeDefined();
    expect(estimateCost(920, 'RU', '.docx')).not.toBeUndefined();
    expect(estimateCost(920, 'RU', '.docx')).toBeTruthy();
    expect(estimateCost(920, 'EN', '.none')).toBeDefined();
    expect(estimateCost(920, 'EN', '.none')).not.toBeUndefined();
    expect(estimateCost(920, 'EN', '.none')).toBeTruthy();
    expect(estimateCost(920, 'UA', '.docx')).toBeDefined();
    expect(estimateCost(920, 'UA', '.none')).not.toBeUndefined();
    expect(estimateCost(920, 'UA', '.none')).toBeTruthy();
  });

  test('shoud return number as a result', () => {
    expect(typeof estimateCost(920, 'RU')).toMatch(/number/);
    expect(typeof estimateCost('920', 'RU')).toMatch(/number/);
  });
  
});

describe('Estimate Minutes: ', () => {

  test('should return minutes to complite RU order', () => {
    expect(estimateMinutes(666, 'RU', '.docx')).toBe(60);
    expect(estimateMinutes(667, 'RU', '.docx')).toBe(61);
    expect(estimateMinutes(920, 'RU', '.docx')).toBe(72);
    expect(estimateMinutes(920, 'RU', '.none')).toBe(86);
    expect(estimateMinutes(1333, 'RU', '.docx')).toBe(90);
    expect(estimateMinutes(1333, 'RU', '.none')).toBe(108);
    expect(estimateMinutes(100300, 'RU', '.docx')).toBe(4545);
    expect(estimateMinutes(100300, 'RU', '.none')).toBe(5454);
  });

  test('should return minutes to complite EN order', () => {
    expect(estimateMinutes(166, 'EN', '.docx')).toBe(60);
    expect(estimateMinutes(167, 'EN', '.docx')).toBe(61);
    expect(estimateMinutes(333, 'EN', '.docx')).toBe(90);
    expect(estimateMinutes(333, 'EN', '.none')).toBe(108);
    expect(estimateMinutes(920, 'EN', '.docx')).toBe(196);
    expect(estimateMinutes(920, 'EN', '.none')).toBe(235);
    expect(estimateMinutes(100300, 'EN', '.docx')).toBe(18103);
    expect(estimateMinutes(100300, 'EN', '.none')).toBe(21723);
  });
  
  test('shoud return more or equal than 60 (minutes)', () => {
    expect(estimateMinutes('', 'RU')).toBeGreaterThanOrEqual(0);
    expect(estimateMinutes('1', 'RU')).toBeGreaterThanOrEqual(60);
    expect(estimateMinutes('', 'EN')).toBeGreaterThanOrEqual(0);
    expect(estimateMinutes('1', 'EN')).toBeGreaterThanOrEqual(60);
    expect(estimateMinutes('1', 'RU', '.none')).toBeGreaterThanOrEqual(60);
    expect(estimateMinutes(1, 'RU')).toBeGreaterThanOrEqual(60);
    expect(estimateMinutes(1333, 'RU', '.docx')).toBeGreaterThanOrEqual(60);
    expect(estimateMinutes(333, 'EN', '.docx')).toBeGreaterThanOrEqual(60);
  });
  
  test('shoud return number as a result', () => {
    expect(typeof estimateMinutes(920, 'EN')).toMatch(/number/);
    expect(typeof estimateMinutes('920', 'EN')).toMatch(/number/);
  });

  test('sould be defined', () => {
    expect(estimateMinutes(920, 'RU')).toBeDefined();
    expect(estimateMinutes(920, 'RU')).not.toBeUndefined();
    expect(estimateMinutes(920, 'RU')).toBeTruthy();
    expect(estimateMinutes(920, 'RU', '.docx')).toBeDefined();
    expect(estimateMinutes(920, 'RU', '.docx')).not.toBeUndefined();
    expect(estimateMinutes(920, 'RU', '.docx')).toBeTruthy();
    expect(estimateMinutes(920, 'EN', '.none')).toBeDefined();
    expect(estimateMinutes(920, 'EN', '.none')).not.toBeUndefined();
    expect(estimateMinutes(920, 'EN', '.none')).toBeTruthy();
    expect(estimateMinutes(920, 'UA', '.docx')).toBeDefined();
    expect(estimateMinutes(920, 'UA', '.none')).not.toBeUndefined();
    expect(estimateMinutes(920, 'UA', '.none')).toBeTruthy();
  });
});

describe('Estimate deadline date', () => {
  
  let arrayOfDates, arrayOfOrderDuration, i, k;

  beforeEach(() => {
    i = 0; 
    k = 0;
    arrayOfDates = [
      new Date(2020, 9, 28, 12, 20, 0),
      new Date(2020, 9, 17, 13, 35, 0),
      new Date(2020, 9, 18, 10, 0, 0),
      new Date(2020, 9, 16, 11, 12, 0),
      new Date(2020, 9, 16, 17, 49, 0),
      new Date(2020, 9, 16, 10, 1, 0),
      new Date(2020, 9, 16, 18, 59, 0),
      new Date(2020, 9, 19, 15, 0, 0),
      new Date(2020, 9, 19, 16, 15, 0)
    ];
    arrayOfOrderDuration = [60, 60, 61, 88, 121, 240, 540, 1020, 3780];
  });

  test('should return right deadline date', () => {
    expect(estimateDeadline(0)).toBe('');
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBe('Здамо за: одну годину');
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBe('Термін виконання: 19.09.20 о 11:00');
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBe('Термін виконання: 19.09.20 о 11:30');
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBe('Здамо за: дві години');
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBe('Термін виконання: 19.09.20 о 11:00');
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBe('Термін виконання: 16.09.20 о 14:30');
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBe('Термін виконання: 19.09.20 о 19:00');
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBe('Термін виконання: 21.09.20 о 14:00');
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBe('Термін виконання: 28.09.20 о 16:30');
  });

  test('should be defined', () => {
    expect(estimateDeadline(0)).toBeDefined();
    expect(estimateDeadline(0)).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeDefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeDefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeDefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeDefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeDefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeDefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeDefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeDefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeDefined();
  });

  test('should not be undefined', () => {
    expect(estimateDeadline(0)).toBeDefined();
    expect(estimateDeadline(0)).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).not.toBeUndefined();
  });

  test('should be truthy', () => {
    expect(estimateDeadline(0)).toBeDefined();
    expect(estimateDeadline(0)).not.toBeUndefined();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeTruthy();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeTruthy();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeTruthy();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeTruthy();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeTruthy();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeTruthy();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeTruthy();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeTruthy();
    expect(estimateDeadline(arrayOfOrderDuration[i++], arrayOfDates[k++])).toBeTruthy();
  });

  test('should return string as a result', () => {
    expect(typeof estimateDeadline(0)).toMatch(/string/);
  });
});
