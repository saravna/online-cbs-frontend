import React, {useEffect, useState} from 'react';
import { Card, Icon, Button } from 'antd'
import Meta from 'antd/lib/card/Meta';

const Menu = () => {
    const [cart, setCart] = useState([])
    const menu = [
        {
            "id" : "1",
            "name" : "item1",
            "price" : 20,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id" : "2",
            "name" : "item2",
            "price" : 30,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id" : "3",
            "name" : "item3",
            "price" : 20,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id" : "4",
            "name" : "item4",
            "price" : 20,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id" : "5",
            "name" : "item5",
            "price" : 20,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id" : "6",
            "name" : "item6",
            "price" : 20,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id" : "7",
            "name" : "item7",
            "price" : 20,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id" : "8",
            "name" : "item8",
            "price" : 20,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id" : "9",
            "name" : "item9",
            "price" : 20,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id" : "10",
            "name" : "item10",
            "price" : 20,
            "category" : "indian",
            "image" : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
    ]

    const addToCart = (id) => {
        var item = menu.filter(item => item.id===id)
        console.log("item",item)
        setCart([...cart,item[0]])
    }

    const removeFromCart = (id) => {
        var updatedCart = cart.filter(item => item.id!==id)
        console.log(updatedCart)
        setCart(updatedCart)
    }

    return ( <div>
        <div>
            <h1>All Items</h1>
            {menu.map(item => 
                <Card
                    style={{width:"300px", display: "inline-block",margin:"5px"}}
                    cover={<img src={item.image}></img>}
                    actions={[<Button id={item.id} onClick={(e)=> addToCart(e.target.id)}><Icon type="plus"/>Add to cart</Button>]}
                >
                    <Meta
                        title={item.name}
                        description={item.price}
                    />
                </Card>
            )}
        </div>
        <div>
            <h1>
                Cart Items
            </h1>
            {console.log(cart)}
            {cart.map(item => 
                <Card
                    style={{width:"300px", display: "inline-block",margin:"5px"}}
                    cover={<img src={item.image}></img>}
                    actions={[<Button id={item.id} onClick={(e)=> removeFromCart(e.target.id)}><Icon type="minus"/>Add to cart</Button>]}
                >
                    <Meta
                        title={item.name}
                        description={item.price}
                    />
                </Card>
            )}
        </div>
    </div> );
}
 
export default Menu;