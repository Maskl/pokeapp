import { ValidatorService } from '../validator.service';

describe('ValidatorService', () => {
  describe('isCorrectPokemonId', () => {
    it('should return true for correct PokemonId', () => {
      expect(ValidatorService.isCorrectPokemonId(1)).toEqual(true);
    });

    it('should return false for negative PokemonId value', () => {
      expect(ValidatorService.isCorrectPokemonId(-1)).toEqual(false);
    });

    it('should return false for PokemonId value = 0', () => {
      expect(ValidatorService.isCorrectPokemonId(0)).toEqual(false);
    });

    it('should return false for PokemonId value above expected maximum', () => {
      expect(ValidatorService.isCorrectPokemonId(101)).toEqual(false);
    });
  });

  describe('isCorrectPageNumber', () => {
    it('should return true for correct page number', () => {
      expect(ValidatorService.isCorrectPageNumber(1)).toEqual(true);
    });

    it('should return false for negative page number', () => {
      expect(ValidatorService.isCorrectPageNumber(-1)).toEqual(false);
    });

    it('should return false for page number = 0', () => {
      expect(ValidatorService.isCorrectPageNumber(0)).toEqual(false);
    });

    it('should return false for page number above expected maximum', () => {
      expect(ValidatorService.isCorrectPageNumber(11)).toEqual(false);
    });
  });
});
