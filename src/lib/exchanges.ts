import { createForm } from '../utils/create-form';
import axios from 'axios';
import { ExchangesType } from '../types/exchanges';

interface IConvertType {
  message: string;
}

/**
 * Get data and create form element.
 * @param id HTMLElement identification
 */
export function exchanges(id: string) {
  return new Promise<IConvertType>((resolve, reject) => {
    if (!document.getElementById(id)) {
      return reject(new Error(`Element with id = ${id} not found`));
    }

    axios
      .get(
        `https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_rCzRH1HiajgcNsAjjiMXLASePC2o5kAkP4FsPdVm`,
      )
      .then((body: { data: { data: [ExchangesType] } }) => {
        document.getElementById(id)?.append(createForm(body.data.data));
        return resolve({ message: `create element in id: ${id}` });
      })
      .catch((err) => {
        return reject(err.response.data.errors[0].message);
      });
  });
}
