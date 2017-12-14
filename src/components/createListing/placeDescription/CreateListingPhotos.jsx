import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';

import Dropzone from 'react-dropzone';
import request from 'superagent';
import update from 'react-addons-update';

import { Config } from '../../../config';

const LOCKCHAIN_UPLOAD_URL = 'http://localhost:8080/images/upload';


export default class CreateListingPhotos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFiles: [],
            uploadedFilesUrls: []
        };

        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
    }

    onImageDrop(files) {
        this.handleImageUpload(files)

        this.setState({
            uploadedFiles: files
        });
    }

    handleImageUpload(files) {
        files.forEach((file) => {
            let upload = request.post(LOCKCHAIN_UPLOAD_URL)
                .field('image', file);


            upload.end((err, response) => {
                if (err) {
                    console.error(err);
                }
                if (response.body.secure_url !== '') {
                    console.log(response);
                    this.setState(previousState => ({
                        uploadedFilesUrls: [...previousState.uploadedFilesUrls, response.body.original]
                    }));
                }
            });
        });
    }

    removePhoto(e) {
        e.preventDefault();

        let imageUrl = e.target.nextSibling;

        if (imageUrl.src !== null) {
            let indexOfImage = this.state.uploadedFilesUrls.indexOf(imageUrl.getAttribute('src'));

            this.setState({
                uploadedFilesUrls: update(this.state.uploadedFilesUrls, { $splice: [[indexOfImage, 1]] })
            });
        }
    }

    render() {
        return (
            <div>
                <CreateListingPlaceDescriptionAside />
                <div className="reservation-hotel-review-room col-md-9">
                    <h2>Upload photos of your place</h2>
                    <hr />

                    <Dropzone
                        className="pictures-upload"
                        multiple={true}
                        accept="image/*"
                        onDrop={this.onImageDrop}>
                        <p>Drop files to upload</p>
                        <button className="btn btn-primary">Choose file</button>
                    </Dropzone>

                    <div className="pictures-preview col-md-12">
                        {this.state.uploadedFilesUrls.length === 0 ? null :
                            this.state.uploadedFilesUrls.map((imageUrl, i) =>
                                <div key={i} className="uploaded-small-picture col-md-4">
                                    <button onClick={this.removePhoto} className="close">
                                        <img className="inactiveLink" src={Config.getValue("basePath") + "images/icon-delete.png"} />
                                    </button>
                                    <img src={imageUrl} height={200} />
                                </div>
                            )
                        }
                    </div>
                </div>
                <br />
                <NavLink to="/listings/create/description" className="btn btn-default" id="btn-continue">Back</NavLink>
                <NavLink to="/listings/create/houserules" className="btn btn-primary" id="btn-continue">Continue</NavLink>
            </div>
        );
    }
}