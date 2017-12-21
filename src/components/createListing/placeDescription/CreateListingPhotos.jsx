import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';

import Dropzone from 'react-dropzone';

import { Config } from '../../../config';

export default class CreateListingPhotos extends React.Component {

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="listings create">
                            <div className="col-md-3">
                                <CreateListingPlaceDescriptionAside />
                            </div>
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
                                                    <img className="inactiveLink" src={Config.getValue("basePath") + "images/icon-delete.png"} alt="remove" />
                                                </button>
                                                <img src={imageUrl} height={200} alt={`uploaded-${i}`} />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navigation col-md-12">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-7">
                        <NavLink to="/listings/create/description" className="btn btn-default btn-back" id="btn-continue">
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                            &nbsp;Back</NavLink>
                        <NavLink to="/listings/create/houserules" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}