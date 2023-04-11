import React, { useState } from "react";
import { Card, Skeleton } from "@components/common";
import { Flex, Metric, Text, Button } from "@tremor/react";
import { ipfsUriToUrl } from "@utils/strings";
import { Avatar } from "flowbite-react";
import { useFetchDao } from "@daobox/use-aragon";
import { daoAddress } from "../constants";
import { useDeposit } from "../hooks/useDeposit";
import { DepositModal } from "./modals/DepositModal";
import { useMintVote } from "../hooks/useMintVote";

export function DaoCard(): JSX.Element {
  const { data: dao } = useFetchDao({ daoAddressOrEns: daoAddress });
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const { amount, setAmount, mutate, isProcessing, depositStatus } = useDeposit();

  const { handleMintVote, isProcessingVote, proposalStatus } = useMintVote();

  const handleDeposit = () => {
    console.log("amount", amount);
    mutate?.();
    setIsDepositModalOpen(false);
  };

  return (
    <Skeleton data={dao} animated={true} height="xs">
      {dao && (
        <Card>
          <Flex justifyContent="start" className="justify-between px-2">
            <Avatar bordered size="lg" img={ipfsUriToUrl(dao.metadata.avatar, dao.address)}>
              <div className="truncate">
                <Text>{dao.ensDomain}</Text>
                <Metric className="truncate">{dao.metadata.name}</Metric>
              </div>
            </Avatar>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setIsDepositModalOpen(true)}
                disabled={isProcessing}
                loading={isProcessing}
              >
                {isProcessing ? depositStatus : "Deposit ETH"}
              </Button>
              <Button
                onClick={() => handleMintVote()}
                disabled={isProcessingVote}
                loading={isProcessingVote}
              >
                {isProcessingVote ? proposalStatus : "Mint 1 Token"}
              </Button>
            </div>
          </Flex>
        </Card>
      )}
      <DepositModal
        onDeposit={handleDeposit}
        isOpen={isDepositModalOpen}
        setIsOpen={setIsDepositModalOpen}
        amount={amount}
        setAmount={setAmount}
      />
    </Skeleton>
  );
}
