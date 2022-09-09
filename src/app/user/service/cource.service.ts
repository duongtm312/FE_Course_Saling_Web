import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../model/Course";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {MyCourse} from "../../model/MyCourse";
import {Instructor} from "../../model/Instructor";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CourceService {

  constructor(private http:HttpClient) { }
  findById(id:number):Observable<Course>{
    return this.http.get<Course>(`${API_URL}/course/find/${id}`)
  }
  getTrendingCourse ():Observable<Course[]>{
    return this.http.get<Course[]>(`${API_URL}/course/trendingCourse`)
  }
  buyCourse(idCourse:number):Observable<MyCourse>{
    return this.http.get<MyCourse>(`${API_URL}/course/buyCourse/${idCourse}`)
  }
  getAllCourseByCriteria(criteria:any):Observable<Course[]>{
    return this.http.post<Course[]>(`${API_URL}/user/courseCriteria`,criteria)
  }
  getAll():Observable<Course[]>{
    return this.http.get<Course[]>(`${API_URL}/user/allCourse`)
  }
  getAllInstructor():Observable<Instructor[]>{
    return this.http.get<Instructor[]>(`${API_URL}/user/allInstructor`)
  }
}
