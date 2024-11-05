// client/src/pages/StockList.tsx
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import stockStore from '../stores/StockStore';
import { Link } from 'react-router-dom';

const StockList = observer(() => {
  useEffect(() => {
    stockStore.fetchStocks(); // Fetch stocks on component mount
  }, []);

 // Filter stocks to include only those without a dot in the symbol
 const filteredStocks = stockStore.stocks.filter(stock => !stock.symbol.includes('.'));

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (text: string) => {
        // Split the text at the dot and take the first part
        const symbolBeforeDot = text.split('.')[0];
        return (
          <Link to={`https://financialmodelingprep.com/api/v3/quote/${symbolBeforeDot}?apikey=wK81sw0qFGOJKZKnNOnSS3KDplwqjpVK`}>{text}</Link>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    }
  ];


  
  return (
    <Table
      dataSource={filteredStocks}
      columns={columns}
      rowKey="symbol" // Use the stock symbol as the unique key
    />
  );
});

export default StockList;
