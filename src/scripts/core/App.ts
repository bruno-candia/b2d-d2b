import { Header } from '@components/Header';
import { CalculationForm } from '@/scripts/components/CalculationForm';
import { ConversionState } from '../services/state/ConversionState';
import { DisplayResult } from '../components/DisplayResult';
import { ConversionCalculationService } from '../services/ConversionCalculationService';

export class App {
  private conversionState: ConversionState;

  private conversionCalculationService: ConversionCalculationService;

  private header: Header;
  private calculationForm: CalculationForm;
  private displayResult: DisplayResult;

  constructor() {
    this.conversionState = new ConversionState();

    this.conversionCalculationService = new ConversionCalculationService(this.conversionState);

    this.header = new Header(this.conversionState);
    this.calculationForm = new CalculationForm(this.conversionState);
    this.displayResult = new DisplayResult(this.conversionState, this.conversionCalculationService);
  }

  hydrate(): void {
    this.header.hydrate();
    this.calculationForm.hydrate();
    this.displayResult.hydrate();
  }
}
