import React from 'react';
import { Card } from 'material-ui/Card';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import { yellow600 } from 'material-ui/styles/colors';

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
export default Hotel;
