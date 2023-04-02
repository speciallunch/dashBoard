export type Styles = {
  detail__wrapper: string
  detail__title: string
  detail__subtitle: string
  detail__asset: string
  detail__asset__price: string
  detail__asset__row: string
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
