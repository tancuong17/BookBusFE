import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import data from "../Data/local.json";

function BusStop() {
  const [places, setPlaces] = new useState(new Array());
  const [busStops, seBusStops] = new useState(new Array());
  const provinceData = new Array();
  const [provinces, setProvinces] = new useState(new Array());
  const [districts, setDistricts] = new useState(new Array());
  const [wards, setWards] = new useState(new Array());
  useEffect(() => {
    LoadDataModal();
    data.map((data) => {
      provinceData.push({ id: data.id, name: data.name });
    });
    axios.get('http://localhost:5005/places/all/getPlace')
      .then((res) => {
        setPlaces(res.data);
        console.log(res);
      })
    setProvinces(provinceData);
  }, [places]);
  function LoadDataModal() {
    if(places.length == 0)
      document.getElementById("load-data-modal").style.display = "flex";
    else
      document.getElementById("load-data-modal").style.display = "none";
  }
  provinces.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  function ChooseProvince() {
    let province = document.getElementById("province").value;
    data.map((data) => {
      if (data.id === province) {
        setDistricts(data.districts);
      }
    })
    document.getElementById("district").value = null;
    setWards([]);
  }
  function ChooseDistrict() {
    let district = document.getElementById("district").value;
    if (district == "0")
      setWards([]);
    else
      districts.map((data) => {
        if (data.id === district) {
          setWards(data.wards);
        }
      })
  }
  function OpenAddArea() {
    document.getElementById("add-area-modal").style.display = "flex";
  }
  function CloseAddArea() {
    document.getElementById("add-area-modal").style.display = "none";
  }
  function OpenBusStopModal(idPlace) {
    console.log(idPlace);
    places.map(place => {
      if (place._id === idPlace)
        seBusStops(place.busStation);
    })
    document.getElementById("bus-stop-modal").style.display = "flex";
  }
  function CloseBusStopModal() {
    document.getElementById("bus-stop-modal").style.display = "none";
  }
  function OpenAddBusStopModal() {
    document.getElementById("add-bus-stop-modal").style.display = "flex";
  }
  function CloseAddBusStopModal() {
    document.getElementById("add-bus-stop-modal").style.display = "none";
  }
  function AddArea() {
    let areaCode = document.getElementById("area-code").value;
    let provinceArea = document.getElementById("province");
    let districtArea = document.getElementById("district");
    let wardArea = document.getElementById("ward");
    let name = "";
    let checkArea = false;
    places.map(place => {
      if (place.code === areaCode)
        checkArea = true;
    })
    if (checkArea)
      alert("M?? khu v???c ???? t???n t???i!");
    else {
      if (districtArea.value == "0")
        name = provinceArea.options[provinceArea.selectedIndex].text;
      else if (wardArea.value == "0")
        name = districtArea.options[districtArea.selectedIndex].text;
      else
        name = wardArea.options[wardArea.selectedIndex].text;
      let data = {
        code: areaCode,
        name: name,
        busStation: []
      }
      console.log(data);
      axios.post('http://localhost:5005/places/addPlace', data)
        .then((res) => {
          alert("Th??m khu v???c th??nh c??ng!");
          CloseAddArea();
        })
    }
  }
  return (
    <section class="component">
      <div className='header'>
        <p id="logo">FURISAS</p>
        <div>
          <span>Xin ch??o, T???n</span>
          <button className='button' style={{background: "#CC0000", border: "1px solid #CC0000"}}>????ng xu???t</button>
        </div>
      </div>
      <div className='title-container'>
        <span className='title'>Danh s??ch khu v???c</span>
        <button className='button' style={{ background: "#330099", border: "1px solid #330099" }} onClick={OpenAddArea}>Th??m khu v???c</button>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">M?? khu v???c</th>
              <th scope="col">T??n khu v???c</th>
              <th scope="col">S??? b???n xe</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              places.map((place, index) => {
                return <tr>
                        <td data-label="M?? khu v???c">{index + 1}</td>
                        <td data-label="M?? khu v???c">{place.code}</td>
                        <td data-label="T??n khu v???c">{place.name}</td>
                        <td data-label="S??? b???n xe">{place.busStation.length}</td>
                        <td data-label="" className='button-container'><button className='button' onClick={() => OpenBusStopModal(place._id)}>B???n xe</button></td>
                      </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div className='modal-container' id='add-area-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Th??m khu v???c</span>
            <img className='exit-icon' onClick={CloseAddArea} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>M?? khu v???c:</span>
              <input id="area-code" />
            </div>
            <div className='input-modal'>
              <span>T???nh th??nh:</span>
              <select id='province' onChange={ChooseProvince}>
                <option value={"0"}>---T???nh th??nh--</option>
                {
                  provinces.map(province => {
                    return <option value={province.id}>{province.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Qu???n huy???n:</span>
              <select id='district' onChange={ChooseDistrict}>
                <option value={"0"}>---Qu???n huy???n--</option>
                {
                  districts.map(district => {
                    return <option value={district.id}>{district.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>X?? ph?????ng:</span>
              <select id='ward'>
                <option value={"0"}>---X?? ph?????ng--</option>
                {
                  wards.map(ward => {
                    return <option value={ward.id}>{ward.name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={AddArea}>Th??m khu v???c</button>
          </div>
        </div>
      </div >
      <div className='modal-container' id='bus-stop-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Danh s??ch b???n xe</span>
            <div id='search-exit-container'>
              <div className='search-form'>
                <input placeholder='M?? b???n xe...' />
                <button className='button'>T??m</button>
              </div>
              <img className='exit-icon' onClick={CloseBusStopModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
            </div>
          </div>
          <div className='body-modal'>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th scope="col">T??n b???n xe</th>
                    <th scope="col">?????a ch???</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    busStops.map(busStop => {
                      return <tr>
                        <td data-label="T??n b???n xe">{busStop.address.name}</td>
                        <td data-label="?????a ch???">{busStop.address.detailAddress} , {busStop.address.ward}, {busStop.address.district}, {busStop.address.province}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={OpenAddBusStopModal}>Th??m b???n xe</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='add-bus-stop-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Th??m b???n xe</span>
            <img className='exit-icon' onClick={CloseAddBusStopModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>T??n b???n xe:</span>
              <input />
            </div>
            <div className='input-modal'>
              <span>T???nh th??nh:</span>
              <select id='province' onChange={ChooseProvince}>
                <option value={null}>---T???nh th??nh--</option>
                {
                  provinces.map(province => {
                    return <option value={province.id}>{province.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Qu???n huy???n:</span>
              <select id='district' onChange={ChooseDistrict}>
                <option value={null}>---Qu???n huy???n--</option>
                {
                  districts.map(district => {
                    return <option value={district.id}>{district.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>X?? ph?????ng:</span>
              <select>
                <option value={null}>---X?? ph?????ng--</option>
                {
                  wards.map(ward => {
                    return <option value={ward.id}>{ward.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>S??? nh??, t??n ???????ng:</span>
              <input />
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button'>Th??m b???n xe</button>
          </div>
        </div>
      </div >
      <div className='modal-container' id='load-data-modal'>
        <div className='modal'>
          <img src='https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700' alt="load" />
        </div>
      </div>
    </section >
  );
}

export default BusStop;