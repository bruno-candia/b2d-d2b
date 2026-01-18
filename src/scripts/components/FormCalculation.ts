export class FormCalculation {
  private element: HTMLFormElement | null;

  constructor() {
    this.element = document.querySelector('.terminal__convert-form');
  }

  hydrate(): void {
    if (!this.element) return;
    this.bindEvents();
  }

  private bindEvents(): void {
    if (!this.element) return;
    this.element.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(this.element!);
    const fieldValue = Number(formData.get('value'));

    if (!fieldValue) return;

    console.log(fieldValue);
  }
}
