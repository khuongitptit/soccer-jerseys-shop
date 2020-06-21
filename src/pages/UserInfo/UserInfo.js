import React from 'react'
import { Form, Input, Select, Button, Switch, Tabs } from 'antd'
import { EditOutlined, SaveOutlined, SyncOutlined } from '@ant-design/icons'
import CitySelect from '../../components/CitySelect'
import DistrictSelect from '../../components/DistrictSelect'
import CommuneSelect from '../../components/CommuneSelect'
import HouseNumberInput from '../../components/HouseNumberInput'
const { Item } = Form
const { Option } = Select
const { TabPane } = Tabs
const UserInfo = props => {
    const { editable } = props
    const { userBasicInfo, userPassword } = props
    const { validation } = props
    const { fieldsIsChanged } = props
    const {
        onFullNameChange,
        onGenderChange,
        onPhoneChange,
        onCityChange,
        onDistrictChange,
        onCommuneChange,
        onHouseNumberChange,
        onCurrentPasswordChange,
        onNewPasswordChange,
        onNewPasswordConfirmChange,
    } = props
    const { onEditSwitch } = props
    const {
        onBasicInfoFormFinish,
        onBasicInfoFormFinishFailed,
        onPasswordFormFinish,
        onPasswordFormFinishFail,
    } = props
    const {
        mapCitiesFromTreeToOptions,
        mapDistrictsOfCityToOptions,
        mapCommunesOfDistrictToOptions,
        findCityCodeByName,
        findDistricCodeByCityCodeAndDistrictName,
    } = props

    return (
        <div className="info-form-mask">
            <div className="info-form-container">
                <Tabs
                    defaultActiveKey="1"
                    tabBarStyle={{
                        marginLeft: '10px',
                        color: 'rgb(182, 197, 45)',
                    }}
                >
                    <TabPane tab="Thông tin cơ bản" key="1">
                        <Form
                            onFinish={onBasicInfoFormFinish}
                            onFinishFailed={onBasicInfoFormFinishFailed}
                            className="basic-info-form"
                        >
                            <Item className="form-title">
                                <h6>Chỉnh sửa thông tin</h6>
                            </Item>
                            <Item className="edit-control">
                                <span>
                                    <Switch
                                        checkedChildren={<EditOutlined />}
                                        unCheckedChildren={<EditOutlined />}
                                        onClick={onEditSwitch}
                                        className="edit-button"
                                    />
                                    {editable && (
                                        <span className="editing-text">
                                            Đang chỉnh sửa
                                            <SyncOutlined
                                                spin
                                                style={{ marginLeft: '5px' }}
                                            />
                                        </span>
                                    )}
                                </span>
                            </Item>
                            <Item
                                className="fullName-item"
                                label="Họ tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Họ tên không được để trống',
                                    },
                                ]}
                                hasFeedback={fieldsIsChanged.fullName}
                                validateStatus={
                                    validation.fullName ? 'success' : 'error'
                                }
                                help={
                                    !validation.fullName
                                        ? 'Tên không hợp lệ'
                                        : null
                                }
                            >
                                <Input
                                    defaultValue={userBasicInfo.fullName}
                                    disabled={!editable}
                                    onChange={onFullNameChange}
                                    value={userBasicInfo.fullName}
                                    className="fullName-input"
                                />
                            </Item>
                            <Item label="Giới tính" className="gender-item">
                                <Select
                                    defaultValue={userBasicInfo.gender}
                                    onChange={value => onGenderChange(value)}
                                    disabled={!editable}
                                    value={userBasicInfo.gender}
                                    className="gender-select"
                                >
                                    <Option value="Nam">Nam</Option>
                                    <Option value="Nữ">Nữ</Option>
                                    <Option value="Giới tính khác">
                                        Giới tính khác
                                    </Option>
                                </Select>
                            </Item>
                            <Item
                                className="phone-item"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Số điện thoại không được để trống',
                                    },
                                ]}
                                hasFeedback={fieldsIsChanged.phone}
                                validateStatus={
                                    validation.phone ? 'success' : 'error'
                                }
                                help={
                                    !validation.phone
                                        ? 'Số điện thoại không hợp lệ'
                                        : null
                                }
                            >
                                <Input
                                    defaultValue={userBasicInfo.phone}
                                    disabled={!editable}
                                    onChange={onPhoneChange}
                                    value={userBasicInfo.phone}
                                    className="phone-input"
                                />
                            </Item>
                            <Item label="Địa chỉ" className="address-item">
                                <Input.Group>
                                    <Item name={['address', 'city']}>
                                        <CitySelect
                                            account={userBasicInfo}
                                            onCityChange={onCityChange}
                                            disabled={!editable}
                                        >
                                            {mapCitiesFromTreeToOptions()}
                                        </CitySelect>
                                    </Item>
                                    <Item name={['address', 'district']}>
                                        <DistrictSelect
                                            account={userBasicInfo}
                                            fieldsIsChanged={fieldsIsChanged}
                                            onDistrictChange={onDistrictChange}
                                            disabled={!editable}
                                        >
                                            {mapDistrictsOfCityToOptions(
                                                findCityCodeByName(
                                                    userBasicInfo.address.city
                                                )
                                            )}
                                        </DistrictSelect>
                                    </Item>
                                    <Item name={['address', 'commune']}>
                                        <CommuneSelect
                                            account={userBasicInfo}
                                            // fieldsIsChanged={fieldsIsChanged}
                                            onCommuneChange={onCommuneChange}
                                            disabled={!editable}
                                        >
                                            {mapCommunesOfDistrictToOptions(
                                                findCityCodeByName(
                                                    userBasicInfo.address.city
                                                ),
                                                findDistricCodeByCityCodeAndDistrictName(
                                                    findCityCodeByName(
                                                        userBasicInfo.address
                                                            .city
                                                    ),
                                                    userBasicInfo.address
                                                        .district
                                                )
                                            )}
                                        </CommuneSelect>
                                    </Item>
                                    <Item
                                        name={['address', 'housenumber']}
                                        //hasFeedback={fieldsIsChanged.house_number}
                                        // validateStatus={validation.house_number ? "success" : "error"}
                                        // help={!validation.house_number ? "Số nhà không hợp lệ" : null}
                                    >
                                        <HouseNumberInput
                                            account={userBasicInfo}
                                            onHouseNumberChange={
                                                onHouseNumberChange
                                            }
                                            disabled={!editable}
                                        />
                                    </Item>
                                </Input.Group>
                            </Item>
                            <Item className="save-item">
                                <Button
                                    type="danger"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    className="save-button"
                                >
                                    Lưu thay đổi
                                </Button>
                            </Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Mật khẩu" key="2">
                        <Form
                            className="password-form"
                            onFinish={onPasswordFormFinish}
                            onFinishFailed={onPasswordFormFinishFail}
                        >
                            <Item
                                className="current-password-item"
                                label="Mật khẩu hiện tại"
                            >
                                <Input.Password
                                    onChange={onCurrentPasswordChange}
                                    value={userPassword.currentPassword}
                                    className="password-input"
                                />
                            </Item>
                            <Item
                                className="new-password-item"
                                label="Mật khẩu mới"
                                hasFeedback={userPassword.newPassword}
                                validateStatus={
                                    validation.password ? 'success' : 'error'
                                }
                                help={
                                    !validation.password
                                        ? 'Mật khẩu phải dài tối thiểu 6 ký tự, tối đa 32 ký tự'
                                        : null
                                }
                            >
                                <Input.Password
                                    onChange={onNewPasswordChange}
                                    value={userPassword.password}
                                    className="password-input"
                                />
                            </Item>
                            <Item
                                className="new-password-confirm-item"
                                label="Nhập lại mật khẩu mới"
                                hasFeedback={userPassword.newPasswordConfirm}
                                validateStatus={
                                    userPassword.newPasswordConfirm == ''
                                        ? null
                                        : validation.passwordConfirm
                                        ? 'success'
                                        : 'error'
                                }
                                help={
                                    userPassword.newPasswordConfirm == ''
                                        ? null
                                        : !validation.passwordConfirm
                                        ? 'Mật khẩu không trùng khớp'
                                        : null
                                }
                            >
                                <Input.Password
                                    onChange={onNewPasswordConfirmChange}
                                    value={userPassword.newPasswordConfirm}
                                    className="password-input"
                                />
                            </Item>
                            <Item className="save-item">
                                <Button
                                    type="danger"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    className="save-button"
                                >
                                    Lưu thay đổi
                                </Button>
                            </Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default UserInfo
