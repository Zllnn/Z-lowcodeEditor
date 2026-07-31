import { Modal, Segmented } from "antd";
import { useState } from "react";
import { GoToLink, type GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, type ShowMessageConfig } from "./actions/ShowMessage";
import { CustomJS, type CustomJSConfig } from "./actions/CustomJS";
import { ComponentMethod, type ComponentMethodConfig } from "./actions/ComponentMethod";

export type ActionConfig = GoToLinkConfig | ShowMessageConfig | CustomJSConfig | ComponentMethodConfig;

const actionLabels: Record<ActionConfig["type"], string> = {
    goToLink: '访问链接',
    showMessage: '消息提示',
    customJS: '自定义 JS',
    componentMethod: '组件方法'
};

export interface ActionModalProps {
    visible: boolean
    action?: ActionConfig
    handleOk: (config?: ActionConfig) => void
    handleCancel: () => void
}

export function ActionModal(props: ActionModalProps) {
    const {
        visible,
        action,
        handleOk,
        handleCancel
    } = props;

    const [key, setKey] = useState<string>('访问链接');
    const [curConfig, setCurConfig] = useState<ActionConfig>();
    const activeConfig = curConfig ?? action;

    return  <Modal 
        title="事件动作配置"
        width={800}
        open={visible}
        okText="确认"
        cancelText="取消"
        onOk={() => handleOk(curConfig)}
        onCancel={handleCancel}
        afterOpenChange={(open) => {
            if (open) {
                setKey(action ? actionLabels[action.type] : '访问链接');
                setCurConfig(action);
            }
        }}
    >
        <div className="h-[500px]">
            <Segmented value={key} onChange={(value) => {
                setKey(value);
                setCurConfig(undefined);
            }} block options={['访问链接', '消息提示', '组件方法', '自定义 JS']} />
            {
                key === '访问链接' && <GoToLink key="goToLink" value={activeConfig?.type === 'goToLink' ? activeConfig.url : ''} onChange={(config) => {
                    setCurConfig(config);
                }}/>
            }
            {
                key === '消息提示' && <ShowMessage key="showMessage" value={activeConfig?.type === 'showMessage' ? activeConfig.config : undefined} onChange={(config) => {
                setCurConfig(config);
                }}/>
            }
            {
                key === '组件方法' && <ComponentMethod key={`componentMethod-${activeConfig?.type === 'componentMethod' ? activeConfig.config.componentId : 'new'}`} value={activeConfig?.type === 'componentMethod' ? activeConfig.config : undefined} onChange={(config) => {
                    setCurConfig(config);
                }}/>
            }
            {
                key === '自定义 JS' && <CustomJS key="customJS" value={activeConfig?.type === 'customJS' ? activeConfig.code : ''} onChange={(config) => {
                    setCurConfig(config);
                }}/>
            }
        </div>
    </Modal>
}
