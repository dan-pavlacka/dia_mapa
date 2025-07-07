'use client';

export default function SectionHeading({ id, heading }) {
  return (
    <gov-flex direction="column" gap="m">
      <gov-flex
        gap="s"
        justify-content="space-between"
        align-items="center"
        className="gov-section-heading"
        responsive="false"
      >
        <h2 id={id} className="sectionHeadingTitle">{heading}</h2>
        <gov-flex gap="s" />
      </gov-flex>
    </gov-flex>
  );
}
