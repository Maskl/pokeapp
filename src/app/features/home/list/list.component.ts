import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { catchError, mapTo, shareReplay, switchMap } from 'rxjs/operators';

import { PokeApiService } from '../../../shared/services/poke-api.service';
import { IPokemonListData } from '../../../shared/pokemon.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public pokemonList$: Observable<IPokemonListData[]>;
  public isLoading$: Observable<boolean>;
  public page$: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor(private pokeApiService: PokeApiService) {}

  public ngOnInit(): void {
    this.pokemonList$ = this.page$
      .pipe(
        switchMap((page: number) => {
          return this.pokeApiService
            .getPokemonList(page)
            .pipe(
              catchError(() => of(null)) // Just to simplify error handling
            );
        }),
        shareReplay()
      );

    this.isLoading$ = merge(
      this.page$.pipe(
        mapTo(true)
      ),
      this.pokemonList$.pipe(
        mapTo(false)
      )
    );
  }

  public loadPage(page: number): void {
    this.page$.next(page);
  }
}
