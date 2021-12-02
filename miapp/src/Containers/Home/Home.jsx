//importamos React y Axios para la llamada a los endpoint

import React, { useState, useEffect } from 'react'
import axios from 'axios';

//importamos css de Home para los estilos
import './Home.css'

const Home = () => {

    const [pedidos,setPedidos] = useState([]);
    const [borradoPedidos, setborradoPedidos] = useState([]);
    const [editarPedidos, seteditoPedidos] = useState([]);


    useEffect(()=> {
        showOrder();
        deleteOrder();
        editOrder();
    },[])

    useEffect(()=> {

    })

    const editOrder = async () => {

        

        let res = await axios.update("https://pruebatecnicaa.herokuapp.com/order")

        seteditoPedidos(res.data);
    }

    const deleteOrder = async () => {

        let res = await axios.delete("https://pruebatecnicaa.herokuapp.com/order")

        setborradoPedidos(res.data);
    }

    const showOrder = async () => {
        let res = await axios.get("https://pruebatecnicaa.herokuapp.com/order")

        setPedidos(res.data);
        console.log(res.data)
    }
    return(
        <div className="generalPedidos">
        <div className="titulos">
            <h3 className="nombresTitulos">ORDER ID</h3>
            <h3 className="nombresTitulos">COUNTRY</h3>
            <h3 className="nombresTitulos">DATE</h3>
            <h3 className="nombresTitulos">COMPANY NAME</h3>
            <h3 className="nombresTitulos">STATUS</h3>
            <h3 className="nombresTitulos">TYPE</h3>
        </div>
            <div>
            {pedidos.map((pedido)=>{
                return(
                    <div className="listadoPedidos" key={pedido.id}>
                    <p className="lineaPedidos">{pedido.id}</p>
                    <p className="lineaPedidos">{pedido.country}</p>
                    <p className="lineaPedidos">{pedido.date}</p>
                    <p className="lineaPedidos">{pedido.company}</p>
                    <p className="lineaPedidos">{pedido.status}</p>
                    <p className="lineaPedidos">{pedido.type}</p>
                    <button className="buttonDelete" onClick={() => deleteOrder(borradoPedidos)} ></button>
                    <button className="buttonEdit" onClick={() => editOrder(editarPedidos)} ></button>
                    
                    </div>
                )
            })}
            </div>
            </div>
    )
}


export default Home