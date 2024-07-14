import { JsonPipe, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { SortWorkerService } from './services/sort-worker.service';
import { SortWorkerEvents } from './workers/types/sort-worker.types';
import { ArrayWorkerService } from './services/array-wroker.service';
import { ArrayWorkerEvents } from './workers/types/array-worker.types';
import { Subsync } from './utils/subsync';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  subs = new Subsync();
  title = 'sort';
  leftNumber = -1;
  rightNumber = -1;
  array: number[] = [];

  constructor(
    private sortWorkerService: SortWorkerService,
    private arrayWorkerService: ArrayWorkerService
  ) {}

  ngOnInit() {
    this.subs.sync = this.arrayWorkerService.messages$.subscribe((e) => {
      if (e.type === ArrayWorkerEvents.GENERATE_ARRAY) {
        this.array = e.data;
      }
    });

    this.subs.sync = this.sortWorkerService.messages$.subscribe((e) => {
      if (e.type === SortWorkerEvents.BUBBLE_SORT_SWAP_ELEMENTS) {
        const [first, second] = e.data;
        this.highlightSwap(first, second);
      }

      if (e.type === SortWorkerEvents.BUBBLE_SORT_RESULT) {
        this.array = e.data;
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.sortWorkerService.destroy();
    this.arrayWorkerService.destroy();
  }

  generateArrayOfRandomNumbers() {
    this.arrayWorkerService.postMessage({
      type: ArrayWorkerEvents.GENERATE_ARRAY,
    });
  }

  bubbleSort() {
    this.sortWorkerService.postMessage({
      type: SortWorkerEvents.BUBBLE_SORT,
      data: this.array,
    });
  }

  highlightSwap(i: number, j: number) {
    this.leftNumber = i;
    this.rightNumber = j;
  }
}
