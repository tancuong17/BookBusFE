import React, { useRef, useEffect, useState } from 'react';
import '../App.css';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

function Ticket() {
  const componentRef = useRef();
  const [tickets, setTickets] = new useState(new Array());
  useEffect(() => {
    axios.get('http://localhost:5005/tickets/all/getTicket')
      .then((res) => {
        setTickets(res.data);
      });
  }, [tickets]);
  function OpenTicketModal(idTicket) {
    tickets.map(ticket => {
      if (ticket._id === idTicket) {
        let chairs = new Array();
        ticket.chair.map(chair => {
          chairs.push(chair.seats);
        });
        document.getElementById("id").innerHTML = ticket._id;
        document.getElementById("name").innerHTML = ticket.firstName + " " + ticket.lastName;
        document.getElementById("phonenumber").innerHTML = ticket.phoneNumber;
        document.getElementById("route").innerHTML = ticket.departure.name + " đến " + ticket.destination.name;
        document.getElementById("bus").innerHTML = ticket.licensePlates;
        document.getElementById("startDate").innerHTML = new Date(new Date(ticket.startDate).getTime() - 7 * 3600 * 1000).toLocaleString();
        document.getElementById("chairs").innerHTML = chairs.toString();
        document.getElementById("busStop1").innerHTML = ticket.locaDeparture.address.name;
        document.getElementById("total").innerHTML = (ticket.chair.length * ticket.price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "đ";
        document.getElementById("status").innerHTML = (ticket.status) ? "Đã thanh toán" : "Đã hủy";
      }
    })
    document.getElementById("detail-ticket-modal").style.display = "flex";
  }
  function CloseTicketModal() {
    document.getElementById("detail-ticket-modal").style.display = "none";
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <section class="component">
      <div className='header'>
        <p id="logo">FURISAS</p>
        <div>
          <span>Xin chào, Tấn</span>
          <button className='button' style={{background: "#CC0000", border: "1px solid #CC0000"}}>Đăng xuất</button>
        </div>
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
            {
              tickets.map(ticket => {
                return <tr>
                  <td data-label="Mã vé">{ticket._id}</td>
                  <td data-label="Khách hàng">{ticket.firstName + " " + ticket.lastName}</td>
                  <td data-label="Số điện thoại">{ticket.phoneNumber}</td>
                  <td data-label="Ngày đặt">{new Date(new Date(ticket.createdAt).getTime() - 7 * 3600 * 1000).toLocaleString()}</td>
                  <td data-label="Trạng thái">Đã thanh toán</td>
                  <td data-label="" className='button-container'>
                    <button onClick={() => OpenTicketModal(ticket._id)} className='button'>Chi tiết</button>
                  </td>
                </tr>
              })
            }
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
              <span>Mã vé:</span>
              <span id="id"></span>
            </div>
            <div className='input-modal'>
              <span>Họ và tên:</span>
              <span id="name"></span>
            </div>
            <div className='input-modal'>
              <span>Số điện thoại:</span>
              <span id="phonenumber"></span>
            </div>
            <div className='input-modal'>
              <span>Tuyến:</span>
              <span id="route">Sài Gòn đi Đà Lạt</span>
            </div>
            <div className='input-modal'>
              <span>Xe:</span>
              <span id="bus">51H-45263</span>
            </div>
            <div className='input-modal'>
              <span>Ngày lên xe:</span>
              <span id="startDate">14:00:00 20/02/2008</span>
            </div>
            <div className='input-modal'>
              <span>Danh sách ghế:</span>
              <span id="chairs">A-01, A-02</span>
            </div>
            <div className='input-modal'>
              <span>Điểm lên:</span>
              <span id="busStop1">Bến xe Miền Đông</span>
            </div>
            <div className='input-modal'>
              <span>Tổng tiền:</span>
              <span id="total">500,000đ</span>
            </div>
            <div className='input-modal'>
              <span>Trạng thái:</span>
              <span id="status">Đã thanh toán</span>
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