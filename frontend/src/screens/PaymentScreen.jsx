import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions"

function PaymentScreen() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.addrss) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check 
                        type="radio" 
                        label="PayPay or Credit Card" 
                        id="paypal" 
                        name="paymentMethod"
                        variant='warning' 
                        checked 
                        onChange={(e) => setPaymentMethod(e.target.value) }>
                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type="submit" variant="outline-warning">Continue</Button>
        </Form>
      
    </FormContainer>
  )
}

export default PaymentScreen
