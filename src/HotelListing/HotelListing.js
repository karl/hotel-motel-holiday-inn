import React, { Component } from 'react';

const sortFields = [
  { value: 'Distance', label: 'distance' },
  { value: 'Stars', label: 'stars' },
  { value: 'MinCost', label: 'minimum cost' },
  { value: 'UserRating', label: 'user rating' },
];

const sortHotels = (hotels, sortBy) => {
  return [...hotels].sort((a, b) => {
    const valueA = a[sortBy.value];
    const valueB = b[sortBy.value];

    return valueA - valueB;
  });
};

const Hotel = ({ hotel }) => {
  return (
    <div>
      <h5>{hotel.Name}</h5>
      <img src={hotel.ThumbnailUrl} alt={hotel.Name} />
      <div>
        Location: {hotel.Location}<br />
        Distance: {hotel.Distance}<br />
        Stars: {hotel.Stars}<br />
        User rating: {hotel.UserRating}<br />
        MinCost: {hotel.minCost}<br />
      </div>
    </div>
  );
};

class HotelListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      loading: true,
      sortBy: sortFields[0],
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

  handleSortChange(value) {
    const field = sortFields.find(f => f.value === value);
    this.setState({ sortBy: field });
  }

  render() {
    const { hotels, sortBy } = this.state;
    const sortedHotels = sortHotels(hotels, sortBy);
    return (
      <div>
        <div>
          Sort by:
          <select
            value={sortBy.value}
            onChange={event => this.handleSortChange(event.target.value)}
          >
            {sortFields.map(field => (
              <option key={field.value} value={field.value}>{field.label}</option>
            ))}
          </select>
        </div>
        <div>
          {sortedHotels.map(hotel => (
            <Hotel key={hotel.EstablishmentId} hotel={hotel} />
          ))}
        </div>
      </div>
    );
  }
}

export default HotelListing;
