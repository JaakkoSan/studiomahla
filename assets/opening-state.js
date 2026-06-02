// opening-state.js — Hallinnoi opening-banneria, kauppa.html:n ennakkovaraustilaa
// sekä koko sivuston "Ennakkovaraus"-painikkeita päivämäärän mukaan.
//
// =====================================================================
// TIMMA-AKTIVOINTI:
//   1. Avaa Timma-kalenteri Timman puolella (manuaalinen toimenpide)
//   2. Liitä Timma-URL alla olevaan riviin
//   3. Pushaa GitHubiin
//
// Voit asettaa TIMMA_URLin milloin tahansa — myös ennen 1.7. — koska
// aktivoituminen on aikaportin takana: linkit muuttuvat automaattisesti
// vasta 1.7.2026 00:00 (Europe/Helsinki) lähtien. Ennen sitä sivusto
// pyörii normaalissa "ennakkovaraus voimassa" -tilassa.
// =====================================================================
window.STUDIOMAHLA_TIMMA_URL = 'https://varaa.timma.fi/studiomahla';
// Aikaportti aktivoi tämän automaattisesti 1.7.2026 00:00 — ennen sitä tyhjenee.

(function () {
  'use strict';

  // Päivämäärät Helsingin aikavyöhykkeellä (kesäaika +03:00).
  var PREBOOK_END = new Date('2026-07-01T00:00:00+03:00'); // ennakkomyynti päättyy
  var OPENING    = new Date('2026-08-03T00:00:00+03:00');  // studio avautuu

  var now = new Date();
  var afterPrebookEnd = now >= PREBOOK_END;
  var afterOpening    = now >= OPENING;
  var timmaUrl        = (window.STUDIOMAHLA_TIMMA_URL || '').trim();
  // Timma aktivoituu vasta 1.7.2026 (PREBOOK_END) — vaikka URL olisi
  // asetettu etukäteen, linkit eivät muutu ennen tätä päivää.
  var timmaActive     = timmaUrl.length > 0 && afterPrebookEnd;

  /* ----- 1) Opening banner ----- */
  var banner = document.getElementById('opening-banner');
  if (banner) {
    if (afterOpening) {
      // Studio auki — piilota banneri kokonaan
      banner.hidden = true;
      banner.style.display = 'none';
      document.body.classList.add('banner-hidden');
    } else if (afterPrebookEnd) {
      if (timmaActive) {
        banner.innerHTML =
          'Hoitola avataan 3.8.2026 — ' +
          '<a href="' + timmaUrl + '" target="_blank" rel="noopener" aria-label="Varaa aika Timman kautta">' +
            'ajanvaraus Timman kautta' +
          '</a>';
      } else {
        banner.innerHTML =
          'Hoitola avataan 3.8.2026 — ' +
          '<a href="kauppa.html" aria-label="Lue lisää avajaisista">kalenteri avautuu pian</a>';
      }
    }
    // Muulloin: banneri näyttää oletustekstin joka tulee HTML:stä
  }

  /* ----- 2) Korvaa "Ennakkovaraus"-painikkeet Timma-linkeillä jos aktiivinen ----- */
  // Kohdistetaan painikkeisiin joiden href="kauppa.html" (ei pidä koskea
  // ehdot.html:n sisäisiin linkkeihin tekstissä, joten tarkennetaan luokalla).
  if (timmaActive) {
    var ctaLinks = document.querySelectorAll('a[href="kauppa.html"]');
    ctaLinks.forEach(function (a) {
      // Onko tämä linkki nappi vai sisältötekstin keskellä oleva linkki?
      // Korvataan vain napit (.btn-luokka) ja navigaatiolinkit (.nav__link).
      var isButton = a.classList.contains('btn') || a.classList.contains('nav__link');
      if (!isButton) return;
      a.href = timmaUrl;
      a.target = '_blank';
      a.rel = 'noopener';
      var txt = (a.textContent || '').trim();
      // Säilytä label-painikkeessa ('Ennakkovaraus' / 'Varaa ennakkoon' jne.)
      // mutta vaihda Timma-vastineeksi
      var lower = txt.toLowerCase();
      if (lower === 'ennakkovaraus') {
        a.textContent = 'Ajanvaraus';
      } else if (lower === 'varaa ennakkoon') {
        a.textContent = 'Ajanvaraus';
      } else if (lower.indexOf('ennakkovaraus') !== -1) {
        a.textContent = a.textContent.replace(/ennakkovaraus/gi, 'Ajanvaraus');
      }
      // aria-label myös
      var aria = a.getAttribute('aria-label');
      if (aria) {
        a.setAttribute('aria-label', 'Varaa aika Timman kautta');
      }
    });
  }

  /* ----- 3) kauppa.html: sulje ennakkovaraus 1.7. alkaen ----- */
  var prebookFormWrap = document.getElementById('prebookFormWrap');
  if (prebookFormWrap && afterPrebookEnd) {
    var msg;
    if (timmaActive) {
      msg =
        '<h2 class="prebook-card__title">Ajanvaraus on auki Timmassa</h2>' +
        '<p class="prebook-card__desc">' +
          'Mahlamäen kauneusstudion ajanvaraus on auki Timman kautta. ' +
          'Klikkaa alla olevaa painiketta varataksesi ajan suoraan.' +
        '</p>' +
        '<div style="text-align:center;margin-top:24px;">' +
          '<a href="' + timmaUrl + '" target="_blank" rel="noopener" class="btn btn--large" ' +
            'style="text-decoration:none;display:inline-flex;">' +
            'Ajanvaraus Timmassa →' +
          '</a>' +
        '</div>' +
        '<p style="font-size:14px;color:var(--text-mid);margin-top:24px;text-align:center;">' +
          'Tai ota yhteyttä: ' +
          '<a href="mailto:asiakaspalvelu@studiomahla.fi" style="color:var(--pink);text-decoration:underline;">' +
            'asiakaspalvelu@studiomahla.fi' +
          '</a>' +
        '</p>';
    } else if (afterOpening) {
      msg =
        '<h2 class="prebook-card__title">Ennakkovaraus on päättynyt</h2>' +
        '<p class="prebook-card__desc">' +
          'Mahlamäen kauneusstudio on avattu 3.8.2026. ' +
          'Ota yhteyttä varataksesi aika: ' +
          '<a href="mailto:asiakaspalvelu@studiomahla.fi" style="color:var(--pink);text-decoration:underline;text-underline-offset:3px;">' +
            'asiakaspalvelu@studiomahla.fi' +
          '</a>.' +
        '</p>';
    } else {
      msg =
        '<h2 class="prebook-card__title">Ennakkomyynti on päättynyt</h2>' +
        '<p class="prebook-card__desc">' +
          'Ennakkohinta oli voimassa kesäkuun loppuun saakka. ' +
          'Hoitola avataan <strong>3.8.2026</strong>. ' +
          'Varauskalenteri avautuu Timmassa lähempänä avajaisia — ' +
          'jätä yhteystietosi sähköpostitse, niin ilmoitamme: ' +
          '<a href="mailto:asiakaspalvelu@studiomahla.fi" style="color:var(--pink);text-decoration:underline;text-underline-offset:3px;">' +
            'asiakaspalvelu@studiomahla.fi' +
          '</a>.' +
        '</p>';
    }
    prebookFormWrap.innerHTML = msg;
  }
})();
