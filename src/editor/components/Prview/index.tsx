import React from "react";
import { message } from "antd";
import { useComponentConfigStore } from "../../stores/component-config";
import { type Component, useComponetsStore } from "../../stores/components";
import type { ActionConfig } from "../Setting/ActionModal";

function getActions(value: unknown): ActionConfig[] {
  if (!value || typeof value !== "object" || !("actions" in value)) return [];
  const actions = value.actions;
  return Array.isArray(actions) ? actions as ActionConfig[] : [];
}

export function Preview() {
  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  function handleEvent(component: Component) {
    const props: Record<string, () => void> = {};

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      const actions = getActions(eventConfig);
      if (actions.length > 0) {
        props[event.name] = () => {
          actions.forEach((action) => {
            if (action.type === "goToLink") {
              window.location.href = action.url;
            } else if (action.type === "showMessage") {
              if (action.config.type === "success") {
                message.success(action.config.text);
              } else if (action.config.type === "error") {
                message.error(action.config.text);
              }
            } else if (action.type === "customJS") {
              const func = new Function("context", action.code);
              func({
                name: component.name,
                props: component.props,
                showMessage(content: string) {
                  message.success(content);
                },
              });
            }
          });
        };
      }
    });
    return props;
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.prod) {
        return null;
      }

      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
          ...handleEvent(component),
        },
        renderComponents(component.children || []),
      );
    });
  }

  return <div>{renderComponents(components)}</div>;
}
