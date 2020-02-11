import React, {useState, useEffect} from 'react'
import {Table, PageHeader } from 'antd'

function Orders(props) {
    const [orders, setOrders] = useState([])
    const URL="http://localhost:4000";

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
                console.log(res.mail)
            else{
                localStorage.removeItem('authToken')
            }
            // props.history.push('/')
        })
        : dummy()
    },[])

    useEffect(() => {
        fetch(`${URL}/ordersbyuser/${localStorage.getItem('authToken')}`,{
            method :'get'
        })
        .then(res => res.json())
        .then(res => setOrders(res))
    },[])

    const dummy = () =>{}

    const columns = [
        {
            title : 'Order Id',
            dataIndex : 'id',
            key : 'orderId'
        },
        {
            title : 'Number of Items',
            dataIndex : 'orderItems.length',
            key : 'noOdfItems'
        },
        {
            title : 'OTP',
            dataIndex : 'otp',
            key : 'otp'
        }, 
        {
            title : 'Payment ID',
            dataIndex : 'paymentId',
            key : 'paymentId'
        },
        {
            title : "Bill",
            dataIndex : 'billAmount',
            key : 'billAmount',
            render : record => <span>{`₹${record}`}</span>
        },
        {
            title : 'Payment Reciept',
            dataIndex : 'recieptUrl',
            key : 'recieptUrl',
            render : record => <a href={record}>Reciept</a>
        },
        {
            title : 'Status',
            dataIndex : 'status',
            key : 'status',
            render : (record) => record === 'PENDING' ? 'OPEN' : 'CLOSE'
        }
    ]

    const nestedColumns = [
        {
            title : 'Item',
            dataIndex : "product.name",
            key : 'productName'
        }, 
        {
            title : 'Quantity',
            dataIndex : 'quantity',
            key : 'quantity'
        },
        {
            title : 'Price Per Unit',
            dataIndex : 'product.price',
            key : 'price'
        }
    ]

    return (
        <div>
            <PageHeader
                title="My Orders"
                />
            <Table
                columns={columns}
                dataSource={orders}
                expandedRowRender={record => <Table pagination={false} columns={nestedColumns} dataSource={record.orderItems}/>}
            />
        </div>
    )
}

export default Orders
