import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IPokemonDetailsData, IPokemonStatsData } from '../../../shared/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() public pokemon: IPokemonDetailsData;
  public statsTableColumns: string[] = ['name', 'baseStat', 'effort'];
  public statsTableDataSource: MatTableDataSource<IPokemonStatsData>;

  public ngOnInit(): void {
    this.statsTableDataSource = new MatTableDataSource<IPokemonStatsData>(this.pokemon.stats);
  }
}
