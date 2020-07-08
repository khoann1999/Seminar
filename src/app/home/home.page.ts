import { Component } from '@angular/core';
import { DataService, Message, Product } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public products: Product[];
  constructor(private data: DataService) {
  this.getProducts();
  }
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
  getProducts(){
   this.data.getProducts()
    .subscribe(arg => this.products = arg);
  }
}
