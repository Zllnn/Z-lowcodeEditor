import { DatePicker, Form as AntdForm, Input } from "antd";
import dayjs from "dayjs";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import type { CommonComponentProps } from "../../interface";

export interface FormRef {
  submit: () => void;
}

interface FormItemProps {
  id: number;
  label?: React.ReactNode;
  name?: string;
  rules?: "required";
  type?: "input" | "date";
}

interface FormProps extends CommonComponentProps {
  onFinish?: (values: Record<string, unknown>) => void;
}

const Form = forwardRef<FormRef, FormProps>(function Form({ children, onFinish, styles }, ref) {
  const [form] = AntdForm.useForm();

  useImperativeHandle(ref, () => ({ submit: () => form.submit() }), [form]);

  const items = useMemo(() =>
    React.Children.toArray(children).flatMap((child) =>
      React.isValidElement<FormItemProps>(child)
        ? [{
            id: child.props.id,
            label: child.props.label,
            name: child.props.name,
            rules: child.props.rules,
            type: child.props.type,
          }]
        : [],
    ), [children]);

  function submit(values: Record<string, unknown>) {
    onFinish?.(Object.fromEntries(Object.entries(values).map(([key, value]) => [
      key,
      dayjs.isDayjs(value) ? value.format("YYYY-MM-DD") : value,
    ])));
  }

  return (
    <AntdForm form={form} style={styles} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} onFinish={submit}>
      {items.map((item) => (
        <AntdForm.Item
          key={item.id}
          name={item.name}
          label={item.label}
          rules={item.rules === "required" ? [{ required: true, message: "不能为空" }] : []}
        >
          {item.type === "date" ? <DatePicker /> : <Input />}
        </AntdForm.Item>
      ))}
    </AntdForm>
  );
});

export default Form;
