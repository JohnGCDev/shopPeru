import React, { useState } from 'react';
import './App.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Main() {
  const [show, setShow] = useState(true);

  return (
    <React.Fragment>
      <Alert show={show} variant="success">
        <Alert.Heading>Que hay de nuevo?</Alert.Heading>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
            lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
            fermentum.
          </p>
          <hr/>
          <div className="d-flex justify-content-center">
            <Button onClick={()=>setShow(false)} variant="outline-success">Cierrame!</Button>
          </div>
      </Alert>
      {!show && 
        <div className="d-flex justify-content-center">
          <Button onClick={()=>setShow(true)}>Mostrar Alerta!</Button>
        </div>
      }
    </React.Fragment>
  );
}

export default Main;
