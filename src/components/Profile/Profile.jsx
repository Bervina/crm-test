import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import style from './Profile.module.scss';
import { auth, db } from '../../firebase';
import { ref, onValue, update } from 'firebase/database';

function Profile({show}) {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [car, setCar] = useState();
  const [carColor, setCarColor] = useState();
  const [carNumber, setCarNumber] = useState();
  const uid = auth.currentUser.uid;
  useEffect(() => {
    onValue(ref(db), async (snapshot) => {
      const data = snapshot.val();
      setData(data?.users);
    });

  }, [uid]);


  const checkedRole = (event) => {
    update(ref(db, `/users/${uid}`), {
      roleUser: event.target.value,
      uid,
    });
  };

  const writeDatabase = () => {
    update(ref(db, `/users/${uid}`), {
      name,
      surname,
      car,
      carColor,
      carNumber,

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
  const mainWidth = show ? '310px' : '50px';

  return (
    <>{!data ?
      <Form  className={style.profile} noValidate validated={validated} onSubmit={handleSubmit}><Form.Select
        onChange={checkedRole} aria-label="Default select example">
        <option>Open this select menu</option>
        <option value="Driver">Driver</option>
        <option value="Passenger">Passenger</option>
        <option value="Dispatcher">Dispatcher</option>
      </Form.Select> </Form> :
      <Form  className={style.profile} noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className={style.row}>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label className={style.label}>Surname</Form.Label>
            <Form.Control
              onChange={event => setSurname(event.target.value)}
              required
              type="text"
              placeholder="Surname"
              // defaultValue={data[uid]?.surname?data[uid]?.surname:''}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label className={style.label}>Name</Form.Label>
            <Form.Control
              onChange={event => setName(event.target.value)}
              required
              type="text"
              placeholder="Name"
              defaultValue={data[uid]?.name}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label className={style.label}>Car</Form.Label>
            <Form.Control
              onChange={event => setCar(event.target.value)}
              type="text"
              placeholder="Car"
              required
              defaultValue={data[uid]?.car}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label className={style.label}>Color-car</Form.Label>
            <Form.Control
              onChange={event => setCarColor(event.target.value)}
              type="text"
              placeholder="Color"
              required
              defaultValue={data[uid]?.carColor}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label className={style.label}>Car-number</Form.Label>
            <Form.Control
              onChange={event => setCarNumber(event.target.value)}
              type="text"
              placeholder="Car-number"
              required
              defaultValue={data[uid]?.carNumber}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Save</Button>
      </Form>}</>
  );
}

export default Profile;
