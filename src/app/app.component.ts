import { Component, Signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import CakapInput from './shared/input/input.component';
import CakapButton from './shared/button/button.component';
import { HttpResponse } from './types/response.interface';
import { Store } from '@ngrx/store';
import { CourseState } from './store/reducers/course.store';
import { fetchCourseWithKeyword, resetCourses } from './store/actions/course.actions';
import CakapLoading from './shared/loading/loading.component';
import { LoadingState } from './store/reducers/loading.reducer';
import { loadingSelector } from './store/selectors/loading.selector';
import { CommonModule } from '@angular/common';
import { loadingActive, loadingInActive } from './store/actions/loading.actions';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, CakapButton, CakapInput,CakapLoading],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cakap';
  readonly loadingSelector!: Signal<LoadingState>; 

  form = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private readonly http: HttpClient, private readonly store: Store) {
    this.loadingSelector = this.store.selectSignal(loadingSelector)
  }

  onFilter() {
    this.store.dispatch(loadingActive())
    this.http
      .get<
        HttpResponse<CourseState>
      >(`https://api-staging.cakap.com/v2/cakap-upskill/list-classes/filter?limit=15&page=1&keyword=${this.form.controls.search.value}`)
      .pipe(tap(() => {
        this.store.dispatch(resetCourses())
      }),delay(150))
      .subscribe((res) => {
        this.store.dispatch(fetchCourseWithKeyword({keyword: this.form.controls.search.value || '', course: res.data}))
        this.store.dispatch(loadingInActive())
      });
  }
}
