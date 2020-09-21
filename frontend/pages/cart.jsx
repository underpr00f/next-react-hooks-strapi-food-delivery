/* /pages/restaurants.js */
import React from 'react'
// import { useContext } from "react";
import CartPage from "../components/cart/CartPage";
// import AppContext from "../../../context/AppContext";
// import {errorSlugChecker} from "../../../utils/errorChecker";
// import { API_URL } from '../../../utils/constants'

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

export default function Cart () {
    return (
    <>
        <h1>Cart Page</h1>
        <Row>
            <Col xs="12" style={{ padding: 0 }}>
                <div>
                <CartPage />
                </div>
            </Col>
        </Row>
    </>
    );
}
