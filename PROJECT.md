# studiomahla.fi — projektimuistio

Tämä tiedosto on **Clauden muistio itselleen**. Se sisältää kaiken keskeisen
mitä on sovittu ja tehty projektissa, jotta konteksti säilyy myös kun keskustelu
pitenee tai palataan sen pariin viikkoja myöhemmin.

**Jos jatkat keskustelua ja tuntuu että Claude on unohtanut jotain, sano:
"Lue C:\studiomahla\PROJECT.md ensin"** — silloin konteksti on jälleen ajan tasalla.

Tiedosto on estetty hakukoneilta (robots.txt Disallow) mutta ei salaisuuksia
sisältävä — brändi-info ja tekniset päätökset.

---

## ⚠️ CLAUDELLE: pysyvä ohje

**Päivitä tämä tiedosto AINA ITSENÄISESTI seuraavissa tilanteissa,
ilman että käyttäjän tarvitsee erikseen pyytää:**

1. Kun tehdään **tekninen muutos** joka vaikuttaa arkkitehtuuriin (uusi tiedosto
   assets:iin, uusi sivutyyppi, muutos layout.js:ään, opening-state.js:ään, jne.)
2. Kun tehdään **sisältömuutos** joka vaikuttaa palvelu­kuvaukseen (uusi hoito,
   hintapäivitys, tuotesarjan muutos, brändi­viestin muutos)
3. Kun **tehdään päätös** joka vaikuttaa tuleviin toimen­piteisiin
   (esim. "avataan yläkertaan" tai "otetaan käyttöön Pro XN")
4. Kun **luodaan uusi sivu** — lisää se lukuun 7 (sivut)
5. Kun **aikataulu tai suunnitelma muuttuu** — päivitä luku 9
6. Kun **käytetään uusia palveluita/kumppaneita** — päivitä luku 13
7. Kun **käyttäjä muuttaa toimintaperiaatteitaan** — päivitä luku 10

**Prosessi jokaisella päivityksellä:**
- Etsi oikea luku
- Päivitä sisältö
- Lisää rivi lukuun 15 (Muutosloki) päivämäärän kanssa
- Päivitä "Viimeksi päivitetty" -päivämäärä tiedoston lopussa

**Tämä ei ole valinnaista.** Käyttäjä on nimenomaan pyytänyt että hoidan tämän
itsenäisesti eikä hänen tarvitse muistaa muistuttaa.

### Erityisohje faktatietojen tallennukseen (kriittinen)

**HETI kun käyttäjä mainitsee minkä tahansa faktatiedon** studiosta, tiimistä,
palveluista, hinnoista, aikatauluista, tuotteista, kumppaneista tai muusta joka
ei ole vielä PROJECT.md:ssä — **kirjaa se välittömästi tähän tiedostoon** ilman
että pyydät vahvistusta tai kysyt käyttäjältä ensin. Parempi kirjata liikaa
kuin menettää tieto.

Miksi tämä on kriittistä: kontekstisi ei pysy istuntojen välillä. Jos et kirjaa
tietoa heti, se katoaa myöhemmin. Käyttäjä ei tule enää muistuttamaan samasta
asiasta toistuvasti — se on hänen aikansa hukkaan.

**Esimerkkejä tiedoista joita EI saa menettää:**
- Kaikki nimet (yrittäjä, tiimi, kumppanit, maahantuojat)
- Kaikki tutkinnot, sertifikaatit, koulutushistoriat
- Konkreettiset päivämäärät ja aikataulut
- Hinnoittelupäätökset
- Tuote- ja palveluvalinnat
- Yhteystiedot (uusia sähköposteja, puhelinnumeroita)
- Some- ja hakukonekanavat (mitkä ovat olemassa)
- Perheenjäsenten ja sukulaisten mainintoja jos ne liittyvät studioon
- Käytännön päätökset ("emme tee X", "teemme aina Y")

**Prosessi kun näet uuden faktatiedon:**
1. Kirjaa se PROJECT.md:hen heti (edes lyhyenä muistiinpanona)
2. Lisää muutoslokiin
3. Jatka käyttäjän varsinaiseen kysymykseen

**Jos et ole varma minkä luvun alle tieto kuuluu**, luo tarvittaessa uusi
alaotsikko tai lisää se lukuun 1 (Studio) muistiinpanona. Parempi että
tieto on jonkin epätarkassa paikassa kuin että se ei ole tallessa lainkaan.

---

## 0. Tietolista — mitä on tallessa, mitä puuttuu

Nopea silmäys mitkä keskeiset faktat ovat vahvistettu tässä muistiossa ja mitkä
odottavat käyttäjän vahvistusta. Pidä ajan tasalla. Merkintä: ✅ = tallessa,
❓ = puuttuu tai epäselvä.

**Studion perustiedot**
- ✅ Yhtiö (Guild Lounge Oy), Y-tunnus, osoite, sähköposti, puhelin
- ✅ Yrittäjän nimi (Jaakko Sandström)
- ❓ Yrittäjän tarkka ammatti ja koulutustausta
- ❓ Vastuusairaanhoitajan nimi
- ❓ Vastuusairaanhoitajan tutkinto ja koulutushistoria
- ❓ Vastuusairaanhoitajan kokemusalueet
- ❓ Vastuusairaanhoitajan rooli studiossa
- ✅ Sijainti (Kotkan Ruonala)

**Palvelut ja hinnoittelu**
- ✅ Ensikäynti (200 €)
- ✅ Mikroneulaus 3× sarja (570 €), 6× sarja (1080 €)
- ❓ Pro XN -jatkohoidon lopullinen hinta
- ❓ LED-hoidon lopullinen hinta

**Aikataulu**
- ✅ Alkuperäinen avaus 3.8.2026 siirretty vesivahingon takia
- ❓ Uusi avautumispäivä (yläkerta)
- ❓ Alakerran valmistumisen tarkempi aikataulu
- ❓ Pro XN -koulutuksen aikataulu

**Some- ja hakukonekanavat**
- ✅ Google Business Profile (olemassa, ei ehdoteta perustamista)
- ✅ Instagram (olemassa, ei ehdoteta perustamista)
- ❓ Facebook (onko olemassa?)
- ❓ TikTok (onko olemassa?)
- ❓ YouTube (onko olemassa?)

**Kumppanit ja palvelut**
- ✅ Pro XN maahantuoja: Duallaser Aesthetic
- ✅ Timma (ajanvaraus)
- ✅ Supabase, Resend, Cloudflare (tekninen)
- ❓ LED-laitteen valmistaja / maahantuoja
- ❓ Lääkärikumppani jos on

**Muut avoimet kysymykset:** [käyttäjä saa lisätä tähän]

---

## 1. Studio (perustiedot)

- **Yritys**: Guild Lounge Oy (aputoiminimi Mahlamäen Kauneusstudio)
- **Y-tunnus**: 3578202-2
- **Osoite**: Mahlamäentie 14, 48300 Kotka
- **Sähköposti**: asiakaspalvelu@studiomahla.fi
- **Puhelin**: 050 367 1683
- **Yrittäjä**: Jaakko Sandström (jaakko.sandstrom@gmail.com)
- **Sijainti**: Kotkan Ruonala, omakotitaloalue. Studio omakotitalon alakerrassa;
  bussipysäkki tontin rajalla, ilmainen pysäköinti pihassa suoraan oven edustalla.

### Tiimi

Studiolla on **vastuusairaanhoitaja**, joka toimii kliinisenä ammattilaisena
mikroneulauksen ja tulevien aknenhoitopalvelujen puolella. Sivustolla viestitään
monikossa "terveydenhuollon ammattilaiset toteuttamana" ja "yli kahdenkymmenen
vuoden kokemus terveydenhuoltoalalta".

**[TÄYDENNETTÄVÄ käyttäjältä]** — konkreettiset tiedot vastuusairaanhoitajasta
sivuston tiimi-sivua ja schema-merkintöjä varten:
- Nimi
- Tutkinto ja koulutushistoria
- Vuosien määrä terveydenhuollossa + erityisosaamisalueet
- Rooli studiossa (kliininen vastuu, hoitojen toteutus, jne.)
- Sertifikaatit ja lisäkoulutukset jotka liittyvät mikroneulaukseen tai
  ammattikosmetologiaan

Nämä täydennetään kuvausajankohtaan mennessä jotta uusi tiimi-osio etusivulla
voidaan kirjoittaa oikeilla tiedoilla.

Yrittäjä Jaakko puolestaan on... **[TÄYDENNETTÄVÄ käyttäjältä]** — Jaakon oma
tausta (ammatti, rooli studiossa, koulutustausta) on myös tarpeen tietää sivuston
tiimi-osioon.

### Some- ja hakukonekanavat (olemassa)

**Google Business Profile**: perustettu. Älä ehdota perustamista.
**Instagram-tili**: perustettu. Älä ehdota perustamista.
**Facebook**: (jos on, käyttäjä täsmentää tarvittaessa)

Kun Claude keskustelee sivustosta tai markkinoinnista, näitä ei tarvitse
"ehdottaa perustettavaksi". Ne ovat jo käytössä. Voi kylläkin ehdottaa
konkreettisia toimenpiteitä niiden puolella (esim. "kannattaisi lisätä
Google Business Profileen tuoreet kuvat", "Instagramiin voisi laittaa
avajaisviestin", jne.) jos tilanne sitä vaatii.

## 2. Nykytilanne (heinäkuu 2026)

**Vesivahinko**: Heinäkuun rankkasateet aiheuttivat vesivahingon alakerran
studiotilaan. Alkuperäinen avajaispäivä oli 3.8.2026 — nyt siirretty, uutta
päivämäärää ei ole vielä.

**Remontin aikataulu**: alakerta minimissään 8 viikkoa, realistisesti 12–16 viikkoa.

**Ratkaisu**: studio avataan **yläkerran hoitohuoneessa** väliaikaisesti niin
että jonotuslistalaiset pääsevät aloittamaan. Alakerta valmistuu myöhemmin syksyllä.
Yläkerrassa on:
- Erillinen huone joka soveltuu hoitohuoneeksi (ei lemmikkejä, vähäistä liikennettä)
- Eteinen → hoitohuone -reitti, ei kulkua asuintilan läpi
- WC heti hoitohuoneen vieressä

Yläkerran valmistelu:
- **Vesipiste**: LVI-asennus n. 300 € (kalusteet jo hankittu alakertaa varten;
  putket seinän toisella puolella joten suora veto). Kotitalousvähennys työosuudesta.
- **Maalaus**: itse tehden, lämmin murrettu valkoinen (esim. Tikkurila F497 Vaha,
  Y484 tai G497). Sopii cream-sävyihin brändissä ja on hyvä valokuvatausta ihon
  kuvaamiseen (ei sinerrä keinovalossa).
- **Lattia**: vinyyli (jo hankittu alakertaa varten). Itse asennus.
- **Työjärjestys**: LVI ensin (reiät seinään) → maalaus → vinyyli viimeisenä.
- **Aikataulu**: yläkerta valmis noin kuukaudessa.

Kun alakerta valmistuu myöhemmin: viralliset avajaiset alakerrassa (kaksi
markkinointimomenttia yhden sijaan).

## 3. Palvelut ja hinnoittelu

### Ensikäynti (200 €)
Sisältää: iho-analyysi + keskustelu + henkilökohtaisesti valittu hoito.
Hoitovaihtoehto valitaan yhdessä asiakkaan kanssa iho-analyysin perusteella:

- **Mikroneulaus** (jos iho on siihen valmis)
- **Pro XN -ammattikosmetiikkahoito** (jos iho tarvitsee ensin rauhoittamista ja
  barrier-vahvistusta)

Molemmat ovat täysipainoisia hoitoja, ei "plan A vs. plan B". Jos sarjahoitoon
päädytään, ensikäynnin hoito lasketaan sarjaan mukaan (kustannusvaikutus neutraali).

### Mikroneulaus (jatkosarja)
- Kolmen hoidon sarja: **570 €**
- Kuuden hoidon sarja: **1080 €**
- 4 viikon välit hoitokerroilla (biologisesti perusteltu, ei joustava)
- Laite: MicroPen EVO™ (FDA-hyväksytty, CE-merkitty)

### Pro XN -jatkohoidot
- Hinta myöhemmin päätettävissä (n. 170–180 € voisi olla sopiva)
- Voidaan myydä myös kotihoitotuotteita asiakkaille (retail-marginaali)

### LED-valohoito
Suunnitteilla — sini- ja punavalo. Tulee osaksi menetelmäpalettia myöhemmin.

## 4. Pro XN -tuotesarja (valittu heinäkuu 2026)

- **Maahantuoja Suomessa**: Duallaser Aesthetic
- **Kotimaa**: valmistus EU-alueella (Ksanto, Puola)
- **Ammattilaisjakelu**: ei suoraa kuluttajamyyntiä verkkokaupoista
- **Aktiiviaine**: Xanthohumol (humalajäkälän prenyloitu flavonoidi) — jauheena
  aktivoidaan hoidon aikana (ei ehdi hapettua purkissa)
- **Vahvat käyttökohteet**: akne, epäpuhdas iho, tulehduksen jälkeinen pigmentaatio
- **Tuotevalikoima**: 11 SKU (8 duaali retail + 3 ammattilaisille)

### Protokollat (4 moduulia)
1. Overreactive Rescue Treatment (barrier-korjaus)
2. Firming Treatment (bio-revitalisaatio)
3. Retexture Treatment (mikroneulaus 0.2–0.5 mm ihoyhteydellä — HUOM: eri kuin
   varsinainen kliininen mikroneulaus MicroPen EVO:lla)
4. Acne Rescue Treatment (akne, seborrea, PIH)

### Aloituspakkaukset (alv 0%)
- Easy Starter Kit: 245 €
- Pro Starter Kit: 680 €
- Advanced Pro Starter Kit: 1050 €

### Tieteellinen tuki
- Vertaisarvioidut tutkimukset Xanthohumolista (antimikrobinen vs. Cutibacterium
  acnes MIC 3 μg/mL, antioksidantti 9× Trolox hydroksyyliradikaaleille, NF-κB
  anti-inflammaatio, melanogeneesin esto B16-soluilla)
- Iho-relevantit väitteet OK viestintään, syöpätutkimuksia ei kannata siteerata
- **Tarkennuskohta**: Retexture-protokollan mikroneulausviittaus 0.2–0.5 mm on
  product penetration, EI kliinistä kollageeninduktiota. Ei sekoita MicroPen EVO
  -hoitoon asiakasviestinnässä.

## 5. Brändi ja visuaalisuus

### Viestinnän kulmakivet
- "Kliinistä asiantuntemusta ihonhoitoon"
- Erikoistuminen kolmeen huolenaihe-alueeseen: **akne**, **herkkä/vaurioitunut iho**,
  **ikääntymisen merkit**
- Kolme menetelmää työkalupakissa: **mikroneulaus** (pääpalvelu), **Pro XN**, **LED**
- Ei "hoidamme kaikkea" -yleiskosmetologiaa

### Design-tokenit (style.css)
- `--green-dark: #3d5247` — nav, hero taustat
- `--green-mid: #4a6157`
- `--cream: #f5f0e8` — vaaleat taustat
- `--cream-warm: #ede7db`
- `--pink: #c8997a` — CTA-painikkeet
- `--pink-pale: #e8cdb8` — banneri, korostukset
- `--white: #faf8f4` — leipätekstitaustat
- `--text-dark: #2a3830`
- `--text-mid: #4a5e55`
- `--danger: #b85a3a` — lomakevirheet

### Fontit
- **Cormorant Garamond** (serif) — otsikot H1–H3, kursiiviosat (`em`) pinkillä
- **Jost** (sans) — leipäteksti, nav, painikkeet
- Body-teksti font-weight 300, line-height 1.9
- Nav/painikkeet letter-spacing 0.22em, uppercase, font-weight 400

### Kirjoitustyyli (kaikki sivustolle kirjoitettava sisältö)

**Vältä ajatusviivaa ( — em-dash ja – en-dash) sisällössä.** Suomen kielessä
näitä käytetään harvoin, toisin kuin englannissa. Käytä sen sijaan:
- **Pilkku** kun yhdistät kaksi rinnasteista lausetta
- **Kaksoispiste** kun johdatat luetteloon tai selitykseen
- **Puolipiste** kun yhdistät kaksi itsenäistä ajatusta
- **Sulkeet** kun teet lisähuomion
- **Erillinen virke** kun ajatus on itsenäinen

Esim: EI *"Jälkihoito on osa hoidon onnistumista — ei kosmeettinen valinta."*
KYLLÄ *"Jälkihoito on osa hoidon onnistumista, ei kosmeettinen valinta."*

Ajatusviivan käyttö sallitaan vain teknisessä muodossa (esim. numeroalueessa
kuten "3–6 kuukautta", "SPF 30–50" tai "päivät 1–3"). Näissä käytetään en-dashiä
tai tavutus-viivaa vakiokäytännön mukaisesti.

Sama käytäntö koskee kaikkia blogiartikkeleita, sivukuvauksia, meta-tageja,
CTA-tekstejä ja muita asiakkaalle näkyviä tekstejä. Kun kirjoitat uutta
sisältöä, tarkista jälkikäteen ettei tekstissä ole ajatusviivoja.

## 6. Tekninen arkkitehtuuri

### Hosting ja deployment
- **Cloudflare Pages** — hostaus + globaali CDN
- **GitHub repo**: github.com/JaakkoSan/studiomahla
- **Deployment**: käyttäjä pushaa GitHubin web UI:n kautta ("Add files via upload").
  HUOM: web UI ei poista tiedostoja automaattisesti — poistot tehdään manuaalisesti
  GitHubissa (roskakori-ikoni tiedostonäkymässä).
- **Ei rakennus- tai kompilointivaiheita** — kaikki staattista HTML/CSS/JS
- **Käyttäjä ei halua uusia työkaluja tai alustoja** (ei Astroa, Elevntyä,
  npm-buildia, ei mitään). Kaikki suoraan selaimen tulkittavissa.

### Kansioiden rakenne
```
studiomahla/
├── assets/              (jaetut resurssit)
│   ├── style.css        (koko sivuston jaettu CSS)
│   ├── layout.js        (nav + banner + footer HTML inline; injektoi slot-elementteihin)
│   ├── opening-state.js (banner + CTA-painikkeiden dynamiikka)
│   ├── meta-pixel.js    (Facebook Pixel)
│   ├── logo.svg
│   └── og-default.jpg
├── functions/api/       (Cloudflare Pages Functions)
│   └── (esitiedot, hoitoloki, contact, auth, keep-alive)
├── *.html               (13 asiakassivua + admin.html + kysely.html)
├── sitemap.xml
├── robots.txt
├── _redirects           (Cloudflare Pages 301-säännöt)
└── PROJECT.md           (TÄMÄ TIEDOSTO)
```

### Sivujen rakenne (kaikki 13 asiakassivua)
```html
<head>
  <!-- meta-tagit, JSON-LD, fontit -->
  <link rel="stylesheet" href="/assets/style.css">
  <style>/* vain sivukohtainen CSS */</style>
  <script src="/assets/meta-pixel.js"></script>
</head>
<body>
  <a href="#main-content" class="skip-link">...</a>
  <div id="header-slot"></div>            <!-- layout.js injektoi tähän -->
  <main id="main-content">
    <!-- sivun sisältö -->
  </main>
  <div id="footer-slot"></div>            <!-- layout.js injektoi tähän -->
  <script src="/assets/layout.js" defer></script>
  <script src="/assets/opening-state.js" defer></script>
</body>
```

### Layout.js-mekaniikka
- Sisältää HEADER_HTML ja FOOTER_HTML **merkkijonoina** (ei fetch-kutsuja).
- Suorittaa synchronously kun script latautuu (defer).
- Käyttää `slot.outerHTML = HEADER_HTML` -tekniikkaa.
- `getPageName()` lukee URL:sta sivun nimen, `postProcessHeader()`:
  - Etusivulla (index.html tai `/`): brand-linkki → `#hero`
  - Blogisivuilla (BLOG_PAGES-lista): Blogi-linkkiin `is-current`
- **AIEMPI epäonnistunut yritys**: fetchattiin `assets/header.html` ja `footer.html`
  erillisistä tiedostoista. Cloudflare deploy-eroista jokin tiedosto puuttui joskus
  → nav ja footer katosivat. Nyt kaikki HTML on layout.js:n sisällä → yksi tiedosto,
  ei riippuvuutta muista.

### Kun lisätään uusi sivu
1. Kopioi minkä tahansa nykyisen sivun runko
2. Muokkaa: `<title>`, `<meta description>`, canonical, OG-tagit, JSON-LD, `<main>`-sisältö
3. Jos on blogiartikkeli: lisää tiedostonimi `layout.js`:n `BLOG_PAGES`-objektiin
4. Lisää `sitemap.xml`:ään
5. Lisää `blogi.html`-listaukseen (blogiartikkeli)

### Kun muutetaan navigaatiota tai footeria
Muuta `layout.js`:n `HEADER_HTML` tai `FOOTER_HTML`-merkkijonoja. Pushaa. Kaikki
sivut päivittyvät automaattisesti.

### Kun studio avataan
1. `opening-state.js`: `window.STUDIOMAHLA_POSTPONED = false`
2. Sulje Timman "Jonotuslista"-palvelu, avaa varsinaiset hoitopalvelut
3. Ilmoita jonotuslistalaisille (Timman kautta) 24–48h ennen julkista avausta
4. Pushaa GitHubiin

## 7. Sivut nykyisin

### Asiakassivut (13)
- **index.html** — etusivu (hero + filosofia + menetelmä + haasteet + vertailu)
- **blogi.html** — blogilista (blog-hero tumma vihreä)
- **privacy.html** — tietosuojaseloste
- **lomake.html** — esitietolomake (Supabase-tallennus)
- **mikroneulaus-opas.html** — pinned blogiartikkeli, "Mikroneulaus: täydellinen opas"
- **mikroneulaus-sarjahoito.html** — sarjahoidon biologia
- **mikroneulaus-sopiiko-minulle.html** — soveltuvuusarvio 12 kysymyksellä
- **mikroneularulla-vai-kliininen-mikroneulaus.html** — vertailu
- **milloin-aloittaa-mikroneulaus.html** — "Miksi syksy on hyvä hetki aloittaa"
- **mita-ensikaynnilla-tapahtuu.html** — ensikäynnin kulku
- **mita-on-kliininen-mikroneulaus.html** — perusartikkeli
- **mita-tutkimus-sanoo-mikroneulauksesta.html** — tutkimusnäyttö
- **mikroneulauksen-jalkihoito.html** — jälkihoito-opas 24 tunnista 30 päivään (julkaistu 16.7.2026)
- **mikroneulaus-talvella.html** — DRAFT, noindex, julkaisu marraskuussa 2026

### Hallintasivut (2)
- **admin.html** — hallintapaneeli (kirjautuminen + esitiedot + hoitoloki)
  - noindex, robots.txt disallow
  - Bookings-tab poistettu (Stripe-funktiot poistettu myös)
- **kysely.html** — kysely (disallow)

### Poistettu ekosysteemi (heinäkuu 2026)
Kun päätettiin lopettaa ennakkovarausmalli ja siirtyä Timma-jonotuslistaan:
- kauppa.html (ennakkovaraus)
- ehdot.html (sopimusehdot)
- peruuta.html (ennakkovarauksen peruutus)
- functions/api/setup-intent.js, charge-booking.js, save-booking.js,
  cancel-booking.js, list-bookings.js
- 301-redirect säännöt `_redirects`:iin: näistä kaikista → `/`
- privacy.html:sta poistettu Ennakkovaraus-käsittelyperuste
- Kaikilta sivuilta poistettu footer-linkki "Sopimusehdot"
- Sitemap.xml puhdistettu

## 8. Tulevat sivut (rakennetaan kun on aika)

Käyttäjä on hyväksynyt sivuston arkkitehtuuriksi kolme huolenaihe-sivua +
kolme menetelmäsivua ristikkäislinkitettyinä. Ei rakenneta ennen kuin Pro XN
on tilattu ja LED-laite on hankittu.

### Iho-huolet-sivut
- `akne.html` — akne ja epäpuhdas iho
- (herkkä-iho.html tms.) — herkkä ja vaurioitunut iho
- (ikaantyva-iho.html tms.) — ikääntymisen merkit

### Menetelmäsivut
- (mikroneulaus.html — voi käyttää nykyistä mikroneulaus-opasta pohjana)
- `pro-xn.html`
- `led-valohoito.html`

### Erikoissivut
- `ensikaynti.html` — ensikäynti oman sivun
- `404.html` — oma virhesivu Cloudflare-oletuksen sijaan

### Navigaatiorakenne (myöhemmin)
- Etusivu
- Iho-huolet ▼ (3 sivua)
- Hoidot ▼ (3 sivua)
- Blogi
- Ajanvaraus (CTA)

## 9. Tulevat toimenpiteet (aikataulullisia)

### Marraskuu 2026 — talvi-artikkelin julkaisu
Tiedosto: `mikroneulaus-talvella.html`. Ohjeet ovat myös HTML-kommenttina
tiedoston yläreunassa:

1. Muuta `<meta name="robots">` `noindex, nofollow` → `index, follow`
2. Päivitä `datePublished` ja `<time>`-elementti nykyiseen päivämäärään
3. Palauta blogi.html-listaukseen ensimmäiseksi kortiksi (uusin)
4. Palauta sitemap.xml:ään
5. Palauta cross-linkki `milloin-aloittaa-mikroneulaus.html`:n
   "Lue lisää"-osioon

### Kun studio avataan yläkertaan
- opening-state.js: `STUDIOMAHLA_POSTPONED = false`
- Timma: sulje "Jonotuslista", avaa varsinaiset palvelut
- Ilmoitus jonotuslistalaisille 24–48h ennen julkista avausta
- Google Business Profile + Instagram/some -päivitys
- Google Search Console: pyydä uudelleenindeksointi keskeisimmille sivuille

### Ennen studion avautumista
- Ota kuvat yläkerran huoneesta ennen remonttia (before/after -tarina)
- Ota Jaakosta muotokuvia (asiakas näkee ammattilaisen)
- Kirjoita 1–2 uutta blogiartikkelia (SEO-ajovaraus ennen avausta)
- Ota yhteyttä Duallaser Aestheticiin: demopakkaus + koulutus + tilaus

### Blogisisältöjono (mikroneulaus-pillarin kattavuuden täydentäminen)

Analysoitu 2026-07-16: pillar-artikkeli (`mikroneulaus-opas.html`) kattaa 12
otsikkoa, joista yksi puuttuu klusteriverkosta ("Mitä hoidon jälkeen tapahtuu").
Suositeltu jono seuraavaksi kirjoitettavaksi tärkeysjärjestyksessä:

1. ✅ **`mikroneulauksen-jalkihoito.html`** — "Mikroneulauksen jälkihoito:
   käytännönläheinen opas 24 tunnista 30 päivään". **JULKAISTU 16.7.2026.**
   Cross-linkit lisätty pillariin (mikroneulaus-opas.html "Mitä hoidon
   jälkeen tapahtuu" -osioon) ja ensikäynti-artikkeliin (mita-ensikaynnilla-
   tapahtuu.html "Jälkihoidon ohjeistus" -osion jälkeen). Artikkelin
   sisällä linkit sarjahoitoon, ensikäyntiin, talvella-artikkeliin
   (UV-yhteys), ja pillariin.

2. **`mikroneulaus-aknearvet.html`** — "Aknearpien hoito mikroneulauksella:
   mitä realistisesti odottaa". Strateginen silta Vaihe 2:n aknenhoitopolulle.
   Palvelee jo saavutettua "aknen hoito kotka" -sijoitusta. Sisältörunko:
   arpityypit (atroofinen: ice pick, boxcar, rolling; hypertrofinen; keloidi),
   biologinen vaikutusmekanismi, realistinen tulosarvio per arpityyppi,
   6 kk isotretinoiini-sääntö, PIH-käsittely, milloin ei kannata,
   sarjan aikataulu ja hoitokertojen määrä arpimääriä varten. Suositeltu
   toiseksi, mutta voi myös olla ensimmäinen jos aknehoitopolku on jo lähempänä.

3. **`mikroneulaus-muut-alueet.html`** (mahdollinen) — "Kaula, dekoltee ja
   kädet — mikroneulaus muille alueille kuin kasvoille". Vaatii vahvistuksen
   käyttäjältä että näille alueille todella tarjotaan hoitoa. Laajentaa
   palvelun kohderyhmää.

**Muistilista jokaisen uuden blogiartikkelin luontiin:**
- Kopioi runko olemassa olevalta blogisivulta (esim. `mita-ensikaynnilla-tapahtuu.html`
  on hyvä pohja käytännönläheisille aiheille)
- Päivitä title, description, OG, Twitter, JSON-LD BlogPosting +
  BreadcrumbList, dates
- Lisää tiedostonimi `assets/layout.js`:n `BLOG_PAGES`-objektiin
- Lisää sitemap.xml:ään (priority 0.8)
- Lisää blogi.html-listaukseen (uusin ensin)
- Cross-linkit pillariin (mikroneulaus-opas.html) ja relevantteihin klustereihin
- CTA-osio: "Aloita ensikäynnillä" -otsikolla (yhtenäistetty muille)

## 10. Käyttäjän toimintaperiaatteet

- **Ei uusia työkaluja/alustoja/rakennusvaiheita.** Cloudflare Pages + GitHub +
  vanilla HTML/CSS/JS pysyvät.
- **Claude hoitaa koko koodauksen.** Käyttäjä pushaa GitHub web UI:n kautta.
- **Skaalautuvuus tärkeä**: jaetut ratkaisut (yksi CSS, yksi layout.js) ok;
  duplikaatio per sivu ei.
- **Sisältö ennen bells & whistles**: pieni tuotevalikoima, keskittynyt viesti,
  ei tekniikan tekniikan takia.

## 11. Aiemmat merkittävät päätökset

### Toimintapolitiikat
- Ennakkovarausmalli lopetettu → Timma-jonotuslista
- Ei omaa Supabase-jonotuslistaa (Timma riittää)
- Vuokratuoli-malli hylätty (kotona hoito on olennainen konseptista)
- Avautuminen yläkertaan hyväksytty (16 viikon odotus liian pitkä)

### Tuotevalinnat
- Pro XN Duallaseriltä valittu (pieni valikoima, tiukka jakelu, vahva tiedeperusta,
  aknefokus, EU-valmistus, tunnistamaton kuluttajille = kilpailuetu)
- Environ, BABOR, Klapp, AlumierMD, mesoestetic, Dermaviduals käsitelty ja
  hylätty (verkossa saatavuus tai muu ristiriita kriteerien kanssa)

### Tekniset arkkitehtuurivalinnat
- CSS: jaettu `assets/style.css` + per-sivu inline `<style>` sivukohtaisiin
  osiin (hero, cards, form, jne.)
- Layout: `layout.js` sisältää HTML:n inline-merkkijonoina (EI fetch-tiedostoja).
  Aiemmin yritettiin fetch(header.html) mutta se ei toiminut luotettavasti
  Cloudflaressa → yhdistelmätiedosto.
- Opening state: JS-ohjattu banneri + CTA-painikkeiden dynamiikka
  (`opening-state.js`)
- Sivustolla ei blog-hero-taustan muutosta (pysyy tumma vihreä kuten muualla)

## 12. Alkuperäiset Guild Lounge Oy -tiedot lomakkeissa ja footereissa

- Yhtiön nimi: Guild Lounge Oy
- Aputoiminimi: Mahlamäen Kauneusstudio
- Y-tunnus: 3578202-2
- Kaikilla asiakassivuilla footerissa: "© 2026 Guild Lounge Oy | Y-tunnus 3578202-2 |
  [Tietosuojaseloste]"

## 13. Kolmannen osapuolen palvelut

- **Cloudflare Pages** — hostaus (USA, DPF+SCC)
- **Timma** (Suomi) — ajanvaraus
- **Supabase EU-Frankfurt** — esitietolomakkeen terveys­tietojen tallennus
- **Resend** (USA, DPF+SCC) — transaktio-sähköpostit
- **Google Fonts** — fonttien lataus
- **Meta/Facebook Pixel** — konversioseuranta

Kaikki näiden tietosuojaselosteet on linkitetty `privacy.html`:ssä.

## 14. Vaihe 2 -suunnitelma: aknenhoito-lisäys

**Status**: Suunnitelma. Odottaa toteutusta.
**Aikataulu**: syksy 2026 jälkeen, kun aknenhoito-koulutus on valmis ja studio
avautunut yläkertaan ja perustoiminta on stabiilia.
**Alkuperä**: Käyttäjän oma suunnitelmadokumentti kesäkuulta 2026
(SITE_ARCHITECTURE_PHASE2.md, nyt sulautettu tähän).

### 14.1 Vaihe 2 -toteutuksen edellytykset

Ei toteudu ennen kuin **kaikki** nämä täyttyvät:
1. Studio on avautunut (yläkerta tai alakerta) ja perustoiminta on stabiilia
2. Aknenhoito-koulutus suoritettu
3. Kaikki [VAHVISTETTAVA]-kohdat Aknenhoitopolku v1.0:ssa vahvistettu
4. ProXN, LED ja aknenhoidon hinnoittelu lukittu

### 14.2 Strateginen perusta

Mikroneulaus ja aknenhoito ovat luonteeltaan erilaisia:
- **Mikroneulaus** on menetelmä joka palvelee useita ihon vaivoja
- **Aknenhoito** on vaiva jota hoidetaan usealla menetelmällä (ProXN, LED, mikroneulaus)

Molemmat tarvitsevat oman pillar-rakenteensa. Mikroneulaus pysyy
menetelmäkeskeisenä pillarina, aknenhoito tulee vaivakeskeiseksi pillariksi.
ProXN ja LED ovat tukimenetelmiä (omat sivut, ei pillaria).

### 14.3 Uudet sivut

**Aknenhoito-pillar:**
- `/aknenhoito.html` (pillar)
- `/aknenhoito-lieva.html` (Polku 1: lievä akne + reaktiivinen iho)
- `/aknenhoito-kohtalainen.html` (Polku 2: kohtalainen tulehduksellinen akne)
- `/aknearvet-pigmenttimuutokset.html` (Polku 3: aknearvet ja PIH)

**Menetelmäsivut:** `/proxn-kasvohoito.html`, `/led-valohoito.html`
**Mahdollinen:** `/ensikaynti.html`

### 14.4 Navigaatio

**Nykyinen:** `[Brand] | Blogi | [Ajanvaraus]`
**Vaihe 2:** `[Brand] | Mikroneulaus | Aknenhoito | Blogi | [Ajanvaraus]`

Ei dropdownia. Ei hampurilaista aluksi. Alle 380 px piilotetaan "Blogi"
(löytyy footerista); "Ajanvaraus" pysyy aina.

### 14.5 Etusivun uudelleenajattelu

Etusivu siirtyy palvelumyynnistä **brändi- ja filosofiakeskeiseksi portiksi**.
Pois etusivulta: hinnasto, FAQ, prosessikuvaus, sarjat → siirtyy pillar-sivuille.

Uusi rakenne:
1. Hero (tiivis brändipositionointi, yksi CTA)
2. Hoitofilosofia (laajempi)
3. Hoitopolut — 2 isoa korttia (mikroneulaus + aknenhoito)
4. Kuka olen / Tiimi
5. Blogi-snippet
6. Yhteystiedot + Kotka
7. Footer-edelläinen CTA

**Kriittinen:** Etusivu **ei** muutu ennen kuin aknenhoito on valmis
lanseerattavaksi.

### 14.6 Aknenhoito-pillar sisältö

**`/aknenhoito.html`:** Hero "Hoidamme aknea sen tyypin ja vaiheen mukaan",
filosofia (rauhoitus, barrier-tuki, ei peitetä vaan parannetaan), kenelle sopii,
ensikäynti ja arviointi, 3 polkua korttina + linkit, hoitomenetelmät (ProXN, LED,
mikroneulaus) + linkit, hinnoittelu, milloin ohjaamme lääkärille, FAQ + CTA.

**Polku 1 (lievä):** ProXN-kasvohoito + Dermalux LED -sarja. Kohde: lievä
tulehduksellinen akne, rasvoittuva iho, herkkä iho, couperosa.

**Polku 2 (kohtalainen):** Korkeampi hoidollinen taso. Selkeästi: jos vaste
puuttuu → lääkärille. Yhteistyö paikallislääkityksen kanssa.

**Polku 3 (arvet ja PIH):** **6 kuukauden odotusaika isotretinoiinin jälkeen**
(ehdoton). Mikroneulauskeskeinen → `/mikroneulaus-opas.html`. ProXN + LED tukena.

### 14.7 Menetelmäsivut

**`/proxn-kasvohoito.html`:** ProXN-tuotelinjan kuvaus, kenelle (lievä/kohtalainen
akne, couperosa, rosacea, herkkä iho), protokolla, **ei sekoiteta mikroneulaukseen
ilman turvallisuusarviota**, yhteensopivuus paikallislääkkeiden kanssa, hinnoittelu.

**`/led-valohoito.html`:** Dermalux LED kliinisellä tasolla, kaksi roolia
(sarjahoito ja yksittäinen lisähoito), sinisen ja punaisen valon vaikutus,
vasta-aiheet, hinnoittelu (~420–450 € / 8 hoitoa, 35 € lisäpalveluna).

### 14.8 LED-hoidon tutkimusnäyttö

Tarkasteltu kesäkuu 2026, tieteellisesti vahva. Käytettävä lähdeluettelo
`led-valohoito.html`-sivun kirjoituksessa.

**Meta-analyysit (korkein näyttö):**
- **Ngoc et al. 2023**, Photodermatology, Photoimmunology & Photomedicine.
  Meta-analyysi 31 tutkimuksesta. Aknevaikutus SMD −2.42 [−2.64, −2.15]
  (erittäin suuri), I² = 17 %. DOI: 10.1111/phpp.12841.
- **Akuffo-Addo et al. 2024**, Journal of Cutaneous Medicine and Surgery.
  1185 aknetapausta: 92 % osittaista helpotusta, 43 % parannus 4 viikossa.
  DOI: 10.1177/12034754241265697.
- **JAAD 2024 CME Part II — Photobiomodulation Clinical Applications in
  Dermatology.** Sham-kontrolloitu RCT: 77 % vähennys tulehduksellisissa,
  54 % ei-tulehduksellisissa 4 viikossa (420 nm + 660 nm, 2.5 min × 2/päivä).
- **At-Home LED Devices Meta-Analysis 2025** — vahvistaa kotikäyttöiset LED:t.

**Klassinen RCT:**
- **Papageorgiou et al. 2000**, British Journal of Dermatology, 142:973-978.
  n=107, sininen+punainen valo tuotti 76 % parannuksen 12 viikossa, tilastollisesti
  merkitsevästi parempi kuin 5 % bentsoyyliperoksidi. HUOM: loisteputkilamppuja
  (415 + 660 nm), ei LEDejä.

**Mekanistinen:**
- **Hamblin & Demidova 2006**, Proc SPIE Vol. 6140.
- **Chung et al. 2011**, Annals of Biomedical Engineering, 40(2):516-533.
- **Avci et al. 2013**, Semin Cutan Med Surg, 32:41-52.
- **Barolet 2008**, Semin Cutan Med Surg, 27:227-238.

**Dermalux Tri-Wave MD -spesifi:**
- **Naranjo & López Andrino 2023**, Photobiomodulation Photomedicine and Laser
  Surgery, 41(2):64-72. n=20 verisuonet/punoitus: 59 % vähennys hemoglobiini-
  alueessa 12 viikossa, IPL:ää vähemmän tehokas mutta paremmin siedetty (70 %
  LED-asiakkaista ei kipua vs. 100 % IPL kipu). DOI: 10.1089/photob.2022.0079.
  HUOM: pieni otos, valmistajan rahoittama.

**Ei käytetä lähteinä:** Aesthetic Technology Ltd 2020 (markkinointimateriaalia).

**Käytettävissä olevat maltilliset väitteet:**
- "LED-valohoidon tehosta aknessa on vahvaa systemaattista näyttöä" ✓
- "Sinisen valon vaikutus perustuu P. acnes -bakteerin porfyriinien
  fotoaktivaatioon" ✓
- "Punainen valo vähentää tulehdusta ja tukee paranemista" ✓
- "Mikroneulauksen jälkeisessä paranemisessa LED voi rauhoittaa ja nopeuttaa" ✓
- "LED kasvojen punoituksessa: lievempi mutta kivuttomampi kuin IPL" — alustava

**Väitteet joita EI saa esittää:**
- "Parantaa rosacean" — riittämätön näyttö
- "Poistaa pigmenttimuutokset" — vain in vitro (Kim 2012)
- "Yhtä tehokas kuin IPL" — Naranjo osoitti päinvastaista

### 14.9 Sisäinen linkitys (Vaihe 2)

Aknenhoito-pillarista → 3 polkua, `/proxn-kasvohoito.html`, `/led-valohoito.html`,
`/mikroneulaus-opas.html` (Polku 3 arpien hoidossa).

Aknearvet-pigmenttimuutokset linkittää: `/mikroneulaus-opas.html`,
`/mita-tutkimus-sanoo-mikroneulauksesta.html`, `/proxn-kasvohoito.html`,
`/led-valohoito.html`.

Mikroneulaus-pillariin lisätään lohko "Mikroneulauksen rooli aknearpien
hoidossa" → `/aknearvet-pigmenttimuutokset.html`.

### 14.10 Footer (Vaihe 2)

```
PALVELUT              TIETOA               ASIAKKAALLE
Mikroneulaus          Studiosta            Hinnasto
Aknenhoito            Tiimi                Ajanvaraus
ProXN-kasvohoito      Blogi                Ota yhteyttä
LED-valohoito                              Ehdot
                                           Tietosuoja
```

### 14.11 Blogistrategia (Vaihe 2)

Aknenhoito-klusterin uusia aiheita: akne ja sen tyypit, aknearpien hoito, PIH,
ProXN barrier-tukena, LED aknessa, rosacea ja couperosa, aknepotilaan kotihoito.

`blogi.html`:ään kategoriasuodattimet: Mikroneulaus, Aknenhoito, Yleistä.

### 14.12 Tekniset huomiot

**sitemap.xml (Vaihe 2 lisäys):** `/aknenhoito.html` (0.9),
`/aknenhoito-lieva.html` (0.7), `/aknenhoito-kohtalainen.html` (0.7),
`/aknearvet-pigmenttimuutokset.html` (0.7), `/proxn-kasvohoito.html` (0.7),
`/led-valohoito.html` (0.7).

**Schema.org:** BeautySalon `hasOfferCatalog`, sivukohtaiset BreadcrumbList,
MedicalProcedure / BeautyService per sivu.

**Hoitoloki (Vaihe 3, ei Vaihe 2):** `treatment_type`-kenttä:
"microneedling" | "proxn" | "led" | "mixed".

**Esitietolomake (suositus A):** yksi lomake kaikille, alkuvalinta "Mihin
haluat varata ajan?" → dynaamiset lisäkentät. Backend tukee jo.

### 14.13 Pro XN -koulutuksen kriittiset vahvistuskysymykset

Vastaukset ratkaisevat hinnoittelun ja palvelurakenteen ennen Vaihe 2:ta.

**Xanthohumol Recovery -käyttö:**
1. Jokaisessa ammattihoidossa vai valikoidusti?
2. Riittääkö 1 yksikkö per hoito, vai jaettuna?
3. Missä sarjan kohdassa? Alussa (intensiivi) vai keskellä?
4. Miten "moduloidut hoidot" rakentuvat 6 hoidon sarjassa?

**Muiden ammattituotteiden käyttömäärät:**
5. PHA Solution (60 €/30 ml) — paljonko per hoito?
6. Antioxidant Therapy (69 €/30 ml) — käyttömäärä?
7. Novel Peel (105 €/30 ml) — milloin käytössä? Aknepolulle vai erillinen?

**Integraatio muihin hoitoihin:**
8. ProXN + paikallisretinoidit/bentsoyyliperoksidi — sietoraja
9. ProXN + isotretinoiini (Polku 2)
10. ProXN + mikroneulaus — Antioxidant/Xanthohumol jälkihoitona vai erilliset?

**Logistiikka:**
11. Volyymialennukset yli aloituspakkausten?
12. Toimitusajat ja minimitilausmäärät
13. Xanthohumol box -yksiköiden säilyvyys avaamisen jälkeen?

### 14.14 LED-vahvistukset ennen sivun kirjoitusta

- LED + paikallislääkkeet (doksisykliini, isotretinoiini, valoherkistävät)
- LED + raskaus/imetys (Dermaluxin dokumentaatio)
- LED + autoimmuunisairaudet, epilepsia, fotoallergiat

### 14.15 Hinnoittelupäätökset ennen Vaihe 2:ta

- ProXN-kasvohoito: perustaso ~100–110 €, intensiivi ~160–175 €
- LED: perustaso 75 €, sarjana 65 €/hoito
- LED + ProXN -yhdistelmäpalvelut
- Aknepolun sarjapaketit (8 LED + ProXN)
- Kotihoitotuotteiden markkinakate 50–100 %

### 14.16 Vaiheistus

**Vaihe 1 (valmistelu):** koulutus + vahvistukset + hinnat lukittu.

**Vaihe 2 (rakentaminen, 1–2 vk):**
1. `/aknenhoito.html` pillar
2. 3 polkusivua
3. `/proxn-kasvohoito.html` + `/led-valohoito.html`
4. Nav (Mikroneulaus + Aknenhoito + Blogi + CTA)
5. `index.html` (uusi hero, filosofia, hoitopolkukortit, hinnasto pois)
6. `/mikroneulaus-opas.html` linkittämään aknearpisivuun
7. sitemap + schema
8. Footer (uudet sarakkeet)
9. `blogi.html` (kategoriat)
10. **`kysely.html` viimeistely** — laajenna mikroneulaus + ProXN + LED,
    poista noindex, lisää sitemapiin, palauta linkit
    `/mikroneulaus-sopiiko-minulle.html` ja `/mikroneulaus-sarjahoito.html`.

**Vaihe 3 (lanseeraus):** blogiartikkeli, some, GBP-päivitys,
mahdollinen sähköposti olemassa oleville.

**Vaihe 4 (jatkokehitys):** aknenhoidon blogiklusterin rakennus (1/kk),
hoitoloki kaikille tyypeille, lääkärivetoinen hoito omana alaosionaan.

### 14.17 Riskit

**Brändinarratiivi:** "mikroneulausstudio" → "kliininen ihonhoitostudio".
Etusivun copy täytyy harkita: esim. "Kliininen ihonhoito, joka tukee ihoa
eikä peitä sitä" tai "Ihon biologiaa kunnioittava kauneusstudio Kotkassa".

**Sisäinen linkitys:** Uusi pillar tarvitsee riittävästi sisäisiä linkkejä.

**Perustoiminta ensin:** Ennen aknenhoito-lanseerausta mikroneulauspalvelu
stabiili, ensimmäiset asiakaskokemukset käsitelty, hoitoloki toimii.
**Älä laajenna ennen kuin perusvirta toimii.**

**Vasta-aiheiden ristikkäisyys:** isotretinoiini (mikroneulaus + LED),
doksisykliini (LED), valoherkistävät (LED), autoimmuunisairaudet (LED),
epilepsia (LED), raskaus/imetys (LED, vahvistettava koulutuksessa).

### 14.18 Tarkistuslista ennen Vaihe 2:n rakennusta

- [ ] Kaikki [VAHVISTETTAVA]-kohdat Aknenhoitopolku v1.0:ssa vahvistettu
- [ ] Aknenhoidon ensikäynnin hinta päätetty
- [ ] ProXN-kasvohoidon hinta päätetty
- [ ] LED-sarjan lopullinen hinta päätetty
- [ ] Kotihoitotuotteiden hinnoittelu ja saatavuus
- [ ] LED:n vasta-aiheet vahvistettu Dermaluxin dokumentaatiosta
- [ ] Lääkäriohjauksen raja määritelty
- [ ] Lääkäriohjauksen prosessi sovittu
- [ ] Mikroneulauspalvelu vakaa
- [ ] Hoitoloki toimii moitteettomasti

### 14.19 Lääkärivetoinen hoito — Vaihe 3 (tulevaisuus)

Aknenhoitopolku v1.0 kohta 8: etälääkärin ihotautikonsultaatio, sairaanhoitajan
verikokeet studiossa, isotretinoiinin koordinointi. Selvästi erillinen vaihe.

Vaatii: uusi alaosio "Lääketieteellinen ihonhoito", top nav -laajennus tai
hampurilainen, LED:n vasta-aiheiden päivitys (isotretinoiinin yhteensopivuus),
hoitolokin laajennus, GDPR ja potilastietolainsäädäntö.

---

## 15. Muutosloki

Kronologinen loki muutoksista tähän tiedostoon. Uusimmat ylimpänä. Claude
päivittää tätä automaattisesti jokaisen istunnon päätteeksi jos on tehty
muutoksia.

### 2026-07-16 (seitsemäs eräpäivä samana päivänä)
- **Uusi kirjoitustyyliohje lisätty lukuun 5 (Brändi ja visuaalisuus)**:
  vältetään ajatusviivaa (— ja –) suomenkielisessä sisällössä. Suomessa
  näitä käytetään harvoin, toisin kuin englannissa. Käytä pilkkua,
  kaksoispistettä, puolipistettä, sulkeita tai erillistä virkettä. Ajatusviivan
  käyttö sallitaan vain teknisessä muodossa (numeroalueet kuten "3–6 kuukautta"
  tai "SPF 30–50"). Ohje koskee kaikkia asiakkaalle näkyviä tekstejä
  (blogit, sivukuvaukset, meta-tagit, CTA:t).
- **Korjattu `mikroneulauksen-jalkihoito.html`**: kaikki 13 em-dashiä
  poistettu ja korvattu pilkuilla, kaksoispisteillä tai erillisillä virkkeillä.
  Käyttäjän erikseen mainitsema virke "Kummallakaan ei tarvitse olla iso
  ero — pienet valinnat ratkaisevat" muotoiltu uudelleen: "Näiden kahden
  lopputuloksen välinen ero ei aina synny suurista tekemisistä; pienet
  päivittäiset valinnat ratkaisevat." Kaikki 19 en-dashiä (numeroalueet)
  säilytettiin.

### 2026-07-16 (kuudes eräpäivä samana päivänä)
- **Julkaistu uusi blogiartikkeli `mikroneulauksen-jalkihoito.html`**:
  "Mikroneulauksen jälkihoito: käytännönläheinen opas 24 tunnista 30 päivään".
  Täyttää puuttuvan klusterikohdan pillar-artikkelin "Mitä hoidon jälkeen
  tapahtuu" -osiolle. 10 h2-otsikkoa: miksi jälkihoito ratkaisee, ensimmäiset
  24 h, päivät 1–3, päivät 4–7, viikot 2–4, UV-suoja koko sarjan ajan, mitä
  välttää sarjan aikana, hälytysmerkit, kotihoidon rooli, yhteenveto-
  tarkistuslista. Rekisteröity: sitemap.xml (priority 0.8), layout.js
  BLOG_PAGES, blogi.html-listaus (uusin ensin). Cross-linkit lisätty
  pillariin ja ensikäynti-artikkeliin luontaisissa kohdissa (ei väkisin).
  Sisäiset linkit: sarjahoito (neljän viikon välit), talvella (UV-yhteys),
  pillar-opas (kokonaiskuva).
- Luku 7 (Sivut nykyisin) päivitetty: 15 asiakassivua (13 → 14 → 15,
  kun 404 ja jälkihoito lisätty aiemmin ja nyt).

### 2026-07-16 (viides eräpäivä samana päivänä)
- **Blogi-analyysi tehty**: käyty läpi pillar (`mikroneulaus-opas.html`) +
  8 klusteriartikkelia. Tunnistettu selkeästi puuttuva kluster: pillar-osio
  "Mitä hoidon jälkeen tapahtuu" ei ole omana syväartikkelinaan. Lisätty luku 9
  (Tulevat toimenpiteet) uusi "Blogisisältöjono" -osio jossa priorisoidut
  ehdotukset seuraaville artikkeleille:
  1. `mikroneulauksen-jalkihoito.html` (ensisijainen — täyttää puuttuvan
     klusterin, ei riippuvuutta uusista palveluista)
  2. `mikroneulaus-aknearvet.html` (strateginen silta Vaihe 2:lle,
     palvelee jo saavutettua "aknen hoito kotka" -sijoitusta)
  3. `mikroneulaus-muut-alueet.html` (mahdollinen — vaatii vahvistuksen
     että kaula/dekoltee/kädet ovat palveluvalikoimassa)
- **Korjattu PROJECT.md luvun 14.2 alusta** joka oli rikkoutunut
  aiemmasta bash-testistä ("luonteeTESTAA" → "luonteeltaan erilaisia:").
- **`⚠️ CLAUDELLE` -ohjeeseen lisätty erityisohje faktatietojen
  tallennuksesta** (edellinen istunto, mutta ei ollut vielä muutoslokissa
  erillisenä merkintänä). Käyttäjä pyysi että kaikki uudet faktatiedot
  tallentuvat automaattisesti ilman erillistä pyyntöä. Lisätty myös uusi
  luku 0 (Tietolista) joka näyttää yhdellä silmäyksellä mitkä keskeiset
  faktat ovat tallessa ja mitkä puuttuvat.

### 2026-07-16 (neljäs eräpäivä samana päivänä)
- **SEO / hakutuloksen nimi**: lisätty `og:site_name`, `application-name` ja
  uusi `WebSite` JSON-LD -schema etusivulle jotta Google näyttäisi hakutuloksessa
  "Mahlamäen Kauneusstudio" domain-nimen sijaan. `og:site_name` lisätty myös
  kaikille 10 muulle asiakassivulle yhtenäisyyden vuoksi. Muutos näkyy 1–4 viikossa
  Googlen indeksointisyklin mukaan; Search Consolen kautta voi pyytää
  uudelleenindeksoinnin nopeuttamiseen.
- **Some- ja hakukonekanavat lisätty PROJECT.md lukuun 1**: Google Business
  Profile ja Instagram-tili ovat jo olemassa. Ohjeistus Claudelle: ei ehdoteta
  perustamista uudelleen (mutta konkreettisia toimenpide-ehdotuksia voi tehdä).
- **Kuvausaika sovittu**: käyttäjä saa kuvia studiosta, itsestään ja
  sairaanhoitajastaan.
- **Vastuusairaanhoitaja lisätty lukuun 1 (Tiimi-alaotsikko)** implisiittisenä
  tietona jota sivustolla jo kerrotaan ("terveydenhuollon ammattilaiset",
  "yli 20 vuoden kokemus"). Konkreettiset tiedot merkitty [TÄYDENNETTÄVÄ]-
  paikkamerkeillä (nimi, tutkinto, kokemusalue, rooli, sertifioinnit) ja ne
  täydennetään ennen kuvausta jotta sivuston tiimi-osio voidaan kirjoittaa
  oikeilla tiedoilla. Sama koskee yrittäjän (Jaakko Sandström) omaa taustaa.

### 2026-07-16 (kolmas eräpäivä samana päivänä)
- **Sivustokatselmus tehty koko sivustolle**. Tunnistetut ongelmat korjattu:
  - **7 blogisivun CTA-otsikko** yhtenäistetty: "Varaa ensikäynti" →
    "Aloita ensikäynnillä" — toimii sekä postponed että avoin -tilassa
    (aiemmin jo tehty milloin-aloittaa- ja mikroneulaus-talvella.html).
    Muutetut: mikroneulaus-opas, mikroneulaus-sarjahoito, mikroneulaus-sopiiko-
    minulle, mikroneularulla-vai-kliininen-mikroneulaus, mita-ensikaynnilla-
    tapahtuu, mita-on-kliininen-mikroneulaus, mita-tutkimus-sanoo-
    mikroneulauksesta. Lisätty CTA-p:hen: "Jonotuslistalaisille ilmoitamme
    avajaispäivän ensimmäisenä."
  - **index.html FAQ 05** ("Kuinka varaan ajan?") + JSON-LD FAQPage schema
    päivitetty neutraalimmaksi joka toimii postponed + open -tiloissa
    ("painike joka ohjaa Timmaan" + selitys että ohjaa jonotuslistalle nyt,
    varauskalenteriin avautumisen jälkeen).
  - **mikroneulaus-sopiiko-minulle.html rivi 295** leipäteksti: "Varaa
    ensikäynti" → "Varaa ensikäynti — tai liity jonotuslistalle jos studio
    ei ole vielä auki".
  - **privacy.html perusteellinen siivous**: poistettu 9 kohtaa jotka
    liittyivät ennakkovaraus- ja Stripe-järjestelmään (ei ollut koskaan
    aktiivista käytössä). Poistetut: maksukortti-lista käsiteltävistä
    tiedoista, "Emme tallenna korttitietoja" -maininta, Stripe Payments
    Europe -datankäsittelijämerkintä, "Ennakkovarauksen tiedot"
    -säilytysaika-p, koko "Korttitietojen käsittely" -osio (h2+p), PCI DSS
    -kohta Tietoturva-listasta, Stripe-evästemaininta, "Ennakkovarauksen
    peruuttaminen" -oikeus-p. Muokattu: Resend-kuvaus (poistettu "ennakko-
    varauksen vahvistus, peruutusvahvistus" -viittaukset). Datankäsittelijät
    nyt: Supabase, Resend, Cloudflare, Timma (ei Stripeä).
- Aiemmat tänään tehdyt jäävät edelleen voimaan (ks. alempi merkintä).

### 2026-07-16 (myöhemmin samana päivänä)
- **Luotu `/404.html`** — brändin mukainen virhesivu Cloudflaren yleisen sivun
  sijaan. Käyttää jaettua style.css ja layout.js -mekaniikkaa (nav + footer
  injektoituvat oikein). Sivun sisältö: iso 404, "Etsimääsi sivua ei löytynyt"
  -otsikko, selitys + kehotus ilmoittaa jos linkki toistuu, kaksi CTA:ta
  (etusivulle + blogiin). Meta robots: noindex, follow.
- **Päivitetty `index.html`:n BeautySalon JSON-LD schema**:
  - Poistettu `openingHoursSpecification` (Ma–Su 10–22) koska studio ei ole
    vielä avoinna — vältetään väärän tiedon näyttäminen Googlessa.
  - Lisätty `hasOfferCatalog` joka listaa palvelut (Ensikäynti 200 €,
    Sarjahoito 3× 570 €, Sarjahoito 6× 1080 €). Kun studio avautuu ja on aika
    lisätä aukioloajat takaisin, tehdään myös sen jälkeen.
- **Sivustorakenne päivittynyt luvussa 7**: 14 asiakassivua (13 nykyistä + 404).

### 2026-07-16
- Tiedosto luotu. Sisältää studion perustiedot, vesivahingon nykytilanteen,
  yläkerran remonttiaikataulun, Pro XN -tuotesarjan valinnan perusteluineen,
  brändin design-tokenit, teknisen arkkitehtuurin, 13 asiakassivua, poistetun
  ennakkovarausekosysteemin, tulevat sivut, marraskuun talvi-artikkelin
  julkaisulistan.
- Vahva "päivitä itsenäisesti" -ohje lisätty tiedoston alkuun.
- **Vaihe 2 -suunnitelma (aknenhoito-lisäys) sulautettu luvuksi 14**
  alkuperäisestä `SITE_ARCHITECTURE_PHASE2.md`-tiedostosta (kesäkuu 2026).
  Alkuperäinen tiedosto poistettu. Sisältää: aknenhoito-pillar 3 polulla,
  ProXN- ja LED-menetelmäsivut, navigaation muutos, etusivun uudelleenajattelu,
  LED-hoidon täydellinen tutkimusnäyttö (9 lähdettä), Pro XN -koulutuksen 13
  vahvistuskysymystä, tarkistuslista.

---

**Viimeksi päivitetty**: 2026-07-16 (seitsemäs eräpäivä)
