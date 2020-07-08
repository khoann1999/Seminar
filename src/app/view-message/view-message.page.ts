import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Message, Product } from '../services/data.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public product: Product;
  PostForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    type: new FormControl(),
    description: new FormControl(),
  });
  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getProductById(parseInt(id, 10))
      .subscribe(arg => { this.product  = arg,
         this.PostForm = new FormGroup({
        name: new FormControl(this.product.name),
        price: new FormControl(this.product.price),
        type: new FormControl(this.product.type),
        description: new FormControl(this.product.description),
      });
    });
    // this.message = this.data.getMessageById(parseInt(id, 10));
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
  submitUpdate(){
    this.product = {
      id: this.product.id,
      name: this.PostForm.get('name').value,
      price: this.PostForm.get('price').value,
      type: this.PostForm.get('type').value,
      description: this.PostForm.get('description').value,
    };
    this.data.updateProduct(this.product);
    setTimeout( () => { this.reload(); }, 1000 );
  }
  reload(){
    window.location.reload();
  }
}
