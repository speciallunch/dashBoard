import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";

import myContractAbi from "../res/Assignment.json";

const myContractAddress = "0x2F24860D46B11398214A5e1Ced2e29eFC26F1eE5";

const DashBoard2 = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.Signer>();
  const [contract, setContract] = useState<ethers.Contract>();

  const [balance, setBalance] = useState<string>("0");

  const onboarding = React.useRef<MetaMaskOnboarding>();

  useEffect(() => {
    const onboard = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          onboarding.current?.startOnboarding();
          return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          myContractAddress,
          myContractAbi,
          signer
        );

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        console.log("@@@", provider, signer, contract);
        ethereum.on(
          "accountsChanged",
          (accounts: (string | number | undefined)[]) => {
            console.log("accountChanged");
            setBalance("0");
            signer.connect(provider);
          }
        );

        // const balance = await contract.balanceOf(signer.getAddress());
        // setBalance(balance.toString());
        try {
          const result = await contract.getPoolTokenInfo();
          console.log("Method call result:", result);
        } catch (error) {
          console.error("Error calling method:", error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    onboard();
  }, []);

  return (
    <div>
      <h1>Wallet Dashboard</h1>
      {provider && (
        <div>
          <p>Provider: {provider.connection.url}</p>
          <p>Network: {provider.network?.name ?? "noname"}</p>
        </div>
      )}
      {signer && (
        <div>
          <p>Account: </p>
          <p>Balance: {balance}</p>
        </div>
      )}
      {contract && (
        <div>
          <button
            onClick={async () => {
              const tx = await contract.transfer(
                "0x1234567890123456789012345678901234567890",
                "1000000000000000000"
              );
              await tx.wait();
              const balance = await contract.balanceOf(signer?.getAddress());
              setBalance(balance.toString());
            }}
          >
            Transfer
          </button>
        </div>
      )}
    </div>
  );
};

export default DashBoard2;
