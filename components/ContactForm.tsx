'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import {
  validateContact,
  type ContactFieldErrors,
  type ContactResponse,
} from '@/lib/content/contact';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const fieldId = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [notice, setNotice] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const nameId = `${fieldId}-name`;
  const emailId = `${fieldId}-email`;
  const messageId = `${fieldId}-message`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    const clientErrors = validateContact(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus('error');
      setNotice('Please check the fields below.');
      return;
    }

    setStatus('submitting');
    setErrors({});
    setNotice('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus('error');
        setNotice(result.message || 'Something went wrong. Please email us directly.');
        return;
      }

      setStatus('success');
      setNotice(result.message);
      formRef.current?.reset();
    } catch {
      setStatus('error');
      setNotice(
        'We could not send that. Please email contact@orcacast.com instead.',
      );
    }
  }

  const inputClass =
    'w-full border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-ash transition-colors focus:border-surf';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="max-w-xl">
      <div className="space-y-6">
        <div>
          <label htmlFor={nameId} className="block text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={`mt-2 ${inputClass}`}
            placeholder="Bisma Kho"
          />
          {errors.name ? (
            <p id={`${nameId}-error`} className="mt-2 text-sm text-deep-surf">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={emailId} className="block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={`mt-2 ${inputClass}`}
            placeholder="you@company.com"
          />
          {errors.email ? (
            <p id={`${emailId}-error`} className="mt-2 text-sm text-deep-surf">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={messageId} className="block text-sm font-semibold text-ink">
            Message
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={5}
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            className={`mt-2 resize-y ${inputClass}`}
            placeholder="What are you working with, and what do you want from it?"
          />
          {errors.message ? (
            <p id={`${messageId}-error`} className="mt-2 text-sm text-deep-surf">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-surf px-7 py-4 text-base font-semibold text-ink transition-colors hover:bg-deep-surf hover:text-paper disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-3.5"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      {/* Announced to screen readers without stealing focus. */}
      <p
        role="status"
        aria-live="polite"
        className={`mt-5 text-sm ${
          status === 'success' ? 'text-deep-surf' : 'text-graphite'
        }`}
      >
        {notice}
      </p>
    </form>
  );
}
