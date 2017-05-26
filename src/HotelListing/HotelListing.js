import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import Slider from 'material-ui/Slider';

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
      (filter.stars[hotel.Stars]) &&
      hotel.UserRating >= filter.userRating &&
      (filter.minCost === undefined || hotel.MinCost >= filter.minCost) &&
      (filter.maxCost === undefined || hotel.MinCost <= filter.maxCost)
    );
  });
};

const toNumber = value => {
  if (value === '') {
    return undefined;
  }
  return Number(value);
};

const Filter = ({ filter, onChange }) => {
  return (
    <Card>
      <CardHeader
        title="Filter"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <TextField
          hintText="e.g. Disney"
          fullWidth={true}
          floatingLabelText="Hotel Name"
          value={filter.name}
          onChange={(event, newName) => onChange({ ...filter, name: newName })}
        />
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          {[5, 4, 3, 2, 1].map(numStars => (
            <Checkbox
              label={
                <span>
                  {[...new Array(numStars)].map(() => <ToggleStar />)}
                </span>
              }
              checked={filter.stars[numStars]}
              onCheck={(event, isChecked) =>
                onChange({
                  ...filter,
                  stars: { ...filter.stars, [numStars]: isChecked },
                })}
            />
          ))}
        </div>
        <div>
          User rating (at least) <b>{filter.userRating}</b>
          <Slider
            min={0}
            max={10}
            value={filter.userRating}
            onChange={(event, newUserRating) =>
              onChange({ ...filter, userRating: newUserRating })}
            style={{ marginBottom: '-48px' }}
          />
        </div>
        <div>
          <TextField
            type="number"
            min="0"
            floatingLabelText="Min price (£)"
            value={filter.minCost || ''}
            onChange={(event, newMinCost) =>
              onChange({ ...filter, minCost: toNumber(newMinCost) })}
          />
          <TextField
            type="number"
            min="0"
            floatingLabelText="Max price (£)"
            value={filter.maxCost || ''}
            onChange={(event, newMaxCost) =>
              onChange({ ...filter, maxCost: toNumber(newMaxCost) })}
          />
        </div>
      </CardText>
    </Card>
  );
};

const Hotel = ({ hotel }) => {
  return (
    <Card style={{ margin: '1rem' }}>
      <CardHeader title={hotel.Name} avatar={hotel.ThumbnailUrl} />
      <CardText>
        Distance: {hotel.Distance}<br />
        Stars: {hotel.Stars}<br />
        User rating: {hotel.UserRating}<br />
        MinCost: £{hotel.MinCost}<br />
      </CardText>
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
