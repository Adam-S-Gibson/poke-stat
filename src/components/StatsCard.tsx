import { Badge } from "@/components/ui/badge";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Pokemon } from "@/types/pokemonDataTypes";

interface StatsCardProps {
  pokemon?: Pokemon;
}

const formatStatName = (name: string): string => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const StatsCard: React.FC<StatsCardProps> = ({ pokemon }) => {
  const stats = pokemon?.pokemonStats.map((stat) => ({
    name: formatStatName(stat.pokemonStat.name),
    value: stat.base_stat,
  }));

  const total = stats?.reduce((sum, stat) => sum + stat.value, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <h2 className="text-xl md:text-2xl font-bold">Stats</h2>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 md:space-y-2">
          {stats?.map((stat, index) => (
            <li key={index} className="flex justify-between">
              <span>{stat.name}:</span>
              <Badge>{stat.value}</Badge>
            </li>
          ))}
          <li className="flex justify-between">
            <span>Total:</span>
            <Badge>{total}</Badge>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
