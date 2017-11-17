import { Injectable } from '@angular/core';
import {AngularFire} from 'angularfire2';
import {AngularFireDatabase} from "angularfire2/database/database";
import {FirebaseListObservable} from "angularfire2/database/firebase_list_observable";
import * as firebase from 'firebase/app';

@Injectable()
export class UploadService {
    private basePath: string = '/uploads';
    private uploadTask: firebase.storage.UploadTask;
    uploads: FirebaseListObservable;
    private allowedImagePaths: string[] = [
        'avatar',
        'logo'
    ];

    constructor(
        private af: AngularFire,
        private db: AngularFireDatabase
    ) {}

    private validateImagePath(string: image_type) {
        return image_type !== null &&
            image_type.trim() !== '' &&
            this.allowedImagePaths.indexOf(image_type) > -1;
    }

    pushUpload(upload: Upload, string: image_type) {
        if (!this.validateImagePath(image_type)) {
            return false;
        }

        let storageRef = firebase.storage().ref();
        this.uploadTask = storageRef
            .child(`${this.basePath}/${image_type}/${upload.file.name}`)
            .put(upload.file);

        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>  {
                // upload in progress
                upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            (error) => {
                // upload failed
                console.log(error)
            },
            () => {
                // upload success
                upload.url = this.uploadTask.snapshot.downloadURL
                upload.name = upload.file.name
                this.saveFileData(upload)
            }
        );
    }

    private saveFileData(upload: Upload) {
        this.db.list(`${this.basePath}/`).push(upload);
    }
}
