'use client';

// components/Card.jsx
export default function Card({ id, icon, title, description, buttonLabel, buttonHref }) {
    return (
      <gov-grid-item col-span="12" col-span-lg="6">
        <gov-card direction="horizontal" href={buttonHref} aria-labelledby={id}>
          <gov-icon type="complex" name={icon} slot="icon" />
          <gov-flex gap="s" direction="column">
            <header>
              <h3 id={id} className="gov-card__headline homepageCardTitle">{title}</h3>
            </header>
            <p className="homepageCardDescription">{description}</p>
            <gov-button
              size="m"
              type="outlined"
              color="primary"
              href={buttonHref}
              aria-label={`Přejít na ${title}`}
            >
              {buttonLabel}
            </gov-button>
          </gov-flex>
        </gov-card>
      </gov-grid-item>
    );
  }