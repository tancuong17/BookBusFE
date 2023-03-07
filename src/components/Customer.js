import React from 'react';
import '../App.css';

function Customer() {
  return (
    <section id="BusLine">
      <div className='header'>
        <span>Xin chào, Tấn</span>
        <button className='button'>Đăng xuất</button>
      </div>
      <div className='title-container'>
        <span className='title'>Danh sách khách hàng</span>
        <div className='search-form'>
          <input placeholder='Số điện thoại...'/>
          <button className='button'>Tìm</button>
        </div>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th scope="col">Mã khách hàng</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Mã khách hàng">001</td>
              <td data-label="Tên khách hàng">Nguyễn Công Phượng</td>
              <td data-label="Số điện thoại">0325856985</td>
              <td data-label="Địa chỉ">180 Phan Huy Ích, phường 12, quận Gò Vấp, tp.Hồ Chí Minh</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Customer;