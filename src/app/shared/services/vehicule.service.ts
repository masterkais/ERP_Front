import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Vehicule } from "../models/vehicule.model";


@Injectable({
  providedIn: "root",
})
export class VehiculeService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllVehicule(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.host + "/vehicule/vehicules");
  }

  deleteVehiculeById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/vehicule/delete/" + id);
  }
  saveVehicule(vehicule:Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.host + "/vehicule", vehicule);
  }
  getVehiculeById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(this.host + "/vehicule/" + id);
  }
  editVehicule(vehicule:Vehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(this.host + "/vehicule", vehicule);
  }
  getVehiculeByIdWithPromise(id: number): Promise<Vehicule> {
    return this.http.get<Vehicule>(this.host + "/vehicule/" + id).toPromise();
  }
  getVehiculeByIdDriver(id: number): Promise<Vehicule> {
    return this.http.get<Vehicule>(this.host + "/vehicule/driverId/" + id).toPromise();
  }
}
