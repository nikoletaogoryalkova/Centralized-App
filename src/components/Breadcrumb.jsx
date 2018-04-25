import React from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
  render() {
    return (
      <section id="breadcrumb-bar">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <div className="breadcrumb-arrow"></div>
          <div className="search-term">Listings</div>
        </div>
      </section>
    );
  }
}