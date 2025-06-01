import Image from "next/image";
import Link from "next/link";

import formatIdToThreeDigits from "@/utils/formatId";
import { colors } from "@/constants/colors";

type Props = {
  id: number;
  name: string;
  color: string;
  types: string[];
  image: string;
};

const PokemonCard = ({ id, name, color, types, image }: Props) => {
  return (
    <Link href={`/pokemon/${id}`}>
      <div className={`relative ${colors[color] || "bg-gray-400"} cursor-pointer px-4 py-2 rounded-lg text-white z-10 overflow-hidden h-full`}>
        <div className="text-black/8 text-end font-bold text-lg">#{formatIdToThreeDigits(id)}</div>
        <div className="font-bold mb-2 sm:text-base text-sm">{name}</div>

        <div className="relative">
          <Image className="absolute -z-10 -top-4 sm:-right-8 -right-6 filter grayscale brightness-95 opacity-20 sm:w-36 sm:h-36 w-24 h-24" src="/img/pokeball.png" width="130" height="130" alt="pokeball" />
        </div>

        <div className="flex justify-between">
          <div>
            {types.map((type, index) => (
              <div key={index} className="bg-gray-100/20 rounded-full sm:px-4 px-3 py-1 mb-2 text-xs w-fit">{type}</div>
            ))}
          </div>


          <div className="relative">
            <Image className="sm:w-24 sm:h-24 w-14 h-14" src={image} alt={name} width="100" height="100" />
          </div>
        </div>
      </div >
    </Link>
  );
}

export default PokemonCard;