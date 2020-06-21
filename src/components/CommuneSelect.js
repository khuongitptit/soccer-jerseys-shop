import React from 'react';
import { Select } from 'antd'
const CommuneSelect = (props) => {
    const { account, onCommuneChange, disabled } = props
    return (
        <Select
            placeholder="Xã / Phường / Thị trấn"
            onChange={value => onCommuneChange(value)}
            disabled={disabled}
            value={account.address.commune || "Xã / Phường / Thị trấn"}
            //defaultValue={userAccountEditing.address.house_number}
            className="commune-select"
        >
            {props.children}
        </Select>
    );
};

export default CommuneSelect;