import React, { useState } from 'react'
import { actionSignInRequest } from '../actions/index'
import { connect } from 'react-redux'
import SignIn from '../pages/SignIn/SignIn'
import firebase from '../firebaseConfig/index'
const SignInContainer = props => {
    console.log(props)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { history } = props
    const { isSignedIn, signInFail, signInLoading } = props
    const onFinish = () => {
        props.onFinish(email, password)
    }
    const onFinishFailed = () => {}
    const onEmailChange = e => {
        setEmail(e.target.value)
    }
    const onPasswordChange = e => {
        setPassword(e.target.value)
    }
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
        callback: {
            signInSuccess: () => false,
        },
    }
    return (
        <SignIn
            email={email}
            password={password}
            history={history}
            isSignedIn={isSignedIn}
            signInFail={signInFail}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
            signInLoading={signInLoading}
        />
    )
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.signedInStatus,
        signInFail: state.signInFail,
        signInLoading: state.signInLoading,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFinish: (email, password) => {
            dispatch(actionSignInRequest(email, password))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
