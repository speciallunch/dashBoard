import styles from "@/res/css/header.module.scss";
import logoImg from "@/res/img/logo.png";
import accountLogoImg from "@/res/img/MetaLogo.png";

interface HeaderProps {
  isConnected: boolean;
  account?: string;
  onClickConnect: () => void;
}

const CONNECT_TEXT = "지갑 연결하기";
const CONNECTED_TEXT = "연결 해제";

const Header = ({ isConnected, account, onClickConnect }: HeaderProps) => {
  console.log("헤더:", isConnected, account);
  return (
    <>
      <div className={styles.header__wrapper}>
        <div className={styles.header__logo}>
          <img alt={"Kurrency"} src={logoImg} />
        </div>
        <div className={styles.header__account}>
          {isConnected ? (
            <>
              <img alt={"MetaMask"} src={accountLogoImg} />
              <p className={styles.header__text}>{account}</p>
            </>
          ) : (
            <></>
          )}
          <button
            className={
              isConnected ? styles.header__button__gray : styles.header__button
            }
            onClick={onClickConnect}
          >
            {isConnected ? CONNECTED_TEXT : CONNECT_TEXT}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
