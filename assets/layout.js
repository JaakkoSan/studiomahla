// layout.js — Injektoi jaettu nav ja footer HTML-sivuille.
//
// Sivuilla on kaksi slot-elementtiä joissa injektointi tapahtuu:
//   <div id="header-slot"></div>   → korvataan bannerilla + navigaatiolla
//   <div id="footer-slot"></div>   → korvataan footerilla
//
// Header + footer HTML on tässä tiedostossa merkkijonoina — EI fetch-kutsuja
// (ei ylimääräisiä HTTP-pyyntöjä, ei riippuvuutta lataantumisjärjestyksestä).
// Injektointi tapahtuu synchronously kun tämä skripti ladataan (defer).
//
// KUN LISÄÄT UUDEN SIVUN JOKA ON BLOGIARTIKKELI:
//   Lisää tiedostonimi BLOG_PAGES-listaan alla, niin Blogi-linkin
//   is-current-tila aktivoituu automaattisesti sillä sivulla.
//
// KUN MUUTAT NAVIGAATIOTA TAI FOOTERIA:
//   Muuta HEADER_HTML tai FOOTER_HTML alla. Muutos näkyy kaikilla sivuilla
//   ilman että sivukohtaisia HTML-tiedostoja tarvitsee koskea.
(function () {
  'use strict';

  var HEADER_HTML =
    '<header class="nav" role="banner">' +
      '<div class="nav__inner">' +
        '<a href="index.html" class="brand" aria-label="Mahlamäen Kauneusstudio, etusivu">' +
          '<span class="brand__logo" aria-hidden="true">' +
            '<svg viewBox="150 80 200 200" xmlns="http://www.w3.org/2000/svg">' +
              '<path fill="none" stroke="currentColor" stroke-width="10" stroke-linejoin="miter" stroke-miterlimit="4" d="M 180 200 L 180 100 L 250 160 L 320 100 L 320 200"/>' +
              '<path fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round" d="M 250 160 C 220 190, 220 230, 250 250 C 280 230, 280 190, 250 160 Z"/>' +
              '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="160" x2="250" y2="250"/>' +
              '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="205" x2="235" y2="190"/>' +
              '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="205" x2="265" y2="190"/>' +
              '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="225" x2="238" y2="215"/>' +
              '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="225" x2="262" y2="215"/>' +
            '</svg>' +
          '</span>' +
          '<span class="brand__name">Mahlamäen<span>Kauneusstudio</span></span>' +
        '</a>' +
        '<nav class="nav__right" aria-label="Päänavigaatio">' +
          '<a href="proxn-kasvohoito.html" class="nav__link">ProXN</a>' +
          '<a href="hinnasto.html" class="nav__link">Hinnasto</a>' +
          '<a href="blogi.html" class="nav__link">Blogi</a>' +
          '<a href="https://varaa.timma.fi/studiomahla" target="_blank" rel="noopener" data-cta="booking" class="btn btn--small" aria-label="Varaa aika Timman kautta">Ajanvaraus</a>' +
        '</nav>' +
      '</div>' +
    '</header>';

  var FOOTER_HTML =
    '<footer class="footer" role="contentinfo">' +
      '<div class="footer__inner">' +
        '<div class="footer__cols">' +
          '<div class="footer__brand">' +
            '<span class="brand__logo" aria-hidden="true">' +
              '<svg viewBox="150 80 200 200" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill="none" stroke="currentColor" stroke-width="10" stroke-linejoin="miter" stroke-miterlimit="4" d="M 180 200 L 180 100 L 250 160 L 320 100 L 320 200"/>' +
                '<path fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round" d="M 250 160 C 220 190, 220 230, 250 250 C 280 230, 280 190, 250 160 Z"/>' +
                '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="160" x2="250" y2="250"/>' +
                '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="205" x2="235" y2="190"/>' +
                '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="205" x2="265" y2="190"/>' +
                '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="225" x2="238" y2="215"/>' +
                '<line stroke="currentColor" stroke-width="4" stroke-linecap="round" x1="250" y1="225" x2="262" y2="215"/>' +
              '</svg>' +
            '</span>' +
            '<span class="brand__name">Mahlamäen<span>Kauneusstudio</span></span>' +
          '</div>' +
          '<div class="footer__cta">' +
            '<a href="https://varaa.timma.fi/studiomahla" target="_blank" rel="noopener" data-cta="booking" class="btn btn--outline" aria-label="Varaa aika Timman kautta">Ajanvaraus</a>' +
            '<div class="footer__hours">' +
              '<p class="footer__hours-label">Aukioloajat</p>' +
              '<p class="footer__hours-times">Arkisin 14&ndash;20<br>Viikonloppuisin 10&ndash;20</p>' +
            '</div>' +
          '</div>' +
          '<div class="footer__contact">' +
            '<a href="mailto:asiakaspalvelu@studiomahla.fi">asiakaspalvelu@studiomahla.fi</a><br>' +
            '<a href="tel:+358503671683">050 367 1683</a><br>' +
            'Mahlamäentie 14, 48300 Kotka' +
            '<div class="footer__social">' +
              '<a href="https://www.instagram.com/studiomahla" target="_blank" rel="me noopener">Instagram</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a href="https://www.facebook.com/studiomahla" target="_blank" rel="me noopener">Facebook</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer__bottom">' +
          '© 2026 Guild Lounge Oy <span>|</span> Y-tunnus 3578202-2 <span>|</span> <a href="privacy.html">Tietosuojaseloste</a>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var BLOG_PAGES = {
    'blogi.html': 1,
    'mikroneulaus-opas.html': 1,
    'mikroneulaus-sarjahoito.html': 1,
    'mikroneulaus-sopiiko-minulle.html': 1,
    'mikroneulaus-talvella.html': 1,
    'mikroneulauksen-jalkihoito.html': 1,
    'mikroneularulla-vai-kliininen-mikroneulaus.html': 1,
    'milloin-aloittaa-mikroneulaus.html': 1,
    'mita-ensikaynnilla-tapahtuu.html': 1,
    'mita-on-kliininen-mikroneulaus.html': 1,
    'mita-tutkimus-sanoo-mikroneulauksesta.html': 1
  };

  function getPageName() {
    var path = window.location.pathname.replace(/\/+$/, '');
    var last = path.split('/').pop();
    if (!last) return 'index.html';
    // Salli sekä "blogi" että "blogi.html"
    if (last.indexOf('.') === -1) return last + '.html';
    return last;
  }

  function inject(slotId, html) {
    var slot = document.getElementById(slotId);
    if (!slot) return false;
    slot.outerHTML = html;
    return true;
  }

  function postProcessHeader() {
    var page = getPageName();

    // Brand-linkki: etusivulla ankkuri #hero, muualla index.html
    var brand = document.querySelector('a.brand');
    if (brand && (page === 'index.html' || page === '')) {
      brand.setAttribute('href', '#hero');
    }

    // Blogi-linkin is-current-tila blogiartikkelisivuilla
    if (BLOG_PAGES[page]) {
      var blogLink = document.querySelector('a.nav__link[href="blogi.html"]');
      if (blogLink) blogLink.classList.add('is-current');
    }

    // Hinnasto-linkin is-current-tila hinnastosivulla
    if (page === 'hinnasto.html') {
      var hintaLink = document.querySelector('a.nav__link[href="hinnasto.html"]');
      if (hintaLink) hintaLink.classList.add('is-current');
    }

    // ProXN-linkin is-current-tila ProXN-sivulla
    if (page === 'proxn-kasvohoito.html') {
      var proxnLink = document.querySelector('a.nav__link[href="proxn-kasvohoito.html"]');
      if (proxnLink) proxnLink.classList.add('is-current');
    }
  }

  // Injektoi molemmat synchronously
  inject('header-slot', HEADER_HTML);
  inject('footer-slot', FOOTER_HTML);
  postProcessHeader();
})();
