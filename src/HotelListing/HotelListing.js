import React from 'react';
import AppBar from 'material-ui/AppBar';
import Filter from '../Filter';
import SortBy from '../SortBy';
import Hotel from '../Hotel';

import './HotelListing.css';

const HotelListing = ({
  hotels,
  sortOptions,
  sortBy,
  filter,
  onFilterChange,
  onSortChange,
}) => {
  return (
    <div>
      <AppBar title="Hotel Motel Holiday Inn" showMenuIconButton={false} />
      <div>
        <h3 className={'header'}>Hotels in Paris</h3>
        <Filter filter={filter} onChange={onFilterChange} />
        <SortBy
          sortOptions={sortOptions}
          selected={sortBy}
          onChange={onSortChange}
        />
        <div>
          {hotels.map(hotel => (
            <Hotel key={hotel.EstablishmentId} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelListing;
