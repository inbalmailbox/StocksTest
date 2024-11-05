// client/src/pages/StockDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import stockStore from '../stores/StockStore';


const StockDetails: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>(); // Get the stock symbol from URL params
  const [stockDetails, setStockDetails] = useState<any>(null);

  useEffect(() => {
    const fetchStockDetails = async () => {
       // console.log("fetchStockDetails-start");
        if(symbol){
           // console.log("fetchStockDetails-symbol is not non");
      const data = await stockStore.getStockById(symbol);
       //console.log("data is"+data);
      setStockDetails(data);
        }
        else{
           // console.log("eroor inllll");
        }
    };
    fetchStockDetails();
  }, [symbol]);

  if (!stockDetails) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <div>
      <h2>{stockDetails.name} ({stockDetails.symbol})</h2>
      <p>Price: {stockDetails.price}</p>
      <p>Stock Exchange: {stockDetails.stockExchange}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default StockDetails;
