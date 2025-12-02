export type XMBAction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "select"
  | "back"
  | "power";

const BUS_NAME = "xmb-event-bus";

export const xmbBus = new EventTarget();

export function dispatchXMB(action: XMBAction) {
  xmbBus.dispatchEvent(new CustomEvent(BUS_NAME, { detail: action }));
}

export function listenXMB(handler: (action: XMBAction) => void) {
  const listener = (e: Event) => {
    const ce = e as CustomEvent;
    handler(ce.detail as XMBAction);
  };
  xmbBus.addEventListener(BUS_NAME, listener);
  return () => xmbBus.removeEventListener(BUS_NAME, listener);
}
