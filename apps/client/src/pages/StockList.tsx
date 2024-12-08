import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import stockStore from '../stores/StockStore';
import { Link } from 'react-router-dom';

const StockList = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [editingStock, setEditingStock] = useState<{ _id: string; symbol: string; name: string; price: string } | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    stockStore.fetchStocks(); // Fetch stocks when the component mounts
  }, []);

  const handleEdit = (stock: { _id: string; symbol: string; name: string; price: string }) => {
    setEditingStock(stock); // Set the stock to be edited
    form.setFieldsValue(stock); // Populate the form with stock data
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = async (id: string) => {
    try {
      await stockStore.deleteStock(id);
      message.success('Stock deleted successfully');
    } catch (error) {
      message.error('Failed to delete stock');
    }
  };

  const handleModalOk = async () => {
    try {
      const updatedData = await form.validateFields(); // Validate and get form data
      if (editingStock) {
        await stockStore.updateStock(editingStock._id, updatedData); // Update stock in the store
        message.success('Stock updated successfully');
        setIsModalOpen(false); // Close the modal
        setEditingStock(null); // Reset editing state
      }
    } catch (error) {
      console.error('Failed to update stock:', error);
      message.error('Failed to update stock');
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false); // Close the modal
    setEditingStock(null); // Reset editing state
  };

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (text: string, record: { _id: string }) => (
        <Link to={`/stocks/${record._id}`}>{text}</Link> // Use _id for routing
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
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, stock: { _id: string; symbol: string; name: string; price: string }) => (
        <>
          <Button type="link" onClick={() => handleEdit(stock)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(stock._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={stockStore.stocks}
        columns={columns}
        rowKey="_id"
      />
      {/* Edit Modal */}
      <Modal
        title="Edit Stock"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="symbol"
            label="Symbol"
            rules={[{ required: true, message: 'Symbol is required' }]}
          >
            <Input disabled /> {/* Symbol is typically not editable */}
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Price is required' },
              { pattern: /^\d+(\.\d{1,2})?$/, message: 'Enter a valid price (e.g., 123.45)' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default StockList;
