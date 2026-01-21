import { CONVERSION_TYPE } from '../types/ConversionType';

export function updateTitle(titleElement: HTMLHeadingElement, newState: CONVERSION_TYPE) {
  const titleType = titleElement.getAttribute('data-title');

  const INPUT_TITLES = {
    [CONVERSION_TYPE.DECIMAL_TO_BINARY]: 'DECIMAL',
    [CONVERSION_TYPE.BINARY_TO_DECIMAL]: 'BINARY',
  };

  const OUTPUT_TITLES = {
    [CONVERSION_TYPE.DECIMAL_TO_BINARY]: 'BINARY',
    [CONVERSION_TYPE.BINARY_TO_DECIMAL]: 'DECIMAL',
  };

  if (titleType === 'input-title') {
    titleElement.innerText = INPUT_TITLES[newState];
  } else if (titleType === 'output-title') {
    titleElement.innerText = OUTPUT_TITLES[newState];
  }
}
