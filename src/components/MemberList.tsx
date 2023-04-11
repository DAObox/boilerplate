import React from "react";
import { Flex, Metric, Text } from "@tremor/react";
import { formatToken } from "@utils/numbers";
import { shortenHash } from "@utils/strings";
import Identicon from "react-blockies";
import { Card, Skeleton } from "@components/common";
import { useFetchMembersAndBalances } from "@daobox/use-aragon";
import { votingAddress } from "../constants";

export function MemberList() {
  const { data: members } = useFetchMembersAndBalances({ pluginAddress: votingAddress });

  return (
    <div className="flex-col justify-center space-y-4 rounded-md bg-white p-3">
      <Skeleton data={members} animated={true} height="xs">
        {members &&
          members.map((member, index) => <MemberCard key={index} {...member} tokenSymbol="BCC" />)}
      </Skeleton>
    </div>
  );
}
function MemberCard({ address, balance, tokenSymbol, tokenDecimals }: any): JSX.Element {
  return (
    <Card hoverable>
      <Flex justifyContent="start" className=" items-center space-x-4">
        <Identicon size={12} seed={address} className="b rounded-2xl" />
        <div className="truncate">
          <Metric>{shortenHash(address, 3)}</Metric>
          <Text>{formatToken(balance, tokenDecimals, tokenSymbol)}</Text>
        </div>
      </Flex>
    </Card>
  );
}
