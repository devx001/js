import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';

class FileUploadFirebase extends Component {

    constructor() {
        super();
        this.state = {
            uploadValue: 0,
            picture: ''
        }

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/photos/${file.name}`);
        const metadata = { contentType: file.type };
        const task = storageRef.put(file, metadata);

        task.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: progress,
            })
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    console.log('No state');
            }
        }.bind(this), function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    console.log("User doesn't have permission to access the object");
                    break;
                case 'storage/canceled':
                    console.log("User canceled the upload");
                    break;
                case 'storage/unknown':
                    console.log("Unknown error occurred, inspect error.serverResponse");
                    break;
                default:
                    console.log(error.message);
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                this.setState({
                    uploadValue: 100,
                    picture: downloadURL,
                })
            }.bind(this));
        }.bind(this));

    }

    render() {

        console.log(this.state.picture);
        return (
            <div>
                <div className="my-2">
                    <progress value={this.state.uploadValue} max="100">
                        {this.state.uploadValue} %
                    </progress>
                </div>

                <div className="custom-file">
                    <input type="file" className="custom-file-input" onChange={this.handleUpload} id="inputFileLoadFirebase" />
                    <label className="custom-file-label" htmlFor="inputFileLoadFirebase">Cargar Archivo</label>
                </div>
                <img width="320" src={this.state.picture} alt="prueb" />
            </div >
        )
    }

}

export default FileUploadFirebase;