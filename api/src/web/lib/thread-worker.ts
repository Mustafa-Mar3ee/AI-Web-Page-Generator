import { Worker, isMainThread, parentPort } from 'worker_threads';

const runThread = async (passedWorkerData, workerPath) => {
  if (isMainThread) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(`${__dirname}/workers/${workerPath}`, { workerData: passedWorkerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  } else {
    console.log('child thread...');
    // const result = doSomeHeavyComputing()
    // parentPort.postMessage({ result})
  }
};

export { runThread };
