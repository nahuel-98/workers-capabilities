import os from 'os';
import { Worker } from 'worker_threads';
import { URL } from 'url';
import { isPrime } from '../utils/is-prime.js';

function runWorker(start, end) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/prime.worker.js', import.meta.url), {
      workerData: { start, end }, //es una forma de enviar datos iniciales al worker
    });

    worker.on('message', resolve); //Significado: Cuando el worker envía un mensaje al hilo principal (por ejemplo, usando postMessage), este listener se activa y llama a la función resolve. Esto resuelve la promesa asociada con el worker, pasando el mensaje recibido como resultado. Uso típico: Este evento se utiliza para recibir datos procesados por el worker.
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

export async function calculatePrimesService(max) {
  const threads = os.cpus().length; //determinar la cantidad de threads que se usarán. Tendrá tantos workers como núcleos tenga el procesador. 8 CPUs = 8 workers
  const range = Math.floor(max / threads); //divide el trabajo de acuerdo a la cantidad de threads. Es decir, le va a tocar procesar 12500 numeros a cada worker si el max recibido es de 100mil.
  const startTime = Date.now();

  const promises = [];
  for (let i = 0; i < threads; i++) {
    const start = i * range + 1;
    const end = i === threads - 1 ? max : (i + 1) * range;
    promises.push(runWorker(start, end)); //Para cada "bloque" de números, crea un Worker Thread. Cada worker recibe un rango para ejecutar en paralelo (1, 12500) - (12501, 25000)
  }

  const results = await Promise.all(promises);
  const primes = results.flat(); //Toma los subarreglos y los descompone en uno solo
  const duration = Date.now() - startTime;

  return {
    primesFound: primes.length,
    timeMs: duration,
    workerCount: threads, //Cantidad de CPU
  };
}

export function handleGetFirstNPrimes(n) {
  const primes = [];
  let num = 2;

  while (primes.length < n) {
    if (isPrime(num)) primes.push(num);
    num++;
  }

  return { primes };
}
