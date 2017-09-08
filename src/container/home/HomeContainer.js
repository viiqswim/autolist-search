import React from 'react';
import HomePageSearchBox from './../../components/home/HomePageSearchBox';
import { withRouter } from 'react-router';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);

        this.state = {
            searchQuery: ''
        };
    }

    onSearchQueryChange(event) {
        const searchQuery = event.target.value;

        this.setState({ searchQuery });
    }

    onSearchClick() {
        this.goToSearchPage();
    }

    handleSearchKeyPress(event) {
        if (event.charCode === 13) {
            // pressed enter
            this.goToSearchPage();
        }
    }

    goToSearchPage() {
        this.props.history.push({
            pathname: `/search/${this.state.searchQuery}`,
        });
    }

    render() {
        return (
            <div>
                <HomePageSearchBox
                    onSearchQueryChange={this.onSearchQueryChange}
                    onSearchClick={this.onSearchClick}
                    handleSearchKeyPress={this.handleSearchKeyPress}
                />
            </div>
        );
    }
}

export default withRouter(HomeContainer);
