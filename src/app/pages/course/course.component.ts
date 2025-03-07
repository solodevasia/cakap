import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CakapCard from '../../shared/card/card.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { courseSelector } from '../../store/selectors/course.selector';
import { HttpResponse } from '../../types/response.interface';
import { CourseState } from '../../store/reducers/course.store';
import { fetchCourse } from '../../store/actions/course.actions';
import { loadingActive, loadingInActive } from '../../store/actions/loading.actions';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  standalone: true,
  imports: [CakapCard,InfiniteScrollDirective],
})
export default class CourseComponent implements OnInit {
  readonly store = inject(Store);
  readonly selector = this.store.selectSignal(courseSelector)
  readonly router = inject(Router);

  constructor(private readonly http: HttpClient) {}

  fetchCourse() : Observable<HttpResponse<CourseState>> {
    this.store.dispatch(loadingActive())
    return this.http
      .get<
        HttpResponse<CourseState>
      >(`https://api-staging.cakap.com/v2/cakap-upskill/list-classes/filter?limit=${this.selector().totalPage}&page=${this.selector().courses.length ? this.selector().page + 1 : this.selector().page}`)
  }

  ngOnInit(): void {
    this.fetchCourse().subscribe((res) => {
      this.store.dispatch(fetchCourse({course: res.data}))
      this.store.dispatch(loadingInActive())
    });
  }

  onDetail(id: number) {
    this.router.navigate([`/course/${id}`]);
  }

  onScroll() {
    this.fetchCourse().subscribe((res) => {
      this.store.dispatch(fetchCourse({course: {
        ...res.data,
        courses: this.selector().courses.concat(res.data.courses)
      }}))
      this.store.dispatch(loadingInActive())
    });
  }
}
