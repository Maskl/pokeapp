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
  public isLoading: boolean = true;
  public pokemonList$: Observable<IPokemonListData[]>;

  constructor(private pokeApiService: PokeApiService) {}

  // TODO: Logic should be moved to service
  public ngOnInit() {
    this.isLoading = true;

    this.pokemonList$ = this.pokeApiService
      .getPokemonList(1)
      .pipe(
        finalize(() => this.isLoading = false)
      );
  }
}
