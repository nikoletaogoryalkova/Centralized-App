import React from 'react';
import NavMain from './NavMain';
import NavLocalization from './NavLocalization';
import NavProfile from './NavProfile';

export default class ProfileHeader extends React.Component {
    render() {
        return(
            <div>
                <NavMain />
                <NavLocalization />
                <NavProfile />
             </div>        
        )
    }
}