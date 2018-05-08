import React from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PlaceDescriptionAside from '../aside/PlaceDescriptionAside';
import ListingCrudNav from '../navigation/ListingCrudNav';
import FooterNav from '../navigation/FooterNav';

import Dropzone from 'react-dropzone';

import { Config } from '../../../config';

function ListingPhotos(props) {
  const SortableItem = SortableElement(({ value, i }) =>
    <div className="uploaded-small-picture col-md-4" >
      <button onClick={props.removePhoto} className="close">
        <img className="inactiveLink" src={Config.getValue('basePath') + 'images/icon-delete.png'} alt="remove" />
      </button>
      <img draggable={false} src={value} height={200} alt={`uploaded-${i}`} />
    </div>
  );

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className="col-md-12">
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={Config.getValue('imgHost') + value} />
        ))}
      </div>
    );
  });

  const next = validateInput(props.values) ? props.next : props.location.pathname;
  const handleClickNext = validateInput(props.values)
    ? () => { props.updateProgress(1); }
    : () => { showErrors(props.values); };

  return (
    <div>
      <ListingCrudNav progress='66%' />
      <div className="container">
        <div className="row">
          <div className="listings create">
            <div className="col-md-3">
              <PlaceDescriptionAside routes={props.routes} />
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
                {props.values.uploadedFilesUrls.length === 0 
                  ? null 
                  : <SortableList 
                    axis={'xy'} 
                    lockToContainerEdges={true} 
                    items={props.values.uploadedFilesUrls} 
                    onSortEnd={props.onSortEnd} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNav next={next} prev={props.prev} handleClickNext={handleClickNext} step={7} />
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
  if (uploadedFilesUrls.length < 1) {
    NotificationManager.warning('At least 1 picture is required');
  }
}

ListingPhotos.propTypes = {
  values: PropTypes.any,
  onChange: PropTypes.func,
  onImageDrop: PropTypes.func,
  removePhoto: PropTypes.func,
  updateProgress: PropTypes.func,
  prev: PropTypes.string,
  next: PropTypes.string,
  routes: PropTypes.object,
  onSortEnd: PropTypes.any,

  // Router props
  location: PropTypes.object,
};

export default withRouter(ListingPhotos);