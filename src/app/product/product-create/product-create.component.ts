import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
productForm: FormGroup = new FormGroup({
  name: new FormControl(),
  price: new FormControl(),
  description: new FormControl(),
  category: new FormControl()
});

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategory();
  }
submit() {
    const product = this.productForm.value;
    product.category = {
      id: product.category
    }
    this.productService.saveProduct(product).subscribe(data=>{
      console.log(data.category)
      alert('thành công')
      this.productForm.reset();
    },e=>{
      console.log(e)
    });

}
  getAllCategory() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }
}
