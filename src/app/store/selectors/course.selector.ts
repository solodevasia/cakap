import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "../reducers/course.store";

export const courseFeature = createFeatureSelector<CourseState>("course")
export const courseSelector = createSelector(courseFeature, (state) => state)