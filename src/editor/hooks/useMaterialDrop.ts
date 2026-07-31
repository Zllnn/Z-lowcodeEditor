import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { getComponentById, useComponetsStore } from "../stores/components";

export interface ItemType {
  type: string;
  dragType?: 'move' | 'add',
  id: number
}

export function useMaterialDrop(accept: string[], id: number) {
    const { addComponent, deleteComponent, components } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    const [{ canDrop }, connectDrop] = useDrop(() => ({
        accept,
        drop: (item: ItemType, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
              return;
            }

            if(item.dragType === 'move') {
              const component = getComponentById(item.id, components)!;

              deleteComponent(item.id);

              addComponent(component, id)
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
