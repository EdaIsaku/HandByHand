// import React from "react";
// /* global google */

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.autocompleteInput = React.createRef();
//     this.autocomplete = null;
//     this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
//   }

//   componentDidMount() {
//     this.autocomplete = new google.maps.places.Autocomplete(
//       this.autocompleteInput.current,
//       { types: ["geocode"] }
//     );

//     this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
//   }

//   handlePlaceChanged() {
//     const place = this.autocomplete.getPlace();
//     this.props.onPlaceLoaded(place);
//   }

//   render() {
//     return (
//       <input
//         ref={this.autocompleteInput}
//         id="autocomplete"
//         placeholder="Enter your address"
//         type="text"
//         className="search-box"
//       ></input>
//     );
//   }
// }

// export default SearchBar;

import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Component = () => (
  <div>
    <GooglePlacesAutocomplete />
  </div>
);

export default Component;

//
