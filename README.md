# Random-Quran-Ayah-Verse-Generator

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Random Quran Ayah</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial', sans-serif;
      background: linear-gradient(to bottom, #2a5298, #1e3c72);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      overflow: hidden;
    }

    .container {
      max-width: 800px;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      width: 90%;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 20px;
      color: #f9f9f9;
      font-weight: 600;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    blockquote {
      font-size: 1.5em;
      line-height: 1.8;
      margin: 20px 0;
      background: rgba(255, 255, 255, 0.2);
      padding: 15px 20px;
      border-radius: 10px;
      border-left: 5px solid #4caf50;
      color: #f9f9f9;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    #loadingCircle {
      font-size: 1.2em;
      color: #f9f9f9;
      margin-bottom: 20px;
    }

    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      font-size: 1.2em;
      font-weight: bold;
      color: white;
      background-color: #4caf50;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s ease-in-out, transform 0.2s;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    .button:hover {
      background-color: #45a049;
      transform: scale(1.05);
    }

    .button:active {
      transform: scale(1);
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2em;
      }
      blockquote {
        font-size: 1.2em;
      }
      .button {
        font-size: 1em;
        padding: 10px 15px;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>Random Quran Ayah</h1>
    <blockquote>
      <div id="loadingCircle" style="display:none;">Loading...</div>
      <div id="verse" style="display:none;"></div>
      <div id="translation" style="display:none; margin-top: 20px;"></div>
    </blockquote>
    <div class="button" onclick="getRandomAyah()">Get Random Ayah</div>
  </div>

  <script>
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
  </script>

</body>
</html>
