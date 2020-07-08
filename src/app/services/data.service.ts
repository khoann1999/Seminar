import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://ionicdemo.conveyor.cloud/api';
  public products: Product[];
  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false
    },
    {
      fromName: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      read: false
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false
    }
  ];

  constructor(private http: HttpClient) { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/Products');
  }
  public getProductById(id: number): Observable<Product> {
  return this.http.get<Product>(this.url + '/Products' + '/' + id);
  }
  public createProduct(product: Product){
    return this.http.post(this.url + '/Products', product, { responseType: 'text' }).subscribe(
      error => console.error(error));
  }
  public updateProduct(product: Product){
    return this.http.put(this.url + '/Products' + '/' + product.id, product , { responseType: 'text' }).subscribe(
      error => console.error(error));
  }
  public deleteProductById(id: number){
    return this.http.delete(this.url + '/Products' + '/' + id, { responseType: 'text' }).subscribe(
      error => console.error(error));
  }
}
