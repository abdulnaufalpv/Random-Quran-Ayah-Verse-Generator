const TOTAL_SURAHS = 114;
    let totalAyahs, surahNumber, ayahNumber, ayah, translatedAyah;
    const SURAH_URL = 'https://api.alquran.cloud/v1/surah/';
    let newSurahURL;
    const eng = 'en.sahih';
    getRandomAyah();

    async function randomAyah() {
      showLoader();
      surahNumber = Math.floor(Math.random() * TOTAL_SURAHS) + 1;
      newSurahURL = SURAH_URL + surahNumber;
      const response = await fetch(newSurahURL);
      const chapterJSON = await response.json();
      totalAyahs = chapterJSON.data.numberOfAyahs;
      ayahNumber = Math.floor(Math.random() * totalAyahs);
      ayah = chapterJSON.data.ayahs[ayahNumber].text;
      translateAyah();
    }

    async function translateAyah() {
      newSurahURL += '/' + eng;
      const response = await fetch(newSurahURL);
      const chapterJSON2 = await response.json();
      translatedAyah = chapterJSON2.data.ayahs[ayahNumber].text;
      printToHTML();
    }

    function printToHTML() {
      document.getElementById('loadingCircle').style.display = 'none';
      document.getElementById('verse').style.display = 'block';
      document.getElementById('translation').style.display = 'block';
      document.getElementById('verse').innerHTML = ayah;
      document.getElementById('translation').innerHTML = 
        `Surah ${surahNumber}:${ayahNumber + 1}`.bold() + ' ' + translatedAyah;
    }

    function showLoader() {
      document.getElementById('loadingCircle').style.display = 'block';
      document.getElementById('verse').style.display = 'none';
      document.getElementById('translation').style.display = 'none';
    }

    async function getRandomAyah() {
      randomAyah();
    }
