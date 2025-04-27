import { calculatePrimesService, handleGetFirstNPrimes } from '../services/prime.service.js';

async function calculatePrimes(req, res) {
  const max = parseInt(req.query.max, 10);
  if (isNaN(max) || max < 2) {
    return res.status(400).json({ error: 'Invalid max parameter' });
  }
  try {
    const primes = await calculatePrimesService(max);
    res.json({ primes });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

function getFirstNPrimes(req, res) {
  const n = parseInt(req.query.n, 10);
  if (isNaN(n) || n < 1) {
    return res.status(400).json({ error: 'Invalid n parameter' });
  }

  try {
    const primes = handleGetFirstNPrimes(n);
    res.json({ primes });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { calculatePrimes, getFirstNPrimes };
