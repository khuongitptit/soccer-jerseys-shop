import React from 'react';
import { Select } from 'antd'
const DistrictSelect = (props) => {
    const { account, onDistrictChange, disabled } = props
    return (
        <Select
            placeholder="Quận / Huyện / Thị xã"
            onChange={value => onDistrictChange(value)}
            disabled={disabled}
            value={account.address.district || "Quận / Huyện / Thị xã"}
            //defaultValue={userAccountEditing.address.district}
            className="district-select"
        >
            {props.children}
        </Select>
    );
};

export default DistrictSelect;