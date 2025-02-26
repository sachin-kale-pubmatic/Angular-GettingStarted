import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { CategoryFilterComponent } from './category-filter.component';
import { CategoryStatisticsComponent } from './category-statistics.component';
import { CategoryService } from './category.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    CategoryFilterComponent,
    CategoryStatisticsComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      }
    ]),
    SharedModule
  ],
  providers: [
    CategoryService
  ]
})
export class ProductModule { }