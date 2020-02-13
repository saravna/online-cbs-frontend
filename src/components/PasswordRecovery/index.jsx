import React, {useState, useEffect} from 'react'
import { Form, Icon, Input, Button, notification } from 'antd';
import {withRouter} from 'react-router-dom'

function PasswordRecovery(props) {
    const [id, setId] = useState('')
    const URL=process.env.NODE_ENV==="development"?"http://localhost:4000":"/backend";
    console.log(URL)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        var token = urlParams.get('a')
        fetch(URL+"/verifytoken", {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                token 
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.data.id)
                setId(res.data.id)
            else{
                console.log("error")
                props.history.push('/')
                // notification.error({
                //     message : "Password Recovery link expired",
                //     duration : 2
                // })
            }
            return 
        })
        .catch(err => console.log("error",err))
        // eslint-disable-next-line
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        var d = props.form.getFieldsValue();
        console.log(d)
        if(d.password && d.cPassword){
            if(d.password === d.cPassword){
                fetch(URL+"/updatepassword",{
                    method : 'post',
                    headers : {'Content-Type' : 'application/json'},
                    body : JSON.stringify({
                        id,
                        password:d.password
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res === 'success'){ 
                        notification.success({message :"Password Updated", duration:2})
                    }
                    else {
                        notification.error({message:"Password Updation Failed",duration:2})
                    }
                    props.history.push('/')
                })
                .catch(err => notification.error({message : err}))
            } else {
                notification.error({
                    message : "Passwords Did not match",
                    duration : 3,
                })
            }
        } else {
            notification.error({
                message : "Enter password",
                duration : 3,
            })
        }
    }

    const { getFieldDecorator } = props.form;
    return (
        <div style={{
            width:"300px",
            position : "absolute",
            top : "50%",
            left : "50%",
            transform: "translate(-50%,-50%)"
        }}>
            <Form onSubmit={handleSubmit} className="login-form">
                <h1 style={{fontWeight:"900"}}>Recover Password</h1>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            type="password"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('cPassword', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Retype Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </div>  
    )
}
const WrappedPasswordRecovery = Form.create({ name: 'password_recovery' })(withRouter(PasswordRecovery))
export default WrappedPasswordRecovery
