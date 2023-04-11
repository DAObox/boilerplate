import React from "react";
import { TextInput, Button } from "@tremor/react";
import { BaseModal } from ".";

export function DepositModal({ isOpen, setIsOpen, amount, setAmount, onDeposit }: any) {
  return (
    <BaseModal
      title="Deposit Ethereum"
      description="Enter the amount you want to deposit:"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="my-4 flex w-96 items-center justify-center">
        <TextInput
          id="depositAmount"
          placeholder="Ξ 0.00"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mr-2 flex-grow"
        />
        <Button onClick={() => onDeposit()}>Submit</Button>
      </div>
    </BaseModal>
  );
}
