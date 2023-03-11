import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';

function Customer() {
  const [customers, setCustomers] = new useState(new Array());
  useEffect(() => {
    LoadDataModal();
    axios.get('http://localhost:5005/customers/all/getCustomer')
      .then((res) => {
        setCustomers(res.data);
      });
  }, [customers]);
  function LoadDataModal() {
    if(customers.length == 0)
      document.getElementById("load-data-modal").style.display = "flex";
    else
      document.getElementById("load-data-modal").style.display = "none";
  }
  return (
    <section class="component">
      <div className='header'>
        <p id="logo">FURISAS</p>
        <div>
          <span>Xin chào, Tấn</span>
          <button className='button' style={{ background: "#CC0000", border: "1px solid #CC0000" }}>Đăng xuất</button>
        </div>
      </div>
      <div className='title-container'>
        <span className='title'>Danh sách khách hàng</span>
        <div className='search-form'>
          <input placeholder='Số điện thoại...' />
          <button className='button'>Tìm</button>
        </div>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Số vé đã mua</th>
            </tr>
          </thead>
          <tbody>
            {
              customers.map((customer, index) => {
                return  <tr>
                          <td data-label="STT">{index + 1}</td>
                          <td data-label="Tên khách hàng">{customer.firstName + " " + customer.lastName}</td>
                          <td data-label="Số điện thoại">{customer.phoneNumber}</td>
                          <td data-label="Địa chỉ">{customer.address.ward}, {customer.address.district}, {customer.address.province}</td>
                          <td data-label="Số vé đã mua">{customer.quantityTicket}</td>
                        </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div className='modal-container' id='load-data-modal'>
        <div className='modal'>
          <img src='https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700' alt="load" />
        </div>
      </div>
    </section>
  );
}

export default Customer;