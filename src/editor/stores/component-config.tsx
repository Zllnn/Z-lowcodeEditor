import { create } from "zustand";
import type { ElementType } from "react";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
import ModalDev from "../materials/Modal/dev";
import ModalProd from "../materials/Modal/prod";
import TableDev from "../materials/Table/dev";
import TableProd from "../materials/Table/prod";
import TableColumnDev from "../materials/TableColumn/dev";
import TableColumnProd from "../materials/TableColumn/prod";
import FormDev from "../materials/Form/dev";
import FormProd from "../materials/Form/prod";
import FormItemDev from "../materials/FormItem/dev";
import FormItemProd from "../materials/FormItem/prod";

export interface ComponentSetterOption {
  label: string;
  value: string | number;
}

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  options?: ComponentSetterOption[];
}

export interface ComponentEvent {
  name: string;
  label: string;
}

export interface ComponentMethod {
  name: string;
  label: string;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, unknown>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  methods?: ComponentMethod[];
  dev: ElementType;
  prod: ElementType;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      desc: "容器",
      dev: ContainerDev,
      prod: ContainerProd,
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        {
          name: "text",
          label: "文本",
          type: "input",
        },
      ],
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ],
      events: [
        {
          name: "onClick",
          label: "点击事件",
        },
        {
          name: "onDoubleClick",
          label: "双击事件",
        },
      ],
      desc: "按钮",
      dev: ButtonDev,
      prod: ButtonProd,
    },
    Modal: {
      name: "Modal",
      defaultProps: {
        title: "弹窗",
      },
      setter: [
        {
          name: "title",
          label: "标题",
          type: "input",
        },
      ],
      stylesSetter: [],
      events: [
        {
          name: "onOk",
          label: "确认事件",
        },
        {
          name: "onCancel",
          label: "取消事件",
        },
      ],
      methods: [
        {
          name: "open",
          label: "打开弹窗",
        },
        {
          name: "close",
          label: "关闭弹窗",
        },
      ],
      desc: "弹窗",
      dev: ModalDev,
      prod: ModalProd,
    },
    Table: {
      name: "Table",
      defaultProps: {},
      desc: "表格",
      setter: [
        {
          name: "url",
          label: "数据地址",
          type: "input",
        },
      ],
      dev: TableDev,
      prod: TableProd,
    },
    TableColumn: {
      name: "TableColumn",
      defaultProps: {
        dataIndex: `col_${Date.now()}`,
        title: "列名",
        type: "text",
      },
      desc: "表格列",
      setter: [
        {
          name: "type",
          label: "类型",
          type: "select",
          options: [
            { label: "文本", value: "text" },
            { label: "日期", value: "date" },
          ],
        },
        {
          name: "title",
          label: "标题",
          type: "input",
        },
        {
          name: "dataIndex",
          label: "字段",
          type: "input",
        },
      ],
      dev: TableColumnDev,
      prod: TableColumnProd,
    },
    Form: {
      name: "Form",
      defaultProps: {},
      desc: "表单",
      setter: [
        { name: "title", label: "标题", type: "input" },
      ],
      events: [
        { name: "onFinish", label: "提交事件" },
      ],
      methods: [
        { name: "submit", label: "提交" },
      ],
      dev: FormDev,
      prod: FormProd,
    },
    FormItem: {
      name: "FormItem",
      defaultProps: {
        name: String(Date.now()),
        label: "姓名",
        type: "input",
      },
      desc: "表单项",
      setter: [
        {
          name: "type",
          label: "类型",
          type: "select",
          options: [
            { label: "文本", value: "input" },
            { label: "日期", value: "date" },
          ],
        },
        { name: "label", label: "标题", type: "input" },
        { name: "name", label: "字段", type: "input" },
        {
          name: "rules",
          label: "校验",
          type: "select",
          options: [{ label: "必填", value: "required" }],
        },
      ],
      dev: FormItemDev,
      prod: FormItemProd,
    },
    Page: {
      name: "Page",
      defaultProps: {},
      desc: "页面",
      dev: PageDev,
      prod: PageProd,
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
