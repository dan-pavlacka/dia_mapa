'use client';
import Link from "next/link";
import ClientOnly from "../ClientOnly";
import Image from "next/image";
import { useState, useEffect } from "react";

const HeaderContent = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark') ||
                          document.documentElement.getAttribute('data-theme') === 'dark' ||
                          window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(isDark);
        };

        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme']
        });

        // Watch for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', checkTheme);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener('change', checkTheme);
        };
    }, []);

    return (
        <header className="gov-header">
            <div className="gov-header__divider">
                <div className="gov-header__content">
                    <gov-flex justify-content="space-between" align-items="center" responsive="false">
                        <Link href="/" className="gov-header__logo" aria-label="Zpět na úvodní stránku">
                            <gov-flex align-items="center" gap="s" responsive="false">
                                <Image 
                                    src={isDarkMode ? "/logo_dark_theme.svg" : "/logo.svg"} 
                                    alt="Logo" 
                                    width={322} 
                                    height={73} 
                                />
                            </gov-flex>
                        </Link>
                        <gov-flex className="gov-header__mobile" align-items="center" gap="s" responsive="false">
                            <gov-button color="primary" size="m" type="base" aria-label="Přihlásit se">
                                <gov-icon type="templates" name="person-fill" slot="icon-start" color="primary" size="m"></gov-icon>

                            </gov-button>
                            <gov-button color="primary" size="m" type="base" aria-label="Otevřít hlavní navigaci" className=" js-gov-header__navigation-trigger">
                                <gov-icon type="templates" name="list" slot="icon-start" color="primary" size="m"></gov-icon>

                            </gov-button>
                        </gov-flex>
                    </gov-flex>
                    <form role="search" id="search" className="gov-search gov-search--fixed-width">
                        <gov-form-control>
                            <gov-form-search size="m" color="neutral" aria-autocomplete="list" aria-haspopup="menu" aria-controls="suggestions" aria-expanded="true">
                                <gov-form-input slot="input" size="m" placeholder="Hledejte v názvu, obsahu..." aria-label="Vyhledávání v obsahu webu" input-type="search">
                                    <gov-icon type="templates" name="search" slot="icon-start"></gov-icon>
                                </gov-form-input>
                                <gov-button color="neutral" size="s" type="base" aria-label="Odstranit zadaný výraz" slot="button">
                                    <gov-icon type="templates" name="x" slot="icon-start"></gov-icon>

                                </gov-button>
                                <gov-button color="primary" size="s" type="solid" aria-label="Vyhledat zadaný výraz" native-type="submit" slot="button">
                                    <gov-icon type="templates" name="search" slot="icon-start"></gov-icon>

                                </gov-button>
                            </gov-form-search>
                        </gov-form-control>
                    </form>
                    <gov-flex className="gov-header__action" justify-content="space-between" align-items="center" gap="m">
                        <gov-button color="primary" size="m" type="solid" aria-label="Přihlášení do klientské zóny">
                            Přihlásit se

                        </gov-button>
                        {/* <gov-button color="primary" size="m" type="base" aria-label="Click to change language to English">
                            <gov-icon type="templates" name="flag" slot="icon-start"></gov-icon>
                            English

                        </gov-button> */}
                        <gov-theme-switch size="m" aria-label="Přepínač barevného schématu stránky"></gov-theme-switch>
                    </gov-flex>
                </div>
            </div>
            <div className="gov-header__navigation js-gov-header__navigation">
                <nav className="gov-navigation" aria-label="Hlavní navigace" id="main-navigation">
                    <ul>
                        <li className="gov-navigation--has-megamenu">
                            <gov-button type="base" color="primary" size="l" aria-expanded="false" aria-controls="megamenu0" aria-label="Úřad">
                                Úřad
                                <gov-icon slot="icon-end" type="templates" name="chevron-down" size="l"></gov-icon>
                            </gov-button>
                            <ul className="gov-mega-menu" id="megamenu0" hidden aria-hidden="true">
                                <li className="gov-mega-menu__heading">
                                    <Link href="#">
                                        <span>
                                            <gov-icon type="templates" name="briefcase" size="m"></gov-icon>
                                            Heading item
                                        </span>
                                    </Link>
                                    <ul>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li className="gov-mega-menu__more"><Link href="#">+ Další</Link></li>
                                    </ul>
                                </li>
                                <li className="gov-mega-menu__heading">
                                    <Link href="#">
                                        <span>
                                            <gov-icon type="templates" name="briefcase" size="m"></gov-icon>
                                            Heading item
                                        </span>
                                    </Link>
                                    <ul>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li className="gov-mega-menu__more"><Link href="#">+ Další</Link></li>
                                    </ul>
                                </li>
                                <li className="gov-mega-menu__heading">
                                    <Link href="#">
                                        <span>
                                            <gov-icon type="templates" name="briefcase" size="m"></gov-icon>
                                            Heading item
                                        </span>
                                    </Link>
                                    <ul>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                    </ul>
                                </li>
                                <li className="gov-mega-menu__heading">
                                    <Link href="#">
                                        <span>
                                            <gov-icon type="templates" name="briefcase" size="m"></gov-icon>
                                            Heading item
                                        </span>
                                    </Link>
                                    <ul>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li className="gov-mega-menu__more"><Link href="#">+ Další</Link></li>
                                    </ul>
                                </li>
                                <li className="gov-mega-menu__heading">
                                    <Link href="#">
                                        <span>
                                            <gov-icon type="templates" name="briefcase" size="m"></gov-icon>
                                            Heading item
                                        </span>
                                    </Link>
                                    <ul>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li className="gov-mega-menu__more"><Link href="#">+ Další</Link></li>
                                    </ul>
                                </li>
                                <li className="gov-mega-menu__heading">
                                    <Link href="#">
                                        <span>
                                            <gov-icon type="templates" name="briefcase" size="m"></gov-icon>
                                            Heading item
                                        </span>
                                    </Link>
                                    <ul>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                    </ul>
                                </li>
                                <li className="gov-mega-menu__heading">
                                    <Link href="#">
                                        <span>
                                            <gov-icon type="templates" name="briefcase" size="m"></gov-icon>
                                            Heading item
                                        </span>
                                    </Link>
                                    <ul>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                    </ul>
                                </li>
                                <li className="gov-mega-menu__heading">
                                    <Link href="#">
                                        <span>
                                            <gov-icon type="templates" name="briefcase" size="m"></gov-icon>
                                            Heading item
                                        </span>
                                    </Link>
                                    <ul>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                        <li><Link href="#">Menu item</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="#">Menu item</Link>
                        </li>
                        <li>
                            <Link href="#">Menu item</Link>
                        </li>
                        <li>
                            <Link href="#">Menu item</Link>
                        </li>
                        <li>
                            <gov-button type="base" color="primary" size="l" aria-expanded="false" aria-controls="subnav4" aria-label="Tisk a média">
                                Tisk a média
                                <gov-icon slot="icon-end" type="templates" name="chevron-down" size="l"></gov-icon>
                            </gov-button>
                            <ul className="gov-subnavigation" id="subnav4" hidden aria-hidden="true">
                                <li><Link href="#">Menu item</Link></li>
                                <li><Link href="#">Menu item</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link href="#">Kontakty</Link>
                        </li>
                        {/* <li className="gov-mobile-only">
                            <gov-button color="primary" size="l" type="base" aria-label="Click to change language to English">
                                English

                            </gov-button>
                        </li> */}
                        <li className="gov-navigation__item gov-mobile-only">
                            <gov-theme-switch size="m" display-label="true"></gov-theme-switch>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const Header = () => {
    return (
        <ClientOnly>
            <HeaderContent />
        </ClientOnly>
    );
};

export default Header;