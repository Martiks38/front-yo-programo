import {
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { startDecryptingText } from 'src/app/utils/crypt';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnDestroy {
  @Input() id!: string;
  @Input() classes!: string;
  @Input() section!: string;
  @Input() viewEdit!: boolean;

  $id: string = '';

  idAnimation: number | null = null;

  ngAfterViewInit(): void {
    if (this.id) {
      this.idAnimation = window.setTimeout(() => {
        startDecryptingText();
      }, 400);
    }
  }

  ngOnDestroy(): void {
    if (this.idAnimation) window.clearTimeout(this.idAnimation);
  }
}
