import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Table } from 'antd';
import stockStore from '../stores/StockStore';
import { Link } from 'react-router-dom';

const StockList = observer(() => {
  useEffect(() => {
    stockStore.fetchStocks(); // Fetch stocks once
  }, []);

  const filteredStocks = stockStore.stocks.filter(stock => !stock.symbol.includes('.'));

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (text: string) => (
        <Link to={`/stocks/${text}`}>{text}</Link> // Link to StockDetails component
      ),
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
    },
  ];

  return (
    <Table
      dataSource={filteredStocks}
      columns={columns}
      rowKey="symbol"
    />
  );
});

export default StockList;
