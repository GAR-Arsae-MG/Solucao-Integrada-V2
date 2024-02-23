/* eslint-disable @typescript-eslint/no-explicit-any */

import { Checkbox} from "@nextui-org/react";
import { BanIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

interface CheckboxDonationProps {
  name: string;
  onChange: (value: boolean) => void;
}
export default function CheckboxDonation({  name, onChange }: CheckboxDonationProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleValueChange = (value: boolean) => {
    setIsSelected(value)
    onChange(value);
  }

  return (
      <Checkbox
        color="primary"
        icon={isSelected ? <CheckIcon className="ml-1" /> : <BanIcon className="ml-1" />}
        isSelected={isSelected}
        onValueChange={handleValueChange}
        name={name}
      >
        { isSelected ? "Sim" : "Não"}
      </Checkbox>
  );
}
