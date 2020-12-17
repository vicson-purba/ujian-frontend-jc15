import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const RadioButton = (props) => {
  const [rSelected, setRSelected] = useState(null);

  return (
    <div>
      <h5>Choose your capacity.</h5>
      <p>How much capacity is right for you?</p>
      <ButtonGroup>
        <Button color="primary" onClick={() => setRSelected(1)} active={rSelected === 1}>64GB</Button>
        <Button color="primary" onClick={() => setRSelected(2)} active={rSelected === 2}>128GB</Button>
        <Button color="primary" onClick={() => setRSelected(3)} active={rSelected === 3}>256GB</Button>
      </ButtonGroup>
    </div>
  );
}

export default RadioButton;