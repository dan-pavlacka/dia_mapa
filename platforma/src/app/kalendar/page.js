'use client';

import Link from 'next/link';
import ClientOnly from '@/components/ClientOnly';

export default function CalendarPage() {
  return (
    <ClientOnly>
      <gov-container>
        <div className="react-main-center">
          <div className="headerOVM">
            <gov-breadcrumbs accessible-label="Seznam úrovní">
              <ul>
                <li>
                  <Link href="/" style={{ color: 'var(--green-primary)' }}>
                    Domů
                  </Link>
                </li>
                <li>
                  <gov-icon type="components" name="chevron-right"></gov-icon>
                  <strong>Plánované události ve veřejné správě</strong>
                </li>
              </ul>
            </gov-breadcrumbs>
          </div>

          {/* Místo pro další obsah */}
          <div className="mainContent mainContentOVM">
            <h1>Kalendář událostí</h1>
            <p>Tato stránka bude zobrazovat události související s digitalizací veřejné správy.</p>
          </div>
        </div>
      </gov-container>
    </ClientOnly>
  );
}
