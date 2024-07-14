import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  ArrayWorkerMessageEvent,
  ArrayWorkerPostMessage,
} from '../workers/types/array-worker.types';

@Injectable({
  providedIn: 'root',
})
export class ArrayWorkerService {
  messages$ = new Subject<ArrayWorkerMessageEvent>();
  worker: Worker = new Worker(
    new URL('../workers/array.worker', import.meta.url)
  );

  constructor() {
    this.onmessage();
  }

  postMessage(message: ArrayWorkerPostMessage) {
    this.worker.postMessage(message);
  }

  private nextMessage = (data: MessageEvent<ArrayWorkerMessageEvent>) => {
    this.messages$.next(data.data);
  };

  private onmessage() {
    this.worker.addEventListener('message', this.nextMessage);
  }

  destroy() {
    this.worker.removeEventListener('message', this.nextMessage);
    this.worker.terminate();
  }
}
