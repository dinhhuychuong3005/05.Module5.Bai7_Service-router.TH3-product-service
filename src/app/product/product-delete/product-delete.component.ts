import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  });
  id: number;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getProduct(this.id);

    });
  }

  ngOnInit() {
  }

  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product1=>{
      this.productForm = new FormGroup({
        name: new FormControl(product1.name),
        price: new FormControl(product1.price),
        description: new FormControl(product1.description),
      });
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(()=>{
      alert('xóa thành công');
      this.router.navigate(['/product/list']);
    },e =>{
      console.log(e)
    });

  }

}
