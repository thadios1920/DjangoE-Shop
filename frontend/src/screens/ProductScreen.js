import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Col, Image, ListGroup, Button, Card, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listProductDetails } from "../actions/productActions";
import { useDispatch,useSelector } from "react-redux";

function ProductScreen() {
  const dispatch = useDispatch()
 const {id}= useParams()
 const productDetails = useSelector(state=>state.productDetails)
 const {loading , error,product} = productDetails
  useEffect(() => {
    dispatch(listProductDetails(id))
    
  }, [dispatch]);

  

  return (
    <div>
      <Link to={"/"} className={"btn btn-light my-3"}>
        Go Back
      </Link>

    {
      loading ?
      <Loader/>
      :error
      ? <Message variant= 'danger' >{error}</Message>
      :(
        <Row>
        <Col md={6}>
          <Image
            src={"http://127.0.0.1:8000/api" + product.image}
            alt={product.name}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3> {product.name} </h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              ></Rating>
            </ListGroup.Item>

            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>

            <ListGroup.Item>Description : {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col> Price : </Col>
                  <Col>
                    {" "}
                    <strong>${product.price}</strong>{" "}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Status : </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  disabled={product.countInStock === 0}
                  type="button "
                >
                  {" "}
                  Add to card{" "}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )
    }

      
    </div>
  );
}

export default ProductScreen;
