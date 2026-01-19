import { CONVERSION_TYPE } from '../types/ConversionType';

export function updateTitle(formTitleElement: HTMLHeadingElement, newState: CONVERSION_TYPE) {
  const FORM_TITLES = {
    [CONVERSION_TYPE.DECIMAL_TO_BINARY]: 'DECIMAL',
    [CONVERSION_TYPE.BINARY_TO_DECIMAL]: 'BINARY',
  };

  formTitleElement.innerText = FORM_TITLES[newState];
}
