import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { TbBus } from 'react-icons/tb';
import { SiCashapp } from 'react-icons/si';
import { RxUpdate } from 'react-icons/rx';
import { GiSteeringWheel } from 'react-icons/gi';

function BusLine() {

  const [titleBusTripModal, setTitleBusTripModal] = new useState();
  const [titlePriceTableModal, setTitlePriceTableModal] = new useState();
  const [titleUpdateBusLineModal, setTitleUpdateBusLineModal] = new useState();
  const [titleBookticketModal, setTitleBookticketModal] = new useState();
  const [busTrips, setBusTrips] = new useState(new Array());
  const [buses, setBuses] = new useState(new Array());
  const [prices, setPrices] = new useState(new Array());
  const [places, setPlaces] = new useState(new Array());
  const [routes, setRoutes] = new useState(new Array());
  const [routeChoosed, setRouteChoosed] = new useState();
  const [busTripChoosed, setBusTripChoosed] = new useState(new Array());
  const [chairListChoose, setChairListChoose] = new useState(new Array());
  useEffect(() => {
    axios.get('http://localhost:5005/routes/all/getVehicleRoute')
      .then((res) => {
        setBusTrips(res.data);
      });
    axios.get('http://localhost:5005/places/all/getPlace')
      .then((res) => {
        setPlaces(res.data);
      });
    axios.get('http://localhost:5005/places/all/getRoute')
      .then((res) => {
        setRoutes(res.data);
      })
    axios.get('http://localhost:5005/cars/all/getCars')
      .then((res) => {
        setBuses(res.data);
      })
    axios.get('http://localhost:5005/prices/all/getPrice')
      .then((res) => {
        setPrices(res.data);
      })
  }, [routes, busTrips, prices]);
  function OpenBusTripModal(routeId, departureName, destinationName) {
    document.getElementById("bus-trip-modal").style.display = "flex";
    routes.map(route => {
      if (route._id === routeId)
        setRouteChoosed(route);
    })
    setTitleBusTripModal(departureName + " đến " + destinationName);
  }
  function CloseBusTripModal() {
    document.getElementById("bus-trip-modal").style.display = "none";
  }
  function OpenAddBusTripModal() {
    if (routeChoosed.status)
      document.getElementById("add-bus-trip-modal").style.display = "flex";
    else
      alert("Tuyến xe này đã ngừng hoạt động không thể tạo chuyến!")
  }
  function CloseAddBusTripModal() {
    document.getElementById("add-bus-trip-modal").style.display = "none";
  }
  function OpenUpdateBusLineModal(routeId, departureName, destinationName) {
    routes.map(route => {
      if (route._id === routeId)
        setRouteChoosed(route);
    })
    setTitleUpdateBusLineModal("Cập nhật tuyến xe " + departureName + " đến " + destinationName);
    document.getElementById("update-bus-line-modal").style.display = "flex";
  }
  function CloseUpdateBusLineModal() {
    document.getElementById("update-bus-line-modal").style.display = "none";
  }
  function OpenAddBusLineModal() {
    document.getElementById("add-bus-line-modal").style.display = "flex";
  }
  function CloseAddBusLineModal() {
    document.getElementById("add-bus-line-modal").style.display = "none";
  }
  function OpenPriceTableModal(routeId, departureName, destinationName) {
    document.getElementById("price-table-modal").style.display = "flex";
    routes.map(route => {
      if (route._id === routeId)
        setRouteChoosed(route);
    })
    setTitlePriceTableModal("Bảng giá của tuyến " + departureName + " đến " + destinationName);
  }
  function ClosePriceTableModal() {
    document.getElementById("price-table-modal").style.display = "none";
  }
  function OpenAddPriceTableModal() {
    document.getElementById("add-price-table-modal").style.display = "flex";
  }
  function CloseAddPriceTableModal() {
    document.getElementById("add-price-table-modal").style.display = "none";
  }
  function AddBusLine() {
    let provinceFromAdd = document.getElementById("provinceFromAdd").value;
    let provinceToAdd = document.getElementById("provinceToAdd").value;
    let typeBus = document.getElementById("typeBus").value;
    let timeBusLine = document.getElementById("timeBusLine").value;
    let code = [];
    let checkRoute = false;
    places.map(place => {
      if (provinceFromAdd === place._id || provinceToAdd === place._id)
        code.push(place.code);
    })
    routes.map(route => {
      if (route.code === code[0] + "-" + code[1])
        checkRoute = true;
    })
    if (provinceFromAdd === provinceToAdd)
      alert("Nơi đi và nơi đến không được giống nhau!");
    else if (checkRoute)
      alert("Tuyến xe này đã tồn tại!");
    else {
      let data = {
        carTypeId: typeBus,
        intendTime: timeBusLine,
        departureId: provinceFromAdd,
        destinationId: provinceToAdd,
        code: code[0] + "-" + code[1]
      };
      axios.post('http://localhost:5005/places/addRoute', data)
        .then((res) => {
          alert("Thêm tuyến thành công!");
          CloseAddBusLineModal();
        })
    }
  }
  function AddBusTrip() {
    let bus = document.getElementById("bus").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    if (startDate === null || endDate === null)
      alert("Bạn chưa chọn ngày bắt đầu hoặc ngày kết thúc!");
    else {
      let data = {
        startDate: startDate,
        endDate: endDate,
        routeId: routeChoosed._id,
        arrayId: [bus]
      }
      axios.post('http://localhost:5005/routes/addRoute', data)
        .then((res) => {
          alert("Thêm chuyến xe thành công!");
          CloseAddBusTripModal();
        })
    }
  }
  function UpdateBusLine() {
    let typeBusUpdate = document.getElementById("typeBusUpdate").value;
    let timeBusLineUpdate = document.getElementById("timeBusLineUpdate").value;
    let statusBusLineUpdate = document.getElementById("statusBusLineUpdate").value;
    let data = {
      typeBusUpdate: typeBusUpdate,
      timeBusLineUpdate: timeBusLineUpdate,
      routeId: routeChoosed._id,
      statusBusLineUpdate: statusBusLineUpdate
    }
    axios.post('http://localhost:5005/places/updateRoute', data)
      .then((res) => {
        alert("Cập nhật tuyến thành công!");
        CloseUpdateBusLineModal();
      })
  }
  function AddPrice() {
    let namePrice = document.getElementById("namePrice").value;
    let startDatePrice = document.getElementById("startDatePrice").value;
    let endDatePrice = document.getElementById("endDatePrice").value;
    let ticketPrice = document.getElementById("ticketPrice").value;
    let checkPrice = false;
    prices.map(price => {
      if (new Date(price.startDate).getTime() <= new Date(startDatePrice).getTime() && new Date(price.endDate).getTime() >= new Date(endDatePrice).getTime())
        checkPrice = true;
      else if (new Date(price.startDate).getTime() >= new Date(startDatePrice).getTime() && new Date(price.endDate).getTime() <= new Date(endDatePrice).getTime())
        checkPrice = true;
      else if (new Date(price.startDate).getTime() <= new Date(startDatePrice).getTime() && new Date(price.endDate).getTime() >= new Date(startDatePrice).getTime())
        checkPrice = true;
      else if (new Date(price.startDate).getTime() <= new Date(endDatePrice).getTime() && new Date(price.endDate).getTime() >= new Date(endDatePrice).getTime())
        checkPrice = true;
    })
    if (checkPrice)
      alert("Khoảng thời gian này đã có bảng giá!");
    else {
      let data = {
        startDate: startDatePrice,
        endDate: endDatePrice,
        priceTicket: ticketPrice,
        routeId: routeChoosed._id,
        title: namePrice
      }
      axios.post('http://localhost:5005/prices/addPrice', data)
        .then((res) => {
          alert("Thêm bảng giá thành công!");
          CloseAddPriceTableModal();
        })
    }
  }
  function OpenBookingTicketModal(busTrip, startDate) {
    busTripChoosed[0] = busTrip;
    let date = new Date(new Date(startDate).getTime() - 7 * 3600 * 1000).toLocaleString();
    setTitleBookticketModal(date);
    document.getElementById("book-ticket-modal").style.display = "flex";
    CloseBusTripModal();
  }
  function CloseBookingTicketModal() {
    document.getElementById("book-ticket-modal").style.display = "none";
    OpenBusTripModal(routeChoosed._id, routeChoosed.departure.name, routeChoosed.destination.name);
  }
  function ChooseChair(e) {
    let text = e.target.innerHTML;
    let style = window.getComputedStyle(e.target);
    let bg = style.getPropertyValue("background-color");
    let listChair = [...chairListChoose];
    if (text !== "X" && bg == "rgb(255, 255, 255)"){
      e.target.style.background = "lightgray";
      listChair.push(text);
      setChairListChoose(listChair);
    }
    else if (text !== "X" && bg == "rgb(211, 211, 211)"){
      e.target.style.background = "white";
      setChairListChoose(listChair.filter(chair => chair != text));
    }
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
        <span className='title'>Danh sách tuyến xe</span>
        <div id='search-exit-container'>
          <div className='search-form'>
            <select>
              <option value={"0"}>---Chọn nơi đi---</option>
              {
                places.map(place => {
                  return <option value={place._id}>{place.name}</option>
                })
              }
            </select>
            <span>{"đến"}</span>
            <select>
              <option value={"0"}>---Chọn nơi đến---</option>
              {
                places.map(place => {
                  return <option value={place._id}>{place.name}</option>
                })
              }
            </select>
            <button className='button'>Tìm</button>
          </div>
          <button className='button' style={{ background: "#330099", border: "1px solid #330099" }} onClick={OpenAddBusLineModal}>Thêm tuyến xe</button>
        </div>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th scope="col">Mã tuyến</th>
              <th scope="col">Nơi đi</th>
              <th scope="col">Nơi đến</th>
              <th scope="col">Loại xe</th>
              <th scope="col">Số giờ</th>
              <th scope="col">Giá vé</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              routes.map(route => {
                return <tr>
                  <td data-label="Mã tuyến">{route.code}</td>
                  <td data-label="Nơi đi">{route.departure.name}</td>
                  <td data-label="Nơi đến">{route.destination.name}</td>
                  <td data-label="Loại xe">{route.carType}</td>
                  <td data-label="Số giờ">{route.intendTime}</td>
                  <td data-label="Giá vé">{route.price.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</td>
                  <td data-label="Trạng thái">{(route.status) ? "Đang hoạt động" : "Ngưng hoạt động"}</td>
                  <td data-label="" className='button-container'>
                    <button style={{ background: "#006633", border: "1px solid #006633" }} className='button' onClick={() => OpenBusTripModal(route._id, route.departure.name, route.destination.name)}><TbBus className='icon' /></button>
                    <button style={{ background: "#FF9900", border: "1px solid #FF9900" }} className='button' onClick={() => OpenPriceTableModal(route._id, route.departure.name, route.destination.name)}><SiCashapp className='icon' /></button>
                    <button className='button' onClick={() => OpenUpdateBusLineModal(route._id, route.departure.name, route.destination.name)}><RxUpdate className='icon' /></button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div className='modal-container' id='bus-trip-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Danh sách chuyến xe của tuyến {titleBusTripModal}</span>
            <div id='search-exit-container'>
              <div className='search-form'>
                <input type={'date'} />
                <button className='button'>Tìm</button>
              </div>
              <img className='exit-icon' onClick={CloseBusTripModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
            </div>
          </div>
          <div className='body-modal'>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Biển số xe</th>
                    <th scope="col">Loại xe</th>
                    <th scope="col">Ngày đi</th>
                    <th scope="col">Ngày đến</th>
                    <th scope="col">Giá vé</th>
                    <th scope="col">Còn trống</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    busTrips.map(busTrip => {
                      if (routeChoosed != null && busTrip.departure._id === routeChoosed.departure._id && busTrip.destination._id === routeChoosed.destination._id
                        && new Date(busTrip.price.startDate).getTime() <= new Date().getTime() && new Date(busTrip.price.endDate).getTime() >= new Date().getTime()
                        && busTrip.price.routeId === routeChoosed._id)
                        return <tr>
                          <td data-label="Biển số xe">{busTrip.licensePlates}</td>
                          <td data-label="Loại xe">{busTrip.carType}</td>
                          <td data-label="Ngày đi">{new Date(new Date(busTrip.startDate).getTime() - 7 * 3600 * 1000).toLocaleString()}</td>
                          <td data-label="Ngày đến">{new Date(new Date(busTrip.endDate).getTime() - 7 * 3600 * 1000).toLocaleString()}</td>
                          <td data-label="Giá vé">{busTrip.price.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</td>
                          <td data-label="Còn trống">{busTrip.chair.filter(chair => chair.status === true).length}/{busTrip.chair.length}</td>
                          <td data-label="" className='button-container'><button className='button' onClick={() => OpenBookingTicketModal(busTrip, busTrip.startDate)}>Đặt vé</button></td>
                        </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={OpenAddBusTripModal}>Thêm chuyến</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='add-bus-trip-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Thêm chuyến xe</span>
            <img className='exit-icon' onClick={CloseAddBusTripModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>Xe khách:</span>
              <select id="bus">
                {
                  buses.map(bus => {
                    if (routeChoosed != null && bus.carType.type === routeChoosed.carType)
                      return <option value={bus._id}>{bus.licensePlates}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Ngày bắt đầu:</span>
              <input type={'datetime-local'} id="startDate" />
            </div>
            <div className='input-modal'>
              <span>Ngày kết thúc:</span>
              <input type={'date'} id="endDate" />
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={AddBusTrip}>Thêm chuyến</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='add-bus-line-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Thêm tuyến xe</span>
            <img className='exit-icon' onClick={CloseAddBusLineModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>Nơi đi:</span>
              <select id="provinceFromAdd">
                {
                  places.map(place => {
                    return <option value={place._id}>{place.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Nơi đến:</span>
              <select id="provinceToAdd">
                {
                  places.map(place => {
                    return <option value={place._id}>{place.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Loại xe:</span>
              <select id="typeBus">
                <option value={'63b285db42d513adac65bcb5'}>Xe Limousine</option>
                <option value={'63b281f4d571739a200fac6c'}>Xe Thường</option>
              </select>
            </div>
            <div className='input-modal'>
              <span>Số giờ:</span>
              <input type={'number'} defaultValue={0} min={0} id="timeBusLine" />
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={AddBusLine}>Thêm tuyến</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='update-bus-line-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>{titleUpdateBusLineModal}</span>
            <img className='exit-icon' onClick={CloseUpdateBusLineModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>Loại xe:</span>
              <select id="typeBusUpdate">
                <option value={'63b285db42d513adac65bcb5'}>Xe Limousine</option>
                <option value={'63b281f4d571739a200fac6c'}>Xe Thường</option>
              </select>
            </div>
            <div className='input-modal'>
              <span>Số giờ:</span>
              <input type={'number'} defaultValue={0} min={0} id="timeBusLineUpdate" />
            </div>
            <div className='input-modal'>
              <span>Trạng thái:</span>
              <select id="statusBusLineUpdate">
                <option value={true}>Đang hoạt động</option>
                <option value={false}>Ngưng hoạt động</option>
              </select>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={UpdateBusLine}>Cập nhật</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='add-price-table-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Thêm bảng giá</span>
            <img className='exit-icon' onClick={CloseAddPriceTableModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>Tên bảng giá:</span>
              <input id="namePrice" />
            </div>
            <div className='input-modal'>
              <span>Ngày bắt đầu:</span>
              <input type={'date'} id="startDatePrice" />
            </div>
            <div className='input-modal'>
              <span>Ngày kết thúc:</span>
              <input type={'date'} id="endDatePrice" />
            </div>
            <div className='input-modal'>
              <span>Giá vé:</span>
              <input type={'number'} defaultValue={0} min={0} id="ticketPrice" />
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={AddPrice}>Thêm bảng giá</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='price-table-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>{titlePriceTableModal}</span>
            <div id='search-exit-container'>
              <div className='search-form'>
                <input placeholder='Mã bảng giá...' />
                <button className='button'>Tìm</button>
              </div>
              <img className='exit-icon' onClick={ClosePriceTableModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
            </div>
          </div>
          <div className='body-modal'>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Mã bảng giá</th>
                    <th scope="col">Tên bảng giá</th>
                    <th scope="col">Ngày bắt đầu</th>
                    <th scope="col">Ngày kết thúc</th>
                    <th scope="col">Giá vé</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    prices.map(price => {
                      if (routeChoosed != null && price.route._id === routeChoosed._id)
                        return <tr>
                          <td data-label="Mã bảng giá">{price._id}</td>
                          <td data-label="Tên bảng giá">{price.title}</td>
                          <td data-label="Ngày bắt đầu">{new Date(new Date(price.startDate).getTime() - 7 * 3600 * 1000).toLocaleDateString()}</td>
                          <td data-label="Ngày kết thúc">{new Date(new Date(price.endDate).getTime() - 7 * 3600 * 1000).toLocaleDateString()}</td>
                          <td data-label="Giá vé">{price.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</td>
                          <td data-label="Trạng thái">{(new Date(new Date(price.startDate).getTime() - 7 * 3600 * 1000) <= new Date().getTime() && new Date(new Date(price.endDate).getTime() - 7 * 3600 * 1000).getTime() >= new Date().getTime()) ? "Đang sử dụng" : "Không sử dụng"}</td>
                          <td data-label="" className='button-container'><button className='button'>Cập nhật</button></td>
                        </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={OpenAddPriceTableModal}>Thêm bảng giá</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='book-ticket-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Đặt vé xe tuyến {titleBusTripModal} - {titleBookticketModal}</span>
            <img className='exit-icon' onClick={CloseBookingTicketModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal' style={{ display: "grid", gridTemplateColumns: "2fr 3fr" }}>
            <div id="chair-container">
              {
                busTripChoosed.map(busTrip => {
                  if (busTrip.carType == "Xe Limousine")
                    return <>
                      <div class="floor">
                        <div>
                          <p>Tầng 1</p>
                          <GiSteeringWheel className='icon' />
                        </div>
                        <table>
                          <tbody>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[0].status) ? "X" : "A-01"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[1].status) ? "X" : "A-02"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[2].status) ? "X" : "A-03"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[3].status) ? "X" : "A-04"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }} >{(busTrip.chair[4].status) ? "X" : "A-05"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[5].status) ? "X" : "A-06"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[6].status) ? "X" : "A-07"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[7].status) ? "X" : "A-08"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[8].status) ? "X" : "A-09"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[9].status) ? "X" : "A-10"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[10].status) ? "X" : "A-11"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[11].status) ? "X" : "A-12"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[12].status) ? "X" : "A-13"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[13].status) ? "X" : "A-14"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[14].status) ? "X" : "A-15"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[15].status) ? "X" : "A-16"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[16].status) ? "X" : "A-17"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[17].status) ? "X" : "A-18"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="floor">
                        <p>Tầng 2</p>
                        <table>
                          <tbody>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[18].status) ? "X" : "B-01"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[19].status) ? "X" : "B-02"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[20].status) ? "X" : "B-03"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[21].status) ? "X" : "B-04"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }} >{(busTrip.chair[22].status) ? "X" : "B-05"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[23].status) ? "X" : "B-06"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[24].status) ? "X" : "B-07"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[25].status) ? "X" : "B-08"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[26].status) ? "X" : "B-09"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[27].status) ? "X" : "B-10"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[28].status) ? "X" : "B-11"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[29].status) ? "X" : "B-12"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[30].status) ? "X" : "B-13"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[31].status) ? "X" : "B-14"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[32].status) ? "X" : "B-15"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[33].status) ? "X" : "B-16"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[34].status) ? "X" : "B-17"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[35].status) ? "X" : "B-18"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  else
                    return <>
                      <div class="floor" id="normalBus">
                        <div>
                          <p>Tầng 1</p>
                          <GiSteeringWheel className='icon' />
                        </div>
                        <table>
                          <tbody>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[0].status) ? "X" : "01"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[1].status) ? "X" : "02"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[2].status) ? "X" : "03"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[3].status) ? "X" : "04"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[4].status) ? "X" : "05"}</td>
                              <td style={{ border: "1px solid lightgray" }}>{(busTrip.chair[5].status) ? "X" : "06"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[6].status) ? "X" : "07"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[7].status) ? "X" : "08"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[8].status) ? "X" : "09"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[9].status) ? "X" : "10"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[10].status) ? "X" : "11"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[11].status) ? "X" : "12"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[12].status) ? "X" : "13"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[13].status) ? "X" : "14"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[14].status) ? "X" : "15"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[15].status) ? "X" : "16"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[16].status) ? "X" : "17"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[17].status) ? "X" : "18"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[18].status) ? "X" : "19"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[19].status) ? "X" : "20"}</td>
                            </tr>
                            <tr>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[20].status) ? "X" : "21"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[21].status) ? "X" : "22"}</td>
                              <td></td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[22].status) ? "X" : "23"}</td>
                              <td onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[23].status) ? "X" : "24"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="floor" id="floor-empty">
                        <p>X</p>
                      </div>
                    </>
                })
              }
            </div>
            <div id="info-customer-form">
              <p>Thông tin khách hàng:</p>
              <div className='input-modal'>
                <span>Họ:</span>
                <input />
              </div>
              <div className='input-modal'>
                <span>Tên:</span>
                <input />
              </div>
              <div className='input-modal'>
                <span>Số điện thoại:</span>
                <input />
              </div>
              <div className='input-modal'>
                <span>Địa chỉ:</span>
                <div id="address-customer">
                  <select>
                    <option>Tỉnh thành</option>
                    <option>Sài Gòn</option>
                    <option>Đà Lạt</option>
                  </select>
                  <select>
                    <option>Quận huyện</option>
                    <option>Sài Gòn</option>
                    <option>Đà Lạt</option>
                  </select>
                  <select>
                    <option>Xã phường</option>
                    <option>Đà Lạt</option>
                  </select>
                </div>
              </div>
              <div className='input-modal'>
                <span>Danh sách ghế: </span>
                <p>{chairListChoose.toString()}</p>
              </div>
              <div className='input-modal'>
                <span>Tổng tiền vé: </span>
                <p>500,000đ</p>
              </div>
              <div className='input-modal'>
                <span>Khuyến mãi: </span>
                <p>Giảm 10% với hóa đơn trên 500,000đ</p>
              </div>
              <div className='input-modal'>
                <span>Số tiền giảm: </span>
                <p>50,000đ</p>
              </div>
              <div className='input-modal'>
                <span>Tổng tiền thanh toán: </span>
                <p>450,000đ</p>
              </div>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={OpenAddPriceTableModal}>Đặt vé</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusLine;