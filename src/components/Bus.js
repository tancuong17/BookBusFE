import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';

function Bus() {
    const [bus, setBus] = new useState(new Array());
    useEffect(() => {
        LoadDataModal();
        axios.get('http://localhost:5005/cars/all/getCars')
            .then((res) => {
                setBus(res.data);
            });
    }, [bus]);
    function LoadDataModal() {
        if (bus.length == 0)
            document.getElementById("load-data-modal").style.display = "flex";
        else
            document.getElementById("load-data-modal").style.display = "none";
    }
    function OpenAddBusModal() {
        document.getElementById("add-bus-modal").style.display = "flex";
    }
    function CloseAddBusModal() {
        document.getElementById("add-bus-modal").style.display = "none";
    }
    function AddBus() {
        let licensePlates = document.getElementById("licensePlates").value;
        let typeBus = document.getElementById("typeBus").value;
        let checkBus = false;
        bus.map(bus => {
            if (bus.licensePlates == licensePlates)
                checkBus = true;
        })
        if (checkBus)
            alert("Biển số xe này đã tồn tại!");
        else {
            let data = {
                idTypeCar: typeBus,
                licensePlates: licensePlates
            }
            axios.post('http://localhost:5005/cars/addCar', data)
                .then((res) => {
                    alert("Thêm xe khách thành công!");
                    CloseAddBusModal();
                });
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
                <span className='title'>Danh sách xe khách</span>
                <div id='search-exit-container'>
                    <div className='search-form'>
                        <input placeholder='Biển số xe...' />
                        <button className='button'>Tìm</button>
                    </div>
                    <button className='button' style={{ background: "#330099", border: "1px solid #330099" }} onClick={OpenAddBusModal}>Thêm xe khách</button>
                </div>
            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Biển số xe</th>
                            <th scope="col">Loại xe</th>
                            <th scope="col">Số chỗ</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bus.map((bus, index) => {
                                return <tr>
                                    <td data-label="Mã xe">{index + 1}</td>
                                    <td data-label="Biển số xe">{bus.licensePlates}</td>
                                    <td data-label="Loại xe">{bus.carType.type}</td>
                                    <td data-label="Số chỗ">{bus.carType.chair.length}</td>
                                    <td data-label="Trạng thái">{(bus.status) ? "Đang hoạt động" : "Ngưng hoạt động"}</td>
                                    <td data-label="" className='button-container'>
                                        <button className='button'>Cập nhật</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='modal-container' id='add-bus-modal'>
                <div className='modal'>
                    <div className='header-modal'>
                        <span>Thêm xe khách</span>
                        <img className='exit-icon' onClick={CloseAddBusModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
                    </div>
                    <div className='body-modal'>
                        <div className='input-modal'>
                            <span>Biển số xe:</span>
                            <input id="licensePlates" />
                        </div>
                        <div className='input-modal' id="percent-container">
                            <span>Loại xe:</span>
                            <select id="typeBus">
                                <option value={"63b285db42d513adac65bcb5"}>Xe Limousine</option>
                                <option value={"63b281f4d571739a200fac6c"}>Xe Thường</option>
                            </select>
                        </div>
                    </div>
                    <div className='footer-modal'>
                        <button className='button' onClick={AddBus}>Thêm xe khách</button>
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

export default Bus;