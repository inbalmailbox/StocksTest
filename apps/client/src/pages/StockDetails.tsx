import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Spin, Alert } from 'antd';
import stockStore from '../stores/StockStore';

const StockDetails: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>(); // Extract stock symbol from URL
  const [stockDetails, setStockDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        if (symbol) {
          const data = await stockStore.getStockById(symbol);
          if (data && data.length > 0) {
            setStockDetails(data[0]); // Take the first result
          } else {
            setError('Stock details not found.'); // Handle empty array
          }
        } else {
          setError('Invalid stock symbol.');
        }
      } catch (e) {
        setError('An error occurred while fetching stock details.');
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [symbol]);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  return (
    <Card
      title={`${stockDetails.name} (${stockDetails.symbol})`}
      bordered={true}
      style={{ width: 600, margin: '20px auto' }}
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Price">{stockDetails.price}</Descriptions.Item>
        <Descriptions.Item label="Stock Exchange">{stockDetails.stockExchange}</Descriptions.Item>
        {/* Add more details as necessary */}
      </Descriptions>
    </Card>
  );
};

export default StockDetails;
