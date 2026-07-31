import { Tree, type TreeDataNode } from "antd";
import { type Component, useComponetsStore } from "../../stores/components";

function toTreeData(component: Component): TreeDataNode {
    return {
        key: component.id,
        title: component.desc,
        children: component.children?.map(toTreeData),
    };
}

export function Outline() {
    const { components, setCurComponentId } = useComponetsStore();

    return <Tree
        treeData={components.map(toTreeData)}
        showLine
        defaultExpandAll
        onSelect={([selectedKey]) => {
            setCurComponentId(selectedKey as number);
        }}
    />
}
