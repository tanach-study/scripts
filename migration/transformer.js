#!/usr/bin/env node
const assert = require('assert');
const perakim = require('./perakim.json');

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

function getPart(item) {
  return item.parts_breakdown;
}

function getPartName(item) {
  return item.key;
}


function convertPerakim(np) {
  for (let i = 0; i < np.length; i++) {
    const p = np[i];
    const transformed = [];
    const partsBreakdown = p.parts_breakdown;
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
      model.part = getPart(p);
      model.part_name = getPartName(p);
      model.part_title = null;


      transformed.push(model);
    }
  }
}

function main(p) {
  const nachPerakim = getNachPerakim(p);
  const torahPerakim = getTorahPerakim(p);
  assert(p.length === nachPerakim.length + torahPerakim.length);
  convertPerakim(nachPerakim);
}

main(perakim);
