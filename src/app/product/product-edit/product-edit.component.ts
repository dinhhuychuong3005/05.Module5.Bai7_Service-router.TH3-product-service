import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl(),
  });
  product: Product;
  id1: number;
  categories: Category[] = [];

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router, private categoryService: CategoryService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id1 = +paramMap.get('id');
      this.getProduct(this.id1);

    });
  }

  ngOnInit() {
    this.getCategory();
  }

  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product1 => {
      this.product = product1;
      this.productForm = new FormGroup({
        name: new FormControl(product1.name),
        price: new FormControl(product1.price),
        description: new FormControl(product1.description),
        category: new FormControl(product1.category.id),
      });
      console.log(product1);
    }, e => {
      console.log(e);
    });
  }

  updateProduct(id: number) {
    this.product = this.productForm.value;
    this.product.category = {
      id: this.product.category
    }
    this.productService.updateProduct(id, this.product).subscribe(() => {
      alert('Cập nhật thành công');
      this.router.navigate(['/product/list']);
    },error => {
      console.log(error.status)
    });

  }

  getCategory() {
    this.categoryService.getAll().subscribe(list => {
      this.categories = list;
    });
  }
}
