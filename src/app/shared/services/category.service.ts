import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";
import { sale } from "../models/sale.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.host + "/category/categorys");
  }
  public getAllCategoryDipo(): Observable<Category[]> {
    return this.http.get<Category[]>(this.host + "/category/categorysDispo");
  }

  deleteCategoryById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/category/delete/" + id);
  }
  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.host + "/category", category);
  }
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(this.host + "/category/" + id);
  }
  editCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.host + "/category", category);
  }
  getCategoryByIdV2(id: number): Promise<Category> {
    return this.http.get<Category>(this.host + "/category/" + id).toPromise();
  }
  getAllSales(): Promise<sale> {
    return this.http.get<sale>(this.host + "/salesorder/sales/").toPromise();
  }
}
