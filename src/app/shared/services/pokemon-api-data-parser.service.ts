import * as _ from 'lodash';

import { IPokemonDetailsData, IPokemonListData, IPokemonStatsData } from '../pokemon.model';

export class PokemonApiDataParserService {
  public static parsePokemonApiData(pokemonApiData: any): IPokemonDetailsData {
    return {
      id: pokemonApiData.id,
      name: pokemonApiData.name,
      image: _.get(pokemonApiData, 'sprites.front_default'),
      stats: PokemonApiDataParserService.parseStatsApiData(pokemonApiData.stats)
    };
  }

  public static parsePokemonListApiData(pokemonListApiData: any, offset: number): IPokemonListData[] {
    return _.chain(pokemonListApiData)
      .get('results', [])
      .map((pokemonApiData: any, index: number) => {
        return {
          // Little hack to get Pokemon's ID. It can be also taken from pokemonApiData.url. Probably there is a cleaner way.
          id: index + offset + 1,
          name: pokemonApiData.name
        };
      })
      .value();
  }

  private static parseStatsApiData(statsApiData: any): IPokemonStatsData[] {
    return _.map(statsApiData, (statApiData: any) => ({
      name: _.get(statApiData, 'stat.name'),
      baseStat: statApiData.base_stat,
      effort: statApiData.effort
    }));
  }
}
