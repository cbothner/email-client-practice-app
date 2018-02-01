/**
 * This class is responsible for rendering the correct mailbox’s threads into
 * the sidebar.
 *
 * @providesModule SidebarController
 * @flow
 */

import store from '../store';

import Sidebar from '../views/Sidebar';

type State = { +selectedMailbox: string };
export default class SidebarContents {
  container: HTMLElement;
  state: State = { selectedMailbox: 'INBOX' };

  constructor(container: HTMLElement) {
    this.container = container;
  }

  set selectedMailbox(selectedMailbox: string) {
    this.state = { selectedMailbox };
    this.render();
  }

  render() {
    const mailboxes = Object.keys(store.mailboxes);
    const threads = this._threads();
    const { selectedMailbox } = this.state;

    this.container.innerHTML = Sidebar({ selectedMailbox, threads, mailboxes });
  }

  _threads() {
    const selectedMailbox = store.mailboxes[this.state.selectedMailbox];
    if (selectedMailbox == null) return [];

    return selectedMailbox.threadIds.map(threadId => store.threads[threadId]);
  }
}
