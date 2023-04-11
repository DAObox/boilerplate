import { useState } from "react";
import { shortenHash } from "@utils/strings";
import { useDepositEth } from "@daobox/use-aragon";
import { daoAddress } from "../constants";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { toast } from "react-hot-toast";

export function useDeposit() {
  const [amount, setAmount] = useState("");
  const addRecentTransaction = useAddRecentTransaction();

  const { mutate, depositStatus } = useDepositEth({
    daoAddressOrEns: daoAddress,
    amount: BigInt(amount),
    onTransaction(txHash) {
      toast(`Transaction Sent: ${shortenHash(txHash, 6)}`);
      addRecentTransaction({
        hash: txHash,
        description: "Deposit ETH",
      });
    },
    onSuccess(data) {
      toast.success(`Deposited: ${Number(data.deposited)}`);
    },
  });

  const isProcessing = ["waitingForSigner", "confirming"].includes(depositStatus);

  return {
    amount,
    mutate,
    setAmount,
    isProcessing,
    depositStatus,
  };
}
