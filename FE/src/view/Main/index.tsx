import { Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { CONTRACT_ADDRESS, FakeTokenABI } from "../../abi/abi";
import { formattedNumberWithComma } from "../../utils";
import toast from "react-hot-toast";

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect: disconnectWallet } = useDisconnect();

  const disconnect = async () => {
    disconnectWallet();
  };

  const readContractData = (functionName: any, args: any = []) => {
    return useReadContract({
      abi: FakeTokenABI,
      address: CONTRACT_ADDRESS,
      functionName,
      args,
    });
  };

  const totalTokenMined = readContractData("totalSupply").data;
  const totalToken = readContractData("totalToken").data;
  const tokenName = readContractData("name").data;
  const tokenSymbol = readContractData("symbol").data;
  const tokenBalance = readContractData("balanceOf", [address]).data;

  const { data: hash, writeContract: writeMiningContract } = useWriteContract();

  useEffect(() => {
    if (hash) {
      setIsLoading(false);
      console.log("hash", hash);
      toast.success("Mining token successfully!");
    }
  }, [hash]);

  const handleMiningToken = () => {
    try {
      setIsLoading(true);
      writeMiningContract({
        address: CONTRACT_ADDRESS,
        abi: FakeTokenABI,
        functionName: "mintToken",
      });
    } catch (error) {
      setIsLoading(false);
      console.log("handleMiningToken", handleMiningToken);

      toast.error("Error when mining token!");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div>Connect wallet:{address}</div>

        {address ? (
          <>
            <Button onClick={disconnect}>Disconnect</Button>
          </>
        ) : (
          <Button
            onClick={() => connect({ connector: connectors[0] })}
            type="primary"
          >
            {connectors[0].name}
          </Button>
        )}
      </div>

      <div>Token name:{String(tokenName)}</div>
      <div>Token symbol:{String(tokenSymbol)}</div>
      <div>
        Total token mined:
        {formattedNumberWithComma(Number(totalTokenMined), 0)} /{" "}
        {formattedNumberWithComma(Number(totalToken), 0)}
      </div>
      <div>
        Your balance: {formattedNumberWithComma(Number(tokenBalance), 0)}
      </div>

      <Button
        type="primary"
        style={{ marginTop: "20px" }}
        loading={isLoading}
        onClick={handleMiningToken}
      >
        Mining more token
      </Button>
    </div>
  );
};
