import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { RowMaterial } from "../models/rowMaterial.model";

@Injectable({
  providedIn: "root",
})
export class RowMaterialService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllRowMaterial(): Observable<RowMaterial[]> {
    return this.http.get<RowMaterial[]>(
      this.host + "/rowMaterial/rowMaterials"
    );
  }

  deleteRowMaterialById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/RowMaterial/delete/" + id);
  }
  saveBrand(rowMaterial: RowMaterial): Observable<RowMaterial> {
    return this.http.post<RowMaterial>(this.host + "/rowMaterial", rowMaterial);
  }
  getRowMaterialById(id: number): Observable<RowMaterial> {
    return this.http.get<RowMaterial>(this.host + "/rowMaterial/" + id);
  }
  editRowMaterial(rowMaterial: RowMaterial): Observable<RowMaterial> {
    return this.http.put<RowMaterial>(this.host + "/rowMaterial", rowMaterial);
  }
}
