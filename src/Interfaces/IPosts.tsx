import { ReactNode } from "react";
import { StringLiteralLike } from "typescript";

export default interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
    actions: IActions[];
}

interface IActions {
    id: string;
    color: string;
    icon: any,
    onClicAction: Function;
    text: string;
}