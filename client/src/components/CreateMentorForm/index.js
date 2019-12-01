import React, { Component } from 'react';
import fire from "../../config/Fire";
import API from "../../utils/API";
import cogoToast from "cogo-toast";

class CreateMentorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            designation: '',
            mentor: '',
            proteges: [],
            firstName: "",
            lastName: "",
            manager: ""
        }
    }

    login = e => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            cogoToast.success("Successful login!");
            // document.location.href = '/home'
        }).catch((error) => {
            console.log(error)
        })
    }

    signup = e => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(data => {
                console.log(data.user.email);
                console.log(data.user.uid)
                API.createMentor({
                    email: data.user.email,
                    uid: data.user.uid,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    proteges: this.state.proteges,
                    manager: this.state.manager
                })
            }).catch(err => console.log(err))
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleArrayChange = event => {
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
            proteges: [event.target.value]
        })
    }

    handleArrayAddition = event => {
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
            proteges: [...this.state.proteges, event.target.value]
        })

    }


    render() {
        return (
            <div className="login-form">
                <div id="login-welcome">
                    Create a User Below.
      </div>
                <form>
                    <br />
                    <input value={this.state.email} onChange={this.handleInputChange} type="email" name="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" />
                    <br />
                    <input value={this.state.password} onChange={this.handleInputChange} type="password" name="password" className="form-control" id="exampleInputPassword2" placeholder="Password" />
                    {/* <button type="submit" onClick={this.login} className="btn">Login</button> */}

                    <br />
                    <input value={this.state.firstName} onChange={this.handleInputChange} type="text" name="firstName" className="form-control" placeholder="First name" />
                    <br />
                    <input value={this.state.lastName} onChange={this.handleInputChange} type="text" name="lastName" className="form-control" placeholder="Last name" />
                    <br />
                    <input value={this.state.protege} onChange={this.handleInputChange} type="text" name="proteges" className="form-control" placeholder="Protege" />
                    {this.props.proteges ? <select id="protegeDropMenu" value={this.state.protege} onChange={this.handleArrayChange} name="protege">
                        {this.props.proteges.map(protege => (
                            <option key={protege._id} value={protege._id}>{protege.firstName} {protege.lastName}</option>
                        ))}    
                    </select> : null }
                    <br />
                    <input value={this.state.manager} onChange={this.handleInputChange} type="text" name="manager" className="form-control" placeholder="Manager" />

                    <button onClick={this.signup} className="btn btn-outline-info">Create Mentor</button>
                    {/* <button onClick={this.logOut} style={{ marginTop: '5px', marginLeft: '25px' }} className="btn btn-danger">Logout</button> */}
                </form>
            </div>
        )
    }



}

export default CreateMentorForm;