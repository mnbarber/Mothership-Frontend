import { useEffect, useState, useContext } from 'react';
import styles from './Dashboard.module.css';
import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main className={styles.container}>
      <h1>Welcome, {user.username}</h1>
      <p>
        How can we assist you today?
      </p>
    </main>
  );
};

export default Dashboard;
