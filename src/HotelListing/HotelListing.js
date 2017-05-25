import React, { Component } from 'react';

const sortOptions = [
  { id: 1, field: 'Distance', ascending: true, label: 'distance' },
  { id: 2, field: 'Stars', descending: false, label: 'stars' },
  { id: 3, field: 'MinCost', ascending: true, label: 'price (lowest first)' },
  { id: 4, field: 'MinCost', ascending: false, label: 'price (highest first)' },
  { id: 5, field: 'UserRating', ascending: false, label: 'user rating' },
];

const sortHotels = (hotels, sortBy) => {
  return [...hotels].sort((a, b) => {
    const valueA = a[sortBy.field];
    const valueB = b[sortBy.field];

    return sortBy.ascending ? valueA - valueB : valueB - valueA;
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
        MinCost: £{hotel.MinCost}<br />
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
      sortBy: sortOptions[0],
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

  handleSortChange(id) {
    const sortBy = sortOptions.find(f => f.id === id);
    this.setState({ sortBy });
  }

  render() {
    const { hotels, sortBy } = this.state;
    const sortedHotels = sortHotels(hotels, sortBy);
    return (
      <div>
        <div>
          Sort by:
          <select
            value={sortBy.field}
            onChange={event =>
              this.handleSortChange(parseInt(event.target.value, 10))}
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
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
