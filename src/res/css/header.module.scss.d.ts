export type Styles = {
  header__wrapper: string;
  header__logo: string;
  header__account: string;
  header__text: string;
  header__button: string;
  header__button__gray: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
