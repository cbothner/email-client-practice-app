/**
 * An abstract base class for a controller.
 *
 * @providesModule Controller
 * @flow
 */

export default class Controller<State: Object> {
  actions: { [string]: EventHandler } = {};
  container: HTMLElement;
  state: State;

  setState(reducerOrDiff: $Shape<State> | (($Shape<State>) => State)) {
    if (typeof reducerOrDiff === 'function') {
      this.state = reducerOrDiff(this.state);
    } else {
      this.state = { ...this.state, ...reducerOrDiff };
    }
    this.render();
  }

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(view?: string) {
    this.container.innerHTML = view || '';
    this._connect();
  }

  _connect() {
    Object.keys(this.actions).forEach(name =>
      this.container
        .querySelectorAll(`[data-action="${name}"]`)
        .forEach(
          element =>
            element.dataset.eventType != null &&
            element.addEventListener(
              element.dataset.eventType,
              this.actions[name],
            ),
        ),
    );
  }
}
