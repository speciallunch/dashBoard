import styles from "@/res/css/price.module.scss";

import { ETH_PRICE } from "@/page/DashBoard";

import ETHIcon from "@/res/img/icon_eth.png";

interface EtherPriceProps {
  totalAsset: number;
}

const EtherPrice = ({ totalAsset }: EtherPriceProps) => {
  return (
    <>
      <div className={styles.price__wrapper}>
        <div className={styles.price__eth}>
          <img src={ETHIcon} alt="etherIcon" />
          <p>ETH 가격</p>
        </div>
        <strong>{`$${ETH_PRICE}`}</strong>
        <div className={styles.price__totalasset}>
          <span>풀 자산 규모</span>
          <p>{`$${totalAsset.toFixed(3)}`}</p>
        </div>
      </div>
    </>
  );
};

export default EtherPrice;
