import { Header } from '@components/Header';
import { FormCalculation } from '@components/FormCalculation';

export class App {
  private header: Header;
  private formCalculation: FormCalculation;

  constructor() {
    this.header = new Header();
    this.formCalculation = new FormCalculation();
  }

  hydrate(): void {
    this.header.hydrate();
    this.formCalculation.hydrate();
  }
}
