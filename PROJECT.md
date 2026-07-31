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

### Erityisohje kolmannen osapuolen palveluista (kriittinen)

**Ennen kuin ehdotan mitään ominaisuutta, asetusta tai toimintoa
kolmannen osapuolen palvelussa, tarkistan ajantasaisesta
dokumentaatiosta että se on olemassa.**

Koskee kaikkia palveluita joita projektissa käytetään: Meta Business
Suite, Instagram, Facebook, Timma, Cloudflare, Google Business
Profile, Fonecta, Duallaser ja mikä tahansa muu.

Miksi tämä on kriittistä: käyttäjä toimii ohjeideni mukaan ja etsii
mainitsemiani kohtia käyttöliittymästä. Jos ominaisuutta ei ole,
hänen aikansa menee hukkaan ja luottamus ohjeisiin heikkenee.
Käyttöliittymät muuttuvat jatkuvasti, eikä koulutusdatani ole
luotettava lähde nykytilasta.

**Käytännön sääntö:**
- Muistikuva ei riitä perusteeksi
- "Se on tyypillisesti kohdassa X" ei riitä perusteeksi
- Haen ajantasaisen ohjeen ja tarkistan sen ennen ehdotusta
- Jos en löydä varmistusta, sanon sen suoraan enkä arvaa
- Jos ehdotan silti epävarmana, merkitsen epävarmuuden selvästi

**Tausta:** kirjattu 28.7.2026 sen jälkeen kun ehdotin Facebookin
usein kysytyt kysymykset -automaatiota tarkistamatta ensin että se
on nykyisessä käyttöliittymässä olemassa. Käyttäjä etsi sitä turhaan.
Jälkikäteen tarkistettuna ominaisuus oli olemassa, mutta arvaus olisi
voinut yhtä hyvin osua väärään.

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
- ✅ Yrittäjän ammatti: lähihoitaja
- ✅ Yrittäjän kokemus: 20 vuoden kokemus kauneudenhoidon parissa,
  pitkä kokemus erikoissairaanhoidossa kirurgisessa hoitotyössä
  (mm. verisuonikirurgian haavanhoito)
- ✅ Yrittäjän rooli studiossa: hoitaja
- ✅ MicroPen EVO Certificate Course suoritettu 24.5.2026 (Revance Academy)
- ✅ Vastuuhoitajan nimi: Petra Sahari
- ✅ Vastuuhoitajan tutkinto: sairaanhoitaja (AMK)
- ✅ Vastuuhoitajan kokemustausta: pitkän linjan yrittäjä sote-alalla,
  laajaa osaamista aseptiikasta ja turvallisesta hoitotyöstä
- ✅ Vastuuhoitajan rooli studiossa: vastuuhoitaja, ei osallistu hoitojen
  toteutukseen
- ✅ Sijainti (Kotkan Ruonala)
- ✅ Aukioloajat: arkisin 14–20, viikonloppuisin 10–20

**Palvelut ja hinnoittelu**
- ✅ Ensikäynti (200 €)
- ✅ Mikroneulaus 3× sarja (570 €), 6× sarja (1080 €)
- ❓ Pro XN -jatkohoidon lopullinen hinta
- ✅ LED-laitteen malli lukittu: Dermalux Flex MD
- ✅ LED-hoidon hinnasto lukittu 2026-07-23: kerta 85 €, 8× sarja 640 €
  (80 €/hoito), 12× sarja 900 € (75 €/hoito), lisäpalvelu 35 €

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
- ✅ Google Workspace: sähköposti asiakaspalvelu@studiomahla.fi
- ✅ Domainhotelli: domain-rekisteröinti ja DNS
- ✅ Dermalux Flex MD: LED-valohoidon laite (valmistaja Aesthetic Technology
  Ltd, UK). Suomen maahantuoja vahvistettava.
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

**Jaakko Sandström** — hoitaja
- Lähihoitaja
- 20 vuoden kokemus kauneudenhoidon parissa
- Pitkä kokemus erikoissairaanhoidossa kirurgisessa hoitotyössä,
  mm. verisuonikirurgian haavanhoidosta. Kirurgisen hoitotyön
  kokemus ja haavanhoidon ymmärrys tukevat osaamista ihon
  ongelmien hoidossa ja ihon uudistumisessa.
- MicroPen EVO Certificate Course suoritettu 24.5.2026
  (Revance Academy).

**Petra Sahari** — vastuuhoitaja
- Sairaanhoitaja (AMK)
- Pitkän linjan yrittäjä sosiaali- ja terveydenhuoltoalalla
- Tuo studioon laajan osaamisen aseptiikasta ja turvallisesta
  hoitotyöstä
- Ei osallistu hoitojen toteutukseen. Vastuuhoitajan rooli.

Sivustolla viestitään "terveydenhuollon ammattilaiset toteuttamana" ja
"yli kahdenkymmenen vuoden kokemus". Nämä molemmat pitävät paikkansa
Jaakon taustan pohjalta ja voidaan säilyttää.

### Tiimi-esittelyn valmis luonnos etusivun tiimi-osiota varten

Julkaistaan vasta kuvien kanssa (viikko 30/2026). Luonnos säilytetään
tässä siihen asti:

**Jaakko Sandström, lähihoitaja** (julkaistu etusivulla 31.7.2026)

"Studiolla hoitajana toimii lähihoitaja Jaakko Sandström. Jaakolla on
kahdenkymmenen vuoden kokemus kauneudenhoidon parissa. Sen rinnalla hän
on työskennellyt pitkään erikoissairaanhoidossa kirurgisessa
hoitotyössä.

Kirurgisessa hoitotyössä ja erityisesti verisuonikirurgian
haavanhoidossa työn ytimessä on rikkinäinen iho: miten se paranee, mikä
paranemista hidastaa ja miten tulehdusriskiä hallitaan. Mikroneulaus
perustuu samaan lähtökohtaan, sillä hoidossa ihoon tehdään hallitusti
pieniä mikrokanavia. Kyse on tarkoituksellisesta ja tarkasti rajatusta
ihovauriosta.

Käytännössä tämä näkyy kolmessa asiassa. Aseptiikka eli hoidon puhtaus
on rutiinia, ei erillinen työvaihe. Hoidon jälkeisen ihon
erityispiirteet ovat ennestään tuttuja, joten jälkihoidon ohjeistus
perustuu siihen mitä iholla todella tapahtuu. Ja koska ihon paranemisen
vaiheet ovat tuttuja, hoidon voimakkuus ja hoitovälit mitoitetaan sen
mukaan mitä iho kestää.

Studiossa käytettävään MicroPen EVO -laitteeseen Jaakolla on Revance
Academyn koulutus ja sertifikaatti."

**Miksi tämä muotoilu:** kirurgisen hoitotyön tausta ei ole pelkkä
ansioluettelon rivi vaan suoraan tähän hoitomuotoon liittyvä osaaminen.
Yhteys tehdään näkyväksi: mikroneulaus tuottaa tarkoituksellisen
ihovaurion, ja juuri sen hoitaminen on kirurgisen hoitotyön ydinosaamista.
Kolme konkreettista seurausta (aseptiikka, hoidon jälkeisen ihon
tuntemus, paranemisen vaiheiden ymmärrys) tekevät väitteestä
tarkistettavan sen sijaan että se jäisi yleiseksi kehuksi.

**Petra Sahari, sairaanhoitaja (AMK)**
"Studion vastuuhoitajana toimii sairaanhoitaja (AMK) Petra Sahari. Petra
on pitkän linjan yrittäjä sosiaali- ja terveydenhuoltoalalta. Hän tuo
studioon laajan osaamisen aseptiikasta ja turvallisesta hoitotyöstä."

### Some- ja hakukonekanavat (olemassa)

**Google Business Profile**: perustettu. Älä ehdota perustamista.
Päivityksiä hoidetaan Fonectan kautta.

Google Business Profile -esittelyteksti (voimassa 23.7.2026 alkaen,
n. 460 merkkiä):

> Mahlamäen Kauneusstudio on kliinisen tason ihonhoitoon erikoistunut
> studio Kotkan Ruonalassa. Toteutamme kaikki hoidot terveydenhuollon
> ammattilaisen työnä. Erikoistumisalueitamme ovat aknen ja sen oireiden
> hoito, ärtynyt ja herkkä iho sekä ikääntymisen merkit.
>
> Kliinisessä mikroneulaushoidossa käytämme FDA-hyväksyttyä ja
> CE-merkittyä (luokka IIa) MicroPen EVO -laitetta. Hoito käynnistää
> ihon oman kollageenin- ja elastiinintuotannon ilman vieraita aineita,
> ja tulokset ovat pysyviä.

Päivitetään kun ProXN otetaan käyttöön ja LED-valohoito syksyllä.

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

### Mikroneulauksen lisäalueet (päätetty 28.7.2026)

Myydään **vain lisäpalveluna** kasvojen mikroneulaushoidon
yhteydessä, ei itsenäisenä hoitona.

| Alue | Hinta |
|---|---|
| Kaulan alue | 35 € |
| Dekolteen alue | 35 € |
| Kämmenselät | 35 € |

**Miksi vain lisäpalveluna:** alueet hoidetaan samalla käynnillä,
jolloin puhdistus, iho-analyysi, valmistelu ja jälkihoito-ohjeistus
on jo tehty. Erillisenä hoitona sama alue veisi koko käynnin
verran aikaa eikä 35 € kattaisi sitä.

**Hinta on linjassa** LED-lisäpalvelun kanssa (myös 35 €), joten
lisäpalveluilla on yksi selkeä hintapiste.

**Perustelu sisällöllisesti:** kaula, dekoltee ja kädet vanhenevat
näkyvästi ja niitä hoidetaan usein liian vähän. Ne ovat myös
alueita joilla asiakas itse huomaa eron. Lisäalueet ovat siksi
luonteva ehdotus kasvohoidon yhteydessä eivätkä koe lisämyynniltä.

**Ajankäyttö:** enintään 20 min per alue, käytännössä vähemmän.

**Sisältösääntö näiden alueiden kuvauksissa (28.7.2026).** Älä
perustele lisäalueita väitteellä "kaulalla käytetään pienempää
neulasyvyyttä". Se ei pidä aina paikkaansa: jos asiakkaan iho on
herkkä, pienintä syvyyttä käytetään jo kasvoilla, jolloin kaulalla
ei ole varaa mennä alemmas.

Fysiologisesti kestävä perustelu on toinen: kaulassa, dekolteessa
ja kämmenselissä on vähemmän talirauhasia ja karvatuppeja kuin
kasvoissa. Mikroneulauksen jälkeen ihon pinta uusiutuu osittain
juuri näistä rakenteista käsin, joten näillä alueilla paraneminen
on hitaampaa. Tästä seuraa varovaisempi eteneminen, mikä on totta
riippumatta siitä mitä syvyyttä asiakkaan kasvoilla käytetään.

Sanamuoto: "alueella edetään varovaisemmin ja hoidon voimakkuus
mitoitetaan erikseen", ei "käytetään pienempää syvyyttä".

**Sarja-alennus:** lisäalueisiin sovelletaan samaa porrastusta kuin
mikroneulaussarjoihin, eli 5 % kolmen hoidon sarjassa ja 10 %
kuuden hoidon sarjassa.

| Ostotapa | Yhteensä | Per kerta | Tuntikate 15 min | Tuntikate 20 min |
|---|---|---|---|---|
| Kertahoito | 35,00 € | 35,00 € | 140 €/h | 105 €/h |
| 3 hoidon sarja | 99,75 € | 33,25 € | 133 €/h | 99,75 €/h |
| 6 hoidon sarja | 189,00 € | 31,50 € | 126 €/h | 94,50 €/h |

**Huomio minimikatteesta:** jos alue vie täydet 20 minuuttia,
sarja-alennus painaa tuntikatteen hieman alle 100 €/h rajan. 15
minuutissa kaikki vaihtoehdot ovat selvästi rajan yläpuolella.

Tätä ei pidetä ongelmana, koska minimikate 100 €/h asetettiin
kokonaiselle käynnille. Lisäalue ei sisällä erillistä ajanvarausta,
iho-analyysiä, valmistelua eikä siivousväliä, vaan käyttää aikaa
joka on jo varattu ja maksettu. Marginaalinen lisäaika ei ole
verrattavissa itsenäiseen hoitoon.

**Hoitopää: sama riittää kaikille alueille samalla käynnillä
(vahvistettu 28.7.2026).** Tämä on koko hinnoittelun perusta.
Lisäalueesta ei synny lainkaan muuttuvaa kustannusta, vaan
ainoastaan ajankäyttöä. Siksi 35 € on mahdollinen hinta.

Käytännön seuraus: lisäalueiden kate on lähes puhdasta katetta.
Jokainen myyty lisäalue parantaa käynnin kannattavuutta enemmän
kuin sen hinta suhteessa kasvohoitoon antaisi olettaa. Lisäalueet
kannattaa siis mainita järjestelmällisesti kaikille asiakkaille,
ei vain silloin kun asiakas itse kysyy.

### Pro XN -jatkohoidot
- Hinta myöhemmin päätettävissä (n. 170–180 € voisi olla sopiva)
- Voidaan myydä myös kotihoitotuotteita asiakkaille (retail-marginaali)

### LED-valohoito

**Laite lukittu (2026-07-23): Dermalux Flex MD.** Ei enää epävarma "ehkä
tulee" -tila. Malli hankitaan valikoimaan varmuudella. Aikataulu ja tarkka
tilauspäivä avoinna, mutta suunnittelu voi edetä varmuuden pohjalta.

**Miksi Flex MD (eikä Tri-Wave MD):**
- Joustava paneelirakenne — voidaan käyttää samassa hoitohuoneessa
  mikroneulauksen kanssa ilman erillistä LED-huonetta
- Sama Dermalux-teknologia ja samat aallonpituudet (blue 415 nm,
  red 633 nm, near-infrared 830 nm), joten valmistajan kliininen näyttö
  pätee myös Flex MD -mallille
- CE-lääkintälaite (Class IIa), lääketieteellinen laatu
- Kompaktimpi ja mobiilimpi kuin stationäärinen Tri-Wave MD
- Sopii pieneen studioon jossa hoitohuoneita on rajallinen määrä

**Rooli palvelurakenteessa:**
- Aknepolku 1 (lievä akne): 8 hoidon sarja itsenäisenä pääpalveluna
- Aknepolku 2 (kohtalainen akne): sarjan lisäksi ProXN-yhdistelmä
- Mikroneulauksen jälkihoito: punainen valo tukee ihon paranemista ja voi
  vähentää punoitusta
- Herkkä iho ja rosacea: punainen valo + NIR matalalla annoksella
- Kollageeni-intensiivi ja pitkäaikainen aknehoito: 12 hoidon sarja
- Yksittäinen lisäpalvelu (35 €) mikroneulauksen tai muiden käyntien
  yhteydessä

**Hinnasto (lukittu 2026-07-23):**
- Kertahoito: **85 €** (45 min: puhdistus, 30 min LED, voide + hieronta)
- 8× sarja: **640 €** (80 €/hoito, alennus 5,9 %)
- 12× sarja: **900 €** (75 €/hoito, alennus 11,8 %)
- Lisäpalvelu mikroneulauksen yhteydessä: **35 €** (25 min lisä, puhdistus
  tehty jo mikroneulauksen alussa)

**Hinnoittelun logiikka:**
- Ehdoton minimikate 100 €/h alvillisena (kotona työskentelevä yrittäjä,
  ei vuokra- eikä matkakuluja)
- 12× sarja (75 €/45 min) osuu tarkalleen minimirajalle
- 8× sarja ja kerta ovat marginaalisesti sen yläpuolella
- Kertahoito toimii sisäänheittotuotteena joka ohjaa sarjaan
- Sarjaporrastus 8 ja 12: tutkimusnäytön (Ngoc 2023, Akuffo-Addo 2024,
  Dermaluxin oma protokolla) ja Suomen medical LED -konsensuksen
  mukainen (EL-Salonki, NUUD Helsinki, Kajo, Kauneushoitola Maarit
  käyttävät kaikki 8-12 hoidon sarjaa)
- Muuttuvat kustannukset per hoito n. 1 € (puhdistus + hoitovoide)
- Laitteen kuoletus 45 sarjahoidolla (2900 € / 65 € nettokate)

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

### Terminologia ja selkokielisyys

Sivuston kohdeyleisö on aikuinen kuluttaja, joka ei välttämättä tunne
lääketieteellistä tai kosmetologista terminologiaa mutta ei ole myöskään
lapsi. Tavoite on selkeä asiantunteva teksti jossa vaikeat termit avataan
mutta ei aliarvioida lukijaa.

**Perussääntö: termi (selitys) ensimmäisellä kerralla, sitten pelkkä termi**

Jos tieteellinen tai lääketieteellinen termi on yleisesti käytössä
suomen kielessä, se säilytetään ja avataan ensimmäisellä esiintymisellä
sulkeissa. Sen jälkeen käytetään pelkkää termiä. Esimerkkejä:

- flavonoidi (kasviperäinen yhdiste)
- antioksidantti (soluvaurioita ehkäisevä aine)
- retinoidit (A-vitamiinijohdannaiset)
- AHA (alfahydroksihappo)
- PHA (polyhydroksihappo)
- sytokiinit (tulehdusta edistävät viestimolekyylit)
- matriksimetalloproteinaasit (ihon rakennetta hajottavat entsyymit)
- oksidatiivinen stressi (vapaiden radikaalien kuormitus)
- syklodekstriinikompleksi (patentoitu kantajarakenne)
- invasiivinen (kajoava)
- reaktiivinen (helposti reagoiva)
- jälki-inflammatorinen pigmentaatio (tulehduksen jälkeen jäävät tummumat)
- seborrooinen dermatiitti (rasvaisen ihon tulehdus)

**Käänteinen muoto: suomennos ensin, tieteellinen sulkeissa**

Jos suomennos on suomen kielessä yleisemmässä käytössä kuin tieteellinen
termi, suomennos on ensin ja tieteellinen ilmaus sulkeissa. Esimerkkejä:

- tulehdusta rauhoittava (anti-inflammatorinen)
- ruusufinni (rosacea)
- aknebakteeri (Cutibacterium acnes)

**Pelkkä termi ilman selitystä**

Jos termi on niin yleisessä käytössä, että sen selittäminen aliarvioisi
lukijaa, sitä ei selitetä. Esimerkkejä:

- antibakteerinen
- atooppinen ihottuma
- couperosa (tosin kannattaa avata "näkyvät hiussuonet ja pysyvä
  punoitus" jos konteksti sen sallii)
- kollageeni, elastiini

**Pelkkä selkokielinen ilmaus ilman termiä**

Jos tieteellinen termi ei tuo lisäarvoa kuluttajalle tai on hankalasti
tavoitettava, käytetään pelkkää selkokielistä ilmausta. Esimerkkejä:

- "laboratoriotutkimuksissa" (ei "in vitro")
- "valolle herkistävä lääkitys tai valoallergia" (ei "fotoallergiat")
- "ihon oma suojakerros" (ei "suojaeste" tai "barrier")
- "tarkoin valitut vaikuttavat aineet" (ei "synergiset aktiiviaineet")

**Ainesosaluettelot**

Vaikuttavien aineiden luetteloissa käytetään nimeä ja lyhyttä
käyttökohde-selitystä sulkeissa. Esimerkkejä:

- atselaiinihappo (aknen ja punoituksen hoito)
- laktobionihappo (PHA eli polyhydroksihappo, hellävarainen kuorintahappo)
- niasiiniamidi (B3-vitamiini, ihon oman suojakerroksen tuki)
- Relipidium&trade;-yhdistelmä (ihon rasvojen kaltainen yhdistelmä)
- skvalaani (ihon oman rasvan kaltainen ainesosa)

Yleisemmät ainesosat (sheavoi, kauranjyväuute, ektoiini) voidaan mainita
ilman selitystä jos konteksti tekee niiden roolin selväksi.

**Vältä anglismeja jos kelvollinen suomennos on olemassa**

- suojakerros (ei barrier)
- tuote (ei formulaatio)
- premium-brändit ja premium-hoitolinjat ovat sallittuja, koska ne ovat
  vakiintuneita markkinointitermejä joita kuluttaja ymmärtää
- retail-tuote → "myyntiin tuleva tuote" tai "kotihoitotuote"

**Studion nimi tekstissä**

- Käytä "**Mahlamäen Kauneusstudio**" kun mainitaan koko nimi
- Käytä "**studio**" tai "**studiossamme**" kun viitataan yleisesti
- Älä käytä "Studio Mahla" tai "studiomahla" tekstissä. Nämä ovat
  brändin tai domainin lyhenteitä, eivät virallisia muotoja.
- Poikkeus: URL:t (studiomahla.fi, varaa.timma.fi/studiomahla,
  asiakaspalvelu@studiomahla.fi) ovat teknisiä osoitteita ja säilyvät

**Kohderyhmäkuvausten muotoilu**

Kun kuvataan mihin jokin hoito sopii, mainitaan sekä studion kolme
ihonhoidon painopistettä (akne ja sen oireet, ärtynyt ja herkkä iho,
ikääntymisen merkit) että konkreettiset lääketieteelliset tai
kosmetologiset tilanteet joihin hoito soveltuu (esim. ruusufinni,
atooppinen ihottuma, seborrooinen dermatiitti, jälki-inflammatorinen
pigmentaatio, palautuminen invasiivisista hoidoista). Näin kuluttaja
löytää sekä oman huolensa nimen että ymmärtää studion filosofian.

**Tarkistuslista uuden tekstin kirjoituksen jälkeen**

1. Ei ajatusviivoja (paitsi numeroalueissa)
2. Ei "Studio Mahla" tai "studiomahla" tekstissä (URL:issa OK)
3. Kaikki tieteelliset termit avattu ensimmäisellä kerralla
4. Ei tarpeetonta anglismia (barrier, formulaatio, retail)
5. Kohderyhmäkuvauksissa mainittu sekä studion painopisteet että
   konkreettiset tilanteet

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
├── tuotanto/            (EI VIEDÄ GITHUBIIN, ks. tuotanto/LUE-TAMA.md)
│   ├── generaattorit/   (karuselli.py, reels.py, logo.py, pistoskulma.py)
│   ├── fontit/          (Cormorant Garamond, Jost)
│   ├── karusellit/      (valmiit diat)
│   ├── reels/           (valmiit videot)
│   ├── kansikuvat/      (Facebook-kansikuvat)
│   └── julkaisut/       (yksittäiset kuvajulkaisut)
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
- **mikroneulaus-kaula-dekoltee-kadet.html** — lisäalueet: kaula, dekoltee, kämmenselät (julkaistu 28.7.2026)
- **proxn-kasvohoito.html** — ProXN-kasvohoito (ei vielä linkitetty navigaatiosta)
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
on tilattu ja Dermalux Flex MD on hankittu (laitteen malli lukittu 2026-07-23,
tilausajankohta vielä avoinna).

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

### Blogiartikkeli: mikroneulauksen lisäalueet — TEHTY 28.7.2026

**Julkaistu tiedostona `mikroneulaus-kaula-dekoltee-kadet.html`.**
Alla oleva suunnitelma on tallessa perusteluineen. 967 sanaa.

Linkitykset toteutettu: blogi.html (kortti), sitemap.xml,
etusivun Lisäpalvelut-osio, mikroneulaus-opas.html (kohta kenelle
hoito sopii) ja mikroneulauksen-jalkihoito.html (UV-suojaosio).

Kaksi kohtaa poistettiin käyttäjän pyynnöstä ennen julkaisua:

1. Kappale jossa todettiin ettei pigmenttimuutosten häviämistä
   luvata. Näyttö on ristiriitaista, mutta hoitoa voidaan silti
   tarjota jos asiakas haluaa kokeilla. Asiaa ei mainita sivulla.
2. Kappale jossa perusteltiin miksi lisäalue myydään vain
   lisäpalveluna (asiakas jo paikalla, valmistelut tehty).
   **Perustelu oli oikea mutta kuulosti liiketoimintaperustelulta
   eikä asiakaslähtöiseltä.** Tämä on hyvä muistisääntö
   jatkossakin: sisäinen kannattavuuslogiikka ei kuulu
   asiakastekstiin, vaikka se olisi totta.

**Perustelu:** näille alueille ei ole vielä yhtään sisältöä, ja
hakusanat kuten "kaulan mikroneulaus" ja "käsien ikääntyminen"
ovat kilpailullisesti kevyempiä kuin pääsanat. Artikkeli antaa myös
lisäpalveluille paikan johon linkittää etusivulta ja Timmasta.

**Kärki:** miksi nämä alueet jäävät hoitamatta vaikka ne
vanhenevat näkyvästi. Kasvoja hoidetaan, kaula ja kädet unohtuvat,
ja lopputulos on epäsuhta.

**Fysiologinen ydin** (sama kuin Timman kuvauksissa, laajemmin):
kaikilla kolmella alueella on vähemmän talirauhasia ja
karvatuppeja kuin kasvoissa. Koska ihon pinta uusiutuu
mikroneulauksen jälkeen osittain näistä rakenteista käsin,
paraneminen kestää pidempään ja alueilla edetään varovaisemmin.
**Ei väitettä pienemmästä neulasyvyydestä** (ks. luku 3
sisältösääntö).

**Ristiinlinkitykset:** pillar-artikkeli, sarjahoito, jälkihoito.
Etusivun Lisäpalvelut-osiosta linkki tänne.

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

### Meta-hallinnan käyttöönotto (elokuu 2026)

Päätös 2026-07-23: Meta (Facebook + Instagram) otetaan haltuun omaan
hallintaan. Instagram-tili on jo olemassa. Facebook-tiliä ei ole
(käyttäjä poistui Facebookista aiemmin), mutta se on teknisesti
pakollinen: Meta Business Suite ja Instagram-yritystilin mainonta
edellyttävät Facebook-yrityssivua, joka puolestaan edellyttää
henkilökohtaista Facebook-tiliä omistajaksi.

**Rakennettavat osat järjestyksessä:**
1. Henkilökohtainen Facebook-tili (pelkkä hallintakerros, ei
   henkilökohtaista käyttöä, yksityisyysasetukset lukkoon)
2. Facebook-yrityssivu "Mahlamäen Kauneusstudio"
3. Instagram-tilin muunto Business-tiliksi jos ei jo ole
4. Instagram-yritystilin yhdistäminen Facebook-yrityssivuun
5. Meta Business Suite käyttöön (kaikki hallinta yhdestä paikasta,
   ei henkilökohtaista uutissyötettä näkyvillä)

Meta Pixel on jo asennettu sivustolle, joten seurantatekniikka on
valmis retargetointia varten.

**Somestrategian perusperiaate (käyttäjän linjaus):** somea ei tehdä
aktiivisesti. Ei vastata kommentteihin eikä yksityisviesteihin.
Someprofiilien tarkoitus on toimia info- ja markkinointikanavana joka
ohjaa ihmiset sivustolle ja ajanvaraukseen. Yksityiskohtainen
suunnitelma tiedostossa `META-MARKKINOINTI.md`.

### Maksettu mainonta (aloitussuunnitelma)

Päätös 2026-07-23: käyttäjä on jo Googlen orgaanisten hakutulosten
etusivulla hakusanoilla "aknenhoito Kotka", "aknearpien hoito Kotka" ja
"mikroneulaus Kotka". Google Ads olisi näissä duplikaatti orgaaniseen
näkyvyyteen, ei kustannustehokas. Meta-mainonta valittu ensisijaiseksi
maksullisen mainonnan kanavaksi.

**Elokuu 2026**: ammattivalokuvaus. Valokuvaaja tekee brandi-shootin
studion tilasta, Jaakosta ja Petrasta, työskentelykuvista ja mahdollisista
tuotekuvista. Kuvat käytetään sivustolla (tiimi-osio, muut osiot),
Instagramissa, Facebookissa, Google Business Profilessa ja Meta-
mainonnassa. Kertainvestointi n. 500–2000 €.

**Syys-lokakuu 2026**: Meta-mainonta (Facebook + Instagram) käyttöön.
Alustava budjetti 300–500 €/kk. Kohdennus: naiset 25–55 v, Kotka + 30 km
säde. Retargeting sivustokävijöille (Meta Pixel on jo asennettu
sivustolle). Instagram-tilin jatkuva syöttäminen ammattikuvilla.
Algoritmi vaatii 2–4 viikon oppimisajan. Meta on erinomainen kauneus-
ja ihonhoitopalveluille visuaalisen sisällön vuoksi.

**Google Ads**: ei ajankohtainen tässä vaiheessa koska orgaaninen näkyvyys
on jo etusivulla keskeisillä hakusanoilla. Voidaan harkita myöhemmin jos
laajennetaan Kotkan ulkopuolelle tai halutaan tavoittaa uusia hakusanoja.

Selvitettävä: hoitaako Fonecta Meta-mainontaa (sama toimija joka hoitaa
Google Business Profilen), vai halutaanko itse hallinnoida Meta Business
Managerin kautta.

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

### Domainin, sähköpostin ja SSL:n vastuunjako

Tämä on tärkeää muistaa, koska cPanel-varoitukset voivat hämmentää:

- **Domain-rekisteröinti ja DNS**: Domainhotelli (cPanel-liittymä
  `hotelli17.domainhotelli.fi:2083`). DNS-tietueet hallitaan täältä.
- **Sivuston hostaus ja SSL**: Cloudflare Pages hoitaa `studiomahla.fi`
  ja `www.studiomahla.fi` täysin omalla sertifikaatillaan. DNS osoittaa
  Cloudflaren IP-osoitteisiin (esim. 104.21.68.19, 172.67.185.27).
- **Sähköposti**: Google Workspace hoitaa `asiakaspalvelu@studiomahla.fi`
  -osoitteen (ja mahdolliset muut @studiomahla.fi -osoitteet). MX-tietueet
  osoittavat Googleen. Sähköposti ei kulje `mail.studiomahla.fi`
  -alidomainin kautta.

**Käytännön seuraus**: Domainhotellin cPanel AutoSSL ei ole tarpeen mihinkään
kolmesta domainista (`studiomahla.fi`, `www.studiomahla.fi`,
`mail.studiomahla.fi`). AutoSSL-varoitusviestit sertifikaattien uusimisesta
voi turvallisesti ohittaa. Suositus: sulje kaikki kolme AutoSSL:stä
cPanelin "SSL/TLS Status" -näkymässä, niin varoitusviestit lakkaavat.
Cloudflaren ja Googlen sertifikaatit hoituvat automaattisesti.

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

**`/led-valohoito.html`:** Dermalux Flex MD kliinisellä tasolla, kaksi
roolia (sarjahoito ja yksittäinen lisähoito), sinisen ja punaisen valon
vaikutus, vasta-aiheet, hinnoittelu (kerta 85 €, 8× sarja 640 €, 12× sarja
900 €, lisäpalvelu 35 €). Sivulla mainitaan laitteen malli ja CE-luokitus
(Class IIa, lääkintälaite) sekä valmistaja (Aesthetic Technology Ltd, UK).
Tutkimuslähteet Dermalux Tri-Wave MD:llä pätevät koska aallonpituudet ovat
samat.

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
- LED (lukittu 2026-07-23): kerta 85 €, 8× sarja 640 € (80 €/hoito),
  12× sarja 900 € (75 €/hoito), lisäpalvelu mikroneulauksen kanssa 35 €
- LED + ProXN -yhdistelmäpalvelut
- Aknepolun sarjapaketit (8 LED + ProXN)
- Kotihoitotuotteiden jälleenmyyntikate: **odottaa Duallaser Aestheticin
  MSRP-tietoa**. Alustava tavoitealue 60–70 % kate (n. 2,5–3× osto-hinta),
  linjassa medical/premium clinic -tason kanssa Suomessa. Duallaserin
  ilmoittama MSRP on ehdoton alaraja jota ei alliteta (jakelusopimuksen
  ehto). Käyttäjän taustaa: aiemmin tehnyt suoramyyntinä 25 % katteella
  menestyksekkäästi, mutta silloin asiakaskunta oli merkittävästi
  laajempi. Yhden hoitolan tasolla pieni volyymi vaatii korkeamman
  per-tuote-katteen jotta kokonaisliikevaihto on kannattava.

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

## 14b. Vaihe 1.5 — ProXN-käyttöönotto (heinäkuu–elokuu 2026)

**Status**: Käynnissä 2026-07-23. Käyttäjä sitoutui ProXN-linjan
käyttöönottoon. Retail-tuotteiden valinta odottaa Duallaser Aestheticin
INCI-listaa ja MSRP:tä. Ammattihoidot voidaan aloittaa heti.

**Ei odota LED:iä**. Dermalux Flex MD -laitteen toimitus siirtyy syksylle,
mutta ProXN otetaan käyttöön tätä ennen. LED-osuus (aknehoito-pillar
ja /led-valohoito.html) toteutetaan Vaihe 2:ssa syksyllä, kun laite on
saapunut.

### Strateginen perustelu

Nykyinen sivusto tähtää mikroneulaukseen: **ensikäynti (200 €) sisältää
kuvauksen "ihon arviointi ja ensimmäinen kliininen mikroneulaushoito"**.
Tämä on ongelmallista koska:
1. Mikroneulaukselle on paljon vasta-aiheita (raskaus, aktiivinen akne,
   isotretinoiini, atooppinen ihottuma, herkkä iho, alle 18-vuotiaat, jne.)
2. Ensikäynnille tuleva asiakas jolle mikroneulaus ei sovi ei saa mitään
   ratkaisua eikä ensikäynti ole kaupallisesti perusteltu
3. Jos ensikäynti muutetaan "iho-arvioinniksi jonka pohjalta rakennetaan
   sopiva hoitopolku", **ProXN toimii vaihtoehtoisena hoitopolkuna**
   niille joille mikroneulaus ei sovi.

Tämä pelastaa ensikäynnin arvon jokaiselle asiakkaalle ja avaa herkkä-iho-,
rosacea- ja atooppinen-ihottuma-segmentin joita mikroneulaus ei tavoita.

### Hintapäätös (lukittu 2026-07-23)

- **ProXN-kasvohoito ensikäynti: 200 €** (sama kuin mikroneulauksen
  ensikäynti). Sisältää iho-arvioinnin, hoitosuunnitelman ja
  ensimmäisen ProXN-hoidon.
- **ProXN-sarjahoito**: hinnat lukitaan myöhemmin. Alustava suunnitelma
  perustaso 200 €, sarjahoidot lasketaan aikakatteen 100 €/h alv-minimillä
  ja tuotekustannuksella 70 €/hoito. Esim. 3× sarja 570 € (190 €/hoito
  → aikakate 120 €/h). Vahvistetaan seuraavan päätöksen yhteydessä.

### Sivustorakenteen muutokset (kolme tasoa)

**Taso 1 — Uusi sivu, taustalla (ei linkitetä ennen julkaisua)**

`proxn-kasvohoito.html`:
- Hero: "ProXN-kasvohoito. Xanthohumol Complex herkälle ja
  palautuvalle iholle."
- Kenelle sopii -osio: ruusufinni, atooppinen ihottuma, herkkä ja
  vaurioitunut iho, mikroneulauksen vasta-aiheiset asiakkaat,
  invasiivisten hoitojen palautuminen, akne-taipuvainen iho.
- Xanthohumol Complex -osio: patentoitu synteesi, syklodekstriini-
  kompleksi, 800+ tutkimusta, 30× C-vitamiinin antioksidanttiaktiivisuus,
  anti-inflammatorinen, antibakteerinen, kollagenaasi-inhibitio.
- Hoitoprotokollat: 4 moduulia (Overreactive Rescue, Firming, Retexture,
  Acne Rescue). Selkeä ero MicroPen EVO -mikroneulaukseen (Retexture-
  protokollan 0,2–0,5 mm ei ole sama asia).
- Hinta: ensikäynti 200 €, sarjahinnat "julkaistaan pian" tai
  alustavat luvut ilman lukitusta.
- Miksi Studio Mahla: vastuusairaanhoitaja, kliininen positiointi.
- CTA: "Aloita ensikäynnillä" → Timma-jonotuslista.
- JSON-LD BeautySalon/Service -schema.

**Taso 2 — Etusivu- ja rakennepäivitykset (julkaistaan yhdessä)**

`index.html`:
- **Ensikäynti-kortti**: kuvaus muutetaan "ihon arviointi ja
  ensimmäinen mikroneulaushoito" → **"ihon arviointi ja hoitosuunnitelma.
  Selvitämme sopiiko sinulle mikroneulaus vai ProXN-kasvohoito, ja
  rakennamme siitä hoitopolun."**
- **Kenelle mikroneulaus ei sovi** -osioon lisäys: "Jos mikroneulaus ei
  sovi, voit hyödyntää ProXN-kasvohoitoa, joka on kehitetty juuri
  ärtyneelle, herkälle ja palautuvalle iholle." + linkki
  proxn-kasvohoito.html:iin.
- **Hoidot-osio**: neljäs kortti (ProXN-kasvohoito, ensikäynti 200 €)
  tai erillinen ProXN-osio Hoidot-osion jälkeen.

Nav, footer, sitemap.xml, BeautySalon-schema päivitetään.

**Taso 3 — Cross-linkitykset ja pitkän aikavälin viimeistely**

- `mikroneulaus-opas.html`: viittaus ProXN:iin kohdassa "kenelle ei sovi"
- `mita-ensikaynnilla-tapahtuu.html`: ensikäynnin uudistettu kuvaus
  (kaksi polkua)
- Blogiartikkeli: "Xanthohumol Complex ihonhoidossa" tai vastaava

### Ei muutettavaa nyt

- Nav-rakenteen radikaali uudistus (odottaa LED:iä syksyllä)
- Aknehoito-pillar (Vaihe 2 syksyllä)
- /led-valohoito.html (odottaa laitteen toimitusta)
- Kolmen huolenaihe-sivun rakenne (akne, herkkä-iho, ikääntyvä-iho)
  (odottaa Vaihe 2:ta)

### Aikataulu

**Ensi viikko (heinäkuun loppu)**:
1. Ma: avajaispäivämäärä selviää → julkaisu
2. Taustalla: proxn-kasvohoito.html kirjoitetaan valmiiksi

**Elokuu (avajaispäivämäärän jälkeen)**:
1. proxn-kasvohoito.html live
2. Etusivun muutokset (ensikäynti, kontraindikaatiot, hoidot)
3. Nav, footer, sitemap, schema
4. Pillar- ja ensikäynti-artikkelin cross-linkit

**Syksy (kun LED-laite saapuu)**:
1. Aknehoito-pillar (Vaihe 2 -suunnitelman mukaan)
2. /led-valohoito.html
3. Nav ja rakenteen isompi uudistus
4. Kolme huolenaihe-sivua

---

## 14c. Pitkän aikavälin suunta: oma ihonhoitobrändi

**Kirjattu 28.7.2026. Ei ajankohtainen. Aikajänne vuosia.**

Tämä luku on tallessa siksi että suunta olisi kirjattuna kun se
joskus tulee ajankohtaiseksi, ei siksi että sen eteen tehtäisiin
nyt jotain. Mitään päätöksiä ei tämän perusteella tehdä.

**Kaikki luvut ovat alustavia.** Hinnat, kustannukset, eräkoot ja
katteet ovat suuntaa-antavia arvioita, eivät tarjouksia tai
vahvistettuja tietoja. Ne tarkistetaan kokonaan sopimusvalmistajalta
ja tavarantoimittajilta kun asia on ajankohtainen. Alla olevat
korjaukset koskevat laskutapaa, eivät lukujen oikeellisuutta.

### Mitä on päätetty

**Ainoa syy laajentua valtakunnalliseksi olisi oma ihonhoitosarja.**
Kaikki muu toiminta on ja pysyy paikallisena.

**Toinen hoitola on suljettu pois.** Ei kiinnosta. Se olisi sama työ
toisessa osoitteessa eikä skaalaudu, koska tekijän aika on pullonkaula.

**Este on pääoma.** Suunnitelma on olemassa mutta vaatii sellaisen
pääoman ettei se ole tässä vaiheessa kiinnostava.

### Suunnitelma (käyttäjän kirjaamana 28.7.2026)

Konsepti: asiantuntijavetoinen, kestotilauksiin perustuva
ihonhoitobrändi, jonka ytimessä on ihon suojamuuria korjaava
tehoseerumi.

**1. Tuotevalinta**

Aurinkosuoja rajattiin pois: tuotekehitys vaatii kymmenien
tuhansien eurojen kliiniset testit ja lainsäädäntö on monimutkaista
ja muuttuvaa. Markettimeikkivoiteiden SPF 15 perustuu usein pelkkiin
väripigmentteihin (titaanidioksidi, sinkkioksidi) ja toteutuu vain
epärealistisen paksulla kerroksella.

Valittu tuote on tehoseerumi, koska tuotekehitysriski on matala
mutta kate ja asiakasarvo korkeita. Kysyntäperuste: markkinan suurin
liike on ylihoitamisesta (hapot, retinoli) vaurioituneen ihon
rauhoittaminen. Seerumi toimii yhdessä aiemmin suunniteltujen
hyaluronihappokapselien kanssa, ja molemmat mahtuvat samaan
postiluukkulähetykseen yhdellä postimaksulla.

**2. Formulointi**

Vegaaninen, hajusteeton, vain kliinisesti tutkittuja ainesosia.
Vastuullisuus vihreän kemian ja biofermentoinnin kautta.

- Skvalaani: sokeriruo'osta biofermentoimalla
- Glyseriini: 100 % palmuöljyvapaa (rypsi tai kookos)
- Keramidit ja hyaluronihappo kahdella molekyylipainolla:
  laboratoriossa biofermentoitu
- Niasiiniamidi 5 % ja pantenoli: synteettisesti vihreän kemian
  menetelmin

**3. Talous (käyttäjän luvut)**

Laskettu 3000 kappaleen minimierällä, alv 25,5 %.

- Kertaluonteiset aloituskulut: koetuotanto, reseptiikka ja
  laadunvarmistus n. 3 500 € netto (n. 4 393 € brutto). Resepti jää
  yrityksen omaisuudeksi.
- Yksikköhinta netto n. 4,50 € (neste, pakkaus, täyttötyö)
- Normaalihinta 34,90 €. Asemointi The Ordinaryn premium-tason ja
  laadukkaan apteekkikosmetiikan väliin.
- Kestotilaushinta 25,90 € (n. −26 %). Seerumi kestää päivittäisessä
  käytössä 2 kuukautta, eli 6 toimitusta vuodessa.
- Muuttuvat kulut per toimitus (tuote + postimaksu) n. 11,30 €

**4. Logistiikka ja pakkaus**

Suunnittelun ydin on Postin pikkupaketin 30 mm maksimipaksuus ja
kitkaton asiakaskokemus.

- Pullo: litteä 30 ml PCR-kierrätyslasipullo. Varmistaa että
  Paptic-pussiin pakattu tuote mahtuu postiluukusta eikä ohjaudu
  noutopisteeseen.
- Annostelija: monomateriaalipipetti (esim. 100 % PP). Asiakkaan ei
  tarvitse opetella uutta käyttötapaa, ja koko pipetin voi laittaa
  muovinkeräykseen ilman osien erottelua.
- Hankinta: kotimaiset tukkurit (esim. Pack-Tukku, Tarapack), jotka
  hankkivat eurooppalaisilta valmistajilta (Eurovetrocap, Virospack,
  Lumson, Berlin Packaging) ja toimittavat suoraan
  sopimusvalmistajalle (esim. Pharmia, Galena).

### Toinen tuote: hyaluronihappokapselit (sisäinen hoito)

Kapselit muodostavat "inside–out"-mallin toisen puolikkaan. Ne
matkustavat samassa lähetyksessä seerumin kanssa, jolloin
asiakkaan elinkaariarvo kasvaa ilman että toimituskulut kasvavat.

**Konsepti**

Yksi täsmätuote monivitamiinien ja sottaisten kollageenijauheiden
sijaan. Seerumi lukitsee kosteuden ihon pintaan (keramidit ja
skvalaani), kapseli sitoo vettä syvemmissä kerroksissa joihin
ulkoinen kosmetiikka ei yllä.

**Formulointi (vegaaninen)**

- Hyaluronihappo (natriumhyaluronaatti): biofermentoitu, ei
  eläinperäistä lähdettä. Päiväannos n. 100–120 mg.
- Kapselin kuori kasviselluloosaa (HPMC), ei liivatetta.
- Sinkki tai biotiini valinnaisena.

**C-vitamiini: ei mukaan (käyttäjän kanta 28.7.2026).** C-vitamiini
oli mukana alkuperäisessä ehdotuksessa, mutta käyttäjä ei halua
sitä koostumukseen. Asia ratkaistaan myöhemmin.

Tästä seuraa yksi asia joka on tiedostettava eikä ratkaistava nyt:
C-vitamiini oli ainoa ainesosa jolla on hyväksytty terveysväittämä.
Ilman sitä kapselissa ei ole yhtään ainesosaa josta saisi esittää
ihoon liittyviä vaikutusväittämiä, koska hyaluronihapolle ei ole
hyväksyttyä väittämää suun kautta otettuna. Sinkillä ja biotiinilla
on omat hyväksytyt väittämänsä, joten ne ovat vaihtoehtoinen reitti
jos väittämä halutaan säilyttää ilman C-vitamiinia. Tämä on
markkinointikysymys, ei este tuotteelle.

**Pakkaus**

Litteä, uudelleensuljettava doypack-pussi muovipurkin sijaan.
FSC-sertifioitu paperi ja kierrätettävä estekalvo sisäpinnalla.
60 kapselia eli kahden kuukauden annos painuu kasaan ja mahtuu
samaan Paptic-kuoreen litteän seerumipullon kanssa.

**Talous (käyttäjän luvut)**

- Aloituskulut: reseptiikka, vakaustestaus, ravintoarvolaskelmat ja
  pakkausmerkintöjen lakitarkistus n. 2 500 € netto
- Valmistus per pussi n. 3,80 € netto, 3000 kpl erä n. 11 400 €
- Kertaostos 29,90 €, kestotilaus 22,90 € / 60 vrk
- Postimaksu ja Paptic n. 5,65 € netto

**Yhdistelmätilaus**

Seerumi 25,90 € + kapselit 22,90 € = 48,80 €, yksi postimaksu.

---

### Tarkistettavat kohdat ennen toteutusta

Nämä eivät kaada konseptia. Ne on kirjattu jotta niitä ei tarvitse
löytää uudelleen.

**1. Katelaskelmissa on alv mukana (korjattava, koskee molempia)**

Kaikki katteet on laskettu vähentämällä kulut arvonlisäverollisesta
hinnasta. Hintaan sisältyvä alv ei ole yrityksen rahaa vaan
tilitetään valtiolle.

| Kate per toimitus | Suunnitelmassa | Oikein | Yliarvio |
|---|---|---|---|
| Vain seerumi | 14,60 € | **9,34 €** | 56 % |
| Vain kapselit | 13,45 € | **10,73 €** | 25 % |
| Yhdistelmä | 34,85 € | **26,86 €** | 30 % |

Vuosiarvo yhdistelmätilaajasta on **161 €**, ei yli 209 €.

Verottomat hinnat: seerumi 25,90 € → 20,64 €, kapselit 22,90 € →
20,18 €.

Konsepti on yhä kannattava. Yhdistelmätilauksen 26,86 € on hyvä
kate kulutustuotteelle, ja logiikka siitä että kapselit matkustavat
saman postimaksun siivellä pitää edelleen paikkansa. Tilaajamäärän
tavoite on vain noin kolmanneksen suurempi kuin suunnitelmassa.

Huom: jos muuttuvat kulut onkin ilmoitettu arvonlisäverollisina,
oikeat katteet ovat hieman korkeampia. Tarkistettava, samoin
postimaksun arvonlisäverokohtelu.

**2. Lisäravinteiden verokanta on 13,5 %, ei 14 %**

Suomen alennettu verokanta laski 14 prosentista 13,5 prosenttiin
vuodenvaihteessa 2026. Ero on pieni ja kapselien eduksi.

**Tarkistettava erikseen:** sovelletaanko ravintolisiin
elintarvikkeiden alennettua kantaa vai yleistä 25,5 prosenttia.
Tätä ei saatu varmistettua, ja se on kapselien kateoletuksen
kannalta ratkaiseva. Vahvistus haetaan Verohallinnolta kun asia on
ajankohtainen.

**3. Kaksi eri verokantaa samassa lähetyksessä**

Yhdistelmätilaus sisältää 25,5 prosentin kosmetiikkaa ja
alennetun kannan elintarviketta. Jos se myydään yhtenä alennettuna
pakettihintana, hinta on jaettava osiin verotusta varten ja jaon on
oltava perusteltavissa. Tämä on kirjanpidollinen mutkistus jota
suunnitelmassa ei ole huomioitu. Yksinkertaisin ratkaisu on
hinnoitella tuotteet erikseen eikä antaa pakettialennusta.

**4. Terveysväittämät ratkaistava koostumuksen kanssa yhdessä**

Hyaluronihapolle **ei ole hyväksyttyä terveysväittämää suun kautta
otettuna.** Alkuperäisessä suunnitelmassa C-vitamiinin väittämän
todettiin antavan "vahvan laillisen selkänojan ihonhoidollisiin
markkinointiväittämiin". Se on liian pitkälle menevä tulkinta:
väittämä koskee vain C-vitamiinia, eikä markkinointi saa antaa
ymmärtää että hyaluronihapolla olisi vastaava vaikutus.

Koska C-vitamiini on rajattu pois, kysymys siirtyy: halutaanko
koostumukseen jokin ainesosa jolla on hyväksytty väittämä (sinkki,
biotiini), vai markkinoidaanko tuote kokonaan ilman
terveysväittämiä.

Molemmat ovat mahdollisia. Jälkimmäinen sopii itse asiassa hyvin
studion linjaan, jossa on johdonmukaisesti vältetty ylilupaamista.
Ratkaistaan koostumuksen kanssa samaan aikaan.

**5. Minimierät sitovat pääoman ja luovat säilyvyysriskin**

| Erä | Varasto | Aloitus | Yhteensä |
|---|---|---|---|
| Seerumi | 13 500 € | 3 500 € | 17 000 € |
| Kapselit | 11 400 € | 2 500 € | 13 900 € |
| **Yhteensä** | | | **30 900 €** |

Tämä on nettona ennen ensimmäistäkään myyntiä. Nyt "vaatii
pääomaa" on numero.

Takaisinmaksu yhdistelmätilaajilla: n. 1 150 toimitusta eli
**192 tilaajavuotta.**

Varaston kierto huolestuttaa enemmän kuin summa. Kumpikin erä
riittää 500 tilaajavuodeksi. Jotta erä kuluisi kahdessa vuodessa,
tarvittaisiin **250 jatkuvaa tilaajaa** alusta asti.

Säilyvyys ja avaamisen jälkeinen käyttöaika rajaavat sitä kuinka
kauan erää voi myydä. Selvitettävä sopimusvalmistajalta ennen
tilausta. Vaihtoehtoina pienempi ensierä tai riittävän suuri
ennakkomyynti ennen tuotantoa.

**6. Lainsäädännölliset velvoitteet**

Kosmetiikka: EU:n kosmetiikka-asetus edellyttää
turvallisuusselvitystä, vastuuhenkilöä ja ilmoitusta
ilmoitusportaaliin ennen markkinoille saattamista.

Ravintolisät: Suomessa ravintolisistä tehdään ilmoitus
Ruokavirastolle. Vaatimukset tarkistetaan ajantasaisesta ohjeesta
kun asia on ajankohtainen.

Sopimusvalmistaja hoitaa näistä tyypillisesti osan, mutta
vastuunjako on sovittava kirjallisesti.

**7. Postin mitat**

Koko pullo- ja pussivalinta nojaa 30 mm paksuusrajaan. Postin
ajantasaiset mitat ja hinnat tarkistetaan ennen pakkausten
tilaamista, koska väärä oletus tekee koko logistisesta edusta
arvottoman.

### Miksi nykyinen työ tukee tätä suuntaa

Nämä eivät ole perusteluja aloittaa, vaan huomio siitä ettei
nykyinen työ mene hukkaan jos suunta joskus avautuu.

**Uskottavuus.** Ihonhoitobrändin vaikein osa ei ole valmistus vaan
uskottavuus. Blogi kerryttää sitä jatkuvasti. Artikkelit joissa on
lähteet ja rehelliset rajaukset ovat eri lähtökohta kuin tyhjästä
aloittavalla tuotemerkillä.

**Brändijärjestelmä.** Fontit, värit, logo, äänensävy ja
sisältögeneraattorit ovat siirrettävissä sellaisenaan.

**ProXN-jälleenmyynti on markkinatutkimusta.** Myynnistä näkee mitä
asiakkaat ostavat uudelleen, mikä hinta menee läpi ja mitkä
ainesosat kestävät kysymykset. Tätä tietoa ei saa muuten kuin
myymällä. Sama koskee INCI-listojen arviointia ja katelaskentaa,
joita on jo tehty ProXN-päätöksen yhteydessä.

**Studio on koeympäristö.** Hoidoissa näkee suoraan mikä toimii
millekin ihotyypille. Se on tuotekehityksen lähtötietoa.

### Miten tämä vaikuttaa nykyisiin päätöksiin

**Ei mitenkään.** Mitään ei tehdä nyt toisin tämän vuoksi eikä
tähän investoida. Ainoa käytännön seuraus on että ProXN-myynnin
havainnot kannattaa kirjata ylös, koska ne ovat joka tapauksessa
hyödyllisiä liiketoiminnalle.

---

## 16. Blogistrategia

Laadittu 30.7.2026. Tämä luku on sitova viikoittaiselle
blogiautomaatiolle.

### 16.1 Blogin kolme tehtävää

Ne kyllästyvät eri tahtiin, mikä on koko strategian ydin.

| Tehtävä | Kyllästyy | Perusteleeko lisää artikkeleita |
|---|---|---|
| Löydettävyys haussa | Hitaasti | Kyllä, mutta rajallisesti |
| Uskottavuus kävijälle | Nopeasti | Ei. Kukaan ei lue kahtakymmentä artikkelia päättäessään varaako ajan |
| Raaka-aine somelle | Heti | Ei. 12 artikkelia tuotti 46 Reels-ideaa |

Vain ensimmäinen perustelee lisää sisältöä.

### 16.2 Kohderyhmä on laajempi kuin Kotka

**Tämä korjattiin 30.7.2026 käyttäjän huomautuksesta.** Claude oli
rajannut kysynnän Kotkaan ja Kymenlaaksoon, mikä johti liian
matalaan arvioon sisällön hyödystä.

Ihmiset ajavat hyväksi koetun palvelun perässä pitkiäkin matkoja.
Käytännön säde on se, jonka voi ajaa työpäivän jälkeen ja ehtiä
kotiin järkevään aikaan. Kotkasta se kattaa pääkaupunkiseudun,
Kouvolan, Lahden, Lappeenrannan ja Porvoon.

**Toinen ryhmä: Kotkassa säännöllisesti käyvät.** Työmatkalaiset ja
muut jotka tulevat toiselta paikkakunnalta Kotkaan töihin. Heille
matkaa ei synny lainkaan, koska he ovat täällä muutenkin. Arkien
aukioloaika 14–20 sopii tähän hyvin: hoito mahtuu työpäivän
jälkeen ennen kotimatkaa.

Tämä ryhmä ei ole pääkohderyhmä, mutta se on yksi peruste sille
ettei näkyvyyttä kannata rajata Kotkaan. Kouvolassa asuva voi etsiä
tietoa kotoaan ja huomata että studio on työpaikan lähellä.

Seuraukset sisältöön:

- **Valtakunnalliset hakusanat eivät ole hyödyttömiä.** Kauempaa
  tuleva vertailee, ja vertailu tapahtuu yleisillä hakusanoilla.
  Sama koskee Kotkassa työssä käyvää joka hakee kotoaan käsin.
- **Kauempaa tuleva ei valitse lähintä vaan parhaan.** Häntä
  vakuuttavat erottavat aiheet: menetelmien erot, tutkimusnäyttö ja
  sen rajat, laitteen sertifiointi, tekijän ammattitausta. Nämä ovat
  jo sivuston vahvimmat artikkelit.
- Lähialueen asiakas valitsee mukavuuden perusteella, kaukaa tuleva
  erottautumisen perusteella. Sisällön pitää palvella molempia.

### 16.3 Kapasiteetti ja hinnoittelu

**Tavoite on myydä ei-oota.** Ylikysyntä on hinnoitteluvoimaa.
Sisällön tehtävä ei ole vain täyttää kalenteria vaan luoda niin
paljon kysyntää että hintaa voi nostaa.

Tämä vahvistaa saman johtopäätöksen toista kautta: **erottautuminen
on tärkeämpää kuin volyymi.** Sisältö joka saa ihmisen ajamaan
tunnin on arvokkaampaa kuin sisältö joka kerää kävijöitä.

Kalenterin täyttymistä ei mietitä ennen kuin hoitoja on tehty.

**Kysyntä ja kalenterin täyttöaste ovat eri asioita.** Kysynnän
kannattaa ylittää kapasiteetti. Siitä ei kuitenkaan seuraa että
kalenterissa pitäisi olla tyhjiä ruutuja.

**Claude ehdotti ensin 80–85 prosentin täyttöastetta. Se oli väärä
lähtökohta.** Perustelu nojasi siihen että sarjahoitoasiakas voisi
jäädä ilman paikkaa neljän viikon kohdalla. Näin ei käy, koska
**sarjahoidon kaikki ajat varataan kalenteriin jo ensimmäisellä
käynnillä.** Kapasiteetti on siis sidottu etukäteen.

**Korjattu linjaus: pelivara kuuluu kahteen paikkaan, ei tyhjiin
ruutuihin.**

**1. Hoitoajan pituuteen.** Kun Timman aikaikkuna on hoitoa
pidempi, puskuri on rakenteessa: puhdistus, hoitopään vaihto,
kirjaukset ja mahdollinen ylivuoto mahtuvat siihen. Silloin sadan
prosentin täyttöaste on kunnossa, koska jokainen varattu ruutu
sisältää jo väljyyden. Tämä on parempi kuin tyhjä ruutu, koska
tyhjä ruutu on tulonmenetys ja väljä aikaikkuna ei ole.

**2. Siihen montako tuntia avataan varattavaksi.** Aukiolo on 50
tuntia viikossa (arkisin 14–20, viikonloppuisin 10–20). Kysymys ei
ole siitä täyttyykö avattu aika vaan siitä avataanko kaikki 50
tuntia. Sisällöntuotanto, tilaukset ja kirjanpito tapahtuvat
jossain.

**Yksi asia joka jää seurattavaksi: ensikäyntien kapasiteetti.**
Sarja-asiakkaat varaavat itsensä eteenpäin, uudet asiakkaat eivät.
Jos kalenteri täyttyy kokonaan sarjoista, ensikäynneille ei jää
paikkoja. Ensikäynti on sekä kallein yksittäinen hoito (200 €) että
koko suppilon suu, josta sarjat syntyvät.

Kannattaa harkita tiettyjen aikojen pitämistä varattuna
ensikäynneille. Se ei ole tyhjää pelivaraa vaan kohdennettua
kapasiteettia. Päätös tehdään vasta kun nähdään miten kalenteri
oikeasti täyttyy.

### 16.4 Kuinka monta artikkelia

Ei lukuna vaan kysymysten kattavuutena.

| Palveluvalikoima | Artikkeleita | Perustelu |
|---|---|---|
| Pelkkä mikroneulaus | 15–20 | Erillisiä asiakaskysymyksiä ei ole enempää |
| + LED | 5–7 lisää | Oma hakusanaklusterinsa |
| + ProXN | 4–6 lisää | Oma hakusanaklusterinsa |
| Kaikki kolme | 30–35 | Luonnollinen katto |

Tilanne 30.7.2026: 12 julkaistua. Mikroneulauksesta kattamatta
suunnilleen aknearvet omana artikkelinaan, ikääntymisen merkit
omanaan, hinta ja mitä siihen sisältyy, mitä hoidolta ei kannata
odottaa, sekä mikroneulaus muiden hoitojen rinnalla.

**LED ja ProXN eivät vain lisää artikkeleita.** Ne tuovat uusia
hakusanaklustereita joissa kilpailu ja kysyntä ovat erilaiset.
Aknehoito on todennäköisesti isompi kysyntä kuin mikroneulaus,
koska ihmiset etsivät ongelmaa eivätkä menetelmää. Tämä on
painava peruste laajennukselle.

### 16.5 Milloin tahtia väljennetään

Ei päivämäärän vaan signaalien perusteella.

1. **Ehdotusten laatu laskee.** Kun automaatio alkaa ehdottaa
   muunnelmia olemassa olevista tai suosittaa ettei julkaista,
   klusteri on katettu. Luotettavin signaali, tulee ensimmäisenä.
2. **Uudet artikkelit eivät kerää näyttökertoja.** Search Console
   kertoo artikkelikohtaiset näyttökerrat. Kolmen kuukauden jälkeen
   lähellä nollaa oleva uusi artikkeli on merkki kyllästymisestä.

Suunniteltu kaari:

| Vaihe | Tahti |
|---|---|
| Nyt → syyskuun puoliväli | Viikoittain |
| Syys–joulukuu | Joka toinen viikko |
| 2027 alkaen | Kerran kuussa tai tapahtumavetoisesti |

### 16.6 Päivittäminen voittaa lisäämisen

**Aliarvostetuin toimenpide ja toisen vuoden tuottavin.**

Kun artikkeleita on noin viisitoista, olemassa olevan päivittäminen
tuottaa yleensä enemmän kuin uusi artikkeli. Sijalla 9 oleva
artikkeli nousee sijalle 4 halvemmalla kuin uusi lähtee nollasta.

Blogiautomaatiolla on tämä vaihtoehtona joka viikko, ja sen on
harkittava sitä aidosti eikä oletuksena kirjoitettava uutta.

Kaksi kausiartikkelia (syksy ja talvi) päivitetään vuosittain, ei
kirjoiteta uusia.

### 16.7 Ero someen: toisto

**Blogissa päällekkäisyys on haitta, somessa se on tehokeino.**

Katsoja joka näki Reelsin puoli vuotta sitten ei muista sitä.
Reels-aiheet saavat siis toistua. Reels-automaatio saa ottaa yli
kuusi kuukautta vanhan ★★★-idean uudelleen, mutta tekee siitä uuden
version eikä julkaise samaa videota.

Sama ei päde blogiin. Kaksi artikkelia samasta aiheesta laimentaa
molempia ja hajottaa hakusijoitukset.

### 16.8 Kolme muuta huomiota

**Konversio on mittaamatta.** Kaksitoista artikkelia ja nolla
tietoa siitä mikä tuottaa varauksia. Pixelin konversiotapahtuma
Ajanvaraus-napille on tekemättä. Ilman sitä ei voi tietää
kannattaako artikkeli 13. Tämä on tärkeämpää kuin seuraava
artikkeli.

**Ristiinlinkitys molempiin suuntiin.** Uusi artikkeli linkitetään
myös vanhoista, ei vain uudesta ulos. Orpo artikkeli ei sijoitu.

**Rehellisyys on erottava tekijä.** Artikkelit joissa sanotaan mitä
tutkimus ei osoita ja kenelle hoito ei sovi ovat kauneusalalla
harvinaisia. Se säilytetään silloinkin kun se maksaa yksittäisen
varauksen.

---

## 15. Muutosloki

Kronologinen loki muutoksista tähän tiedostoon. Uusimmat ylimpänä. Claude
päivittää tätä automaattisesti jokaisen istunnon päätteeksi jos on tehty
muutoksia.

### 2026-07-30
- **Hakusanaseuranta ajettu ensimmäistä kertaa** (`tuotanto/hakusanaseuranta.md`).
  **Havainto joka vaatii päätöksen: incognito-ikkunaa ei pystynyt avaamaan
  käytettävissä olevilla Claude in Chrome -työkaluilla** (ei tabs_create_mcp:ssä,
  ei näppäinoikotietä Ctrl+Shift+N kautta — uutta ikkunaa ei ilmestynyt MCP-
  välilehtiryhmään). Haut tehtiin siis kirjautuneena olemassa olevaan Chrome-
  profiiliin. Tämä näkyi konkreettisesti haussa "kliininen mikroneulaus kotka":
  karttapaketin 1. sija oli studiomahla.fi mutta merkittynä "Ylläpidät tätä
  yritysprofiilia" eli Google tunnisti kirjautuneen käyttäjän yrityksen
  omistajaksi. Sijoitus ei siis välttämättä vastaa mitä tuntematon kävijä
  näkisi. **Päätettävä ennen seuraavaa mittausta (1.9.):** joko käyttäjä
  yhdistää Claude in Chromen manuaalisesti avattuun incognito-ikkunaan ennen
  ajoa, tai automaatio hyväksyy tämän rajoituksen ja raportoi sen joka kerta.
- **Uusi blogiluonnos tehty, odottaa hyväksyntää: `herkka-iho-ruusufinni-mikroneulaus.html`**
  (987 sanaa). Aiheena herkkä iho ja ruusufinni (rosacea) suhteessa mikroneulaukseen:
  milloin hoito sopii, milloin ei, miten hoitoa muokataan (pienempi neulasyvyys,
  hellempi tekniikka, testaus pieneltä alueelta), jälkihoidon korostuminen ja
  milloin ohjataan lääkärille. Täyttää aukon studion kolmen ydinpainopisteen
  joukossa (akne, ärtynyt/herkkä iho, ikääntyminen): herkkä iho ei ollut vielä
  saanut omaa artikkelia. Ei linkitetty mihinkään (blogi.html, sitemap.xml, muut
  artikkelit koskemattomia) käyttäjän hyväksyntää odottaen.
- **Uusi blogiluonnos tehty, odottaa hyväksyntää: `aknearpien-hoito-mikroneulauksella.html`**
  (907 sanaa). Aiheena aknearpien hoito mikroneulauksella: mekanismi, aktiivisen
  akneen vasta-aihe, tutkimusnäyttö (Sitohang 2021, Dove Medical Press 2020),
  sarjan pituus ja realistiset odotukset. Ei linkitetty mihinkään (blogi.html,
  sitemap.xml, muut artikkelit koskemattomia) käyttäjän hyväksyntää odottaen.

### 2026-07-31
- **Tiimiosio julkaistu etusivulle**, filosofia-osion jälkeen ennen
  menetelmäosiota. **Otsikko on "Tiimi"**, ei pikkuotsikkoa.
  **Vain Jaakon kuva ja esittely.** Kuva kelluu vasemmalla ja
  teksti kiertää sen, kuten hyväksytyssä mockupissa. Mobiilissa
  kuva on tekstin yläpuolella.
  **Petra mainitaan erillisenä kappaleena osion alaosassa**
  ohuen viivan alla: vastuuhoitaja, sairaanhoitaja (AMK),
  aseptiikan ja turvallisen hoitotyön osaaminen.
- **Uusi väri `--pink-deep: #895b3c` tekstilinkeille vaalealla
  taustalla.** Käyttäjä huomasi että etusivun linkki näytti
  liian vaalealta. Välitön syy oli taustojen vuorottelu: linkissä
  oli kiinteä `--pink-pale`, joka on tarkoitettu tummalle
  taustalle (1,34:1 kermalla).

  **Korjatessa paljastui vanhempi vika.** Sivuston linkkiväri
  `--pink` (#c8997a) on vaalealla taustalla vain **2,23:1**, kun
  vaatimus on 4,5:1. Tämä ei johtunut taustamuutoksesta vaan on
  ollut näin alusta asti ja koski **kaikkia sivuston
  tekstilinkkejä**, mukaan lukien jokaisen blogiartikkelin
  leipätekstin linkit (`.article-body p a`).

  Uusi sävy testattiin kaikkia kolmea vaaleaa taustaa vasten:
  kerma 5,11:1, lämmin kerma 4,70:1, valkoinen 5,46:1.
  Ensimmäinen ehdokas #8f5f3f jäi lämpimällä kermalla arvoon
  4,40:1 eli niukasti alle rajan, joten sävyä tummennettiin.

  **`--pink` säilyy** napeissa, korostuksissa ja kursiiviosissa,
  joissa se ei ole leipätekstiä. Vain tekstilinkit vaihtoivat.

  Muutettu: kolme linkkiä index.html-tiedostossa ja
  `.article-body p a` style.css-tiedostossa, mikä korjaa kaikki
  blogiartikkelit kerralla.
- **Etusivun osioiden taustat vuorottelevat nyt täydellisesti.**
  Tiimiosio häiritsi, ja syy oli rakenteellinen: sivusto vuorottelee
  vaaleaa ja tummaa, ja tiimiosion lisääminen vaaleana filosofian
  jälkeen rikkoi rytmin.

  **Claude ehdotti ensin keskivihreää välisävyä ja uutta
  väримuuttujaa. Käyttäjä hylkäsi uuden värin ja pyysi sen sijaan
  jatkamaan vuorottelua läpi sivun.** Se oli oikea ratkaisu:
  ongelma korjaantuu olemassa olevilla väreillä eikä palettiin
  tarvita lisäystä. `--pink-soft` poistettiin.

  Tiimi on nyt tumma ja kaikki sen alapuoliset osiot vaihtoivat
  vuoroaan:

  | Osio | Ennen | Nyt |
  |---|---|---|
  | Filosofia | vaalea | vaalea |
  | Tiimi | (uusi) | **tumma** |
  | Menetelmä | tumma | **vaalea** |
  | Kenelle ei sovi | vaalea | **tumma** |
  | Hoidot ja hinnat | tumma | **vaalea** |
  | Laite | vaalea | **tumma** |
  | Hoidon kulku | tumma | **vaalea** |
  | Ennen ja jälkeen | vaalea | **tumma** |
  | UKK | vaalea | vaalea |

  **Sivuvaikutus: myös vanha vika korjaantui.** Ennen tätä
  "Ennen ja jälkeen" ja "UKK" olivat molemmat vaaleita peräkkäin.
  Nyt vuorottelu on katkeamaton koko sivun mitalta.

  Komponentit jotka olettivat taustan värin piti korjata:
  `challenge` (vaalealle), `cards-note` ja `addon-head` (vaalealle),
  sekä uudet tummat variantit `compare-table`, `feat-card`,
  `care-list` ja `intro-text`.

  **Claude unohti ensimmäisellä kerralla osioiden pikkuotsikot.**
  Käyttäjä huomasi että sana "Prosessi" ei erottunut. Vika oli
  laajempi: **kaikkien kuuden vaihtaneen osion pikkuotsikko oli
  väärällä värillä**, koska luokat `label--pink-pale` (vaalea,
  tummalle taustalle) ja `label--mid` (tumma, vaalealle) eivät
  vaihtuneet taustan mukana. Kontrastit olivat noin 1,3:1 eli
  käytännössä näkymättömiä.

  **Opetus: kun osion taustaväri vaihtuu, on käytävä läpi sekä
  komponenttien tekstivärit että osion oman otsikkorivin
  label-luokka.** Claude tarkisti ensimmäisellä kerralla vain
  komponentit.

  Korjauksen jälkeen kaikki kahdeksan pikkuotsikkoa mitattu,
  matalin 5,55:1.
- **Jaakon esittelyä laajennettu kliinisen osaamisen osalta.**
  Kirurgisen hoitotyön tausta oli aiemmin yksi lause eikä siitä
  käynyt ilmi miksi se on tässä hoitomuodossa merkityksellinen.
  Nyt yhteys tehdään näkyväksi: mikroneulaus tuottaa
  tarkoituksellisen ja tarkasti rajatun ihovaurion, ja juuri sen
  hoitaminen on kirurgisen hoitotyön ydinosaamista. Kolme
  konkreettista seurausta kirjattu: aseptiikka rutiinina, hoidon
  jälkeisen ihon erityispiirteiden tuntemus ja paranemisen
  vaiheiden ymmärrys hoitovälien mitoituksessa. Sama teksti
  päivitetty myös lukuun 1.
- **Uusi kirjoitussääntö: ei kerrota mitä ei tapahdu.**
  Claude kirjoitti Petran esittelyyn lauseen "Hän ei osallistu
  hoitojen toteutukseen". Käyttäjä poisti sen: on turhaa kertoa
  mitä ei tapahdu. Sama koskee muutakin sisältöä. Kerrotaan mitä
  tehdään ja mitä osataan, ei sitä mitä jätetään tekemättä, ellei
  asia ole asiakkaan turvallisuuden kannalta olennainen (esim.
  vasta-aiheet).
- **Valokuva: värillinen, ei mustavalko.** Perustelu: tummansininen
  työasu on värikuvassa tunnistettavasti työasu ja tukee viestiä
  koulutetusta terveydenhuollon ammattilaisesta. Mustavalkoisena se
  on vain musta paita. Lisäksi sivustolla ei ole muuta
  mustavalkoista.
  Kuva optimoitu kuten laitekuva: 900 × 1200, JPG 67 kt ja WebP
  27 kt, `<picture>`-elementti ja lazy loading. EXIF-kierto
  korjattu, alkuperäinen oli 2448 × 3264.
- **Kapasiteettilinjaus korjattu (luku 16.3).** Claude ehdotti
  80–85 prosentin täyttöastetta perustellen sillä että
  sarjahoitoasiakas voisi jäädä ilman paikkaa. **Perustelu oli
  virheellinen: sarjahoidon kaikki ajat varataan kalenteriin jo
  ensimmäisellä käynnillä**, joten kapasiteetti on sidottu
  etukäteen. Korjattu linjaus: pelivara kuuluu hoitoajan pituuteen
  ja siihen montako tuntia avataan varattavaksi, ei tyhjiin
  ruutuihin. Tyhjä ruutu on tulonmenetys, väljä aikaikkuna ei ole.
  Jäljelle jäävä seurattava asia on ensikäyntien kapasiteetti:
  sarja-asiakkaat varaavat itsensä eteenpäin, uudet eivät.
- **FACEBOOK-SIVU SAATIIN PALAUTETTUA ENNALLAAN.** Kaikki säilyi:
  Erikoisalat, kansikuva, profiilikuva, automaattivastaukset,
  Instagram-liitos ja toimintanappi. Uudelleenrakennusta ei
  tarvittu.
- **Facebook-sivun käyttäjänimi asetettu: facebook.com/studiomahla.**
  Tämä oli avoinna heinäkuun alusta, koska asetussivu ei auennut
  selaimessa. Onnistui palautuksen jälkeen.
- **Facebook-suositukset päätetty pitää käytössä.** Aiemmin
  harkittiin poistamista. Arvostelut ovat paikallisessa
  palveluliiketoiminnassa hyödyllisiä, sama logiikka kuin
  Google-yritysprofiilissa.
- **Some-linkit lisätty footeriin.** Instagram ja Facebook
  yhteystietojen alle pienellä harvennetulla versaalilla, samalla
  tyylillä kuin muut footerin pikkuotsikot. Ei ikoneita, koska ne
  toisivat visuaalista kohinaa eikä tavoite ole seuraajamäärä.
  Linkeissä `rel="me"`, mikä on tunnistettu signaali siitä että
  profiilit kuuluvat samalle toimijalle ja tukee `sameAs`-kenttää.
  Muutettu `assets/layout.js` ja `assets/style.css`, joten se
  näkyy kaikilla sivuilla kerralla.
- **KORJATTU VIKA: `package.json` oli katkennut kesken.** Tiedosto
  päättyi riviin 13 kesken merkkijonon eikä ollut kelvollista
  JSONia.

  **Claude arvioi tämän ensin turhaksi Vercel-jäänteeksi. Se oli
  väärin ja poistaminen olisi rikkonut sivuston.** Cloudflare Pages
  Functions tuovat kolme npm-pakettia, jotka asennetaan juuri tämän
  tiedoston perusteella: `@supabase/supabase-js` (esitiedot,
  hoitoloki, tunnistautuminen), `resend` (sähköpostit) ja `otplib`
  (kaksivaiheinen tunnistautuminen).

  Tiedosto kirjoitettiin uusiksi. Riippuvuudet tarkistettiin
  koodin import-riveiltä eikä arvattu. Vertailu tehty ohjelmallisesti:
  koodin tuomat paketit ja package.jsonin riippuvuudet täsmäävät
  täsmälleen, ei puuttuvia eikä ylimääräisiä. Kuvauksesta poistettiin
  vanhentunut maininta Stripe-ennakkovarauksesta.

  Katkennut kohta oli neljäs riippuvuus jonka nimeä ei näkynyt.
  Todennäköisesti Stripe, joka poistettiin ennakkovarausten mukana.
  **Jos jokin toiminto ei korjauksen jälkeen toimi, puuttuva paketti
  selviää Cloudflaren build-lokista.**

  **Testattu 31.7.2026: esitietolomake ja hallintapaneeli
  toimivat.** Kolme riippuvuutta riittää, neljättä ei tarvita.
  Cloudflare on siis ilmeisesti käyttänyt aiempaa onnistunutta
  asennusta, tai npm on sietänyt katkennutta tiedostoa. Nyt
  tilanne on joka tapauksessa siisti eikä seuraava rakennus voi
  kaatua tähän.
- **Käyttämättömiä Functions-tiedostoja ei poistettu.**
  `functions/api/contact.js` ja `functions/api/keep-alive.js` eivät
  ole minkään sivun kutsumia eikä keep-alivelle ole ajastusta.
  Hyöty poistamisesta on nolla ja riski pieni mutta olemassa, joten
  ne jätettiin paikoilleen.
- **Sivuston `sameAs`-kenttä täytetty.** index.html
  BeautySalon-skeemaan lisätty facebook.com/studiomahla ja
  instagram.com/studiomahla. Kenttä oli tyhjä koska Facebook-sivu
  oli aiemmin pitkän numerosarjan takana. Auttaa Googlea
  yhdistämään profiilit samaan yritykseen, mikä tukee paikallista
  löydettävyyttä. Tarkistettu: kaikki kolme JSON-LD-lohkoa
  jäsentyvät.
- **Kanavalinjaus palautettu: käytössä molemmat, Instagram ja
  Facebook.** META-MARKKINOINTI.md luku 0.1 kirjoitettu uusiksi,
  kaikki [FACEBOOK — MYÖHEMMIN] -merkinnät poistettu (luvut 2.2,
  4.2, 10), luvun 3.2 ehdollinen muotoilu poistettu ja luku 11.3
  merkitty toteutumattomaksi mutta säilytetty tarkistuslistana
  siltä varalta että sivu joskus menetetään pysyvästi.
  Väliaikainen linjaus 28.–31.7. jätettiin lukuun 0.1
  historiatietona.
- **Yksi havainto kannattaa muistaa vaikka linjaus raukesi:**
  Instagram-mainonta todettiin 28.7. toimivaksi ilman
  Facebook-sivua, ja maksutavat kuuluvat yritysportfoliolle
  eivätkä sivulle. Jos sivu joskus menetetään pysyvästi, mainonta
  ei kaadu sen mukana.
- **Laitejulkaisulle kirjoitettu Facebook-versio kuvatekstistä.**
  Ero Instagramiin: linkit oikeina osoitteina koska ne ovat
  klikattavia, ei hashtageja koska ne eivät tuo Facebookissa
  jakelua. Kirjattu luvun 3.5b julkaisulokiin sääntönä joka pätee
  kaikkiin julkaisuihin jatkossa.
- **Laitekuvajulkaisu julkaistu Instagramiin.** Neljäs julkaisu.
  Viikon 31 sisältö: karuselli, kaksi Reelsiä ja laitekuva.
  Ensimmäinen viikko jonka aikana kanavana on ollut vain Instagram.

### 2026-07-30
- **Uusi luku 16: blogistrategia.** Vastaa kysymyksiin milloin
  tahtia väljennetään, kuinka monta artikkelia kannattaa olla ja
  mitä muuta blogista on sanottavaa. Käsitelty erikseen kolme
  skenaariota: pelkkä mikroneulaus (15–20 artikkelia), LED mukaan
  (+5–7), ProXN mukaan (+4–6).
- **Claude korjasi analyysinsä käyttäjän kolmen huomautuksen
  perusteella.** Kaikki kolme muuttivat johtopäätöksiä:
  1. **Kohderyhmä on laajempi kuin Kotka.** Claude rajasi kysynnän
     Kotkaan ja Kymenlaaksoon. Ihmiset ajavat hyväksi koetun
     palvelun perässä, ja käytännön säde on työpäivän jälkeen
     ajettava matka, eli pääkaupunkiseutu, Kouvola, Lahti,
     Lappeenranta ja Porvoo. Lisäksi omana ryhmänään Kotkassa
     säännöllisesti työssä käyvät, joille matkaa ei synny lainkaan.
     Valtakunnalliset hakusanat eivät siis ole hyödyttömiä, ja
     artikkelien katto on korkeampi.
  2. **Tavoite on myydä ei-oota, ei jäädä 80 prosenttiin.**
     Ylikysyntä on hinnoitteluvoimaa. Kalenterin täyttymistä ei
     mietitä ennen kuin hoitoja on tehty.
  3. **Somessa toisto on tehokeino, blogissa haitta.** Reels-aiheet
     saavat toistua, koska katsoja ei muista puoli vuotta vanhaa
     videota.
- **Blogiautomaatioon lisätty jarru.** Se ei enää tuota artikkelia
  joka viikko oletuksena, vaan valitsee kolmesta: uusi artikkeli,
  olemassa olevan päivitys, tai ei julkaista mitään. Päivitys on
  nostettu tasavertaiseksi vaihtoehdoksi. Automaatio myös arvioi
  joka kerta onko viikoittainen tahti edelleen perusteltu, ja
  suosittelee väljentämistä jos se on kahdesti peräkkäin päätynyt
  olemaan julkaisematta.
- **Reels-automaatioon lisätty uusiokäyttö.** Yli kuusi kuukautta
  vanhan ★★★-idean saa ottaa uudelleen, mutta siitä tehdään uusi
  versio eikä julkaista samaa videota.
- **Kaikki työ koottu yhden kansion alle.** Ajastettujen tehtävien
  ohjeet asuivat sovelluksen omassa kansiossa
  `C:\Users\jaakk\Claude\Scheduled`, eivätkä olleet varmuuskopiona
  missään. Ne kopioitiin kansioon `tuotanto/automaatiot/`.
  **Huom: kopiot eivät päivity itsestään.** Kun ajastetun tehtävän
  ohjetta muutetaan, myös kopio on päivitettävä.
  Tarkistettiin samalla väliaikaisen työkansion sisältö tiedosto
  tiedostolta: siellä ei ole mitään mitä ei ole jo `tuotanto/`
  -kansiossa. Se saa tyhjentyä.
  **Lopputulos: `C:\studiomahla` on 7,5 Mt ja 106 tiedostoa, ja
  siinä on kaikki.** Varmuuskopiointi hoituu yhdellä
  synkronoinnilla.
- **Reels-automaation tallennuspaikat täsmennetty.** Ohje kertoi
  minne diat ja videot tallennetaan, mutta ei sitä minne kunkin
  Reelsin oma Python-skripti kirjoitetaan. Skripti olisi voinut
  jäädä väliaikaiseen työkansioon ja kadota. Ohjeeseen lisättiin
  taulukko tallennuspaikoista, vaatimus tallentaa skripti kansioon
  `tuotanto/generaattorit/` ja lopputarkistus että mitään ei jäänyt
  muualle. Samalla lisättiin vaatimus kirjata kuvatekstit
  julkaisulokiin sanatarkasti.
  **Blogiautomaatio tarkistettu: se kirjoittaa jo oikeaan
  paikkaan** (`C:\studiomahla`).
- **Instagramin viestiautomaatio oli hävinnyt** (todennäköisesti
  Facebook-sivun menetyksen yhteydessä) ja palautettiin käsin.
  Käytössä oleva teksti ei ollut tallessa suunnitelmassa, vaan
  sinne oli kirjattu vain alkuperäinen lyhyt ehdotus. Oikea teksti
  löytyi keskusteluhistoriasta. **Nyt kirjattu
  META-MARKKINOINTI.md lukuun 4.1 käytössä olevana tekstinä.**
- **Laitekuvajulkaisu tehty uudelleen.** Ajastus oli hävinnyt
  sivun mukana. Samalla paljastui että variantti C oli olemassa
  vain vertailukuvassa eikä sitä ollut tallennettu omaksi
  tiedostokseen. Kuva tuotettiin uudelleen ja tehtiin samalla
  skripti `tuotanto/generaattorit/laitejulkaisu.py`, joten se on
  jatkossa toistettavissa. Kuvateksti (1030 merkkiä) kirjattu
  META-MARKKINOINTI.md lukuun 3.5b sanatarkasti.
- **Toistuva virhe todettu: toteutunutta sisältöä ei ole kirjattu,
  vain ohjeita.** Sama tapahtui Erikoisalojen kanssa. Sääntö:
  kaikki Metaan, Instagramiin tai muuhun kolmannen osapuolen
  palveluun syötetty teksti kirjataan myös suunnitelmaan
  sanatarkasti ja merkitään käytössä olevaksi, ei ehdotukseksi.

### 2026-07-28

> **Huom lukijalle:** tämän päivän aikana Facebook-sivu menetettiin.
> Alla olevat merkinnät Erikoisaloista, kansikuvasta,
> profiilikuvasta, CTA-napista ja perjantaille ajastetusta
> julkaisusta koskevat sivua joka ei enää ole olemassa. Ne on
> jätetty lokiin sellaisinaan, koska tieto tarvitaan uudelleen kun
> sivu rakennetaan. Tehdyt asetukset on toteutettava uudelleen.
> Ks. META-MARKKINOINTI.md luvut 0.1, 11.2 ja 11.3.

- **HÄIRIÖ: henkilötilin rajoitus vei Facebook-sivun mukanaan.**
  Tili palautettu, sivun tila selvityksessä. Palautusikkuna
  poistetulle sivulle on n. 14 vrk, joten selvitys aloitetaan heti.
  Toimintajärjestys ja opetukset kirjattu META-MARKKINOINTI.md
  lukuun 11.2. Sivu ei lataudu julkisesti eikä näy Business
  Suitessa kummallakaan ylläpitäjätilillä, eli se on poistettu tai
  rajoitettu sivutasolla. **Päätös: ei yritetä palauttaa, tehdään
  uusi sivu.** Sivu oli muutaman päivän ikäinen, yksi seuraaja ja
  kaksi julkaisua, joten valitusprosessi olisi suhteettoman raskas.
  Uudelleenrakennuksen tarkistuslista META-MARKKINOINTI.md
  luvussa 11.3. **Keskitytään toistaiseksi pelkkään Instagramiin.**
  Data tukee sitä (206 vs 27 näyttöä) ja rajoituksen syy on
  tuntematon, joten kannattaa odottaa että henkilötilin tilanne on
  vakaa.
- **Automaatio luotu: viikoittaiset Reelsit.** Ajetaan maanantaisin
  klo 10, blogiehdotuksen jälkeen. Tuottaa kaksi Reelsiä
  ideapankista eri aihepiireistä ja eri kansidian sävyillä,
  kirjoittaa kuvatekstit ja merkitsee käytetyt ideat.
  **Kun käyttämättömiä ideoita on alle 10, se lukee koko sivuston
  ja blogit selaimella ja tuottaa vähintään 15 uutta ideaa.**
  Ideapankkiin lisättiin tilamerkintäkäytäntö
  (`— KÄYTETTY pp.kk.vvvv`), jotta jäljellä olevien määrän voi
  laskea suoraan tiedostosta. Ideoita 46, käytetty 1, jäljellä 45.
- **Korjattu: brändifontit olivat väärässä paikassa.**
  `karuselli.py` etsii fontteja alikansiosta `generaattorit/fontit`,
  mutta ne oli kopioitu polkuun `tuotanto/fontit`. Skripti olisi
  pudonnut varafontteihin (Lora ja Poppins) ja typografia olisi
  ollut väärin skaalattu. Fontit siirretty oikeaan paikkaan ja
  automaatioon lisätty tarkistus joka keskeyttää ajon jos
  varafontti on käytössä.
- **Automaatio luotu: hakusanaseuranta.** Ajetaan kuukauden
  ensimmäisenä päivänä. Tekee Google-haut incognito-ikkunassa
  Claude in Chrome -laajennuksella ja kirjaa sijoitukset,
  karttapaketin, kilpailijat ja hakutuloselementit tiedostoon
  `tuotanto/hakusanaseuranta.md`. Historia on koko automaation
  arvo: yksittäinen mittaus on kohinaa. Seurattavia hakusanoja 10,
  joista neljä ydinsanaa (mikroneulaus kotka, aknehoito kotka,
  aknearpien hoito kotka, kliininen mikroneulaus kotka).
  Claude oli aluksi väärässä pitäessään tätä epäluotettavana:
  incognito poistaa personoinnin ja sijainti tulee käyttäjän omasta
  yhteydestä, mikä on juuri haluttu näkymä.
- **Automaatio luotu: viikoittainen blogiehdotus.** Ajetaan
  keskiviikkoisin klo 9 (siirretty maanantailta, koska maanantaille
  osui jo Reels-tuotanto). Käy läpi koko blogikirjaston, ehdottaa kolme
  aihetta perusteluineen ja kirjoittaa parhaan valmiiksi
  luonnokseksi. **Ei linkitä artikkelia mihinkään** (blogi.html,
  sitemap.xml, index.html, ristiinlinkit) vaan jättää sen
  hyväksyttäväksi. Ohje sisältää luvun 5 kirjoitussäännöt ja
  tarkistuslistan, koska ajo alkaa aina tyhjältä pöydältä ilman
  muistia aiemmista keskusteluista.
  **Lähteenä on julkaistu sivusto, ei paikallinen kansio,** ja
  jokainen artikkeli luetaan kokonaan Claude in Chrome
  -laajennuksella. Ei otsikkotason silmäilyä eikä tiedostojen
  lukemista oikotienä. Jos laajennus ei ole yhteydessä, ajo
  keskeytetään sen sijaan että korvattaisiin muulla menetelmällä.
  Paikallista kansiota käytetään vain sen tarkistamiseen onko
  siellä julkaisemattomia luonnoksia, jottei ehdoteta jo
  kirjoitettua aihetta.
- **Kanavalinjaus muutettu: käytössä vain Instagram, Facebook
  siirretty suunnitteluvaiheeseen.** Mitään ei poistettu.
  META-MARKKINOINTI.md sai uuden luvun 0.1 (kanavalinjaus
  perusteluineen ja taulukko siitä mikä muuttuu), ja
  Facebook-kohtaiset luvut on merkitty tunnisteella
  **[FACEBOOK — MYÖHEMMIN]**. Luvun 10 elokuun aikataulu päivitetty
  vastaamaan todellisuutta: suurin osa perustyöstä tehtiin jo
  heinäkuussa, ja Facebook-kohdat siirrettiin omaan listaansa.
  Sisällöntuotantoon muutos ei vaikuta lainkaan.
- **Testattu 28.7.2026: Instagram-mainoksen luonti onnistuu ilman
  Facebook-sivua** ja aiemmin lisätyt maksutavat olivat säilyneet.
  Maksutavat ja mainostili kuuluvat yritysportfoliolle, eivät
  sivulle. Kovaa takarajaa sivun rakentamiselle ei siis ole.
  Realistinen ajankohta on syksy. Uusi sivu luodaan portfolion
  omistukseen, koska portfolio on jo pystyssä.
- **Tarkennus ohjeisiin: Petra ei osallistu markkinointiin eikä
  minkään järjestelmän ylläpitoon.** Claude ehdotti häntä
  Facebook-sivun ylläpitäjäksi. Väärin. Petra on vastuusairaanhoitaja
  eikä osallistu hoitoihin, markkinointiin, someen, sivustoon eikä
  muuhun ylläpitoon. Ks. luku 1 Tiimi.
- **TEHTY 30.7.2026: Google Driven synkronointi käytössä.**
  `C:\studiomahla` synkronoidaan Driveen peilaustilassa, studion
  Google Workspace -tilillä. Kansio pysyy nykyisellä paikallaan.

  **Miksi kansiota ei siirretty Driven sisälle:** ajastettujen
  tehtävien ohjeissa on polku `C:\studiomahla` kymmenissä
  kohdissa. Siirto olisi rikkonut ne kaikki ja edellyttänyt
  kansion valitsemista Coworkissa uudelleen. Drivessa kansio
  näkyy kohdassa Tietokoneet eikä Oma Drive -osiossa, mikä on
  pelkkä kosmeettinen ero.

  **Valittu peilaus, ei suoratoisto.** Suoratoistossa tiedostot
  ladataan vasta tarvittaessa, mikä voisi kaataa
  generaattoriskriptit ja GitHubiin viennin.

  Tarkistettu synkronoinnin jälkeen: 106 tiedostoa, 7,5 Mt,
  luku ja kirjoitus toimivat normaalisti.

  Huomioitava jos joskus siirrytään paikalliseen gitiin: `.git`
  -hakemiston synkronointi Driveen voi aiheuttaa ristiriitoja.
  Nyt hakemistoa ei ole.
- **Kaikki työtiedostot koottu yhteen kansioon: `tuotanto/`.**
  Generaattorit, fontit ja valmis media olivat aiemmin
  väliaikaisessa työkansiossa joka tyhjenee istuntojen välillä.
  Nyt ne ovat samassa paikassa sivuston kanssa (6,3 Mt).
  **Kansiota ei viedä GitHubiin.** Estetty varotoimena myös
  robots.txt-tiedostossa. Ohje: `tuotanto/LUE-TAMA.md`.
  Jos `C:\studiomahla` synkronoidaan Driveen, kaikki
  varmuuskopioituu samalla. Paikallisessa kansiossa ei ole
  `.git`-hakemistoa, joten synkronointi on turvallista.
- **Uusi blogiartikkeli julkaistu:
  `mikroneulaus-kaula-dekoltee-kadet.html`** (967 sanaa). Aiheena
  kaula, dekoltee ja kämmenselät. Ydinperustelu: näillä alueilla on
  vähemmän talirauhasia ja karvatuppeja, joista ihon pinta
  uusiutuu, joten paraneminen kestää pidempään. Sanoo suoraan että
  tutkimusnäyttö painottuu kasvoihin. Linkitetty blogi.html,
  sitemap.xml, etusivun Lisäpalvelut-osio, mikroneulaus-opas.html
  ja mikroneulauksen-jalkihoito.html.
- **Termi "suojaeste" poistettu koko sivustolta.** Viisi esiintymää
  kahdessa artikkelissa (jälkihoito, talvella) korvattu muodolla
  "ihon oma suojakerros" luvun 5 linjauksen mukaisesti. Laajempi
  kielentarkistus tehdään myöhemmin erikseen.
- **Uusi kirjoitussääntö:** sisäinen kannattavuuslogiikka ei kuulu
  asiakastekstiin vaikka se olisi totta. Poistettiin kappale joka
  perusteli lisäpalvelumallia sillä että asiakas on jo paikalla.
- **Mikroneulauksen lisäalueet päätetty:** kaula, dekoltee ja
  kämmenselät, 35 € per alue, vain lisäpalveluna kasvohoidon
  yhteydessä. Sama hintapiste kuin LED-lisäpalvelulla. Enintään
  20 min per alue. Sarja-alennus sama kuin hoitosarjoissa: 5 %
  kolmen ja 10 % kuuden hoidon sarjassa. Kirjattu lukuun 3.
  **Sisältösuunnitelma:** lisäalueista tehdään oma blogiartikkeli
  (luku 8) ja jokaisesta alueesta oma Reels (REELS-IDEAT.md luku 8b).
  **Lisätty myös etusivulle 28.7.2026:** oma Lisäpalvelut-alaryhmä
  Hoidot-osion sisällä, erotettuna ohuella viivalla. Kortit ovat
  matalampia ja ilman järjestysnumeroita, jotta 35 € lisäpalvelu ei
  näytä samanarvoiselta kuin 1080 € sarjahoito. Samalla:
  osion otsikko Hoidot → Kliininen mikroneulaus, ja voide-maininta
  siirretty korteista yhteiseen alatekstiin (oli kolmesti).
  Lisäalueet lisätty myös BeautySalon-skeeman OfferCatalogiin.
  **Lisätty Timmaan 28.7.2026.** Kuvaukset kirjoitettu
  fysiologiaan perustuen (talirauhasten ja karvatuppien vähäisempi
  määrä ja siitä seuraava hitaampi paraneminen), ei väitteellä
  pienemmästä neulasyvyydestä. Sivuston hinnastoon ja
  Service-skeemaan lisätään erikseen pyydettäessä.
- **Uusi luku 14c: oma ihonhoitobrändi pitkän aikavälin suuntana.**
  Ei ajankohtainen, aikajänne vuosia, este on pääoma. Toinen hoitola
  suljettu pois. Käyttäjän suunnitelma kirjattu kokonaisuudessaan:
  suojamuuria korjaava tehoseerumi, kestotilausmalli, formulointi,
  talous ja logistiikka. Lisätty neljä tarkistettavaa kohtaa, joista
  tärkein: katelaskelmissa oli alv mukana. Lisätty myös
  hyaluronihappokapselit ja yhdistelmätilaus. Korjatut katteet per
  toimitus: seerumi 9,34 €, kapselit 10,73 €, yhdistelmä 26,86 €
  (suunnitelmassa 14,60 / 13,45 / 34,85). Yhdistelmätilaajan
  vuosiarvo 161 € eikä 209 €. Pääomantarve yhteensä 30 900 €
  nettona ennen ensimmäistä myyntiä. Muut löydökset: alennettu
  verokanta on 13,5 % eikä 14 %, kaksi verokantaa samassa
  lähetyksessä mutkistaa hinnoittelua, ja EFSA-väittämä kattaa vain
  C-vitamiinin eikä hyaluronihappoa.
- **Muut alustat arvioitu ja hylätty toistaiseksi** (Pinterest,
  TikTok, X, LinkedIn). Ratkaiseva peruste: studio on paikallinen
  palvelu jolla on yksi tekijä ja rajattu kapasiteetti, eikä
  valtakunnallinen näkyvyys muutu varauksiksi. Suurin käyttämätön
  kanava on Google-yritysprofiilin arvostelut avauksesta 5.9.
  alkaen. Kirjattu META-MARKKINOINTI.md lukuun 12.
- **Karuselligeneraattoriin lisätty kansidian sävykierto.** Kolme
  taustaa (tummanvihreä, keskivihreä, kerma), koska kansidia on ainoa
  dia joka näkyy Instagram-ruudukossa ja pelkkä vihreä teki
  ruudukosta yksivärisen. Uusi väri pink_soft #ecd6c5, koska aiempi
  pink_pale jäi keskivihreällä arvoon 4,41:1 eli alle WCAG-rajan.
  Kaikki yhdistelmät nyt yli 4,5:1. Kirjattu META-MARKKINOINTI.md
  lukuun 3.5a.
- **Toinen Reels tuotettu: 2.1 Pistoskulma** (kynä vai rulla),
  22,6 s, julkaisu 29.7. Ensimmäinen vaalealla kansidialla.
- **Meta-automaattivastaukset testattu ulkopuolisella tilillä ja
  todettu toimiviksi.** Mobiilisovelluksella luodut automaatiot eivät
  näy Business Suiten työpöytänäkymässä, mutta ovat silti voimassa.
  Tila varmistetaan testiviestillä, ei työpöytänäkymästä.
- **Facebookin Erikoisalat-osio täytetty** (8 kohtaa). Osio on
  nimeltään Erikoisalat, ei Palvelut. Ei hintakenttää, joten hinnat
  kirjoitettiin kuvausteksteihin. **Muistettava päivittää käsin kun
  hinnasto muuttuu.** Kirjattu META-MARKKINOINTI.md lukuun 2.
- **Facebook-sivun profiilikuva päätetty pitää nykyisellään**
  (valkoinen ympyrä, musta logo).
- **Facebook-sivun kansikuva tehty ja valittu.** Vaihtoehto C:
  logo, sanamerkki ja tagline tummanvihreällä pohjalla. Tekniset
  vaatimukset ja sumeuden syyt kirjattu META-MARKKINOINTI.md
  lukuun 2. Oikea kuvasuhde on 820 × 312 ja lähtökuvan on oltava
  2048 pikseliä leveä, koska Facebook pienentää kaikki kuvat siihen
  ja tarjoilee niistä pienempiä versioita.
- **Uusi pysyvä sääntö Claudelle: kolmannen osapuolen palveluiden
  ominaisuudet tarkistetaan ajantasaisesta dokumentaatiosta ennen
  ehdottamista.** Koskee kaikkia palveluita (Meta, Instagram,
  Facebook, Timma, Cloudflare, Google Business Profile, Fonecta).
  Muistikuva tai "se on tyypillisesti kohdassa X" ei riitä
  perusteeksi. Jos varmistusta ei löydy, se sanotaan suoraan.
  Kirjattu lukuun 0 (pysyvät ohjeet).
  - **Tausta**: ehdotin Facebookin usein kysytyt kysymykset
    -automaatiota tarkistamatta että se on nykyisessä
    käyttöliittymässä. Käyttäjä etsi sitä turhaan. Jälkikäteen
    tarkistettuna ominaisuus oli olemassa (Business Suite →
    Postilaatikko → Automaatiot, enintään 4 kysymystä, saatavilla
    myös Instagram-sovelluksessa), mutta arvaus olisi voinut yhtä
    hyvin osua väärään.
  - **Vahvistettu samalla**: Metan automaatiotyypit ovat välitön
    vastaus, viesti poissa, usein kysytyt kysymykset ja kommentin
    vastaus. Ne voivat olla "Luo automaatio" -napin takana pohjina
    eivätkä näy suoraan listana jos muokataan olemassa olevaa
    automaatiota.
- **Meta Pixel varmistettu toimivaksi.** Tapahtumienhallinnassa näkyy
  tapahtumia koko heinäkuun ajan (päivittäin n. 5–50, piikki 16.7.
  noin 52). Tietojoukko 1720418568979435 liitetty oikeaan yritykseen
  ja sivustoksi tunnistettu www.studiomahla.fi. Sivuston puoli
  tarkistettu koodista: `assets/meta-pixel.js` on oikein toteutettu,
  lataa Metan skriptin ja kirjaa PageView-tapahtuman.
  - Tapahtumienhallinnan "0 % valmis" -palkki koskee Conversions API
    -palvelinpuolen seurantaa, joka on lisäominaisuus eikä edellytys
    mainonnalle. Voidaan jättää huomiotta toistaiseksi.
  - **Tehtävä ennen mainonnan alkua**: pixel kirjaa nyt vain
    PageView'n. Mainonnan optimointia varten tarvitaan
    konversiotapahtuma. Lähin mitattava on Ajanvaraus-napin klikkaus,
    koska varsinainen varaus tapahtuu Timmassa jonne pixel ei ulotu.
    Vaatii muutaman rivin lisäyksen opening-state.js-tiedostoon.
    Tehdään ennen syys-lokakuun mainonnan käynnistystä.
- **Facebookin CTA-napin rajoitus todettu**: "Varaa nyt" ei tue
  Timmaa, ja Facebookin omaa varausjärjestelmää ei oteta käyttöön
  koska se toisi päällekkäisen kalenterin. Vaihtoehto: jokin toinen
  nappityyppi joka hyväksyy vapaan URL-osoitteen. Jos sellaista ei
  löydy, reitti varaukseen hoituu kuvatekstien linkeillä (klikattavia
  Facebookissa) ja sivun tiedoissa olevalla verkkosivuosoitteella.
  Ei vaikuta Pixel-seurantaan, koska konversiotapahtuma laukeaa
  sivuston napista. Kirjattu META-MARKKINOINTI.md lukuun 2.2.
- **Valmiiksi todettu**: Facebookin CTA (siltä osin kuin mahdollista),
  Instagramin yhteystietonapit ja aukioloajat molemmissa kanavissa.
- **Julkaisutahti päätetty: kolme julkaisua viikossa.** 2 Reelsiä ja
  1 karuselli tai kuva. Facebookiin sama sisältö samalla toiminnolla.
  Vaiheistus: nyt–5.9. kolme viikossa (profiilin rakentaminen ennen
  avausta), syys–lokakuu kolme viikossa (maksettu mainonta
  käynnistyy), marraskuusta eteenpäin kaksi viikossa (ylläpito).
  - **Perustelu päivittäistä vastaan**: Instagram ei palkitse
    julkaisutiheydestä vaan sitoutumisesta per julkaisu. Päivittäin
    julkaistessa sama yleisö jakautuu useammalle julkaisulle ja
    yksittäisten suoritus heikkenee, mikä on algoritmille negatiivinen
    signaali. Lisäksi 40 ideaa loppuisi kuudessa viikossa, ja
    päivittäinen tahti on ristiriidassa koko strategian lähtökohdan
    kanssa.
  - **Missä määrällä on merkitystä**: algoritmi tarvitsee n. 10–20
    julkaisua ymmärtääkseen tilin aihepiirin. Kolmen viikkotahdilla
    tämä täyttyy noin kuudessa viikossa eli osuu avaukseen 5.9.
    Avaukseen mennessä profiilissa n. 18 julkaisua.
  - **Toteutus**: yksi tuotantosessio kuukaudessa, n. 12 julkaisua
    kerralla ajastettuna Business Suitessa. Aikaa n. 2 h/kk.
  - Kirjattu META-MARKKINOINTI.md lukuun 3.2.
- **Laitekuvajulkaisu tehty ja ajastettu perjantaille 31.7.**
  Yksittäinen kuvajulkaisu MicroPen EVO -laitteesta. Kolme varianttia
  tehtiin (pelkkä kuva, vaalea brändipohja, tumma brändipohja),
  käyttäjä valitsi tumman. Kuva 1080 × 1350, alkuperäinen valokuva
  rajattuna ja brändiotsikot alareunassa. Tiedostot kansiossa
  `outputs/julkaisut`.
  - **Kuvateksti**: 1030 merkkiä. Kotka mainitaan heti ensimmäisessä
    lauseessa jotta se osuu Instagramin katkaistuun näkymään. Oma
    kappale siitä että laitteella hoidon tekee aina koulutettu
    terveydenhuollon ammattilainen, kärkenä "lääkinnällinen laite ei
    yksin riitä, ratkaisevaa on myös se kuka sitä käyttää".
  - **Hashtag-linjaus muutettu**: paikalliset tunnisteet (#kotka,
    #kymenlaakso, #ihonhoitokotka) pudotettiin. Perustelu: Instagram
    on siirtynyt pois hashtag-pohjaisesta jakelusta, ja paikallisten
    tunnisteiden selaajat eivät etsi ihonhoitoa. Paikallisen
    löydettävyyden hoitavat sijaintimerkintä, kuvatekstin luonnolliset
    sanat (Instagram indeksoi kuvatekstin) ja profiilin nimi-kenttä.
    Jäljelle jää 3–4 aihekohtaista tunnistetta, joiden tehtävä on
    kertoa algoritmille aihe.

### 2026-07-27
- **Ensimmäinen mittaustulos formaattivertailusta (12 h)**: Reels 206
  näyttöä, karuselli 27. Ero 7,6-kertainen Reelsin hyväksi. Huom:
  Instagram laskee Reelsin näytöt ja karusellin kattavuuden eri
  tavalla, joten luvut eivät ole täysin vertailukelpoisia, mutta ero
  on niin suuri että suunta on selvä. Selitys: uudelle tilille
  karuselli näytetään pääosin seuraajille joita ei ole, Reels
  työnnetään ei-seuraajille. **Alustava johtopäätös: Reels on
  jakelukanava, karuselli syvyyssisältö. Painotus noin kolme Reelsiä
  yhtä karusellia kohden.** Vielä seurattava profiilikäynnit,
  ei-seuraajien osuus ja tallennukset, koska näytöt ovat pintaluku.
  Kirjattu META-MARKKINOINTI.md lukuun 3.5b.
- **Ensimmäinen Reels tehty ja julkaistu**: lyhennetty versio
  karusellin aiheesta, 8 diaa, 62 sanaa, 27,4 s. Julkaistiin samana
  päivänä kuin karuselli molempiin kanaviin. Claude suositteli
  odottamaan muutaman päivän, mutta käyttäjä huomautti perustellusti
  että Reels menee eri jakelupintaan (Reels-välilehti ja Explore)
  eikä päällekkäisyyttä synny kun seuraajia ei vielä ole.
  Toistovaroitus koskee tilejä joilla on vakiintunut seuraajakunta.
  **Syntyi samalla vertailuasetelma**: sama aihe, sama päivä, kaksi
  formaattia. Verrataan kattavuutta, ei-seuraajien osuutta,
  tallennuksia ja profiilikäyntejä. Tulos ratkaisee kumpaa formaattia
  painotetaan jatkossa. Kirjattu META-MARKKINOINTI.md lukuun 3.5b.
- **Reels-generaattori rakennettu ja ideapankki kaivettu**:
  - `reels.py` (outputs-kansio) muuntaa karusellidiat pystyvideoksi
    1080 × 1920, H.264, 30 fps. Diat sommitellaan pystykehykseen ja
    tausta täytetään dian omalla värillä. Ristihäivytykset
    siirtymissä. Vaatii ffmpeg, joka löytyi sandboxista valmiina.
  - **Keskeinen havainto: Reelsiä ei voi tehdä karusellista suoraan.**
    Karusellissa lukija hallitsee tahdin, Reelsissä video hallitsee.
    Mitattu: 165 sanan karuselli vaatisi 70 sekuntia mukavaan
    lukemiseen. Sama aihe Reelsinä 62 sanalla mahtuu 27 sekuntiin.
    Reels vaatii noin 60 % vähemmän tekstiä. Kestot mitoitetaan
    kaavalla `sanoja / 2,8 + 1,2`.
  - **Työtapa päätetty**: älä pilko artikkelia useaan Reelsiin (tuottaa
    toistoa), vaan kaiva koko sisältövarastosta yksittäiset vahvat
    ajatukset ja tee jokaisesta oma Reels. Kolme tai neljä diaa,
    15–20 sekuntia.
  - **Uusi tiedosto `REELS-IDEAT.md`**: 40 ideaa kaivettu nykyisestä
    blogimateriaalista, luokiteltu vahvuuden mukaan (18 vahvinta,
    18 hyvää, 4 täydentävää). Kullekin lähdeartikkeli, kestoarvio ja
    diaehdotukset. Sisältää suositellun aloitusjärjestyksen
    kymmenelle ensimmäiselle. Riittää 20 kuukaudeksi kahdella
    julkaisulla kuukaudessa. Lisätty robots.txt Disallow-listalle.
  - **Perustelu formaatin käytölle**: diaesitys-Reels on Reels-
    formaateista heikoin, mutta saa selvästi paremman jakelun kuin
    karuselli koska Meta työntää Reelsiä ja näyttää sen myös
    ei-seuraajille. Marginaalikustannus n. 15 min. Ehdot: ääni
    lisättävä sovelluksessa, pituus 15–20 s, ei jokaisesta
    karusellista.
  - **Ristiinjulkaisu**: sekä karusellit että Reelsit julkaistaan
    molempiin kanaviin. Facebookin käyttäjäkunta painottuu yli
    45-vuotiaisiin, mikä osuu ikääntymisen merkit -painopisteeseen ja
    on maksukykyinen segmentti sarjahoidoille. Kuvateksti kannattaa
    muokata alustakohtaisesti, koska Facebookissa linkit ovat
    klikattavia ja Instagramissa eivät.
- **Karusellidiojen generaattori rakennettu**: Python-skripti
  `karuselli.py` (outputs-kansio) tuottaa 1080 × 1350 px PNG-diat
  Instagram- ja Facebook-karuselleihin. Brändivärit suoraan
  `style.css`-muuttujista, brändifontit (Cormorant Garamond, Jost)
  kansiossa `outputs/fontit`. Viisi diatyyppiä: kansi, teksti, lista,
  nosto, loppu. Uuden karusellin tekeminen on tekstin kirjoittamista
  eikä taittamista, mikä on olennaista koska somea ei tehdä
  aktiivisesti.
  - **Sommittelu**: ankkuroitu kolmannesperiaate. Kaksi edeltävää
    versiota hylättiin: kiinteä yläreunasta alkava asettelu (lyhyt
    sisältö jätti alaosan tyhjäksi) ja tiukka pystykeskitys (teksti
    muodosti tiiviin möykyn keskelle).
  - **Saavutettavuus**: kaikki tekstiyhdistelmät täyttävät WCAG AA.
    Alkuperäinen terrakotta (#c8997a) vaalealla taustalla oli vain
    2,23:1 ja korvattiin tummemmalla sävyllä #8f5f3f (4,78:1).
    Light-fonttileikkaus poistettiin käytöstä luettavuuden vuoksi.
    Pienin tekstikoko 36 px eli n. 13 px puhelimen näytöllä.
  - **Typografia-asteikko** kalibroitu brändifonteille. Cormorant
    Garamondin x-korkeus on n. 80 % Lorasta ja Jostin n. 86 %
    Poppinsista, joten pistekokoja kasvatettiin kun varafonteista
    siirryttiin brändifontteihin.
  - **Huom**: fonttien hankinta vaati käyttäjän apua. npm- ja
    pip-rekisterit ovat estettyjä sandboxissa eikä Claude saa hakea
    tiedostoja URL-osoitteista. Käyttäjä latasi fontit Google
    Fontsista ja lähetti zip-pakettina.
- **Ensimmäinen karuselli valmis ja julkaistu**: "Mitä kliininen
  mikroneulaus oikeasti tekee iholle?" (9 diaa) artikkelista
  `mita-on-kliininen-mikroneulaus.html`. Kuvateksti 1878 merkkiä,
  sisältää linkit artikkeliin, sivustolle ja Timmaan. Dokumentoitu
  META-MARKKINOINTI.md lukuun 3.5b. **Julkaistu 27.7.2026 sekä
  Instagramiin että Facebookiin. Tämä on tilien ensimmäinen
  julkaisu.**
- **Meta-käyttöönotto edennyt**: henkilökohtainen Facebook-tili luotu
  yksityisyysasetuksin, Facebook-yrityssivu luotu ja julkaistu,
  Instagram Business -tili yhdistetty. Kuvaus molemmissa kanavissa:
  "Kliininen mikroneulaus Kotkan Ruonalassa terveydenhuollon
  ammattilaisten tekemänä." (82 merkkiä, Facebookin lyhyen kuvauksen
  raja 101 merkkiä). Automaattivastaukset otettu käyttöön.
  **Tekninen huomio: Business Suiten työpöytäversio ei tallentanut
  automaatioasetuksia** (toggle palautui, tallennus epäonnistui
  vaikka sivu julkaistu ja oikeudet kunnossa). Ratkaisu: automaatiot
  tehtiin mobiilisovelluksella. Kirjattu META-MARKKINOINTI.md:hen.
- **Brändilinjaus lukittu: yritysbrändi, ei henkilöbrändi.**
  Markkinointi keskittyy studioon ja hoitomuotoihin, ei
  ammattilaisiin henkilöinä. Ammattitausta mainitaan vain siinä
  merkityksessä että studiossa työskentelee ainoastaan
  terveydenhuollon ammattilaisia. Kasvot saavat näkyä kuvissa
  (muotokuvat ja työskentelykuvat), mutta sisältö puhuu studiosta
  ja menetelmistä, ei henkilöistä. Ei henkilökohtaisia tarinoita,
  uratarinoita tai arjen jakamista. Käytetään me-muotoa, ei
  minä-muotoa. Nimiä käytetään säästeliäästi eikä koskaan
  otsikkotasolla. **Poikkeus: verkkosivuston tiimi-osio säilyy
  nykyisessä muodossa** (kuvat, nimet, taustat), koska sivustolla
  kävijä on jo aktiivisesti etsimässä tietoa ja haluaa tietää kuka
  hoidon tekee. Lisätty META-MARKKINOINTI.md lukuun 0.5 ja
  sisältöpilari 4 muotoiltu uudelleen ("Tiimi" → "Ammattitausta").
- **Ennen ja jälkeen -kuvia ei käytetä lainkaan.** Tietoinen
  brändipäätös, ei pelkkä Metan sääntöjen noudattaminen. Perustelu:
  ennen/jälkeen-kuvia on nykyään erittäin helppo väärentää
  (valaistus, kuvakulma, meikki, kuvankäsittely, tekoälytyökalut),
  joten koko kuvatyypin uskottavuus on kärsinyt. Kliinisessä
  positioinnissa on johdonmukaisempaa olla käyttämättä niitä
  ollenkaan. Linjaus koskee sekä somea että sivustoa ja kaikkea
  markkinointimateriaalia. Voidaan myös sanoa ääneen sisällössä
  erottautumistekijänä.
- **Instagram-tilin nykytila**: tyhjä tai lähes tyhjä. Ei tarvetta
  siivota vanhaa sisältöä. Suunnitelmaan lisätty avausruudukko-osio
  (9 ensimmäistä julkaisua muodostavat ensivaikutelman
  profiilissa).
- **Meta-hallinnan käyttöönotto ja somestrategia päätetty**: Meta
  (Facebook + Instagram) otetaan omaan hallintaan elokuussa 2026.
  Facebook-tili luodaan (käyttäjä poistui Facebookista aiemmin) koska
  se on tekninen edellytys Meta Business Suitelle ja Instagram-
  mainonnalle. Somestrategian perusperiaate: **somea ei tehdä
  aktiivisesti, kommentteihin ja yksityisviesteihin ei vastata.**
  Someprofiilien tarkoitus on toimia info- ja markkinointikanavana
  joka ohjaa sivustolle ja ajanvaraukseen. Kirjattu lukuun 9.
- **Laaja Meta-markkinointisuunnitelma laadittu**: uusi tiedosto
  `META-MARKKINOINTI.md` (estetty hakukoneilta robots.txt:ssä).
  Sisältää 13 lukua: strategian rehellinen arvio ja riskit, tekninen
  käyttöönotto vaiheittain, profiilien optimointi (bio, nimi-kenttä,
  kohokohdat, linkkistrategia), sisältöstrategia ja viisi
  sisältöpilaria, batch-tuotantomalli, yksityiskohtainen
  valokuvauslista elokuun kuvaukseen, viestintäautomaatio
  (automaattivastaukset koska ei vastata manuaalisesti), hashtag- ja
  löydettävyysstrategia, Metan mainossäännöt kauneusalalla
  (ennen/jälkeen-kuvien kielto, terveysväitteet, henkilökohtaisiin
  ominaisuuksiin viittaamisen kielto), tietosuoja ja asiakaskuvien
  luvat, mittarit ja seuranta, maksetun mainonnan vaihe
  kampanjatyypeittäin ja budjetteineen, toteutusaikataulu
  elokuu–marraskuu, riskitaulukko sekä lista siitä mitä ei tehdä.
- **robots.txt päivitetty**: `META-MARKKINOINTI.md` lisätty
  Disallow-listalle samoin kuin PROJECT.md.
- **Maksetun mainonnan aloitussuunnitelma lukittu**: Google Ads
  ei tässä vaiheessa (orgaaninen näkyvyys jo Googlen etusivulla
  hakusanoilla "aknenhoito Kotka", "aknearpien hoito Kotka",
  "mikroneulaus Kotka"). Elokuussa 2026 ammattivalokuvaus (brandi-
  shoot: tila, Jaakko + Petra, työskentelykuvat). Syys-lokakuussa
  Meta-mainonta 300–500 €/kk. Kirjattu lukuun 9.
- **Meta descriptionit lyhennetty SEO-optimaaliseen pituuteen**: 8
  sivun meta description oli yli 165 merkkiä (Google leikkaa
  hakutuloksissa n. 155-160 merkin jälkeen). Kaikki päivitetty
  välille 130-162 merkkiä: mikroneularulla-vai-kliininen-mikroneulaus,
  mikroneulauksen-jalkihoito, mikroneulaus-opas, mikroneulaus-sarjahoito,
  mikroneulaus-talvella, milloin-aloittaa-mikroneulaus,
  mita-tutkimus-sanoo-mikroneulauksesta, mita-on-kliininen-mikroneulaus.
- **privacy.html Open Graph -tiedot ja Twitter Card lisätty**:
  aiemmin puuttuivat kokonaan. Käyttää samaa `assets/og-default.jpg`-
  kuvaa kuin muut sivut. Sisällössä tietosuojaselosteeseen sopiva
  otsikko ja lyhyt kuvaus.
- **sitemap.xml päivitetty**: `<lastmod>`-päivämäärä päivitetty
  arvoon 2026-07-23 kaikilla sivuilla joita muokattiin tänään
  (etusivu ja 9 muuta sivua: mikroneulaus-opas,
  milloin-aloittaa-mikroneulaus, mita-ensikaynnilla-tapahtuu,
  mikroneulauksen-jalkihoito, mikroneulaus-sarjahoito,
  mikroneulaus-sopiiko-minulle, mita-tutkimus-sanoo-mikroneulauksesta,
  mikroneularulla-vai-kliininen-mikroneulaus, mita-on-kliininen-
  mikroneulaus). Blogi.html ja privacy.html jätetty ennalleen koska
  niitä ei muutettu. Tiedoston yläkommentin "Päivitetty"-päivämäärä
  myös 2026-07-23. mikroneulaus-talvella.html ei kuulu sitemapiin
  (julkaistaan loka-marraskuussa). proxn-kasvohoito.html ei kuulu
  sitemapiin (julkaistaan myöhemmin kuvien kanssa).
- **index.html Open Graph -kuva ja Twitter Card lisätty**: aiemmin
  etusivulta puuttui `og:image`, `og:image:width`, `og:image:height`,
  `og:image:alt` sekä koko Twitter Card -lohko (`twitter:card`,
  `twitter:title`, `twitter:description`, `twitter:image`). Tämä
  aiheutti että etusivun linkkiä someen jakaessa ei näkynyt
  esikatselukuvaa. Nyt käyttää samaa `assets/og-default.jpg` -kuvaa
  kuin muut sivut. Muut sivut sisälsivät nämä metatiedot jo aiemmin.
- **UKK 05 ja 06 yhdistetty**: kohdat "Kuinka varaan ajan?" ja
  "Miten voin maksaa hoidon?" yhdistetty yhdeksi kohdaksi "Ajanvaraus
  ja maksutavat" sekä näkyvässä UKK-osiossa että FAQPage JSON-LD
  schemassa. Vastaus sisältää suoran linkin ajanvaraukseen
  (https://varaa.timma.fi/studiomahla) yläreunan Ajanvaraus-painikkeen
  lisäksi.
- **Maksutavat lisätty sivustolle**: käytössä korttimaksut (pankki-
  ja luottokortit), Klarna ja käteinen tasarahalla. Kaksi muutosta:
  - `index.html` UKK-osioon lisätty uusi kohta 06 "Miten voin maksaa
    hoidon?" vastauksella.
  - `index.html` FAQPage JSON-LD schemaan lisätty vastaava
    Question/Answer-lohko (Google voi näyttää hakutuloksissa).
  - `index.html` BeautySalon JSON-LD schema `paymentAccepted`-kenttä
    päivitetty: aiempi "Credit Card, MobilePay" korvattu muodolla
    "Credit Card, Debit Card, Klarna, Cash".
- **Footerin aukiolojen sijoittelu tarkennettu**: aukioloajat siirretty
  yhteystiedoista Ajanvaraus-napin viereen omalla otsikolla
  "Aukioloajat" (11px label-tyyliä). Aukiolotekstit hieman isompana
  kuin yhteystiedot (15px vs. 14px). Rakenne: nappi vasemmalla,
  aukiolot oikealla (flex row) desktop-näytöllä, mobiilissa nappi
  ylhäällä ja aukiolot alla (flex column). Muutokset layout.js:ään
  (footer__hours-lohko footer__cta:n sisällä) ja style.css:ään
  (uudet .footer__hours, .footer__hours-label, .footer__hours-times
  -säännöt, .footer__cta muutettu flex-rakenteeseen).
- **Aukioloajat lisätty sivustolle**: arkisin 14–20, viikonloppuisin
  10–20. Kaksi muutosta:
  - `layout.js` FOOTER_HTML: footer__contact-sarakkeeseen lisätty
    osoitteen alle rivit "Arkisin 14–20" ja "Viikonloppuisin 10–20".
    Näkyy kaikilla sivuilla footerissa.
  - `index.html` BeautySalon JSON-LD schema: lisätty
    `openingHoursSpecification` -kenttä kahdella lohkolla (arkipäivät
    Mon–Fri 14:00–20:00, viikonloput Sat–Sun 10:00–20:00). Tämä on
    aiemmin poistettu kun studio oli suljettu, nyt palautettu oikeilla
    ajoilla. Näkyy Googlen hakutuloksissa ja Business Profilessa
    automaattisesti kun Google kaappaa schemasta.
  - Tietolistaan luvun 0 studion perustietoihin lisätty aukioloajat.
- **Google Business Profile -esittelyteksti kirjattu lukuun 1**:
  n. 460 merkkiä pitkä teksti joka mainitsee studion sijainnin (Kotkan
  Ruonala), kohderyhmät (akne ja sen oireet, ärtynyt ja herkkä iho,
  ikääntymisen merkit), terveydenhuollon ammattilaisen taustan
  yleisellä tasolla ja mikroneulaushoidon laitteen (MicroPen EVO,
  FDA + CE IIa). Ei mainita erikseen sairaanhoitajaa (AMK) eikä
  ProXN:ää tässä vaiheessa. Käyttäjä päivittää tekstin Google
  Business Profileen Fonectan kautta. Teksti odottaa päivitystä
  kun ProXN otetaan käyttöön ja LED-valohoito syksyllä.
- **MicroPen EVO -laitekuva optimoitu**: Alkuperäinen `micropenEVO.jpg`
  oli 15,65 MB (5464×8192 px), mikä aiheutti näkyvän latausviiveen jopa
  valokuituverkolla. Optimoitu:
  - JPG pienennetty 1200×1799 pikseliin, laatu 82, progressive JPG,
    optimize=True → **59,1 kB (99,6 % pienempi)**
  - WebP-versio samasta lähteestä laatu 82, method 6 →
    **21,6 kB (99,9 % pienempi)**
  - `index.html` rivi 794-797: `<img>` korvattu `<picture>`-elementillä,
    jossa WebP-lähde modernin selaimen priorisoi ja JPG toimii
    fallbackina. Lisätty `width="1200" height="1799"` layout-hyppyjen
    estämiseksi. Poistettu `loading="lazy"` ja lisätty
    `fetchpriority="high"` koska laite-osio on riittävän ylhäällä
    etusivulla.
  - Alkuperäinen 15,65 MB tiedosto on korvattu optimoidulla; jos
    tarvitset alkuperäisen takaisin, se on tallessa uploads-kansiossa.
- **Yleinen ohje jatkoon**: kaikki uudet kuvat sivustolle pitää
  optimoida ennen pushia. Käytännön säännöt: pysty- ja neliökuvat
  1200 px lyhyestä sivusta, laakakuvat 1600 px pitkästä sivusta,
  laatu 80-85, WebP-versio kaikkiin isoihin kuviin, `<picture>`-
  elementti HTML:ssä.
- **Petran taustatiedot ja Jaakon MicroPen EVO -sertifikaatti kirjattu**:
  Petra Sahari on pitkän linjan yrittäjä sosiaali- ja
  terveydenhuoltoalalla, tuo studioon osaamista aseptiikasta ja
  turvallisesta hoitotyöstä. Ei osallistu hoitojen toteutukseen.
  Jaakko on suorittanut MicroPen EVO Certificate Course -koulutuksen
  Revance Academyssa 24.5.2026 (sertifikaatti PDF-liitteenä uploads-
  kansiossa). Molempien esittelyluonnokset päivitetty luvun 1
  Tiimi-osiossa odottamaan tiimi-osion lisäystä etusivulle kuvien
  saapumisen jälkeen.
- **Tiimin tietoja saatu käyttäjältä**: Jaakko Sandström on hoitaja
  (lähihoitaja), jolla 20 vuoden kokemus kauneudenhoidon parissa sekä
  pitkä tausta erikoissairaanhoidossa kirurgisessa hoitotyössä
  (verisuonikirurgian haavanhoito). Petra Sahari on vastuuhoitaja,
  sairaanhoitaja (AMK). Petran tarkempi koulutushistoria, kokemusvuodet
  ja erikoistumisalueet puuttuvat vielä. Tiedot lisätty luvun 1 Tiimi-
  osioon ja Tietolistaan. Tiimi-osio etusivulle julkaistaan vasta kuvien
  kanssa (viikko 30/2026). Valmis tekstiluonnos Jaakon esittelystä
  tallennettu luvun 1 tiimi-osioon odottamaan julkaisua.
- **index.html UKK-kohta 01 päivitetty** ("Miten saavun studiolle ja
  kuinka ajoissa minun kannattaa tulla paikalle?"). Poistettu viimeinen
  lause "Tarkemmat saapumisohjeet saat varausvahvistuksen yhteydessä".
  Lisätty maininta väliaikaisesta yläkerran sisäänkäynnistä:
  "Ikkunateippaus on alakerran sisäänkäynnin läheisyydessä, mutta
  sisäänkäynti tapahtuu väliaikaisesti yläkerran ovesta." Muutos tehty
  sekä näkyvään UKK-vastaukseen että JSON-LD FAQPage schemaan
  (rivit 906 ja 1034). Käyttäjä lisää tähän kohtaan kuvan myöhemmin.
- **Sivusto siirretty auki-tilaan (5.9. ensimmäiset vapaat ajat)**.
  Muutokset:
  - **layout.js HEADER_HTML banneri**: uusi teksti "Varauskalenteri on
    auki. Ensimmäiset vapaat ajat ovat 5.9. alkaen, varaa aikasi tästä."
    Aiempi vesivahinko-teksti korvattu.
  - **layout.js HEADER_HTML nav- ja footer-CTA-napit**: "Liity
    jonotuslistalle" → "Ajanvaraus", aria-label "Liity jonotuslistalle
    Timmassa" → "Varaa aika Timman kautta".
  - **opening-state.js yksinkertaistettu**: POSTPONED-tila poistettu
    kokonaan. Tiedosto sisältää nyt vain yksinkertaisen logiikan joka
    asettaa kaikille [data-cta="booking"] -napeille "Ajanvaraus"-tekstin
    ja Timma-URL:n. Vanha vesivahinko-teksti ei enää ole missään.
  - **index.html päivitetty 4 kohtaa**: hero-CTA-nappi, floating CTA,
    UKK-vastaus "Kuinka varaan ajan?" ja sama JSON-LD FAQPage schemassa.
    UKK-vastaus muotoiltu aikariippumattomaksi (ei mainita 5.9.-päivämäärää
    koska päivämäärä vanhenee): "Ajanvaraus tapahtuu Timman kautta.
    Klikkaa sivuston yläreunan Ajanvaraus-painiketta ja valitse sopiva
    aika kalenterista. Jos sinulla on kysyttävää, tavoitat meidät
    sähköpostilla asiakaspalvelu@studiomahla.fi."
  - **10 muun sivun CTA-lohkojen kappale**: "Jonotuslistalaisille
    ilmoitamme avajaispäivän ensimmäisenä" → "Varauskalenteri on auki ja
    ensimmäiset vapaat ajat ovat 5.9. alkaen". Sivut: mikroneularulla-vai-,
    mikroneulauksen-jalkihoito, mikroneulaus-opas, mikroneulaus-sarjahoito,
    mikroneulaus-sopiiko-minulle, mikroneulaus-talvella,
    milloin-aloittaa-mikroneulaus, mita-tutkimus-sanoo-mikroneulauksesta,
    mita-on-kliininen-mikroneulaus, proxn-kasvohoito (oma versio).
  - **milloin-aloittaa-mikroneulaus.html laajemmat leipätekstipäivitykset**:
    lead 2, aikataulu-osion johdanto, "Alkusyksyn ajat kannattaa varata
    ajoissa" -osio (aiempi "Ensimmäiset varauspäivät täyttyvät
    ensimmäisenä"), "Miten aloitat" -listan kohta 2 ja yhteenvedon
    viimeinen kappale.
  - **mikroneulaus-talvella.html**: aikataulu-osion johdanto, "Miten
    aloitat" -kohta 2 ja yhteenvedon viimeinen kappale.
  - **mikroneulaus-sopiiko-minulle.html rivi 296**: "Varaa ensikäynti —
    tai liity jonotuslistalle jos studio ei ole vielä auki." → "Varaa
    ensikäynti Timmasta."
  - Ihonhoidolliset "mikrokanavat vielä auki" -kohdat (lomake.html:313,
    mikroneulaus-opas.html:215, mita-tutkimus-sanoo-mikroneulauksesta.html:229)
    säilytetty ennallaan, ne eivät liity varaustilan.
- **Uusi sääntö kirjattu Claudelle**: Tehdään vain se mitä käyttäjä
  pyytää. Ei muutoksia sivustolle ilman lupaa. Voidaan ehdottaa mutta
  ei toteuttaa. Poikkeus: PROJECT.md-muutosloki päivittyy automaattisesti
  jokaisen muutoksen yhteydessä (tämä on jo lukuun 0 sovittu käytäntö).
### 2026-07-23
- **Uusi kirjoitusohje: Terminologia ja selkokielisyys** lisätty lukuun 5
  (kirjoitustyyli). Sisältää viisi käytäntöä: (1) termi ja sulkeissa
  selitys ensimmäisellä kerralla, (2) käänteinen kun suomennos on
  yleisempi, (3) pelkkä termi kun se on yleisesti käytössä, (4) pelkkä
  selkokielinen ilmaus kun termi ei tuo lisäarvoa, (5) ainesosaluetteloiden
  formaatti. Lisäksi ohje anglismien välttämisestä (barrier, formulaatio,
  retail), studion nimen käytöstä (Mahlamäen Kauneusstudio tai studio,
  ei "Studio Mahla" tai "studiomahla" tekstissä) ja kohderyhmäkuvausten
  muotoilusta (studion 3 painopistettä + konkreettiset tilanteet).
  Käytäntö perustuu proxn-kasvohoito.html-sivun kielenhuoltoon tehtyihin
  termivalintoihin.
- **proxn-kasvohoito.html kielenhuoltoa laajasti**: kaikki lääketieteelliset
  ja kosmetologiset termit käyty läpi käyttäjän kanssa yksitellen. Sivu
  noudattaa nyt uutta kirjoitusohjetta. Kohderyhmä-osio muotoiltu uudelleen
  niin että studion kolme painopistettä (akne, ärtynyt/herkkä iho,
  ikääntymisen merkit) on filosofian ilmaus ja ProXN kuvataan vastaavan
  näihin sekä laajempiin käyttötilanteisiin lähdemateriaalin (Pro XN
  esittely) pohjalta.
- **Vaihe 1.5 -suunnitelma lukittu: ProXN otetaan käyttöön ennen LED:iä.**
  Uusi luku 14b lisätty. Käyttäjän linjaus: sitoudutaan ProXN-linjaan
  varmuudella (retail-tuotteet valitaan myöhemmin), aloitetaan tekemällä
  proxn-kasvohoito.html taustalla. Ensikäynti muuttuu iho-arvioinniksi
  josta polutetaan joko mikroneulaus- tai ProXN-hoitoon. Ensi viikko:
  julkaistaan uusi avajaispäivämäärä (selviää maanantaina) ensin. Sen
  jälkeen ProXN-sivu ja etusivun muutokset. Aknehoito-pillar ja LED
  jäävät syksyyn kun laite saapuu.
- **ProXN-kasvohoidon ensikäynnin hinta lukittu 200 €** (sama kuin
  mikroneulauksen ensikäynti). Sarjahinnat lasketaan myöhemmin
  aikakatteella 100 €/h ja tuotekustannuksella 70 €/hoito.
- **ProXN retail-valikoiman esianalyysi tehty** (Pro XN esittely -PDF).
  Retail-tuotteita 8 (Antioxidant Therapy, Antioxidant Therapy Light,
  Recovery Cleansing Oil, Balancing Cleansing Gel, Prime Mist, LF Master,
  Sun Barrier, ABC Cream Light). Ammattilaiskäyttöön 3 (Xanthohumol
  Recovery Treatment box of 5, PHA Solution, Novel Peel). Ainutlaatuiset
  Xanthohumol Complexin sisältävät tuotteet: Recovery Cleansing Oil,
  Antioxidant Therapy, Antioxidant Therapy Light. Nämä ovat retail-ytimen
  vahvimpia perusteltavia. Sun Barrier ja ABC Cream Light ovat molemmat
  SPF 50 -aurinkosuojia (aiempi virhe: ABC Cream ei ole retinolituote).
  LF Master on Lactoferrin Amino Complex -pohjainen kotihoitotuote (ei
  vain ammattilaiskäyttöön kuten aiemmin virheellisesti arvioin, käytetään
  kuitenkin myös Stage 3 -mikroneulausvaiheessa ammattikäytössä).
  Alustava retail-valikoimaehdotus 5–6 tuotetta (Xanthohumol-tuotteet +
  Sun Barrier + Prime Mist + mahdollisesti LF Master). Lopullinen päätös
  odottaa Duallaser Aestheticin **täydellistä INCI-listaa** ja **MSRP-
  hinnastoa**. Duallaserin yhteystiedot esittelyn mukaan: Mervi Ylipoti,
  mervi.ylipoti@duallaser.fi, +358 50 463 5200, proxn.eu.
- **Jälleenmyyntikatteen suunnittelu**: alustava tavoite 60–70 %
  (n. 2,5–3× osto-hinta), lopullinen päätös odottaa Duallaser Aestheticin
  MSRP-tietoa. Alan perusjaotus: massamarkkina/apteekki 20–40 %, tavallinen
  kauneushoitola 50–70 %, medical/premium clinic 65–80 %. Käyttäjän
  aiempi kokemus: 25 % kate riitti kun asiakaskunta oli laaja
  (suoramyynti isolla volyymilla), yhden hoitolan tasolla pieni volyymi
  vaatii korkeamman per-tuote-katteen. Duallaserin ilmoittama MSRP on
  ehdoton alaraja (jakelusopimuksen ehto). Kirjaus lukuun 14.15
  (Hinnoittelupäätökset).
- **LED-hinnasto lukittu**: kerta 85 €, 8× sarja 640 € (80 €/hoito),
  12× sarja 900 € (75 €/hoito), lisäpalvelu mikroneulauksen kanssa 35 €.
  Perustelu: ehdoton minimikate 100 €/h alvillisena (kotona työskentelevä
  yrittäjä ilman vuokra- tai matkakuluja). 12× sarja osuu tarkalleen tähän
  minimirajaan (75 €/45 min = 100 €/h), 8× sarja ja kerta ovat marginaalisesti
  sen yläpuolella. Kertahoito toimii sisäänheittotuotteena joka ohjaa sarjaan.
  Sarjapituudet 8 ja 12 perustuvat tutkimusnäyttöön (Ngoc 2023, Akuffo-Addo
  2024, Dermaluxin oma protokolla) ja Suomen medical LED -markkinan
  konsensukseen. Suomen markkinavertailu tehty (mm. NUUD Helsinki, EL-Salonki,
  Kajo Tampere, HeavenlyNails, Kauneushoitola Maarit). Studio Mahlan hinnasto
  asettuu Suomen medical LED -keskikastin yläpäätä. Päivitetty osiot 0
  (Tietolista), 3 (LED-valohoito), 14.7 (menetelmäsivut), 14.15
  (Hinnoittelupäätökset).
- **Mikroneulauksen hinnat lukittu: 200 € yksittäinen, 190 €/hoito 3×
  sarja (570 €), 180 €/hoito 6× sarja (1080 €).** Ei muutosta.
- **Mikroneulausvertailun laitetasoerottelu tehty**: aiempi 10 hoitolan
  otos sekoitti keskenään erilaisia laitteita. Kun otos jaetaan tarkasti,
  näkyy että halvemmat hoidot tehdään rullalla (Studio OLO 85 €/hoito
  kertakäyttörulla) tai geneerisillä kynillä (Studio OLO LCN BeautyPad
  Pro 140 €, StyleMaker ei nimetty, Palomäki ei nimetty, Alexa ei nimetty,
  Tampereen Kauneuspalvelu Mesopen 130 €). Medical-grade -laitteet
  (MicroPen EVO Bellus Medical, SkinPen, Dermapen 4, BTB13) hinnoitellaan
  selvästi korkeammin: Eiran sairaala 250 €/hoito (SkinPen), Fylli 269 €
  yksittäinen, IPB 190 € (Dermapen), Onnentunne 160/150 € (BTB13), Kajo
  140-150 € (BTB13), Studio Mahla 180-190 € (MicroPen EVO). Medical-tason
  otoksessa (9 hoitolaa) sarjahinta-mediaani on n. 148-190 €/hoito.
  **Studio Mahlan 180-190 €/hoito asettuu medical-tason keskikastin
  ylälaitaan** (Eiran sairaalan ja Fyllin alle, mutta Kajon, Onnentuneen
  ja Tampereen Kauneusateljén yläpuolelle). Positio on perusteltu ja
  ei vaadi muutosta. Käyttäjä lukitsi hinnat säilyviksi 2026-07-23.
- **Sääntö jatkoa varten**: hintavertailussa laitetyyppi pitää aina
  varmistaa. Rullamikroneulaus ei ole kliininen mikroneulaus. Geneeriset
  kynät (LCN, Mesopen, ei nimetty) eivät ole vertailukelpoisia
  medical-grade -laitteiden (MicroPen EVO, SkinPen, Dermapen, BTB13)
  kanssa. Alle 50 hoitolan otos ei riitä lopullisen mediaanin määrittämiseen,
  mutta laitetason erottelu on jopa tärkeämpi kuin otoskoko.
- **LED-laitteen malli lukittu: Dermalux Flex MD.** Aiempi epävarmuus
  "LED ehkä tulee" poistettu. Dermalux Flex MD hankitaan valikoimaan
  varmuudella (tilausajankohta vielä avoinna). Perustelut Flex MD:lle
  Tri-Wave MD:n sijaan: joustavampi paneelirakenne sopii pieneen studioon,
  sama teknologia ja samat aallonpituudet, joten kliininen näyttö pätee.
  Päivitetty osiot 3 (LED-valohoito), 8 (tulevat sivut) ja 14.7
  (menetelmäsivut). Tietolistaan lisätty ✅ merkintä. Kumppanit-listaan
  lisätty Dermalux Flex MD.
- **Search Console: Redirect error näkyy edelleen kahdelle sivulle** mutta
  näiden URL:ien viimeinen crawl oli 26.5.2026. Sivut
  (`mita-on-kliininen-mikroneulaus.html`,
  `mikroneularulla-vai-kliininen-mikroneulaus.html`) ovat olemassa,
  canonical-tagit ok, sitemap ok. Alkuperäinen error on todennäköisesti
  vanhentunut. Toimenpide: pyydä Search Consolessa **VALIDATE FIX** tai
  URL Inspection → Request Indexing kummallekin sivulle.
- **Oppitunti (Clauden virhe)**: Yritin ensin muuttaa `_redirects`-tiedostoa
  olettaen että kaksi vanhaa URL:ää ei ole olemassa. Ei tarkistanut ensin
  tiedostoja `ls`-komennolla. Käyttäjä joutui oikaisemaan. Palautettu
  `_redirects` alkuperäiseen tilaan. **Sääntö jatkoon**: Ennen kuin muutan
  redirectejä tai teen mitään URL-tason muutoksia, tarkista aina ensin
  että väitetty "poistettu" tiedosto on todella poistettu levyltä
  (`ls tiedosto.html`). Sivustolla on satojen tuntien työ ja kaikki
  URL:t merkitsevät SEO:n kannalta.
- **Kirjattu domainin, sähköpostin ja SSL:n vastuunjako lukuun 13**:
  Domainhotelli (domain-rekisteröinti ja DNS), Cloudflare Pages (sivuston
  hostaus ja SSL), Google Workspace (sähköposti asiakaspalvelu@studiomahla.fi
  ja mahdolliset muut @studiomahla.fi -osoitteet). cPanel AutoSSL ei ole
  tarpeen mihinkään kolmesta domainista (studiomahla.fi,
  www.studiomahla.fi, mail.studiomahla.fi). Suositus: sulje AutoSSL kaikilta
  kolmelta cPanelin SSL/TLS Status -näkymässä.
- **Tietolistaan lisätty**: Google Workspace ja Domainhotelli kumppanien
  listalle.
- **Taustaa**: Käyttäjä sai cPanelilta AutoSSL-varoitusviestin
  22.7.2026. Analysoitu että varoitus liittyy siihen, että DNS osoittaa
  Cloudflareen (sivusto) ja Googleen (sähköposti), joten cPanelin
  sertifikaatit eivät ole tarpeen.

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

**Viimeksi päivitetty**: 2026-07-27
