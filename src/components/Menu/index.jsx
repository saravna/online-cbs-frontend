import React, {useEffect, useState} from 'react';
import { Card, Icon, Button, Modal, PageHeader, Input } from 'antd'
import Meta from 'antd/lib/card/Meta';
import {withRouter} from 'react-router-dom'

const Menu = (props) => {
    const [cart, setCart] = useState([])
    const [menu, setMenu] = useState([])
    const [cartModalVisible, setCartModalVisible] = useState(false)
    const [quantityEntered, setQuantityEntered] = useState({})

    useEffect(()=> {
        localStorage.getItem('authToken') ?
        fetch("http://localhost:4000/verifytoken",{
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
            token : localStorage.getItem('authToken')
            })
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.data)
                console.log(res.mail)
            else{
                localStorage.removeItem('authToken')
            }
            // props.history.push('/')
        })
        : dummy()
    })

    const dummy = () =>{}

    useEffect(() => {
        fetchAllMenu()
    },[])
    
    const fetchAllMenu = () => {
        fetch("http://localhost:4000/getmenu", {
            method : 'get'
        })
        .then(res => res.json())
        .then(res => setMenu(res))
    } 

    const addToCart = (id) => {
        var added = false
        console.log(quantityEntered[id])
        if(quantityEntered[id]===0 || quantityEntered[id]===undefined)
            return
        var tempCart = cart.splice(0,cart.length)
        for(var i=0;i<tempCart.length;i++){
            if(tempCart[i].id===id){
                tempCart[i].quantity = quantityEntered[id]
                added=true
            }
        }
        if(!added){
            tempCart = [...tempCart,{
                id, 
                quantity : quantityEntered[id]
            }]            
        }
        setCart(tempCart)
    }
    
    const removeFromCart = (id) => {
        var updatedCart = cart.filter(item => item.id!==id)
        setQuantityEntered({...quantityEntered,[id]:0})
        setCart(updatedCart)
    }

    return ( 
        <div>
            <PageHeader
                title="All Items"
                style={{position:"fixed",padding:"20px",zIndex:"1111",backgroundColor:"white",display:'block',width:"100%",boxShadow:"0px 0px 5px 3px gray"}}
                extra={
                    <Button type="primary" style={{position:"absolute",right:"20px",top:"20px",width:"60px"}} onClick={()=> setCartModalVisible(true)}>
                        <Icon type="shopping-cart" style={{fontSize:"20px",padding:"3px"}}/>
                        <span style={{backgroundColor:"red",lineHeight:"12px",padding:"6px 9px",position:"relative",left:"-5px",top:"12px",borderRadius:"50%"}}>{cart.length}</span>
                    </Button>
                }
            />
            <div style={{paddingTop:"90px"}}>  
            {/* <div style={{backgroundColor:"black",width:"100%",height:"20%",padding:"20px"}}></div> */}
                {menu.map((item,i) => 
                    item.menu.quantity!==0?
                    <Card
                        key={i}
                        style={{width:"300px", display: "inline-block",margin:"5px",height:"400px",verticalAlign:'top'}}
                        cover={<img src={item.image} alt={item.name} height={200} width={250}></img>}
                        actions={[<Button id={item.id} onClick={(e)=> addToCart(e.target.id)}><Icon type="plus"/>Add to cart</Button>]}
                    >
                        <Meta
                            title={item.name}
                            description={<div><Input style={{width:"40%"}} placeholder="Quantity" id={item.id} value={quantityEntered[item.id]!==0?quantityEntered[item.id]:null} type="number" onChange={(e)=>
                                 (parseInt(e.target.value)<=5 && parseInt(e.target.value)>=0) || e.target.value===''
                                ? setQuantityEntered({
                                    ...quantityEntered,
                                    [e.target.id]:e.target.value!==''?parseInt(e.target.value):0
                                }) 
                                : ''
                            }
                            /><p style={{marginBottom:"0px"}}>Price :{item.price}</p><p>Available :{item.menu.quantity}</p></div>}
                        />
                    </Card>:
                    ''
                )}
            </div>
            <Modal 
                visible={cartModalVisible}
                onCancel={()=>setCartModalVisible(false)}
                onOk={()=>setCartModalVisible(false)}
                okText="Buy Now"
                cancelText="Close"
                
            >
                <div>
                    <h1>
                        Cart Items
                    </h1>
                    {cart.map((item,i) =>{
                            // eslint-disable-next-line
                            var filteredItem = menu.filter(menuItem => item.id==menuItem.id)
                            return item.quantity!==0?
                            <Card
                                key={i}
                                style={{width:"100px", display: "inline-block",margin:"5px"}}
                                cover={<img src={filteredItem[0].image} alt="h"></img>}
                                actions={[<Button id={filteredItem[0].id} onClick={(e)=> removeFromCart(e.target.id)}><Icon type="minus"/>Remove</Button>]}
                            >
                                <Meta
                                    title={filteredItem[0].name}
                                    description={item.quantity}
                                />
                            </Card> : ''
                        } 
                    )}
                </div>
            </Modal>
        </div> );
}

export default withRouter(Menu);