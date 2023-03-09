import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';

function Promotion() {
    const [promotions, setPromotions] = new useState(new Array());
    const [routes, setRoutes] = new useState(new Array());
    const [promotionChoosed, setPromotionChoosed] = new useState(new Array());
    useEffect(() => {
        axios.get('http://localhost:5005/promotions/all/getPromotion')
            .then((res) => {
                setPromotions(res.data);
            });
        axios.get('http://localhost:5005/places/all/getRoute')
            .then((res) => {
                setRoutes(res.data);
            })
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
    function OpenAddPromotionModal() {
        document.getElementById("add-promotion-modal").style.display = "flex";
        ChooseTypePromotion();
        ChooseWayPromotion();
    }
    function CloseAddPromotionModal() {
        document.getElementById("add-promotion-modal").style.display = "none";
    }
    function AddPromotion() {
        let typePromotion = document.getElementById("add-promotion-modal").value;
        let namePromotion = document.getElementById("namePromotion").value;
        let wayPromotion = document.getElementById("wayPromotion").value;
        let routePromotion = document.getElementById("routePromotion").value;
        let priceTicketStandard = document.getElementById("priceTicketStandard").value;
        let quantityTicketDiscount = document.getElementById("quantityTicketDiscount").value;
        let percentDiscount = document.getElementById("percentDiscount").value;
        let moneyDiscount = document.getElementById("moneyDiscount").value;
        let budget = document.getElementById("budget").value;
        let startDatePromotion = document.getElementById("startDatePromotion").value;
        let endDatePromotion = document.getElementById("endDatePromotion").value;
        if (wayPromotion == "0")
            quantityTicketDiscount = null;
        else
            priceTicketStandard = null;
        if (typePromotion == "63c252a602c477dd6927806c") {
            let data = {
                startDate: startDatePromotion,
                endDate: endDatePromotion,
                percentDiscount: percentDiscount,
                routeId: routePromotion,
                quantityTicket: quantityTicketDiscount,
                title: namePromotion,
                purchaseAmount: null,
                moneyReduced: null,
                maximumDiscount: priceTicketStandard,
                budget: budget,
                promotionType: typePromotion,
            };
            axios.post('http://localhost:5005/promotions/addPromotion', data)
            .then((res) => {
                alert("Thêm khuyến mãi thành công!");
                CloseAddPromotionModal();
            })
        }
        else {
            let data = {
                startDate: startDatePromotion,
                endDate: endDatePromotion,
                percentDiscount: null,
                routeId: routePromotion,
                quantityTicket: quantityTicketDiscount,
                title: namePromotion,
                purchaseAmount: priceTicketStandard,
                moneyReduced: moneyDiscount,
                maximumDiscount: null,
                budget: budget,
                promotionType: typePromotion,
            };
            axios.post('http://localhost:5005/promotions/addPromotion', data)
            .then((res) => {
                alert("Thêm khuyến mãi thành công!");
                CloseAddPromotionModal();
            })
        }
    }
    function ChooseTypePromotion() {
        let typePromotion = document.getElementById("typePromotion").value;
        if (typePromotion == "63c252a602c477dd6927806c") {
            document.getElementById("percent-container").style.display = "grid";
            document.getElementById("money-container").style.display = "none";
        }
        else {
            document.getElementById("money-container").style.display = "grid";
            document.getElementById("percent-container").style.display = "none";
        }
    }
    function ChooseWayPromotion() {
        let wayPromotion = document.getElementById("wayPromotion").value;
        if (wayPromotion == "0") {
            document.getElementById("priceTicketPromotion").style.display = "grid";
            document.getElementById("quantityTicketPromotion").style.display = "none";
        }
        else {
            document.getElementById("quantityTicketPromotion").style.display = "grid";
            document.getElementById("priceTicketPromotion").style.display = "none";
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
                <span className='title'>Danh sách khuyến mãi</span>
                <div id='search-exit-container'>
                    <div className='search-form'>
                        <input placeholder='Mã khuyến mãi...' />
                        <button className='button'>Tìm</button>
                    </div>
                    <button className='button' style={{ background: "#330099", border: "1px solid #330099" }} onClick={OpenAddPromotionModal}>Thêm khuyến mãi</button>
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
                                            <span>Mức giá hóa đơn:</span>
                                            <p>{promotionChoosed.purchaseAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Mức giảm tối đa:</span>
                                            <p>{promotionChoosed.maximumDiscount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngân sách:</span>
                                            <p>{promotionChoosed.budget.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Trạng thái:</span>
                                            <p>{(promotionChoosed.status) ? "Đang sử dụng" : "Không sử dụng"}</p>
                                        </div>
                                    </>
                                if (promotionChoosed.percentDiscount == null)
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
                                            <span>Mức giá hóa đơn:</span>
                                            <p>{promotionChoosed.purchaseAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Số tiền giảm:</span>
                                            <p>{promotionChoosed.moneyReduced.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ngân sách:</span>
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
            <div className='modal-container' id='add-promotion-modal'>
                <div className='modal'>
                    <div className='header-modal'>
                        <span>Thêm khuyến mãi</span>
                        <img className='exit-icon' onClick={CloseAddPromotionModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
                    </div>
                    <div className='body-modal'>
                        <div className='input-modal'>
                            <span>Loại khuyến mãi:</span>
                            <select onChange={ChooseTypePromotion} id="typePromotion">
                                <option value={"63c252a602c477dd6927806c"}>Khuyến mãi phần trăm</option>
                                <option value={"63c252b102c477dd6927806e"}>Khuyến mãi tiền mặt</option>
                            </select>
                        </div>
                        <div className='input-modal'>
                            <span>Hình thức giảm:</span>
                            <select onChange={ChooseWayPromotion} id="wayPromotion">
                                <option value={"1"}>Khuyến mãi dựa vào số vé</option>
                                <option value={"0"}>Khuyến mãi dựa vào tiền hóa đơn</option>
                            </select>
                        </div>
                        <div className='input-modal'>
                            <span>Tuyến xe:</span>
                            <select id="routePromotion">
                                {
                                    routes.map(route => {
                                        return <option value={route._id}>{route.departure.name + " đến " + route.destination.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='input-modal'>
                            <span>Tên khuyến mãi:</span>
                            <input id="namePromotion" />
                        </div>
                        <div className='input-modal' id='priceTicketPromotion'>
                            <span>Mức tiền giảm:</span>
                            <input type={'number'} defaultValue={0} id="priceTicketStandard" />
                        </div>
                        <div className='input-modal' id='quantityTicketPromotion' >
                            <span>Số vé:</span>
                            <input type={'number'} defaultValue={0} id="quantityTicketDiscount" />
                        </div>
                        <div className='input-modal' id="percent-container">
                            <span>Phần trăm giảm:</span>
                            <input type={'number'} defaultValue={0} max={100} id="percentDiscount" />
                        </div>
                        <div className='input-modal' id="money-container">
                            <span>Số tiền giảm:</span>
                            <input type={'number'} defaultValue={0} max={100} id="moneyDiscount" />
                        </div>
                        <div className='input-modal'>
                            <span>Ngân sách:</span>
                            <input type={'number'} defaultValue={0} id="budget" />
                        </div>
                        <div className='input-modal'>
                            <span>Ngày bắt đầu:</span>
                            <input type={'date'} id="startDatePromotion" />
                        </div>
                        <div className='input-modal'>
                            <span>Ngày kết thúc:</span>
                            <input type={'date'} id="endDatePromotion" />
                        </div>
                    </div>
                    <div className='footer-modal'>
                        <button className='button' onClick={AddPromotion}>Thêm khuyến mãi</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Promotion;