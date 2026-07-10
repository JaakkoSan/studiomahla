// opening-state.js — Hallinnoi opening-banneria, kauppa.html:n ennakkovaraustilaa
// sekä koko sivuston "Ennakkovaraus"-painikkeita päivämäärän mukaan.
//
// =====================================================================
// AVAJAISTEN SIIRTOTILA (POSTPONED):
//   Kesäkuun rankkasateet aiheuttivat vesivahingon studiotilaan, joten
//   avajaisia on siirretty. Aseta lippu alle "true":
window.STUDIOMAHLA_POSTPONED = true;
//
//   Kun uusi avajaispäivä on tiedossa ja studio on valmis:
//   1. Aseta STUDIOMAHLA_POSTPONED = false
//   2. Päivitä OPENING-päivämäärä alla
//   3. Sulje "Liity jonotuslistalle" -palvelu Timmassa
//   4. Ilmoita jonotuslistalaisille (Timman kautta)
//   5. Pushaa GitHubiin
// =====================================================================
window.STUDIOMAHLA_TIMMA_URL = 'https://varaa.timma.fi/studiomahla';

(function () {
  'use strict';

  var PREBOOK_END = new Date('2026-07-01T00:00:00+03:00'); // ennakkomyynti päättyi
  var OPENING    = new Date('2026-08-03T00:00:00+03:00');  // studio avautuu (siirtynyt vesivahingon takia)

  var now = new Date();
  var postponed       = !!window.STUDIOMAHLA_POSTPONED;
  var afterPrebookEnd = now >= PREBOOK_END;
  var afterOpening    = now >= OPENING;
  var timmaUrl        = (window.STUDIOMAHLA_TIMMA_URL || '').trim();
  var timmaActive     = timmaUrl.length > 0 && afterPrebookEnd;

  var CONTACT_EMAIL = 'asiakaspalvelu@studiomahla.fi';

  /* ----- 1) Opening banner ----- */
  var banner = document.getElementById('opening-banner');
  if (banner) {
    if (postponed) {
      // Avajaisten siirtotila — priorisoi kaiken muun
      banner.innerHTML =
        'Kesäkuun rankkasateet aiheuttivat vesivahingon studiotilaan, ja avajaisia joudutaan siirtämään remontin ajaksi. Ilmoitamme uuden avajaispäivän mahdollisimman pian — ' +
        '<a href="' + timmaUrl + '" target="_blank" rel="noopener" aria-label="Liity jonotuslistalle niin saat tiedon kun studio avautuu">' +
          'liity jonotuslistalle niin saat tiedon ensimmäisenä' +
        '</a>.';
    } else if (afterOpening) {
      banner.hidden = true;
      banner.style.display = 'none';
      document.body.classList.add('banner-hidden');
    } else if (afterPrebookEnd) {
      if (timmaActive) {
        banner.innerHTML =
          'Studio avataan 3.8.2026 — ' +
          '<a href="' + timmaUrl + '" target="_blank" rel="noopener" aria-label="Varaa aika Timman kautta">' +
            'ajanvaraus Timman kautta' +
          '</a>';
      } else {
        banner.innerHTML =
          'Studio avataan 3.8.2026 — ' +
          '<a href="kauppa.html" aria-label="Lue lisää avajaisista">kalenteri avautuu pian</a>';
      }
    }
  }

  /* ----- 2) Korvaa "Ennakkovaraus"/"Ajanvaraus"-painikkeet ----- */
  // Postponed-tilassa: "Liity jonotuslistalle" → Timma (jossa jonotuslista-palvelu)
  // Timma-active (ei postponed): "Ajanvaraus" → Timma
  if (postponed || timmaActive) {
    var ctaLinks = document.querySelectorAll('a[href="kauppa.html"]');
    ctaLinks.forEach(function (a) {
      var isButton = a.classList.contains('btn') || a.classList.contains('nav__link');
      if (!isButton) return;

      // Linkki menee Timmaan molemmissa tiloissa
      if (timmaUrl) {
        a.href = timmaUrl;
        a.target = '_blank';
        a.rel = 'noopener';
      }

      var txt = (a.textContent || '').trim();
      var lower = txt.toLowerCase();

      if (postponed) {
        if (lower === 'ennakkovaraus' || lower === 'varaa ennakkoon' ||
            lower === 'ajanvaraus' || lower.indexOf('ennakkovaraus') !== -1 ||
            lower.indexOf('ajanvaraus') !== -1) {
          a.textContent = 'Liity jonotuslistalle';
        }
        var aria = a.getAttribute('aria-label');
        if (aria) {
          a.setAttribute('aria-label', 'Liity jonotuslistalle Timmassa');
        }
      } else {
        // Timma-active (ei postponed)
        if (lower === 'ennakkovaraus') {
          a.textContent = 'Ajanvaraus';
        } else if (lower === 'varaa ennakkoon') {
          a.textContent = 'Ajanvaraus';
        } else if (lower.indexOf('ennakkovaraus') !== -1) {
          a.textContent = a.textContent.replace(/ennakkovaraus/gi, 'Ajanvaraus');
        }
        var aria2 = a.getAttribute('aria-label');
        if (aria2) {
          a.setAttribute('aria-label', 'Varaa aika Timman kautta');
        }
      }
    });
  }

  /* ----- 3) kauppa.html: näytä oikea viesti ----- */
  var prebookFormWrap = document.getElementById('prebookFormWrap');
  if (prebookFormWrap) {
    var msg;

    if (postponed) {
      msg =
        '<h2 class="prebook-card__title">Avajaiset siirtyvät</h2>' +
        '<p class="prebook-card__desc">' +
          'Kesäkuun rankkasateet aiheuttivat vesivahingon studiotilaan, ja avajaisia joudutaan siirtämään remontin ajaksi. Ilmoitamme uuden avajaispäivän mahdollisimman pian.' +
        '</p>' +
        '<p class="prebook-card__desc">' +
          'Liity jonotuslistalle Timmassa, niin saat tiedon ensimmäisenä kun kalenteri avautuu.' +
        '</p>' +
        '<div style="text-align:center;margin-top:24px;">' +
          '<a href="' + timmaUrl + '" target="_blank" rel="noopener" class="btn btn--large" ' +
            'style="text-decoration:none;display:inline-flex;">' +
            'Liity jonotuslistalle →' +
          '</a>' +
        '</div>' +
        '<p style="font-size:14px;color:var(--text-mid);margin-top:24px;text-align:center;">' +
          'Kysymyksissä ota yhteyttä: ' +
          '<a href="mailto:' + CONTACT_EMAIL + '" style="color:var(--pink);text-decoration:underline;">' +
            CONTACT_EMAIL +
          '</a>' +
        '</p>';
      prebookFormWrap.innerHTML = msg;
    } else if (afterPrebookEnd) {
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
            '<a href="mailto:' + CONTACT_EMAIL + '" style="color:var(--pink);text-decoration:underline;">' +
              CONTACT_EMAIL +
            '</a>' +
          '</p>';
      } else if (afterOpening) {
        msg =
          '<h2 class="prebook-card__title">Ennakkovaraus on päättynyt</h2>' +
          '<p class="prebook-card__desc">' +
            'Mahlamäen kauneusstudio on avattu 3.8.2026. ' +
            'Ota yhteyttä varataksesi aika: ' +
            '<a href="mailto:' + CONTACT_EMAIL + '" style="color:var(--pink);text-decoration:underline;text-underline-offset:3px;">' +
              CONTACT_EMAIL +
            '</a>.' +
          '</p>';
      } else {
        msg =
          '<h2 class="prebook-card__title">Ennakkomyynti on päättynyt</h2>' +
          '<p class="prebook-card__desc">' +
            'Ennakkohinta oli voimassa kesäkuun loppuun saakka. ' +
            'Studio avataan <strong>3.8.2026</strong>. ' +
            'Varauskalenteri avautuu Timmassa lähempänä avajaisia — ' +
            'jätä yhteystietosi sähköpostitse, niin ilmoitamme: ' +
            '<a href="mailto:' + CONTACT_EMAIL + '" style="color:var(--pink);text-decoration:underline;text-underline-offset:3px;">' +
              CONTACT_EMAIL +
            '</a>.' +
          '</p>';
      }
      prebookFormWrap.innerHTML = msg;
    }
  }
})();
