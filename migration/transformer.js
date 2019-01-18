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

    segment: '',
    segment_name: '',
    segment_title: '',

    section: '',
    section_name: '',
    section_title: '',

    unit: '',
    unit_name: '',
    unit_title: '',

    part: '',
    part_name: '',
    part_title: '',

    series: '',
    series_name: '',

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

function getSection(item) {
  return item.book_name;
}

function getSectionName(item) {
  return item.book_name_pretty_eng;
}

function getUnit(item) {
  return item.perek_id;
}

function getUnitName(item) {
  return item.perek_id;
}

function getPart(item, part) {
  return part === '' ? null : part;
}

function getPartName(item, part) {
  return part === '' ? null : part;
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
      model.division_name = getDivisionTitle(p);
      model.division_title = null;
      model.segment = null;
      model.segment_name = null;
      model.segment_title = null;
      model.section = getSection(p);
      model.section_name = getSectionName(p);
      model.section_title = null;
      model.unit = getUnit(p);
      model.unit_name = getUnitName(p);
      model.unit_title = null;
      model.part = getPart(p, part);
      model.part_name = getPartName(p, part);
      model.part_title = null;

      model.series = getSeries(p);
      model.series_name = null;

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
