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
const parashiyot      = require('./parashiyot.json');
// load the entire text of the tanach, obtained from Sefaria as a JSON
const tanach          = require(TANACH_FILE);
// load the sefer template
const seferTemplate   = require('./sefer_template.json');
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

const bookParashiyot = {
  bereshit: [],
  shemot: [],
  vayikra: [],
  bemidbar: [],
  devarim: [],
}

const bookTeachers = {
  bereshit: [],
  shemot: [],
  vayikra: [],
  bemidbar: [],
  devarim: [],
}

let teachers = [];

const prev = {
  id: null,
  name: null,
};

const next = {
  id: null,
  name: null,
};

function getAllTeacherData() {
  fetch('https://api.tanachstudy.com/teachers')
  .then(r => r.json())
  .then(t => {
    console.log('have teachers');
    teachers = t;
    generateParashaSeeds()
  })
  .catch(err => console.error(err))
}

function generateParashaSeeds() {
  parashiyot.forEach((p, i) => {
    const parashaItem = Object.assign({}, parashaTemplate);

    if (parashiyot[i + 1]) {
      next.id = parashiyot[i + 1].Parsha.toLowerCase().replace(' ', '-');
      next.name = parashiyot[i + 1].Parsha;
    } else {
      next.id = null;
      next.name = null;
    }

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

    const teacher = p.ID ? getTeacherInfoByID(p.ID) : null;
    parashaItem.teacher_id = p.ID || null;
    parashaItem.teacher_title = p.Title;
    parashaItem.teacher_fname = p.First;
    parashaItem.teacher_lname = p.Last;
    parashaItem.teacher_bio   = teacher ? teacher.teacher_info.long_bio : null;
    parashaItem.teacher_image = teacher ? teacher.teacher_info.image_url : null;

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

    parashaItem.prev_parasha_id = prev.id;
    parashaItem.prev_parasha_name = prev.name;

    parashaItem.next_parasha_id = next.id;
    parashaItem.next_parasha_name = next.name;

    prev.id = parasha;
    prev.name = p.Parasha;

    const file = `${i < 9 ? '0' + (i + 1) : i + 1}-${parasha}.json`;

    bookParashiyot[book].push(parashaItem);
    bookTeachers[book].push(teacher);

    fs.writeFileSync(`${path.resolve(__dirname, 'output/parashiyot')}/${file}`, JSON.stringify(parashaItem));

  });

  generateSeferSeeds();
}

function getTeacherInfoByID(id) {
  for(teacher in teachers) {
    if (id === teachers[teacher].teacher_info.teacher_id) return teachers[teacher];
  }
}

function getUniqueTeachersOnly(teachers) {
  const newArray = [];
  const uniqueIDs = [];
  teachers.forEach(t => {
    if (uniqueIDs.indexOf(t.teacher_info.teacher_id) < 0) {
      newArray.push(t);
      uniqueIDs.push(t.teacher_info.teacher_id);
    }
  })
  return newArray;
}

function generateSeferSeeds() {
  for(sefer in sefarimMeta) {
    const currentSefer = sefarimMeta[sefer];
    const seferItem = Object.assign({}, seferTemplate);
    seferItem.seferTeachers = [];
    seferItem.allPerakim = [];

    const currentTeachers = bookTeachers[sefer];

    const uniqueTeachers = getUniqueTeachersOnly(currentTeachers);

    uniqueTeachers.forEach(t => seferItem.seferTeachers.push(t.teacher_info));

    seferItem.seferMeta.book_id = currentSefer.book_id;
    seferItem.seferMeta.book_name = currentSefer.book_name;
    seferItem.seferMeta.book_name_pretty = currentSefer.book_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    seferItem.seferMeta.numchapters = currentSefer.numchapters;
    seferItem.seferMeta.book_sponsor = seferSponsors[sefer];

    const currentParashiyot = bookParashiyot[sefer];
    currentParashiyot.forEach((p, i) => {
      const teacher = getTeacherInfoByID(p.teacher_id);
      const parashaItem = Object.assign({ perek_id: p.perek_id, pretty_name: p.parasha_name_pretty_eng }, teacher.teacher_info);
      seferItem.allPerakim.push(parashaItem);
    });

    const file = `sefer_${sefer}.json`;

    fs.writeFileSync(`${path.resolve(__dirname, 'output/sefarim')}/${file}`, JSON.stringify(seferItem));
  }
  console.log('done')
}

getAllTeacherData();

