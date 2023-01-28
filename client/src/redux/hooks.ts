import { Dispatch, RootState } from "./store";
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from "react-redux";
import { ThunkAction } from "redux-thunk";

type DispatchFunc = () => Dispatch;

export const useDispatch: DispatchFunc = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
