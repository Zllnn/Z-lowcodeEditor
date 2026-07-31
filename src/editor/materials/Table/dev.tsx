import { Table as AntdTable } from 'antd';
import React, { useMemo } from 'react';
import type { CommonComponentProps } from '../../interface';
import { useMaterialDrop } from '../../hooks/useMaterialDrop';
import { useDrag } from 'react-dnd';

interface TableColumnProps {
    id: number;
    title?: React.ReactNode;
    dataIndex?: string;
}

function Table({ id, name, children, styles }: CommonComponentProps) {

    const {canDrop, drop } = useMaterialDrop(['TableColumn'], id);

    const [, drag] = useDrag({
        type: name,
        item: {
            type: name,
            dragType: 'move',
            id: id
        }
    });

    const connectRef = (node: HTMLDivElement | null) => {
        drop(node);
        drag(node);
    };

    const columns = useMemo(() => {
        return React.Children.toArray(children).flatMap((item) => {
            if (!React.isValidElement<TableColumnProps>(item)) return [];
            return [{
                title: <div className='m-[-16px] p-[16px]' data-component-id={item.props?.id}>{item.props?.title}</div>,
                dataIndex: item.props?.dataIndex,
                key: item.props.id
            }]
        })
    }, [children]);

    return (
        <div
            className={`w-[100%] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
            ref={connectRef}
            data-component-id={id}
            style={styles}
        >
            <AntdTable
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
        </div>
    );
}

export default Table;
