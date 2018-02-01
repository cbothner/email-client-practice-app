/**
 * The sidebar lists the email threads contained in a mailbox.
 *
 * @providesModule Sidebar
 * @flow
 */

import html from '../../utility/html';

import Header from './Header';
import ThreadItem from './ThreadItem';

import type { Thread } from '../../store/types';

const Sidebar = ({
  mailboxes,
  selectedMailbox,
  threads,
}: {
  mailboxes: string[],
  selectedMailbox: string,
  threads: Thread[],
}) => html`
  ${Header({ mailboxes, selectedMailbox })}

  <ul class="email-list">
    ${threads.map(thread => ThreadItem({ thread })).join('')}
  </ul>
 `;

export default Sidebar;
