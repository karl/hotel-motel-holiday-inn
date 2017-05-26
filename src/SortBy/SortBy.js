import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SortBy = ({ sortOptions, selected, onChange }) => {
  return (
    <div
      style={{
        margin: '1rem',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <SelectField
        floatingLabelText="Sort by"
        value={selected.id}
        onChange={(event, index, value) => onChange(value)}
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
  );
};

export default SortBy;
