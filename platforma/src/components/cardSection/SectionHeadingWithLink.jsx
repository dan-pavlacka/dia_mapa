'use client';
import Link from 'next/link';

export default function SectionHeadingWithLink({ id, heading, linkHref, linkLabel }) {
  return (
    <gov-flex
      gap="s"
      justify-content="space-between"
      align-items="center"
      className="gov-section-heading"
      responsive="false"
    >
      <h2 id={id} className="sectionHeadingTitle">{heading}</h2>
      <gov-flex gap="s" align-items="center">
        <Link href={linkHref} className="gov-link gov-link--with-chevron sectionHeadingLink">
          {linkLabel}
        </Link>
        <gov-icon
          type="components"
          name="chevron-right"
          size="m"
          color="primary"
        />
      </gov-flex>
    </gov-flex>
  );
}

