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
  const [promotionChoosed, setPromotionChoosed] = new useState();
  const [busTripChoosed, setBusTripChoosed] = new useState(new Array());
  const [chairListChoose, setChairListChoose] = new useState(new Array());
  const [priceTicket, setPriceTicket] = new useState(0);
  const [priceDiscount, setpriceDiscount] = new useState(0);
  const [totalPriceTicket, setTotalPriceTicket] = new useState(0);
  const [promotions, setPromotions] = new useState(new Array());
  useEffect(() => {
    LoadDataModal();
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
    axios.get('http://localhost:5005/promotions/all/getPromotion')
      .then((res) => {
        setPromotions(res.data);
      });
  }, [routes, busTrips, prices]);
  function LoadDataModal() {
    if(routes.length == 0)
      document.getElementById("load-data-modal").style.display = "flex";
    else
      document.getElementById("load-data-modal").style.display = "none";
  }
  function OpenBusTripModal(route, departureName, destinationName) {
    setRouteChoosed(route);
    setTitleBusTripModal(departureName + " ?????n " + destinationName);
    let checkPromotion = true;
    promotions.map(promotion => {
      if (promotion.routeId == route._id && new Date().getTime() >= new Date(promotion.startDate).getTime() && new Date().getTime() <= new Date(promotion.endDate).getTime()) {
        setPromotionChoosed(promotion);
        checkPromotion = false;
      }
    })
    if (checkPromotion == true)
      setPromotionChoosed(null);
    document.getElementById("bus-trip-modal").style.display = "flex";
  }
  function CloseBusTripModal() {
    document.getElementById("bus-trip-modal").style.display = "none";
  }
  function OpenAddBusTripModal() {
    if (routeChoosed.status)
      document.getElementById("add-bus-trip-modal").style.display = "flex";
    else
      alert("Tuy???n xe n??y ???? ng???ng ho???t ?????ng kh??ng th??? t???o chuy???n!")
  }
  function CloseAddBusTripModal() {
    document.getElementById("add-bus-trip-modal").style.display = "none";
  }
  function OpenUpdateBusLineModal(route, departureName, destinationName) {
    setRouteChoosed(route);
    setTitleUpdateBusLineModal("C???p nh???t tuy???n xe " + departureName + " ?????n " + destinationName);
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
  function OpenPriceTableModal(route, departureName, destinationName) {
    document.getElementById("price-table-modal").style.display = "flex";
    setRouteChoosed(route);
    setTitlePriceTableModal("B???ng gi?? c???a tuy???n " + departureName + " ?????n " + destinationName);
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
      alert("N??i ??i v?? n??i ?????n kh??ng ???????c gi???ng nhau!");
    else if (checkRoute)
      alert("Tuy???n xe n??y ???? t???n t???i!");
    else {
      let data = {
        carTypeId: typeBus,
        intendTime: timeBusLine,
        departureId: provinceFromAdd,
        destinationId: provinceToAdd,
        code: code
      };
      axios.post('http://localhost:5005/places/addRoute', data)
        .then((res) => {
          alert("Th??m tuy???n th??nh c??ng!");
          CloseAddBusLineModal();
        })
    }
  }
  function AddBusTrip() {
    let bus = document.getElementById("bus").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    if (startDate === null || endDate === null)
      alert("B???n ch??a ch???n ng??y b???t ?????u ho???c ng??y k???t th??c!");
    else {
      let data = {
        startDate: startDate,
        endDate: endDate,
        routeId: routeChoosed._id,
        arrayId: [bus]
      }
      axios.post('http://localhost:5005/routes/addRoute', data)
        .then((res) => {
          alert("Th??m chuy???n xe th??nh c??ng!");
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
        alert("C???p nh???t tuy???n th??nh c??ng!");
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
      alert("Kho???ng th???i gian n??y ???? c?? b???ng gi??!");
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
          alert("Th??m b???ng gi?? th??nh c??ng!");
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
    setChairListChoose([]);
    setPriceTicket(0);
    setTotalPriceTicket(0);
    setpriceDiscount(0);
    let chair = document.getElementsByClassName("chair");
    for (let i = 0; i < chair.length; i++) {
      chair[i].style.background = "white";
    }
    document.getElementById("book-ticket-modal").style.display = "none";
    OpenBusTripModal(routeChoosed, routeChoosed.departure.name, routeChoosed.destination.name);
  }
  function ChooseChair(e) {
    let text = e.target.innerHTML;
    let style = window.getComputedStyle(e.target);
    let bg = style.getPropertyValue("background-color");
    let listChair = [...chairListChoose];
    let totalPrice = priceTicket;
    let totalMoney = 0;
    if (text !== "X" && bg == "rgb(255, 255, 255)") {
      totalPrice = priceTicket + routeChoosed.price.price;
      if (promotionChoosed != null) {
        if (promotionChoosed.moneyReduced != null) {
          if (promotionChoosed.purchaseAmount != null && totalPrice > promotionChoosed.purchaseAmount) {
            setpriceDiscount(promotionChoosed.moneyReduced);
            totalMoney = totalPrice - promotionChoosed.moneyReduced;
          }
          else if (promotionChoosed.quantityTicket != null && chairListChoose.length >= promotionChoosed.quantityTicket) {
            setpriceDiscount(promotionChoosed.moneyReduced);
            totalMoney = totalPrice - promotionChoosed.moneyReduced;
          }
          else
            totalMoney = totalPrice;
        }
        else if (promotionChoosed.percentDiscount != null) {
          if (promotionChoosed.purchaseAmount != null && totalPrice > promotionChoosed.purchaseAmount) {
            setpriceDiscount((priceTicket + routeChoosed.price.price) / promotionChoosed.percentDiscount);
            totalMoney = totalPrice - promotionChoosed.moneyReduced;
          }
          else if (promotionChoosed.quantityTicket != null && chairListChoose.length >= promotionChoosed.quantityTicket) {
            setpriceDiscount((priceTicket + routeChoosed.price.price) / promotionChoosed.percentDiscount);
            totalMoney = totalPrice - promotionChoosed.moneyReduced;
          }
          else
            totalMoney = totalPrice;
        }
      }
      else
        totalMoney = totalPrice;
      e.target.style.background = "lightgray";
      listChair.push(text);
      setChairListChoose(listChair);
      setPriceTicket(priceTicket + routeChoosed.price.price);
      setTotalPriceTicket(totalMoney);
    }
    else if (text !== "X" && bg == "rgb(211, 211, 211)") {
      totalPrice = priceTicket - routeChoosed.price.price;
      if (promotionChoosed != null) {
        if (promotionChoosed.moneyReduced != null) {
          if (promotionChoosed.purchaseAmount != null && totalPrice > promotionChoosed.purchaseAmount) {
            setpriceDiscount(promotionChoosed.moneyReduced);
            totalMoney = totalPrice - promotionChoosed.moneyReduced;
          }
          else if (promotionChoosed.quantityTicket != null && chairListChoose.length >= promotionChoosed.quantityTicket) {
            setpriceDiscount(promotionChoosed.moneyReduced);
            totalMoney = totalPrice - promotionChoosed.moneyReduced;
          }
          else {
            setpriceDiscount(0);
            totalMoney = totalPrice;
          }
        }
        else if (promotionChoosed.percentDiscount != null) {
          if (promotionChoosed.purchaseAmount != null && totalPrice > promotionChoosed.purchaseAmount) {
            setpriceDiscount((priceTicket + routeChoosed.price.price) / promotionChoosed.percentDiscount);
            totalMoney = totalPrice - promotionChoosed.moneyReduced;
          }
          else if (promotionChoosed.quantityTicket != null && chairListChoose.length >= promotionChoosed.quantityTicket) {
            setpriceDiscount((priceTicket + routeChoosed.price.price) / promotionChoosed.percentDiscount);
            totalMoney = totalPrice - promotionChoosed.moneyReduced;
          }
          else {
            setpriceDiscount(0);
            totalMoney = totalPrice;
          }
        }
      }
      else
        totalMoney = totalPrice;
      e.target.style.background = "white";
      setChairListChoose(listChair.filter(chair => chair != text));
      setPriceTicket(priceTicket - routeChoosed.price.price);
      setTotalPriceTicket(totalMoney);
    }
  }
  return (
    <section class="component">
      <div className='header'>
        <p id="logo">FURISAS</p>
        <div>
          <span>Xin ch??o, T???n</span>
          <button className='button' style={{ background: "#CC0000", border: "1px solid #CC0000" }}>????ng xu???t</button>
        </div>
      </div>
      <div className='title-container'>
        <span className='title'>Danh s??ch tuy???n xe</span>
        <div id='search-exit-container'>
          <div className='search-form'>
            <select>
              <option value={"0"}>---Ch???n n??i ??i---</option>
              {
                places.map(place => {
                  return <option value={place._id}>{place.name}</option>
                })
              }
            </select>
            <span>{"?????n"}</span>
            <select>
              <option value={"0"}>---Ch???n n??i ?????n---</option>
              {
                places.map(place => {
                  return <option value={place._id}>{place.name}</option>
                })
              }
            </select>
            <button className='button'>T??m</button>
          </div>
          <button className='button' style={{ background: "#330099", border: "1px solid #330099" }} onClick={OpenAddBusLineModal}>Th??m tuy???n xe</button>
        </div>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th scope="col">M?? tuy???n</th>
              <th scope="col">N??i ??i</th>
              <th scope="col">N??i ?????n</th>
              <th scope="col">Lo???i xe</th>
              <th scope="col">S??? gi???</th>
              <th scope="col">Gi?? v??</th>
              <th scope="col">Tr???ng th??i</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              routes.map(route => {
                return <tr>
                  <td data-label="M?? tuy???n">{route.code}</td>
                  <td data-label="N??i ??i">{route.departure.name}</td>
                  <td data-label="N??i ?????n">{route.destination.name}</td>
                  <td data-label="Lo???i xe">{route.carType}</td>
                  <td data-label="S??? gi???">{route.intendTime}</td>
                  <td data-label="Gi?? v??">{(route.price.length != 0) ? route.price[0].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "??" : "Ch??a c??"}</td>
                  <td data-label="Tr???ng th??i">{(route.status) ? "??ang ho???t ?????ng" : "Ng??ng ho???t ?????ng"}</td>
                  <td data-label="" className='button-container'>
                    <button style={{ background: "#006633", border: "1px solid #006633" }} className='button' onClick={() => OpenBusTripModal(route, route.departure.name, route.destination.name)}><TbBus className='icon' /></button>
                    <button style={{ background: "#FF9900", border: "1px solid #FF9900" }} className='button' onClick={() => OpenPriceTableModal(route, route.departure.name, route.destination.name)}><SiCashapp className='icon' /></button>
                    <button className='button' onClick={() => OpenUpdateBusLineModal(route, route.departure.name, route.destination.name)}><RxUpdate className='icon' /></button>
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
            <span>Danh s??ch chuy???n xe c???a tuy???n {titleBusTripModal}</span>
            <div id='search-exit-container'>
              <div className='search-form'>
                <input type={'date'} />
                <button className='button'>T??m</button>
              </div>
              <img className='exit-icon' onClick={CloseBusTripModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
            </div>
          </div>
          <div className='body-modal'>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Bi???n s??? xe</th>
                    <th scope="col">Lo???i xe</th>
                    <th scope="col">Ng??y ??i</th>
                    <th scope="col">Ng??y ?????n</th>
                    <th scope="col">Gi?? v??</th>
                    <th scope="col">C??n tr???ng</th>
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
                          <td data-label="Bi???n s??? xe">{busTrip.licensePlates}</td>
                          <td data-label="Lo???i xe">{busTrip.carType}</td>
                          <td data-label="Ng??y ??i">{new Date(new Date(busTrip.startDate).getTime() - 7 * 3600 * 1000).toLocaleString()}</td>
                          <td data-label="Ng??y ?????n">{new Date(new Date(busTrip.endDate).getTime() - 7 * 3600 * 1000).toLocaleString()}</td>
                          <td data-label="Gi?? v??">{busTrip.price.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}??</td>
                          <td data-label="C??n tr???ng">{busTrip.chair.filter(chair => chair.status === true).length}/{busTrip.chair.length}</td>
                          <td data-label="" className='button-container'><button className='button' onClick={() => OpenBookingTicketModal(busTrip, busTrip.startDate)}>?????t v??</button></td>
                        </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={OpenAddBusTripModal}>Th??m chuy???n</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='add-bus-trip-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Th??m chuy???n xe</span>
            <img className='exit-icon' onClick={CloseAddBusTripModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>Xe kh??ch:</span>
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
              <span>Ng??y b???t ?????u:</span>
              <input type={'datetime-local'} id="startDate" />
            </div>
            <div className='input-modal'>
              <span>Ng??y k???t th??c:</span>
              <input type={'date'} id="endDate" />
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={AddBusTrip}>Th??m chuy???n</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='add-bus-line-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Th??m tuy???n xe</span>
            <img className='exit-icon' onClick={CloseAddBusLineModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>N??i ??i:</span>
              <select id="provinceFromAdd">
                {
                  places.map(place => {
                    return <option value={place._id}>{place.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>N??i ?????n:</span>
              <select id="provinceToAdd">
                {
                  places.map(place => {
                    return <option value={place._id}>{place.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Lo???i xe:</span>
              <select id="typeBus">
                <option value={'63b285db42d513adac65bcb5'}>Xe Limousine</option>
                <option value={'63b281f4d571739a200fac6c'}>Xe Th?????ng</option>
              </select>
            </div>
            <div className='input-modal'>
              <span>S??? gi???:</span>
              <input type={'number'} defaultValue={0} min={0} id="timeBusLine" />
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={AddBusLine}>Th??m tuy???n</button>
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
              <span>Lo???i xe:</span>
              <select id="typeBusUpdate">
                <option value={'63b285db42d513adac65bcb5'}>Xe Limousine</option>
                <option value={'63b281f4d571739a200fac6c'}>Xe Th?????ng</option>
              </select>
            </div>
            <div className='input-modal'>
              <span>S??? gi???:</span>
              <input type={'number'} defaultValue={0} min={0} id="timeBusLineUpdate" />
            </div>
            <div className='input-modal'>
              <span>Tr???ng th??i:</span>
              <select id="statusBusLineUpdate">
                <option value={true}>??ang ho???t ?????ng</option>
                <option value={false}>Ng??ng ho???t ?????ng</option>
              </select>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={UpdateBusLine}>C???p nh???t</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='add-price-table-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Th??m b???ng gi??</span>
            <img className='exit-icon' onClick={CloseAddPriceTableModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>T??n b???ng gi??:</span>
              <input id="namePrice" />
            </div>
            <div className='input-modal'>
              <span>Ng??y b???t ?????u:</span>
              <input type={'date'} id="startDatePrice" />
            </div>
            <div className='input-modal'>
              <span>Ng??y k???t th??c:</span>
              <input type={'date'} id="endDatePrice" />
            </div>
            <div className='input-modal'>
              <span>Gi?? v??:</span>
              <input type={'number'} defaultValue={0} min={0} id="ticketPrice" />
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={AddPrice}>Th??m b???ng gi??</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='price-table-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>{titlePriceTableModal}</span>
            <div id='search-exit-container'>
              <div className='search-form'>
                <input placeholder='M?? b???ng gi??...' />
                <button className='button'>T??m</button>
              </div>
              <img className='exit-icon' onClick={ClosePriceTableModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
            </div>
          </div>
          <div className='body-modal'>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th scope="col">M?? b???ng gi??</th>
                    <th scope="col">T??n b???ng gi??</th>
                    <th scope="col">Ng??y b???t ?????u</th>
                    <th scope="col">Ng??y k???t th??c</th>
                    <th scope="col">Gi?? v??</th>
                    <th scope="col">Tr???ng th??i</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    prices.map(price => {
                      if (routeChoosed != null && price.route._id === routeChoosed._id)
                        return <tr>
                          <td data-label="M?? b???ng gi??">{price._id}</td>
                          <td data-label="T??n b???ng gi??">{price.title}</td>
                          <td data-label="Ng??y b???t ?????u">{new Date(new Date(price.startDate).getTime() - 7 * 3600 * 1000).toLocaleDateString()}</td>
                          <td data-label="Ng??y k???t th??c">{new Date(new Date(price.endDate).getTime() - 7 * 3600 * 1000).toLocaleDateString()}</td>
                          <td data-label="Gi?? v??">{price.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}??</td>
                          <td data-label="Tr???ng th??i">{(new Date(new Date(price.startDate).getTime() - 7 * 3600 * 1000) <= new Date().getTime() && new Date(new Date(price.endDate).getTime() - 7 * 3600 * 1000).getTime() >= new Date().getTime()) ? "??ang s??? d???ng" : "Kh??ng s??? d???ng"}</td>
                          <td data-label="" className='button-container'><button className='button'>C???p nh???t</button></td>
                        </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={OpenAddPriceTableModal}>Th??m b???ng gi??</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='book-ticket-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>?????t v?? xe tuy???n {titleBusTripModal} - {titleBookticketModal}</span>
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
                          <p>T???ng 1</p>
                          <GiSteeringWheel className='icon' />
                        </div>
                        <table>
                          <tbody>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[0].status) ? "X" : "A-01"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[1].status) ? "X" : "A-02"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[2].status) ? "X" : "A-03"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[3].status) ? "X" : "A-04"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }} >{(busTrip.chair[4].status) ? "X" : "A-05"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[5].status) ? "X" : "A-06"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[6].status) ? "X" : "A-07"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[7].status) ? "X" : "A-08"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[8].status) ? "X" : "A-09"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[9].status) ? "X" : "A-10"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[10].status) ? "X" : "A-11"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[11].status) ? "X" : "A-12"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[12].status) ? "X" : "A-13"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[13].status) ? "X" : "A-14"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[14].status) ? "X" : "A-15"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[15].status) ? "X" : "A-16"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[16].status) ? "X" : "A-17"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[17].status) ? "X" : "A-18"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="floor">
                        <p>T???ng 2</p>
                        <table>
                          <tbody>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[18].status) ? "X" : "B-01"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[19].status) ? "X" : "B-02"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[20].status) ? "X" : "B-03"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[21].status) ? "X" : "B-04"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }} >{(busTrip.chair[22].status) ? "X" : "B-05"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[23].status) ? "X" : "B-06"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[24].status) ? "X" : "B-07"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[25].status) ? "X" : "B-08"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[26].status) ? "X" : "B-09"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[27].status) ? "X" : "B-10"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[28].status) ? "X" : "B-11"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[29].status) ? "X" : "B-12"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[30].status) ? "X" : "B-13"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[31].status) ? "X" : "B-14"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[32].status) ? "X" : "B-15"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[33].status) ? "X" : "B-16"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[34].status) ? "X" : "B-17"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[35].status) ? "X" : "B-18"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  else
                    return <>
                      <div class="floor" id="normalBus">
                        <div>
                          <p>T???ng 1</p>
                          <GiSteeringWheel className='icon' />
                        </div>
                        <table>
                          <tbody>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[0].status) ? "X" : "01"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[1].status) ? "X" : "02"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[2].status) ? "X" : "03"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[3].status) ? "X" : "04"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[4].status) ? "X" : "05"}</td>
                              <td className='chair' style={{ border: "1px solid lightgray" }}>{(busTrip.chair[5].status) ? "X" : "06"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[6].status) ? "X" : "07"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[7].status) ? "X" : "08"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[8].status) ? "X" : "09"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[9].status) ? "X" : "10"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[10].status) ? "X" : "11"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[11].status) ? "X" : "12"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[12].status) ? "X" : "13"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[13].status) ? "X" : "14"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[14].status) ? "X" : "15"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[15].status) ? "X" : "16"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[16].status) ? "X" : "17"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[17].status) ? "X" : "18"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[18].status) ? "X" : "19"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[19].status) ? "X" : "20"}</td>
                            </tr>
                            <tr>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[20].status) ? "X" : "21"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[21].status) ? "X" : "22"}</td>
                              <td></td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[22].status) ? "X" : "23"}</td>
                              <td className='chair' onClick={ChooseChair} style={{ border: "1px solid lightgray" }}>{(busTrip.chair[23].status) ? "X" : "24"}</td>
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
              <p>Th??ng tin kh??ch h??ng:</p>
              <div className='input-modal'>
                <span>S??? ??i???n tho???i:</span>
                <input />
              </div>
              <div className='input-modal'>
                <span>H???:</span>
                <input />
              </div>
              <div className='input-modal'>
                <span>T??n:</span>
                <input />
              </div>
              <div className='input-modal'>
                <span>?????a ch???:</span>
                <div id="address-customer">
                  <select>
                    <option>T???nh th??nh</option>
                    <option>S??i G??n</option>
                    <option>???? L???t</option>
                  </select>
                  <select>
                    <option>Qu???n huy???n</option>
                    <option>S??i G??n</option>
                    <option>???? L???t</option>
                  </select>
                  <select>
                    <option>X?? ph?????ng</option>
                    <option>???? L???t</option>
                  </select>
                </div>
              </div>
              <div className='input-modal'>
                <span>Danh s??ch gh???: </span>
                <p>{chairListChoose.toString()}</p>
              </div>
              <div className='input-modal'>
                <span>T???ng ti???n v??: </span>
                <p>{priceTicket.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}??</p>
              </div>
              <div className='input-modal'>
                <span>Khuy???n m??i: </span>
                <p>{(promotionChoosed != null) ? promotionChoosed.title : "Kh??ng"}</p>
              </div>
              <div className='input-modal'>
                <span>S??? ti???n gi???m: </span>
                <p>{(priceDiscount != 0) ? priceDiscount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "0"}??</p>
              </div>
              <div className='input-modal'>
                <span>T???ng ti???n thanh to??n: </span>
                <p>{(totalPriceTicket != 0) ? totalPriceTicket.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "0"}??</p>
              </div>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={OpenAddPriceTableModal}>?????t v??</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='load-data-modal'>
        <div className='modal'>
          <img src='https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700' alt="load" />
        </div>
      </div>
    </section>
  );
}

export default BusLine;