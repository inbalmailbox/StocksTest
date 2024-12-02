import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import stockStore from '../stores/StockStore';

const StockDetails: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>(); // Get the stock symbol from URL params
  const [stockDetails, setStockDetails] = useState<any | null>(null);

  useEffect(() => {
    const fetchStockDetails = async () => {
      if (symbol) {
        const data = await stockStore.getStockById(symbol);
        if (data && data.length > 0) {
          setStockDetails(data[0]); // Ensure we're taking the first result of the array
        }
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
