export type Styles = {
  detail__wrapper: string;
  detail__contents: string;
  detail__title: string;
  detail__prices: string;
  prices__attribute: string;
  prices__rows: string;
  asset__row: string;
  asset__detail: string;
  asset__type__amount: string;
  asset__type: string;
  asset__amount: string;
  asset__price: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
