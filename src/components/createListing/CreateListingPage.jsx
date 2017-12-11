import React from 'react';

import NavMain from './NavMain';
import CreateListing from './CreateListing';
import Footer from '../Footer';

export default class CreateListingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            process: 1,
            step: 1
        }
    }

    render() {
        return (
            <div>
                <NavMain />
                <CreateListing />
                <Footer />
            </div>
        );
    }
}