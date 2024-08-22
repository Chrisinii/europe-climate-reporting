import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// Umgebungsvariablen
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const API_KEY = process.env.API_KEY;

// JWT-Token generieren
const token = jwt.sign({ role: 'lambda' }, SECRET_KEY);

// Supabase Client erstellen
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});


const getLanguageToExecute = async () => {
  console.log("Fetching executed languages from execution_log table");
  const { data: executedLanguages, error } = await supabase
    .from('execution_log')
    .select('language, created_at')
    .order('created_at', { ascending: true });

  if (error) throw error;

  console.log("Executed languages:", executedLanguages);

  const allLanguages = new Set(Object.keys(countryGroups));
  const executedLanguagesSet = new Set(executedLanguages.map(entry => entry.language));

  const notExecutedLanguages = Array.from(allLanguages).filter(lang => !executedLanguagesSet.has(lang));

  if (notExecutedLanguages.length > 0) {
    const randomIndex = Math.floor(Math.random() * notExecutedLanguages.length);
    console.log("Selecting a random language not executed yet:", notExecutedLanguages[randomIndex]);
    return notExecutedLanguages[randomIndex];
  } else {
    console.log("All languages have been executed, selecting the oldest execution time:", executedLanguages[0].language);
    const oldestExecution = executedLanguages[0];
    await supabase
      .from('execution_log')
      .delete()
      .eq('language', oldestExecution.language);
    return oldestExecution.language;
  }
};

const languageMapping = {
  "albanian": "sq",
  "english": "en",
  "german": "de",
  "serbian": "sr",
  "dutch": "nl",
  "luxembourgish": "lb",
  "french": "fr",
  "bulgarian": "bg",
  "macedonian": "mk",
  "russian": "ru",
  "greek": "el",
  "turkish": "tr",
  "italian": "it",
  "czech": "cs",
  "polish": "pl",
  "estonian": "et",
  "latvian": "lv",
  "lithuanian": "lt",
  "spanish": "es",
  "portuguese": "pt",
  "finnish": "fi",
  "maltese": "mt",
  "hungarian": "hu",
  "romanian": "ro",
  "slovenian": "sl",
  "slovak": "sk",
  "norwegian": "no",
  "icelandic": "is",
  "swedish": "sv",
  "danish": "da",
  "ukrainian": "uk",
  "belarusian": "be",
  "croatian": "hr",
  "bosnian": "bs",
  "montenegrin": "me",
};

const countryGroups = {
  albanian: ['AL'],
  english: ['IE'],
  german: ['AT', 'CH', 'LU'],
  serbian: ['BA', 'HR', 'ME', 'RS'], // serbian, croatian, bosnian and montenegrin are all the same
  dutch: ['BE', 'NL', 'LU'],
  luxembourgish: ['LU'],
  french: ['BE', 'CH'],
  bulgarian: ['BG'],
  macedonian: ['MK'],
  russian: ['BY', 'RU', 'UA', 'DE'], // source prime_ru is mistakenly defined as a german source
  greek: ['CY', 'GR'],
  turkish: ['CY', 'TR'],
  italian: ['IT'],
  czech: ['CZ'],
  polish: ['PL'],
  estonian: ['EE'],
  latvian: ['LV'],
  lithuanian: ['LT'],
  spanish: ['ES'],
  portuguese: ['PT'],
  finnish: ['FI'],
  maltese: ['MT'],
  hungarian: ['HU'],
  romanian: ['MD', 'RO'],
  slovenian: ['SI'],
  slovak: ['SK'],
  norwegian: ['NO'],
  icelandic: ['IS'],
  swedish: ['SE'],
  danish: ['DK'],
  ukrainian: ['UA'],
  belarusian: ['BY'],
  low: ['DE', 'FR'],
  top: ['GB']
};

const simpleKeywords = {
  albanian: ['klima', 'mjedisi'],
  english: ['climate', 'environment'],
  german: ['Klima', 'Umwelt'],
  serbian: ['klima', 'okolina'],
  dutch: ['klimaat', 'milieu'],
  luxembourgish: ['Klima', 'Ëmwelt'],
  french: ['climat', 'environnement'],
  bulgarian: ['климат', 'околна среда'],
  macedonian: ['клима', 'животна средина'],
  russian: ['климат', 'окружающая среда'],
  greek: ['κλίμα', 'περιβάλλον'],
  turkish: ['iklim', 'çevre'],
  italian: ['clima', 'ambiente'],
  czech: ['klima', 'životní prostředí'],
  polish: ['klimat', 'środowisko'],
  estonian: ['kliima', 'keskkond'],
  latvian: ['klimats', 'vide'],
  lithuanian: ['klimatas', 'aplinka'],
  spanish: ['clima', 'medio ambiente'],
  portuguese: ['clima', 'ambiente'],
  finnish: ['ilmasto', 'ympäristö'],
  maltese: ['klima', 'ambjent'],
  hungarian: ['klíma', 'környezet'],
  romanian: ['climă', 'mediu'],
  slovenian: ['podnebje', 'okolje'],
  slovak: ['klíma', 'prostredie'],
  norwegian: ['klima', 'miljø'],
  icelandic: ['loftslag', 'umhverfi'],
  swedish: ['klimat', 'miljö'],
  danish: ['klima', 'miljø'],
  ukrainian: ['клімат', 'навколишнє середовище'],
  belarusian: ['клімат', 'наваўколнае асяроддзе'],
  low: ['Klima', 'Umwelt', 'climat', 'environnement'],
  top: ['climate', 'environment']
};

const keywordGroups = {
  albanian: ['ndryshimet klimatike', 'ngrohja globale', 'mbrojtja e klimës', 'ruajtja e klimës', 'ndryshimi i klimës', 'kriza klimatike', 'katastrofa klimatike', 'fatkeqësia klimatike'],
  english: ['climate change', 'environmental protection', 'global warming', 'climate crisis', 'climate emergency', 'climate catastrophe', 'climate disaster', 'climate protection', 'climate preservation', 'climate variations', 'global heating', 'earth heating', 'climate problem', 'climate catastrophe', 'environmental catastrophe'],
  german: ['Klimaschutz', 'Umweltschutz', 'Klimawandel', 'Klimaerwärmung', 'Globale Erwärmung', 'Erderwärmung', 'Klimakrise', 'Klimakatastrophe', 'Umweltkatastrophe'],
  serbian: ['zaštita okoliša', 'klimatske promene', 'klimatske promjene', 'promene klime', 'promjene klime', 'klimatska promjena', 'klimatske varijacije', 'globalno zagrevanje', 'globalno zagrijavanje', 'globalno otopljenje', 'klimatska kriza', 'kriza klime', 'katastrofa klime'],
  dutch: ['bescherming van het klimaat', 'bescherming van de omgeving', 'klimaatverandering', 'verandering van het klimaat', 'klimaatschommelingen', 'opwarming van de aarde', 'klimaatcrisis', 'noodtoestand van het klimaat', 'klimaatramp', 'ramp van het klimaat', 'klimaatbescherming', 'aardopwarming', 'klimaatnoodtoestand', 'klimaatcatastrofe'],
  luxembourgish: ['Leschte vum Klima', 'Schutz vum Klima', 'Klima erhaalen', 'Klimawandel', 'Verännerung vum Klima', 'Klimaverännerungen', 'Globale Erwiermung', 'Erwiermung vun der Äerd', 'Klimakris', 'Klimanoutstand', 'Klimanoutfall', 'Klima-Problem', 'Klima-Katastroph', 'Ëmweltkatastroph'],
  french: ['protection du climat', 'changement climatique', 'réchauffement climatique', 'crise climatique', 'urgence climatique', 'préservation du climat', 'protection environnementale', 'catastrophe environnementale'],
  bulgarian: ['защита на климата', 'опазване на климата', 'климатична защита', 'климатични промени', 'промени в климата', 'климатични вариации', 'глобално затопляне', 'глобално затопление', 'климатична криза', 'климатична спешност', 'климатична авария', 'климатичен проблем', 'климатична катастрофа', 'климатично бедствие', 'екологична катастрофа'],
  macedonian: ['заштита на климата', 'заштита на животната средина', 'климатски промени', 'промени во климата', 'климатски варијации', 'глобално затоплување', 'зголемување на глобалната температура', 'климатска криза', 'климатска итност', 'климатска нужност', 'климатски проблем', 'климатска катастрофа', 'климатска несреќа', 'катастрофа на климата'],
  russian: ['защита климата', 'охрана климата', 'защита окружающей среды', 'изменение климата', 'климатические изменения', 'перемены климата', 'климатические вариации', 'глобальное потепление', 'потепление планеты', 'климатический кризис', 'климатическая проблема', 'климатическая катастрофа', 'экологическая катастрофа'],
  greek: ['προστασία του κλίματος', 'διατήρηση του κλίματος', 'προστασία του περιβάλλοντος', 'κλιματική αλλαγή', 'αλλαγή του κλίματος', 'κλιματικές μεταβολές', 'παγκόσμια θέρμανση', 'πλανητική θέρμανση', 'κλιματική κρίση', 'κλιματική έκτακτη ανάγκη', 'πρόβλημα του κλίματος', 'κλιματική καταστροφή', 'κλιματική συμφορά', 'οικολογική καταστροφή'],
  turkish: ['iklim koruma', 'iklim değişikliği', 'küresel ısınma', 'dünya ısınması', 'iklim krizi', 'iklim felaketi', 'iklim afeti', 'çevre koruma', 'çevre kirliliği', 'çevre felaketi', 'çevre afeti'],
  italian: ['protezione del clima', 'salvaguardia del clima', 'tutela del clima', 'cambiamento climatico', 'mutamento climatico', 'variazioni climatiche', 'riscaldamento globale', 'surriscaldamento globale', 'crisi climatica', 'emergenza climatica', 'problema climatico', 'catastrofe climatica', 'disastro climatico'],
  czech: ['ochrana klimatu', 'ochrana životního prostředí', 'změna klimatu', 'klimatická změna', 'klimatické variace', 'globální oteplování', 'zahřívání planety', 'nárůst globálních teplot', 'klimatická krize', 'klimatická nouze', 'klimatická urgence', 'problém klimatu', 'klimatická katastrofa', 'klimatická pohroma'],
  polish: ['ochrona klimatu', 'zachowanie klimatu', 'ochrona środowiska', 'zmiany klimatu', 'zmiana klimatyczna', 'wahania klimatu', 'globalne ocieplenie', 'ocieplenie globalne', 'wzrost globalnej temperatury', 'kryzys klimatyczny', 'stan kryzysu klimatycznego', 'problemy klimatyczne', 'katastrofa klimatyczna', 'kataklizm klimatyczny'],
  estonian: ['kliimakaitse', 'kliima kaitse', 'kliimamuutused', 'kliimamuutumine', 'kliimavariatsioonid', 'globaalne soojenemine', 'maailma soojenemine', 'globaalne temperatuuri tõus', 'kliimakriis', 'kliima hädaolukord', 'kliima hädaabi', 'kliimaprobleem', 'kliimakatastroof', 'keskkonnakatastroof'],
  latvian: ['klimata aizsardzība', 'vides aizsardzība', 'klimata saglabāšana', 'klimata pārmaiņas', 'klimata izmaiņas', 'klimata variācijas', 'globālā sasilšana', 'zemes sasilšana', 'klimata krīze', 'klimata ārkārtas situācija', 'klimata problēma', 'klimata katastrofa', 'vides katastrofa', 'klimata kataklizma'],
  lithuanian: ['klimato apsauga', 'aplinkos apsauga', 'klimato saugojimas', 'klimato kaita', 'klimato pokyčiai', 'klimato kitimas', 'pasaulinis atšilimas', 'globalus atšilimas', 'temperatūros kilimas', 'klimato krizė', 'klimato nepaprastoji padėtis', 'klimato problema', 'klimato katastrofa', 'klimato nelaimė'],
  spanish: ['protección del clima', 'protección ambiental', 'cambio climático', 'modificación climática', 'variaciones climáticas', 'calentamiento global', 'aumento de la temperatura global', 'crisis climática', 'emergencia climática', 'problema climático', 'catástrofe climática', 'desastre climático', 'calamidad climática'],
  portuguese: ['proteção climática', 'proteção do clima', 'proteção ambiental', 'mudança climática', 'alteração climática', 'mudanças no clima', 'variações climáticas', 'aquecimento global', 'aquecimento da terra', 'crise climática', 'emergência climática', 'problema climático', 'catástrofe climática', 'desastre climático'],
  finnish: ['ilmastonsuojelu', 'ilmastonsäilyttäminen', 'ympäristönsuojelu', 'ilmastonmuutos', 'klimatologinen muutos', 'ilmastovaihtelut', 'maailmanlaajuinen lämpeneminen', 'maapallon lämpeneminen', 'globaalin lämpötilan nousu', 'ilmastokriisi', 'ilmastohätätila', 'ilmasto-ongelma', 'ilmastokatastrofi'],
  maltese: ['protezzjoni tal-klima', 'ħarsien tal-klima', 'protezzjoni ambjentali', 'bidla fil-klima', 'bidliet fil-klima', 'varjazzjonijiet klimatiċi', 'tisħin globali', 'tisħin dinji', 'żieda fit-temperaturi globali', 'kriżi tal-klima', 'emerġenza klimatika', 'problema klimatika', 'katastrofi klimatika', 'diżastru klimatiku'],
  hungarian: ['klímavédelem', 'a klíma védelme', 'környezetvédelem', 'klímaváltozás', 'éghajlatváltozás', 'klímaváltozások', 'globális felmelegedés', 'föld felmelegedése', 'globális hőmérséklet emelkedés', 'klímaválság', 'klímavészhelyzet', 'klíma probléma', 'klímakatasztrófa', 'ökológiai katasztrófa'],
  romanian: ['protecția climei', 'protecția mediului', 'conservarea climei', 'schimbări climatice', 'modificări climatice', 'variabilitate climatică', 'încălzire globală', 'încălzirea planetei', 'criza climatică', 'urgentă climatică', 'problema climatică', 'catastrofă climatică', 'dezastru climatic'],
  slovenian: ['apsaugos', 'zaščita podnebja', 'varstvo podnebja', 'podnebne spremembe', 'spremembe podnebja', 'klimatske spremembe', 'segrevanje', 'globalno segrevanje', 'segrevanje zemlje', 'povečanje temperature', 'podnebna kriza', 'podnebna nujnost', 'podnebna težava', 'podnebne katastrofe'],
  slovak: ['ochrana klímy', 'ochrana životného prostredia', 'zachovanie klímy', 'zmena klímy', 'zmeny klímy', 'klimatické zmeny', 'globálne otepľovanie', 'otepľovanie planéty', 'zvyšovanie globálnej teploty', 'klimatická kríza', 'klimatická núdza', 'klimatická pohotovosť', 'klimatický problém', 'klimatická katastrofa'],
  norwegian: ['klimavern', 'miljøvern', 'klimaendringer', 'endringer i klimaet', 'klimatiske endringer', 'global oppvarming', 'oppvarming av kloden', 'økning i global temperatur', 'klimakrise', 'klimanødsituasjon', 'klimaproblem', 'klimakatastrofe', 'miljøkatastrofe'],
  icelandic: ['verndun loftslags', 'verndun umhverfis', 'loftslagsbreytingar', 'breytingar á loftslagi', 'loftslagssveiflur', 'hlýnun jarðar', 'hlýnun heims', 'hækkun á heimsmeðalhita', 'loftslagskreppa', 'loftslagsneyð', 'neyðarástand vegna loftslags', 'loftslagsvandamál', 'loftslagshamfarir'],
  swedish: ['klimatskydd', 'miljöskydd', 'skydd av klimatet', 'klimatförändring', 'förändring av klimatet', 'klimatvariationer', 'global uppvärmning', 'global temperaturökning', 'uppvärmning av jorden', 'klimatkris', 'klimatnödläge', 'klimatnödsituation', 'klimatproblem', 'klimatkatastrof'],
  danish: ['klimaindsats', 'klimabeskyttelse', 'miljøbeskyttelse', 'klimaændringer', 'klimaforandringer', 'ændringer i klimaet', 'global opvarmning', 'global ophedning', 'stigning i globale temperaturer', 'klimakrise', 'klimanødsituation', 'klimaproblem', 'klimakatastrofe', 'miljøkatastrofe'],
  ukrainian: ['захист клімату', 'охорона клімату', 'захист навколишнього середовища', 'зміна клімату', 'кліматичні зміни', 'кліматичні варіації', 'глобальне потепління', 'потепління клімату', 'підвищення глобальної температури', 'кліматична криза', 'кліматична проблема', 'кліматична катастрофа', 'кліматичне лихо'],
  belarusian: ['ахова клімату', 'абарона клімату', 'ахова навакольнага асяроддзя', 'змена клімату', 'кліматычныя змены', 'варыяцыі клімату', 'глабальнае пацяпленне', 'кліматычны крызіс', 'надзвычайная кліматычная сітуацыя', 'кліматычная праблема', 'кліматычная катастрофа', 'кліматычная трагедыя'],
  low: ['Klimaschutz', 'Umweltschutz', 'Klimawandel', 'Klimaerwärmung', 'Globale Erwärmung', 'Erderwärmung', 'Klimakrise', 'Klimakatastrophe', 'Umweltkatastrophe', 'protection du climat', 'changement climatique', 'réchauffement climatique', 'crise climatique', 'urgence climatique', 'préservation du climat'],
  top: ['climate change', 'environmental protection', 'global warming', 'climate crisis', 'climate emergency', 'climate catastrophe', 'climate disaster', 'climate protection', 'climate preservation', 'climate variations', 'global heating', 'earth heating', 'climate problem', 'climate catastrophe', 'environmental catastrophe']
};

const fetchArticlesForRandomGroup = async () => {
  const language = await getLanguageToExecute();
  const randomCountryGroup = { [language]: countryGroups[language] };
  console.log("Selected group for this run:", Object.keys(randomCountryGroup));

  let allArticles = [];

  for (const [language, countryGroup] of Object.entries(randomCountryGroup)) {
    const simpleKeyword = simpleKeywords[language].join(' OR ');
    const keywordGroup = keywordGroups[language];

    try {
      for (const country of countryGroup) {
        const params = {
          apikey: API_KEY,
          country: country,
          full_content: 1,
          timeframe: 3,
          q: simpleKeyword
        };

        if (language === 'low') {
          params.prioritydomain = 'medium';
        } else if (language === 'top') {
          params.prioritydomain = 'top';
        }

        const response = await axios.get('https://newsdata.io/api/1/news', { params, timeout: 200000 });
        console.log(`Fetching articles with params: ${JSON.stringify(params)}`);
        console.log('API response received');

        const articles = response.data.results;
        console.log(`Number of articles received: ${articles.length}`);
        if (articles && articles.length > 0) {
          articles.forEach(article => {
            const keywordsFound = keywordGroup.filter(keyword =>
              (article.title && article.title.includes(keyword)) ||
              (article.description && article.description.includes(keyword)) ||
              (article.content && article.content.includes(keyword))
            );
            if (keywordsFound.length > 0) {
              article.keywords = keywordsFound.join(', ');
              allArticles.push(article);
            }
          });
        }
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  }

  console.log(`Fetched a total of ${allArticles.length} articles`);

  console.log("Logging execution of language:", language);
  const { error: insertError } = await supabase
    .from('execution_log')
    .insert([{ language, created_at: new Date().toISOString() }]);

  if (insertError) {
    console.error("Error inserting into execution_log:", insertError);
    throw insertError;
  } else {
    console.log("Logged execution of language successfully");
  }

  return allArticles;
};


const removeDuplicateArticles = async (articles) => {
  console.log("Removing duplicate articles");
  const uniqueArticles = {};
  articles.forEach(article => {
    const key = `${article.title}-${article.country}`;
    if (!uniqueArticles[key] || uniqueArticles[key].source_priority > article.source_priority) {
      uniqueArticles[key] = article;
    }
  });

  const uniqueArticlesArray = Object.values(uniqueArticles);

  const duplicateArticleIds = articles
    .filter(article => !uniqueArticles[`${article.title}-${article.country}`] || uniqueArticles[`${article.title}-${article.country}`].article_id !== article.article_id)
    .map(article => article.article_id);

  if (duplicateArticleIds.length > 0) {
    const { error: deleteError } = await supabase
      .from('news')
      .delete()
      .in('article_id', duplicateArticleIds);

    if (deleteError) throw deleteError;
  }

  return uniqueArticlesArray;
};

const translateText = async (text, sourceLanguageCode) => {
  const subscriptionKey = process.env.TRANSLATOR_KEY;
  const endpoint = process.env.TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com/';
  const location = 'westeurope';

  const headers = {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
    'Ocp-Apim-Subscription-Region': location,
    'Content-Type': 'application/json'
  };

  const requestBody = [{ Text: text }];

  try {
    const response = await axios.post(`${endpoint}/translate?api-version=3.0&from=${sourceLanguageCode}&to=en`, requestBody, { headers });
    const translations = response.data;
    return translations[0].translations[0].text;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Retry bei 429 Fehler (Rate Limit überschritten)
      console.warn('Rate limit exceeded, retrying...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Warte 1 Sekunde
      return translateText(text, sourceLanguageCode); // Erneut versuchen
    } else {
      console.error('Translation error:', error);
      throw error;
    }
  }
};

const translateArticle = async (article) => {
  const { article_id, title, description, content, language } = article;

  const sourceLanguageCode = languageMapping[language.toLowerCase()];
  if (!sourceLanguageCode) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const title_en = title ? await translateText(title, sourceLanguageCode) : null;
  const description_en = description ? await translateText(description, sourceLanguageCode) : null;
  const content_en = content ? await translateText(content, sourceLanguageCode) : null;

  return {
    article_id,
    title_en,
    description_en,
    content_en
  };
};


const updateAnalytics = async () => {
  console.log("Updating analytics");

  const { data: allArticles, error: fetchError } = await supabase
    .from('news')
    .select('country, pub_date, keywords');

  if (fetchError) {
    console.error("Error fetching articles from news:", fetchError);
    throw fetchError;
  }

  const countryMonthMap = {};

  allArticles.forEach(article => {
    const month = new Date(article.pub_date).toISOString().slice(0, 7); // Format YYYY-MM
    const country = article.country;

    if (!countryMonthMap[country]) {
      countryMonthMap[country] = {};
    }

    if (!countryMonthMap[country][month]) {
      countryMonthMap[country][month] = {
        count_month: 0,
        keyword_counts: {}
      };
    }

    countryMonthMap[country][month].count_month += 1;

    const keywords = article.keywords ? article.keywords.split(', ') : [];
    keywords.forEach(keyword => {
      if (!countryMonthMap[country][month].keyword_counts[keyword]) {
        countryMonthMap[country][month].keyword_counts[keyword] = 0;
      }
      countryMonthMap[country][month].keyword_counts[keyword] += 1;
    });
  });

  const analyticsEntries = [];
  Object.entries(countryMonthMap).forEach(([country, monthData]) => {
    Object.entries(monthData).forEach(([month, data]) => {
      const sortedKeywords = Object.entries(data.keyword_counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      const [keyword_1, count_1] = sortedKeywords[0] || ['', 0];
      const [keyword_2, count_2] = sortedKeywords[1] || ['', 0];
      const [keyword_3, count_3] = sortedKeywords[2] || ['', 0];

      analyticsEntries.push({
        country,
        month: `${month}-01`, 
        count_month: data.count_month,
        keyword_1: keyword_1 || '', 
        count_1: count_1 || 0, 
        keyword_2: keyword_2 || '', 
        count_2: count_2 || 0, 
        keyword_3: keyword_3 || '', 
        count_3: count_3 || 0 
      });
    });
  });

  console.log("Inserting analytics data:", analyticsEntries);

  for (const entry of analyticsEntries) {
    const { country, month, count_month, keyword_1, count_1, keyword_2, count_2, keyword_3, count_3 } = entry;
    const { error } = await supabase
      .from('analytics')
      .upsert({ country, month, count_month, keyword_1, count_1, keyword_2, count_2, keyword_3, count_3 }, { onConflict: ['country', 'month'] });

    if (error) {
      console.error("Error inserting analytics data:", error);
      throw error;
    }
  }

  console.log("Analytics data updated successfully");
};

export const handler = async (event) => {
  console.log("Handler started");
  const articles = await fetchArticlesForRandomGroup();
  console.log(`Fetched ${articles.length} articles`);

  try {
    const { data: existingArticles, error } = await supabase
      .from('news')
      .select('article_id, title, country');

    if (error) {
      console.error("Error fetching existing articles:", error);
      throw error;
    }

    const existingArticleIds = existingArticles.map(article => article.article_id);
    let newArticles = articles
      .filter(article => !existingArticleIds.includes(article.article_id) && article.description &&
        article.source_id !== 'openpr' && article.source_id !== 'en_prnasisa' &&
        article.source_id !== 'euronews' && article.source_id !== 'euronews_es' &&
        article.source_id !== 'euronews_pt' && article.source_id !== 'euronews_arabic' &&
        article.source_id !== 'channelnewsasia' && article.source_id !== 'aljazeera_us' &&
        article.source_id !== 'a24ora' && article.source_id !== 'laopinion' &&
        article.source_id !== 'euronews_arabic' && article.source_id !== 'euronews_de' &&
        article.source_id !== 'euronews_hu' && article.source_id !== 'euronews_tr' &&
        article.source_id !== 'euronews_gr' && article.source_id !== 'euronews_ru' &&
        article.source_id !== 'ign_nl' && article.source_id !== 'ign_me_ar' &&
        article.source_id !== 'ign_nordic' && article.source_id !== 'virginislandsdailynews' &&
        article.source_id !== 'gmx' && article.source_id !== 'theepochtimes' &&
        article.country !== 'australia')
      .map(article => {
        let country = Array.isArray(article.country) ? article.country : [article.country];
        if (article.source_id === 'botasot') {
          country = 'kosovo';
        } else if (article.source_id === 'bbc' && article.language === 'english') {
          country = 'united_kingdom';
        } else if (article.source_id === 'europatoday' || article.source_id === 'today') {
          country = 'italy';
        } else if (article.source_id === 'larazon_es') {
          country = 'spain';
        } else if (article.source_id === 'prime1_ru') {
          country = 'russia';
        } else if (article.country === 'united kingdom') {
          country = 'united_kingdom';
        } else if (article.country === 'czech republic') {
          country = 'czech_republic';
        } else if (article.country === 'bosnia and herzegovina') {
          country = 'bosnia_and_herzegovina';
        } else {
          country = country[0];
        }
        return {
          article_id: article.article_id,
          title: article.title,
          link: article.link,
          description: article.description,
          pub_date: new Date(article.pubDate).toISOString().split('T')[0],
          image_url: article.image_url,
          source_id: article.source_id,
          source_priority: article.source_priority,
          source_url: article.source_url,
          source_icon: article.source_icon,
          language: article.language,
          country: country,
          keywords: article.keywords,
          content: article.content,
          created_at: new Date().toISOString(),
          title_en: '',
          description_en: '',
          content_en: ''
        };
      });

    console.log(`Filtered to ${newArticles.length} new articles`);

    newArticles = await removeDuplicateArticles(newArticles);
    console.log(`Removed duplicates, remaining ${newArticles.length} new articles`);

    // Translate articles
    for (const article of newArticles) {
      const translations = await translateArticle(article);

      article.title_en = translations.title_en;
      article.description_en = translations.description_en;
      article.content_en = translations.content_en;
    }

    console.log(`Translated ${newArticles.length} articles`);

    if (newArticles.length > 0) {
      const { error: insertError } = await supabase
        .from('news')
        .upsert(newArticles, { onConflict: ['article_id'] });

      if (insertError) {
        console.error("Error inserting new articles:", insertError);
        throw insertError;
      }
    }

    await updateAnalytics();

    console.log("Handler completed successfully");
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
};

