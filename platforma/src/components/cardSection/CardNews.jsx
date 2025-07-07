'use client';

export default function CardNews({ id, title, text, date }) {
    console.log('Card date:', date);
    return (
      <gov-grid-item col-span="12" col-span-lg="4">
        <gov-card aria-labelledby={id}>
          <gov-flex gap="s" direction="column">
            <header>
              <h3 id={id} className="gov-card__headline homepageCardTitle">{title}</h3>
            </header>
            <p>{text}</p>
  
            <div className="gov-text-content">
              <gov-flex gap="s-nudge" align-items="center" responsive="false">
                <gov-icon
                  type="complex"
                  name="calendar-event"
                  size="m"
                  color="primary"
                  alt="Datum zveřejnění"
                  aria-label="Datum zveřejnění"
                />
                <span className="gov-text--muted">Zveřejněno: {date}</span>

              </gov-flex>
            </div>
          </gov-flex>
        </gov-card>
      </gov-grid-item>
    );
  }
  