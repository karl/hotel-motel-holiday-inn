import React, { Component } from 'react';
import HotelListing from './HotelListing';

const sortOptions = [
  { id: 1, field: 'Distance', ascending: true, label: 'Distance' },
  { id: 2, field: 'Stars', descending: false, label: 'Stars' },
  { id: 3, field: 'MinCost', ascending: true, label: 'Price (lowest first)' },
  { id: 4, field: 'MinCost', ascending: false, label: 'Price (highest first)' },
  { id: 5, field: 'UserRating', ascending: false, label: 'Rating' },
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
      hotel.Name.toLowerCase().includes(filter.name.toLowerCase()) &&
      filter.stars[hotel.Stars] &&
      hotel.UserRating >= filter.userRating &&
      (filter.minCost === undefined || hotel.MinCost >= filter.minCost) &&
      (filter.maxCost === undefined || hotel.MinCost <= filter.maxCost)
    );
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      loading: true,
      sortBy: sortOptions[0],
      filter: {
        name: '',
        stars: {
          5: true,
          4: true,
          3: true,
          2: true,
          1: true,
        },
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
    const { hotels: allHotels, sortBy, filter } = this.state;
    const hotels = sortHotels(filterHotels(allHotels, filter), sortBy).slice(
      0,
      10,
    );
    return (
      <HotelListing
        hotels={hotels}
        sortOptions={sortOptions}
        sortBy={sortBy}
        filter={filter}
        onFilterChange={newFilter => this.setState({ filter: newFilter })}
        onSortChange={id => this.handleSortChange(id)}
      />
    );
  }
}

export default App;
