import { Button } from 'antd';
import React, { FC, MouseEventHandler, ReactNode } from 'react'

export interface ICustomButton {
    id?: string;
    color: string;
    type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined;
    _key: string;
    onClick: MouseEventHandler<HTMLElement>;
    className?: string;
    children: ReactNode | string;
    loading: boolean | { delay?: number | undefined; } | undefined;
}

const CustomButton: FC<ICustomButton> = ({ color, type, _key, onClick, className, children, loading }) => {
    return <Button
        style={{ color: color }}
        type={type}
        loading={loading}
        key={_key}
        onClick={onClick}
        className={className}>
        {children}
    </Button>

}

export default React.memo(CustomButton)