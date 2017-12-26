import React from 'react';

export default class CalendarAside extends React.Component {
    render() {
        return <div className="col-md-4">
            <div className="calendar-aside">
                <div className="col-md-12 calendar-aside-header">
                    <div className="col-md-10">
                        <h3 className="bold">Settings</h3>
                    </div>
                    <div className="col-md-2">
                        <button className="close" onClick={this.props.onCancel}>x</button>
                    </div>
                </div>
                <div className="col-md-12 calendar-aside-body">
                    <div className="col-md-12">
                        <h3 className="bold">Reservation Settings</h3>
                    </div>
                    <div className="col-md-12">
                        <label className="radio-label" style={this.props.available === "true" ? {backgroundColor: '#7BAAA2', color: '#FFFFFF'} : {}} htmlFor="available">Available<input type="radio" name="available" onChange={this.props.onChange} value="true" checked={this.props.available === "true"} id="available" />
                        </label>
                        <label className="radio-label" style={this.props.available === "false" ? {backgroundColor: '#7BAAA2', color: '#FFFFFF'} : {}} htmlFor="blocked">Blocked</label>
                        <input type="radio" name="available" onChange={this.props.onChange} value="false" checked={this.props.available === "false"} id="blocked" />
                    </div>

                    <div className="col-md-12">
                        <h3 className="bold">Price Setting</h3>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon bold">$</span>
                                <input type="number" className="form-control" name="price" onChange={this.props.onChange} value={this.props.price} />
                            </div>
                        </div>
                        <p>Adjust your price for the night</p>
                    </div>

                    <div className="col-md-12 controls">
                        <button className="btn btn-default btn-back bold" onClick={this.props.onCancel}>Cancel</button>
                        <button className="btn btn-primary btn-next bold" onClick={this.props.onSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    }
}