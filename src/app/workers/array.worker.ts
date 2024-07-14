/// <reference lib="webworker" />

import {
  ArrayWorkerEvents,
  ArrayWorkerMessageEvent,
} from './types/array-worker.types';

const output = (event: ArrayWorkerMessageEvent) => {
  postMessage(event);
};

function getArrayOfRandomNumbersInRange(min: number, max: number, length = 50) {
  const res = [];

  for (let i = 0; i < length; i++) {
    const n = getRandomNumberInRange(min, max);
    res.push(n);
  }

  return res;
}

const getRandomNumberInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

addEventListener('message', (event) => {
  if (event.data.type === ArrayWorkerEvents.GENERATE_ARRAY) {
    const array = getArrayOfRandomNumbersInRange(0, 1000);
    output({ type: ArrayWorkerEvents.GENERATE_ARRAY, data: array });
  }
});
