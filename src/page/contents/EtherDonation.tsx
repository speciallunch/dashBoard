import styles from "@/res/css/donation.module.scss";

import { LinearProgress } from "@mui/material";

import { ETH_PRICE } from "@/page/DashBoard";

interface EtherDonationProps {
  donateAmount: number;
  onClickDonateButton: () => void;
}

const EtherDonation = ({
  donateAmount,
  onClickDonateButton,
}: EtherDonationProps) => {
  return (
    <>
      <div className={styles.donation__wrapper}>
        <h2 className={styles.donation__title}>내 이더 기부액</h2>
        <div className={styles.donation__donate}>
          <strong>{`$${(donateAmount * ETH_PRICE).toFixed(2)}`}</strong>
          <button onClick={onClickDonateButton}>기부하기</button>
        </div>
        <h3 className={styles.donation__amount}>
          내 기부량 {donateAmount.toFixed(3)} ETH
        </h3>
        <div className={styles.donation__bar}>
          <LinearProgress variant="determinate" value={donateAmount * 100} />
          <div className={styles.donation__percentage}>
            <h4>달성율</h4>
            <strong>{(donateAmount * 100).toFixed(2)}%</strong>
          </div>
          <p className={styles.donation__goal}>1ETH</p>
        </div>
      </div>
    </>
  );
};

export default EtherDonation;
