import React, { useState, useEffect }from "react"
import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from "react-bootstrap"
import Rating from "../components/Rating"
import axios from "axios"



function ProductScreen() {

  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {

      const { data } = await axios.get(`/products/${id}`)
      setProduct(data)
    }
    fetchProduct()
  },[])

    
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">

            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"orange"}/>
            </ListGroup.Item>

            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>


            <ListGroup.Item>
              <p class="fw-bold">Description: {product.description}</p>  
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
        <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>
                <Button className="btn btn-dark" disabled={product.countInStock === 0} type="button">Add to Cart</Button>
              <ListGroup>
              </ListGroup>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
