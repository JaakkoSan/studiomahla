// opening-state.js — Hallinnoi opening-banneria ja koko sivuston CTA-painikkeita.
//
// =====================================================================
// KAKSI TILAA:
//   1) POSTPONED — banneri kertoo vesivahingosta tai muusta viivästyksestä,
//      CTA-painikkeet ohjaavat Timman jonotuslistalle.
//   2) OPEN — banneri kertoo että varauskalenteri on auki (staattinen
//      teksti tulee HEADER_HTML:stä layout.js:ssä), CTA-painikkeet
//      näyttävät "Ajanvaraus" ja ohjaavat Timman ajanvaraukseen.
//
// KUN STUDIO SIIRTYY TÄYSIN NORMAALIIN AJOON (esim. bannerin voi poistaa):
//   1. Voit poistaa opening-banner-lohkon layout.js HEADER_HTML:stä
//   2. Voit poistaa tämän tiedoston kokonaan tai jättää sen paikoilleen
// =====================================================================
window.STUDIOMAHLA_POSTPONED = false;
window.STUDIOMAHLA_TIMMA_URL = 'https://varaa.timma.fi/studiomahla';

(function () {
  'use strict';

  var postponed = !!window.STUDIOMAHLA_POSTPONED;
  var timmaUrl  = (window.STUDIOMAHLA_TIMMA_URL || '').trim();

  /* ----- 1) Opening banner ----- */
  // OPEN-tilassa banneri säilyy sellaisenaan (layout.js HEADER_HTML on
  // päivitetty vastaamaan auki-tilaa). POSTPONED-tilassa banneri
  // korvataan vanhalla vesivahinko-viestillä.
  var banner = document.getElementById('opening-banner');
  if (banner && postponed) {
    banner.innerHTML =
      'Heinäkuun rankkasateet aiheuttivat vesivahingon studiotilaan, ja avajaisia joudutaan siirtämään remontin ajaksi. Ilmoitamme uuden avajaispäivän mahdollisimman pian, ' +
      '<a href="' + timmaUrl + '" target="_blank" rel="noopener" aria-label="Liity jonotuslistalle niin saat tiedon kun studio avautuu">' +
        'liity jonotuslistalle niin saat tiedon ensimmäisenä' +
      '</a>.';
  }

  /* ----- 2) CTA-painikkeet (kaikki [data-cta="booking"] linkit) ----- */
  var ctaLinks = document.querySelectorAll('[data-cta="booking"]');
  ctaLinks.forEach(function (a) {
    if (timmaUrl) {
      a.href = timmaUrl;
      a.target = '_blank';
      a.rel = 'noopener';
    }
    a.textContent = postponed ? 'Liity jonotuslistalle' : 'Ajanvaraus';
    if (a.hasAttribute('aria-label')) {
      a.setAttribute('aria-label',
        postponed ? 'Liity jonotuslistalle Timmassa' : 'Varaa aika Timman kautta');
    }
  });
})();
