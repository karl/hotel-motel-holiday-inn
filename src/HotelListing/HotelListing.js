import React, { Component } from 'react';

const Hotel = ({ hotel }) => {
  return (
    <div>
      <h5>{hotel.Name}</h5>
      <img src={hotel.ThumbnailUrl} alt={hotel.Name} />
    </div>
  );
}

class HotelListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const result = await fetch('./hotels.json');
    const data = await result.json();
    this.setState({
      hotels: data.Establishments,
      loading: false,
    });
  }

  render() {
    const { hotels } = this.state;
    return (
      <div>
        {hotels.map(hotel => <Hotel key={hotel.EstablishmentId} hotel={hotel} />)}
      </div>
    );
  }
}

export default HotelListing;
