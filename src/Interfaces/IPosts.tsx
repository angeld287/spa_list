import { ReactNode } from "react";
import { StringLiteralLike } from "typescript";
import { ICustomButton } from "../Components/CustomButton";

export default interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
    actions: ICustomButton[];
}