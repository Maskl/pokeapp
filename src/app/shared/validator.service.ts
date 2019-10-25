export class ValidatorService {
  public static readonly RESULTS_PER_PAGE: number = 10;
  public static readonly MAX_PAGE_NUMBER: number = 10;
  public static readonly POKEMON_COUNT: number = ValidatorService.RESULTS_PER_PAGE * ValidatorService.MAX_PAGE_NUMBER;

  public static isCorrectPokemonId(id: number): boolean {
    return id > 0 && id <= ValidatorService.MAX_PAGE_NUMBER * ValidatorService.RESULTS_PER_PAGE;
  }

  public static isCorrectPageNumber(page: number): boolean {
    return page > 0 && page <= ValidatorService.MAX_PAGE_NUMBER;
  }
}
