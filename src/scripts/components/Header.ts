import type { ConversionState } from '../services/state/ConversionState';
import type { CONVERSION_TYPE } from '../types/ConversionType';

export class Header {
  private element: HTMLElement | null;
  private tabButtons: NodeListOf<HTMLElement>;

  private conversionState: ConversionState;

  constructor(conversionState: ConversionState) {
    this.element = document.querySelector('#header');
    this.tabButtons = document.querySelectorAll('.header__navigation-item');
    this.conversionState = conversionState;
  }

  hydrate(): void {
    if (!this.element) return;
    this.bindEvents();
  }

  private bindEvents(): void {
    this.tabButtons.forEach((button) => {
      button.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  private handleClick(e: Event): void {
    const clickedItem = e.currentTarget as HTMLElement;

    this.tabButtons.forEach((button) => {
      button.classList.remove('is-active');
    });

    clickedItem.classList.add('is-active');

    const tabType = clickedItem.dataset['tab'];

    if (tabType) {
      this.conversionState.setType(tabType as CONVERSION_TYPE);
    }
  }
}
