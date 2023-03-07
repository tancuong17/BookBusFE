import React, { useRef } from 'react';
import '../App.css';
import { useReactToPrint } from 'react-to-print';

function Ticket() {
  const componentRef = useRef();
  function OpenTicketModal() {
    document.getElementById("detail-ticket-modal").style.display = "flex";
  }
  function CloseTicketModal() {
    document.getElementById("detail-ticket-modal").style.display = "none";
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <section id="BusLine">
      <div className='header'>
        <span>Xin chào, Tấn</span>
        <button className='button'>Đăng xuất</button>
      </div>
      <div className='title-container'>
        <span className='title'>Danh sách vé xe</span>
        <div className='search-form'>
          <input placeholder='Mã vé...' />
          <button className='button'>Tìm</button>
        </div>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th scope="col">Mã vé</th>
              <th scope="col">Khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Ngày đặt</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Mã vé">001</td>
              <td data-label="Khách hàng">Nguyễn Hoàng Đức</td>
              <td data-label="Số điện thoại">0325856985</td>
              <td data-label="Ngày đặt">14:00:00 25/03/2007</td>
              <td data-label="Trạng thái">Đã thanh toán</td>
              <td data-label="" className='button-container'>
                <button onClick={OpenTicketModal} className='button'>Chi tiết</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='modal-container' id='detail-ticket-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Chi tiết vé</span>
            <img className='exit-icon' onClick={CloseTicketModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal' ref={componentRef}>
            <p class="title-ticket">Nhà xe FURISAS</p>
            <p class="address">Đ/c: 160 Quang Trung, phường 10, Gò Vấp, tp.Hồ Chí Minh<br />Hotline: 1900 1800</p>
            <div className='input-modal'>
              <span>Họ và tên:</span>
              <span>Nguyễn Tấn Cường</span>
            </div>
            <div className='input-modal'>
              <span>Số điện thoại:</span>
              <span>0382578556</span>
            </div>
            <div className='input-modal'>
              <span>Tuyến:</span>
              <span>Sài Gòn đi Đà Lạt</span>
            </div>
            <div className='input-modal'>
              <span>Xe:</span>
              <span>51H-45263</span>
            </div>
            <div className='input-modal'>
              <span>Ngày lên xe:</span>
              <span>14:00:00 20/02/2008</span>
            </div>
            <div className='input-modal'>
              <span>Danh sách ghế:</span>
              <span>A-01, A-02</span>
            </div>
            <div className='input-modal'>
              <span>Điểm lên:</span>
              <span>Bến xe Miền Đông</span>
            </div>
            <div className='input-modal'>
              <span>Điểm xuống:</span>
              <span>Bến xe Đà Lạt</span>
            </div>
            <div className='input-modal'>
              <span>Tổng tiền:</span>
              <span>500,000đ</span>
            </div>
            <div className='input-modal'>
              <span>Trạng thái:</span>
              <span>Đã thanh toán</span>
            </div>
            <div className='input-modal'>
              <span>Mã vé:</span>
              <img src='https://www.qrcode-gen.com/images/qrcode-default.png' alt='bar-code' />
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={handlePrint}>In vé</button>
            <button className='button'>Hủy vé</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ticket;