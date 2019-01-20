#!/usr/bin/env node
const assert = require('assert');
const fs = require('fs');
const perakim = require('./perakim.json');
const teachers = require('./teachers.json');

function getNachPerakim(a) {
  return a.filter(p => p.part_id < 5);
}

function getTorahPerakim(a) {
  return a.filter(p => p.part_id === 5);
}

function getNewModelTemplate() {
  return {
    division: '',
    division_name: '',
    division_title: '',
    division_sponsor: '',
    division_sequence: '',

    segment: '',
    segment_name: '',
    segment_title: '',
    segment_sponsor: '',
    segment_sequence: '',

    section: '',
    section_name: '',
    section_title: '',
    section_sponsor: '',
    section_sequence: '',

    unit: '',
    unit_name: '',
    unit_title: '',
    unit_sponsor: '',
    unit_sequence: '',

    part: '',
    part_name: '',
    part_title: '',
    part_sponsor: '',
    part_sequence: '',

    series: '',
    series_name: '',
    series_title: '',
    series_sponsor: '',
    series_sequence: '',

    start_chapter: '',
    start_verse: '',
    end_chapter: '',
    end_verse: '',

    audio_url: '',

    teacher_title: '',
    teacher_fname: '',
    teacher_mname: '',
    teacher_lname: '',
    teacher_short_bio: '',
    teacher_long_bio: '',
    teacher_image_url: '',

    teamim: [
      {
        reader_title: '',
        reader_fname: '',
        reader_mname: '',
        reader_lname: '',
        reader_short_bio: '',
        reader_long_bio: '',
        reader_image_url: '',
        audio_url: '',
      },
    ],
  };
}

function getDivision(item) {
  let division = '';
  switch (item.part_id) {
    case 1:
      division = 'neviim_rishonim';
      break;
    case 2:
      division = 'neviim_aharonim';
      break;
    case 3:
      division = 'tere_asar';
      break;
    case 4:
      division = 'ketuvim';
      break;
    case 5:
      division = 'torah';
      break;
    default:
      division = null;
      break;
  }
  return division;
}

function getDivisionTitle(item) {
  let name = '';
  switch (item.part_id) {
    case 1:
      name = 'Neviim Rishonim';
      break;
    case 2:
      name = 'Neviim Aharonim';
      break;
    case 3:
      name = 'Tere Asar';
      break;
    case 4:
      name = 'Ketuvim';
      break;
    case 5:
      name = 'Torah';
      break;
    default:
      name = null;
      break;
  }
  return name;
}

function getDivisionSequence(item) {
  const division = getDivision(item);
  const divisionOrdering = {
    torah: 1,
    neviim_rishonim: 2,
    neviim_aharonim: 3,
    tere_asar: 4,
    ketuvim: 5,
  };
  return divisionOrdering[division];
}

function getSection(item) {
  return item.book_name;
}

function getSectionTitle(item) {
  return item.book_name_pretty_eng;
}

function getSectionSponsor(item) {
  if (item.sefer_sponsor) {
    return Array.isArray(item.sefer_sponsor) ? item.sefer_sponsor : [item.sefer_sponsor];
  } else {
    return [];
  }
}

function getSectionSequence(item) {
  const section = getSection(item);
  const sectionOrdering = {
    yehoshua: 1,
    shofetim: 2,
    shemuel1: 3,
    shemuel2: 4,
    melachim1: 5,
    melachim2: 6,
    yeshayahu: 1,
    yirmiyahu: 2,
    yehezkel: 3,
    hoshea: 1,
    yoel: 2,
    amos: 3,
    ovadia: 4,
    yonah: 5,
    michah: 6,
    nahum: 7,
    habakuk: 8,
    sephania: 9,
    hagai: 10,
    zecharia: 11,
    malachi: 12,
    'divre-hayamim-1': 1,
    'divre-hayamim-2': 2,
    tehillim: 3,
    mishle: 4,
    iyov: 5,
    'shir-hashirim': 6,
    ruth: 7,
    eichah: 8,
    kohelet: 9,
    esther: 10,
    daniel: 11,
    ezra: 12,
    nehemya: 13,
    bereshit: 1,
    shemot: 2,
    vayikra: 3,
    bemidbar: 4,
    devarim: 5,
  };
  return sectionOrdering[section];
}

function getUnit(item) {
  return item.perek_id;
}

function getUnitTitle(item) {
  if (item.part_id === 5) {
    return item.parasha_name_pretty_eng;
  } else {
    return item.perek_id;
  }
}

function getUnitSponsor(item) {
  if (item.part_id === 5) {
    if (item.parasha_sponsor) {
      return Array.isArray(item.parasha_sponsor) ? item.parasha_sponsor : [item.parasha_sponsor];
    } else {
      return [];
    }
  } else {
    if (item.perek_sponsor) {
      return Array.isArray(item.perek_sponsor) ? item.perek_sponsor : [item.perek_sponsor];
    } else {
      return [];
    }
  }
}

function getPart(item, part) {
  if (part === null || part === '') {
    return null;
  } else if (typeof part === 'object') {
    return part.number;
  } else {
    return part;
  }
}

function getPartTitle(item, part) {
  if (item.part_id === 5) {
    return part.title;
  } else {
    return item.perek_title;
  }
}

function getSeries(item) {
  return 'first';
}

function formatDir(passed) {
  let str;
  if (passed) str = passed.toLowerCase();
  else return undefined;
  const part1 = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (match) => {
    if (+match === 0) return '';
    return match.toUpperCase();
  });
  const part2 = part1.replace(/-/g, ' ');
  return part2;
}

function getStartChapter(item, part) {
  if (item.part_id === 5) {
    return part.start_chapter;
  } else {
    return item.perek_id;
  }
}

function getStartVerse(item, part) {
  if (item.part_id === 5) {
    return part.start_verse;
  } else {
    return 1;
  }
}

function getEndChapter(item, part) {
  if (item.part_id === 5) {
    return part.end_chapter;
  } else {
    return item.perek_id;
  }
}

function getEndVerse(item, part) {
  if (item.part_id === 5) {
    return part.end_verse;
  } else {
    return 'end';
  }
}

function getAudioURL(item, part) {
  const partName = encodeURIComponent(formatDir(item.part_name));
  const seferName = encodeURIComponent(formatDir(item.book_name));
  const fileName = `${item.book_name.replace(/ /g, '-')}-${item.perek_id}.mp3`;
  const fileBase = fileName.replace('.mp3', '');
  return {
    host: 'https://cdn.tanachstudy.com',
    path: `/archives/${partName}/${seferName}/${fileBase}${part}.mp3`,
  };
}

function getTeacherTitle(item) {
  return item.teacher_title;
}

function getTeacherFirstName(item) {
  return item.teacher_fname;
}

function getTeacherMiddleName(item) {
  return item.teacher_mname;
}

function getTeacherLastName(item) {
  return item.teacher_lname;
}

function getTeacherObjectByID(id) {
  return teachers.filter(t => t.teacher_info.teacher_id === id)[0];
}

function getTeacherShortBio(item) {
  const teacherObj = getTeacherObjectByID(item.teacher_id);
  return teacherObj.teacher_info.short_bio;
}

function getTeacherLongBio(item) {
  const teacherObj = getTeacherObjectByID(item.teacher_id);
  return teacherObj.teacher_info.long_bio;
}

function getTeacherPicture(item) {
  const teacherObj = getTeacherObjectByID(item.teacher_id);
  return teacherObj.teacher_info.image_url;
}

function getTeamim(item) {
  const oldTeamim = item.teamim;
  if (oldTeamim && Array.isArray(oldTeamim)) {
    oldTeamim.forEach(t => {
      t.audio_url = t.url;
      delete t.url;
    });
  } else if (oldTeamim) {
    oldTeamim.audio_url = oldTeamim.url;
    delete oldTeamim.url;
  }
  return oldTeamim || [];
}

function convertPerakim(perakim, transformed) {
  for (let i = 0; i < perakim.length; i++) {
    const p = perakim[i];
    console.log('transforming: ', p.book_name, p.perek_id)
    const partsBreakdown = p.parts_breakdown || '';
    const parts = Array.isArray(partsBreakdown) ? partsBreakdown : partsBreakdown.split(',');
    const loopCounter = parts.length || 1;
    for (let j = 0; j < loopCounter; j++) {
      const part = parts[j];
      const model = getNewModelTemplate();
      model.division = getDivision(p);
      model.division_name = null;
      model.division_title = getDivisionTitle(p);
      model.division_sponsor = null;
      model.division_sequence = getDivisionSequence(p);
      model.segment = null;
      model.segment_name = null;
      model.segment_title = null;
      model.segment_sponsor = null;
      model.segment_sequence = null;
      model.section = getSection(p);
      model.section_name = null;
      model.section_title = getSectionTitle(p);
      model.section_sponsor = getSectionSponsor(p);
      model.section_sequence = getSectionSequence(p);
      model.unit = getUnit(p);
      model.unit_name = null;
      model.unit_title = getUnitTitle(p);
      model.unit_sponsor = getUnitSponsor(p);
      model.unit_sequence = null;
      model.part = getPart(p, part);
      model.part_name = null;
      model.part_title = getPartTitle(p, part);
      model.part_sponsor = null;
      model.part_sequence = null;
      model.series = getSeries(p);
      model.series_name = null;
      model.series_title = null;
      model.series_sponsor = null;
      model.series_sequence = null;

      model.start_chapter = getStartChapter(p, part);
      model.start_verse = getStartVerse(p, part);
      model.end_chapter = getEndChapter(p, part);
      model.end_verse = getEndVerse(p, part);

      model.audio_url = getAudioURL(p, part);

      model.teacher_title = getTeacherTitle(p);
      model.teacher_fname = getTeacherFirstName(p);
      model.teacher_mname = getTeacherMiddleName(p);
      model.teacher_lname = getTeacherLastName(p);
      model.teacher_short_bio = getTeacherShortBio(p);
      model.teacher_long_bio = getTeacherLongBio(p);
      model.teacher_image_url = getTeacherPicture(p);

      model.teamim = getTeamim(p);

      transformed.push(model);
    }
  }
}

function main(p) {
  // const nachPerakim = getNachPerakim(p);
  // const torahPerakim = getTorahPerakim(p);
  // assert(p.length === nachPerakim.length + torahPerakim.length);
  const t = []
  convertPerakim(p, t);
  fs.writeFileSync('output.json', JSON.stringify(t));
}

main(perakim);
