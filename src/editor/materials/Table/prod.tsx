import { Table as AntdTable } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import type { CommonComponentProps } from "../../interface";

interface TableColumnProps {
  dataIndex?: string;
  title?: string;
  type?: "text" | "date";
}

interface TableProps extends CommonComponentProps {
  url?: string;
}

export default function Table({ children, styles, url }: TableProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    let active = true;
    void Promise.resolve().then(() => {
      if (active) setLoading(true);
    });
    void fetch(url, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(response))
      .then((result: unknown) => {
        if (active) setData(Array.isArray(result) ? result : []);
      })
      .catch((error: unknown) => {
        if (active && !(error instanceof DOMException && error.name === "AbortError")) setData([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [url]);

  const columns = useMemo(() =>
    React.Children.toArray(children).flatMap((item) => {
      if (!React.isValidElement<TableColumnProps>(item)) return [];
      const { dataIndex, title, type } = item.props;
      return [{
        dataIndex,
        title,
        key: dataIndex,
        render: type === "date" ? (value: unknown) => value ? dayjs(value as string | number | Date).format("YYYY-MM-DD") : null : undefined,
      }];
    }), [children]);

  return <AntdTable columns={columns} dataSource={url ? data : []} loading={Boolean(url) && loading} pagination={false} rowKey="id" style={styles} />;
}
