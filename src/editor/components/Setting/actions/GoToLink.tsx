import { Input } from "antd";

export interface GoToLinkConfig {
  type: "goToLink";
  url: string;
}

interface GoToLinkProps {
  value?: string;
  onChange?: (config: GoToLinkConfig) => void;
}

export function GoToLink({ value, onChange }: GoToLinkProps) {
  return (
    <div className="mt-[40px] flex items-center gap-[10px]">
      <div>链接：</div>
      <Input
        style={{ width: 500 }}
        value={value}
        onChange={(event) => onChange?.({
          type: "goToLink",
          url: event.target.value,
        })}
      />
    </div>
  );
}
