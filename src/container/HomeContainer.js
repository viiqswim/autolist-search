import React from 'react';
import HomePageSearchBox from './../components/HomePageSearchBox';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);

        this.state = {
            searchQuery: ''
        };
    }

    onSearchQueryChange(event) {
        const searchQuery = event.target.value;

        this.setState({ searchQuery });
    }

    render() {
        console.log(this.state.searchQuery);
        return (
            <div>
                <HomePageSearchBox onSearchQueryChange={this.onSearchQueryChange} />
            </div>
        );
    }
}

export default HomeContainer;
