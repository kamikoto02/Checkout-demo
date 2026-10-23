import React from 'react';
import styles from './Users.module.css'
import { useUserCollection } from '../utils/useUserCollection';

const Users = () => {

    const {data : Orders} = useUserCollection("orders");

    if (!Orders) return null;
    
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p className={styles.title}>Brukere og bestillinger</p>
                <div>
                    {Orders.map((user) => <div className={styles.users}>
                        <p>{user.name}</p>
                        <div className={styles.user_data}>
                            <p>Dato: {user.datetime}</p>
                            <p>Total price: {user.totalPrice} kr</p>
                        </div>                       
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default Users;