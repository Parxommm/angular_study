import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  rangeFromOne(end: number): number[] {
    return [...Array(end).keys()].map((n) => n + 1);
  }
}
