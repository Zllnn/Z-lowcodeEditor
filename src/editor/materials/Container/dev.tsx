import { useDrag } from 'react-dnd';
import { useMaterialDrop } from '../../hooks/useMaterialDrop';
import type { CommonComponentProps } from '../../interface';

const Container = ({ id, name, children, styles }: CommonComponentProps) => {

    const {canDrop, drop } = useMaterialDrop(['Button', 'Container'], id);

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

    return (
        <div 
            data-component-id={id}
            ref={connectRef}
            style={styles}
            className={`min-h-[100px] p-[20px] ${ canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >{children}</div>
    )
}

export default Container;
