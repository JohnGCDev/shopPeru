import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const Loading = (props) => {
    return(
        <Row>
            <Col md={12}>
                <div className="d-flex justify-content-center">
                    <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-success"></span>
                    <p>Loading... Please wait</p>
                </div>
            </Col>
        </Row>
    );
}