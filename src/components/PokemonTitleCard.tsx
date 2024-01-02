import { Card } from "@/components/ui/card";

interface TitleCardProps {
  imageSrc?: string | undefined;
  pokemonName?: string;
  pokemonTypes?: string[];
}

const formatName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const PokemonTitleCard = ({
  imageSrc,
  pokemonName,
  pokemonTypes = [],
}: TitleCardProps) => {
  if (!pokemonName) return <div>No Pokemon data available.</div>;
  return (
    <Card className="h-full flex flex-col items-center justify-center bg-[#eeeeee] p-6">
      <img
        alt="Main Image"
        className="object-contain w-3/4 h-3/4 "
        src={imageSrc}
      />
      <h1 className="text-2xl md:text-4xl font-bold mt-4 md:mt-8">
        {formatName(pokemonName)}
      </h1>
      <div className="flex space-x-2 p-2">
        {pokemonTypes.map((type, index) => (
          <img
            key={index}
            src={type}
            alt={`Type ${index}`}
            className="w-auto"
          />
        ))}
      </div>
    </Card>
  );
};
