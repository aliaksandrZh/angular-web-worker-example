import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  SortWorkerMessageEvent,
  SortWorkerPostMessage,
} from '../workers/types/sort-worker.types';

@Injectable({
  providedIn: 'root',
})
export class SortWorkerService {
  messages$ = new Subject<SortWorkerMessageEvent>();
  worker: Worker = new Worker(
    new URL('../workers/sort.worker', import.meta.url)
  );

  constructor() {
    this.onmessage();
  }

  postMessage(message: SortWorkerPostMessage) {
    this.worker.postMessage(message);
  }

  private nextMessage = (data: MessageEvent<SortWorkerMessageEvent>) => {
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
