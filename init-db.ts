
import { COURSES, findLessonsForCourse } from './db-data';

import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDDLZQkoJ2w24NR180XdMxZGF3-wEPiIf0',
  authDomain: 'fir-course-832e0.firebaseapp.com',
  databaseURL: 'https://fir-course-832e0.firebaseio.com',
  projectId: 'fir-course-832e0',
  storageBucket: 'fir-course-832e0.appspot.com',
  messagingSenderId: '395720735093',
  appId: '1:395720735093:web:cd3ea3debf38372419bb3c'
};

console.log('Uploading data to the database with the following config:\n');

console.log(JSON.stringify(config));

console.log('\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n');

const app = firebase.initializeApp(config);
const db = firebase.firestore();

main().then(r => console.log('Done.'));

async function uploadData() {
  const courses = await db.collection('courses');
  for (let course of Object.values(COURSES)) {
    const newCourse = removeId(course);
    const courseRef = await courses.add(newCourse);
    const lessons = await courseRef.collection('lessons');
    const courseLessons = findLessonsForCourse(course['id']);
    console.log(`Uploading course ${course['titles']['description']}`);
    for (const lesson of courseLessons) {
      const newLesson = removeId(lesson);
      await lessons.add(newLesson);
    }
  }
}

function removeId(data: any) {
  const newData: any = { ...data };
  delete newData.id;
  return newData;
}

async function main() {
  try {
    console.log('Start main...\n\n');
    await uploadData();
    console.log('\n\nClosing Application...');
    await app.delete();
  } catch (e) {
    console.log('Data upload failed, reason:', e, '\n\n');
  }
}

