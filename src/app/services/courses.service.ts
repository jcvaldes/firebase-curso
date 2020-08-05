import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../model/course';
import { map, first, take, reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) { }
  loadAllCourses(): Observable<Course[]> {
    return this.db.collection('courses',
                              ref => ref.orderBy('seqNo')
                                        // .where('categories', 'array-contains', 'BEGINNER')

                                        // .where('seqNo', '>', 0)
                                        // .where('seqNo', '<=', 4)
                                          // .startAt(0)
                                          // .startAfter(0)
                                          // .endAt(3)

                             )
    .snapshotChanges()
    .pipe(
      map(snaps => {
        return snaps.map(snap => {
          return <Course>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as {}
          };
        });
      }), first()); // o take(1)
  }
}
