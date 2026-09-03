/** Shape accepted by POST /api/contact. */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactFieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactResponse {
  ok: boolean;
  message: string;
  errors?: ContactFieldErrors;
}

/** Deliberately permissive: shape check only, no attempt to prove deliverability. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Shared by the client form and the route handler, so a submission cannot pass
 * one and fail the other. The server always re-runs it — client validation is
 * a convenience, never the gate.
 */
export function validateContact(input: Partial<ContactPayload>): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  const name = input.name?.trim() ?? '';
  const email = input.email?.trim() ?? '';
  const message = input.message?.trim() ?? '';

  if (name.length < 2) errors.name = 'Please enter your name.';
  else if (name.length > 100) errors.name = 'That name is too long.';

  if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.';
  else if (email.length > 200) errors.email = 'That email address is too long.';

  if (message.length < 10) errors.message = 'Please give us a little more detail.';
  else if (message.length > 4000) errors.message = 'Please keep this under 4,000 characters.';

  return errors;
}
