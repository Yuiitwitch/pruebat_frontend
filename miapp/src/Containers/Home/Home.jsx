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
    // funcion editar pedidos
    const editOrder = async (id) => {

        let body = {
        country: editarPedidos.country,
        date: editarPedidos.date,
        company: editarPedidos.company,
        status: editarPedidos.status,
        type: editarPedidos.type
        }



        let res = await axios.put(`https://pruebatecnicaa.herokuapp.com/order/${id}`, body)

        seteditoPedidos(res.data);
    }
    // funcion borrar pedidos
    const deleteOrder = async (id) => {

        try { 

        let res = await axios.delete(`https://pruebatecnicaa.herokuapp.com/order/${id}`)

        setborradoPedidos();

    }catch (error){
        console.log("recarga la pagina".error)
    }
    }
    //muestra todos los pedidos
    const showOrder = async () => {
        let res = await axios.get("https://pruebatecnicaa.herokuapp.com/order")

        setPedidos(res.data);
    }
    //funcion para buscar pedidos
    const buscador = async () => {
        let input = document.getElementById("buscador").value;
        let res = await axios.get("https://pruebatecnicaa.herokuapp.com/order/"+input)

        setPedidos(res.data);
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
        <input id="buscador" placeholder ="Find Order"/>
        <button onClick={() => buscador()}>Buscar</button>
        
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
                    <button className="buttonDelete" onClick={() => deleteOrder(pedido.id)} >delete</button>
                    <button className="buttonEdit" onClick={() => editOrder(editarPedidos)} >edit</button>
                    
                    </div>
                )
            })}
            </div>
            </div>
    )
}


export default Home