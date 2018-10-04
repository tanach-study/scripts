require('dotenv').config({ silent: true });
const path = require('path');
const fse = require('fs-extra');

const { PATH_TO_DATA } = process.env;

const perakimNach = require(path.join(PATH_TO_DATA, 'migration/perakim/perakim.json'));
const sefarimNach = require(path.join(PATH_TO_DATA, 'migration/sefarim/sefarim.json'));
const teachers = require(path.join(PATH_TO_DATA, 'migration/teachers/allTeachers.json'));
const videos = require(path.join(PATH_TO_DATA, 'migration/videos/videos.json'));

