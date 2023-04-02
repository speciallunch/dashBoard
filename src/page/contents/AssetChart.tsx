import { PieChart } from "react-minimal-pie-chart";

import styles from "@/res/css/chart.module.scss";

import { AssetInfo } from "@/page/DashBoard";

interface AssetChartProps {
  assetsInfo?: AssetInfo[];
  totalAsset: number;
}

const AssetChart = ({ assetsInfo, totalAsset }: AssetChartProps) => {
  if (!assetsInfo) {
    return (
      <div className={styles.chart__wrapper}>
        <h2 className={styles.chart__title}>자산 상세 구성</h2>
      </div>
    );
  }

  const assetData = Array.from(
    assetsInfo,
    (asset) => ((asset.asset * asset.price) / totalAsset) * 100
  );

  console.log(assetData);
  return (
    <>
      <div className={styles.chart__wrapper}>
        <h2 className={styles.chart__title}>자산 상세 구성</h2>
        <PieChart
          startAngle={220}
          lineWidth={25}
          data={[
            { title: "WEMIX", value: assetData[0], color: "#00DB68" },
            { title: "ETH", value: assetData[1], color: "#365161" },
            { title: "tUSDT", value: assetData[2], color: "#269D6A" },
            { title: "tUSDC", value: assetData[3], color: "#4393EB" },
            { title: "tDAI", value: assetData[4], color: "#FFC439" },
          ]}
        />
      </div>
    </>
  );
};

export default AssetChart;
