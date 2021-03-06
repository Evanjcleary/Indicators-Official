import React, { Component } from "react";
import API from "../../utils/API";
import cogoToast from "cogo-toast";
import "./style.css"



class AppointmentCreator extends Component {

    state = {
        apptname: "",
        apptsource: "",
        apptnotes: "",
        apptdate: "",
        appttargetmkt: "",
        apptTagged: "",
        showAppt: false
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
        console.log("Submitting appointment under user ID: " + this.props.userID)

        var ApptData = {
            apptname: this.state.apptname,
            source: this.state.apptsource,
            notes: this.state.apptnotes,
            date: this.state.apptdate,
            dialer: this.props.userID,
            type: this.state.type,
            targetMarket: this.state.appttargetmkt
        }

        console.log(ApptData)



        API.saveAppointment(this.props.userID, {
            apptname: this.state.apptname,
            source: this.state.apptsource,
            notes: this.state.apptnotes,
            date: this.state.apptdate,
            type: this.state.type,
            dialer: this.props.userID,
            targetMarket: this.state.appttargetmkt,
            protege: this.props.userID,
            mentor: this.state.apptTagged
        }).then(res =>
            cogoToast.info("Saved Appt!")
        ).catch(err => console.log(err))

        setTimeout(() => {
            // cogoToast.loading("Re-loading appointments")
            this.props.rerender()
        }, 1000)

    }


    showApptForm = () => {
        if (this.state.showAppt === false) {
            this.setState({
                showAppt: true
            })
        } else {
            this.setState({
                showAppt: false
            })
        }
    }



    render() {
        return (
            <div className="card col-12" id="prospect" style={{ textAlign: 'left', backgroundColor: 'rgba(36,138,255,0.8)', padding: '0' }}>
                <h4 style={{ textAlign: 'center', padding: '10%', backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', margin: '20px' }}>Create Appointment 
                <br/> 
                <span button className="btn btn-sm btn-outline-dark" onClick={this.showApptForm}>Quick Show</span><span button className="btn btn-sm btn-outline-dark" onClick={this.showFullApptForm}>Show Full</span></h4>
                <hr />
                {this.state.showAppt ?
                <div style={{padding: '10px', height: '400px', overflow: 'auto'}}>

                    <form className="form-group">
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', padding: '20px', borderRadius: '30px' }}>
                            <label className="customLabel"><p style={{ color: 'black' }}>Type of Appointment </p></label>
                            <select className="custom-select my-1 mr-sm-2" value={this.state.type} className="" onChange={this.handleInputChange} name="type" type="text" placeholder="Choose an appointment type..">
                                <option value="CPD">Cashflow Prospect</option>
                                <option value="BPD">Businessowner Prospect</option>
                                <option value="CCD">Cashflow Client</option>
                                <option value="BCD">Businessowner Client</option>
                                <option value="CND">Cashflow Natural Mkt</option>
                                <option value="BND">Business Natural Mkt</option>
                                <option value="CSD">Cashflow Suspect</option>
                                <option value="BSD">Business Suspect</option>
                                <option value="CRD">Cashflow Referral</option>
                                <option value="BRD">Business Referral</option>
                                <option value="CTD">Cashflow Target Market</option>
                                <option value="BTD">Business Target</option>
                            </select>
                        </div>

                        <hr />
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', padding: '20px', borderRadius: '30px' }}>

                            <label><p style={{ color: 'black' }}>Appointment Name:</p></label>
                            <input id="apptname-input" className="form-control" value={this.state.apptname} onChange={this.handleInputChange} name="apptname" type="text" placeholder="Give your appointment a name!" />
                        </div>
                        <hr />
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', padding: '20px', borderRadius: '30px' }}>

                            <label><p style={{ color: 'black' }}>Date of Appointment:</p></label>
                            <input id="date-input" className="form-control" value={this.state.apptdate} onChange={this.handleInputChange} name="apptdate" type="date" placeholder="Enter date for your appointment" />
                        </div>
                        <hr />
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', padding: '20px', borderRadius: '30px' }}>
                            <label><p style={{ color: 'black' }}>Mentor Tagged: </p></label>
                            {this.props.mentors ? 
                            <select value={this.props.apptTagged} onChange={this.handleInputChange} name="apptTagged">
                                <option value={"none"}>--Tag Mentor--</option>
                                {this.props.mentors.map(mentor => (
                                    <option key={mentor._id} value={mentor._id}>{mentor.firstName} {mentor.lastName}</option>
                                ))}
                            </select> : null}
                        </div>
                        <hr />
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', padding: '20px', borderRadius: '30px' }}>

                            <label><p style={{ color: 'black' }}>Lead Source: </p></label>
                            {/* <input id="source-input" className="form-control" value={this.state.apptsource} onChange={this.handleInputChange} name="apptsource" type="text" placeholder="Source of Lead" /> */}
                            {this.props.userData.sources ? <select value={this.state.apptsource} onChange={this.handleInputChange} name="apptsource">
                                <option value={"none"}>No Lead Source Selected</option>
                                {this.props.userData.sources.map(source => (
                                    <option key={source} value={source}>{source}</option>
                                ))}
                            </select> : <p>"No lead sources created yet"</p>}
                        </div>
                        <hr />
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', padding: '20px', borderRadius: '30px' }}>

                            <label><p style={{ color: 'black' }}>Target Market: </p></label>
                            {/* <input id="targetmkt-input" className="form-control" value={this.state.apptTargetMkt} onChange={this.handleInputChange} name="appttargetmkt" type="text" placeholder="Target Market goes here" /> */}
                            {this.props.userData.targetMarkets ? <select className="" value={this.state.appttargetmkt} onChange={this.handleInputChange} name="appttargetmkt">
                                <option value={"none"}>No Target Market Selected</option>
                                {this.props.userData.targetMarkets.map(target => (
                                    <option key={target} value={target}>{target}</option>
                                ))}
                            </select> : <p>"No target markets created yet"</p>}
                        </div>
                        <hr />
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', padding: '20px', borderRadius: '30px' }}>

                            <label><p style={{ color: 'black' }}>Appointment Notes:</p></label>
                            <input id="note-input" className="form-control" value={this.state.apptnotes} onChange={this.handleInputChange} name="apptnotes" type="text" placeholder="Enter any notes..." />
                        </div>
                        <br />
                        <button id="appt-input-btn" className="btn-success form-control" onClick={this.handleApptSubmit}>Submit Appointment</button>

                    </form>
                    </div>
                    : null}
            </div>
        )

    }
}

export default AppointmentCreator