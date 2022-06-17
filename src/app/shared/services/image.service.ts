import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Image } from "../models/image.model";


@Injectable({
  providedIn: "root",
})
export class ImageService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllImage(): Observable<Image[]> {
    return this.http.get<Image[]>(this.host + "/image/images");
  }

  deleteImageById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/image/delete/" + id);
  }
  saveImage(image:Image): Observable<Image> {
    return this.http.post<Image>(this.host + "/image", image);
  }
  getImageById(id: number): Observable<Image> {
    return this.http.get<Image>(this.host + "/image/" + id);
  }
  editCategory(image:Image): Observable<Image> {
    return this.http.put<Image>(this.host + "/image", image);
  }
  uploadImage(image:Image): Observable<Image> {
    return this.http.post<Image>(this.host + "/image/upload", image);
  }
}
