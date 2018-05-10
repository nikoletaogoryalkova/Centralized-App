import React from 'react';
import PropTypes from 'prop-types';

export default function ListingCrudNav(props) {
  return (
    <div className="admin_dashboard">
      <section className="step-by-step">
        <ul className="nav navbar-nav nav_dash_menu" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', float: 'none', width: '100%', textAlign: 'center' }}>
          <p to="/listings/create/landing" style={{ float: 'none', display: 'inline-block', color: 'white', fontSize: '20px', marginBottom: '0', width: '33%' }}>Step 1: The Basics</p>
          <p to="/listings/create/title" style={{ float: 'none', display: 'inline-block', color: 'white', fontSize: '20px', marginBottom: '0', width: '33%' }}>Step 2: Place description</p>
          <p to="/listings/create/houserules" style={{ float: 'none', display: 'inline-block', color: 'white', fontSize: '20px', marginBottom: '0', width: '33%' }}>Step 3: Guest Settings</p>
        </ul>
        <div className="progress-bar-outline" style={{ marginBottom: '10px' }}>
          <div className="progress-bar" style={{ height: '5px', width: props.progress, background: '#d77961' }}></div>
        </div>
      </section>
    </div>
  );
}

ListingCrudNav.propTypes = {
  progress: PropTypes.string,
};