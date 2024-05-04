import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/HomePage.css";
import PdfTemplate from "../InvoiceGenerater/PdfTemplate";
import Sidebar from '..//navigation/Sidebar'; 
import SearchBar from '../navigation/SearchBar'; 

function Homepage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalData, setTotalData] = useState({ sum: 0, totalUsers: 0 });

useEffect(() => {
  axios
    .get("http://localhost:5000/orders_with_details", { withCredentials: true })
    .then((res) => {
      if (res.data != null) {
        setOrders(res.data);
        calculateTotalData(res.data);
      }
    });
}, []);


const calculateTotalData = (data) => {
  const sum = data.reduce((total, order) => total + order.total_amount_paid, 0);
  const uniqueUsernames = new Set(data.map(order => order.username));
  const totalUsers = uniqueUsernames.size;
  setTotalData({ sum, totalUsers });
};


  const handleDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="bodyWrap dashboardPage">
      <Sidebar />
      <SearchBar />

      <div className="topPanelDataBox">
        <p>Total Sum of Date Range</p>
        <div>
          <h2>Rs {totalData.sum}</h2>
        </div>
      </div>
      <div className="topPanelDataBox">
        <p>Total Users</p>
        <div>
          <h2>{totalData.totalUsers}</h2>
        </div>
      </div>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Order Type</th>
              <th>Date</th>
              <th>Payment Amount</th>
              <th>Payment Method</th>
              <th>Color Price</th>
              <th>Color ID</th>
              <th>Color Name</th>
              <th>GST</th>
              <th>Total Amount (int)</th>
              <th>Total Amount (words)</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.username}</td>
                <td>{order.order_type}</td>
                <td>{order.order_date}</td>
                <td>{order.total_amount_paid}</td>
                <td>{order.payment_method}</td>
                <td>{order.color_price}</td>
                <td>{order.color_id}</td>
                <td>{order.color_name}</td>
                <td>{order.GST}</td>
                <td>{order.total_amt}</td>
                <td>{order.total_amt_in_words.replace(' dollars', '')}</td>
                <td>
                  <button onClick={() => handleDetails(order)}>Print Now</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && <PdfTemplate order={selectedOrder} />}
    </div>
  );
}

export default Homepage;
