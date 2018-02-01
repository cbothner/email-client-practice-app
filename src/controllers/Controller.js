/**
 * An abstract base class for a controller.
 *
 * @providesModule Controller
 * @flow
 */

export default class Controller<State: Object> {
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
  }
}
