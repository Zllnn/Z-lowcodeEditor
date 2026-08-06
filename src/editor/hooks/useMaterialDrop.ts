import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponetsStore } from "../stores/components";

export interface ItemType {
  type: string;
  dragType?: 'move' | 'add',
  id: number
}

export function useMaterialDrop(accept: string[], id: number) {
    const { addComponent, moveComponent } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    const [{ canDrop }, connectDrop] = useDrop(() => ({
        accept,
        drop: (item: ItemType, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
              return;
            }

            if(item.dragType === 'move') {
              moveComponent(item.id, id);
            } else {
              const config = componentConfig[item.type];

              addComponent({
                id: Date.now(),
                name: item.type,
                desc: config.desc,
                props: { ...config.defaultProps }
              }, id)
            }
        },
        collect: (monitor) => ({
          canDrop: monitor.canDrop(),
        }),
    }));

    const drop = (node: HTMLElement | null) => {
      connectDrop(node);
    };

    return { canDrop, drop }
}
