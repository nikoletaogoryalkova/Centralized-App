import React from 'react';

export default class CreateListingTitle extends React.Component {
    render() {
        return (
            <div className="reservation-hotel-review-room">
                <h2>Give your place a name</h2>
                <hr />

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Listing title" />
                        </div>
                    </div>

                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}