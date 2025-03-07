import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../../../types/response.interface';
import { CourseDetailState } from '../../../store/reducers/course.store';
import { clearCourseDetail, fetchCourseDetail } from '../../../store/actions/course.actions';
import { courseSelector } from '../../../store/selectors/course.selector';
import CakapButton from '../../../shared/button/button.component';
import { loadingActive, loadingInActive } from '../../../store/actions/loading.actions';

@Component({
  selector: 'app-course-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone: true,
  imports: [CommonModule,CakapButton]
})
export default class CourseDetailComponent implements OnInit {
  readonly store = inject(Store)
  readonly selector = this.store.selectSignal(courseSelector)
  readonly router = inject(Router)
  readonly route = inject(ActivatedRoute)
  readonly http = inject(HttpClient)

  ngOnInit(): void {
    this.store.dispatch(loadingActive())
    this.route.params.subscribe((param) => {
      this.http.get<HttpResponse<CourseDetailState>>(`https://api-staging.cakap.com/v3/selfpaced/course/detail/${(param as {id: number}).id}?platform=WEB`).subscribe((res) => {
        this.store.dispatch(loadingInActive())
        this.store.dispatch(fetchCourseDetail({courseDetail: res.data}))
      },() => {
        this.router.navigate(['/course'])
        this.store.dispatch(loadingInActive())
      })
    })
  }

  onBack() {
    this.router.navigate(['/course'])
    this.store.dispatch(clearCourseDetail())
  }
}
