import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import Slider from 'material-ui/Slider';
import { yellow600 } from 'material-ui/styles/colors';

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
              key={numStars}
              label={
                <span>
                  {[...new Array(numStars)].map((value, i) => (
                    <ToggleStar key={i} color={yellow600} />
                  ))}
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
          User rating (at least) <b>{filter.userRating.toFixed(1)}</b>
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

export default Filter;
