export interface IPokemonListData {
  id: string;
  name: string;
}

export interface IPokemonDetailsData extends IPokemonListData {
  image: string;
  stats: any; // TODO: define it
}
