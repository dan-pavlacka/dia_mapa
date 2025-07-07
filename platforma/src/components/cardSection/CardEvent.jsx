'use client';

export default function CardEvent({ id, title, details = [], text }) {
  return (
    <gov-grid-item col-span="12" col-span-lg="4">
      <gov-card aria-labelledby={id}>
        <gov-flex gap="s" direction="column">
          <header>
            <h3 id={id} className="gov-card__headline homepageCardTitle">{title}</h3>
          </header>

          <ul className="gov-contact-links gov-list--plain">
            {details.map((item, idx) => (
              <li key={idx}>
                <gov-flex
                  gap="s-nudge"
                  align-items="center"
                  responsive="false"
                >
                  <gov-icon
                    type={item.type || 'templates'}
                    name={item.icon}
                    color="primary"
                    size="m"
                    alt={item.label}
                    aria-label={item.label}
                  />
                  <span className="gov-text--muted">
                    {item.value}
                  </span>
                </gov-flex>
              </li>
            ))}
          </ul>

          {text && <p>{text}</p>}
        </gov-flex>
      </gov-card>
    </gov-grid-item>
  );
}
