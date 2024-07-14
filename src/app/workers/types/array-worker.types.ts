export enum ArrayWorkerEvents {
  GENERATE_ARRAY,
}

export type ArrayWorkerMessageEvent = {
  type: ArrayWorkerEvents;
  data: number[];
};

export type ArrayWorkerPostMessage = { type: ArrayWorkerEvents };
