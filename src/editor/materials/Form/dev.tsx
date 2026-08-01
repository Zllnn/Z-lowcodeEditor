import { Form as AntdForm, Input } from "antd";
import React, { useMemo } from "react";
import { useDrag } from "react-dnd";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import type { CommonComponentProps } from "../../interface";

interface FormItemProps {
  id: number;
  label?: React.ReactNode;
  name?: string;
}

export default function Form({ id, name, children, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(["FormItem"], id);
  const [, drag] = useDrag(() => ({
    type: name,
    item: { type: name, dragType: "move" as const, id },
  }), [id, name]);

  const items = useMemo(() =>
    React.Children.toArray(children).flatMap((child) =>
      React.isValidElement<FormItemProps>(child)
        ? [{ id: child.props.id, label: child.props.label, name: child.props.name }]
        : [],
    ), [children]);

  return (
    <div
      ref={(node) => {
        drop(node);
        drag(node);
      }}
      data-component-id={id}
      style={styles}
      className={`min-h-[100px] w-[100%] p-[20px] ${canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"}`}
    >
      <AntdForm labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        {items.map((item) => (
          <AntdForm.Item key={item.id} name={item.name} label={item.label} data-component-id={item.id}>
            <Input style={{ pointerEvents: "none" }} />
          </AntdForm.Item>
        ))}
      </AntdForm>
    </div>
  );
}
