import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';

function Promotion() {
    const [promotions, setPromotions] = new useState(new Array());
    const [promotionChoosed, setPromotionChoosed] = new useState(new Array());
    useEffect(() => {
        axios.get('http://localhost:5005/promotions/all/getPromotion')
            .then((res) => {
                setPromotions(res.data);
            });
    }, [promotions]);
    function OpenDetailPromotionModal(promotionId) {
        promotions.map(promotion => {
            if (promotion._id === promotionId)
                promotionChoosed[0] = promotion;
        })
        document.getElementById("detail-promotion-modal").style.display = "flex";
    }
    function CloseDetailPromotionModal() {
        document.getElementById("detail-promotion-modal").style.display = "none";
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
                            <th scope="col">Tên khuyến mãi</th>
                            <th scope="col">Tuyến xe</th>
                            <th scope="col">Ngày bắt đầu</th>
                            <th scope="col">Ngày kết thúc</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            promotions.map(promotion => {
                                return <tr>
                                    <td data-label="Tên khuyến mãi">{promotion.title}</td>
                                    <td data-label="Tuyến xe">{promotion.departure + " - " + promotion.destination}</td>
                                    <td data-label="Ngày bắt đầu">{new Date(new Date(promotion.startDate).getTime() - 7 * 3600 * 1000).toLocaleDateString()}</td>
                                    <td data-label="Ngày kết thúc">{new Date(new Date(promotion.endDate).getTime() - 7 * 3600 * 1000).toLocaleDateString()}</td>
                                    <td data-label="Trạng thái">{(promotion.status) ? "Đang sử dụng" : "Không sử dụng"}</td>
                                    <td data-label="" className='button-container'>
                                        <button className='button' onClick={() => OpenDetailPromotionModal(promotion._id)}>Chi tiết</button>
                                    </td>
                                </tr>
                            })
                        }
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
                    <div className='body-modal' id="promotion-modal">
                        {
                            promotionChoosed.map(promotionChoosed => {
                                if (promotionChoosed.percentDiscount != null)
                                    return <>
                                        <div className='input-modal'>
                                            <span>Mã khuyến mãi:</span>
                                            <p>{promotionChoosed._id}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Tên khuyến mãi:</span>
                                            <p>{promotionChoosed.title}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Tuyến xe:</span>
                                            <p>{promotionChoosed.departure + " - " + promotionChoosed.destination}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngày bắt đầu:</span>
                                            <p>{new Date(promotionChoosed.startDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngày kết thúc:</span>
                                            <p>{new Date(promotionChoosed.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Phần trăm giảm:</span>
                                            <p>{promotionChoosed.percentDiscount}%</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Số vé:</span>
                                            <p>{promotionChoosed.quantityTicket} vé</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngân sách:</span>
                                            <p>{promotionChoosed.purchaseAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Số tiền hóa đơn:</span>
                                            <p>{promotionChoosed.maximumDiscount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngân sách còn lại:</span>
                                            <p>{promotionChoosed.budget.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Trạng thái:</span>
                                            <p>{(promotionChoosed.status) ? "Đang sử dụng" : "Không sử dụng"}</p>
                                        </div>
                                    </>
                                if (promotionChoosed.percentDiscount == null)
                                    return  <>
                                        <div className='input-modal'>
                                            <span>Mã khuyến mãi:</span>
                                            <p>{promotionChoosed._id}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Tên khuyến mãi:</span>
                                            <p>{promotionChoosed.title}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Tuyến xe:</span>
                                            <p>{promotionChoosed.departure + " - " + promotionChoosed.destination}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngày bắt đầu:</span>
                                            <p>{new Date(promotionChoosed.startDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngày kết thúc:</span>
                                            <p>{new Date(promotionChoosed.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngân sách:</span>
                                            <p>{promotionChoosed.purchaseAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Số tiền giảm:</span>
                                            <p>{promotionChoosed.moneyReduced.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngân sách còn lại:</span>
                                            <p>{promotionChoosed.budget.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Trạng thái:</span>
                                            <p>{(promotionChoosed.status) ? "Đang sử dụng" : "Không sử dụng"}</p>
                                        </div>
                                    </>
                            })
                        }
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