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

const filterHotels = (hotels, filter) => {
  return hotels.filter(hotel => {
    return (
      hotel.Name.includes(filter.name) &&
      (filter.stars === undefined || hotel.Stars === filter.stars) &&
      hotel.UserRating >= filter.userRating &&
      (filter.minCost === undefined || hotel.MinCost >= filter.minCost) &&
      (filter.maxCost === undefined || hotel.MinCost <= filter.maxCost)
    );
  });
};

const toNumber = (value) => {
  if (value === '') {
    return undefined;
  }
  return Number(value);
}

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      <h4>Filter</h4>
      <div>
        Name:
        {' '}
        <input
          type="text"
          value={filter.name}
          onChange={event => onChange({ ...filter, name: event.target.value })}
        />
      </div>
      <div>
        Stars:
        {[5, 4, 3, 2, 1].map(numStars => (
          <button
            key={numStars}
            onClick={() => onChange({ ...filter, stars: numStars })}
          >
            {numStars}
          </button>
        ))}
      </div>
      <div>
        User rating (at least):
        {' '}
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={filter.userRating}
          onChange={event =>
            onChange({ ...filter, userRating: event.target.value })}
        />
        {' '}
        <b>{filter.UserRating}</b>
      </div>
      <div>
        Price range:
        Min:
        {' '}
        <input
          type="number"
          min="0"
          value={filter.minCost || ''}
          onChange={event =>
            onChange({ ...filter, minCost: toNumber(event.target.value) })}
        />
        {' '}
        Max:
        {' '}
        <input
          type="number"
          min="0"
          value={filter.maxCost || ''}
          onChange={event =>
            onChange({ ...filter, maxCost: toNumber(event.target.value) })}
        />
      </div>
    </div>
  );
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
      filter: {
        name: '',
        stars: undefined,
        userRating: 0,
        minCost: undefined,
        maxCost: undefined,
      },
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
    const { hotels, sortBy, filter } = this.state;
    const sortedHotels = sortHotels(filterHotels(hotels, filter), sortBy);
    return (
      <div>
        <Filter
          filter={filter}
          onChange={newFilter => this.setState({ filter: newFilter })}
        />
        <div>
          <hr />
          Sort by:
          <select
            value={sortBy.id}
            onChange={event =>
              this.handleSortChange(Number(event.target.value))}
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <hr />
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
