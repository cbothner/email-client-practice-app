/**
 * The data store is currently a JSON file, but its schema mirrors the Gmail
 * API so we can feed it from your own inbox at a later date.
 *
 * @flow
 */

import Rfc822Address from '../utility/Rfc822Address';

import type { Data, Message } from './types';

const store: Data = require('./emails.json');

/**
 * Message helpers
 */

export function getMessageSender(message: Message): Rfc822Address {
  const { headers } = message.payload;
  const fromHeader = headers.find(header => header.name === 'From');

  if (fromHeader == null) {
    throw new Error('Every email must have been sent by someone!');
  }

  return new Rfc822Address(fromHeader.value);
}

export function getMessageSubject(message: Message): ?string {
  const { headers } = message.payload;
  const subjectHeader = headers.find(header => header.name === 'Subject');
  return subjectHeader && subjectHeader.value;
}

export default store;
