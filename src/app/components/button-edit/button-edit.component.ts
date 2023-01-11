import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.scss'],
})
export class ButtonEditComponent {
  @Input() bg!: string;
}
