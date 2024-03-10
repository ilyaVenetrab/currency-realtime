import { ExchangesType } from '../types/exchanges';

export function select(list: ExchangesType[]) {
  const selectElement = document.createElement('select');

  for (let [_key, value] of Object.entries(list)) {
    const option = document.createElement('option');

    option.setAttribute('name', _key);
    option.setAttribute('label', value.name);
    option.setAttribute('value', value.code);
    selectElement.append(option);
  }

  return selectElement;
}
