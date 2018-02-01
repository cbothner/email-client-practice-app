/**
 * One thread item for listing in the sidebar
 *
 * @providesModule ThreadItem
 * @flow
 */

import html from '../../utility/html';

import store, {
  getMessageSender,
  getMessageSubject,
  getMessageTimestamp,
} from '../../store';

import type { Thread } from '../../store/types';

const ThreadItem = ({ thread }: { thread: Thread }) => {
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

export default ThreadItem;
