const fs    = require('fs');
const path  = require('path');
const fetch = require('node-fetch');

require('dotenv').config({ silent: true });

const TANACH_FILE = path.resolve(process.env.TANACH_FILE);

const sefarimMeta = {
  bereshit: {
    book_id: 35,
    book_name: 'bereshit',
    numchapters: 50,
    part_id: 5,
    part_name: 'torah'
  },
  shemot: {
    book_id: 36,
    book_name: 'shemot',
    numchapters: 40,
    part_id: 5,
    part_name: 'torah'
  },
  vayikra: {
    book_id: 37,
    book_name: 'vayikra',
    numchapters: 27,
    part_id: 5,
    part_name: 'torah'
  },
  bemidbar: {
    book_id: 38,
    book_name: 'bemidbar',
    numchapters: 36,
    part_id: 5,
    part_name: 'torah'
  },
  devarim: {
    book_id: 39,
    book_name: 'devarim',
    numchapters: 34,
    part_id: 5,
    part_name: 'torah'
  },
};

// load the parashiyot JSON
const parashiyot = require('./parashiyot.json');
// load the entire text of the tanach, obtained from Sefaria as a JSON
const tanach     = require(TANACH_FILE);
// load the sefer template
const seferTemplate = require('./sefer_template.json');
// load the parasha template
const parashaTemplate = require('./parasha_template.json');

const seferSponsors = {
  bereshit: 'In Honor of Shirley & Al Gindi',
  shemot: 'In Memory of Rabbi Ezra Labaton',
  vayikra: 'In Honor of Cookie & Stanley Chera',
  bemidbar: '',
  devarim: '',
};

const parashaSponsors = {
  bereshit: 'In Refuah Shelemah for Sarah bat Viviane Sponsored by Joseph Wahba',
};

const books = {
  bereshit: [],
  shemot: [],
  vaiykra: [],
  bemidbar: [],
  devarim: [],
}

parashiyot.forEach((p, i) => {
  const parashaItem = Object.assign({}, parashaTemplate);

  const book = p.Book.toLowerCase();
  const parasha = p.Parsha.toLowerCase().replace(' ', '-');

  const parsedPortion = p.Portion.split(' ');
  const startPortion = parsedPortion[1].split(':');
  const endPortion = parsedPortion[3].split(':');

  parashaItem.sefer = book;
  parashaItem.book_name = book;
  parashaItem.book_name_pretty_eng = p.Book;

  parashaItem.perek_id = parasha;
  parashaItem.parasha_name_pretty_eng = p.Parsha;

  parashaItem.book_id = sefarimMeta[book].book_id;
  parashaItem.book_num_chapters = sefarimMeta[book].numchapters;

  parashaItem.sefer_sponsor = seferSponsors[book];
  parashaItem.parasha_sponsor = parashaSponsors[parasha] || '';

  parashaItem.start_chapter = parseInt(startPortion[0]);
  parashaItem.start_verse = parseInt(startPortion[1]);
  parashaItem.end_chapter = parseInt(endPortion[0]);
  parashaItem.end_verse = parseInt(endPortion[1]);

  parashaItem.teacher_id = p.ID || null;
  parashaItem.teacher_title = p.Title;
  parashaItem.teacher_fname = p.First;
  parashaItem.teacher_lname = p.Last;

  const hebrew = [];
  const english = [];
  for (let i = startPortion[0] - 1; i < endPortion[0]; i++) {
    const fullHeb = tanach[book].hebrew[i];
    const fullEng = tanach[book].english[i];
    const newHeb = [];
    const newEng = [];
    if (i === startPortion[0] - 1 && startPortion[1] > 1) {
      for (let j = startPortion[1] - 1; j < fullHeb.length; j++) {
        newHeb.push(fullHeb[j]);
        newEng.push(fullEng[j]);
      }
    } else if (i === endPortion[0] - 1 && endPortion[1] < fullHeb.length) {
      for (let j = 0; j < endPortion[1]; j++) {
        newHeb.push(fullHeb[j]);
        newEng.push(fullEng[j]);
      }
    } else {
      for (let j = 0; j < fullHeb.length; j++) {
        newHeb.push(fullHeb[j]);
        newEng.push(fullEng[j]);
      }
    }
    hebrew.push(newHeb);
    english.push(newEng);
  }

  parashaItem.hebrew_text = hebrew;
  parashaItem.english_text = english;

  const file = `${i < 9 ? '0' + (i + 1) : i + 1}-${parasha}.json`;

  fs.writeFileSync(`${path.resolve(__dirname, 'output')}/${file}`, JSON.stringify(parashaItem));

});
