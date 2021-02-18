import React, { Component } from 'react'

import firebase from 'firebase/app';
import 'firebase/functions';

class FoodSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerms: "",
    }
  }
  
  clearSearch = () => {
    // timeout for better css transitions (transition: 0.3s @.RecipeCard__Search)
    setTimeout( () => {
      this.setState({searchTerms: ""})
    }, 300)
  }
  
  // Searches after a delay
  delayedSearch = (searchTerm) => {
    this.setState({ searchTerms: searchTerm });
    // dont search with user empties input
    if (searchTerm === "") return;
    if (this.timeoutID !== undefined) clearTimeout(this.timeoutID);
    // while typing, reset the timer. After 1 second call firebase function to search
    this.timeoutID = setTimeout(() => {
      this.instantSearch(searchTerm)
    }, 400);
  }

  instantSearch = (searchTerm) => {
    const search = firebase.app().functions('us-east4').httpsCallable('searchInstantNX');
    search({ search: searchTerm })
      .then(result => this.props.onResult(result.data))
      .catch(e => console.error(e))
  }

  render = () => {
    return (
      <input
        type="text"
        className={this.props.className}
        placeholder="Search Food Here..."
        onChange={e => this.delayedSearch(e.target.value)}
        value={this.state.searchTerms}
      />
    )
  }
}

export default FoodSearch;