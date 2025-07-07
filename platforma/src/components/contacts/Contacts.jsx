'use client';

export default function Contacts({ ovm, staticData }) {
  const data = staticData || ovm;
  if (!data) return null;

  // Použij vlastní popisky pokud jsou předané, jinak výchozí
  const osobaVCeleLabel = staticData?.labels?.osoba_v_cele || 'Osoba v čele';
  const zmocnenecLabel = staticData?.labels?.digi_zmocnenec || 'Digitální zmocněnec';

  return (
    <section aria-labelledby="contacts-heading">
      <gov-flex direction="column" gap="l">
        <gov-flex direction="column" gap="m">
          <gov-flex
            gap="s"
            justify-content="space-between"
            align-items="center"
            class="gov-section-heading"
            responsive="false"
          >
            <h2 id="contacts-heading">Kontakty</h2>
          </gov-flex>
        </gov-flex>

        <gov-grid gap="l" class="gov-card-grid">
          {/* Vedoucí osoba */}
          <gov-grid-item col-span="12" col-span-md="6" col-span-xl="3">
            <gov-card>
              <gov-flex gap="s" direction="column">
                <p className="gov-text--body-s gov-text--muted">{osobaVCeleLabel}</p>
                <h3 className="gov-card__headline">{data.osoba_v_cele}</h3>
              </gov-flex>
            </gov-card>
          </gov-grid-item>

          {/* Digitální zmocněnec */}
          <gov-grid-item col-span="12" col-span-md="6" col-span-xl="3">
            <gov-card>
              <gov-flex gap="s" direction="column">
                <p className="gov-text--body-s gov-text--muted">{zmocnenecLabel}</p>
                <h3 className="gov-card__headline">{data.digi_zmocnenec}</h3>
                <p>{data.digi_zmocnenec_funkce}</p>
                {data.digi_zmocnenec_email && (
                  <ul className="gov-contact-links gov-list--plain">
                    <li>
                      <gov-flex gap="s-nudge" align-items="center" responsive="false">
                        <gov-icon
                          type="complex"
                          name="envelope"
                          color="primary"
                          size="m"
                          alt="e-mail:"
                          aria-label="e-mail"
                        ></gov-icon>
                        <a href={`mailto:${data.digi_zmocnenec_email}`}>
                          {data.digi_zmocnenec_email}
                        </a>
                      </gov-flex>
                    </li>
                  </ul>
                )}
              </gov-flex>
            </gov-card>
          </gov-grid-item>

          {/* IČO a datová schránka */}
          <gov-grid-item col-span="12" col-span-md="6" col-span-xl="3">
            <gov-card>
              <gov-flex gap="s" direction="column">
                <h3 className="gov-card__headline">Datová schránka</h3>
                <p>{data.datova_schranka}</p>
                <h3 className="gov-card__headline">IČO</h3>
                <p>{data.identifikator}</p>
              </gov-flex>
            </gov-card>
          </gov-grid-item>

          {/* Adresa */}
          <gov-grid-item col-span="12" col-span-md="6" col-span-xl="3">
            <gov-card>
              <gov-flex gap="s" direction="column">
                <h3 className="gov-card__headline">Adresa</h3>
                <p>{data.nazev}</p>
                <p>{data.adresa_ulice}</p>
                <p>{data.adresa_mesto_psc}</p>
              </gov-flex>
            </gov-card>
          </gov-grid-item>
        </gov-grid>
      </gov-flex>
    </section>
  );
}
