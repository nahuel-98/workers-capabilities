import { Router } from 'express';
import { calculatePrimes, getFirstNPrimes } from '../controllers/prime.ctrl.js';

const router = Router();

router.get('/primes', calculatePrimes); // /primes?max=100000
router.get('/primes/first-n', getFirstNPrimes); // /primes/first-n?n=50

export default router;
