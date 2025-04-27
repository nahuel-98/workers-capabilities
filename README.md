📦 Project: Node.js Multithreading with Worker Threads
This project is a REST API built with Express.js that demonstrates how to use Node.js Worker Threads to parallelize heavy CPU tasks, improving application performance without blocking the main thread.

✨ Main Features
/primes → Calculates all prime numbers between 1 and 50,000 using 4 parallel workers.

/primes/first-n?n=50 → Returns the first N prime numbers (executed on the main thread, no workers).

Logging middleware → Automatically measures the processing time of each request.

Separation of concerns → Code organized into controllers, services, routes, and workers.

Modern ECMAScript Modules (ESM) → Project configured with "type": "module".

🎯 What you learn with this project
How to use Worker Threads in Node.js to run CPU-intensive tasks in parallel.

When to use workers (for CPU-bound tasks) and when not to (for I/O-bound tasks).
