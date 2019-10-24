import { Component } from '@angular/core';
import { PokeApiService } from '../../core/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  public pokemon: any;

  constructor(private pokeApiService: PokeApiService) {
    this.pokemon = pokeApiService.getPokemonById(1);
  }
}
