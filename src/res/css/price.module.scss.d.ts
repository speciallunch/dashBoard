export type Styles = {
  price__wrapper: string
  price__eth: string
  price__title: string
  price__totalasset: string
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
