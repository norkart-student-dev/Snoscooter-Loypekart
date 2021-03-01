# Velkommen til Snøscooter-Løypekart

## Innhold

1. [Introduksjon](#introduksjon)
2. [Bruk](#bruk)
3. [Installasjon og Kjøring](#installasjon-og-kjøring)
4. [Konfigurering](#konfigurering)
5. [Bidrag](#bidrag)
6. [Lisens og Eierskap](#lisens-og-eierskap)

### Introduksjon

Snøscooter-løypekart er en enkel web-app som tar sikte på å gi brukere en oversikt over snøscooterløyper og annen nyttig informasjon om sted og punkter i nærheten av løypene.

### Bruk

Ordinære brukere skal kunne se statuser til løyper og få opp innlagte punkter i kartet. Administratorer, dvs kommuneansatte med autorisasjon i QMS, skal kunne legge inn nye punkter samt stenge av eller åpne løyper.

### Installasjon og Kjøring

Steg-for-steg instrukser for å sette opp et fungerende miljø:

1. Installer følgende:
    1. [Node js](https://nodejs.org)
    2. [MySQL](https://www.mysql.com/downloads/)

2. Last ned kodebasen, enten via å trykke [denne linken](https://github.com/norkart-student-dev/Snoscooter-Loypekart/archive/master.zip) eller [klone med git](https://www.git-scm.com/docs/git-clone).  
NB: Husk å pakke ut filene (unzippe) dersom du laster ned direkte.

3. Åpne en terminal og naviger til mappen lastet ned i forrige steg.

4. Kjør ``npm run install_all`` og vent til installasjon av avhengige pakker er fullført.

5. For å start et utviklingsmiljø: Kjør ``npm run dev`` og vent til en nettleser med web-appen åpnes. Hvis den ikke åpnes automatisk kan du gå til ``localhost:3000`` for å åpne den manuelt.

6. For å starte et produksjonsmiljø: Kjør ``npm run prod`` og vent på bekreftelse om ferdig utførelse (tar noe lenger tid enn for utviklingsmiljø). Appen finnes deretter på ``localhost:5000``.

### Konfigurering

#### Server

Under mappen _/server/config_ finnes det to konfigurasjonsfiler: En for databasen og en for express-serveren. Før første oppstart anbefales det å sjekke at verdiene i _db.config.js_ stemmer overenes med bruker Juster disse etter egne behov, eller hvis portnummer 5000 er opptatt på maskinen (dette er typisk tilfelle dersom kjøring kræsjer med en feilmelding _EADRINUSE_). D

#### Klient

For å konfiguere klienten i utviklingmiljøet kan man redigere _/client/.env_. Eksempel er lagt ved der portnummer settes til 3000. For mer info anbefaler vi den [offisielle dokumentasjonen](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env).

### Bidrag

Vi tar gjerne imot pull requests, eneste vi ber om er at de opprettes mot dev og ikke master. Dersom du har noen ønsker til funksjonalitet eller vil rapportere en feil setter vi stor pris på om du forteller oss via [issues](https://github.com/norkart-student-dev/Snoscooter-Loypekart/issues/new) her på github.

### Lisens og Eierskap

Snøscooter-Løypekart er åpen kildekode programvare lisensiert under [GNU GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) og sponset av [NORKART AS](https://www.norkart.no/om-oss/).
