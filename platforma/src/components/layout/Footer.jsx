'use client';

import React, { useEffect } from 'react';
import { blockRapidClicks, smoothScrollTo } from '@gov-design-system-ce/utils';

import ClientOnly from "../ClientOnly";

const FooterContent = () => {
  useEffect(() => {
    const buttonUpEl = document.querySelector('.js-gov-footer__up');
    if (buttonUpEl) {
      const FooterButtonUp = function(rootElement) {
        this.rootElement = rootElement;

        this.registerListeners = () => {
          this.rootElement.addEventListener('gov-click', blockRapidClicks(() => this.scrollToTop()));
          this.rootElement.addEventListener('click', blockRapidClicks(() => this.scrollToTop()));
        };

        this.scrollToTop = () => {
          smoothScrollTo(0);
        };

        this.registerListeners();
      };

      new FooterButtonUp(buttonUpEl);
    }
  }, []);

  return (
    <footer className="gov-footer">
      
      <gov-flex
        className="gov-footer__content"
        direction="column"
        justify-content="space-between"
        gap="2xl"
      >

        {/* Hlavní sekce */}
        <gov-flex responsive="false" style={{ width: '100%' }}>
          <ul className="gov-footer__main gov-list--plain">
            <li>
              <gov-flex direction="column" gap="m" className="gov-footer__description">
              <img src="/assets/icons/templates/logo_dia.svg" alt="Digitální a informační agentura" width="135" height="60" />
                <p>
                Prioritou Digitální a informační agentury je snadná a přehledná komunikace občanů se státní správou. Nástroje digitalizace, které DIA občanům přináší, významně zjednodušují život občanům i úředníkům. Cílem je oprostit komunikaci s úřady od byrokratických povinností a čekání ve frontách.
                </p>
              </gov-flex>
            </li>

            <li>
              <nav aria-labelledby="nav1">
                <h5 id="nav1">Informace</h5>
                <ul className="gov-list--plain">
                  <li><gov-link href="https://www.dia.gov.cz/cs/zasady-zpracovani-osobnich-udaju" size="s">Zásady zpracování osobních údajů</gov-link></li>
                  <li><gov-link href="https://www.dia.gov.cz/cs/prohlaseni-o-pristupnosti" size="s">Prohlášení o přístupnosti</gov-link></li>

                </ul>
              </nav>
            </li>

            <li>
              <nav aria-labelledby="nav2">
                <h5 id="nav2">Odkazy</h5>
                <ul className="gov-list--plain">
                  <li><gov-link href="https://www.dia.gov.cz/cs/nase-cinnosti/na-cem-pracujeme/kompetencni-centra" size="s">Kompetenční centra DIA</gov-link></li>
                  <li><gov-link href="https://www.dia.gov.cz/cs/o-nas" size="s">Digitální a informační agentura</gov-link></li>
                  <li><gov-link href="https://www.dia.gov.cz/cs/legislativa" size="s">Legislativa</gov-link></li>
                  <li><gov-link href="https://www.dia.gov.cz/cs/uredni-deska" size="s">Úřední deska</gov-link></li>

                </ul>
              </nav>
            </li>

            <li>
              <h5>Kontakty</h5>
              <gov-flex direction="column" gap="l">
                <address>
                  <ul className="gov-footer__address gov-list--plain">

                    <li>
                      <gov-link href="mailto:kc@dia.gov.cz" size="s">
                        <gov-icon type="templates" name="envelope" slot="icon-start" aria-label="e-mail"></gov-icon>
                        kc@dia.gov.cz
                      </gov-link>
                    </li>
                    <li>
                      <gov-link href="mailto:posta@dia.gov.cz" size="s">
                        <gov-icon type="templates" name="envelope" slot="icon-start" aria-label="e-mail"></gov-icon>
                        posta@dia.gov.cz
                      </gov-link>
                    </li>
                  </ul>
                </address>

                <nav aria-label="Odkazy na sociální sítě">
                  <ul className="gov-social gov-list--plain">
                    <li>
                      <gov-button color="primary" size="s" type="base" aria-label="Facebook" target="_blank" rel="noreferrer nofollow" href="#" title="Facebooku">
                        <gov-icon type="templates" name="facebook" slot="icon-start" size="s"></gov-icon>
                      </gov-button>
                    </li>

                    <li>
                      <gov-button color="primary" size="s" type="base" aria-label="Youtube" target="_blank" rel="noreferrer nofollow" href="#" title="Youtube">
                        <gov-icon type="templates" name="youtube" slot="icon-start" size="s"></gov-icon>
                      </gov-button>
                    </li>

                    <li>
                      <gov-button color="primary" size="s" type="base" aria-label="Twitter X" target="_blank" rel="noreferrer nofollow" href="#" title="Twitter X">
                        <gov-icon type="templates" name="twitter-x" slot="icon-start" size="s"></gov-icon>
                      </gov-button>
                    </li>
                  </ul>
                </nav>
              </gov-flex>
            </li>
          </ul>

          {/* Back to top button */}
          <gov-button
            color="primary"
            size="m"
            type="base"
            aria-label="Vrátit se na začátek stránky"
            className="gov-footer__up js-gov-footer__up"
          >
            <gov-icon type="templates" name="arrow-up" slot="icon-start"></gov-icon>
          </gov-button>
        </gov-flex>

        {/* Loga */}
        <gov-grid gap="l" className="gov-footer__logos-group">
          <gov-grid-item col-span="12" col-span-lg="4">
            <section>
              <h5 className="loga">Portál kompetenčních center vám přináší</h5>
              <ul className="gov-logos gov-list--plain">
                <li> <img src="/assets/icons/templates/logo_eu.svg" alt="Financováno EU" width="118" height="40" /> </li>
                <li> <img src="/assets/icons/templates/logo_npo.svg" alt="Financováno EU" width="100" height="35" /> </li>
                <li> <img src="/assets/icons/templates/logo_dia.svg" alt="Financováno EU" width="80" height="35" /> </li>
              </ul>
            </section>
          </gov-grid-item>
          <gov-grid-item col-span="12" col-span-lg="8">
            <section>
                <ul className="gov-logos gov-list--plain">
                    <li><p className="thin">Vytvořeno v rámci projektu ROPIM – Reforma pro optimalizaci, implementaci a metodické řízení digitalizovaných služeb vč. jejich kapacitního plánování a komunikaci informací klientům veřejné správy, financovaného Evropskou unií NextGeneration.</p></li>
                    <li><p className="thin">Reg. č.: CZ.31.5.0/0.0/0.0/23_106/0008503</p></li>
                </ul>
            </section>
          </gov-grid-item>
        </gov-grid>

        {/* Právní odkazy a copyright */}
        <gov-flex direction="column" gap="m-nudge">
          
       
          <gov-flex className="gov-footer-copy" justify-content="space-between" gap="m">
            <p className="copy">
              2025 &copy; Digitální a informační agentura &bull; Informace jsou poskytovány v souladu se zákonem č. 106/1999 Sb., o svobodném přístupu k informacím.
            </p>
            <div>
                <div className="gov-footer__version" style={{ color: 'var(--color-neutral-0)' }}>
                    <span>Využit Design system 4.2</span>
                </div>
            </div>
          </gov-flex>
        </gov-flex>

      </gov-flex>
    </footer>
  );
}

const Footer = () => {
  return (
      <ClientOnly>
          <FooterContent />
      </ClientOnly>
  );
};

export default Footer;
