import { useState } from "react";

type UseToggle = (initialValue: boolean) => [boolean, () => void];

export const useToggle: UseToggle = (initialValue: boolean) => {
  const [isTrue, setIsTrue] = useState(initialValue);

  const toggle = () => {
    setIsTrue(!isTrue);
  };

  return [isTrue, toggle];
};
