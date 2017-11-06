const teachers = require('./teachers.json');
const videos = require('./videos.json');

const fs = require('fs');

const output = [];

teachers.forEach((teacher) => output.push(`${teacher.title} ${teacher.fname} ${teacher.mname} ${teacher.lname}`));
videos.forEach((video) => output.push(video.youtube_title));

fs.writeFileSync('./output.json', JSON.stringify(output));

console.log(output);
