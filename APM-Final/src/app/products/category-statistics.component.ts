import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryService } from './category.service';
import { IProduct } from './product';

@Component({
  selector: 'pm-category-statistics',
  templateUrl: './category-statistics.component.html',
  styleUrls: ['./category-statistics.component.css']
})
export class CategoryStatisticsComponent implements OnChanges {
  @Input() products: IProduct[] = [];
  
  categoryStats: { [key: string]: number } = {};
  averagePrices: { [key: string]: number } = {};

  constructor(private categoryService: CategoryService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.updateStatistics();
    }
  }

  private updateStatistics(): void {
    this.categoryStats = this.categoryService.getCategoryStatistics(this.products);
    this.averagePrices = this.categoryService.getAverageProductPriceByCategory(this.products);
  }
}