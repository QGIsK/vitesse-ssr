export type ErrorBag = Record<string, string[]>

export interface CustomTargetMouseEvent<T extends HTMLElement> extends MouseEvent {
  target: T | null
}

export interface CustomTargetInputEvent<T extends HTMLElement> extends InputEvent {
  target: T | null
}
