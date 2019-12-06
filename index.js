function * rangeGenerator (
  lowerBound,
  upperBound,
  predicate = () => true,
) {
  for (let n = lowerBound; n <= upperBound; n++) {
    if (predicate(n)) {
      yield n;
    }
  }
}

const negate = fn => (...args) => !fn(args);

const isPrime = (n, dividend = 2) => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (dividend * 2 > n) return true;
  return n % dividend === 0 ?
    false :
    isPrime(n, dividend + 1);
}

const isComposite = negate(isPrime);

const isOneOfTwoPrimeFactors = (num, factor) => {
  if (num % factor) return false;
  const secondFactor = num / factor;
  return secondFactor !== factor && isPrime(secondFactor);
};

// this function is wrong as-is - it does not take into
// account multiple prime factors such as 2 * 2 * 3 = 12
const hasTwoOrMorePrimeFactors = (n) => {
  const iterator = rangeGenerator(2, Math.round(n / 2 + 0.5), (num) => (
    isPrime(num) &&
      isOneOfTwoPrimeFactors(n, num)
  ));

  /* eslint-disable no-unused-vars */
  for (const _ of iterator) {
  /* eslint-enable no-unused-vars */
    // if there are literally any 
    return true;
  }
  return false;
};

module.exports = {
  isPrime,
  isComposite,
  rangeGenerator,
  hasTwoOrMorePrimeFactors,
};

/*
From Charlie Cordova comes a puzzle that brings logic and number theory to the lottery:

Five friends with a lot in common are playing the Riddler Lottery, in which each must choose exactly five numbers from 1 to 70. After they all picked their numbers, the first friend notices that no number was selected by two or more friends. Unimpressed, the second friend observes that all 25 selected numbers are composite (i.e., not prime). Not to be outdone, the third friend points out that each selected number has at least two distinct prime factors. After some more thinking, the fourth friend excitedly remarks that the product of selected numbers on each ticket is exactly the same. At this point, the fifth friend is left speechless. (You can tell why all these people are friends.)

What is the product of the selected numbers on each ticket?

Extra credit: How many different ways could the friends have selected five numbers each so that all their statements are true?
*/