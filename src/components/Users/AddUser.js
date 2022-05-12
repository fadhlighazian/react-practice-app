import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './AddUser.module.css';
import { useState } from 'react';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState();

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: 'Invalid User',
        message: 'Please enter a valid name and age (non-empty values)',
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: 'Invalid Age',
        message: 'Please enter a valid age (>0)',
      });
      return;
    }

    // call addUserHandler function in App.js
    props.onAddUser(username, age);
    console.log(username, age);
    setUsername('');
    setAge('');
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
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
            value={username}
            onChange={usernameChangeHandler}
          />
          <label htmlFor='age'>Age(years)</label>
          <input
            id='age'
            type='number'
            value={age}
            onChange={ageChangeHandler}
          />
          <Button type='submit' onConfirm={errorHandler}>
            Add User
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
