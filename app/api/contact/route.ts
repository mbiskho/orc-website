import { NextResponse } from 'next/server';
import {
  validateContact,
  type ContactPayload,
  type ContactResponse,
} from '@/lib/content/contact';

/** Nothing here should be cached or prerendered. */
export const dynamic = 'force-dynamic';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Could not read that request.' },
      { status: 400 },
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { ok: false, message: 'Could not read that request.' },
      { status: 400 },
    );
  }

  const payload: Partial<ContactPayload> = {
    name: typeof body.name === 'string' ? body.name : undefined,
    email: typeof body.email === 'string' ? body.email : undefined,
    message: typeof body.message === 'string' ? body.message : undefined,
  };

  const errors = validateContact(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: 'Please check the fields below.', errors },
      { status: 400 },
    );
  }

  // ---------------------------------------------------------------------------
  // PLUG IN A REAL EMAIL PROVIDER HERE.
  //
  // At this point `payload` is validated and safe to forward. Swap the stub
  // below for a transactional email call, for example Resend:
  //
  //   import { Resend } from 'resend';
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: 'site@orcacast.com',
  //     to: 'contact@orcacast.com',
  //     replyTo: payload.email,
  //     subject: `New enquiry from ${payload.name}`,
  //     text: payload.message,
  //   });
  //
  // Postmark, SendGrid, and AWS SES all fit the same slot. Keep the API key in
  // an environment variable — it must never reach the client bundle.
  //
  // Wrap the call in try/catch and return a 502 with ok:false if it throws, so
  // the form can tell the visitor to email directly instead.
  // ---------------------------------------------------------------------------

  return NextResponse.json(
    { ok: true, message: 'Thanks — we will come back to you within one working day.' },
    { status: 200 },
  );
}
