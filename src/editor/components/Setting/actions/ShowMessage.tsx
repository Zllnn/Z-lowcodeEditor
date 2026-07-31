import { Input, Select } from "antd";

export interface ShowMessageConfig {
  type: "showMessage";
  config: {
    type: "success" | "error";
    text: string;
  };
}

interface ShowMessageProps {
  value?: ShowMessageConfig["config"];
  onChange?: (config: ShowMessageConfig) => void;
}

export function ShowMessage({ value, onChange }: ShowMessageProps) {
  const update = (config: Partial<ShowMessageConfig["config"]>) => {
    onChange?.({
      type: "showMessage",
      config: {
        type: value?.type ?? "success",
        text: value?.text ?? "",
        ...config,
      },
    });
  };

  return (
    <div className="mt-[40px] space-y-[10px]">
      <div className="flex items-center gap-[10px]">
        <div>类型：</div>
        <Select
          style={{ width: 500 }}
          value={value?.type}
          options={[
            { label: "成功", value: "success" },
            { label: "失败", value: "error" },
          ]}
          onChange={(type) => update({ type })}
        />
      </div>
      <div className="flex items-center gap-[10px]">
        <div>文本：</div>
        <Input
          style={{ width: 500 }}
          value={value?.text}
          onChange={(event) => update({ text: event.target.value })}
        />
      </div>
    </div>
  );
}
