require('dotenv').config({ silent: true });
const fse = require('fs-extra');
const gematriya = require('./gematriya');

const books = [
  {
    name: 'yehoshua',
    numPerakim: 24,
    path: 'Prophets/Joshua',
  },
  {
    name: 'shofetim',
    numPerakim: 21,
    path: 'Prophets/Judges',
  },
  {
    name: 'shemuel1',
    numPerakim: 31,
    path: 'Prophets/I Samuel',
  },
  {
    name: 'shemuel2',
    numPerakim: 24,
    path: 'Prophets/II Samuel',
  },
  {
    name: 'melachim1',
    numPerakim: 22,
    path: 'Prophets/I Kings',
  },
  {
    name: 'melachim2',
    numPerakim: 25,
    path: 'Prophets/II Kings',
  },
  {
    name: 'yeshayahu',
    numPerakim: 66,
    path: 'Prophets/Isaiah',
  },
  {
    name: 'yirmiyahu',
    numPerakim: 52,
    path: 'Prophets/Jeremiah',
  },
  {
    name: 'yehezkel',
    numPerakim: 48,
    path: 'Prophets/Ezekiel',
  },
  {
    name: 'hoshea',
    numPerakim: 14,
    path: 'Prophets/Hosea',
  },
  {
    name: 'yoel',
    numPerakim: 3,
    path: 'Prophets/Joel',
  },
  {
    name: 'amos',
    numPerakim: 9,
    path: 'Prophets/Amos',
  },
  {
    name: 'ovadia',
    numPerakim: 1,
    path: 'Prophets/Obadiah',
  },
  {
    name: 'yonah',
    numPerakim: 4,
    path: 'Prophets/Jonah',
  },
  {
    name: 'michah',
    numPerakim: 7,
    path: 'Prophets/Micah',
  },
  {
    name: 'nahum',
    numPerakim: 3,
    path: 'Prophets/Nahum',
  },
  {
    name: 'habakuk',
    numPerakim: 3,
    path: 'Prophets/Habakkuk',
  },
  {
    name: 'sephania',
    numPerakim: 3,
    path: 'Prophets/Zephaniah',
  },
  {
    name: 'hagai',
    numPerakim: 2,
    path: 'Prophets/Haggai',
  },
  {
    name: 'zecharia',
    numPerakim: 14,
    path: 'Prophets/Zechariah',
  },
  {
    name: 'malachi',
    numPerakim: 4,
    path: 'Prophets/Malachi',
  },
  {
    name: 'divre-hayamim-1',
    numPerakim: 29,
    path: 'Writings/I Chronicles',
  },
  {
    name: 'divre-hayamim-2',
    numPerakim: 36,
    path: 'Writings/II Chronicles',
  },
  {
    name: 'tehillim',
    numPerakim: 150,
    path: 'Writings/Psalms',
  },
  {
    name: 'mishle',
    numPerakim: 31,
    path: 'Writings/Proverbs',
  },
  {
    name: 'iyov',
    numPerakim: 42,
    path: 'Writings/Job',
  },
  {
    name: 'shir-hashirim',
    numPerakim: 8,
    path: 'Writings/Song of Songs',
  },
  {
    name: 'ruth',
    numPerakim: 4,
    path: 'Writings/Ruth',
  },
  {
    name: 'eichah',
    numPerakim: 5,
    path: 'Writings/Lamentations',
  },
  {
    name: 'kohelet',
    numPerakim: 12,
    path: 'Writings/Ecclesiastes',
  },
  {
    name: 'esther',
    numPerakim: 10,
    path: 'Writings/Esther',
  },
  {
    name: 'daniel',
    numPerakim: 12,
    path: 'Writings/Daniel',
  },
  {
    name: 'ezra',
    numPerakim: 10,
    path: 'Writings/Ezra',
  },
  {
    name: 'nehemya',
    numPerakim: 13,
    path: 'Writings/Nehemiah',
  },
  {
    name: 'bereshit',
    numPerakim: 50,
    path: 'Torah/Genesis',
  },
  {
    name: 'shemot',
    numPerakim: 40,
    path: 'Torah/Exodus',
  },
  {
    name: 'vayikra',
    numPerakim: 27,
    path: 'Torah/Leviticus',
  },
  {
    name: 'bemidbar',
    numPerakim: 36,
    path: 'Torah/Numbers',
  },
  {
    name: 'devarim',
    numPerakim: 34,
    path: 'Torah/Deuteronomy',
  },

];

let allData = {};
books.forEach((book, i) => {

  // fse.remove(`${process.env.SAVE_PATH}/${book.name}`, err => console.log(err));
  // fse.remove(`${process.env.SAVE_PATH}/${book.name}/heb`, err => console.log(err));
  // fse.remove(`${process.env.SAVE_PATH}/${book.name}/eng`, err => console.log(err));
  // fse.remove(`${process.env.SAVE_PATH}/${book.name}/par`, err => console.log(err));
  // fse.remove(`${process.env.SAVE_PATH}/${book.name}/full`, err => console.log(err));

  // fse.mkdir(`${process.env.SAVE_PATH}/${book.name}`, err => console.log(err));
  // fse.mkdir(`${process.env.SAVE_PATH}/${book.name}/heb`, err => console.log(err));
  // fse.mkdir(`${process.env.SAVE_PATH}/${book.name}/eng`, err => console.log(err));
  // fse.mkdir(`${process.env.SAVE_PATH}/${book.name}/par`, err => console.log(err));
  // fse.mkdir(`${process.env.SAVE_PATH}/${book.name}/full`, err => console.log(err));

  // fse.readFile(`${process.env.LOAD_PATH}/json/Tanakh/${book.path}/Hebrew/Tanach with Nikkud.json`, 'utf8', (err, data) => {
  //   if (err) return console.log(err);

  //   // parsed should hold a full book
  //   const parsed = JSON.parse(data);
  //   console.log(`${book.name}`, parsed.text.length);

  // });

  // hebrew(book, i);
  // english(book, i);
  // parallel(book, i);
  // full(book, i);
  console.log(book.name, i);
  allData[book.name] = all(book, i);
});

fse.writeFile(`${process.env.SAVE_PATH}/all.json`, JSON.stringify(allData), err => {
  if (err) console.log(err);
});



function hebrew(book, i) {
  fse.readFile(`${process.env.LOAD_PATH}/json/Tanakh/${book.path}/Hebrew/Tanach with Nikkud.json`, 'utf8', (err, data) => {
    if (err) return console.log(err);

    // parsed should hold a full book
    const parsed = JSON.parse(data);
    parsed.text.forEach((perek, n) => {
      let str = '';
      perek.forEach((pasuk, i) => {
        str += `${gematriya(i+1)}. ${pasuk}\n`;
      });
      fse.writeFile(`${process.env.SAVE_PATH}/${book.name}/heb/${book.name}-${n+1}-heb.txt`, str, err => {
        if (err) console.log(err);
      });
    });
  });
}

function english(book, i) {
  fse.readFile(`${process.env.LOAD_PATH}/json/Tanakh/${book.path}/English/The Holy Scriptures A New Translation JPS 1917.json`, 'utf8', (err, data) => {
    if (err) return console.log(err);

    // parsed should hold a full book
    const parsed = JSON.parse(data);
    parsed.text.forEach((perek, n) => {
      let str = '';
      perek.forEach((pasuk, i) => {
        str += `${i+1}. ${pasuk}\n`;
      });
      fse.writeFile(`${process.env.SAVE_PATH}/${book.name}/eng/${book.name}-${n+1}-eng.txt`, str, err => {
        if (err) console.log(err);
      });
    });
  });
}

function parallel(book, i) {
  let numPerakim = null;
  // get hebrew data
  fse.readFile(`${process.env.LOAD_PATH}/json/Tanakh/${book.path}/Hebrew/Tanach with Nikkud.json`, 'utf8', (err, hebData) => {
    if (err) return console.log(err);

    // then get english data
    fse.readFile(`${process.env.LOAD_PATH}/json/Tanakh/${book.path}/English/The Holy Scriptures A New Translation JPS 1917.json`, 'utf8', (err, engData) => {
      if (err) return console.log(err);

      // each _Parsed variable should hold a full book
      const hebParsed = JSON.parse(hebData);
      const engParsed = JSON.parse(engData);
      hebNumPerakim = hebParsed.text.length;
      engNumPerakim = engParsed.text.length;
      // if(hebNumPerakim != engNumPerakim) return;
      const numPerakim = hebNumPerakim;
      const hebText = hebParsed.text;
      const engText = engParsed.text;
      for (let i = 0; i < numPerakim; i++) {
        const numPesukim = hebText.length;

        let hebPesukim = [];
        hebText[i].forEach((pasuk, j) => hebPesukim.push(`<p><b>${gematriya(j+1)}. </b>${pasuk}</p>\n`));

        let engPesukim = [];
        engText[i].forEach((pasuk, j) => engPesukim.push(`<p><b>${j+1}. </b>${pasuk}</p>\n`));

        let parStr = '';
        for (let j = 0; j < numPesukim; j++) {
          parStr += hebPesukim[j];
          parStr += engPesukim[j];
        }

        fse.writeFile(`${process.env.SAVE_PATH}/${book.name}/par/${book.name}-${i+1}-par.txt`, parStr, err => {
          if (err) console.log(err);
        });
      }
    });
  });
}

function full(book, i) {
  console.log(book.name, i)
  let numPerakim = null;
  // get hebrew data...
  fse.readFile(`${process.env.LOAD_PATH}/json/Tanakh/${book.path}/Hebrew/Tanach with Nikkud.json`, 'utf8', (err, hebData) => {
    if (err) return console.log(err);

    // ...then get english data
    fse.readFile(`${process.env.LOAD_PATH}/json/Tanakh/${book.path}/English/The Holy Scriptures A New Translation JPS 1917.json`, 'utf8', (err, engData) => {
      if (err) return console.log(err);

      // each _Parsed variable should hold a full book
      const hebParsed = JSON.parse(hebData);
      const engParsed = JSON.parse(engData);
      hebNumPerakim = hebParsed.text.length;
      engNumPerakim = engParsed.text.length;
      // if(hebNumPerakim != engNumPerakim) return;
      const numPerakim = hebNumPerakim;
      const hebText = hebParsed.text;
      const engText = engParsed.text;
      for (let i = 0; i < numPerakim; i++) {
        const numPesukim = hebText.length;

        let hebPesukim = [];
        hebText[i].forEach((pasuk, j) => hebPesukim.push(`<p><b>${gematriya(j+1)}. </b>${pasuk}</p>\n`));

        let engPesukim = [];
        engText[i].forEach((pasuk, j) => engPesukim.push(`<p><b>${j+1}. </b>${pasuk}</p>\n`));

        let parStr = '';
        for (let j = 0; j < numPesukim; j++) {
          if (hebPesukim[j])
            parStr += hebPesukim[j];
          if (engPesukim[j])
            parStr += engPesukim[j];
        }

        let fullStr = '';
        fullStr += `<div class='text' id='hebText'>\n`;
        hebPesukim.forEach((pasuk) => fullStr += pasuk)
        fullStr += `\n</div>\n<div class='text' id='parText'>\n`;
        fullStr += parStr;
        fullStr += `\n</div>\n<div class='text' id='engText'>\n`;
        engPesukim.forEach((pasuk) => fullStr += pasuk)
        fullStr += `\n</div>`;

        fse.writeFile(`${process.env.SAVE_PATH}/${book.name}/full/${book.name}-${i+1}-full.txt`, fullStr, err => {
          if (err) console.log(err);
        });
      }
    });
  });
}

function all(book, i) {
  const dataHeb = fse.readFileSync(`${process.env.LOAD_PATH}/json/Tanakh/${book.path}/Hebrew/Tanach with Nikkud.json`, 'utf8');
  const parsedHeb = JSON.parse(dataHeb);
  const dataEng = fse.readFileSync(`${process.env.LOAD_PATH}/json/Tanakh/${book.path}/English/The Holy Scriptures A New Translation JPS 1917.json`, 'utf8')
  const parsedEng = JSON.parse(dataEng);
  let ret = {};
  ret.hebrew = parsedHeb.text;
  ret.english = parsedEng.text;
  return ret;
}
