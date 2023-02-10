import {FC, HtmlHTMLAttributes, PropsWithChildren} from "react";

import s from "./index.module.scss";

export const Title: FC<PropsWithChildren & { main: boolean } & HtmlHTMLAttributes<HTMLHeadingElement>> = (props): JSX.Element => {
    const {children, main,className} = props

    return <>
        {main ? <h1 className={`${s.title} ${className}`}>
            {children}
        </h1> : <h2  className={`${s.title} ${className}`}>
            {children}
        </h2>}
    </>
}