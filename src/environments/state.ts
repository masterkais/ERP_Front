/* import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";

export enum GroupActionsTypes{
    GET_ALL_GROUPS="[Group] Get All groups",
    SEARCH_GROUP="[Group] Search group",
    NEW_GROUP="[Group] New group",
    EDIT_GROUP="[Group] Edit group",
    DELETE_GROUP="[Group] Delete group",
    GROUP_ADDED="[Group] group added",
    GROUP_UPDATED="[Group] group updated",
    GROUP_DELETED="[Group] group updated",

}
export interface ActionEvent{
    type:GroupActionsTypes,
    payload?:any
}
export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR,
}
export interface AppDataState<T>{
    dataState: DataStateEnum;
    data?: T,
    errorMessage?:string
}

@Injectable({providedIn:"root"})
export class EventDriverService{
sourceEventSubject:Subject<ActionEvent>=new Subject<ActionEvent>();
sourceEventSubjectObservale=this.sourceEventSubject.asObservable();

publishEvent(event:ActionEvent){
    this.sourceEventSubject.next(event);
}


} */