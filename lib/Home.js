import React from 'react';
import './../styles/Home.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            city: undefined,
            error:undefined
        }
        this.onFormSubmit  = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        
        event.preventDefault();
        let name = event.target.elements.name.value;
        let city = event.target.elements.city.value;
        if(name && city) {
            // let response = await axios.post(`${configs.loginApi.host}:${configs.loginApi.port}${configs.loginApi.endpoint.login}`, {"username": username, "password": password})
            
            
                this.props.history.push(`/dashboard/${name}/${city}`)
            
        } 
    }

    render() {
        return (
            <div>
            <div className="login-container">
                <form className="login-form" onSubmit={this.onFormSubmit}>
                    <input id="name" type="text" placeholder="Train Name"></input>
                    <select id="city">
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Kolkata">Kolkata</option>
                    </select>
                    <select id="device">
                        <option value="Web">Web Application</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Tab">Tablet</option>
                    </select>
                    <button id="login-button">Join</button>
                </form>
            </div>
            
            </div>
        )
    }
}