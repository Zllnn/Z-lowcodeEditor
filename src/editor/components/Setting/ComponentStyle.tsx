import { Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState, type CSSProperties } from "react";
import {
  type ComponentSetter,
  useComponentConfigStore,
} from "../../stores/component-config";
import { useComponetsStore } from "../../stores/components";
import CssEditor from "./CssEditor";

function stylesToCss(styles?: CSSProperties) {
  const declarations = Object.entries(styles ?? {}).map(([name, value]) => {
    const cssName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    return `  ${cssName}: ${String(value)};`;
  });
  return `.comp {\n${declarations.join("\n")}\n}`;
}

function cssToStyles(source: string): CSSProperties {
  const body = source.match(/\{([\s\S]*)\}/)?.[1] ?? source;
  const declaration = document.createElement("div").style;
  declaration.cssText = body;

  const styles: Record<string, string> = {};
  for (const name of declaration) {
    const camelName = name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
    styles[camelName] = declaration.getPropertyValue(name).trim();
  }
  return styles as CSSProperties;
}

function StyleEditor({ styles, onChange }: { styles?: CSSProperties; onChange: (styles: CSSProperties) => void }) {
  const [css, setCss] = useState(() => stylesToCss(styles));

  return <CssEditor value={css} onChange={(value) => {
    const nextCss = value ?? "";
    setCss(nextCss);
    onChange(cssToStyles(nextCss));
  }} />;
}

export function ComponentStyle() {
  const [form] = Form.useForm();
  const { curComponentId, curComponent, updateComponentStyles } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();
  useEffect(() => {
    form.setFieldsValue(curComponent?.styles);
  }, [curComponent, form]);

  if (!curComponentId || !curComponent) return null;

  function renderFormElement(setting: ComponentSetter) {
    if (setting.type === "select") return <Select options={setting.options} />;
    if (setting.type === "input") return <Input />;
    if (setting.type === "inputNumber") return <InputNumber />;
    return null;
  }

  function valueChange(changedValues: CSSProperties) {
    updateComponentStyles(curComponentId!, changedValues);
  }

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <StyleEditor key={curComponentId} styles={curComponent.styles} onChange={(styles) => updateComponentStyles(curComponentId, styles, true)} />
      </div>
    </Form>
  );
}
