const PATH_TO_MONGO_EXPORT_JSON = '';
const PATH_TO_TEACHERS_WITH_ID_JSON = ''

const fs = require('fs');

const rawData = require(PATH_TO_MONGO_EXPORT_JSON);
const teachers = require(PATH_TO_TEACHERS_WITH_ID_JSON);

const teacherDict = {};
const output = ['BEGIN;'];

function sanitize(str) {
  return str.replace('\'', '\'\'');
}

for (let i = 0; i < teachers.length; i++) {
  const { title, fname, mname, lname } = teachers[i];
  const slug = mname ? `${title}-${fname}-${mname}-${lname}` : `${title}-${fname}-${lname}`;
  const teacherSlug = slug.replace(/\./g, '').toLowerCase();
  // console.log(teacherSlug, teachers[i].id)
  teacherDict[teacherSlug] = teachers[i].id
}

for (let i = 0; i < rawData.length; i++) {
  let teacherString = '';
  const { teacher_title: title, teacher_fname: fname, teacher_mname: mname, teacher_lname: lname } = rawData[i];
  const { division, segment, section, unit, part } = rawData[i];
  const slug = mname ? `${title}-${fname}-${mname}-${lname}` : `${title}-${fname}-${lname}`;
  const teacherSlug = slug.replace(/\./g, '').toLowerCase();
  const selector = `${division}-${segment}-${section}-${unit}-${part}`;
  const teacherID = teacherDict[teacherSlug]
  // console.log(selector, teacherSlug)
  const conditions = [];

  if (division) {
    conditions.push(`division = '${sanitize(division)}'`);
  }

  if (segment) {
    conditions.push(`segment = '${sanitize(segment)}'`);
  }

  if (section) {
    conditions.push(`section = '${sanitize(section)}'`);
  }

  if (unit) {
    conditions.push(`unit = '${sanitize(unit)}'`);
  }

  if (part) {
    conditions.push(`part = '${sanitize(part)}'`);
  }

  const conditionString = conditions.join(' AND ');
  const out = `UPDATE tssite_class SET teacher_id = ${teacherID} WHERE ${conditionString};`;

  // if we have a teacher's last name, we have a class that is not null
  if (lname) {
    // console.log(selector, slug, teacherID)
    output.push(out);
    // console.log(out)
  }
}

output.push('COMMIT;');

fs.writeFileSync('out.sql', output.join('\n'));
