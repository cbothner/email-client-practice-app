/**
 * @flow
 */

import SidebarController from './controllers/SidebarController';

(() => {
  const container = document.querySelector('.email-list-container');
  if (container == null) return;

  const sidebarController = new SidebarController(container);
  sidebarController.setState({ selectedMailbox: 'INBOX' });
})();
