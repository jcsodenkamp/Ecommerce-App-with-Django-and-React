import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer }  from 'react-router-bootstrap'

export default function CheckoutSteps({ step1, step2, step3, step4 }) {

  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
            <LinkContainer to='/login'className="fw-bold">
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
        ) : (
            <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
            <LinkContainer to='/shipping' className="fw-bold">
                <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
        ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
            <LinkContainer to='/payment' className="fw-bold">
                <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
        ) : (
            <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
            <LinkContainer to='/placeorder' className="fw-bold">
                <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
        ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}
