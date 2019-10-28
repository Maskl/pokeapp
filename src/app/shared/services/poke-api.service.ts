import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPokemonDetailsData, IPokemonListData } from '../pokemon.model';
import { ValidatorService } from './validator.service';
import { PokemonApiDataParserService } from './pokemon-api-data-parser.service';

interface IApiPagination {
  limit: number;
  offset: number;
}

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private static readonly API_HOSTNAME: string = 'https://pokeapi.co/api/v2';

  private static prepareApiPagination(page: number): IApiPagination {
    return {
      limit: ValidatorService.RESULTS_PER_PAGE,
      offset: (page - 1) * ValidatorService.RESULTS_PER_PAGE
    };
  }

  public constructor(private http: HttpClient) {}

  public getPokemonById(id: number): Observable<IPokemonDetailsData> {
    if (!ValidatorService.isCorrectPokemonId(id)) {
      return of(null); // TODO: Implement proper error handling
    }

    return this.http
      .get(`${PokeApiService.API_HOSTNAME}/pokemon/${id}`)
      .pipe(
        map((pokemonApiData: any) => PokemonApiDataParserService.parsePokemonApiData(pokemonApiData))
      );
  }

  public getPokemonList(page: number): Observable<IPokemonListData[]> {
    if (!ValidatorService.isCorrectPageNumber(page)) {
      return of(null); // TODO: Implement proper error handling
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
        map((pokemonListApiData: any) => PokemonApiDataParserService.parsePokemonListApiData(pokemonListApiData, offset))
      );
  }
}
