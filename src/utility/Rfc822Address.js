/**
 * [RFC 822](https://www.ietf.org/rfc/rfc822.txt) defines how email is
 * structured and allows for the emails of the form 'cbothner@umich.edu' as well
 * as the form 'Cameron Bothner <cbothner@umich.edu>'. This class parses and
 * unpacks that format.
 *
 * @providesModule Rfc822Address
 * @flow
 */

export default class Rfc822Address {
  // Let’s try to match angle brackets no matter how they’re escaped. The truth
  // is that the Gmail API gives us \u003c and \u003e.
  static ANGLE_BRACKET_PATTERNS = [/<|\\u003c|&lt;/, />|\\u003e|&gt;/];

  /* eslint-disable max-len */
  // This is what the W3C says web browsers should use to validate emails in
  // <input type="email"> elements. Sigh...
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Basic_validation
  static BARE_EMAIL_ADDRESS_PATTERN = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/;
  /* eslint-enable max-len */

  // This has two capture groups that allow the name component and the
  // address component to be accessed
  static NAME_AND_EMAIL_IN_BRACKETS_PATTERN = RegExp(
    `(.+)\\s+(?:${Rfc822Address.ANGLE_BRACKET_PATTERNS[0].source})(${
      Rfc822Address.BARE_EMAIL_ADDRESS_PATTERN.source
    })(?:${Rfc822Address.ANGLE_BRACKET_PATTERNS[1].source})`,
  );

  name: ?string;
  email: string;

  constructor(str: string) {
    const nameAndEmailMatch = str.match(
      Rfc822Address.NAME_AND_EMAIL_IN_BRACKETS_PATTERN,
    );

    if (nameAndEmailMatch) {
      const [, name, email] = nameAndEmailMatch;
      this.name = name;
      this.email = email;
    } else if (Rfc822Address.BARE_EMAIL_ADDRESS_PATTERN.test(str)) {
      this.email = str;
    } else {
      throw new Error(
        'Invalid email. But these came from the API! That should never happen',
      );
    }
  }
}
