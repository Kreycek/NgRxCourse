import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {BehaviorSubject, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {concatMap, delay, filter, first, map, shareReplay, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    standalone: false
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;
  loading$ = new BehaviorSubject<boolean>(true);

  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private coursesService: CoursesHttpService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.coursesService.findCourseByUrl(courseUrl??'');
    
    this.lessons$ = this.course$.pipe(
          filter(course => !!course),
          switchMap(course => this.coursesService.findLessons(course.id)),
          map(lessons => lessons ?? []), // <- aqui também
          tap(console.log)
    );

  }


  loadLessonsPage(course: Course) {

  }

}