import React, { useEffect, useMemo, useState } from 'react';
import style from './AdminPage.module.scss';
import Button from 'react-bootstrap/Button';
import { onValue, ref, remove, update } from 'firebase/database';
import { auth, db } from '../../firebase';
import Form from 'react-bootstrap/Form';

const AdminPage = () => {
  const uid = auth.currentUser.uid;
  const [data, setData] = useState([]);
  const users = [];

  for (let key in data) {
    users.push(data[key]);
  }

  useEffect(() => {
    onValue(ref(db), async (snapshot) => {
      const data = snapshot.val();
      setData(data?.users);
    });
  }, [uid]);
  const deleteUser = (element) => {
    remove(ref(db, `/users/${element}`));
  };
  const changeRoleUser = (user, roleUser) => {
    update(ref(db, `/users/${user}`), {
      roleUser,
    });
  };

  const writeUsers = useMemo(() => {
    return users.map((element, index) => {
      return (
        <div className={style.listUser} key={index}>
          <p>
            <strong>Surname</strong>:{element?.surname}
          </p>
          <p>
            <strong>Name</strong>:{element?.name}
          </p>
          <Form
            className={style.profile}
            onChange={(event) =>
              changeRoleUser(element.uid, event.target.value)
            }
          >
            <Form.Select aria-label="Default select example">
              <option>{element.roleUser}</option>
              <option value="Driver">Driver</option>
              <option value="Passenger">Passenger</option>
              <option value="Dispatcher">Dispatcher</option>
            </Form.Select>{' '}
          </Form>
          <Button type="submit" onClick={() => deleteUser(element?.uid)}>
            Delete
          </Button>
        </div>
      );
    });
  }, [users]);

  return <div className={style.adminBlock}>{writeUsers}</div>;
};

export default AdminPage;
