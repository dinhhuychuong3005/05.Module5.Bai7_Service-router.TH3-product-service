import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  categoryForm: FormGroup;
  id: number;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getCategory(this.id);

    });
  }

  getCategory(id: number) {
    return this.categoryService.findById(id).subscribe(category1 => {
      this.categoryForm = new FormGroup({
        name: new FormControl(category1.name)
      });
    });
  }

  ngOnInit() {
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(()=>{
      alert("xóa thành công")
      this.router.navigate(['/category/list']);
    },e=>{
      console.log(e)
    });

  }
}
