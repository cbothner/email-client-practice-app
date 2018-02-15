/**
 * This class is responsible for rendering the correct mailbox’s threads into
 * the sidebar.
 *
 * @providesModule SidebarController
 * @flow
 */

import store from '../store';

import Controller from './Controller';
import Sidebar from '../views/Sidebar';

export default class SidebarController extends Controller<{
  selectedMailbox: string,
}> {
  state = { selectedMailbox: 'INBOX' };

  actions = {
    switchMailbox: (e: Event) => {
      if (e.currentTarget instanceof HTMLSelectElement) {
        this.setState({ selectedMailbox: e.currentTarget.value });
      }
    },
  };

  render() {
    const mailboxes = Object.keys(store.mailboxes);
    const threads = this._threads();
    const { selectedMailbox } = this.state;

    super.render(
      Sidebar({
        selectedMailbox,
        threads,
        mailboxes,
      }),
    );
  }

  _threads() {
    const selectedMailbox = store.mailboxes[this.state.selectedMailbox];
    if (selectedMailbox == null) return [];

    return selectedMailbox.threadIds.map(threadId => store.threads[threadId]);
  }
}
