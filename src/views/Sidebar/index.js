/**
 * The sidebar lists the email threads contained in a mailbox.
 *
 * @providesModule Sidebar
 * @flow
 */

import html from '../../utility/html';

import ThreadItem from './ThreadItem';

import type { Thread } from '../../store/types';

const Sidebar = ({
  mailbox,
  threads,
}: {
  mailbox: string,
  threads: Thread[],
}) => html`
  <h2 class="email-header">${mailbox}</h2>

  <ul class="email-list">
    ${threads.map(thread => ThreadItem({ thread })).join('')}
  </ul>
 `;

export default Sidebar;
