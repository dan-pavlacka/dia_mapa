'use client';

import Link from 'next/link';

export default function LoginHint({ textBeforeLink }) {
  return (
    <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-secondary)' }}>
      {textBeforeLink}{' '}
      <Link href="/prihlaseni" className="gov-link">
        přihlaste
      </Link>
      .
    </p>
  );
}
