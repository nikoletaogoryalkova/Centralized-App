import React from 'react';
import {
    SearchkitManager, SearchkitProvider, SearchBox, Hits
} from "searchkit";


const searchkit = new SearchkitManager("http://localhost:8080/api/listings/");
export default class Property extends React.Component {
    render() {
        return (
            <SearchkitProvider searchkit={searchkit}>
                <div>
                    <SearchBox
                        searchOnChange={true}
                        queryOptions={{ analyzer: "standard" }}
                        queryFields={["title^5", "languages", "text"]} />
                    <Hits />
                </div>
            </SearchkitProvider>
        );
    }
}