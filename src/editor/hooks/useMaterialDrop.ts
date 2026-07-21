import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponetsStore } from "../stores/components";

export function useMaterialDrop(accept: string[], id: number) {
    const { addComponent } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    const [{ canDrop }, connectDrop] = useDrop(() => ({
        accept,
        drop: (item: { type: string}, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
              return;
            }

            const config = componentConfig[item.type]

            addComponent({
                id: new Date().getTime(),
                name: item.type,
                props: config?.defaultProps,
                styles: {
                    backgroundColor: '#fff',
                }
            }, id)
        },
        collect: (monitor) => ({
          canDrop: monitor.canDrop(),
        }),
    }));

    const drop = (node: HTMLDivElement | null) => {
        connectDrop(node);
    };

    return { canDrop, drop }
}
