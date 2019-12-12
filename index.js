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

// completely ripped off of
// https://js-algorithms.tutorialhorizon.com/2015/09/27/find-all-the-prime-factors-for-the-given-number://js-algorithms.tutorialhorizon.com/2015/09/27/find-all-the-prime-factors-for-the-given-number/
const hasAtLeastTwoPrimeFactors = (num) => {
  const primeFactors = new Set();

  while (num % 2 === 0) {
    primeFactors.add(2);
    num = num / 2;
  }
  
  for (let i = 3; i <= Math.sqrt(num); i++) {
    while (num % i === 0) {
      primeFactors.add(i);
      if (primeFactors.size > 1) return true;
      num = num / i;
    }
  }

  if (num > 2) {
    primeFactors.add(num);
  }

  if (primeFactors.size > 1) return true;

  return false;
}

module.exports = {
  isPrime,
  isComposite,
  rangeGenerator,
  hasAtLeastTwoPrimeFactors,
};

/*
From Charlie Cordova comes a puzzle that brings logic and number theory to the lottery:

Five friends with a lot in common are playing the Riddler Lottery, in which each must choose exactly five numbers from 1 to 70. After they all picked their numbers, the first friend notices that no number was selected by two or more friends. Unimpressed, the second friend observes that all 25 selected numbers are composite (i.e., not prime). Not to be outdone, the third friend points out that each selected number has at least two distinct prime factors. After some more thinking, the fourth friend excitedly remarks that the product of selected numbers on each ticket is exactly the same. At this point, the fifth friend is left speechless. (You can tell why all these people are friends.)

What is the product of the selected numbers on each ticket?

Extra credit: How many different ways could the friends have selected five numbers each so that all their statements are true?
*/
