import { Header } from '@components/Header';
import { ConverterInput } from '@/scripts/components/ConverterInput';
import { ConversionState } from '../services/state/ConversionState';
import { ConverterOutput } from '../components/ConverterOutput';
import { ConversionCalculationService } from '../services/ConversionCalculationService';
import { SettingsPanel } from '../components/SettingsPanel';
import { SettingsState } from '../services/state/SettingsState';
import { CalculationSteps } from '../components/CalculationSteps';

export class App {
  private conversionState: ConversionState;
  private settingsState: SettingsState;

  private header: Header;
  private converterInput: ConverterInput;
  private calculationSteps: CalculationSteps;
  private converterOutput: ConverterOutput;
  private settingsPanel: SettingsPanel;
  private calculationService: ConversionCalculationService;

  constructor() {
    this.conversionState = new ConversionState();
    this.settingsState = new SettingsState();

    this.header = new Header(this.conversionState);
    this.converterInput = new ConverterInput(this.conversionState);
    this.calculationSteps = new CalculationSteps(this.settingsState, this.conversionState);
    this.converterOutput = new ConverterOutput(this.conversionState);
    this.settingsPanel = new SettingsPanel(this.settingsState);

    this.calculationService = new ConversionCalculationService(
      this.conversionState,
      this.settingsState,
    );

    this.calculationService.setOnStepsGenerated((steps, finalResult) => {
      this.calculationSteps.displayStepsAnimated(steps, finalResult);
    });
  }

  hydrate(): void {
    this.header.hydrate();
    this.converterInput.hydrate();
    this.calculationSteps.hydrate();
    this.converterOutput.hydrate();
    this.settingsPanel.hydrate();
  }
}
