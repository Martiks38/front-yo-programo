import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
})
export class ButtonEditComponent {
  @Input() bg!: string;
}
