import styles from "@/res/css/main.module.scss";
import { useCallback, useEffect } from "react";

import AssetChart from "./contents/AssetChart";
import AssetDetail from "./contents/AssetDetail";
import EtherDonation from "./contents/EtherDonation";
import EtherPrice from "./contents/EtherPrice";
import { AssetInfo } from "./DashBoard";

interface MainContainerProps {
  donateAmount: number;
  totalAssets: number;
  assetsInfo?: AssetInfo[];
  onClickDonateButton: () => void;
}

const MainContainer = ({
  donateAmount,
  totalAssets,
  assetsInfo,
  onClickDonateButton,
}: MainContainerProps) => {
  console.log("메인:", donateAmount, totalAssets, assetsInfo);
  return (
    <div className={styles.main__wrapper}>
      <h1 className={styles.main__title}>대시보드</h1>
      <EtherDonation
        donateAmount={donateAmount}
        onClickDonateButton={onClickDonateButton}
      />
      <EtherPrice totalAsset={totalAssets} />
      <AssetChart totalAsset={totalAssets} assetsInfo={assetsInfo} />
      <AssetDetail assetsInfo={assetsInfo} />
    </div>
  );
};

export default MainContainer;
