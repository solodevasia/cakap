import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoadingState } from "../reducers/loading.reducer";

export const loadingFeature = createFeatureSelector<LoadingState>("loading")
export const loadingSelector = createSelector(loadingFeature, (state) => state)