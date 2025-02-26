import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { ICategory } from './category';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  selectedCategoryId: number | null = null;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  categories: ICategory[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService) { }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy) &&
      (this.selectedCategoryId === null || product.categoryId === this.selectedCategoryId));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });

    this.categoryService.getCategories().subscribe({
      next: categories => this.categories = categories,
      error: err => this.errorMessage = err
    });
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  onCategorySelected(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.filteredProducts = this.performFilter(this.listFilter);
  }
}