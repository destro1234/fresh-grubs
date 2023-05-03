import React, { useContext } from 'react';
import { UserContext } from '../context/user.js';
import OrderCard from './OrderCard.js';
import NavBar from './NavBar.js';

function OrdersLog() {
  const { currentUser } = useContext(UserContext);
  const { newOrderItems } = useContext(UserContext);

  console.log(currentUser);

  return (
    <div>
      <NavBar />

      {currentUser.orders.length > 0 ? (
        <div>
          <h1>These are your orders!</h1>
          {currentUser.orders.map((order) => {
            return <OrderCard key={order.id} order={order} />;
          })}
        </div>
      ) : <h1>You have no order! Go back to the menu!</h1>}
    </div>
  );
}

export default OrdersLog;



