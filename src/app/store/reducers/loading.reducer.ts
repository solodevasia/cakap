import { createReducer, on } from "@ngrx/store"
import { loadingActive, loadingInActive } from "../actions/loading.actions"

export interface LoadingState {
    loading: boolean
}

const initialState: LoadingState = {
    loading: false
}

export const LoadingStore = createReducer(initialState,
    on(loadingActive, () => ({loading: true})),
    on(loadingInActive, () => ({loading: false}))
)