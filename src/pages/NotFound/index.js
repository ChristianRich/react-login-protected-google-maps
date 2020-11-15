import React from 'react'
import PageContainer from '../../components/PageContainer'
import { Card, Col, Row } from 'react-bootstrap'

const NotFound = (props) => (
  <PageContainer>
    <Row>
      <Col className="col-sm">
        <Card>
          <Card.Body>
            <Card.Title>404 Not Found</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {props.message && props.message}
              {props.location && props.location.pathname && (
                <>
                  Location <code>{props.location.pathname}</code> does not exist
                </>
              )}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </PageContainer>
)

export default NotFound
