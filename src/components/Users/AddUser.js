import { useState, useRef } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {
  // Refs provide a way to access DOM nodes
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [username, setUsername] = useState('');
  // const [age, setAge] = useState('');
  const [error, setError] = useState();

  // const usernameChangeHandler = (event) => {
  //   setUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setAge(event.target.value);
  // };

  const addUserHandler = (event) => {
    event.preventDefault();

    // using ref
    const refUsername = nameInputRef.current.value;
    const refAge = ageInputRef.current.value;

    if (refUsername.trim().length === 0 || refAge.trim().length === 0) {
      setError({
        title: 'Invalid User',
        message: 'Please enter a valid name and age (non-empty values)',
      });
      return;
    }
    if (+refAge < 1) {
      setError({
        title: 'Invalid Age',
        message: 'Please enter a valid age (>0)',
      });
      return;
    }

    // call addUserHandler function in App.js
    props.onAddUser(refUsername, refAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';

    // setUsername('');
    // setAge('');
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            // value={username}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor='age'>Age(years)</label>
          <input
            id='age'
            type='number'
            // value={age}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type='submit' onConfirm={errorHandler}>
            Add User
          </Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
