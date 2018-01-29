import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';
import NavCreateListing from '../NavCreateListing';

import Dropzone from 'react-dropzone';

import { Config } from '../../../config';

export default function CreateListingPhotos(props) {
    return (
        <div>
            <NavCreateListing progress='66%' />
            <NotificationContainer />
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
                                maxSize={10485760}
                                accept="image/jpg, image/jpeg, image/png"
                                onDrop={props.onImageDrop}
                                onDropRejected={onDropRejected}>
                                <p>Drop files to upload</p>
                                <button className="btn btn-primary">Choose file</button>
                            </Dropzone>

                            <div className="pictures-preview col-md-12">
                                {props.values.uploadedFilesUrls.length === 0 ? null :
                                    props.values.uploadedFilesUrls.map((imageUrl, i) =>
                                        <div key={i} className="uploaded-small-picture col-md-4">
                                            <button onClick={props.removePhoto} className="close">
                                                <img className="inactiveLink" src={Config.getValue('basePath') + 'images/icon-delete.png'} alt="remove" />
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
                    <NavLink to="/profile/listings/create/description" className="btn btn-default btn-back" id="btn-continue">
                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                        &nbsp;Back</NavLink>
                    {validateInput(props.values) 
                        ? <NavLink to="/profile/listings/create/houserules" className="btn btn-primary btn-next" id="btn-continue" onClick={() => { props.updateProgress(7); }}>Next</NavLink>
                        : <button className="btn btn-primary btn-next disabled" onClick={() => showErrors(props.values)}>Next</button>
                    }
                </div>
            </div>
        </div>
    );
}

function onDropRejected() {
    NotificationManager.warning('Maximum file upload size is 10MB. Supported media formats are jpg, jpeg, png');
}

function validateInput(values) {
    const { uploadedFilesUrls } = values;
    if (uploadedFilesUrls.length < 1) {
        return false;
    }

    return true;
}

function showErrors(values) {
    const { uploadedFilesUrls } = values;
    if (uploadedFilesUrls.length < 6) {
        NotificationManager.warning('At least 1 picture is required');
    }
}

CreateListingPhotos.propTypes = {
    values: PropTypes.any,
    onChange: PropTypes.func,
    onImageDrop: PropTypes.func,
    removePhoto: PropTypes.func,
    updateProgress: PropTypes.func,
};