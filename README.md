# Velkommen til Snøscooter-Løypekart

### Innhold

1. [Introduksjon](#introduksjon)
2. [Bruk](#bruk)
3. [Installasjon og Kjøring](#installasjon-og-kjøring)
4. [Bidrag](#bidrag)
5. [Lisens og Eierskap](#lisens-og-eierskap)

### Introduksjon

Snøscooter-løypekart er en enkel web-app som tar sikte på å gi brukere en oversikt over snøscooterløyper og annen nyttig informasjon om sted og punkter i nærheten av løypene.

### Bruk

Ordinære brukere skal kunne se statuser til løyper og få opp innlagte punkter i kartet. Administratorer, dvs kommuneansatte med autorisasjon i QMS, skal kunne legge inn nye punkter same stenge av/åpne løyper.

### Installasjon og Kjøring

Under er steg-for-steg instrukser for å sette opp:

1. Installer følgende
    1. [Node js](https://nodejs.org)
    2. [MongoDB](https://www.mongodb.com/try/download/community?tck=docs_server)

2. Last ned kodebasen, enten via å trykke [denne linken](https://github.com/norkart-student-dev/Snoscooter-Loypekart/archive/master.zip) eller å [klone ved hjelp av git](https://www.git-scm.com/docs/git-clone). Husk å unzippe dersom du laster ned direkte.

3. Åpne en terminal og naviger til mappen lastet ned i forrige steg.

4. Valgfritt steg (anbefales for administratorer, ikke nødvendig for lokal testing): Dersom du vil gjøre noen innstillinger kan dette settes i config.txt. Dette er foreløpig begrenset til navn på database, portnummer som serversiden skal kjøre på, bruk av http/https og navn på cookiesession. Innstillinger kan endres når som helst, men krever omstart av serveren for å trå i kraft. Mer detaljert info finnes i config.txt.

4. Kjør ``npm run install_all`` og vent til installasjon av avhengige pakker er fullført. Deretter kjør ``npm run dev`` som burde åpne en nettleser med web-appen. Hvis den ikke åpnes automatisk kan du gå til localhost:3000 for å åpne den manuelt.

### Bidrag

Vi tar gjerne imot pull requests, eneste vi ber om er at de opprettes mot dev og ikke master. Dersom du har noen ønsker til funksjonalitet eller vil rapportere en feil setter vi stor pris på om du forteller oss via [issues](https://github.com/norkart-student-dev/Snoscooter-Loypekart/issues/new) her på github.

### Lisens og Eierskap
Snøscooter-Løypekart er åpen kildekode programvare lisensiert under [GNU GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).