/**
 * The label for what mailbox is being displayed is also a dropdown to choose a
 * new mailbox
 *
 * @providesModule Header
 * @flow
 */

import html from '../../utility/html';

const Option = ({ mailbox, selectedMailbox }) => html`
  <option
    value="${mailbox}"
    ${mailbox === selectedMailbox ? 'selected' : ''}
  >
    ${mailbox}
  </option>
`;

const Header = ({
  mailboxes,
  selectedMailbox,
}: {
  mailboxes: string[],
  selectedMailbox: string,
}) => html`
  <h2 class="email-header">
    <select data-action="switchMailbox" data-event-type="change">
      ${mailboxes.map(mailbox => Option({ mailbox, selectedMailbox })).join('')}
    </select>
  </h2>
`;
export default Header;
