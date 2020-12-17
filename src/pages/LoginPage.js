import Axios from 'axios';
import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { api_url } from '../helpers/api_url';
import { connect } from 'react-redux'
import { loginAction } from '../redux/action'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class LoginPage extends Component {
    state = { 
        loginInfo: {
            email: '',
            password: '',
        }
     }

    onChangeInput = (e) => {
        this.setState({
            loginInfo: {
                ...this.state.loginInfo,
                [e.target.id]: e.target.value
            }
        })
        console.log(this.state.loginInfo)
    }

    clickLogin = () => {
        const { email, password } = this.state.loginInfo
        Axios.get(`${api_url}/users?email=${email}&password=${password}`)
        .then((res) => {
            if (res.data.length !== 0) {
            this.props.loginAction(res.data[0])
            localStorage.setItem('id', res.data[0].id)
            } else {
                alert('Username or Password Invalid')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() { 
        const { email, password } = this.state.loginInfo
        if(this.props.emailUser !== '') {
            return <Redirect to='/'/>
        }
        return ( 
            <div style={{
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '80vh'
                }}>
                <div>
                    <h3>Apple-store</h3>
                    <h6>Welcome Back, Please login to your account.</h6>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', Height: '50vh'}}>
                    <div className='my-2'>
                        {/* Email */}
                        <Input 
                            size='40'
                            placeholder='Email'
                            type='email' 
                            id='email' 
                            onChange={this.onChangeInput}
                            value={email}
                            />
                    </div>
                    <div className='my-2'>
                        {/* Password */}
                        <Input 
                            size='40'
                            placeholder='Password'
                            type='password' 
                            id='password' 
                            onChange={this.onChangeInput}
                            value={password}
                            />
                    </div>
                <Button style={{width: '340px', backgroundColor: '#333333', border: 'none', color: '#D6D6D6'}} className='my-2' onClick={this.clickLogin}>Login</Button>
                <h6 style={{paddingTop: '30px'}}>Doesn't have an account?</h6>
                <Link to='/register'>
                <Button outline color='dark'>Register</Button>
                </Link>
                </div>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        emailUser: state.user.email
    }
}

export default connect (mapStateToProps, {loginAction})(LoginPage);