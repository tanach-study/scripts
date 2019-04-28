const fs = require('fs');

fs.readFile('./template.csv', 'utf8', (e, d) => {
  if (e) {
    console.error(e);
    return;
  }
  parseCSV(d);
})


function parseCSV(data) {
  // console.log(data)
  const lines = data.trim().split('\n');
  const headerRow = lines[0];
  const fields = headerRow.trim().split(',').map(f => f.toLowerCase());
  const out = [];

  for (i = 1; i < lines.length; i++) {
    const values = lines[i].trim().split(',');
    // console.log(values)
    const entry = {};
    for (j = 0; j < fields.length; j++) {
      entry[fields[j]] = values[j];
    }
    out.push(entry);
  }
  // console.log(out)
  createDBEntries(out);
}

function createDBEntries(data) {
  const entries = data.map((e) => {
    console.log(`${e.seder}-${e.masechet}-${e.perek}-${e.mishna}`)
    const t = getTemplate();
    t.division = 'mishna';
    t.division_title = 'Mishna';
    t.division_sequence = 6;
    t.segment = e.seder.toLowerCase().replace(' ', '-');
    t.segment_name = 'Seder';
    t.segment_title = e.seder;
    t.segment_sequence = getSederSequence(e.seder);
    t.section = e.masechet.toLowerCase().replace(' ', '-');
    t.section_name = 'Masechet';
    t.section_title = e.masechet;
    t.section_sequence = getMasechetSequence(e.masechet);
    t.unit = parseInt(e.perek, 10);
    t.unit_name = 'Perek';
    t.unit_sequence = parseInt(e.perek, 10);
    t.part = parseInt(e.mishna, 10);
    t.part_name = 'Mishna';
    t.part_title = e.title;
    t.part_sequence = parseInt(e.mishna, 10);
    t.series = 'first';
    return t;
  });
  saveSeeds(entries);
}

function saveSeeds(s) {
  fs.writeFile('mishnayot.json', JSON.stringify(s), 'utf8', (e) => {
    if (e) {
      console.log(e);
    }
  });
}


function getTemplate() {
  return {
    division: null,
    division_name: null,
    division_title: null,
    division_sponsor: null,
    division_sequence: null,
    segment: null,
    segment_name: null,
    segment_title: null,
    segment_sponsor: null,
    segment_sequence: null,
    section: null,
    section_name: null,
    section_title: null,
    section_sponsor: null,
    section_sequence: null,
    unit: null,
    unit_name: null,
    unit_title: null,
    unit_sponsor: null,
    unit_sequence: null,
    part: null,
    part_name: null,
    part_title: null,
    part_sponsor: null,
    part_sequence: null,
    series: null,
    series_name: null,
    series_title: null,
    series_sponsor: null,
    series_sequence: null,
    start_chapter: null,
    start_verse: null,
    end_chapter: null,
    end_verse: null,
    audio_url: {
      host: null,
      path: null,
    },
    teacher_title: null,
    teacher_fname: null,
    teacher_mname: null,
    teacher_lname: null,
    teacher_short_bio: null,
    teacher_long_bio: null,
    teacher_image_url: null,
    teamim: null,
  };
}

function getSederSequence(s) {
  let seq = 0;
  switch(s) {
    case 'Zeraim':
      seq = 1;
      break;
    case 'Moed':
      seq = 2;
      break;
    case 'Nashim':
      seq = 3;
      break;
    case 'Nezikin':
      seq = 4;
      break;
    case 'Kadashim':
      seq = 5;
      break;
    case 'Taharot':
      seq = 6;
      break;
  }
  return seq;
}

function getMasechetSequence(m) {
  let seq = 0;
  switch(m) {
    case 'Berachot':
      seq = 1;
      break;
    case 'Peah':
      seq = 2;
      break;
    case 'Demai':
      seq = 3;
      break;
    case 'Kilayim':
      seq = 4;
      break;
    case 'Sheviit':
      seq = 5;
      break;
    case 'Terumot':
      seq = 6;
      break;
    case 'Maasrot':
      seq = 7;
      break;
    case 'Maaser Sheni':
      seq = 8;
      break;
    case 'Halla':
      seq = 9;
      break;
    case 'Orla':
      seq = 10;
      break;
    case 'Bikurim':
      seq = 11;
      break;
    case 'Shabbat':
      seq = 1;
      break;
    case 'Eruvin':
      seq = 2;
      break;
    case 'Pesahim':
      seq = 3;
      break;
    case 'Shekalim':
      seq = 4;
      break;
    case 'Yoma':
      seq = 5;
      break;
    case 'Sukka':
      seq = 6;
      break;
    case 'Beitza':
      seq = 7;
      break;
    case 'Rosh Hashana':
      seq = 8;
      break;
    case 'Taanit':
      seq = 9;
      break;
    case 'Megilla':
      seq = 10;
      break;
    case 'Moed Katan':
      seq = 11;
      break;
    case 'Hagiga':
      seq = 12;
      break;
    case 'Yevamot':
      seq = 1;
      break;
    case 'Ketubot':
      seq = 2;
      break;
    case 'Nedarim':
      seq = 3;
      break;
    case 'Nazir':
      seq = 4;
      break;
    case 'Sota':
      seq = 5;
      break;
    case 'Gittin':
      seq = 6;
      break;
    case 'Kidushin':
      seq = 7;
      break;
    case 'Bava Kamma':
      seq = 1;
      break;
    case 'Bava Metzia':
      seq = 2;
      break;
    case 'Bava Batra':
      seq = 3;
      break;
    case 'Sanhedrin':
      seq = 4;
      break;
    case 'Makkot':
      seq = 5;
      break;
    case 'Shevuot':
      seq = 6;
      break;
    case 'Eduyot':
      seq = 7;
      break;
    case 'Avoda Zara':
      seq = 8;
      break;
    case 'Avot':
      seq = 9;
      break;
    case 'Horayot':
      seq = 10;
      break;
    case 'Zevahim':
      seq = 1;
      break;
    case 'Menahot':
      seq = 2;
      break;
    case 'Hullin':
      seq = 3;
      break;
    case 'Bechorot':
      seq = 4;
      break;
    case 'Arachin':
      seq = 5;
      break;
    case 'Temura':
      seq = 6;
      break;
    case 'Keritot':
      seq = 7;
      break;
    case 'Meila':
      seq = 8;
      break;
    case 'Tamid':
      seq = 9;
      break;
    case 'Middot':
      seq = 10;
      break;
    case 'Kinnim':
      seq = 11;
      break;
    case 'Kelim':
      seq = 1;
      break;
    case 'Ohalot':
      seq = 2;
      break;
    case 'Negaim':
      seq = 3;
      break;
    case 'Para':
      seq = 4;
      break;
    case 'Taharot':
      seq = 5;
      break;
    case 'Mikvaot':
      seq = 6;
      break;
    case 'Nidda':
      seq = 7;
      break;
    case 'Machshirin':
      seq = 8;
      break;
    case 'Zavim':
      seq = 9;
      break;
    case 'Tevul Yom':
      seq = 10;
      break;
    case 'Yadayim':
      seq = 11;
      break;
    case 'Oktzin':
      seq = 12;
      break;
  }
  return seq;
}
