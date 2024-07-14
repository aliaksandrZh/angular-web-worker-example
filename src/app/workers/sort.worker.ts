/// <reference lib="webworker" />
import {
  SortWorkerEvents,
  SortWorkerMessageEvent,
  SortWorkerPostMessage,
} from './types/sort-worker.types';

const output = (event: SortWorkerMessageEvent) => {
  postMessage(event);
};

addEventListener('message', (event: MessageEvent<SortWorkerPostMessage>) => {
  if (event.data.type === SortWorkerEvents.BUBBLE_SORT) {
    bblSort(event.data.data);
  }
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bblSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        output({
          type: SortWorkerEvents.BUBBLE_SORT_SWAP_ELEMENTS,
          data: [j, j + 1],
        });

        await sleep(100);

        const temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;

        output({
          type: SortWorkerEvents.BUBBLE_SORT_RESULT,
          data: arr,
        });
      }
    }
  }

  output({
    type: SortWorkerEvents.BUBBLE_SORT_SWAP_ELEMENTS,
    data: [-1, -1],
  });
}
