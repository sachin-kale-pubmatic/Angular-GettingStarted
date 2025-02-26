import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ICategory } from './category';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = 'api/categories/categories.json';
  
  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoriesUrl);
  }

  getCategoryStatistics(products: IProduct[]): { [key: string]: number } {
    const statistics: { [key: string]: number } = {};
    
    products.forEach(product => {
      if (product.categoryName) {
        statistics[product.categoryName] = (statistics[product.categoryName] || 0) + 1;
      }
    });

    return statistics;
  }

  getAverageProductPriceByCategory(products: IProduct[]): { [key: string]: number } {
    const priceSum: { [key: string]: number } = {};
    const productCount: { [key: string]: number } = {};
    
    products.forEach(product => {
      if (product.categoryName) {
        priceSum[product.categoryName] = (priceSum[product.categoryName] || 0) + product.price;
        productCount[product.categoryName] = (productCount[product.categoryName] || 0) + 1;
      }
    });

    const averagePrices: { [key: string]: number } = {};
    Object.keys(priceSum).forEach(category => {
      averagePrices[category] = priceSum[category] / productCount[category];
    });

    return averagePrices;
  }
}