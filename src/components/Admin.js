import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';
import Menu from '../components/Menu';
import BusStop from './BusStop';
import BusLine from './BusLine';
import Ticket from './Ticket';
import Customer from './Customer';
import Bus from './Bus';
import Promotion from './Promotion';
import Statistical from './Statistical';

function Admin() {
    return (
        <section id='Admin'>
            <Menu />
            <Routes>
                <Route path="/*" element={<BusLine />} />
                <Route path='/ticket' element={<Ticket />} />
                <Route path='/busStop' element={<BusStop />} />
                <Route path='/customer' element={<Customer />} />
                <Route path='/bus' element={<Bus />} />
                <Route path='/promotion' element={<Promotion />} />
                <Route path='/statistical' element={<Statistical />} />
            </Routes>
        </section>
    );
}

export default Admin;