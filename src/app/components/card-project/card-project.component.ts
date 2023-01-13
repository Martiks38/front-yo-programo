import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action, Project } from 'src/app/interfaces';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.scss'],
})
export class CardProjectComponent implements OnInit {
  @Input() project!: Project;
  @Input() viewEdit!: boolean;
  @Output() updateProject: EventEmitter<Project> = new EventEmitter();
  @Output() action: EventEmitter<Action<Project>> = new EventEmitter();

  paragraphs: string[] = [];
  techs: string = 'Hecho con ';
  urlImgs: string[] = [];

  intervalSlider!: any;
  activeImg!: HTMLElement;
  timeoutStartOut!: any;
  currentIndex = 0;
  imgs!: NodeListOf<HTMLImageElement>;

  ngOnInit(): void {
    let sliceParagraphs = this.project.description.split('\\n');

    this.urlImgs = this.project.url_img.split('\\n');

    this.paragraphs = sliceParagraphs.slice(0, -1);

    let length = sliceParagraphs.length;

    let words = sliceParagraphs[length - 1]
      .split(/Hecho con /)
      .filter((words) => words !== '');

    this.techs += '<strong class="card-word-em">' + words + '</strong>.';
  }

  // Card
  delete(event: Event) {
    let container = (event.target as HTMLElement)?.closest('.card');
    let title = container?.querySelector('.card-title')?.textContent;

    const MSG_CHECK = `¿Estás seguro que quieres eliminar ${title} de tus proyectos?`;

    let checkDelete = window.confirm(MSG_CHECK);

    if (checkDelete)
      this.action.emit({ action: 'delete', element: this.project });
  }

  update() {
    this.updateProject.emit(this.project);
  }

  // Effects
  // Slider effect
  slider(event: MouseEvent) {
    if (window.innerWidth < 991) return;

    this.intervalSlider = window.setInterval(() => {
      let $card = event.target as HTMLElement;

      this.imgs = $card.querySelectorAll('.card-img');

      this.nextImageActive($card);
    }, 1800);
  }

  moveActive = () => {
    this.activeImg.classList.remove('active');
    this.activeImg.classList.remove('start-out');
  };

  nextImageActive(card: HTMLElement) {
    this.activeImg = card.querySelector('.card-img.active') as HTMLElement;

    this.activeImg.classList.add('start-out');

    this.timeoutStartOut = window.setTimeout(this.moveActive, 500);

    this.currentIndex++;

    if (this.currentIndex >= this.imgs.length) this.currentIndex = 0;

    let img = this.imgs[this.currentIndex];

    img.classList.add('active');
  }

  reset = () => {
    if (this.intervalSlider) window.clearInterval(this.intervalSlider);
    if (this.timeoutStartOut) window.clearTimeout(this.timeoutStartOut);

    if (this.currentIndex === 0) return;

    let imgActive = this.imgs[this.currentIndex];

    imgActive.classList.add('start-out');

    this.currentIndex = 0;
    this.imgs[0].classList.add('active');

    setTimeout(() => {
      imgActive.classList.remove('start-out');

      this.imgs.forEach((img, ind) => {
        let imgClassList = img.classList;

        let isActive = imgClassList.contains('active');

        if (isActive && ind !== 0) imgClassList.remove('active');
      });
    }, 500);
  };

  // Ripple effect
  ripple(ev: MouseEvent) {
    const target = ev.target as HTMLElement;

    if (!target) return;

    let elements = target.querySelectorAll('.button-link > *');

    if (elements.length > 2) return;

    const { x, y } = ev;

    let { width, left, top } = target.getBoundingClientRect();

    let ripple = document.createElement('span');

    let styles = `
      position: absolute;
      display: block;
      width: ${2.5 * width}px;
      height: ${2.5 * width}px;
      top: ${y - top - 1.25 * width}px;
      left: ${x - left - 1.25 * width}px;
      background-color: var(--color-primary);
      border-radius: 50%;
      z-index: 1;
      transform: scale(0);
      transition-property: transform opacity;
      transition: 0.3s cubic-bezier(0.3, 0, 0.2, 1);
    `;

    ripple.style.cssText = styles;

    setTimeout(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '1';
    }, 50);

    target.style.color = '#000';

    target.insertAdjacentElement('afterbegin', ripple);
  }

  removeRipple(ev: MouseEvent) {
    const target = ev.target as HTMLElement;

    if (!target) return;

    let ripple = target.firstChild as HTMLElement;

    let { x, y } = ev;
    let { width, left, top } = target.getBoundingClientRect();

    target.removeAttribute('style');

    ripple.style.transform = 'scale(0)';
    ripple.style.top = `${y - top - 1.25 * width}px`;
    ripple.style.left = `${x - left - 1.25 * width}px`;

    setTimeout(() => {
      ripple.remove();
    }, 350);
  }
}
