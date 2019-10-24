import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPokemonDetailsData, IPokemonListData } from './pokemon.model';

interface IApiPagination {
  limit: number;
  offset: number;
}

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private static readonly API_HOSTNAME: string = 'https://pokeapi.co/api/v2';
  private static readonly RESULTS_PER_PAGE: number = 10;
  private static readonly MAX_PAGE_NUMBER: number = 10;

  private static isCorrectPokemonId(id: number): boolean {
    return id > 0 && id <= PokeApiService.MAX_PAGE_NUMBER * PokeApiService.RESULTS_PER_PAGE;
  }

  private static parsePokemonApiData(pokemonApiData: any): IPokemonDetailsData {
    return {
      id: pokemonApiData.id,
      name: pokemonApiData.name,
      image: _.get(pokemonApiData, 'sprites.front_default'),
      stats: PokeApiService.parseStatsApiData(pokemonApiData.stats)
    };
  }

  private static parseStatsApiData(statsApiData: any): string[] {
    return _.map(statsApiData, (statApiData: any) => ({
      name: _.get(statApiData, 'stat.name'),
      baseStat: statApiData.base_stat
    }));
  }

  private static isCorrectPageNumber(page: number): boolean {
    return page > 0 && page <= PokeApiService.MAX_PAGE_NUMBER;
  }

  private static prepareApiPagination(page: number): IApiPagination {
    return {
      limit: PokeApiService.RESULTS_PER_PAGE,
      offset: (page - 1) * PokeApiService.RESULTS_PER_PAGE
    };
  }

  private static parsePokemonListApiData(pokemonListApiData: any, offset: number): IPokemonListData[] {
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

  public constructor(private http: HttpClient) {}

  public getPokemonById(id: number): Observable<IPokemonDetailsData> {
    if (!PokeApiService.isCorrectPokemonId(id)) {
      return null;
    }

    return this.http
      .get(`${PokeApiService.API_HOSTNAME}/pokemon/${id}`)
      .pipe(
        map((pokemonApiData: any) => PokeApiService.parsePokemonApiData(pokemonApiData))
      );
  }

  public getPokemonList(page: number): Observable<IPokemonListData[]> {
    if (!PokeApiService.isCorrectPageNumber(page)) {
      return null;
    }

    const { limit, offset }: IApiPagination = PokeApiService.prepareApiPagination(page);

    return this.http
      .get(`${PokeApiService.API_HOSTNAME}/pokemon`, {
        params: {
          limit: _.toString(limit),
          offset: _.toString(offset)
        }
      })
      .pipe(
        map((pokemonListApiData: any) => PokeApiService.parsePokemonListApiData(pokemonListApiData, offset))
      );
  }
}
