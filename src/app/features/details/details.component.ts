import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, mapTo, shareReplay, switchMap } from 'rxjs/operators';

import { PokeApiService } from '../../shared/services/poke-api.service';
import { IPokemonDetailsData } from '../../shared/pokemon.model';
import { ValidatorService } from '../../shared/services/validator.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public readonly pokemonCount: number = ValidatorService.POKEMON_COUNT;
  public pokemon$: Observable<IPokemonDetailsData>;
  public isLoading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  public ngOnInit(): void {
    const pokemonId$: Observable<number> = this.activatedRoute
      .params
      .pipe(
        map((urlParams: { id: string }) => +urlParams.id),
        shareReplay()
      );

    this.pokemon$ = pokemonId$
      .pipe(
        switchMap((id: number) => {
          return this.pokeApiService
            .getPokemonById(id)
            .pipe(
              catchError(() => of(null))
            );
        }),
        shareReplay()
      );

    this.isLoading$ = merge(
      pokemonId$.pipe(
        mapTo(true)
      ),
      this.pokemon$.pipe(
        mapTo(false)
      )
    );
  }
}
