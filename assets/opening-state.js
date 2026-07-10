// opening-state.js — Hallinnoi opening-banneria ja koko sivuston CTA-painikkeita.
//
// =====================================================================
// KAKSI TILAA:
//   1) POSTPONED (nyt) — banneri kertoo vesivahingosta,
//      CTA-painikkeet ohjaavat Timman jonotuslistalle.
//   2) OPEN — banneri piilotetaan, CTA-painikkeet näyttävät "Ajanvaraus"
//      ja ohjaavat Timman normaaliin ajanvaraukseen.
//
// HTML-FALLBACK on synkronoitu POSTPONED-tilaan, joten JS:n tekemät
// muutokset ovat idempotentteja postponed-tilassa. Kun JS on pois päältä,
// käyttäjä näkee edelleen oikean postponed-viestin ja jonotuslista-linkin.
//
// KUN STUDIO AVAA:
//   1. Aseta STUDIOMAHLA_POSTPONED = false
//   2. Sulje "Jonotuslista"-palvelu Timmasta ja avaa varsinaiset palvelut
//   3. Ilmoita jonotuslistan jäsenille (Timman kautta)
//   4. Pushaa GitHubiin
// =====================================================================
window.STUDIOMAHLA_POSTPONED = true;
window.STUDIOMAHLA_TIMMA_URL = 'https://varaa.timma.fi/studiomahla';

(function () {
  'use strict';

  var postponed = !!window.STUDIOMAHLA_POSTPONED;
  var timmaUrl  = (window.STUDIOMAHLA_TIMMA_URL || '').trim();

  /* ----- 1) Opening banner ----- */
  var banner = document.getElementById('opening-banner');
  if (banner) {
    if (postponed) {
      // Synkronoi banneri kanoniseen postponed-tekstiin (idempotentti).
      banner.innerHTML =
        'Kesäkuun rankkasateet aiheuttivat vesivahingon studiotilaan, ja avajaisia joudutaan siirtämään remontin ajaksi. Ilmoitamme uuden avajaispäivän mahdollisimman pian — ' +
        '<a href="' + timmaUrl + '" target="_blank" rel="noopener" aria-label="Liity jonotuslistalle niin saat tiedon kun studio avautuu">' +
          'liity jonotuslistalle niin saat tiedon ensimmäisenä' +
        '</a>.';
    } else {
      // OPEN-tila: piilota banneri
      banner.hidden = true;
      banner.style.display = 'none';
      document.body.classList.add('banner-hidden');
    }
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
