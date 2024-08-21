# Climate Reporting Overview in Europe

[Live Projekt](https://europe-climate-reporting-h81l.vercel.app/)

Dieses Projekt ist Teil meiner Abschlussarbeit im Rahmen meines Bachelorstudiums in Multimedia Production an der Fachhochschule Graubünden. Ziel des Projekts ist es, einen Überblick über die Berichterstattung zum Klimawandel in verschiedenen europäischen Ländern zu geben.

## Tech-Stack

### Frontend
- **Nuxt.js**: Ein Framework, das für Single-Page-Webanwendungen optimiert ist und serverseitiges Rendern ermöglicht. Es ist einfach zu bedienen und bietet eine ideale Grundlage für performante Webanwendungen.

### Backend
- **NewsData.io API**: Diese API wird verwendet, um Nachrichtenartikel zu den definierten Themen und Ländern abzurufen.
- **Supabase Database**: Dient zum Speichern der abgerufenen Nachrichtenartikel und weiteren Daten.
- **AWS Lambda & EventBridge**: Diese Services automatisieren die Datenabfrage von der API. Zwischen 09:00 und 21:00 Uhr wird alle 5 Minuten ein Land abgefragt, sodass jedes Land alle drei Stunden abgerufen wird.

### Assets
- **SVG Europe Map**: Die Karte wurde von [SimpleMaps](https://simplemaps.com/resources/svg-europe) verwendet. Russland wurde manuell über Adobe Illustrator hinzugefügt.
- **Icons**: Icons stammen von [FontAwesome](https://fontawesome.com/).

## Datenbank Aufbau
- **`news`-Tabelle**: Speichert alle Informationen der Artikel
- **`execution_log`-Tabelle**: Speichert die Abfragezeitpunkte der Länderabfragen
- **`analytics`-Tabelle**: Speichert Anzahl Artikel pro Land pro Monat und wie oft welche Artikel verwendet wurden. (Keyword werden momentan nicht auf dem Live Projekt angezeigt)

## Datenabfrage

### FetchArticles Script
Dieses Script führt folgende Aufgaben aus:
- **Länder- und Schlüsselwortgruppen definieren**: Bestimmt die relevanten Länder und die zugehörigen Keywords für die Abfrage.
- **Sprache auswählen**: Überprüft in der `execution_log`-Tabelle, welche Sprache als letztes ausgeführt wurde, und führt dann die nächste Sprache aus.
- **Artikel für die ausgewählte Sprache abrufen**: Holt die passenden Artikel basierend auf der Sprache und den Keywords von der API ab.
- **Duplikate entfernen**: Bereinigt die abgerufenen Artikel, um doppelte Einträge zu vermeiden.
- **Keyword herausfiltern**: Aus dem Titel, Description oder Content werden die gefundenen keyword herausgesucht.
- **Artikelübersetzungen erstellen**: Übersetzt die einzelnen Artikel in die Zielsprache (Englisch), wobei jedes Element einzeln übersetzt wird, um Überlastungen bei Microsoft Translator zu vermeiden.
- **Artikel in die Datenbank einfügen**: Speichert die übersetzten Artikel in der Supabase-Datenbank.
- **Analytik-Tabelle aktualisieren**: Aktualisiert die Statistik- und Analyse-Daten basierend auf den neuen Artikeln.
- **Loggen und Beenden**: Protokolliert die Ausführung und beendet den Prozess.

### Archive Script
Das Archive Script hat folgende Aufgaben:
- **Länder- und Schlüsselwortgruppen definieren**: Ähnlich wie beim FetchArticles Script, werden hier die relevanten Länder und Keywords festgelegt.
- **Parameter für Artikelabfrage festlegen**: Die Parameter für die Abfrage sind fest im Code definiert.
- **Artikel von der API abrufen**: Holt die passenden Artikel basierend auf den definierten Parametern von der API ab.
- **Artikel filtern**: Filtert die abgerufenen Artikel, um nur die relevanten zu behalten.
- **Duplikate entfernen**: Entfernt doppelte Einträge aus den abgerufenen Artikeln.
- **Artikel in die Datenbank speichern**: Speichert die bereinigten Artikel in der Supabase-Datenbank.
- **Loggen und Beenden**: Protokolliert den Prozess und beendet das Script.
