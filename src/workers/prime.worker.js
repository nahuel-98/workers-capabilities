import { parentPort, workerData } from 'worker_threads';
import { isPrime } from '../utils/is-prime.js';

function findPrimesInRange(start, end) {
  const primes = [];
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
}

const { start, end } = workerData;
const primes = findPrimesInRange(start, end);
parentPort.postMessage(primes); //Se comunica con el hilo principal a través del método postMessage
