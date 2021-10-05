import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Sort } from 'src/app/model/sort-direction';
const localStorageKey = 'assignment';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges, OnInit {
  @Input() totalPokemons = 0;

  @Output() sortChanged: EventEmitter<{ name: string; direction: Sort }> = new EventEmitter<{
    name: string;
    direction: Sort;
  }>();

  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output() pageChanged: EventEmitter<{ offset: number; limit: number }> = new EventEmitter<{
    offset: number;
    limit: number;
  }>();

  private currentPage = 0;
  private totalPage = 0;
  public filterValue: string = '';

  public currentPageSize = 10;
  public pageConfig = {
    next: false,
    previous: true,
  };

  public sorting = {
    name: Sort.Ascending,
    height: Sort.None,
    width: Sort.None,
  };

  private defaultSorting = { name: 'name', direction: Sort.Ascending };
  constructor() {}

  ngOnInit(): void {
    let sorting = localStorage.getItem(`${localStorageKey}-sorting`);
    let pageSize = localStorage.getItem(`${localStorageKey}-pageSize`);
    let filter = localStorage.getItem(`${localStorageKey}-filter`);

    if (filter) {
      this.filterValue = filter;
      this.filterChanged.emit(filter);
    }

    if (sorting) {
      try {
        const sort: { name: 'name'; direction: Sort.Ascending } = JSON.parse(sorting);
        this.sorting[sort.name] = sort.direction;

        this.sortChanged.emit(sort);
      } catch {
        this.sortChanged.emit(this.defaultSorting);
      }
    } else {
      this.sortChanged.emit(this.defaultSorting);
    }

    if (pageSize) {
      try {
        const page: { limit: number; offset: number } = JSON.parse(pageSize);
        this.currentPageSize = page.limit;
        this.pageChanged.emit(page);
      } catch {}
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalPokemons.currentValue > 0) {
      this.totalPage = this.totalPokemons % this.currentPageSize;
    }
  }

  filter(event: any) {
    localStorage.setItem(`${localStorageKey}-filter`, event.target.value);
    this.filterChanged.emit(event.target.value);
    this.filterValue = event.target.value;
  }
  changePageSize(size: number) {
    this.currentPageSize = size;
    this.totalPage = this.totalPokemons % this.currentPageSize;
    localStorage.setItem(
      `${localStorageKey}-pageSize`,
      JSON.stringify({ limit: this.currentPageSize, offset: this.currentPage })
    );
    this.pageChanged.emit({ limit: this.currentPageSize, offset: this.currentPage });
  }

  changeSorting(sortBy: 'name' | 'height' | 'width') {
    switch (sortBy) {
      case 'height': {
        this.sorting.height = this.getNextSort(this.sorting.height);
        this.sorting.width = Sort.None;
        this.sorting.name = Sort.None;
        break;
      }
      case 'width': {
        this.sorting.width = this.getNextSort(this.sorting.width);
        this.sorting.height = Sort.None;
        this.sorting.name = Sort.None;
        break;
      }
      case 'name': {
        this.sorting.name = this.getNextSort(this.sorting.name);
        this.sorting.height = Sort.None;
        this.sorting.width = Sort.None;
        break;
      }
    }

    localStorage.setItem(
      `${localStorageKey}-sorting`,
      JSON.stringify({ name: sortBy, direction: this.sorting[sortBy] })
    );

    this.sortChanged.emit({ name: sortBy, direction: this.sorting[sortBy] });
  }

  previous() {
    this.pageConfig.previous = this.currentPage - 1 > 0;
    if (!this.pageConfig.previous) {
      --this.currentPage;
      this.pageConfig.next = false;
      this.pageChanged.emit({ limit: this.currentPageSize, offset: this.currentPage });
    }
  }

  next() {
    this.pageConfig.next = this.currentPage + 1 === this.totalPage;
    if (!this.pageConfig.next) {
      ++this.currentPage;
      this.pageConfig.previous = false;
      this.pageChanged.emit({ limit: this.currentPageSize, offset: this.currentPage });
    }
  }
  private getNextSort(currentSort: Sort): Sort {
    if (currentSort === Sort.Ascending) {
      return Sort.Decending;
    } else {
      return Sort.Ascending;
    }
  }
}
