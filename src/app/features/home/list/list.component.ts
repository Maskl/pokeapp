import { Component } from '@angular/core';
import { PokeApiService } from '../../../core/poke-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public pokemonList: any;

  constructor(private pokeApiService: PokeApiService) {
    this.pokemonList = pokeApiService.getPokemonList(1);
  }
}
