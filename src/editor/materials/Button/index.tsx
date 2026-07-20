import { Button as AntdButton } from 'antd';
import type { ButtonType } from 'antd/es/button';
import type { ReactNode } from 'react';
import type { CommonComponentProps } from '../../interface';

interface ButtonProps extends CommonComponentProps {
  type?: ButtonType;
  text?: ReactNode;
}

const Button = ({id, type, text}: ButtonProps) => {
  return (
    <AntdButton data-component-id={id} type={type}>{text}</AntdButton>
  )
}

export default Button;
