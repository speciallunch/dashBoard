import styles from "@/res/css/detail.module.scss";

import { AssetInfo, AssetType } from "@/page/DashBoard";

import WEMIXIcon from "@/res/img/icon_wemix.png";
import ETHIcon from "@/res/img/icon_eth.png";
import tUSDTIcon from "@/res/img/icon_tusdt.png";
import tDAIIcon from "@/res/img/icon_tdai.png";
import tUSDCIcon from "@/res/img/icon_tusdc.png";

interface AssetRowDetailProps {
  assetInfo: AssetInfo;
}

const AssetRowDetail = ({ assetInfo }: AssetRowDetailProps) => {
  function getIcon(type: AssetType) {
    let icon;
    switch (type) {
      case AssetType.WEMIX:
        icon = WEMIXIcon;
        break;
      case AssetType.ETH:
        icon = ETHIcon;
        break;
      case AssetType.tUSDT:
        icon = tUSDTIcon;
        break;
      case AssetType.tDAI:
        icon = tDAIIcon;
        break;
      case AssetType.tUSDC:
        icon = tUSDCIcon;
        break;
      default:
        icon = WEMIXIcon;
    }
    return icon;
  }

  return (
    <div className={styles.detail__asset}>
      <img src={getIcon(assetInfo.type)} alt={assetInfo.type} />
      <div className={styles.detail__asset__row}>
        <div className={styles.detail__asset__price}>
          <span>{assetInfo.type}</span>
          <p>{assetInfo.asset}</p>
        </div>
        <strong>{`$${(assetInfo.asset * assetInfo.price).toFixed(7)}`}</strong>
      </div>
    </div>
  );
};

interface AssetDetailProps {
  assetsInfo?: AssetInfo[];
}

const AssetDetail = ({ assetsInfo }: AssetDetailProps) => {
  if (!assetsInfo) {
    return (
      <div>
        <h2>자산 정보</h2>
      </div>
    );
  }

  const assets = Array.from({ length: assetsInfo.length }, (_, idx) => {
    return (
      <div key={`asset_${idx}`}>
        <AssetRowDetail assetInfo={assetsInfo[idx]} />
      </div>
    );
  });

  return (
    <>
      <div className={styles.detail__wrapper}>
        <h2 className={styles.detail__title}>자산 정보</h2>
        <div className={styles.detail__subtitle}>
          <span>자산 수량</span>
          <span>자산 가치</span>
        </div>
        {assets}
      </div>
    </>
  );
};

export default AssetDetail;
