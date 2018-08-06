import React, { Component } from 'react';

class Sidebar extends Component {
   state = {
      query: '',
      showingPlaces: this.props.places,
   }

   updateQuery = (query) => {
      this.setState({ query: query.trim() }); //trim() does not allow making space

      const showingPlaces = this.props.places.filter(place => {
         const placeNorm = place.name.toLowerCase()
         const queryNorm = query.toLowerCase()
         
         return (
            placeNorm.indexOf(queryNorm) !== -1 && placeNorm.startsWith(queryNorm)
         );
      });
      this.setState({ showingPlaces });
      this.props.filterMarkers(showingPlaces);
   }

   render() {
      return (
            <section>
               <input 
                  className='search'
                  type='text' role='search'
                  placeholder='Find an amazing place!'
                  input={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
               />
               <ul className='list'>
                  {this.state.showingPlaces.map(place => (
                    <li
                     className='list-item'
                     tabIndex={0}
                     key={place.id}
                     onClick={() => this.props.showInfoWindow(place)}
                    >{place.name}</li> 
                  ))}
               </ul>
            </section>
      )
   }
}

export default Sidebar;