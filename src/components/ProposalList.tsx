import React from "react";
import { Title, MarkerBar, CategoryBar, Text } from "@tremor/react";
import { formatToken } from "@utils/numbers";
import { Badge, Button } from "flowbite-react";
import { Card, Skeleton } from "@components/common";
import { SortDirection, TokenVotingProposalListItem, useFetchProposals } from "@daobox/use-aragon";
import { daoAddress } from "../constants";

export function ProposalList() {
  const { data: proposals } = useFetchProposals({
    daoAddressOrEns: daoAddress,
    direction: SortDirection.DESC,
  });

  return (
    <Skeleton data={proposals} animated={true} height="xl">
      {proposals && proposals.map((proposal) => <ProposalCard key={proposal.id} {...proposal} />)}
    </Skeleton>
  );
}
const ProposalCard = (proposal: TokenVotingProposalListItem) => {
  const { metadata, status, result } = proposal;
  const { title, summary } = metadata;
  const { yes, no, abstain } = result;

  const hasNoVotes = yes + no + abstain === 0n;
  return (
    <Card className="-z-10 hover:cursor-pointer">
      <div className="flex justify-between pb-4">
        <Title className="line-clamp-1">{title}</Title>
        <Badge>{status}</Badge>
      </div>
      <Text className="line-clamp-2">{summary}</Text>
      {/* vote progress bars */}
      <div>
        <div className="-mb-1 mt-4 flex justify-between">
          <Text className="start-0 flex">YES ({formatToken(yes)})</Text>
          <Text className="start-0 flex">NO ({formatToken(no)})</Text>
        </div>
        <div className="pt-2">
          {hasNoVotes ? (
            <MarkerBar percentageValue={0.5 * 100} className="mt-3" />
          ) : (
            <CategoryBar
              categoryPercentageValues={[Number(yes), Number(abstain), Number(no)]}
              colors={["emerald", "amber", "rose"]}
              showLabels={false}
              className="mt-3"
            />
          )}
        </div>
      </div>
      {/* Voting buttons */}
      <div className="flex items-center justify-center space-x-4 pt-6">
        <Button color="green">YES</Button>
        <Button color="yellow">ABSTAIN</Button>
        <Button color="red">NO</Button>
      </div>
    </Card>
  );
};
