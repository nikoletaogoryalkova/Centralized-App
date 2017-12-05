import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header';
import HotelInfo from './HotelInfo';
import Footer from '../Footer';
import { getPropertyById } from '../../requester';

class PropertyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    };

    componentDidMount() {
        getPropertyById(this.props.match.params.id).then(res => {
            this.setState({ data: res });
        });
    };

    render() {

        if (this.state.data === null) {
            return <div>Loading...</div>;
        }
        return (
            <div key={1}>
                <Header />
                <section className="hotel-gallery">
                    <div className="hotel-gallery-bgr" style={{'backgroundImage': 'url(' + this.state.data.pictures[0].original + ')'}}>
                        <div className="container">
                            <div className="hotel-gallery-social-button">
                                <a className="btn btn-social btn-dark-blue">
                                    <span>Share</span>
                                </a>
                                <a className="btn btn-save btn-dark-blue">
                                    <span>Save</span>
                                </a>
                            </div>
                            <a className="btn btn-primary btn-gallery">Open Gallery</a>
                        </div>
                    </div>
                </section>

                <nav id="hotel-nav">
                    <div className="container">
                        <ul className="nav navbar-nav">

                            <li>
                                <a href="#overview">Overview</a>
                            </li>
                            <li>
                                <a href="#facilities">Facilities</a>
                            </li>
                            <li>
                                <a href="#room-types">Room types</a>
                            </li>
                            <li>
                                <a href="#reviews">User Reviews</a>
                            </li>
                            <li>
                                <a href="#location">Location</a>
                            </li>

                        </ul>


                    </div>
                </nav>

                <HotelInfo data={this.state.data}/>
                <Footer />
            </div>
        );
    }
}

export default withRouter(PropertyPage)