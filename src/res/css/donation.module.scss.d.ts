export type Styles = {
  donation__wrapper: string
  donation__title: string
  donation__donate: string
  donation__wrapper: string
  donation__amount: string
  donation__bar: string
  donation__percentage: string
  donation__goal: string
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
