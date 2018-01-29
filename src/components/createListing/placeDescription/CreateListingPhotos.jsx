import 'react-anything-sortable/sortable.css';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { Config } from '../../../config';
import CreateListingPlaceDescriptionAside from './CreateListingPlaceDescriptionAside';
import DragSortableList from 'react-drag-sortable';
import Dropzone from 'react-dropzone';
import NavCreateListing from '../NavCreateListing';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Sortable from 'react-anything-sortable';

export default class CreateListingPhotos extends React.Component {
    constructor(props) {
        super(props);

        this.onDropRejected = this.onDropRejected.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.showErrors = this.showErrors.bind(this);
    }

    onDropRejected() {
        NotificationManager.warning('Maximum file upload size is 10MB. Supported media formats are jpg, jpeg, png');
    }

    validateInput() {
        const { uploadedFilesUrls } = this.props.values;
        if (uploadedFilesUrls.length < 1) {
            return false;
        }

        return true;
    }

    showErrors() {
        const { uploadedFilesUrls } = this.props.values;
        if (uploadedFilesUrls.length < 6) {
            NotificationManager.warning('At least 1 picture is required');
        }
    }

    render() {
        var listGrid = [
            { content: (<div>test1</div>) },
            { content: (<div>test2</div>) },
            { content: (<div>test3</div>) },
            { content: (<div>test4</div>) },
            { content: (<div>test5</div>) },
            { content: (<div>test6</div>) },
            { content: (<div>test7</div>) },
            { content: (<div>test8</div>) },
            { content: (<div>test9</div>) }
        ];

        const SortableItem = SortableElement(({ value, i }) =>
            <div className="uploaded-small-picture col-md-4" >
                <button onClick={this.props.removePhoto} className="close">
                    <img className="inactiveLink" src={Config.getValue('basePath') + 'images/icon-delete.png'} alt="remove" />
                </button>
                <img draggable={false} src={value} height={200} alt={`uploaded-${i}`} />
            </div>
        );

        const SortableList = SortableContainer(({ items }) => {
            return (
                <div>
                    {items.map((value, index) => (
                        <SortableItem key={`item-${index}`} index={index} value={value} />
                    ))}
                </div>
            );
        });

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
                                    onDrop={this.props.onImageDrop}
                                    onDropRejected={this.onDropRejected}>
                                    <p>Drop files to upload</p>
                                    <button className="btn btn-primary">Choose file</button>
                                </Dropzone>

                                <div className="pictures-preview col-md-12">
                                    <div className="dynamic-demo">
                                        {/* <Sortable onSort={this.props.handleSort} containment className="containment-demo">
                                            {this.props.values.uploadedFilesUrls.length === 0 ? null :
                                                this.props.values.uploadedFilesUrls.map((imageUrl, i) =>
                                                    <div key={i} className="uploaded-small-picture col-md-4 ui-sortable-item" >
                                                        <button onClick={this.props.removePhoto} className="close">
                                                            <img className="inactiveLink" src={Config.getValue('basePath') + 'images/icon-delete.png'} alt="remove" />
                                                        </button>
                                                        <img className="img-item" draggable={false} src={imageUrl} sortData={imageUrl} height={200} alt={`uploaded-${i}`} />
                                                    </div>
                                                )
                                            }
                                        </Sortable> */}

                                        {/* <Sortable onSort={this.props.handleSort}>
                                            {this.props.values.uploadedFilesUrls.length === 0 ? null :
                                                this.props.values.uploadedFilesUrls.map((imageUrl, i) =>
                                                    <img key={i} className="img-item" draggable={false} src={imageUrl} sortData={imageUrl} height={200} alt={`uploaded-${i}`} />
                                                )
                                            }
                                        </Sortable> */}

                                        {this.props.values.uploadedFilesUrls.length === 0 ? null : <SortableList axis={'x'} items={this.props.values.uploadedFilesUrls} onSortEnd={this.props.onSortEnd} />}
                                    </div>
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
                        {this.validateInput()
                            ? <NavLink to="/profile/listings/create/houserules" className="btn btn-primary btn-next" id="btn-continue" onClick={(e) => { this.props.updateProgress(7); }}>Next</NavLink>
                            : <button className="btn btn-primary btn-next disabled" onClick={this.showErrors}>Next</button>
                        }
                    </div>
                </div>
            </div >
        );
    }
}