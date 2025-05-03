import {Injectable} from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {map} from "rxjs/operators";
import {Lesson} from "../model/lesson";


@Injectable({
    providedIn: 'root',
  })
export class CoursesHttpService {

    constructor(private http:HttpClient) {

    }

    findAllCourses(): Observable<Course[]> {
        return this.http.get('http://localhost:3000/api/courses')
            .pipe(
                map((res:any) => res['payload'])
            );
    }

    findCourseByUrl(courseUrl: string): Observable<Course> {
      return this.http.get<Course>(`http://localhost:3000/api/courses/${courseUrl}`);
    }

    findLessons(
        courseId:number,
        pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {

        
        return this.http.get<Lesson[]>('http://localhost:3000/api/lessons', {
            params: new HttpParams()
             .set('courseId', courseId.toString())
            .set('sortOrder', 'asc')
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            }).pipe(
            map(lessons => lessons ?? []) // Garante que nunca será null
            );
    }


    saveCourse(courseId: number | string, changes: Partial<Course>) {
        return this.http.put('http://localhost:3000/api/course/' + courseId, changes);
    }


}