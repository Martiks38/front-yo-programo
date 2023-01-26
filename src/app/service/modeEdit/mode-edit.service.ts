import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModeEditService {
  @Output() dispatchEdit: EventEmitter<boolean> = new EventEmitter();

  constructor() {}
}
