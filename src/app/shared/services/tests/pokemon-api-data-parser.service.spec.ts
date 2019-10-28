import { PokemonApiDataParserService } from '../pokemon-api-data-parser.service';
import { IPokemonDetailsData, IPokemonListData } from '../../pokemon.model';

describe('PokemonApiDataParserService', () => {
  describe('parsePokemonApiData', () => {
    let pokemonDetailsData: IPokemonDetailsData;
    let pokeApiPokemonDetailsData: any;

    beforeEach(() => {
      pokemonDetailsData = {
        id: 100,
        name: 'Pokemon Name',
        image: 'Pokemon Image',
        stats: [
          {
            name: 'Pokemon Stat #1 Name',
            effort: 1,
            baseStat: 2
          },
          {
            name: 'Pokemon Stat #2 Name',
            effort: 3,
            baseStat: 4
          }
        ]
      };

      pokeApiPokemonDetailsData = {
        id: pokemonDetailsData.id,
        name: pokemonDetailsData.name,
        other: 'other',
        sprites: {
          front_default: pokemonDetailsData.image,
          other: 'other'
        },
        stats: [
          {
            base_stat: pokemonDetailsData.stats[0].baseStat,
            effort: pokemonDetailsData.stats[0].effort,
            stat: {
              name: pokemonDetailsData.stats[0].name,
              other: 'other'
            }
          },
          {
            base_stat: pokemonDetailsData.stats[1].baseStat,
            effort: pokemonDetailsData.stats[1].effort,
            stat: {
              name: pokemonDetailsData.stats[1].name,
              other: 'other'
            }
          }
        ]
      };
    });

    it('should parse API data to IPokemonDetailsData object', () => {
      expect(PokemonApiDataParserService.parsePokemonApiData(pokeApiPokemonDetailsData)).toEqual(pokemonDetailsData);
    });

    it('should not throw error in case of malformed API data (fallback to default values)', () => {
      expect(() => PokemonApiDataParserService.parsePokemonApiData({})).not.toThrow();
    });
  });

  describe('parsePokemonListApiData', () => {
    let offset: number;
    let pokemonListData: IPokemonListData[];
    let pokeApiPokemonListData: any;

    beforeEach(() => {
      offset = 100;
      pokemonListData = [
        {
          id: offset + 1,
          name: 'Pokemon #1 Name'
        },
        {
          id: offset + 2,
          name: 'Pokemon #2 Name'
        }
      ];

      pokeApiPokemonListData = {
        results: [
          {
            name: pokemonListData[0].name,
            other: 'other'
          },
          {
            name: pokemonListData[1].name,
            other: 'other'
          }
        ],
        other: 'other'
      };
    });

    it('should parse API data to IPokemonDetailsData object', () => {
      expect(PokemonApiDataParserService.parsePokemonListApiData(pokeApiPokemonListData, offset)).toEqual(pokemonListData);
    });

    it('should return empty array if API data is an empty array', () => {
      expect(PokemonApiDataParserService.parsePokemonListApiData([], offset)).toEqual([]);
    });

    it('should not throw error in case of malformed API data (fallback to default values)', () => {
      expect(() => PokemonApiDataParserService.parsePokemonListApiData([{}], offset)).not.toThrow();
    });
  });
});
