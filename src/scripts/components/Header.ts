export class Header {
  private element: HTMLElement | null;
  private tabButtons: NodeListOf<HTMLElement>;

  constructor() {
    this.element = document.querySelector('#header');
    this.tabButtons = document.querySelectorAll('.header__navigation-item');
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
  }
}
