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
    <>
      <img src={getIcon(assetInfo.type)} alt={assetInfo.type} />
      <div className={styles.asset__detail}>
        <div className={styles.asset__type__amount}>
          <div className={styles.asset__type}>{assetInfo.type}</div>
          <div className={styles.asset__amount}>{assetInfo.asset}</div>
        </div>
        <div className={styles.asset__price}>
          <strong>{`$${(assetInfo.asset * assetInfo.price).toFixed(
            7
          )}`}</strong>
        </div>
      </div>
    </>
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
      <div className={styles.asset__row} key={`asset_${idx}`}>
        <AssetRowDetail assetInfo={assetsInfo[idx]} />
      </div>
    );
  });

  return (
    <>
      <div className={styles.detail__wrapper}>
        <div className={styles.detail__contents}>
          <h2 className={styles.detail__title}>자산 정보</h2>
          <div className={styles.detail__prices}>
            <div className={styles.prices__attribute}>
              <span>자산 수량</span>
              <span>자산 가치</span>
            </div>
            <div className={styles.prices__rows}>{assets}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetDetail;
