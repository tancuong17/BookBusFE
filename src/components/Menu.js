import React, { useEffect } from 'react';
import '../App.css';
import { Outlet, Link } from "react-router-dom";
import { RiBusFill } from 'react-icons/ri';
import { HiOutlineTicket } from 'react-icons/hi';
import { GiBusStop } from 'react-icons/gi';
import { FiUsers } from 'react-icons/fi';
import { FaRoute, FaChartLine } from 'react-icons/fa';
import { TbSpeakerphone  } from 'react-icons/tb';

function Menu() {
    useEffect(() => {
        let path = window.location.pathname;
        let menuItem = document.getElementsByClassName("menu-item");
        for (let i = 0; i < menuItem.length; i++) {
            menuItem[i].style.background = "#000033";
            menuItem[i].style.color = "white";
        }
        if(path === "/admin"){
            menuItem[0].style.background = "white";
            menuItem[0].style.color = "#000033";
        }
        else if(path === "/admin/ticket"){
            menuItem[1].style.background = "white";
            menuItem[1].style.color = "#000033";
        }
        else if(path === "/admin/busStop"){
            menuItem[2].style.background = "white";
            menuItem[2].style.color = "#000033";
        }
        else if(path === "/admin/customer"){
            menuItem[3].style.background = "white";
            menuItem[3].style.color = "#000033";
        }
        else if(path === "/admin/bus"){
            menuItem[4].style.background = "white";
            menuItem[4].style.color = "#000033";
        }
        else if(path === "/admin/promotion"){
            menuItem[5].style.background = "white";
            menuItem[5].style.color = "#000033";
        }
    }, [])
    function ChooseMenu(e) {
        let menuItem = document.getElementsByClassName("menu-item");
        for (let i = 0; i < menuItem.length; i++) {
            menuItem[i].style.background = "#000033";
            menuItem[i].style.color = "white";
        }
        e.target.style.background = "white";
        e.target.style.color = "#000033";
    }
    return (
        <>
            <section id='Menu'>
                <Link to="/admin" className='menu-item' onClick={ChooseMenu}><FaRoute className='icon' /><span>Quản lý tuyến xe</span></Link>
                <Link to="/admin/ticket" className='menu-item' onClick={ChooseMenu}><HiOutlineTicket className='icon' /><span>Quản lý vé xe</span></Link>
                <Link to="/admin/busStop" className='menu-item' onClick={ChooseMenu}><GiBusStop className='icon' /><span>Quản lý khu vực</span></Link>
                <Link to="/admin/customer" className='menu-item' onClick={ChooseMenu}><FiUsers className='icon' /><span>Quản lý khách hàng</span></Link>
                <Link to="/admin/bus" className='menu-item' onClick={ChooseMenu}><RiBusFill className='icon' /><span>Quản lý xe khách</span></Link>
                <Link to="/admin/promotion" className='menu-item' onClick={ChooseMenu}><TbSpeakerphone className='icon' /><span>Quản lý khuyến mãi</span></Link>
                <Link to="/admin/promotion" className='menu-item' onClick={ChooseMenu}><FaChartLine className='icon' /><span>Quản lý thống kê</span></Link>
            </section>
            <Outlet />
        </>
    );
}

export default Menu;