import { useState } from "react";
import { shortenHash } from "@utils/strings";
import { UseNewProposalParams, encodeMintToken, useNewProposal } from "@daobox/use-aragon";
import { ONE_DAY, votingAddress, votingToken } from "../constants";
import { useAccount } from "wagmi";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import toast from "react-hot-toast";

export function useMintVote() {
  const initialState: UseNewProposalParams = {
    title: "",
    summary: "",
    description: "",
    resources: [],
    actions: [],
    pluginAddress: votingAddress,
    endDate: ONE_DAY,
  };

  const { address } = useAccount();
  const [voteState, setVoteState] = useState(initialState);
  const addRecentTransaction = useAddRecentTransaction();
  const { mutate: mintVote, proposalStatus } = useNewProposal({
    ...voteState,
    onProposalTransaction(txHash: string) {
      toast(`Transaction Sent: ${shortenHash(txHash, 6)}`);
      addRecentTransaction({
        hash: txHash,
        description: "New Proposal",
      });
    },
    onSuccess(data) {
      toast.success(`New Vote: ${shortenHash(data.proposalTxHash!, 6)}`);
    },
    onError(error) {
      toast.error(`Proposal Error: ${error.message}`);
    },
  });

  const handleMintVote = () => {
    if (!address) return;
    const encodedMintAction = encodeMintToken({
      amount: BigInt(1e18),
      recipientAddress: address,
      tokenAddress: votingToken,
    });

    setVoteState((prevState) => ({
      ...prevState,
      title: "Mint Token",
      summary: `Mint 1 Token to ${address}`,
      description: `Mint 1 Token to ${address}`,
      actions: [encodedMintAction],
    }));
    console.log("voteState", voteState);
    mintVote?.();
  };

  const isProcessingVote = !["idle", "success", "error"].includes(proposalStatus);

  return {
    handleMintVote,
    isProcessingVote,
    proposalStatus,
  };
}
