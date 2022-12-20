import React, { useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const productId = params.id;
    const qty = location.search ? location.search.split("=")[1] : 1;
    // console.log('qty:', qty);

    const dispatch = useDispatch();
    
    const userLogin = useSelector((state) => state.userLogin) 
    const { userInfo } = userLogin



    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    // console.log('cartItems:', cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (!userInfo) {
            navigate('/login')
        } else {
            navigate('/shipping')
        }
        // navigate("/login?redirect=shipping");
        
    };

    return (
        <div>
            <h1 className="text-center">Shopping Cart</h1>

            <Row id="cart-row">
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <Message variant="info">
                            Your cart is empty <Link to="/">Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Link
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={3}>
                                            <Form.Select
                                                size="sm"
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(
                                                            item.product,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        item.countInStock
                                                    ).keys(),
                                                ].map((x) => (
                                                    <option
                                                        key={x + 1}
                                                        value={x + 1}
                                                    >
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col md={1}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() =>
                                                    removeFromCartHandler(
                                                        item.product
                                                    )
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h4>
                                    Subtotal (
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )}
                                    ) items
                                </h4>
                                $
                                {cartItems
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.qty * item.price,
                                        0
                                    )
                                    .toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item className="d-grid gap-2">
                                <Button
                                    variant="warning"
                                    type="button"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Process to Checkout
                                </Button>
                                
                            </ListGroup.Item>

                            {cartItems.length === 0 ? (
                                <a></a>
                            ) : (
                            <ListGroup.Item>
                                <a href="/">Continue Shopping</a>
                            </ListGroup.Item>)}
                        </ListGroup>
                        
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default CartScreen;
