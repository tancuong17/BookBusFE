import React, { useRef } from 'react';
import '../App.css';

function Promotion() {
    function OpenDetailPromotionModal() {
        document.getElementById("detail-promotion-modal").style.display = "flex";
    }
    function CloseDetailPromotionModal() {
        document.getElementById("detail-promotion-modal").style.display = "none";
    }
    return (
        <section id="BusLine">
            <div className='header'>
                <span>Xin chào, Tấn</span>
                <button className='button'>Đăng xuất</button>
            </div>
            <div className='title-container'>
                <span className='title'>Danh sách khuyến mãi</span>
                <div id='search-exit-container'>
                    <div className='search-form'>
                        <input placeholder='Mã khuyến mãi...' />
                        <button className='button'>Tìm</button>
                    </div>
                    <button className='button'>Thêm khuyến mãi</button>
                </div>
            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Mã khuyến mãi</th>
                            <th scope="col">Tên khuyến mãi</th>
                            <th scope="col">Ngày bắt đầu</th>
                            <th scope="col">Ngày kết thúc</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Mã khuyến mãi">001</td>
                            <td data-label="Tên khuyến mãi">Giảm 10% khi mua hóa đơn trên 500,000đ</td>
                            <td data-label="Ngày bắt đầu">15/01/2001</td>
                            <td data-label="Ngày kết thúc">15/01/2001</td>
                            <td data-label="Trạng thái">Đang sử dụng</td>
                            <td data-label="" className='button-container'>
                                <button className='button' onClick={OpenDetailPromotionModal}>Chi tiết</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='modal-container' id='detail-promotion-modal'>
                <div className='modal'>
                    <div className='header-modal'>
                        <span>Chi tiết khuyến mãi</span>
                        <div id='search-exit-container'>
                            <img className='exit-icon' onClick={CloseDetailPromotionModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
                        </div>
                    </div>
                    <div className='body-modal'>
                        <div className='input-modal'>
                            <span>Tên khuyến mãi:</span>
                            <p>Giảm 150.000đ cho hóa đơn trên 1,000,000đ</p>
                        </div>
                        <div className='input-modal'>
                            <span>Ngày bắt đầu:</span>
                            <p>14/02/2005</p>
                        </div>
                        <div className='input-modal'>
                            <span>Ngày kết thúc:</span>
                            <p>14/02/2005</p>
                        </div>
                        <div className='input-modal'>
                            <span>Loại khuyến mãi:</span>
                            <p>Khuyến mãi giảm tiền</p>
                        </div>
                        <div className='input-modal'>
                            <span>Ngân sách:</span>
                            <p>1,000,000đ</p>
                        </div>
                        <div className='input-modal'>
                            <span>Số tiền giảm tối đa:</span>
                            <p>150,000đ</p>
                        </div>
                        <div className='input-modal'>
                            <span>Trạng thái:</span>
                            <p>Đang sử dụng</p>
                        </div>
                    </div>
                    <div className='footer-modal'>
                        <button className='button'>Cập nhật</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Promotion;