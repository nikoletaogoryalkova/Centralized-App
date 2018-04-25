import PropTypes from 'prop-types';
import React from 'react';
import DeletionModal from '../../common/modals/DeletionModal';
import filterListings from '../../../actions/filterListings';

export default class ListingRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleting: false,
            deletingId: -1,
            deletingName: '',
            isPublishing: false
        };

        this.onHide = this.onHide.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.filterListings = filterListings.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({ isPublishing: false });
    }

    onHide() {
        this.setState(
            {
                isDeleting: false,
                deletingId: -1,
                deletingName: ''
            }
        );
    }

    onOpen(id, name) {
        this.setState(
            {
                isDeleting: true,
                deletingId: id,
                deletingName: name
            }
        );
    }

    render() {
        return (
            <div key={this.props.listing.id} className="row reservation-box">
                
                {/* TODO: Extract modal to parent page, as it now creates modal for each row (performance hit) */}
                <DeletionModal
                    deletingName={this.state.deletingName}
                    filterListings={this.filterListings}
                    isDeleting={this.state.isDeleting}
                    deletingId={this.state.deletingId}
                    onHide={this.onHide}
                    onOpen={this.onOpen}
                />
                <div className="col-md-12">
                    <div className="col-md-1">
                        <div className="reservation-image-box">
                            <span className="session-nav-user-thumb"><img src={this.props.listing.thumbnail}
                                alt="listing-thumbnail" /></span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <span><a href={`/homes/listings/${this.props.listing.id}`}>{this.props.listing.name}</a></span>
                    </div>
                    <div className="col-md-2">
                        <span>{this.props.listing.defaultDailyPrice}</span>
                    </div>
                    <div className="col-md-3">
                        {this.state.isPublishing ?
                            <div className="loader" style={{ width: 110 }}></div> :
                            <div><a className={this.props.actionClass}
                                onClick={() => {
                                    this.setState({ isPublishing: true });
                                    this.props.updateListingStatus(this.props.listing.id);
                                }}>{this.props.action}</a>
                                &nbsp;
                            {this.props.canDelete &&
                                    <a className="btn btn-danger"
                                        onClick={() => this.onOpen(this.props.listing.id, this.props.listing.name)}>
                                        Delete
                                    </a>
                            }
                            </div>
                        }
                    </div>
                    <div className="col-md-2">
                        <a className="btn btn-info" onClick={() => this.props.openModal(this.props.listing.id)}>Contact
                            host</a>
                    </div>
                </div>
            </div>
        );
    }
}

ListingRow.propTypes = {
    listing: PropTypes.object,
    canDelete: PropTypes.bool,
    updateListingStatus: PropTypes.func,
    action: PropTypes.string,
    actionClass: PropTypes.string,
    contactHost: PropTypes.func,
    openModal: PropTypes.func
};