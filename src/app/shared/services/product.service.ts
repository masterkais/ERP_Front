import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";


@Injectable({
  providedIn: "root",
})
export class ProductService {
 
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + "/product/products");
  }

  deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/product/delete/" + id);
  }
  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.host + "/product", product);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.host + "/product/" + id);
  }
  editProduct(product:Product): Observable<Product> {
    return this.http.put<Product>(this.host + "/product", product);
  }
  public getAllProductByCategory(id:number): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + "/product/products/categoryId/"+id);
  }
  public getAllProductBySiteStock(id:number): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + "/product/products/siteStockId/"+id);
  }
  public getAllProductByActive(active:boolean): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + "/product/products/active/"+active);
  }
  public getAllProductByState(state:boolean): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + "/product/products/state/"+state);
  }
  public getAllProductByCategoryPromise(id:number): Promise<Product[]> {
    return this.http.get<Product[]>(this.host + "/product/products/categoryId/"+id).toPromise();
  }
  getProductsByCategoryWithPromise(id:number): Promise<Product[]> {
    return this.http.get<Product[]>(this.host + "/product/products/categoryId/"+id).toPromise();
  }
  getAllProductByCategoryAndSiteStockPromise(categoryid: number,siteStockId:number):Promise<Product[]> {
    return this.http.get<Product[]>(this.host + "/product/products/siteStockAndCategory/"+categoryid+"/"+siteStockId).toPromise();
  }
  getProductByIdV2(id: number): Promise<Product> {
    return this.http.get<Product>(this.host + "/product/" + id).toPromise();
  }
}
