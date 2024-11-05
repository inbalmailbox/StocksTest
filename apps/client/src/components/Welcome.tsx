// src/components/Home.tsx
import React from 'react';
import { observer } from 'mobx-react';
import stockStore from '../stores/StockStore';
import userStore from '../stores/UserStore';




// After successful login
//userStore.setUsername('John Doe'); // Replace 'John Doe' with the actual username

const Welcome: React.FC = observer(() => {
  return (
    <div>
      <h1>Hey {userStore.username}, Your stock portfolio</h1>
    </div>

    
  );
});

export default Welcome;
