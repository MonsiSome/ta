const { estimateCost, estimateMinutes, estimateDeadline } = require('../editingService/estimateOrder');

describe('Estimate Price', () => {

  test.each`
    text        | language     | docType      | result
    ${0}        | ${'EN'}      | ${'.none'}   | ${0}
    ${''}       | ${'RU'}      | ${'.docx'}   | ${0}
    ${''}       | ${'RU'}      | ${undefined} | ${0}
    ${920}      | ${'RU'}      | ${'.docx'}   | ${50} 
    ${100300}   | ${'RU'}      | ${'.docx'}   | ${5015} 
    ${100300}   | ${'RU'}      | ${'.none'}   | ${6018} 
    ${920}      | ${'EN'}      | ${'.docx'}   | ${120} 
    ${100300}   | ${'EN'}      | ${'.docx'}   | ${12036}
  `('should return total cost for the order', ({ text, language, docType, result }) => {
    expect(estimateCost(text, language, docType)).toBe(result);
  });

  test.each`
    text        | language     | docType      | result
    ${920}      | ${'RU'}      | ${'.none'}   | ${55.2}
    ${920}      | ${'EN'}      | ${'.none'}   | ${132.48} 
    ${100300}   | ${'EN'}      | ${'.none'}   | ${14443.2}
  `('should return ~total float cost for the order', ({ text, language, docType, result }) => {
    expect(estimateCost(text, language, docType)).toBeCloseTo(result);
  });

  test.each`
    text        | language     | docType      | result
    ${1}        | ${'EN'}      | ${'.none'}   | ${50}
    ${'abc'}    | ${'RU'}      | ${'.docx'}   | ${50}
    ${20}       | ${'RU'}      | ${'.docx'}   | ${50}
    ${20}       | ${'RU'}      | ${'.none'}   | ${50} 
    ${999}      | ${'RU'}      | ${'.docx'}   | ${50}
    ${999}      | ${'RU'}      | ${undefined} | ${50}
    ${800}      | ${'RU'}      | ${'.docx'}   | ${50}
    ${800}      | ${'RU'}      | ${'.none'}   | ${50} 
    ${833}      | ${'RU'}      | ${'.none'}   | ${50}
    ${20}       | ${'EN'}      | ${'.docx'}   | ${120}
    ${20}       | ${'EN'}      | ${'.none'}   | ${120} 
    ${333}      | ${'EN'}      | ${'.docx'}   | ${120}
    ${333}      | ${'EN'}      | ${undefined} | ${120}
    ${920}      | ${'EN'}      | ${'.docx'}   | ${120}
    ${999}      | ${'EN'}      | ${'.none'}   | ${120}
  `('should be defined, truthy & return price more or equal than minimal', ({ text, language, docType, result }) => {
    expect(estimateCost(text, language, docType)).toBeGreaterThanOrEqual(result);
    expect(estimateCost(text, language, docType)).toBeDefined();
    expect(estimateCost(text, language, docType)).not.toBeUndefined();
    expect(estimateCost(text, language, docType)).toBeTruthy();
    expect(typeof estimateCost(text, language, docType)).toMatch(/number/);
  });

});

describe('Estimate Minutes: ', () => {

  test.each`
    text        | language     | docType      | result
    ${1}        | ${'EN'}      | ${'.none'}   | ${60}
    ${'a'}      | ${'RU'}      | ${'.docx'}   | ${60}
    ${666}      | ${'RU'}      | ${'.docx'}   | ${60}
    ${667}      | ${'RU'}      | ${'.docx'}   | ${61} 
    ${920}      | ${'RU'}      | ${'.docx'}   | ${72}
    ${920}      | ${'RU'}      | ${'.none'}   | ${86}
    ${1333}     | ${'RU'}      | ${'.docx'}   | ${90} 
    ${1333}     | ${'RU'}      | ${'.none'}   | ${108}
    ${100300}   | ${'RU'}      | ${undefined} | ${4545}
    ${100300}   | ${'RU'}      | ${'.docx'}   | ${4545}
    ${100300}   | ${'RU'}      | ${'.none'}   | ${5454} 
    ${166}      | ${'EN'}      | ${'.docx'}   | ${60}
    ${167}      | ${'EN'}      | ${'.docx'}   | ${61}
    ${333}      | ${'EN'}      | ${'.docx'}   | ${90}
    ${333}      | ${'EN'}      | ${'.none'}   | ${108}
    ${920}      | ${'EN'}      | ${'.docx'}   | ${196}
    ${920}      | ${'EN'}      | ${'.none'}   | ${235}
    ${100300}   | ${'EN'}      | ${undefined} | ${18103}
    ${100300}   | ${'EN'}      | ${'.docx'}   | ${18103}
    ${100300}   | ${'EN'}      | ${'.none'}   | ${21723}
  `('should be defined, truthy & return total minutes for the order', ({ text, language, docType, result }) => {
    expect(estimateMinutes(text, language, docType)).toBe(result);
    expect(estimateMinutes(text, language, docType)).toBeDefined();
    expect(estimateMinutes(text, language, docType)).not.toBeUndefined();
    expect(estimateMinutes(text, language, docType)).toBeTruthy();
    expect(typeof estimateMinutes(text, language, docType)).toMatch(/number/);
  });

  test.each`
    text        | language     | docType      | result
    ${0}        | ${'EN'}      | ${'.none'}   | ${0}
    ${''}       | ${'RU'}      | ${'.docx'}   | ${0}
    ${''}       | ${'RU'}      | ${undefined} | ${0}
  `('should be defined, falsy & return 0 when there is no text', ({ text, language, docType, result }) => {
    expect(estimateMinutes(text, language, docType)).toBe(result);
    expect(estimateMinutes(text, language, docType)).toBeDefined();
    expect(estimateMinutes(text, language, docType)).not.toBeUndefined();
    expect(estimateMinutes(text, language, docType)).not.toBeTruthy();
    expect(typeof estimateMinutes(text, language, docType)).toMatch(/number/);
  });

});

describe('Estimate deadline date', () => {
  test.each`
    durationMinutes  | orderDate                            | result
    ${0}             | ${undefined}                         | ${''}
    ${60}            | ${new Date(2020, 9, 21, 12, 20, 0)}  | ${'Здамо за: одну годину'}
    ${60}            | ${new Date(2020, 9, 17, 13, 35, 0)}  | ${'Термін виконання: 19.09.20 о 11:00'}
    ${61}            | ${new Date(2020, 9, 18, 10, 0, 0)}   | ${'Термін виконання: 19.09.20 о 11:30'}
    ${88}            | ${new Date(2020, 9, 16, 11, 12, 0)}  | ${'Здамо за: дві години'}
    ${121}           | ${new Date(2020, 9, 16, 17, 49, 0)}  | ${'Термін виконання: 19.09.20 о 11:00'}
    ${240}           | ${new Date(2020, 9, 16, 10, 1, 0)}   | ${'Термін виконання: 16.09.20 о 14:30'}
    ${540}           | ${new Date(2020, 9, 16, 18, 59, 0)}  | ${'Термін виконання: 19.09.20 о 19:00'}
    ${1020}          | ${new Date(2020, 9, 19, 15, 0, 0)}   | ${'Термін виконання: 21.09.20 о 14:00'}
    ${3780}          | ${new Date(2020, 9, 19, 16, 15, 0)}  | ${'Термін виконання: 28.09.20 о 16:30'}
  `('should be defined & return string with deadline for the order', ({ durationMinutes, orderDate, result }) => {
    expect(estimateDeadline(durationMinutes, orderDate)).toBe(result);
    expect(estimateDeadline(durationMinutes, orderDate)).toBeDefined();
    expect(estimateDeadline(durationMinutes, orderDate)).not.toBeUndefined();
    expect(typeof estimateDeadline(durationMinutes, orderDate)).toMatch(/string/);
  });
});
