import { Button as AntdButton } from 'antd';
import type { ButtonType } from 'antd/es/button';
import type { ReactNode } from 'react';
import { useDrag } from 'react-dnd';
import type { CommonComponentProps } from '../../interface';

interface ButtonProps extends CommonComponentProps {
  type?: ButtonType;
  text?: ReactNode;
}

const Button = ({id, type, text, styles}: ButtonProps) => {
  const [, connectDrag] = useDrag(() => ({
    type: 'Button',
    item: { type: 'Button', dragType: 'move' as const, id },
  }), [id]);
  const drag = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
    connectDrag(node);
  };

  return (
    <AntdButton ref={drag} data-component-id={id} type={type} style={styles}>{text}</AntdButton>
  )
}

export default Button;
