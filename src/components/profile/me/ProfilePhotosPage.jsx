import React from 'react';

import ProfileHeader from '../ProfileHeader';
import Footer from '../../Footer';
import ProfileNav from './ProfileNav';
import { Config } from '../../../config';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import update from 'react-addons-update';
import { getCurrentLoggedInUserInfo } from '../../../requester';

const host = Config.getValue("apiHost");
const LOCKCHAIN_UPLOAD_URL = `${host}users/me/images/upload`;

export default class ProfilePhotosPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFiles: [],
            uploadedFilesThumbUrls: [],
            loading: true
        }

        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    componentDidMount() {
        getCurrentLoggedInUserInfo().then((data) => {
            this.setState({ uploadedFilesThumbUrls: [data.image], loading: false });
        });
    }

    onImageDrop(files) {
        this.handleImageUpload(files)

        this.setState({
            uploadedFiles: files
        });
    }

    handleImageUpload(files) {
        files.forEach((file) => {
            let upload = request.post(LOCKCHAIN_UPLOAD_URL)
                .field('image', file)
                .set('Authorization', localStorage[Config.getValue("domainPrefix") + ".auth.lockchain"]);


            upload.end((err, response) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(response.body.thumbnail);
                    this.setState({
                        uploadedFilesThumbUrls: [response.body.thumbnail]
                    });
                }
            });
        });


    }

    render() {
        if(this.state.loading) {
            return <div className="loader"></div>
        }

        return (
            <div>
                <ProfileHeader />
                <section id="profile-photos">
                    <div className="container">
                        <div className="row">
                            <div className="after-header" />
                            <div className="col-md-3">
                                <ProfileNav />
                            </div>
                            <div className="col-md-8">
                                <div className="pictures-preview col-md-12">
                                    {this.state.uploadedFilesThumbUrls.length === 0 ? null :
                                        this.state.uploadedFilesThumbUrls.map((imageUrl, i) =>
                                            <div key={i} className="uploaded-small-picture col-md-4">
                                                <img src={imageUrl} height={200} alt={`uploaded-${i}`} />
                                            </div>
                                        )
                                    }
                                    <Dropzone
                                        className="pictures-upload col-md-4"
                                        multiple={false}
                                        accept="image/*"
                                        onDrop={this.onImageDrop}>
                                        <p>Upload a file from your computer</p>
                                    </Dropzone>
                                </div>
                            </div>
                            <div className="before-footer clear-both" />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}