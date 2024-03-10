import { Form } from '../components/form';
import { ExchangesType } from '../types/exchanges';
import { select } from '../components/select';
import { convert } from '../lib/convert';

/**
 * Common create form function.
 * @options lists of select options
 * @return key of HTMLElement
 */
export function createForm(options: ExchangesType[]) {
  const key = 'currency-realtime';

  customElements.define(key, Form);

  const selectElementCurrent = select(options);
  const selectElementConvert = select(options);
  const onChangeSelect = (event: any) => {
    convert(selectElementCurrent.value, selectElementConvert.value)
      .then((result) => console.log({ event, result }))
      .catch((err) => console.log(err));
  };

  selectElementCurrent.addEventListener('change', onChangeSelect);
  selectElementConvert.addEventListener('change', onChangeSelect);

  const component = document.createElement(key);

  component.append(selectElementCurrent);
  component.append(selectElementConvert);

  return component;
}
