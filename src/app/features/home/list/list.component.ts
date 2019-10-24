import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../../core/poke-api.service';
import { Observable } from 'rxjs';
import { IPokemonListData } from '../../../core/pokemon.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public readonly MAX_PAGE_NUMBER: number = 10; // TODO: Merge with const from PokeApiService
  public page: number = 1;
  public isLoading: boolean = true;
  public pokemonList$: Observable<IPokemonListData[]>;

  constructor(private pokeApiService: PokeApiService) {}

  // TODO: Logic should be moved to service
  public ngOnInit() {
    this.loadPokemonList();
  }

  // TODO: Move pagination to separate component
  public previousPage(): void {
    this.page = this.page - 1;

    this.loadPokemonList();
  }

  public nextPage(): void {
    this.page = this.page + 1;

    this.loadPokemonList();
  }

  private loadPokemonList(): void {
    this.isLoading = true;

    this.pokemonList$ = this.pokeApiService
      .getPokemonList(this.page)
      .pipe(
        finalize(() => this.isLoading = false)
      );
  }
}
