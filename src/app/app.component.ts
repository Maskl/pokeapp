import { Component } from '@angular/core';

import { PokeApiService } from './core/poke-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public pokemon: any;
  public pokemonList: any;

  constructor(private pokeApiService: PokeApiService) {
    this.pokemon = pokeApiService.getPokemonById(1);
    this.pokemonList = pokeApiService.getPokemonList(1);
  }
}
