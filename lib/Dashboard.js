import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './../styles/Dashboard.css'
import { useParams } from 'react-router';

import * as ReactBootStrap from 'react-bootstrap';


let socket;

const Dashboard = () => {

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [trains, setTrains] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:5000";

    const params = useParams();

    useEffect(() => {

        socket = io(ENDPOINT);

        setCity(params.city);
        setName(params.name);

        console.log({ name: name, city: city })

        socket.emit('join', params, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, params]);

    useEffect(() => {
        socket.on('message', message => {
            console.log(message)
            let train = message.train;
            if(train.id) {
                setId(train.id)
            }
            let trains = message.trains;
            setTrains(trains)
            let msg = message.text;
            setMessages(messages => [...messages, msg]);

        }, []);

        socket.on("cityData", ({ trains }) => {
            setTrains(trains);
        });
    }, []);

    

    const onFormSubmit = (event) => {
        
        event.preventDefault();
        let from = event.target.elements.From.value;
        let current = event.target.elements.Current.value;
        let next = event.target.elements.Next.value;
        let to = event.target.elements.To.value;
        let status = event.target.elements.status.value;
        let delay = event.target.elements.delay.value;

        let message = {
            id, name, from, current, next, to, status, delay
        }

        socket.emit("sendMessage", message, () => {

        });
    }

    return (
        <div className="work-space-container">
            <div className="work-space-sidebar">
                <div className="control-panel">

                <form className="login-form" onSubmit={onFormSubmit}>
                    <input id="From" type="text" placeholder="From"></input>
                    <input id="Current" type="text" placeholder="Current Station"></input>
                    <input id="Next" type="text" placeholder="Next Station"></input>
                    <input id="To" type="text" placeholder="To"></input>


                    <select id="status">
                        <option value="Stopped">Stopped</option>
                        <option value="Ready">Ready</option>
                        <option value="Started">Departured</option>
                        <option value="Arrived">Arrived</option>
                    </select>


                    <select id="delay">
                        <option value="On-Time">On Time</option>
                        <option value="Early">Bit Early</option>
                        <option value="Delay">Bit Delay</option>
                    </select>

                    <button id="send-button">Send</button>
                </form>
                </div>
                <div className="message-log">
                    <div>
                        <ReactBootStrap.Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((msg) => {
                                    return <tr key={Math.random()}>
                                        <td>{new Date().getTime()}</td>
                                        <td>{msg}</td>
                                    </tr>
                                })}
                            </tbody>
                        </ReactBootStrap.Table>
                    </div>
                </div>
            </div>
            <div className="work-space-contents">
                <div className="work-space-contents-body">
                    <div>
                        <ReactBootStrap.Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Train Name</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Current</th>
                                    <th>Status</th>
                                    <th>Delay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trains.map((train) => {
                                    return <tr key={train.train_id}>
                                        <td>{train.train_id}</td>
                                        <td>{train.name}</td>
                                        <td>{train.from}</td>
                                        <td>{train.to}</td>
                                        <td>{train.current}</td>
                                        <td>{train.status}</td>
                                        <td>{train.delay}</td>
                                    </tr>
                                })}
                            </tbody>
                        </ReactBootStrap.Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;