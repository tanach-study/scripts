require('dotenv').config({ silent: true });
const fse = require('fs-extra');
const gematriya = require('./gematriya');

const books = [
  {
    name: 'introduction',
    path: 'Commentary/Rambam/Rambam Introduction to the Mishnah',
    part: 'introduction',
  },
  {
    name: 'berachot',
    path: 'Seder Zeraim/Mishnah Berakhot',
    part: 'zeraim',
  },
  {
    name: 'peah',
    path: 'Seder Zeraim/Mishnah Peah',
    part: 'zeraim',
  },
  {
    name: 'demai',
    path: 'Seder Zeraim/Mishnah Demai',
    part: 'zeraim',
  },
  {
    name: 'kilayim',
    path: 'Seder Zeraim/Mishnah Kilayim',
    part: 'zeraim',
  },
  {
    name: 'sheviit',
    path: 'Seder Zeraim/Mishnah Sheviit',
    part: 'zeraim',
  },
  {
    name: 'terumot',
    path: 'Seder Zeraim/Mishnah Terumot',
    part: 'zeraim',
  },
  {
    name: 'maasrot',
    path: 'Seder Zeraim/Mishnah Maasrot',
    part: 'zeraim',
  },
  {
    name: 'maaser-sheni',
    path: 'Seder Zeraim/Mishnah Maaser Sheni',
    part: 'zeraim',
  },
  {
    name: 'halla',
    path: 'Seder Zeraim/Mishnah Challah',
    part: 'zeraim',
  },
  {
    name: 'orla',
    path: 'Seder Zeraim/Mishnah Orlah',
    part: 'zeraim',
  },
  {
    name: 'bikurim',
    path: 'Seder Zeraim/Mishnah Bikkurim',
    part: 'zeraim',
  },
  {
    name: 'shabbat',
    path: 'Seder Moed/Mishnah Shabbat',
    part: 'moed',
  },
  {
    name: 'eruvin',
    path: 'Seder Moed/Mishnah Eruvin',
    part: 'moed',
  },
  {
    name: 'pesahim',
    path: 'Seder Moed/Mishnah Pesachim',
    part: 'moed',
  },
  {
    name: 'shekalim',
    path: 'Seder Moed/Mishnah Shekalim',
    part: 'moed',
  },
  {
    name: 'yoma',
    path: 'Seder Moed/Mishnah Yoma',
    part: 'moed',
  },
  {
    name: 'sukka',
    path: 'Seder Moed/Mishnah Sukkah',
    part: 'moed',
  },
  {
    name: 'beitza',
    path: 'Seder Moed/Mishnah Beitzah',
    part: 'moed',
  },
  {
    name: 'rosh-hashana',
    path: 'Seder Moed/Mishnah Rosh Hashanah',
    part: 'moed',
  },
  {
    name: 'taanit',
    path: 'Seder Moed/Mishnah Taanit',
    part: 'moed',
  },
  {
    name: 'megilla',
    path: 'Seder Moed/Mishnah Megillah',
    part: 'moed',
  },
  {
    name: 'moed-katan',
    path: 'Seder Moed/Mishnah Moed Katan',
    part: 'moed',
  },
  {
    name: 'hagiga',
    path: 'Seder Moed/Mishnah Chagigah',
    part: 'moed',
  },
  {
    name: 'yevamot',
    path: 'Seder Nashim/Mishnah Yevamot',
    part: 'nashim',
  },
  {
    name: 'ketubot',
    path: 'Seder Nashim/Mishnah Ketubot',
    part: 'nashim',
  },
  {
    name: 'nedarim',
    path: 'Seder Nashim/Mishnah Nedarim',
    part: 'nashim',
  },
  {
    name: 'nazir',
    path: 'Seder Nashim/Mishnah Nazir',
    part: 'nashim',
  },
  {
    name: 'sota',
    path: 'Seder Nashim/Mishnah Sotah',
    part: 'nashim',
  },
  {
    name: 'gittin',
    path: 'Seder Nashim/Mishnah Gittin',
    part: 'nashim',
  },
  {
    name: 'kidushin',
    path: 'Seder Nashim/Mishnah Kiddushin',
    part: 'nashim',
  },
  {
    name: 'bava-kamma',
    path: 'Seder Nezikin/Mishnah Bava Kamma',
    part: 'nezikin',
  },
  {
    name: 'bava-metzia',
    path: 'Seder Nezikin/Mishnah Bava Metzia',
    part: 'nezikin',
  },
  {
    name: 'bava-batra',
    path: 'Seder Nezikin/Mishnah Bava Batra',
    part: 'nezikin',
  },
  {
    name: 'sanhedrin',
    path: 'Seder Nezikin/Mishnah Sanhedrin',
    part: 'nezikin',
  },
  {
    name: 'makkot',
    path: 'Seder Nezikin/Mishnah Makkot',
    part: 'nezikin',
  },
  {
    name: 'shevuot',
    path: 'Seder Nezikin/Mishnah Shevuot',
    part: 'nezikin',
  },
  {
    name: 'eduyot',
    path: 'Seder Nezikin/Mishnah Eduyot',
    part: 'nezikin',
  },
  {
    name: 'avoda-zara',
    path: 'Seder Nezikin/Mishnah Avodah Zarah',
    part: 'nezikin',
  },
  {
    name: 'avot',
    path: 'Seder Nezikin/Pirkei Avot',
    part: 'nezikin',
  },
  {
    name: 'horayot',
    path: 'Seder Nezikin/Mishnah Horayot',
    part: 'nezikin',
  },
  {
    name: 'zevahim',
    path: 'Seder Kodashim/Mishnah Zevachim',
    part: 'kadashim',
  },
  {
    name: 'menahot',
    path: 'Seder Kodashim/Mishnah Menachot',
    part: 'kadashim',
  },
  {
    name: 'hullin',
    path: 'Seder Kodashim/Mishnah Chullin',
    part: 'kadashim',
  },
  {
    name: 'bechorot',
    path: 'Seder Kodashim/Mishnah Bekhorot',
    part: 'kadashim',
  },
  {
    name: 'arachin',
    path: 'Seder Kodashim/Mishnah Arakhin',
    part: 'kadashim',
  },
  {
    name: 'temura',
    path: 'Seder Kodashim/Mishnah Temurah',
    part: 'kadashim',
  },
  {
    name: 'keritot',
    path: 'Seder Kodashim/Mishnah Keritot',
    part: 'kadashim',
  },
  {
    name: 'meila',
    path: 'Seder Kodashim/Mishnah Meilah',
    part: 'kadashim',
  },
  {
    name: 'tamid',
    path: 'Seder Kodashim/Mishnah Tamid',
    part: 'kadashim',
  },
  {
    name: 'middot',
    path: 'Seder Kodashim/Mishnah Middot',
    part: 'kadashim',
  },
  {
    name: 'kinnim',
    path: 'Seder Kodashim/Mishnah Kinnim',
    part: 'kadashim',
  },
  {
    name: 'kelim',
    path: 'Seder Tahorot/Mishnah Kelim',
    part: 'taharot',
  },
  {
    name: 'ohalot',
    path: 'Seder Tahorot/Mishnah Oholot',
    part: 'taharot',
  },
  {
    name: 'negaim',
    path: 'Seder Tahorot/Mishnah Negaim',
    part: 'taharot',
  },
  {
    name: 'para',
    path: 'Seder Tahorot/Mishnah Parah',
    part: 'taharot',
  },
  {
    name: 'taharot',
    path: 'Seder Tahorot/Mishnah Tahorot',
    part: 'taharot',
  },
  {
    name: 'mikvaot',
    path: 'Seder Tahorot/Mishnah Mikvaot',
    part: 'taharot',
  },
  {
    name: 'nidda',
    path: 'Seder Tahorot/Mishnah Niddah',
    part: 'taharot',
  },
  {
    name: 'machshirin',
    path: 'Seder Tahorot/Mishnah Makhshirin',
    part: 'taharot',
  },
  {
    name: 'zavim',
    path: 'Seder Tahorot/Mishnah Zavim',
    part: 'taharot',
  },
  {
    name: 'tevul-yom',
    path: 'Seder Tahorot/Mishnah Tevul Yom',
    part: 'taharot',
  },
  {
    name: 'yadayim',
    path: 'Seder Tahorot/Mishnah Yadayim',
    part: 'taharot',
  },
  {
    name: 'oktzin',
    path: 'Seder Tahorot/Mishnah Oktzin',
    part: 'taharot',
  },
];


function getTextForBook(book, i) {
  const dataHeb = fse.readFileSync(`${process.env.MS_LOAD_PATH}/json/Mishnah/${book.path}/Hebrew/merged.json`, 'utf8');
  const parsedHeb = JSON.parse(dataHeb);
  const dataEng = fse.readFileSync(`${process.env.MS_LOAD_PATH}/json/Mishnah/${book.path}/English/merged.json`, 'utf8')
  const parsedEng = JSON.parse(dataEng);
  let ret = {};
  ret.hebrew = parsedHeb.text;
  ret.english = parsedEng.text;
  return ret;
}

let allData = {};
let allDataByParts = {
  'introduction': {},
  'zeraim': {},
  'moed': {},
  'nashim': {},
  'nezikin': {},
  'kadashim': {},
  'taharot': {},
};
books.forEach((book, i) => {
  console.log(book.name, book.part, i);
  allData[book.name] = getTextForBook(book, i);
  allDataByParts[book.part][book.name] = getTextForBook(book, i);
});

fse.writeFile(`${process.env.MS_SAVE_PATH}/all.json`, JSON.stringify(allData), err => {
  if (err) console.log(err);
});
for (key in allDataByParts) {
  fse.writeFile(`${process.env.MS_SAVE_PATH}/${key}.json`, JSON.stringify(allDataByParts[key]), err => {
    if (err) console.log(err);
  });
}
