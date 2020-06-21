import React from 'react';
import { Select } from 'antd'
const CitySelect = (props) => {
    const { account, onCityChange, disabled } = props
    return (
        <Select
            //placeholder="Thành phố"
            //defaultValue={userAccountEditing.address.city}
            onChange={value => onCityChange(value)}
            disabled={disabled}
            value={account.address.city || "Thành phố"}
            className="city-select"
        >
            {props.children}
        </Select>
    );
};

export default CitySelect;