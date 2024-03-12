import { select } from './select';
import { convert } from '../lib/convert';
import { ExchangesType } from '../types/exchanges';

enum ELEMENT_ID {
  BASE_CURRENCY = 'baseCurrency',
  CURRENCIES = 'currencies',
  ENTER_VALUE = 'enterValue',
  RESULT = 'result',
}

export class Form extends HTMLElement {
  static ELEMENT_KEY = 'currency-realtime';

  private options: ExchangesType[] = [];

  private onChangeSelect() {
    const baseCurrency = (this.querySelector(`#${ELEMENT_ID.BASE_CURRENCY}`) as HTMLSelectElement)
      .value;
    const currencies = (this.querySelector(`#${ELEMENT_ID.CURRENCIES}`) as HTMLSelectElement).value;

    convert(currencies, baseCurrency)
      .then((result) => {
        let [key, value] = Object.entries(result)[0];

        const enterValueEl = this.querySelector(`#${ELEMENT_ID.ENTER_VALUE}`) as HTMLInputElement;
        const resultEl = this.querySelector(`#${ELEMENT_ID.RESULT}`);
        if (resultEl) {
          resultEl.innerHTML = String((enterValueEl.value as any) * value) + ` ${key}`;
        }
      })
      .catch((err) => console.log(err));
  }

  private addSelect(id: string) {
    const selectElement = select(this.options);
    selectElement.setAttribute('id', id);
    selectElement.addEventListener('change', this.onChangeSelect.bind(this));
    return selectElement;
  }

  private addInput() {
    const input = document.createElement('input');
    input.setAttribute('id', ELEMENT_ID.ENTER_VALUE);
    input.setAttribute('value', this.getAttribute('data-value') || '');
    input.addEventListener('change', this.onChangeSelect.bind(this));

    return input;
  }

  private addResult() {
    const result = document.createElement('span');
    result.setAttribute('id', ELEMENT_ID.RESULT);

    return result;
  }

  connectedCallback() {
    if (typeof this.getAttribute('options') === 'string') {
      this.options = JSON.parse(this.getAttribute('options') as string);
    }

    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.columnGap = '10px';
    form.style.alignItems = 'center';
    form.style.padding = '10px 0';

    form.append(this.addSelect(ELEMENT_ID.BASE_CURRENCY));
    form.append(this.addSelect(ELEMENT_ID.CURRENCIES));
    form.append(this.addInput());
    form.append(this.addResult());

    this.append(form);

    this.onChangeSelect();
  }
}
