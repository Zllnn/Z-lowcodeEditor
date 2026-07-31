import { Button as AntdButton } from "antd";
import type { ButtonType } from "antd/es/button";
import type { ReactNode } from "react";
import type { CommonComponentProps } from "../../interface";

interface ButtonProps extends CommonComponentProps {
  type?: ButtonType;
  text?: ReactNode;
}

const Button = ({ type, text, styles }: ButtonProps) => {
  return (
    <AntdButton type={type} style={styles}>
      {text}
    </AntdButton>
  );
};

export default Button;
