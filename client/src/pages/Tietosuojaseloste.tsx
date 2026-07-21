// Tietosuojaseloste — Redvive (/tietosuoja)
// Design: warm cream #FAF6F4 background, charcoal #1A0A08 text
// Max-width 720px centred, DM Sans body, generous spacing
// Quiet, neutral, trustworthy — Finnish language version

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

/* ── Shared sub-components ── */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl font-bold mt-12 mb-4"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#1A0A08", letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-base font-semibold mt-6 mb-2"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#1A0A08" }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-base leading-relaxed mb-3"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#3D1A14", lineHeight: 1.7 }}
    >
      {children}
    </p>
  );
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-4" style={{ paddingLeft: "1.25rem" }}>
      {items.map((item, i) => (
        <li
          key={i}
          className="text-base"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#3D1A14",
            lineHeight: 1.7,
            marginBottom: "8px",
            listStyleType: "disc",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        backgroundColor: "#EDE8E5",
        color: "#1A0A08",
        borderRadius: "3px",
        padding: "1px 5px",
        fontFamily: "monospace",
        fontSize: "0.9em",
      }}
    >
      {children}
    </code>
  );
}

function MailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      style={{ color: "#D53E0F" }}
      className="hover:opacity-75 transition-opacity"
    >
      {email}
    </a>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#D53E0F" }}
      className="hover:opacity-75 transition-opacity"
    >
      {label}
    </a>
  );
}

function HR() {
  return <hr style={{ border: "none", borderTop: "1px solid #E5DDD5", margin: "2rem 0" }} />;
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: "#3D1A14",
        }}
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: "left",
                  padding: "10px 14px",
                  fontWeight: 600,
                  backgroundColor: "#EDE8E5",
                  border: "1px solid #E5DDD5",
                  color: "#1A0A08",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#FAF6F4" : "#F5EDEB" }}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "10px 14px",
                    border: "1px solid #E5DDD5",
                    lineHeight: 1.6,
                    verticalAlign: "top",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Page ── */

export default function Tietosuojaseloste() {
  return (
    <div style={{ backgroundColor: "#FAF6F4", minHeight: "100vh" }}>
      <Navbar />

      <div className="px-6 pt-40 pb-24">
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          {/* Header */}
          <p
            className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
          >
            Oikeudellinen
          </p>
          <h1
            className="font-bold mb-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#1A0A08",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Tietosuojaseloste
          </h1>
          <p
            className="text-sm mb-10"
            style={{ color: "#7A4A42", fontFamily: "'DM Sans', sans-serif" }}
          >
            Päivitetty viimeksi: 27.5.2026
          </p>

          <P>
            Redvive Oy ("Redvive", "me") sitoutuu suojaamaan yksityisyyttäsi ja noudattamaan EU:n
            yleistä tietosuoja-asetusta (GDPR) sekä Suomen tietosuojalakia (1050/2018).
          </P>
          <P>
            Tämä seloste kertoo mitä henkilötietoja keräämme, miksi, miten käytämme niitä, kenelle
            jaamme niitä, ja mitkä ovat oikeutesi.
          </P>
          <P>
            Jos sinulla on kysymyksiä, ota yhteyttä:{" "}
            <MailLink email="privacy@redvivestudios.com" />.
          </P>

          <HR />

          {/* 1 */}
          <H2>1. Rekisterinpitäjä</H2>
          <P>
            Redvive Oy<br />
            Y-tunnus: 3573167-1<br />
            Rekisteröity osoite: Katajanokanlaituri 2B, 00160 Helsinki
          </P>
          <P>
            Sähköposti: <MailLink email="privacy@redvivestudios.com" />
          </P>

          <HR />

          {/* 2 */}
          <H2>2. Keräämämme henkilötiedot</H2>

          <H3>2.1 Odotuslistalle liittyminen</H3>
          <P>Kun liityt esi-lanseerauksen odotuslistalle, keräämme:</P>
          <UL items={[
            "Sähköpostiosoite",
            "Etunimi (valinnainen)",
            "Kielipreferenssi (valinnainen)",
            "Liittymisajankohta",
            "IP-osoite (väärinkäytön estoon)",
            "Markkinointisuostumuksen status",
          ]} />

          <H3>2.2 Verkkosivujen käyttö</H3>
          <P>
            Kun vierailet sivustolla <Code>redvivestudios.com</Code>, saatamme kerätä
            (suostumuksellasi):
          </P>
          <UL items={[
            "Laitteen tyyppi, selain, käyttöjärjestelmä",
            "Vieraillut sivut, vietetty aika, navigointipolut",
            "Lähdeosoite (referrer URL)",
            "Likimääräinen sijainti (maa/kaupunki)",
            "Evästetunnisteet",
          ]} />

          <H3>2.3 Yhteydenotot</H3>
          <P>
            Jos lähetät meille sähköpostia tai otat yhteyttä verkkosivun kautta, säilytämme näiden
            viestien sisällön.
          </P>
          <P>
            Emme <strong>kerää</strong> tällä sivustolla terveys-, biometrisiä tai muita erityisiin
            henkilötietoryhmiin kuuluvia tietoja.
          </P>

          <HR />

          {/* 3 */}
          <H2>3. Käsittelyn oikeusperuste</H2>
          <P>
            Käsittelemme henkilötietojasi seuraavilla GDPR:n 6 artiklan mukaisilla oikeusperusteilla:
          </P>
          <Table
            headers={["Tarkoitus", "Oikeusperuste"]}
            rows={[
              ["Odotuslistan ja tervetuloviestien lähetys", "Nimenomainen suostumuksesi (6(1)(a) artikla)"],
              ["Markkinointiviestit odotuslistan jälkeen", "Nimenomainen suostumuksesi (6(1)(a) artikla)"],
              ["Verkkosivuston analytiikka + mainospikselit", "Suostumuksesi evästepalkin kautta (6(1)(a) artikla)"],
              ["Tiedusteluihin vastaaminen", "Oikeutettu etu asiakaspalvelussa (6(1)(f) artikla)"],
              ["Petostentorjunta ja tietoturva", "Oikeutettu etu (6(1)(f) artikla)"],
              ["Lainsäädäntövelvoitteiden noudattaminen", "Lakisääteinen velvoite (6(1)(c) artikla)"],
            ]}
          />
          <P>
            Voit perua suostumuksen milloin tahansa. Suostumuksen peruminen ei vaikuta sitä ennen
            tapahtuneen käsittelyn lainmukaisuuteen.
          </P>

          <HR />

          {/* 4 */}
          <H2>4. Miten käytämme tietojasi</H2>
          <P>Käytämme henkilötietojasi seuraaviin tarkoituksiin:</P>
          <UL items={[
            "Vahvistaaksemme paikkasi odotuslistalla",
            "Lähettääksemme 5 sähköpostin tervetulosarjan ennen avajaisia",
            "Ilmoittaaksemme sinulle kun studiomme avautuvat ja varauksen alkaa",
            "Lähettääksemme satunnaisia brändipäivityksiä (voit peruuttaa milloin tahansa)",
            "Parantaaksemme verkkosivuston suorituskykyä ja käyttökokemusta",
            "Noudattaaksemme lakisääteisiä velvoitteita",
          ]} />
          <P>Emme:</P>
          <UL items={[
            "Myy tietojasi kolmansille osapuolille",
            "Käytä tietojasi automaattiseen päätöksentekoon, jolla on merkittäviä vaikutuksia",
            "Käsittele tietojasi EU/ETA-alueen ulkopuolella ilman asianmukaisia suojatoimia",
          ]} />

          <HR />

          {/* 5 */}
          <H2>5. Kenelle jaamme tietoja</H2>
          <P>
            Jaamme tietoja vain palveluntarjoajille ("henkilötietojen käsittelijät"), jotka auttavat
            meitä toiminnassamme. Jokainen on sidottu GDPR-yhteensopiviin
            tietojenkäsittelysopimuksiin (DPA).
          </P>
          <Table
            headers={["Palveluntarjoaja", "Tarkoitus", "Sijainti"]}
            rows={[
              ["Flodesk Inc.", "Sähköpostimarkkinointi", "USA — EU-USA Data Privacy Framework"],
              ["Vercel Inc.", "Verkkosivuston hosting", "USA — EU-USA Data Privacy Framework"],
              ["Google LLC (Workspace + Analytics)", "Sähköposti-infrastruktuuri + analytiikka", "USA — Standard Contractual Clauses"],
              ["Meta Platforms Ireland Ltd.", "Konversiotracking (vain suostumuksella)", "EU/USA — Standard Contractual Clauses"],
              ["Cookiebot / Iubenda", "Suostumuksenhallinta", "EU"],
            ]}
          />
          <P>
            Saatamme jakaa tietoja viranomaisille, jos Suomen tai EU:n laki niin vaatii.
          </P>

          <HR />

          {/* 6 */}
          <H2>6. Tietojen siirrot EU:n ulkopuolelle</H2>
          <P>Osa palveluntarjoajistamme sijaitsee EU:n ulkopuolella. Nojaamme:</P>
          <UL items={[
            "EU-USA Data Privacy Framework -järjestelyyn (USA-pohjaiset käsittelijät, jotka ovat sertifioituneet)",
            "Standard Contractual Clauses -sopimuslausekkeisiin (muut siirrot)",
            "Lisäsuojatoimiin tarvittaessa",
          ]} />

          <HR />

          {/* 7 */}
          <H2>7. Kuinka kauan säilytämme tietojasi</H2>
          <Table
            headers={["Tietotyyppi", "Säilytysaika"]}
            rows={[
              ["Odotuslistan sähköposti + suostumus", "Kunnes peruutat tilauksen + 12 kk auditointiloki"],
              ["Markkinointitilaajan tiedot", "Kunnes peruutat tilauksen + 6 kk"],
              ["Asiakaspalvelukyselyt", "24 kuukautta"],
              ["Verkkosivuston analytiikka (anonymisoituna)", "26 kuukautta"],
              ["Evästeiden suostumustiedot", "12 kuukautta"],
            ]}
          />
          <P>Näiden aikojen jälkeen tiedot poistetaan tai anonymisoidaan kokonaan.</P>

          <HR />

          {/* 8 */}
          <H2>8. Oikeutesi GDPR:n mukaan</H2>
          <P>Sinulla on oikeus:</P>
          <UL items={[
            <><strong>Tutustua</strong> henkilötietoihisi</>,
            <><strong>Oikaista</strong> virheellisiä tai epätäydellisiä tietoja</>,
            <><strong>Poistaa</strong> tietosi ("oikeus tulla unohdetuksi")</>,
            <><strong>Rajoittaa</strong> käsittelyä</>,
            <><strong>Vastustaa</strong> oikeutettuun etuun perustuvaa käsittelyä</>,
            <><strong>Tietojen siirrettävyys</strong> — saada tietosi koneellisesti luettavassa muodossa</>,
            <><strong>Perua suostumus</strong> milloin tahansa</>,
            <>
              <strong>Tehdä valitus</strong> tietosuojavaltuutetulle —{" "}
              <ExternalLink href="https://www.tietosuoja.fi" label="tietosuoja.fi" />
            </>,
          ]} />
          <P>
            Oikeuksien käyttämiseksi lähetä sähköpostia osoitteeseen{" "}
            <MailLink email="privacy@redvivestudios.com" />. Vastaamme 30 päivän kuluessa.
          </P>

          <HR />

          {/* 9 */}
          <H2>9. Evästeet</H2>
          <P>
            Verkkosivustomme käyttää evästeitä. Voit tarkistaa ja muuttaa asetuksiasi evästepalkin
            kautta milloin tahansa.
          </P>
          <P>Kategoriat:</P>
          <UL items={[
            <><strong>Välttämättömät</strong> — sivuston toiminta (aina päällä, ei suostumusta tarvita)</>,
            <><strong>Analytiikka</strong> — Google Analytics, anonymisoitu IP (suostumus vaaditaan)</>,
            <><strong>Markkinointi</strong> — Meta Pixel, konversiotracking (suostumus vaaditaan)</>,
          ]} />
          <P>Ilman suostumusta ladataan vain välttämättömät evästeet.</P>

          <HR />

          {/* 10 */}
          <H2>10. Alaikäisten yksityisyys</H2>
          <P>
            Palvelumme eivät ole suunnattu alle 16-vuotiaille. Emme tietoisesti kerää tietoja
            alaikäisistä. Jos uskot, että olemme keränneet alaikäisen tietoja, ota yhteyttä{" "}
            <MailLink email="privacy@redvivestudios.com" /> ja poistamme ne.
          </P>

          <HR />

          {/* 11 */}
          <H2>11. Tietoturva</H2>
          <P>
            Käytämme kohtuullisia teknisiä ja organisatorisia toimenpiteitä tietojesi suojaamiseksi,
            mukaan lukien HTTPS-salaus, salatut tietokannat käsittelijöillämme, pääsynvalvonta ja
            2FA hallinnollisissa tileissä. Mikään tiedonsiirtomenetelmä internetin yli ei ole 100%
            turvallinen.
          </P>

          <HR />

          {/* 12 */}
          <H2>12. Muutokset tähän selosteeseen</H2>
          <P>
            Saatamme päivittää tätä selostetta. Yläosan "Päivitetty viimeksi" -päivämäärä heijastaa
            viimeisintä muutosta. Olennaiset muutokset ilmoitetaan sähköpostitse aktiivisille
            tilaajille.
          </P>

          <HR />

          {/* 13 */}
          <H2>13. Yhteystiedot</H2>
          <P>
            Redvive Oy<br />
            <MailLink email="privacy@redvivestudios.com" /><br />
            Helsinki, Suomi
          </P>
          <P>
            Tietosuojavaltuutettu:{" "}
            <ExternalLink href="https://www.tietosuoja.fi" label="tietosuoja.fi" />
          </P>

          <HR />

          {/* Language link */}
          <div className="mt-8 flex items-center gap-4">
            <Link href="/privacy">
              <span
                className="text-xs tracking-widest uppercase cursor-pointer hover:opacity-60 transition-opacity"
                style={{ color: "#7A4A42", fontFamily: "'DM Sans', sans-serif" }}
              >
                Read in English →
              </span>
            </Link>
            <span style={{ color: "#E5DDD5" }}>|</span>
            <Link href="/">
              <span
                className="text-xs tracking-widest uppercase cursor-pointer hover:opacity-60 transition-opacity"
                style={{ color: "#7A4A42", fontFamily: "'DM Sans', sans-serif" }}
              >
                ← Takaisin etusivulle
              </span>
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
