import React, { useState, useEffect } from 'react'
import UserInfo from '../pages/UserInfo/UserInfo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import tree from '../utils/tree.json'
import { Select, message } from 'antd'
import {
    actionUpdateInfoRequest,
    actionUpdatePasswordRequest,
} from '../actions/index'
const { Option } = Select
function removeAscent(str) {
    if (str === null || str === undefined) return str
    //upper case
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    str = str.replace(/Đ/g, 'D')

    //lower case
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    return str
}

const UserInfoContainer = props => {
    const DistrictRef = React.createRef()
    const { userAccount } = props
    const validateRegExp = {
        fullName: /^[A-Z][a-z]*\s([A-Z][a-z]*\s)*([AEIOU][a-z]*|[^AEIOU][a-z]+)\s*$/,
        phone: /^(09[\d]{8}|03[\d]{9})$/,
        email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        password: /^[A-Za-z\d~`!@#$%^&*()-_+=|}]{["':;?/>.<,]{6,32}$/,
    }
    const [userBasicInfo, setUserBasicInfo] = useState({ ...userAccount })
    const [userPassword, setUserPassword] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    })
    const [editable, setEditable] = useState(false)

    const [validation, setValidation] = useState({
        fullName: true,
        phone: true,
        houseNumber: true,
        password: true,
        passwordConfirm: true,
    })

    const [fieldsIsChanged, setFieldsIsChanged] = useState({
        fullName: false,
        phone: false,
        address: {
            city: false,
            district: false,
            commune: false,
            houseNumber: false,
        },
        password: false,
        passwordConfirm: false,
    })
    const { updateInfoSuccess } = props
    useEffect(() => {
        if (updateInfoSuccess) {
            message.success('Đã cập nhật thông tin')
            props.history.push('/')
        }
    }, [updateInfoSuccess])

    const findCityCodeByName = cityName => {
        let result = ''
        for (var cityCode in tree) {
            if (tree.hasOwnProperty(cityCode)) {
                if (tree[cityCode]['name_with_type'] === cityName) {
                    result = cityCode
                }
            }
        }
        return result
    }
    const findDistricCodeByCityCodeAndDistrictName = (
        cityCodeFound,
        districtName
    ) => {
        let result = ''
        for (var districtCode in tree[cityCodeFound]['quan-huyen']) {
            if (
                tree[cityCodeFound]['quan-huyen'].hasOwnProperty(districtCode)
            ) {
                if (
                    tree[cityCodeFound]['quan-huyen'][districtCode][
                        'name_with_type'
                    ] === districtName
                ) {
                    result = districtCode
                }
            }
        }
        return result
    }

    const mapCitiesFromTreeToOptions = () => {
        let listCities = []
        for (var cityId in tree) {
            if (tree.hasOwnProperty(cityId)) {
                listCities.push(
                    <Option
                        key={tree[cityId]['code']}
                        value={tree[cityId]['name_with_type']}
                    >
                        {tree[cityId]['name_with_type']}
                    </Option>
                )
            }
        }
        return listCities
    }

    const mapDistrictsOfCityToOptions = cityCode => {
        let listDistrictsOfCity = []
        for (var cityId in tree) {
            if (tree.hasOwnProperty(cityId)) {
                if (tree[cityId]['code'] === cityCode) {
                    for (var districtId in tree[cityId]['quan-huyen']) {
                        if (
                            tree[cityId]['quan-huyen'].hasOwnProperty(
                                districtId
                            )
                        ) {
                            listDistrictsOfCity.push(
                                <Option
                                    key={
                                        tree[cityId]['quan-huyen'][districtId][
                                            'code'
                                        ]
                                    }
                                    value={
                                        tree[cityId]['quan-huyen'][districtId][
                                            'name_with_type'
                                        ]
                                    }
                                >
                                    {
                                        tree[cityId]['quan-huyen'][districtId][
                                            'name_with_type'
                                        ]
                                    }
                                </Option>
                            )
                        }
                    }
                }
            }
        }
        return listDistrictsOfCity
    }

    const mapCommunesOfDistrictToOptions = (cityCode, districtCode) => {
        let listCommunesOfDistrict = []
        for (var cityId in tree) {
            if (tree.hasOwnProperty(cityId)) {
                if (tree[cityId].code === cityCode) {
                    for (var districtId in tree[cityId]['quan-huyen']) {
                        if (
                            tree[cityId]['quan-huyen'].hasOwnProperty(
                                districtId
                            )
                        ) {
                            //console.log("aaa" + tree[cityId]["quan-huyen"][districtId]["name"])
                            if (
                                tree[cityId]['quan-huyen'][districtId][
                                    'code'
                                ] === districtCode
                            ) {
                                for (var communeId in tree[cityId][
                                    'quan-huyen'
                                ][districtId]['xa-phuong']) {
                                    if (
                                        tree[cityId]['quan-huyen'][districtId][
                                            'xa-phuong'
                                        ].hasOwnProperty(communeId)
                                    ) {
                                        //console.log(tree[cityId]["quan-huyen"][districtId]["xa-phuong"][communeId]["code"])
                                        listCommunesOfDistrict.push(
                                            <Option
                                                key={
                                                    tree[cityId]['quan-huyen'][
                                                        districtId
                                                    ]['xa-phuong'][communeId][
                                                        'code'
                                                    ]
                                                }
                                                value={
                                                    tree[cityId]['quan-huyen'][
                                                        districtId
                                                    ]['xa-phuong'][communeId][
                                                        'name_with_type'
                                                    ]
                                                }
                                            >
                                                {
                                                    tree[cityId]['quan-huyen'][
                                                        districtId
                                                    ]['xa-phuong'][communeId][
                                                        'name_with_type'
                                                    ]
                                                }
                                            </Option>
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return listCommunesOfDistrict
    }

    const findFirstDistrictAndCommuneWhenCityChange = cityCode => {
        for (var codeOfFirstDistrict in tree[cityCode]['quan-huyen']) break
        for (var codeOfFirstCommune in tree[cityCode]['quan-huyen'][
            codeOfFirstDistrict
        ]['xa-phuong'])
            break
        return {
            district:
                tree[cityCode]['quan-huyen'][codeOfFirstDistrict][
                    'name_with_type'
                ],
            commune:
                tree[cityCode]['quan-huyen'][codeOfFirstDistrict]['xa-phuong'][
                    codeOfFirstCommune
                ]['name_with_type'],
        }
    }
    const findFirstCommuneWhenDistrictChange = (cityCode, districtCode) => {
        for (var codeOfFirstCommune in tree[cityCode]['quan-huyen'][
            districtCode
        ]['xa-phuong'])
            break
        return tree[cityCode]['quan-huyen'][districtCode]['xa-phuong'][
            codeOfFirstCommune
        ]['name_with_type']
    }
    // console.log(findFirstCommuneWhenDistrictChange(
    //     findCityCodeByName(userBasicInfo.address.city),
    //     findDistricCodeByCityCodeAndDistrictName(
    //         findCityCodeByName(userBasicInfo.address.city),
    //         userBasicInfo.address.district
    //     )))
    const onBasicInfoFormFinish = () => {
        //console.log(userBasicInfo)
        props.onBasicInfoFormFinish(userBasicInfo)
    }
    const onBasicInfoFormFinishFailed = errorInfo => {
        console.log(errorInfo)
    }
    const onPasswordFormFinish = () => {
        props.onPasswordFormFinish(userPassword)
    }
    const onPasswordFormFinishFailed = errorInfo => {
        console.log(errorInfo)
    }

    const onEditClick = () => {
        setEditable(true)
    }
    const onEditSwitch = e => {
        setEditable(e)
    }
    const onFullNameChange = e => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            fullName: true,
        })
        setUserBasicInfo({
            ...userBasicInfo,
            fullName: e.target.value,
        })
        const fullNameTest = e.target.value
        if (validateRegExp.fullName.test(removeAscent(fullNameTest))) {
            setValidation({
                ...validation,
                fullName: true,
            })
        } else {
            setValidation({
                ...validation,
                fullName: false,
            })
        }
    }
    const onGenderChange = value => {
        setUserBasicInfo({
            ...userBasicInfo,
            gender: value,
        })
    }
    const onPhoneChange = e => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            phone: true,
        })
        setUserBasicInfo({
            ...userBasicInfo,
            phone: e.target.value,
        })
        const phoneTest = e.target.value
        if (validateRegExp.phone.test(phoneTest)) {
            setValidation({
                ...validation,
                phone: true,
            })
        } else {
            setValidation({
                ...validation,
                phone: false,
            })
        }
    }
    const onCityChange = value => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            address: {
                ...fieldsIsChanged.address,
                city: true,
            },
        })
        setUserBasicInfo({
            ...userBasicInfo,
            address: {
                ...userBasicInfo.address,
                city: value,
                district: null,
                commune: null,
                houseNumber: null,
                // district: findFirstDistrictAndCommuneWhenCityChange(findCityCodeByName(value)).district,
                // commune: findFirstDistrictAndCommuneWhenCityChange(findCityCodeByName(value)).commune,
                // houseNumber: null
            },
        })
    }
    const onDistrictChange = value => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            address: {
                ...fieldsIsChanged.address,
                district: true,
            },
        })
        setUserBasicInfo({
            ...userBasicInfo,
            address: {
                ...userBasicInfo.address,
                district: value,
                commune: null,
                houseNumber: null,
                // commune: findFirstCommuneWhenDistrictChange(
                //     findCityCodeByName(userBasicInfo.address.city),
                //     findDistricCodeByCityCodeAndDistrictName(
                //         findCityCodeByName(userBasicInfo.address.city),
                //         userBasicInfo.address.district
                //     )),
                // houseNumber: null
            },
        })
    }
    const onCommuneChange = value => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            address: {
                ...fieldsIsChanged.address,
                commune: true,
            },
        })
        setUserBasicInfo({
            ...userBasicInfo,
            address: {
                ...userBasicInfo.address,
                commune: value,
                houseNumber: null,
            },
        })
    }
    const onHouseNumberChange = e => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            address: {
                ...fieldsIsChanged.address,
                houseNumber: true,
            },
        })
        setUserBasicInfo({
            ...userBasicInfo,
            address: {
                ...userBasicInfo.address,
                houseNumber: e.target.value,
            },
        })
    }

    const onCurrentPasswordChange = e => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            password: true,
        })
        setUserPassword({
            ...userPassword,
            currentPassword: e.target.value,
        })
    }
    const onNewPasswordChange = e => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            password: true,
        })
        setUserPassword({
            ...userPassword,
            newPassword: e.target.value,
        })
        const newPasswordTest = e.target.value
        if (validateRegExp.password.test(newPasswordTest)) {
            setValidation({
                ...validation,
                password: true,
            })
        } else {
            setValidation({
                ...validation,
                password: false,
            })
        }
        if (newPasswordTest === userPassword.newPasswordConfirm) {
            setValidation({
                ...validation,
                passwordConfirm: true,
            })
        } else {
            setValidation({
                ...validation,
                passwordConfirm: false,
            })
        }
    }
    const onNewPasswordConfirmChange = e => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            password: true,
        })
        setUserPassword({
            ...userPassword,
            newPasswordConfirm: e.target.value,
        })
        const newPasswordConfirmTest = e.target.value
        if (userPassword.newPassword === newPasswordConfirmTest) {
            setValidation({
                ...validation,
                passwordConfirm: true,
            })
        } else {
            setValidation({
                ...validation,
                passwordConfirm: false,
            })
        }
    }

    return (
        <UserInfo
            onBasicInfoFormFinish={onBasicInfoFormFinish}
            onBasicInfoFormFinishFailed={onBasicInfoFormFinishFailed}
            onPasswordFormFinish={onPasswordFormFinish}
            onPasswordFormFinishFailed={onPasswordFormFinishFailed}
            userBasicInfo={userBasicInfo}
            userPassword={userPassword}
            onEditClick={onEditClick}
            editable={editable}
            onEditSwitch={onEditSwitch}
            onFullNameChange={onFullNameChange}
            onGenderChange={onGenderChange}
            onPhoneChange={onPhoneChange}
            onCityChange={onCityChange}
            onDistrictChange={onDistrictChange}
            onCommuneChange={onCommuneChange}
            onHouseNumberChange={onHouseNumberChange}
            onCurrentPasswordChange={onCurrentPasswordChange}
            onNewPasswordChange={onNewPasswordChange}
            onNewPasswordConfirmChange={onNewPasswordConfirmChange}
            validation={validation}
            fieldsIsChanged={fieldsIsChanged}
            mapCitiesFromTreeToOptions={mapCitiesFromTreeToOptions}
            mapDistrictsOfCityToOptions={mapDistrictsOfCityToOptions}
            mapCommunesOfDistrictToOptions={mapCommunesOfDistrictToOptions}
            findCityCodeByName={findCityCodeByName}
            findDistricCodeByCityCodeAndDistrictName={
                findDistricCodeByCityCodeAndDistrictName
            }
            //
            DistrictRef={DistrictRef}
        />
    )
}
const mapStateToProps = state => {
    return {
        userAccount: state.userAccount,
        updateInfoSuccess: state.updateInfoSuccess,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onBasicInfoFormFinish: userBasicInfo => {
            dispatch(actionUpdateInfoRequest(userBasicInfo))
        },
        onPasswordFormFinish: userPassword => {
            dispatch(actionUpdatePasswordRequest(userPassword))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserInfoContainer))
