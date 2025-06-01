import { ReactNode } from "react";

type Props = {
  label: string;
  value: ReactNode;
};

const Attribute = ({ label, value }: Props) => {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 text-gray-400 font-semibold">{label}</div>
      <div className="col-span-2 text-gray-700 font-bold">{value}</div>
    </div>
  );
}

export default Attribute;