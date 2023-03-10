import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';

function Promotion() {
    const [promotions, setPromotions] = new useState(new Array());
    const [routes, setRoutes] = new useState(new Array());
    const [promotionChoosed, setPromotionChoosed] = new useState(new Array());
    useEffect(() => {
        LoadDataModal();
        axios.get('http://localhost:5005/promotions/all/getPromotion')
            .then((res) => {
                setPromotions(res.data);
            });
        axios.get('http://localhost:5005/places/all/getRoute')
            .then((res) => {
                setRoutes(res.data);
            })
    }, [promotions]);
    function LoadDataModal() {
        if (promotions.length == 0)
            document.getElementById("load-data-modal").style.display = "flex";
        else
            document.getElementById("load-data-modal").style.display = "none";
    }
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
        let routePromotion = document.getElementById("routePromotion");
        let priceTicketStandard = document.getElementById("priceTicketStandard").value;
        let quantityTicketDiscount = document.getElementById("quantityTicketDiscount").value;
        let percentDiscount = document.getElementById("percentDiscount").value;
        let moneyDiscount = document.getElementById("moneyDiscount").value;
        let budget = document.getElementById("budget").value;
        let startDatePromotion = document.getElementById("startDatePromotion").value;
        let endDatePromotion = document.getElementById("endDatePromotion").value;
        let checkPromotion = false;
        promotions.map(promotion => {
            if (promotion.routeId == routePromotion.value)
                if (new Date(promotion.startDate).getTime() <= new Date(startDatePromotion).getTime() && new Date(promotion.endDate).getTime() >= new Date(endDatePromotion).getTime())
                    checkPromotion = true;
                else if (new Date(promotion.startDate).getTime() >= new Date(startDatePromotion).getTime() && new Date(promotion.endDate).getTime() <= new Date(endDatePromotion).getTime())
                    checkPromotion = true;
                else if (new Date(promotion.startDate).getTime() <= new Date(startDatePromotion).getTime() && new Date(promotion.endDate).getTime() >= new Date(startDatePromotion).getTime())
                    checkPromotion = true;
                else if (new Date(promotion.startDate).getTime() <= new Date(endDatePromotion).getTime() && new Date(promotion.endDate).getTime() >= new Date(endDatePromotion).getTime())
                    checkPromotion = true;
        })
        if (checkPromotion)
            alert("Kho???ng th???i gian n??y trong tuy???n " + routePromotion.options[routePromotion.selectedIndex].text + " ???? t???n t???i khuy???n m??i!");
        else {
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
                        alert("Th??m khuy???n m??i th??nh c??ng!");
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
                        alert("Th??m khuy???n m??i th??nh c??ng!");
                        CloseAddPromotionModal();
                    })
            }
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
                    <span>Xin ch??o, T???n</span>
                    <button className='button' style={{ background: "#CC0000", border: "1px solid #CC0000" }}>????ng xu???t</button>
                </div>
            </div>
            <div className='title-container'>
                <span className='title'>Danh s??ch khuy???n m??i</span>
                <div id='search-exit-container'>
                    <div className='search-form'>
                        <input placeholder='M?? khuy???n m??i...' />
                        <button className='button'>T??m</button>
                    </div>
                    <button className='button' style={{ background: "#330099", border: "1px solid #330099" }} onClick={OpenAddPromotionModal}>Th??m khuy???n m??i</button>
                </div>
            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">T??n khuy???n m??i</th>
                            <th scope="col">Tuy???n xe</th>
                            <th scope="col">Ng??y b???t ?????u</th>
                            <th scope="col">Ng??y k???t th??c</th>
                            <th scope="col">Tr???ng th??i</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            promotions.map(promotion => {
                                return <tr>
                                    <td data-label="T??n khuy???n m??i">{promotion.title}</td>
                                    <td data-label="Tuy???n xe">{promotion.departure + " - " + promotion.destination}</td>
                                    <td data-label="Ng??y b???t ?????u">{new Date(new Date(promotion.startDate).getTime() - 7 * 3600 * 1000).toLocaleDateString()}</td>
                                    <td data-label="Ng??y k???t th??c">{new Date(new Date(promotion.endDate).getTime() - 7 * 3600 * 1000).toLocaleDateString()}</td>
                                    <td data-label="Tr???ng th??i">{(promotion.status) ? "??ang s??? d???ng" : "Kh??ng s??? d???ng"}</td>
                                    <td data-label="" className='button-container'>
                                        <button className='button' onClick={() => OpenDetailPromotionModal(promotion._id)}>Chi ti???t</button>
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
                        <span>Chi ti???t khuy???n m??i</span>
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
                                            <span>M?? khuy???n m??i:</span>
                                            <p>{promotionChoosed._id}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>T??n khuy???n m??i:</span>
                                            <p>{promotionChoosed.title}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Tuy???n xe:</span>
                                            <p>{promotionChoosed.departure + " - " + promotionChoosed.destination}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ng??y b???t ?????u:</span>
                                            <p>{new Date(promotionChoosed.startDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ng??y k???t th??c:</span>
                                            <p>{new Date(promotionChoosed.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ph???n tr??m gi???m:</span>
                                            <p>{promotionChoosed.percentDiscount}%</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>S??? v??:</span>
                                            <p>{(promotionChoosed.quantityTicket != null) ? promotionChoosed.quantityTicket : "0"} v??</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>M???c gi?? h??a ????n:</span>
                                            <p>{promotionChoosed.purchaseAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}??</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>M???c gi???m t???i ??a:</span>
                                            <p>{promotionChoosed.maximumDiscount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}??</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ng??n s??ch:</span>
                                            <p>{promotionChoosed.budget.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}??</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Tr???ng th??i:</span>
                                            <p>{(promotionChoosed.status) ? "??ang s??? d???ng" : "Kh??ng s??? d???ng"}</p>
                                        </div>
                                    </>
                                if (promotionChoosed.percentDiscount == null)
                                    return <>
                                        <div className='input-modal'>
                                            <span>M?? khuy???n m??i:</span>
                                            <p>{promotionChoosed._id}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>T??n khuy???n m??i:</span>
                                            <p>{promotionChoosed.title}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Tuy???n xe:</span>
                                            <p>{promotionChoosed.departure + " - " + promotionChoosed.destination}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ng??y b???t ?????u:</span>
                                            <p>{new Date(promotionChoosed.startDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ng??y k???t th??c:</span>
                                            <p>{new Date(promotionChoosed.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>M???c gi?? h??a ????n:</span>
                                            <p>{promotionChoosed.purchaseAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}??</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>S??? v??:</span>
                                            <p>{(promotionChoosed.quantityTicket != null) ? promotionChoosed.quantityTicket : "0"} v??</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>S??? ti???n gi???m:</span>
                                            <p>{promotionChoosed.moneyReduced.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}??</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Ng??n s??ch:</span>
                                            <p>{promotionChoosed.budget.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}??</p>
                                        </div>
                                        <div className='input-modal'>
                                            <span>Tr???ng th??i:</span>
                                            <p>{(promotionChoosed.status) ? "??ang s??? d???ng" : "Kh??ng s??? d???ng"}</p>
                                        </div>
                                    </>
                            })
                        }
                    </div>
                    <div className='footer-modal'>
                        <button className='button'>C???p nh???t</button>
                    </div>
                </div>
            </div>
            <div className='modal-container' id='add-promotion-modal'>
                <div className='modal'>
                    <div className='header-modal'>
                        <span>Th??m khuy???n m??i</span>
                        <img className='exit-icon' onClick={CloseAddPromotionModal} src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='exit' />
                    </div>
                    <div className='body-modal'>
                        <div className='input-modal'>
                            <span>Lo???i khuy???n m??i:</span>
                            <select onChange={ChooseTypePromotion} id="typePromotion">
                                <option value={"63c252a602c477dd6927806c"}>Khuy???n m??i ph???n tr??m</option>
                                <option value={"63c252b102c477dd6927806e"}>Khuy???n m??i ti???n m???t</option>
                            </select>
                        </div>
                        <div className='input-modal'>
                            <span>H??nh th???c gi???m:</span>
                            <select onChange={ChooseWayPromotion} id="wayPromotion">
                                <option value={"1"}>Khuy???n m??i d???a v??o s??? v??</option>
                                <option value={"0"}>Khuy???n m??i d???a v??o ti???n h??a ????n</option>
                            </select>
                        </div>
                        <div className='input-modal'>
                            <span>Tuy???n xe:</span>
                            <select id="routePromotion">
                                {
                                    routes.map(route => {
                                        return <option value={route._id}>{route.departure.name + " ?????n " + route.destination.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='input-modal'>
                            <span>T??n khuy???n m??i:</span>
                            <input id="namePromotion" />
                        </div>
                        <div className='input-modal' id='priceTicketPromotion'>
                            <span>M???c ti???n gi???m:</span>
                            <input type={'number'} defaultValue={0} id="priceTicketStandard" />
                        </div>
                        <div className='input-modal' id='quantityTicketPromotion' >
                            <span>S??? v??:</span>
                            <input type={'number'} defaultValue={0} id="quantityTicketDiscount" />
                        </div>
                        <div className='input-modal' id="percent-container">
                            <span>Ph???n tr??m gi???m:</span>
                            <input type={'number'} defaultValue={0} max={100} id="percentDiscount" />
                        </div>
                        <div className='input-modal' id="money-container">
                            <span>S??? ti???n gi???m:</span>
                            <input type={'number'} defaultValue={0} max={100} id="moneyDiscount" />
                        </div>
                        <div className='input-modal'>
                            <span>Ng??n s??ch:</span>
                            <input type={'number'} defaultValue={0} id="budget" />
                        </div>
                        <div className='input-modal'>
                            <span>Ng??y b???t ?????u:</span>
                            <input type={'date'} id="startDatePromotion" />
                        </div>
                        <div className='input-modal'>
                            <span>Ng??y k???t th??c:</span>
                            <input type={'date'} id="endDatePromotion" />
                        </div>
                    </div>
                    <div className='footer-modal'>
                        <button className='button' onClick={AddPromotion}>Th??m khuy???n m??i</button>
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

export default Promotion;