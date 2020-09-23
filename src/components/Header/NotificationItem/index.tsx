import React from 'react';

// import { Container } from './styles';

const NotificationItem = ({data}) => {
  return (
      <div style={{padding: "15px"}}>
        <p>{data.description}</p>
      </div>
  );
}

export default NotificationItem;