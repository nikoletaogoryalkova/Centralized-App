import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';

import Dropzone from 'react-dropzone';

import { Config } from '../../../config';

export default class CreateListingPhotos extends React.Component {
    constructor(props) {
        super(props);
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
                        onDrop={this.props.onImageDrop}>
                        <p>Drop files to upload</p>
                        <button className="btn btn-primary">Choose file</button>
                    </Dropzone>

                    <div className="pictures-preview col-md-12">
                        {this.props.values.uploadedFilesUrls.length === 0 ? null :
                            this.props.values.uploadedFilesUrls.map((imageUrl, i) =>
                                <div key={i} className="uploaded-small-picture col-md-4">
                                    <button onClick={this.props.removePhoto} className="close">
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