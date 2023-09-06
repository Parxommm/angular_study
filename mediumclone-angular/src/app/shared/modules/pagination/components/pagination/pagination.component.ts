import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps: number;
  @Input('limit') limitProps: number;
  @Input('currentPage') currentPageProps: number;
  @Input('url') urlProps: string;

  pagesCount: number = 1;
  pages: number[] = [1];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
    this.pages = this.utilsService.rangeFromOne(this.pagesCount);
  }
}
