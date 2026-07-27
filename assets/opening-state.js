// opening-state.js — Yhtenäistää kaikkien CTA-painikkeiden tekstin ja
// kohdeosoitteen. Painikkeet tunnistetaan [data-cta="booking"] -attribuutilla.
//
// Studio on auki-tilassa: kaikki painikkeet ohjaavat Timman ajanvaraukseen
// ja näyttävät tekstin "Ajanvaraus".

window.STUDIOMAHLA_TIMMA_URL = 'https://varaa.timma.fi/studiomahla';

(function () {
  'use strict';

  var timmaUrl = (window.STUDIOMAHLA_TIMMA_URL || '').trim();
  var ctaLinks = document.querySelectorAll('[data-cta="booking"]');

  ctaLinks.forEach(function (a) {
    if (timmaUrl) {
      a.href = timmaUrl;
      a.target = '_blank';
      a.rel = 'noopener';
    }
    a.textContent = 'Ajanvaraus';
    if (a.hasAttribute('aria-label')) {
      a.setAttribute('aria-label', 'Varaa aika Timman kautta');
    }
  });
})();
