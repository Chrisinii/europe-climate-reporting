# Climate Reporting Overview in Europe

[Live Projekt](https://europe-climate-reporting.vercel.app/)

Dieses Projekt ist Teil meiner Abschlussarbeit im Rahmen meines Bachelorstudiums in Multimedia Production an der Fachhochschule Graubünden. Ziel des Projekts ist es, einen Überblick über die Berichterstattung zum Klimawandel in verschiedenen europäischen Ländern zu geben.

**🔒 Hinweis:** Dieses Projekt wurde am **20.09.2024 eingefroren**.  
Es werden keine neuen Daten mehr aus der Datenbank geladen, da die Bachelorarbeit inzwischen **bewertet** ist und die Datenabfragen **monatlich kosten**.  
Das Projekt bleibt aber online, damit man sich weiterhin einen Eindruck verschaffen kann.


## Tech-Stack

### Frontend
- **Nuxt.js**: Ein Framework, das für Single-Page-Webanwendungen optimiert ist und serverseitiges Rendern ermöglicht. Es ist einfach zu bedienen und bietet eine ideale Grundlage für performante Webanwendungen.

### Backend
- **NewsData.io API**: Diese API wird verwendet, um Nachrichtenartikel zu den definierten Themen und Ländern abzurufen.
- **Supabase Database**: Dient zum Speichern der abgerufenen Nachrichtenartikel und weiteren Daten.
- **AWS Lambda & EventBridge**: Automatisierung der Datenabfrage von der API. Zwischen 09:00 und 21:00 Uhr wird alle 5 Minuten ein Land abgefragt, sodass jedes Land alle drei Stunden abgerufen wird.

### Assets
- **SVG Europe Map**: Die Karte wurde von [SimpleMaps](https://simplemaps.com/resources/svg-europe) verwendet. Russland wurde manuell über Adobe Illustrator hinzugefügt.
- **Icons**: Icons stammen von [FontAwesome](https://fontawesome.com/).

## Datenbank Aufbau
- **`news`-Tabelle**: Speichert alle Informationen der Artikel
- **`execution_log`-Tabelle**: Speichert die Abfragezeitpunkte der Länderabfragen
- **`analytics`-Tabelle**: Speichert Anzahl Artikel pro Land pro Monat und wie oft welche Artikel verwendet wurden. (Keyword werden momentan nicht auf dem Live Projekt angezeigt)

## Datenabfrage

### Keywords für die Abfrage

- **Albanisch**: ndryshimet klimatike, ngrohja globale, mbrojtja e klimës, ruajtja e klimës, ndryshimi i klimës, kriza klimatike, katastrofa klimatike, fatkeqësia klimatike
- **Englisch**: climate change, environmental protection, global warming, climate crisis, climate emergency, climate catastrophe, climate disaster, climate protection, climate preservation, climate variations, global heating, earth heating, climate problem, climate catastrophe, environmental catastrophe
- **Deutsch**: Klimaschutz, Umweltschutz, Klimawandel, Klimaerwärmung, Globale Erwärmung, Erderwärmung, Klimakrise, Klimakatastrophe, Umweltkatastrophe
- **Serbisch**: zaštita okoliša, klimatske promene, klimatske promjene, promene klime, promjene klime, klimatska promjena, klimatske varijacije, globalno zagrevanje, globalno zagrijavanje, globalno otopljenje, klimatska kriza, kriza klime, katastrofa klime
- **Niederländisch**: bescherming van het klimaat, bescherming van de omgeving, klimaatverandering, verandering van het klimaat, klimaatschommelingen, opwarming van de aarde, klimaatcrisis, noodtoestand van het klimaat, klimaatramp, ramp van het klimaat, klimaatbescherming, aardopwarming, klimaatnoodtoestand, klimaatcatastrofe
- **Luxemburgisch**: Leschte vum Klima, Schutz vum Klima, Klima erhaalen, Klimawandel, Verännerung vum Klima, Klimaverännerungen, Globale Erwiermung, Erwiermung vun der Äerd, Klimakris, Klimanoutstand, Klimanoutfall, Klima-Problem, Klima-Katastroph, Ëmweltkatastroph
- **Französisch**: protection du climat, changement climatique, réchauffement climatique, crise climatique, urgence climatique, préservation du climat, protection environnementale, catastrophe environnementale
- **Bulgarisch**: защита на климата, опазване на климата, климатична защита, климатични промени, промени в климата, климатични вариации, глобално затопляне, глобално затопление, климатична криза, климатична спешност, климатична авария, климатичен проблем, климатична катастрофа, климатично бедствие, екологична катастрофа
- **Mazedonisch**: заштита на климата, заштита на животната средина, климатски промени, промени во климата, климатски варијации, глобално затоплување, зголемување на глобалната температура, климатска криза, климатска итност, климатска нужност, климатски проблем, климатска катастрофа, климатска несреќа, катастрофа на климата
- **Russisch**: защита климата, охрана климата, защита окружающей среды, изменение климата, климатические изменения, перемены климата, климатические вариации, глобальное потепление, потепление планеты, климатический кризис, климатическая проблема, климатическая катастрофа, экологическая катастрофа
- **Griechisch**: προστασία του κλίματος, διατήρηση του κλίματος, προστασία του περιβάλλοντος, κλιματική αλλαγή, αλλαγή του κλίματος, κλιματικές μεταβολές, παγκόσμια θέρμανση, πλανητική θέρμανση, κλιματική κρίση, κλιματική έκτακτη ανάγκη, πρόβλημа του κλίματος, κλιματική καταστροφή, κλιмατική συμφορά, οικολογική καταστρофή
- **Türkisch**: iklim koruma, iklim değişikliği, küresel ısınma, dünya ısınması, iklim krizi, iklim felaketi, iklim afeti, çevre koruma, çevre kirliliği, çevre felaketi, çevre afeti
- **Italienisch**: protezione del clima, salvaguardia del clima, tutela del clima, cambiamento climatico, mutamento climatico, variazioni climatiche, riscaldamento globale, surriscaldamento globale, crisi climatica, emergenza climatica, problema climatico, catastrofe climatica, disastro climatico
- **Tschechisch**: ochrana klimatu, ochrana životního prostředí, změna klimatu, klimatická změna, klimatické variace, globální oteplování, zahřívání planety, nárůst globálních teplot, klimatická krize, klimatická nouze, klimatická urgence, problém klimatu, klimatická katastrofa, klimatická pohroma
- **Polnisch**: ochrona klimatu, zachowanie klimatu, ochrona środowiska, zmiany klimatu, zmiana klimatyczna, wahania klimatu, globalne ocieplenie, ocieplenie globalne, wzrost globalnej temperatury, kryzys klimatyczny, stan kryzysu klimatycznego, problemy klimatyczne, katastrofa klimatyczna, kataklizm klimatyczny
- **Estnisch**: kliimakaitse, kliima kaitse, kliimamuutused, kliimamuutumine, kliimavariatsioonid, globaalne soojenemine, maailma soojenemine, globaalne temperatuuri tõus, kliimakriis, kliima hädaolukord, kliima hädaabi, kliimaprobleem, kliimakatastroof, keskkonnakatastroof
- **Lettisch**: klimata aizsardzība, vides aizsardzība, klimata saglabāšana, klimata pārmaiņas, klimata izmaiņas, klimata variācijas, globālā sasilšana, zemes sasilšana, klimata krīze, klimata ārkārtas situācija, klimata problēma, klimata katastrofa, vides katastrofa, klimata kataklizma
- **Litauisch**: klimato apsauga, aplinkos apsauga, klimato saugojimas, klimato kaita, klimato pokyčiai, klimato kitimas, pasaulinis atšilimas, globalus atšilimas, temperatūros kilimas, klimato krizė, klimato nepaprastoji padėtis, klimato problema, klimato katastrofa, klimato nelaimė
- **Spanisch**: protección del clima, protección ambiental, cambio climático, modificación climática, variaciones climáticas, calentamiento global, aumento de la temperatura global, crisis climática, emergencia climática, problema climático, catástrofe climática, desastre climático, calamidad climática
- **Portugiesisch**: proteção climática, proteção do clima, proteção ambiental, mudança climática, alteração climática, mudanças no clima, variações climáticas, aquecimento global, aquecimento da terra, crise climática, emergência climática, problema climático, catástrofe climática, desastre climático
- **Finnisch**: ilmastonsuojelu, ilmastonsäilyttäminen, ympäristönsuojelu, ilmastonmuutos, klimatologinen muutos, ilmastovaihtelut, maailmanlaajuinen lämpeneminen, maapallon lämpeneminen, globaalin lämpötilan nousu, ilmastokriisi, ilmastohätätila, ilmasto-ongelma, ilmastokatastrofi
- **Maltesisch**: protezzjoni tal-klima, ħarsien tal-klima, protezzjoni ambjentali, bidla fil-klima, bidliet fil-klima, varjazzjonijiet klimatiċi, tisħin globali, tisħin dinji, żieda fit-temperaturi globali, kriżi tal-klima, emerġenza klimatika, problema klimatika, katastrofi klimatika, diżastru klimatiku
- **Ungarisch**: klímavédelem, a klíma védelme, környezetvédelem, klímaváltozás, éghajlatváltozás, klímaváltozások, globális felmelegedés, föld felmelegedése, globális hőmérséklet emelkedés, klímaválság, klímavészhelyzet, klíma probléma, klímakatasztrófa, ökológiai katasztrófa
- **Rumänisch**: protecția climei, protecția mediului, conservarea climei, schimbări climatice, modificări climatice, variabilitate climatică, încălzire globală, încălzirea planetei, criza climatică, urgentă climatică, problema climatică, catastrofă climatică, dezastru climatic
- **Slowenisch**: apsaugos, zaščita podnebja, varstvo podnebja, podnebne spremembe, spremembe podnebja, klimatske spremembe, segrevanje, globalno segrevanje, segrevanje zemlje, povečanje temperature, podnebna kriza, podnebna nujnost, podnebna težava, podnebne katastrofe
- **Slowakisch**: ochrana klímy, ochrana životného prostredia, zachovanie klímy, zmena klímy, zmeny klímy, klimatické zmeny, globálne otepľovanie, otepľovanie planéty, zvyšovanie globálnej teploty, klimatická kríza, klimatická núdza, klimatická pohotovosť, klimatický problém, klimatická katastrofa
- **Norwegisch**: klimavern, miljøvern, klimaendringer, endringer i klimaet, klimatiske endringer, global oppvarming, oppvarming av kloden, økning i global temperatur, klimakrise, klimanødsituasjon, klimaproblem, klimakatastrophe, miljøkatastrophe
- **Isländisch**: verndun loftslags, verndun umhverfis, loftslagsbreytingar, breytingar á loftslagi, loftslagssveiflur, hlýnun jarðar, hlýnun heims, hækkun á heimsmeðalhita, loftslagskreppa, loftslagsneyð, neyðarástand vegna loftslags, loftslagsvandamál, loftslagshamfarir
- **Schwedisch**: klimatskydd, miljöskydd, skydd av klimatet, klimatförändring, förändring av klimatet, klimatvariationer, global uppvärmning, global temperaturökning, uppvärmning av jorden, klimatkris, klimatnödläge, klimatnödsituation, klimatproblem, klimatkatastrof
- **Dänisch**: klimaindsats, klimabeskyttelse, miljøbeskyttelse, klimaændringer, klimaforandringer, ændringer i klimaet, global opvarmning, global ophedning, stigning i globale temperaturer, klimakrise, klimanødsituation, klimaproblem, klimakatastrophe, miljøkatastrophe
- **Ukrainisch**: захист клімату, охорона клімату, захист навколишнього середовища, зміна клімату, кліматичні зміни, кліматичні варіації, глобальне потепління, потепління клімату, підвищення глобальної температури, кліматична криза, кліматична проблема, кліматична катастрофа, кліматичне лихо
- **Belarussisch**: ахова клімату, абарона клімату, ахова навакольнага асяроддзя, змена клімату, кліматычныя змены, варыяціі клімату, глабальнае пацяпленне, кліматычны крызіс, надзвычайная кліматычная сітуацыя, кліматычная праблема, кліматычная катастрофа, кліматычная трагедыя


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

Stand: 21.08.2024
