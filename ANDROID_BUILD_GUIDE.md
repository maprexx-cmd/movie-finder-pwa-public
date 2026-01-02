# Guida per Pubblicare su Google Play Store

Questa guida ti spiega come convertire l'app Movie Finder in un'app Android nativa e pubblicarla su Google Play Store con pagamenti in-app.

## Prerequisiti

- Node.js installato (v18 o superiore)
- Android Studio installato
- Account Google Play Console attivo
- Java JDK 17 o superiore

## Passo 1: Installare le Dipendenze

```bash
npm install
```

## Passo 2: Build dell'App Web

```bash
npm run build
```

Questo crea la versione statica dell'app nella cartella `out/`.

## Passo 3: Inizializzare Capacitor

```bash
npx cap init
```

Quando richiesto:
- App name: **Movie Finder**
- App ID: **com.maprexx.moviefinder**
- Web dir: **out**

## Passo 4: Aggiungere la Piattaforma Android

```bash
npx cap add android
```

## Passo 5: Sincronizzare il Codice

```bash
npm run cap:sync
```

## Passo 6: Aprire in Android Studio

```bash
npm run cap:open:android
```

Android Studio si aprirà con il progetto Android.

## Passo 7: Configurare Google Play Billing

### 7.1 Creare un Account RevenueCat (Consigliato)

RevenueCat semplifica la gestione degli acquisti in-app:

1. Vai su [revenuecat.com](https://www.revenuecat.com)
2. Crea un account gratuito
3. Crea un nuovo progetto "Movie Finder"
4. Collega il tuo account Google Play Developer
5. Copia la **API Key** pubblica

### 7.2 Configurare l'Entitlement Premium

In RevenueCat dashboard:
1. Vai su "Entitlements"
2. Crea un entitlement chiamato **"premium"**
3. Crea un prodotto in-app su Google Play Console con ID: **premium_monthly_trial**
4. Configura il prodotto come **Abbonamento**:
   - **Periodo di fatturazione**: Mensile
   - **Prezzo**: €2.99/mese
   - **Prova gratuita**: 7 giorni
5. Collega il prodotto all'entitlement in RevenueCat

### 7.3 Configurare la API Key in Android Studio

**IMPORTANTE**: La chiave API RevenueCat va configurata SOLO nella build Android nativa, mai nel codice web.

Dopo aver aperto il progetto in Android Studio (Passo 6):
1. Naviga a `android/app/src/main/assets/capacitor.config.json`
2. Aggiungi la configurazione RevenueCat:
```json
{
  "plugins": {
    "Purchase": {
      "apiKey": "TUA_REVENUECAT_API_KEY_QUI"
    }
  }
}
```
3. Sostituisci `TUA_REVENUECAT_API_KEY_QUI` con la chiave ottenuta da RevenueCat dashboard

**Per la versione web**: Non è necessario configurare alcuna chiave API. Il sistema usa codici di sblocco per testing.

## Passo 8: Generare la Chiave di Firma

Per pubblicare su Play Store serve una keystore:

```bash
keytool -genkey -v -keystore movie-finder.keystore -alias movie-finder -keyalg RSA -keysize 2048 -validity 10000
```

Salva la password in un posto sicuro.

## Passo 9: Configurare la Build di Release

In Android Studio:
1. Build → Generate Signed Bundle / APK
2. Seleziona "Android App Bundle"
3. Scegli la keystore creata al passo 8
4. Inserisci le password
5. Seleziona "release"
6. Clicca "Finish"

Il file `.aab` verrà creato in `android/app/release/`.

## Passo 10: Caricare su Google Play Console

1. Vai su [play.google.com/console](https://play.google.com/console)
2. Crea una nuova app
3. Compila tutte le informazioni richieste:
   - Nome: Movie Finder
   - Categoria: Intrattenimento
   - Screenshot (almeno 2 per ogni dimensione richiesta)
   - Icona e grafica
   - Descrizione
4. Vai su "Release" → "Production"
5. Carica il file `.aab` generato
6. Configura i prezzi degli acquisti in-app:
   - Vai su "Monetize" → "Products" → "Subscriptions"
   - Crea abbonamento con ID: **premium_monthly_trial**
   - **Tipo**: Abbonamento mensile ricorrente
   - **Prezzo base**: €2.99/mese
   - **Periodo di prova gratuita**: 7 giorni
   - **Rinnovo automatico**: Attivo
   - Aggiungi i benefici Premium nella descrizione:
     * Ricerca illimitata
     * Filtri avanzati tra 10 generi
     * Tutte le piattaforme streaming
     * Accesso classifiche mensili
7. Invia per revisione

## Passo 11: Testing

Prima di pubblicare, testa l'app:

1. In Play Console, aggiungi te stesso come tester in "Release" → "Testing" → "Internal testing"
2. Carica l'APK/Bundle
3. Scarica l'app dal link di testing
4. Testa tutti i flussi di pagamento (Google usa carte di credito di test)

## Note Importanti

- **Versione Web vs Nativa**: Il codice di sblocco "PREMIUM2026" funziona solo nella versione web. Nella versione Android nativa, l'app userà automaticamente Google Play Billing.

- **Aggiornamenti**: Ogni volta che modifichi l'app su v0, devi:
  1. `npm run build`
  2. `npm run cap:sync`
  3. Ricostruire in Android Studio
  4. Caricare nuovo bundle su Play Console

- **Privacy Policy**: Assicurati di avere una privacy policy valida accessibile da `/privacy` o un URL esterno.

- **Commissioni Google**: Google trattiene il 15% dei primi $1M di fatturato annuale da abbonamenti, poi 30%. Per i primi 12 mesi di abbonamento di ogni utente la commissione è ridotta al 15%.

- **Modello di Abbonamento**: L'app usa abbonamento mensile €2.99/mese con 7 giorni di prova gratuita. Gli utenti possono disdire in qualsiasi momento dalle impostazioni Google Play.

- **Gestione Trial**: I primi 7 giorni sono gratuiti. Dopo il trial, il pagamento viene addebitato automaticamente ogni mese fino alla disdetta.

## Supporto

Per problemi tecnici:
- Capacitor Docs: [capacitorjs.com/docs](https://capacitorjs.com/docs)
- RevenueCat Docs: [docs.revenuecat.com](https://docs.revenuecat.com)
- Play Console Help: [support.google.com/googleplay](https://support.google.com/googleplay)
