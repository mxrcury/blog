import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export type NextMiddleware = Dispatch<AnyAction>;
export type EventCallback = (data: any, dispatch: Dispatch<AnyAction>) => void;
