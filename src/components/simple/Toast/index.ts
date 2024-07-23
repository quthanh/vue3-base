import { createVNode, render } from "vue";
import ToastComponent from "./Toast.vue";

export type ToastType = "info" | "warning" | "error" | "success";

let instance: any; // Change 'any' to the correct type if possible
let timeoutId: NodeJS.Timeout | null = null;

const $toast = (
  message: string,
  type: ToastType = "success",
  time: number = 3000
) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  if (!instance) {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const toastVNode = createVNode(ToastComponent, {
      message: message,
      show: true,
      type: type,
    });
    render(toastVNode, container);

    instance = toastVNode.component;
  }

  instance.props.show = true;
  instance.props.message = message;
  instance.props.type = type;

  timeoutId = setTimeout(() => {
    instance.props.show = false;
  }, time);
};

export default $toast;
