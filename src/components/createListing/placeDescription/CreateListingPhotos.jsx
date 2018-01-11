import React from 'react';
import { NavLink } from 'react-router-dom';

import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';

import Dropzone from 'react-dropzone';

import { Config } from '../../../config';

export default class CreateListingPhotos extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: null
        }

        this.onDropRejected = this.onDropRejected.bind(this);
    }
    onDropRejected() {
        this.setState({error: 'Maximum file upload size is 10MB. Supported media formats are jpg, jpeg, png'})
    }

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
                                    maxSize={10485760}
                                    accept="image/jpg, image/jpeg, image/png"
                                    onDrop={this.props.onImageDrop}
                                    onDropRejected={this.onDropRejected}>
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
                                {this.state.error ? <div className="error">{this.state.error}</div> : null}
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
                        <NavLink to="/profile/listings/create/houserules" className="btn btn-primary btn-next" id="btn-continue">Next</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}