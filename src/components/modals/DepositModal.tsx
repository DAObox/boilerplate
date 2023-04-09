import React, { useState } from "react";
import { BaseModal } from "./BaseModal";
import { TextInput } from "flowbite-react";
import { Button } from "@tremor/react";

interface DepositModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDeposit: (amount: number) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, setIsOpen, onDeposit }) => {
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    const parsedAmount = parseFloat(amount);
    console.log(parsedAmount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onDeposit(parsedAmount);
      setIsOpen(false);
    }
  };

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
          placeholder="0.00"
          required
          addon="Ξ"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mr-2 flex-grow"
        />
        <Button
          onClick={handleDeposit}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Submit
        </Button>
      </div>
    </BaseModal>
  );
};
