import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import { 
     Button , Layout, Modal, Form, Input, Icon, notification
} from 'antd';
// import './carousel.css'
const { Header, Content } = Layout

const Home = (props) => {
    const URL=process.env.NODE_ENV==="development"?"http://localhost:4000":"/backend";
    const [ signInVisible, setSignInVisible ] = useState(false)
    const [ signUpVisible, setSignUpVisible ] = useState(false)
    const [ mail, setMail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ cPassword, setCPassword ] = useState('')
    const [ mobile, setMobile ] = useState('')

    // useEffect(()=> {
    //     var user = localStorage.getItem("users")
    //     console.log(JSON.parse(user))
    // },[])

    const handleChange = (value, field) => {
        if(field === 'mail'){
            setMail(value)
        } else if( field === 'pass'){
            setPassword(value)
        } else if( field === 'cpass'){
            setCPassword(value)
        } else if( field === 'mobile'){
            setMobile(value)
        }
    } 

    const handleResetPassword = () => {
        if(mail.length===0) {
            notification.error({
                message : 'Enter Registered Email',
                placement : 'topRight',
                duration : 2
            })
        } else {
            fetch(`${URL}/resetpassword/${mail}`,{
                method : 'get'
            })
            .then(res => res.json())
            .then(res => res === 'success' ? notification.info({message :"Check your mail"}):notification.error({message : "Error sending mail"}))
        }
    }

    const handleOk= (value) => {
        if(value === "signin"){
            console.log(URL+"/signin")
            fetch(
                URL+"/signin",{
                method : "post",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    mail,
                    password
                })
            })
            .then(res => res.json()) 
            .then(res => {
                // console.log(res)
                if(res.authToken){
                    localStorage.setItem("authToken",res.authToken)
                    props.history.push('/menu')
                } else {
                    // console.log(res.error)
                    notification.error({message:res.error,duration:2})
                }
            })
            setMail('')
            setPassword('')
            setSignInVisible(false)
        } else if(value === "signup"){
            console.log(URL+"/signup")
            if(mail.lastIndexOf('.')<mail.length-1 && mail.lastIndexOf('.')-mail.indexOf('@')>1 && password.trim().length!==0 && !isNaN(mobile) && mobile.trim().length===10){
                fetch(URL+"/signup",{
                    method : "post",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        mail,
                        password,
                        role : "USER",
                        blocked : false,
                        mobile
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(!res.error){
                        localStorage.setItem("authToken",res.authToken)
                        setSignUpVisible(false)
                        setMail('')
                        setPassword('')
                        setCPassword('')
                        setMobile('')
                        props.history.push('/menu')
                    }
                    else
                        alert(res.error === 'mail must be unique' ? "Entered Mail id already exists" : res.error)
                })
                .catch(err => console.log(err))
            } else {
                notification.error({
                    message : "Enter valid details",
                    duration : 5
                })
            }
        }
    }

    return ( 
        <div>
            <Header style={{width : "100%",padding : "10px"}}>
                <Button onClick={()=> setSignInVisible(true)} style={{float : "right", margin :"3px"}} type="primary">SignIn</Button>
                <Button onClick={()=> setSignUpVisible(true)} style={{float : "right", margin :"3px"}} type="primary">SignUp</Button>
            </Header>
            <Content style={{ margin : "20px 10px"}}>
                <h1 style={{display:"block",fontWeight:"900"}}>Cashless Canteen Management System</h1>
                {/* <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    verticalAlign: 'center',
                }}
                > */}
                    <h3 style={{display:"block"}}>Welcome user!!!</h3>
                    
                {/* </div> */}
                <Modal 
                    title="SignIn"
                    visible={signInVisible}
                    onOk={()=> handleOk("signin")}
                    okText="SignIn"
                    onCancel={()=>{
                        setSignInVisible(false)
                        setMail('')
                        setPassword('')
                    }}
                >
                <Form  className="login-form">
                    <Form.Item>
                        <Input
                        prefix={
                            <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        value={mail}
                        placeholder="Email"
                        onChange={(e)=> handleChange(e.target.value,'mail')}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e)=> handleChange(e.target.value,'pass')}
                        />
                        <span 
                            onClick={handleResetPassword}
                            style={{
                                color : '#42A7FA',
                                padding:"3px",
                                cursor : "pointer"
                            }}
                        >
                            Reset Password
                        </span>
                    </Form.Item>
                </Form>
                </Modal>
                <Modal 
                    title="SignUp"
                    visible={signUpVisible}
                    onOk={()=> handleOk("signup")}
                    okText="SignUp" 
                    onCancel={()=>{
                        setSignUpVisible(false)
                        setMail('')
                        setPassword('')
                        setCPassword('')
                    }}

                >
                    <Form>
                        <Form.Item>
                            <Input
                                type="mail"
                                prefix={<Icon type="mail" 
                                style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                                value={mail}
                                onChange={(e)=> handleChange(e.target.value,'mail')}
                            />
                        </Form.Item>
                        <Form.Item>                               
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e)=> handleChange(e.target.value,'pass')}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Confirm Password"
                                value={cPassword}
                                onChange={(e)=> handleChange(e.target.value,'cpass')}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder="Mobile Number"
                                value={mobile}
                                onChange={(e)=>handleChange(e.target.value,"mobile")}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </div>
     );
}
 
const WrappedHome = Form.create({name : "home"})(Home)
export default withRouter(WrappedHome);