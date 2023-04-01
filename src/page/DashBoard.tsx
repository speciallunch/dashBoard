import MetaMaskOnboarding from "@metamask/onboarding";
import React, { useEffect, useState, useRef } from "react";
import { ethers, BigNumber } from "ethers";
// import assignmentAbi from "../res/Assignment.json";
import assignmentAbi from "../res/Assignment.json";
import ERC20Abi from "../res/ERC20.json";

const CONNECT_TEXT = "지갑 연결하기";
const CONNECTED_TEXT = "연결 해제";
const assignmentAddress = "0x2F24860D46B11398214A5e1Ced2e29eFC26F1eE5";
const tWEMIXAddress = "0xE8c96aC07E5E93895743bFCa5fA89B9DcF7d1e3d";
const tUSDTAddress = "0x56d65102f1c8c21115803B975AdA4962F88c94e1";
const tUSDCAddress = "0xea999d33f2b62c35D4CA613919dc835FeFba1E07";
const tDAIAddress = "0xc368cb712c0532d9335027F892a0836259e2033E";
const ETH_PRICE = 1653.22;
const tWEMIX_PRICE = 1.732;
const tDAI = 1.0014;
const tUSDT = 0.9994;
const tUSDC = 0.9993;

enum AssetType {
  NONE = "none",
  WEMIX = "wemix",
  ETH = "eth",
  tUSDT = "tusdt",
  tDAI = "tdai",
  tUSDC = "tusdc",
}

class AssetInfo {
  type: AssetType;

  price: number;

  asset: number;

  assetPrice: number;

  icon: ImageBitmap | undefined;

  constructor() {
    this.type = AssetType.NONE;
    this.price = 0;
    this.asset = 0;
    this.assetPrice = this.price * this.asset;
  }
}

function DashBoard() {
  const [buttonText, setButtonText] = useState(CONNECT_TEXT);
  const [isConnected, setConnected] = useState(false);

  const [accounts, setAccounts] = React.useState<string[]>([]);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.Signer>();
  const [contract, setContract] = useState<ethers.Contract>();

  const [donateAmount, setDonateAmount] = useState(0);
  const assetMap = new Map<number, AssetInfo>();

  const onboarding = useRef<MetaMaskOnboarding>();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0 && onboarding.current) {
        setButtonText(CONNECTED_TEXT);
        setConnected(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setConnected(false);
      }
    }
  }, [accounts]);

  // useEffect(() => {
  //   if (MetaMaskOnboarding.isMetaMaskInstalled()) {
  //     // window.ethereum
  //     //   .request({ method: "eth_requestAccounts" })
  //     //   .then((newAccounts: string[]) => setAccounts(newAccounts));
  //     window.ethereum.on("accountsChanged", (newAccounts: string[]) =>
  //       setAccounts(newAccounts)
  //     );
  //     return () => {
  //       window.ethereum.removeListener(
  //         "accountsChanged",
  //         (newAccounts: string[]) => setAccounts(newAccounts)
  //       );
  //     };
  //   }
  // }, []);

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
          setAccounts(newAccounts);
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
        setAccounts(accounts);
        signer.connect(provider); // 여기서 최초 연결시 에러
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDonateButton = async () => {
    try {
      const result = await contract?.donate();
      console.log("Donate call result:", result);
    } catch (error) {
      console.error("Error calling method:", error);
    }
    setDonateAmount(donateAmount + 0.01);
  };

  const handleTokenInfo = async () => {
    try {
      const result = await contract?.getPoolTokenInfo();
      result.map((v: ethers.BigNumberish) => {
        console.log(ethers.utils.formatUnits(v));
      });
      console.log(result);
      console.log(ethers.utils.formatUnits(result.tDAIBalance));
    } catch (error) {
      console.error("Error calling method:", error);
    }
  };

  const handleGetDonateAmountButton = async () => {
    try {
      const result = await contract?.getDonationAmount(assignmentAddress);
      console.log("Method call result:", result);
      setDonateAmount(Number(ethers.utils.formatUnits(result.tDAIBalance)));
    } catch (error) {
      console.error("Error calling method:", error);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>kurrency</h1>
        <button onClick={handleConnectButton}>{buttonText}</button>
      </div>
      <div className="dashboard">
        <div className="ether-account">
          <h2>내 이더 기부액</h2>
          <strong>{donateAmount * ETH_PRICE}</strong>
          <button onClick={handleDonateButton} color="primary">
            기부하기
          </button>
          <h3>내 기부량</h3>
          <strong>{donateAmount}</strong>
          <h4>달성율</h4>
          <strong>{donateAmount * 100}%</strong>
          <p color="grey">1ETH</p>
          <button onClick={handleGetDonateAmountButton} color="primary">
            기부액가져오기
          </button>
        </div>
        <div className="ether-price">
          <h2>ETH 가격</h2>
          <strong>{ETH_PRICE}</strong>
          <span>풀 자산 규모</span>
        </div>
        <div className="account-detail">
          <h2>자산 상세 구성</h2>
        </div>
        <div className="account-price">
          <h2>자산 정보</h2>
          <button onClick={handleTokenInfo}>가져오기</button>
          <span>자산 수량</span>
          <span>자산 가치</span>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
