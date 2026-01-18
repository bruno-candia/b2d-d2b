import { Header } from '@components/Header';

export class App {
  private header: Header;

  constructor() {
    this.header = new Header();
  }

  hydrate(): void {
    this.header.hydrate();
  }
}
