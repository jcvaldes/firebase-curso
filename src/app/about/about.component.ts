import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Course } from '../model/course';
import { AngularFirestore } from '@angular/fire/firestore';

const config = {
  apiKey: 'AIzaSyDDLZQkoJ2w24NR180XdMxZGF3-wEPiIf0',
  authDomain: 'fir-course-832e0.firebaseapp.com',
  databaseURL: 'https://fir-course-832e0.firebaseio.com',
  projectId: 'fir-course-832e0',
  storageBucket: 'fir-course-832e0.appspot.com',
  messagingSenderId: '395720735093',
  appId: '1:395720735093:web:cd3ea3debf38372419bb3c'
};
firebase.initializeApp(config);
const db = firebase.firestore();

// const settings = {timestampsInSnapshots: true}
// db.settings(settings);

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    // trae una coleccion
    // db.collection('courses')
    // .get().then(snaps => console.log(snaps));
    // db.collection('courses')
    //   .get().then(snaps => {
    //     const courses: Course[] = snaps.docs.map(snap => {
    //       return <Course>{
    //         id: snap.id,
    //         ...snap.data()
    //       };
    //     });
    //     console.log(courses);
    //   });

    // trae un documento
    // db.doc('courses/6sfCxFLXsm7SLTuit7VG')
    //   .get().then(snap => console.log(snap.data()));


    // me trae solo el documento que modifique a diferencia de valueChanges y snapshotChanges
    this.db.collection('courses').stateChanges().subscribe(snaps => {
      console.log(snaps);
    });
  }

}
