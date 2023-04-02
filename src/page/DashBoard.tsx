import MetaMaskOnboarding from "@metamask/onboarding";

import React, { useEffect, useState, useRef } from "react";
import { ethers, BigNumber } from "ethers";

import assignmentAbi from "../res/Assignment.json";
import ERC20Abi from "../res/ERC20.json";

import Header from "./Header";
import MainContainer from "./MainContainer";
import styles from "@/res/css/dashboard.module.scss";

const assignmentAddress = "0x2F24860D46B11398214A5e1Ced2e29eFC26F1eE5";
const tWEMIXAddress = "0xE8c96aC07E5E93895743bFCa5fA89B9DcF7d1e3d";
const tUSDTAddress = "0x56d65102f1c8c21115803B975AdA4962F88c94e1";
const tUSDCAddress = "0xea999d33f2b62c35D4CA613919dc835FeFba1E07";
const tDAIAddress = "0xc368cb712c0532d9335027F892a0836259e2033E";

export const ETH_PRICE = 1653.22;
const tWEMIX_PRICE = 1.732;
const tDAI_PRICE = 1.0014;
const tUSDT_PRICE = 0.9994;
const tUSDC_PRICE = 0.9993;

export enum AssetType {
  NONE = "NONE",
  WEMIX = "WEMIX",
  ETH = "ETH",
  tUSDT = "tUSDT",
  tDAI = "tDAI",
  tUSDC = "tUSDC",
}

export class AssetInfo {
  type: AssetType;

  price: number;

  asset: number;

  constructor() {
    this.type = AssetType.NONE;
    this.price = 0;
    this.asset = 0;
  }
}

function generateAssetInfo(type: AssetType, asset: number) {
  const assetInfo = new AssetInfo();
  assetInfo.asset = asset;
  switch (type) {
    case AssetType.WEMIX:
      assetInfo.price = tWEMIX_PRICE;
      assetInfo.type = AssetType.WEMIX;
      break;
    case AssetType.ETH:
      assetInfo.price = ETH_PRICE;
      assetInfo.type = AssetType.ETH;
      break;
    case AssetType.tUSDT:
      assetInfo.price = tUSDT_PRICE;
      assetInfo.type = AssetType.tUSDT;
      break;
    case AssetType.tDAI:
      assetInfo.price = tDAI_PRICE;
      assetInfo.type = AssetType.tDAI;
      break;
    case AssetType.tUSDC:
      assetInfo.price = tUSDC_PRICE;
      assetInfo.type = AssetType.tUSDC;
      break;
  }
  return assetInfo;
}

function DashBoard() {
  const [isConnected, setConnected] = useState(false);

  const [account, setAccounts] = React.useState<string>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.Signer>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [assets, setAssets] = useState<AssetInfo[]>([]);
  const [donateAmount, setDonateAmount] = useState(0);

  const onboarding = useRef<MetaMaskOnboarding>();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (account && onboarding.current) {
      setConnected(true);
      handleTokenInfo();
    }
    return () => {
      onboarding.current?.stopOnboarding();
    };
  }, [account]);

  const handleConnectButton = () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      // 지갑이 설치 안되어있으면 설치 페이지를 오픈한다. 일단 메타마스크만.
      window.open(
        `https://metamask.app.link/dapp/${window.location.host}`,
        "_blank"
      );
      return;
    }
    const { ethereum } = window;
    try {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts: string[]) => {
          setAccounts(newAccounts[0]); // TODO: account 여러개인 경우?
          console.log("newAccount:", newAccounts);
        });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        assignmentAddress,
        assignmentAbi,
        signer
      );

      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      console.log("pro sign cont: ", provider, signer, contract);

      ethereum.on("accountsChanged", (accounts: string[]) => {
        console.log("accountChanged");
        setAccounts(accounts[0]); // TODO: account 여러개인 경우?
        // signer.connect(provider); // 여기서 최초 연결시 에러
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDonateButton = async () => {
    if (!isConnected) return;
    try {
      const result = await contract?.donate();
      // handleGetDonateAmount();  // TODO: 현재 0원으로 나옴
      console.log("Donate call result:", result);
    } catch (error) {
      console.error("Error calling method:", error);
    }
    setDonateAmount(donateAmount + 0.01);
  };

  const handleTokenInfo = async () => {
    try {
      const result = await contract?.getPoolTokenInfo();
      const assetsArray = [];
      assetsArray.push(
        generateAssetInfo(
          AssetType.WEMIX,
          Number(ethers.utils.formatUnits(result.tWEMIXBalance))
        )
      );
      assetsArray.push(
        generateAssetInfo(
          AssetType.ETH,
          Number(ethers.utils.formatUnits(result.tETHBalance))
        )
      );
      assetsArray.push(
        generateAssetInfo(
          AssetType.tUSDT,
          Number(ethers.utils.formatUnits(result.tUSDTBalance))
        )
      );
      assetsArray.push(
        generateAssetInfo(
          AssetType.tUSDC,
          Number(ethers.utils.formatUnits(result.tUSDCBalance))
        )
      );
      assetsArray.push(
        generateAssetInfo(
          AssetType.tDAI,
          Number(ethers.utils.formatUnits(result.tDAIBalance))
        )
      );
      setAssets(assetsArray);
    } catch (error) {
      console.error("Error calling method:", error);
    }
  };

  const handleGetDonateAmount = async () => {
    try {
      const result = await contract?.getDonationAmount(assignmentAddress);
      console.log("Method call result:", result);
      setDonateAmount(Number(ethers.utils.formatUnits(result.tDAIBalance)));
    } catch (error) {
      console.error("Error calling method:", error);
    }
  };

  const calculateTotalAsset = () => {
    return assets.reduce((acc, cur) => {
      return (acc += cur.price * cur.asset);
    }, 0);
  };

  return (
    <div className={styles.dashboard__wrapper}>
      <Header
        isConnected={isConnected}
        account={account}
        onClickConnect={handleConnectButton}
      />
      <MainContainer
        donateAmount={donateAmount}
        totalAssets={calculateTotalAsset()}
        assetsInfo={assets}
        onClickDonateButton={handleDonateButton}
      />
    </div>
  );
}

export default DashBoard;
