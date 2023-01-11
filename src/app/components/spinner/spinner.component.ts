import { Component, Input } from '@angular/core';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: `./spinner.component.html`,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() hidden!: boolean;

  isLoading = this.spinnerSvc.isLoading;

  constructor(private spinnerSvc: SpinnerService) {}
}
