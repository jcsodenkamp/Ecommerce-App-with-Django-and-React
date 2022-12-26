import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// react-bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// components imports
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}/`, { state: qty });
    };
    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <hr />
                    <h3 className="text-center">{product.name}</h3>
                    <hr />
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>

                        <Col md={4} style={{ paddingTop: "10%" }}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>

                                    {product.countInStock > 0}

                                    {/* {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Select
                                                        size="sm"
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
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
                                            </Row>
                                        </ListGroupItem>
                                    )} */}
                                    <ListGroup.Item className="d-grid gap-2">
                                        <Button
                                            onClick={addToCartHandler}
                                            variant="outline-warning"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                            type="button"
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <a
                                            href="/"
                                            style={{ textDecoration: "none" }}
                                        >
                                            Continue Shopping
                                        </a>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>

                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2 className="text-center">Description</h2>
                                    <p>{product.description}</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                        color={"orange"}
                                    />
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default ProductScreen;
