import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import { 
     Button , Layout, Modal, Form, Input, Icon
} from 'antd';
const { Header, Content } = Layout

const Home = (props) => {
    const [ signInVisible, setSignInVisible ] = useState(false)
    const [ signUpVisible, setSignUpVisible ] = useState(false)
    const [ mail, setMail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ cPassword, setCPassword ] = useState('')

    useEffect(()=> {
        var user = localStorage.getItem("users")
        console.log(JSON.parse(user))
    },[])

    const handleChange = (value, field) => {
        if(field === 'mail'){
            setMail(value)
        } else if( field === 'pass'){
            setPassword(value)
        } else if( field === 'cpass'){
            setCPassword(value)
        }
    } 

    const handleOk= (value) => {
        if(value === "signin"){
            var users = JSON.parse(localStorage.getItem("users"))
            if(users.length === 0 ){
                alert('Not Recognized')
                setMail('')
                setPassword('')
            } else {

                var validUser = false
                console.log(users.length)
                for(var i=0; i< users.length; i++){
                    if(users[i].mail === mail && users[i].password === password){
                        validUser = true
                        break
                    }
                }
                if(validUser)
                    alert("Valid")
                else 
                    alert("Not Valid")
            }
            setMail('')
            setPassword('')
            setSignInVisible(false)
        } else if(value === "signup"){
            var users = JSON.parse(localStorage.getItem("users"))
            if(users===null)
                users=[]
            var validUser = true
            for(var i=0;i<users.length; i++){
                if(users[i].mail === mail){
                    validUser = false
                    break
                }
            }
            if(validUser){
                users = ([...users,{
                    mail,
                    password
                }])
                localStorage.setItem("users",JSON.stringify(users))
            } else {
                alert(`user ${mail} is already present`)
            }
            setSignUpVisible(false)
            setMail('')
            setPassword('')
            setCPassword('')
        }
    }

    return ( 
        <div>
            <Header style={{width : "100%",padding : "10px"}}>
                <Button onClick={()=> setSignInVisible(true)} style={{float : "right", margin :"3px"}} type="primary">SignIn</Button>
                <Button onClick={()=> setSignUpVisible(true)} style={{float : "right", margin :"3px"}} type="primary">SignUp</Button>
            </Header>
            <Content style={{ margin : "20px 10px"}}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    verticalAlign: 'center',
                }}
                >
                    <h1>Welcome!</h1>
                </div>
                <Modal 
                    title="SignIn"
                    visible={signInVisible}
                    onOk={()=> handleOk("signin")}
                    okText="SignIn"
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
                    </Form.Item>
                </Form>
                </Modal>
                <Modal 
                    title="SignUp"
                    visible={signUpVisible}
                    onOk={()=> handleOk("signup")}
                    okText="SignUp" 
                >
                    <Form>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                            />,
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Conform Password"
                                value={cPassword}
                                onChange={(e)=> handleChange(e.target.value,'cpass')}
                            />,
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </div>
     );
}
 
const WrappedHome = Form.create({name : "home"})(Home)
export default withRouter(WrappedHome);