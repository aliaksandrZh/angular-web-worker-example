export enum SortWorkerEvents {
  BUBBLE_SORT,
  BUBBLE_SORT_SWAP_ELEMENTS,
  BUBBLE_SORT_RESULT,
}

export type SortWorkerPostMessage = {
  type: SortWorkerEvents.BUBBLE_SORT;
  data: number[];
};

export type SortWorkerMessageEvent =
  | {
      type: SortWorkerEvents.BUBBLE_SORT_RESULT;
      data: number[];
    }
  | {
      type: SortWorkerEvents.BUBBLE_SORT_SWAP_ELEMENTS;
      data: [number, number];
    };
