import React from "react";

import { PageView } from "../components/layout";
import { Card, Skeleton } from "@components/common";
import { useFetchDaos } from "@daobox/use-aragon";
import { Flex, Metric, Text } from "@tremor/react";
import { Avatar } from "flowbite-react";
import { ipfsUriToUrl } from "@utils/strings";
import { useNetwork } from "wagmi";

const Index = () => {
  // 01: https://use-aragon.daobox.app/useFetchDaos
  const { data } = useFetchDaos();

  return (
    <PageView>
      {data ? (
        data.map((dao) => <DaoCard key={dao.address} dao={dao} />)
      ) : (
        <Skeleton animated={true} height="xl" />
      )}
    </PageView>
  );
};

function DaoCard({ dao }: any): JSX.Element {
  const { chain } = useNetwork();

  return (
    <Card
      key={dao.address}
      hoverable
      pressable
      href={`https://app.aragon.org/#/daos/${chain?.name.toLowerCase()}/${dao.address}/dashboard`}
    >
      <Flex justifyContent="start" className="space-x-4">
        <Avatar bordered size="lg" img={ipfsUriToUrl(dao.metadata.avatar)} />
        <div className="truncate">
          <Text>{dao.ensDomain}</Text>
          <Metric className="truncate">{dao.metadata.name}</Metric>
        </div>
      </Flex>
    </Card>
  );
}

export default Index;
