import { of } from 'rxjs';

import { ValidatorService } from '../validator.service';
import { PokeApiService } from '../poke-api.service';
import { PokemonApiDataParserService } from '../pokemon-api-data-parser.service';

describe('PokeApiService', () => {
  const apiDataMock = 'API Data';
  let pokeApiServiceMock: PokeApiService;
  let httpMock;

  beforeEach(() => {
    httpMock = jasmine.createSpyObj('httpMock', ['get']);
    httpMock.get.and.returnValue(of(apiDataMock));

    pokeApiServiceMock = new PokeApiService(httpMock);
  });

  describe('getPokemonById', () => {
    const pokemonId = 10;
    let validatorMock;
    let parserMock;

    beforeEach(() => {
      validatorMock = spyOn(ValidatorService, 'isCorrectPokemonId');
      parserMock = spyOn(PokemonApiDataParserService, 'parsePokemonApiData');
    });

    it('should request correct PokeApi endpoint if Pokemon ID is valid', () => {
      validatorMock.and.returnValue(true);

      pokeApiServiceMock.getPokemonById(pokemonId);

      expect(httpMock.get).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    });

    it('should NOT request PokeApi endpoint if Pokemon ID is invalid', () => {
      validatorMock.and.returnValue(false);

      pokeApiServiceMock.getPokemonById(pokemonId);

      expect(httpMock.get).not.toHaveBeenCalledWith();
    });

    it('should execute parser method on data returned from API', (done) => {
      validatorMock.and.returnValue(true);

      pokeApiServiceMock
        .getPokemonById(pokemonId)
        .subscribe(() => {
          expect(parserMock).toHaveBeenCalledWith(apiDataMock);

          done();
        });
    });
  });

  describe('getPokemonList', () => {
    const page = 3;
    let validatorMock;
    let parserMock;

    beforeEach(() => {
      validatorMock = spyOn(ValidatorService, 'isCorrectPageNumber');
      parserMock = spyOn(PokemonApiDataParserService, 'parsePokemonListApiData');
    });

    it('should request PokeApi endpoint with properly created params if page number is valid', () => {
      validatorMock.and.returnValue(true);

      pokeApiServiceMock.getPokemonList(page);

      expect(httpMock.get).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon`, { params: { offset: '20', limit: '10' }});
    });

    it('should NOT request PokeApi endpoint if page number is invalid', () => {
      validatorMock.and.returnValue(false);

      pokeApiServiceMock.getPokemonList(page);

      expect(httpMock.get).not.toHaveBeenCalledWith();
    });

    it('should execute parser method on data returned from API', (done) => {
      validatorMock.and.returnValue(true);

      pokeApiServiceMock
        .getPokemonList(page)
        .subscribe(() => {
          expect(parserMock).toHaveBeenCalledWith(apiDataMock, 20);

          done();
        });
    });
  });
});
