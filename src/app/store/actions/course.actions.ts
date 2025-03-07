import { createAction, props } from "@ngrx/store";
import { CourseDetailState, CourseState } from "../reducers/course.store";

export const fetchCourse = createAction("Fetch Course All",
    props<{course: CourseState}>()
)
export const fetchCourseDetail = createAction("Fetch Course Detail",props<{courseDetail: CourseDetailState}>())
export const fetchCourseWithKeyword = createAction("Filter Course", props<{course: CourseState, keyword: string}>())
export const clearCourseDetail = createAction("Clear Course Detail")
export const resetCourses = createAction("Reset Courses")