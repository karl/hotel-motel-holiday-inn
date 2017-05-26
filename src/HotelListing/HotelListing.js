import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import { yellow600 } from 'material-ui/styles/colors';
import Filter from '../Filter';

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

const Hotel = ({ hotel }) => {
  return (
    <Card style={{ margin: '1rem' }}>
      <div style={{ display: 'flex' }}>
        <img
          style={{ flex: '0 0 120px', height: '120', width: '120' }}
          src={hotel.ThumbnailUrl}
          alt=""
        />
        <div style={{ flex: '1 1 auto', padding: '0.5rem' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {hotel.Name}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: '1 0 auto' }}>
                {[...new Array(hotel.Stars)].map((value, i) => (
                  <ToggleStar key={i} color={yellow600} />
                ))}
              </div>
              <div>{hotel.Distance.toFixed(1)}mi</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: '1 0 auto' }}>
                {hotel.UserRating.toFixed(1)} rating
              </div>
              <div>£<b>{hotel.MinCost.toFixed(0)}</b></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
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
    const { hotels, sortBy, filter } = this.state;
    const sortedHotels = sortHotels(filterHotels(hotels, filter), sortBy);
    return (
      <div>
        <Filter
          filter={filter}
          onChange={newFilter => this.setState({ filter: newFilter })}
        />
        <div
          style={{
            margin: '1rem',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <SelectField
            floatingLabelText="Sort by"
            value={sortBy.id}
            onChange={(event, index, value) => this.handleSortChange(value)}
          >
            {sortOptions.map(option => (
              <MenuItem
                key={option.id}
                value={option.id}
                primaryText={option.label}
              />
            ))}
          </SelectField>
        </div>
        <div>
          {sortedHotels
            .slice(0, 10)
            .map(hotel => <Hotel key={hotel.EstablishmentId} hotel={hotel} />)}
        </div>
      </div>
    );
  }
}

export default HotelListing;
