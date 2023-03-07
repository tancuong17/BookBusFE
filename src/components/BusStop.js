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
      alert("Mã khu vực đã tồn tại!");
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
          alert("Thêm khu vực thành công!");
          CloseAddArea();
        })
    }
  }
  return (
    <section id="BusLine">
      <div className='header'>
        <span>Xin chào, Tấn</span>
        <button className='button'>Đăng xuất</button>
      </div>
      <div className='title-container'>
        <span className='title'>Danh sách khu vực</span>
        <button className='button' onClick={OpenAddArea}>Thêm khu vực</button>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th scope="col">Mã khu vực</th>
              <th scope="col">Tên khu vực</th>
              <th scope="col">Số bến xe</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              places.map(place => {
                return <tr>
                  <td data-label="Mã khu vực">{place.code}</td>
                  <td data-label="Tên khu vực">{place.name}</td>
                  <td data-label="Số bến xe">{place.busStation.length}</td>
                  <td data-label=""><button className='button' onClick={() => OpenBusStopModal(place._id)}>Bến xe</button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div className='modal-container' id='add-area-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Thêm khu vực</span>
            <img className='exit-icon' onClick={CloseAddArea} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>Mã khu vực:</span>
              <input id="area-code" />
            </div>
            <div className='input-modal'>
              <span>Tỉnh thành:</span>
              <select id='province' onChange={ChooseProvince}>
                <option value={"0"}>---Tỉnh thành--</option>
                {
                  provinces.map(province => {
                    return <option value={province.id}>{province.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Quận huyện:</span>
              <select id='district' onChange={ChooseDistrict}>
                <option value={"0"}>---Quận huyện--</option>
                {
                  districts.map(district => {
                    return <option value={district.id}>{district.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Xã phường:</span>
              <select id='ward'>
                <option value={"0"}>---Xã phường--</option>
                {
                  wards.map(ward => {
                    return <option value={ward.id}>{ward.name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={AddArea}>Thêm khu vực</button>
          </div>
        </div>
      </div >
      <div className='modal-container' id='bus-stop-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Danh sách bến xe</span>
            <div id='search-exit-container'>
              <div className='search-form'>
                <input placeholder='Mã bến xe...' />
                <button className='button'>Tìm</button>
              </div>
              <img className='exit-icon' onClick={CloseBusStopModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
            </div>
          </div>
          <div className='body-modal'>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Tên bến xe</th>
                    <th scope="col">Địa chỉ</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    busStops.map(busStop => {
                      return <tr>
                        <td data-label="Tên bến xe">{busStop.address.name}</td>
                        <td data-label="Địa chỉ">{busStop.address.detailAddress} , {busStop.address.ward}, {busStop.address.district}, {busStop.address.province}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button' onClick={OpenAddBusStopModal}>Thêm bến xe</button>
          </div>
        </div>
      </div>
      <div className='modal-container' id='add-bus-stop-modal'>
        <div className='modal'>
          <div className='header-modal'>
            <span>Thêm bến xe</span>
            <img className='exit-icon' onClick={CloseAddBusStopModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
          </div>
          <div className='body-modal'>
            <div className='input-modal'>
              <span>Tên bến xe:</span>
              <input />
            </div>
            <div className='input-modal'>
              <span>Tỉnh thành:</span>
              <select id='province' onChange={ChooseProvince}>
                <option value={null}>---Tỉnh thành--</option>
                {
                  provinces.map(province => {
                    return <option value={province.id}>{province.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Quận huyện:</span>
              <select id='district' onChange={ChooseDistrict}>
                <option value={null}>---Quận huyện--</option>
                {
                  districts.map(district => {
                    return <option value={district.id}>{district.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Xã phường:</span>
              <select>
                <option value={null}>---Xã phường--</option>
                {
                  wards.map(ward => {
                    return <option value={ward.id}>{ward.name}</option>
                  })
                }
              </select>
            </div>
            <div className='input-modal'>
              <span>Số nhà, tên đường:</span>
              <input />
            </div>
          </div>
          <div className='footer-modal'>
            <button className='button'>Thêm bến xe</button>
          </div>
        </div>
      </div >
    </section >
  );
}

export default BusStop;