import React from "react";

import { PageView } from "../components/layout";
import { DaoCard } from "../components/DaoCard";
import { MemberList } from "../components/MemberList";
import { ProposalList } from "../components/ProposalList";

const Index = () => {
  return (
    <PageView rightColumn={<MemberList />}>
      <DaoCard />
      <ProposalList />
    </PageView>
  );
};

export default Index;
