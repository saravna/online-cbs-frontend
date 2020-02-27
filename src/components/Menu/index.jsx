import React, {useEffect, useState} from 'react';
import { Card, Icon, Button, Modal, PageHeader, Input, Badge, Select, notification } from 'antd'
import Meta from 'antd/lib/card/Meta';
import {withRouter} from 'react-router-dom'
import StripeCheckOutButton from '../StripeButton';
const {Option} = Select

const Menu = (props) => {
    const [cart, setCart] = useState([])
    const [menu, setMenu] = useState([])
    const [cartModalVisible, setCartModalVisible] = useState(false)
    const [quantityEntered, setQuantityEntered] = useState({})
    const [sortOption, setSortOption] = useState('name')
    const [bill, setBill]=useState(0)
    const URL=process.env.NODE_ENV==="development"?"http://localhost:4000":"/backend";
    console.log(URL)

    // eslint-disable-next-line
    useEffect(()=> {
        localStorage.getItem('authToken') ?
        fetch(URL+"/verifytoken",{
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
            token : localStorage.getItem('authToken')
            })
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.data)
                console.log(res.data)
            else{
                localStorage.removeItem('authToken')
                // eslint-disable-next-line
                props.history.push('/')
            }
        })
        : dummy()
        // eslint-disable-next-line
    },[])

    const dummy = () =>{}

    useEffect(() => {
        fetchAllMenu()
    },[])
    
    const fetchAllMenu = () => {
        fetch(URL+"/getmenu", {
            method : 'get'
        })
        .then(res => res.json())
        .then(res => setMenu(res.sort((a,b)=>a.name>b.name?1:-1)))
    } 

    const addToCart = (id) => {
        var added = false
        var tempCart = [...cart]
        if(quantityEntered[id]===0 || quantityEntered[id]===undefined){
            for(let i=0;i<tempCart.length;i++){
                if(tempCart[i].id===id){
                    tempCart.splice(i,1)
                }
            }   
            setCart(tempCart)
            return
        }
        for(let i=0;i<tempCart.length;i++){
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
    
    const handleBuy = (paymentData) => {
    //     googlePayClient.isReadyToPay(clientConfiguration)
    //     .then(response => {
    //     if(response.result){
    //         document.getElementById('gpay').appendChild(googlePayClient.createButton({
    //             onClick : onGooglePaymentButtonClicked
    //         }))
    //     }
    // })
    // .catch(err => alert(err))
    // if(cart.length===0)
        // return 
        console.log(paymentData)
        fetch(URL+"/addorder",{
            method:"post",
            headers :{'Content-Type':'application/json'},
            body:JSON.stringify({
                token:localStorage.getItem('authToken'),
                status:'PENDING',
                recieptUrl : paymentData.receipt_url,
                billAmount : paymentData.amount/100,
                paymentId : paymentData.id,
                orderItems : cart.map(item=> {
                    return {
                        productId: item.id,
                        quantity: item.quantity,
                    }
                })

            })
        })
        .then(res => res.json())
        .then(res => console.log(JSON.stringify(res)))
        setCart([])
        setQuantityEntered({})
        setCartModalVisible(false)
        fetchAllMenu()
    }

    const handleCartClick = () => {
        var tempBill=0
        cart.map((item) => {
            // eslint-disable-next-line
            var filteredItem = menu.filter(menuItem => item.id==menuItem.id);
            console.log(item,filteredItem)
            return tempBill+=item.quantity>0?item.quantity*filteredItem[0].price:0;
            
        })
        setBill(tempBill)
        setCartModalVisible(true)
    }

    const onToken = (priceForStripe,token) => {
        // console.log(token)
        console.log("Payment Successful")
        fetch(URL+"/stripe",{
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                price : priceForStripe,
                stripeTokenId : token.id
            })
        })
        .then(res => res.json())
        .then(res => {
            if(!res.err)
                handleBuy(res)
            else 
                notification.error({
                    message : res.err,
                })
        })
    }

    const removeFromCart = (id) => {
        var updatedCart = cart.filter(item => item.id!==id)
        setQuantityEntered({...quantityEntered,[id]:0})
        setCart(updatedCart)
    }

    const handleSortTypeChange = (e) => {
        setSortOption(e)
        var tempMenu = [...menu]
        console.log(tempMenu)
        if(e === 'name'){
            tempMenu.sort((a,b)=> {
                return a.name>b.name?1:-1
            })
        } else if(e === 'high_price'){
            tempMenu.sort((a,b)=> a.price<=b.price?1:-1)
        } else if(e === 'low_price') {
            tempMenu.sort((a,b)=> a.price>b.price?1:-1)
        } else {
            tempMenu.sort((a,b)=> a.menu.quantity<b.menu.quantity?1:-1)
        }
        setMenu(tempMenu)
    }

    return ( 
        <div>
            <script src="https://js.stripe.com/v3/"></script>
            <PageHeader
                title="All Products"
                // style={{position:"fixed",padding:"20px",zIndex:"1111",backgroundColor:"white",display:'block',width:"100%",boxShadow:"0px 0px 5px 3px gray"}}
                extra={
                    <Button type="primary" style={{position:"absolute",right:"20px",top:"20px",width:"60px"}} onClick={handleCartClick}>
                        <Badge style={{marginLeft:"5px"}}count={cart.length}>
                            <Icon type="shopping-cart" style={{fontSize:"20px",padding:"3px"}}/>
                            {/* <span style={{backgroundColor:"red",lineHeight:"12px",padding:"6px 9px",position:"relative",left:"-5px",top:"12px",borderRadius:"50%"}}>{cart.length}</span> */}
                            <span style={{width:"10px"}}></span>
                        </Badge>    
                    </Button>
                }
            />
            <span style={{paddingRight:"20px",fontWeight:"900"}}>Sort By</span>
            <Select value={sortOption} style={{width:"150px"}} onChange={handleSortTypeChange}>
                {[['name','Name'],['high_price','High Price'],['low_price','Low Price'],['quantity','Quantity']].map(option => <Option key={option[0]} value={option[0]}>{option[1]}</Option>)}
            </Select>
            <div style={{paddingTop:"90px"}}>  
            {/* <div style={{backgroundColor:"black",width:"100%",height:"20%",padding:"20px"}}></div> */}
                {menu.map((item,i) =>
                    item.menu.quantity!==0?
                    <Card
                        key={i}
                        style={{width:"250px", display: "inline-block",margin:"15px",height:"420px",verticalAlign:'top'}}
                        cover={<img src={item.image.replace("http://localhost:4000",URL)} alt={item.name} height={200} width={250}></img>}
                        actions={[
                            <Button id={item.id} onClick={(e)=> addToCart(e.target.id)}><Icon type="plus"/>Add to cart</Button>,
                            // <Button>Fav</Button>
                        ]}
                    >
                        <Meta
                            title={item.name}
                            // eslint-disable-next-line
                            description={<div><Input style={{width:"40%"}} placeholder="Quantity" id={`${item.id}`} value={quantityEntered[item.id]!==0?quantityEntered[item.id]:null} type="number" onChange={(e)=>
                                 (parseInt(e.target.value)<=5 && parseInt(e.target.value)>=0) || e.target.value===''
                                ? setQuantityEntered({
                                    ...quantityEntered,
                                    [e.target.id]:e.target.value!==''?parseInt(e.target.value):0
                                }) 
                                : ''
                            }
                            /><p style={{marginBottom:"0px"}}>Price ₹{item.price}</p><p>Available :{item.menu.quantity}</p></div>}
                        />
                    </Card>:
                    ''
                        )}
            </div>
            <Modal 
                visible={cartModalVisible}
                onCancel={()=>setCartModalVisible(false)}
                // footer={null}
                // onOk={()=>handleBuy()}
                // okText={<StripeCheckOutButton onToken={onToken}price={bill}/>}
                footer={
                    cart.length!==0 
                    ?   <StripeCheckOutButton onToken={onToken} price={bill}/>
                    :   null
                }
                cancelText="Close"
                title={<h2>Cart</h2>}
            >
                <div>
                    {cart.map((item,i) =>{
                            // eslint-disable-next-line
                            var filteredItem = menu.filter(menuItem => item.id==menuItem.id);
                            return item.quantity>0?<Card
                                key={i}
                                style={{width:"200px", display: "inline-block",margin:"5px"}}
                                // cover={<img src={filteredItem[0].image} alt="h"></img>}
                                actions={[<Button id={filteredItem[0].id} onClick={(e)=> removeFromCart(e.target.id)}><Icon type="minus"/>Remove</Button>]}
                            >
                                <Meta
                                    title={filteredItem[0].name}
                                    description={
                                    <div>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price Per Unit: {filteredItem[0].price}</p>
                                        <p>Price: {item.quantity*filteredItem[0].price}</p>
                                    </div>}
                                />
                            </Card> : <p></p>
                        } 
                    )}
                    {cart.length!==0
                     ?  <p style={{
                            position : "relative",
                            left:"33%",
                            fontSize:"25px",
                            fontWeight:"800",
                            top:"20px"
                        }}>
                            Total Bill: {bill}
                            
                        </p>
                     :  <p>No Items Added</p>
                    }
                </div>
                <div id="container">
                </div>
                {/* <script
                    async
                    src="https://pay.google.com/gp/p/js/pay.js"
                    onload="onGooglePayLoaded()">
                </script> */}
            </Modal>
        </div> );
}

export default withRouter(Menu);