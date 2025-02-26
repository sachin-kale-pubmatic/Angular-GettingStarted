import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ICategory } from './category';

@Component({
  selector: 'pm-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  @Input() categories: ICategory[] = [];
  @Output() categorySelected = new EventEmitter<number | null>();
  
  selectedCategoryId: number | null = null;

  ngOnInit(): void {
  }

  onCategoryChange(categoryId: string): void {
    this.selectedCategoryId = categoryId ? parseInt(categoryId, 10) : null;
    this.categorySelected.emit(this.selectedCategoryId);
  }
}