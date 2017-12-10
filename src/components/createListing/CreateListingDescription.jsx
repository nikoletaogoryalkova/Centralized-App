import React from 'react';

export default class CreateListingDescription extends React.Component {
    render() {
        return (
            <div>
                <div className="reservation-hotel-review-room">
                    <h2>Tell your guests about your place</h2>
                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Summary</label>
                                <textarea rows={5} className="form-control" placeholder="Describe your place..."></textarea>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="reservation-hotel-review-room">
                    <h2>Tell your guests about the neighborhood</h2>
                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>The neighborhood (optional)</label>
                                <textarea rows={5} className="form-control" placeholder="Describe what's near by, how to get around, etc..."></textarea>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        )
    }
}