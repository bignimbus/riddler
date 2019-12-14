const {
  product,
  isPrime,
  isComposite,
  rangeGenerator,
  eligibleNumbers,
  hasAtLeastTwoPrimeFactors,
} = require('.');

describe('rangeGenerator', () => {
  test('default', () => {
    expect([...rangeGenerator(1, 10)]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect([...rangeGenerator(-3, 1)]).toEqual([-3, -2, -1, 0, 1]);
    expect([...rangeGenerator(4, 7)]).toEqual([4, 5, 6, 7]);
  });

  test('primes', () => {
    expect([...rangeGenerator(10, 20, isPrime)]).toEqual([11, 13, 17, 19]);
  });

  test('composites', () => {
    expect([...rangeGenerator(60, 70, isComposite)]).toEqual([60, 62, 63, 64, 65, 66, 68, 69, 70]);
  });
});

test('isPrime', () => {
  expect(isPrime(1)).toBe(false);
  expect(isPrime(2)).toBe(true);
  expect(isPrime(3)).toBe(true);
  expect(isPrime(4)).toBe(false);
  expect(isPrime(5)).toBe(true);
  expect(isPrime(6)).toBe(false);
  expect(isPrime(17)).toBe(true);
  expect(isPrime(42)).toBe(false);
});

test('hasAtLeastTwoPrimeFactors', () => {
  expect(hasAtLeastTwoPrimeFactors(4)).toBe(false);
  expect(hasAtLeastTwoPrimeFactors(6)).toBe(true);
  expect(hasAtLeastTwoPrimeFactors(8)).toBe(false);
  expect(hasAtLeastTwoPrimeFactors(10)).toBe(true);
  expect(hasAtLeastTwoPrimeFactors(12)).toBe(true);
});

test('eligibleNumbers', () => {
  expect(eligibleNumbers()).toMatchSnapshot();
});

test('product', () => {
  expect(product([1, 2])).toBe(2);
  expect(product([3, 7])).toBe(21);
  expect(product([10, 20, 10])).toBe(2e3);
});
