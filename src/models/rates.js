export const COUNTRY_RATES = {
  Sweden: Number(process.env.REACT_APP_RATE_SWEDEN),
  China: Number(process.env.REACT_APP_RATE_CHINA),
  Brazil: Number(process.env.REACT_APP_RATE_BRAZIL),
  Australia: Number(process.env.REACT_APP_RATE_AUSTRALIA),
};
export const COUNTRIES = Object.keys(COUNTRY_RATES);
