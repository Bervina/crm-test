import React, { useEffect, useMemo, useState } from 'react';
import { onValue, ref, push } from 'firebase/database';
import { auth, db } from '../../firebase';
import style from './Travel.module.scss';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Travel = () => {
  const uid = auth.currentUser.uid;
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [numberSeats, setNumberSeats] = useState();
  const [date, setDate] = useState();
  const trips = [];
  const tripsKey = [];

  const map = data.trips;
  for (let key in map) {
    trips.push(map[key]);
    tripsKey.push(key);
  }

  useEffect(() => {
    onValue(ref(db,), snapshot => {
      const data = snapshot.val();
      setData(data);
    });
  }, [uid]);

  const writeDatabase = () => {
    push(ref(db, `/trips`), {
      from,
      to,
      numberSeats,
      date,
      uid,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

    } else {

      event.preventDefault();
      writeDatabase();
    }
    setValidated(true);
  };

  const tripsList = useMemo(() => {
    return trips.map((event, index) => <div key={index} className={style.tripsList}>
      <div>
        <p>From-{event.from} : To-{event.to}</p>
        <p>{event.date}</p>
        <p>Number of seats ={event.numberSeats}</p>
      </div>
    </div>);
  }, [trips]);

  return (
    <Form className={style.travel} noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className={style.row}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className={style.label}>From</Form.Label>
          <Form.Control
            onChange={event => setFrom(event.target.value)}
            required
            type="text"
            placeholder="From"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className={style.label}>To</Form.Label>
          <Form.Control
            onChange={event => setTo(event.target.value)}
            required
            type="text"
            placeholder="To"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className={style.row}>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label className={style.label}>Number of seats</Form.Label>
          <Form.Control
            onChange={event => setNumberSeats(event.target.value)}
            type="number"
            placeholder="Number of seats"
            required
            defaultValue="Number of seats"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label className={style.label}>Date</Form.Label>
          <Form.Control
            onChange={event => setDate(event.target.value)}
            type="date"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Create</Button>
      {tripsList}
    </Form>
  );
};

export default Travel;
