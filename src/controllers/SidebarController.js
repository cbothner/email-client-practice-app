/**
 * This class is responsible for rendering the correct mailbox’s threads into
 * the sidebar.
 *
 * @providesModule SidebarController
 * @flow
 */

import store from '../store';

import Sidebar from '../views/Sidebar';

type State = { +mailbox: string };
export default class SidebarContents {
  container: HTMLElement;
  state: State = { mailbox: 'INBOX' };

  constructor(container: HTMLElement) {
    this.container = container;
  }

  set mailbox(mailbox: string) {
    this.state = { mailbox };
    this.render();
  }

  render() {
    const threads = this._threads();
    const { mailbox } = this.state;

    this.container.innerHTML = Sidebar({ mailbox, threads });
  }

  _threads() {
    const mailbox = store.mailboxes[this.state.mailbox];
    if (mailbox == null) return [];

    return mailbox.threadIds.map(threadId => store.threads[threadId]);
  }
}
