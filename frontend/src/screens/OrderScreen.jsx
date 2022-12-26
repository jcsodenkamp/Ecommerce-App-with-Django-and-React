import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2"
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";


export default function OrderScreen() {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading && !error) {
        order.itemsPrice = (order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2);
    }


    const addPayPalScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AVYdNQYvb72fghGgiKehzjcCgQ3_GVrcrLqfP_S1oVXF3YRn3lWATzeNzhRfDxhfeUl3TJWuFEXKQah9'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    useEffect(() => {
        if(!userInfo) {
            navigate("/login")
        }

        if(!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(id))
        }else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            }else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, id, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant="danger" >{error}</Message>
    ) : (
        <div>
            
            <Row >
                <Col md={8}>
                    <ListGroup variant="flush" style={{border:"solid 1px"}}>
                        <ListGroup.Item >
                            <h2 className="text-center">Shipping</h2>
                            <p><strong className="fw-bold">Order: </strong>{order._id}</p>
                            <p><strong className="fw-bold">Name: </strong>{order.user.name} </p>
                            <p><strong className="fw-bold">Email: </strong><a href={`mailto:${order.user.email}`}style={{textDecoration:"none"}}>{order.user.email}</a></p>
                            <p>
                                <strong className="fw-bold">Shipping: </strong>
                                {order.ShippingAddress.address}{" "}
                                {order.ShippingAddress.city}{" "}
                                {order.ShippingAddress.postalCode}{" "}
                                {order.ShippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">Delivered on {order.deliveredAt.substring(0,10)}</Message>
                            ):(
                                <Message variant="info">Not Delivered{order.delivereddAt}</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className="text-center">Payment Method</h2>
                            <p>
                                <strong>Payment Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">Paid on {order.paidAt.substring(0,10)}</Message>
                            ):(
                                <Message variant="info">Not Paid{order.paidAt}</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 className="text-center">Order Item</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="info">
                                    Order is empty
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`} style={{textDecoration:"none"}}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} =
                                                    $
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card style={{border:"solid 1px"}}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}

                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button 
                                        type="button"
                                        variant="outline-warning"
                                        className="btn btn-block"
                                        onClick={deliverHandler}>
                                        Mark as Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}