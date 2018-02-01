/**
 * The sidebar lists the email threads contained in a mailbox.
 *
 * @providesModule Sidebar
 * @flow
 */

import html from '../utility/html';

import store, {
  getMessageSender,
  getMessageSubject,
  getMessageTimestamp,
} from '../store';

import type { Thread } from '../store/types';

const SidebarItem = ({ thread }: { thread: Thread }) => {
  const { messages } = thread;
  const lastMessage = store.messages[messages[messages.length - 1].id];

  const sender = getMessageSender(lastMessage);
  const timestamp = getMessageTimestamp(lastMessage);
  const subject = getMessageSubject(lastMessage);
  const { snippet } = lastMessage;

  return html`
    <li>
      <button class="email-item" type="button">
        <div class="sender-details">
          <p>${sender.name || sender.email}</p>
          <span>${timestamp.toLocaleString()}</span>
        </div>

        <p class="email-subject">${subject || 'No subject'}</p>

        <p>${snippet}</p>
      </button>
    </li>
  `;
};

const Sidebar = ({
  mailbox,
  threads,
}: {
  mailbox: string,
  threads: Thread[],
}) => html`
  <h2 class="email-header">${mailbox}</h2>

  <ul class="email-list">
    ${threads.map(thread => SidebarItem({ thread })).join('')}
  </ul>
 `;

export default Sidebar;
