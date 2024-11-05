import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import stockStore from '../stores/StockStore';
import Welcome from '../components/Welcome';
import StockList from '../pages/StockList';

const Home = observer(() => {
    useEffect(() => {
      stockStore.fetchStocks(); // Fetch stocks on component load
    }, []);
  
    return (
        
        <div>
            <Welcome></Welcome>
        
        </div>
     
    );
  });
  
  export default Home;