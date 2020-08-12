import React, { useState, useEffect } from 'react'
import { Select, Modal, message } from 'antd'
import useDebounce from '../utils/useDebounce'
import { withRouter } from 'react-router-dom'
import SignUpTest from '../pages/SignUp/SignUpTest'
import tree from '../utils/tree.json'
import { connect } from 'react-redux'
import { actionSignUpRequest } from '../actions/index'
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
const SignUpContainerTest = props => {
    const validateRegExp = {
        fullName: /^[A-Z][a-z]*\s([A-Z][a-z]*\s)*([AEIOU][a-z]*|[^AEIOU][a-z]+)\s*$/,
        phone: /^(09[\d]{8}|03[\d]{9})$/,
        email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        password: /^[A-Za-z\d\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\|\}\]\{\[\"\'\:\;\?\/\>\.\<\,]{6,32}$/,
    }

    const [validation, setValidation] = useState({
        fullName: true,
        phone: true,
        houseNumber: true,
        email: {
            pattern: true,
            unique: true,
        },
        password: true,
        passwordConfirm: true,
    })

    const [account, setAccount] = useState({
        fullName: '',
        gender: '',
        phone: '',
        address: {
            city: '',
            district: '',
            commune: '',
            houseNumber: '',
        },
        email: '',
        password: '',
        passwordConfirm: '',
    })

    const [acceptTerm, setAcceptTerm] = useState(false)
    const debouncedEmailCheck = useDebounce(account.email, 500)
    const [unCheckAccept, setUnCheckAccept] = useState(false)

    const [fieldsIsChanged, setFieldsIsChanged] = useState({
        fullName: false,
        phone: false,
        address: {
            city: false,
            district: false,
            commune: false,
            houseNumber: false,
        },
        email: false,
        password: false,
        passwordConfirm: false,
    })

    useEffect(() => {
        if (debouncedEmailCheck) {
            debounceEmail(account.email)
        }
    }, [debouncedEmailCheck])
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
        if (cityCodeFound !== '' && districtName !== '') {
            for (var districtCode in tree[cityCodeFound]['quan-huyen']) {
                if (
                    tree[cityCodeFound]['quan-huyen'].hasOwnProperty(
                        districtCode
                    )
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
    const debounceEmail = email => {
        const emailTest = email
        if (validateRegExp.email.test(emailTest)) {
            setValidation({
                ...validation,
                email: {
                    ...validation.email,
                    pattern: true,
                },
            })
        } else {
            setValidation({
                ...validation,
                email: {
                    ...validation.email,
                    pattern: false,
                },
            })
        }
    }
    const checkValidationBeforeSignUp = () => {
        if (
            validation.fullName &&
            validation.phone &&
            validation.houseNumber &&
            validation.email.pattern &&
            validation.email.unique &&
            validation.password &&
            validation.passwordConfirm &&
            acceptTerm
        ) {
            return true
        } else {
            return false
        }
    }

    const showSuccessfulModal = () => {
        let secondsToGo = 3
        const modal = Modal.success({
            title: 'Đăng ký thành công',
            content: `Tự động chuyển hướng đến trang đăng nhập sau ${secondsToGo} giây..`,
            okText: 'Đăng nhập ngay',
            onOk: () => {
                modal.destroy()
                props.history.push('/signin')
            },
        })
        const timer = setInterval(() => {
            secondsToGo -= 1
            modal.update({
                content: `Tự động chuyển hướng đến trang đăng nhập sau ${secondsToGo} giây..`,
            })
        }, 1000)
        setTimeout(() => {
            clearInterval(timer)
            modal.destroy()
            props.history.push('/signin')
            localStorage.setItem('prevSignIn', '/signup')
        }, secondsToGo * 1000)
    }
    const showFailedModal = () => {
        Modal.warning({
            title: 'Thông tin đăng ký không hợp lệ',
            content: 'Vui lòng kiểm tra lại',
        })
    }
    const onFinish = () => {
        if (!checkValidationBeforeSignUp()) {
            if (!acceptTerm) {
                setUnCheckAccept(true)
            }
        } else {
            props.onFinish(account)
            showSuccessfulModal()
        }
    }
    const onFinishFailed = errorInfo => {
        message.error('Đã xảy ra lỗi :(')
    }

    const onAcceptCheck = e => {
        if (e.target.checked) {
            setUnCheckAccept(false)
        } else {
            setUnCheckAccept(true)
        }
        setAcceptTerm(e.target.checked)
    }
    const onFullNameChange = e => {
        setAccount({ ...account, fullName: e.target.value })
        setFieldsIsChanged({
            ...fieldsIsChanged,
            fullName: true,
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
        setAccount({ ...account, gender: value })
    }
    const onPhoneChange = e => {
        setAccount({
            ...account,
            phone: e.target.value,
        })
        setFieldsIsChanged({
            ...fieldsIsChanged,
            phone: true,
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
        setAccount({
            ...account,
            address: {
                ...account.address,
                city: value,
                district: null,
                commune: null,
                houseNumber: null,
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

        setAccount({
            ...account,
            address: {
                ...account.address,
                district: value,
                commune: null,
                houseNumber: null,
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
        setAccount({
            ...account,
            address: {
                ...account.address,
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
        setAccount({
            ...account,
            address: {
                ...account.address,
                houseNumber: e.target.value,
            },
        })
    }
    const onEmailChange = e => {
        setAccount({
            ...account,
            email: e.target.value,
        })
        setFieldsIsChanged({
            ...fieldsIsChanged,
            email: true,
        })
    }
    const onPasswordChange = e => {
        setAccount({
            ...account,
            password: e.target.value,
        })
        setFieldsIsChanged({
            ...fieldsIsChanged,
            password: true,
        })
        const passwordTest = e.target.value
        if (validateRegExp.password.test(passwordTest)) {
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
    }
    const onPasswordConfirmChange = e => {
        setFieldsIsChanged({
            ...fieldsIsChanged,
            passwordConfirm: true,
        })
        setAccount({
            ...account,
            passwordConfirm: e.target.value,
        })
        if (e.target.value === account.password) {
            console.log('not match')
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
        <SignUpTest
            validation={validation}
            account={account}
            acceptTerm={acceptTerm}
            debouncedEmailCheck={debouncedEmailCheck}
            checkValidationBeforeSignUp={checkValidationBeforeSignUp}
            onPasswordConfirmChange={onPasswordConfirmChange}
            onAcceptCheck={onAcceptCheck}
            onFullNameChange={onFullNameChange}
            onGenderChange={onGenderChange}
            onPhoneChange={onPhoneChange}
            onHouseNumberChange={onHouseNumberChange}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            unCheckAccept={unCheckAccept}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            showSuccessfulModal={showSuccessfulModal}
            showFailedModal={showFailedModal}
            mapCitiesFromTreeToOptions={mapCitiesFromTreeToOptions}
            mapDistrictsOfCityToOptions={mapDistrictsOfCityToOptions}
            mapCommunesOfDistrictToOptions={mapCommunesOfDistrictToOptions}
            findCityCodeByName={findCityCodeByName}
            findDistricCodeByCityCodeAndDistrictName={
                findDistricCodeByCityCodeAndDistrictName
            }
            onCityChange={onCityChange}
            onDistrictChange={onDistrictChange}
            onCommuneChange={onCommuneChange}
            fieldsIsChanged={fieldsIsChanged}
        />
    )
}
const mapStateToProps = state => {
    return {
        signUpStatus: state.signUp,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFinish: account => {
            dispatch(actionSignUpRequest(account))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SignUpContainerTest))
