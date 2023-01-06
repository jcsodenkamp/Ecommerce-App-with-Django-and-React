import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate();
 

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate("/")
        }
    }
    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                type='search'
                placeholder='Search'
                aria-label='Search'
                className='me-2'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}

            />

            <Button type="submit" variant="outline-primary">Search</Button>
        </Form>
    )
}

export default SearchBox