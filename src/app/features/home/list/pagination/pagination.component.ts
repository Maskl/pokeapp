import { Component, EventEmitter, Output } from '@angular/core';
import { ValidatorService } from '../../../../shared/validator.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output() public pageChange: EventEmitter<number> = new EventEmitter();
  public readonly maxPageNumber: number = ValidatorService.MAX_PAGE_NUMBER;
  public page: number = 1;

  public previousPage(): void {
    this.page = this.page - 1;
    this.pageChange.emit(this.page);
  }

  public nextPage(): void {
    this.page = this.page + 1;
    this.pageChange.emit(this.page);
  }
}
