export interface IPokemonListData {
  id: number;
  name: string;
}

export interface IPokemonDetailsData extends IPokemonListData {
  image: string;
  stats: IPokemonStatsData[];
}

export interface IPokemonStatsData {
  name: string;
  baseStat: number;
  effort: number;
}
