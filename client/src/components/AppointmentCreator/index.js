import React, { Component } from "react";
import API from "../../utils/API";
import cogoToast from "cogo-toast";



class AppointmentCreator extends Component {

    state = {
        apptname: "",
        apptsource: "",
        apptnotes: "",
        apptdate: ""
    }

    componentDidMount() {
        // console.log("Loaded Appt Item")
        // console.log(this.props)
        // this.setState({
        //     apptname: this.props.apptname,
        //     apptsource: this.props.source,
        //     apptnotes: this.props.notes,
        //     apptdate: this.props.date
        // })

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    ////////////////////////////////////////////////////////////
    ////////// MODAL FUNCTIONS ////////////////////////////////
    ///////////////////////////////////////////////////////////
    openEditModal = () => {
        this.setState({
            editModalIsOpen: true
        })
    }

    afterOpenEditModal = () => {

    }

    closeEditModal = () => {
        this.setState({
            editModalIsOpen: false
        })
    }

    ///////////////////////////////////////////////////////////
    /////////// APPOINTMENT DATA INPUT ////////////////////////
    ///////////////////////////////////////////////////////////

    handleApptSubmit = event => {
        event.preventDefault()

        var ApptData = {
            apptname: this.state.apptname,
            source: this.state.apptsource,
            notes: this.state.apptnotes,
            date: this.state.apptdate,
            dialer: this.props.username,
            type: this.state.type,
        }

        console.log(ApptData)



        API.saveAppointment({
            apptname: this.state.apptname,
            source: this.state.apptsource,
            notes: this.state.apptnotes,
            date: this.state.apptdate,
            dialer: this.props.username,
            type: this.state.type
        }).then(res =>
            cogoToast.info("Saved Appt!")
        ).catch(err => console.log(err))

        setTimeout( () => {
            // cogoToast.loading("Re-loading appointments")
            this.props.rerender()
        }, 1000)

    }






    render() {
        return (
            <div className="card" style={{padding: '10%'}}>
                <h4>Create appointment:</h4>
                <form className="form-group">
                    <label>Type of Appointment</label>
                    <select className="custom-select my-1 mr-sm-2" value={this.state.type} onChange={this.handleInputChange} name="type" type="text" placeholder="Choose an appointment type..">
                        <option value="CPD">Cashflow Prospect</option>
                        <option value="BPD">Businessowner Prospect</option>
                        <option value="CCD">Cashflow Client</option>
                        <option value="BCD">Businessowner Client</option>
                        <option value="CND">Cashflow Natural Mkt</option>
                        <option value="BND">Business Natural Mkt</option>
                    </select>

                    <label>Appointment Name:</label>
                    <input id="apptname-input" className="form-control" value={this.state.apptname} onChange={this.handleInputChange} name="apptname" type="text" placeholder="Give your appointment a name!" />

                    <label>Date of Appointment:</label>
                    <input id="date-input" className="form-control" value={this.state.apptdate} onChange={this.handleInputChange} name="apptdate" type="date" placeholder="Enter date for your appointment" />

                    <label>Lead Source:</label>
                    <input id="source-input" className="form-control" value={this.state.apptsource} onChange={this.handleInputChange} name="apptsource" type="text" placeholder="Source of Lead" />

                    <label>Appointment Notes:</label>
                    <input id="note-input" className="form-control" value={this.state.apptnotes} onChange={this.handleInputChange} name="apptnotes" type="text" placeholder="Enter any notes..." />
                    <br />
                    <button id="appt-input-btn" className="btn-success form-control" onClick={this.handleApptSubmit}>Submit Appointment</button>
                </form>

            </div>
        )

    }
}

export default AppointmentCreator