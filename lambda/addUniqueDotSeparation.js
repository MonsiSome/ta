function addUniqueDotSeparation(str) {
  const variants = [];

  let mask = new Array(str.length-1).fill(1).join(''); //идеи как удленнить код

  for (let i = 0; i < (1 << (str.length - 1)); i++) { //больше побитовых операторов
    let variant = str[0] || '';

    let binaryArray = [...(i.toString(2) ^ mask).toString().padStart(str.length - 1, '0')] //идеи как удленнить код

    binaryArray.forEach((elem, index) => {
      variant += ((elem === '0') ? '.' : '') + (str[index + 1] || '');
    });
    variants.push(variant);
  }
  return variants;
}

// console.log(addUniqueDotSeparation('abc'));

function uniqueDotSeparation(input, prefix = '', counter = 0, result = []) {
  if (counter === input.length - 1) {
    prefix += input[counter];
    result.push(prefix);
    return result;
  }

  prefix += input[counter];
  uniqueDotSeparation(input, prefix, counter + 1, result)
  uniqueDotSeparation(input, prefix + '.', counter + 1, result)

  return result;
}

// console.log(uniqueDotSeparation('abcd'))

function permutePunc(str) {
  // const characters = str.split('');
  return new Array(2 ** ((str.length || 1) - 1)).fill(0).map((_, i) => [...i.toString(2).padStart(str.length - 1, '0')].reduce((variant, el, i) =>
    variant + ((el == 0) ? '' : '.') + (str[i + 1] || ''), str[0] || ''));
}

// console.log(permutePunc('abcd'));

// первый вариант решения своими словами. И использовать вместо бинарной строки, 
// с помощью побитовых операций определять где должна быть точка а где нет. 

function addUniqueDotSeparation2(str) {
  const variants = [];

  for (let i = 0; i < (1 << (str.length - 1)); i++) { //максимум побитовых операторов
    // console.log(i&1);
    let mask = i.toString(2),
      letterIndex = str.length - 1,
      variant = str[letterIndex] || '';

    while (mask.length > 0 || letterIndex > 0) {
      if (!!(mask & 1)) {
        variant += '.' + str[letterIndex-1]
      } else {
        variant += str[letterIndex - 1];
      }
      mask >>= 1;
      letterIndex--;
    }

    variants.push([...variant].reverse().join(''));
  }
  return variants;
}

// console.log(addUniqueDotSeparation2('abcd'));

// let arr = [1, 2, 3, 4];

// let max = Math.max.apply(null, arr)
// let max2 = Math.max.apply(Math, arr)
// let max3 = Math.max(...arr)
// console.log(max3)

// let date = new Date(...arr)
// console.log(date)

// let name = 'Monsi';
// let [first, ...rest] = [...name];
// console.log(first, rest)

function addUniqueDotSeparation3(str) {
  const variants = [];

  for (let i = 0; i < (1 << (str.length - 1)); i++) { //максимум побитовых операторов
    
    let mask = i;
        letterIndex = str.length - 1;
        variant = str[letterIndex] || '';
    
    while (mask > 0 || letterIndex > 0) {
      if (!!(mask & 1)) {
        variant += '.' + str[letterIndex - 1]
      } else {
        variant += str[letterIndex - 1];
      }
      letterIndex--;
      mask >>= 1;
    }

    variants.push([...variant].reverse().join(''));
  }
  return variants;
}

// console.log(addUniqueDotSeparation3('abcd'));

// let num = 5;
// let shift = num >> 1 >> 1 >> 1
// console.log(num.toString(2))
// console.log(shift.toString(2))
// console.log(shift.toString(2) > 0)