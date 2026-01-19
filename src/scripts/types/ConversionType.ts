export interface State {
  type: CONVERSION_TYPE;
  input: string;
  result: string;
  history: Array<string>;
}

const CONVERSION_TYPE = {
  DECIMAL_TO_BINARY: 'DECIMAL_TO_BINARY',
  BINARY_TO_DECIMAL: 'BINARY_TO_DECIMAL',
} as const;

type CONVERSION_TYPE = (typeof CONVERSION_TYPE)[keyof typeof CONVERSION_TYPE];

export { CONVERSION_TYPE };
