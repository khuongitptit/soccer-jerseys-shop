import React from 'react'
import { Input } from 'antd'
const HouseNumberInput = props => {
    const { account, onHouseNumberChange, disabled } = props
    return (
        <Input
            placeholder="Địa chỉ / Số nhà"
            onChange={onHouseNumberChange}
            disabled={disabled}
            value={account.address.houseNumber}
            className="houseNumber-input"
        />
    )
}

export default HouseNumberInput
