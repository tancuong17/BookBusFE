import React, { useRef } from 'react';
import '../App.css';

function Bus() {
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
                <span className='title'>Danh sách xe khách</span>
                <div id='search-exit-container'>
                    <div className='search-form'>
                        <input placeholder='Biển số xe...' />
                        <button className='button'>Tìm</button>
                    </div>
                    <button className='button'>Thêm xe khách</button>
                </div>
            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Mã xe</th>
                            <th scope="col">Biển số xe</th>
                            <th scope="col">Loại xe</th>
                            <th scope="col">Số chỗ</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Mã xe">001</td>
                            <td data-label="Biển số xe">77H-1234</td>
                            <td data-label="Loại xe">Xe Limousine</td>
                            <td data-label="Số chỗ">36</td>
                            <td data-label="Trạng thái">Đang sử dụng</td>
                            <td data-label="" className='button-container'>
                                <button className='button'>Cập nhật</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Bus;