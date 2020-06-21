import React from 'react'
import { Button, Form, Input, Checkbox, Select } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import CitySelect from '../../components/CitySelect'
import DistrictSelect from '../../components/DistrictSelect'
import CommuneSelect from '../../components/CommuneSelect'
import HouseNumberInput from '../../components/HouseNumberInput'
const { Option } = Select
const { Item } = Form
const SignUpTest = props => {
    const {
        onPasswordConfirmChange,
        onFullNameChange,
        onGenderChange,
        onPhoneChange,
        onEmailChange,
        onPasswordChange,
        onAcceptCheck,
        unCheckAccept,
        acceptTerm,
        onFinish,
        onFinishFailed,
    } = props

    const {
        mapCitiesFromTreeToOptions,
        mapDistrictsOfCityToOptions,
        mapCommunesOfDistrictToOptions,
        findCityCodeByName,
        findDistricCodeByCityCodeAndDistrictName,
    } = props
    const {
        onCityChange,
        onDistrictChange,
        onCommuneChange,
        onHouseNumberChange,
    } = props
    const { validation, fieldsIsChanged } = props

    const { account } = props
    return (
        <div className="signup-form-mask">
            <div className="signup-form-container">
                <Form
                    className="signup-form"
                    name="basic"
                    initialValues={{
                        accept: acceptTerm,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Item className="form-title">
                        <h6>Đăng ký</h6>
                    </Item>
                    <Item
                        className="fullName-item"
                        label="Họ tên"
                        name="fullname"
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
                        help={!validation.fullName ? 'Tên không hợp lệ' : null}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            onChange={onFullNameChange}
                            className="fullName-input"
                        />
                    </Item>
                    <Item
                        className="gender-item"
                        label="Giới tính"
                        name="gender"
                    >
                        <Select
                            placeholder="Chọn giới tính của bạn (không bắt buộc)"
                            onChange={value => onGenderChange(value)}
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
                        label="Điện thoại"
                        name="phone"
                        hasFeedback={fieldsIsChanged.phone}
                        validateStatus={validation.phone ? 'success' : 'error'}
                        help={
                            !validation.phone
                                ? 'Số điện thoại không hợp lệ'
                                : null
                        }
                    >
                        <Input
                            onChange={onPhoneChange}
                            className="phone-input"
                        />
                    </Item>
                    <Item label="Địa chỉ" className="address-item">
                        <Input.Group>
                            <Item name={['address', 'city']}>
                                <CitySelect
                                    account={account}
                                    onCityChange={onCityChange}
                                >
                                    {mapCitiesFromTreeToOptions()}
                                </CitySelect>
                            </Item>
                            <Item name={['address', 'district']}>
                                <DistrictSelect
                                    account={account}
                                    onDistrictChange={onDistrictChange}
                                >
                                    {mapDistrictsOfCityToOptions(
                                        findCityCodeByName(account.address.city)
                                    )}
                                </DistrictSelect>
                            </Item>
                            <Item name={['address', 'commune']}>
                                <CommuneSelect
                                    account={account}
                                    onCommuneChange={onCommuneChange}
                                >
                                    {mapCommunesOfDistrictToOptions(
                                        findCityCodeByName(
                                            account.address.city
                                        ),
                                        findDistricCodeByCityCodeAndDistrictName(
                                            findCityCodeByName(
                                                account.address.city
                                            ),
                                            account.address.district
                                        )
                                    )}
                                </CommuneSelect>
                            </Item>
                            <Item name={['address', 'housenumber']}>
                                <HouseNumberInput
                                    account={account}
                                    onHouseNumberChange={onHouseNumberChange}
                                />
                            </Item>
                        </Input.Group>
                    </Item>

                    <Item
                        className="email-item"
                        label="Tên tài khoản"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Tên tài khoản không được để trống',
                            },
                        ]}
                        hasFeedback={fieldsIsChanged.email}
                        validateStatus={
                            validation.email.pattern && validation.email.unique
                                ? 'success'
                                : 'error'
                        }
                        help={
                            !validation.email.pattern
                                ? 'Email không đúng định dạng'
                                : !validation.email.unique
                                ? 'Email này đã được sử dụng'
                                : null
                        }
                    >
                        <Input
                            prefix={<UserOutlined />}
                            onChange={e => onEmailChange(e)}
                            className="email-input"
                        />
                    </Item>
                    <Item
                        className="password-item"
                        label="Mật khẩu"
                        name="password1"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được để trống',
                            },
                        ]}
                        hasFeedback={fieldsIsChanged.password}
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
                            prefix={<LockOutlined />}
                            onChange={e => onPasswordChange(e)}
                            className="password-input"
                        />
                    </Item>
                    <Item
                        className="password-confirm-item"
                        label="Xác nhận mật khẩu"
                        name="password2"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn phải xác nhận mật khẩu',
                            },
                        ]}
                        hasFeedback={fieldsIsChanged.passwordConfirm}
                        validateStatus={
                            validation.passwordConfirm ? 'success' : 'error'
                        }
                        help={
                            validation.passwordConfirm
                                ? null
                                : 'Mật khẩu không trùng khớp'
                        }
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            onChange={onPasswordConfirmChange}
                            className="password-confirm-input"
                        />
                    </Item>
                    <Item
                        className="accept-checkbox-item"
                        name="accept"
                        valuePropName="checked"
                        validateStatus={!unCheckAccept ? 'success' : 'warning'}
                        help={
                            !unCheckAccept
                                ? null
                                : 'Trước khi đăng ký, bạn phải đồng ý với các điều khoản dịch vụ'
                        }
                    >
                        <Checkbox
                            onChange={onAcceptCheck}
                            checked={acceptTerm}
                            className="accept-checkbox"
                        >
                            Tôi đồng ý với các điều khoản dịch vụ
                        </Checkbox>
                    </Item>
                    <Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="submit-button"
                        >
                            Đăng ký
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(SignUpTest)
