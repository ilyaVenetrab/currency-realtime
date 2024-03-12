import axios from 'axios';

/**
 * Converts one currency to another.
 */
export function convert(currencies: string, baseCurrency = 'USD') {
  return new Promise<Record<string, number>>((resolve, reject) => {
    axios
      .get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rCzRH1HiajgcNsAjjiMXLASePC2o5kAkP4FsPdVm&base_currency=${baseCurrency}&currencies=${currencies}`,
      )
      .then((body) => {
        return resolve(body.data.data);
      })
      .catch((err) => {
        return reject(err.response.data.errors[0].message);
      });
  });
}
