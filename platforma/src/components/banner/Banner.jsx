'use client';
import React from 'react';

export default function BannerLarge({
  headline,
  description,
  buttonLabel,
  buttonHref = '#',
  bannerId = 'banner',
  imageJpg = '/assets/banner/image-l.jpg',
  imageWebp = '/assets/banner/image-l.webp',
  imageAvif = '/assets/banner/image-l.avif'
}) {
  return (
    <gov-banner size="l" background="waves" foreground="image" aria-labelledby={bannerId}>
      <h1 id={bannerId} slot="headline">{headline}</h1>
      <p>{description}</p>

      <gov-button
        color="secondary"
        size="l"
        type="solid"
        aria-label={buttonLabel}
        className="gov-button--mobile-expanded"
        href={buttonHref}
        slot="button"
      >
        {buttonLabel}
      </gov-button>

      <picture slot="image">
        <source srcSet={imageAvif} type="image/avif" />
        <source srcSet={imageWebp} type="image/webp" />
        <img src={imageJpg} alt="" width="537" height="360" />
      </picture>
    </gov-banner>
  );
}
