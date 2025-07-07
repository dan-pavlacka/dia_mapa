'use client';

export default function BannerSmallIcon({ headline, description, buttonLabel, buttonHref, individualClass}) {
  return (
    <gov-banner
      size="s"
      background="waves"
      foreground="icon"
      aria-labelledby="small-banner"
      className={`gov-mb-l ${individualClass}`}
    >
      <h3 id="small-banner" slot="headline">{headline}</h3>
      <p>{description}</p>

      <gov-button
        color="secondary"
        size="m"
        type="solid"
        aria-label={buttonLabel}
        className="gov-button--mobile-expanded"
        href={buttonHref}
        slot="button"
      >
        {buttonLabel}
      </gov-button>


    </gov-banner>
  );
}
