import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() btnStyles = '';
  @Input() accesibility = {};

  ngAfterContentInit(): void {
    Object.entries(this.accesibility).forEach((value) => {
      const button = document.querySelector('.menu');

      button?.setAttribute(`aria-${value[0]}`, `${value[1]}`);
    });
  }
}
