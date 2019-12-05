import React, { Component } from 'react';
import API from '../../utils/API';
// import API from "../../utils/API";
import { Bar } from 'react-chartjs-2';

class DialDataSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numContacts: 0,
            numScheduled: 0,
            date: "",
            parsedDials: ""
        }
    }

    componentDidMount = () => {
        // setTimeout(() => {
        //     this.getContacts(this.props.userID)
        // }, 1300)
        // this.getContacts()

    }


    // getContacts = (id) => {
    //     // var userID = this.props.userID

    //     API.getContacts(id)
    //         .then(res => {
    //             console.log(res.data.length)
    //             this.setState({
    //                 numContacts: res.data.length
    //             })
    //         })
    // }

    getNumContacts = () => {
        var localNumContacts = 0
        for (var i = 0; i < this.props.dialData.length; i++) {
            if (this.props.dialData[i].contact === true) {
                localNumContacts++
            }
        }

        console.log(localNumContacts)
        this.updateContacts(localNumContacts)
    }



    updateContacts = num => {
        this.setState({
            numContacts: num
        })
    }




    render() {
        return (
            <div className="card">
                <h4 style={{ textAlign: 'center' }}><u>Weekly Stats:</u></h4>
                <Bar data={{
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "My First dataset",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [0, 10, 5, 2, 20, 30, 45],
                    }]
                }} />
                <ul>Dials:{this.props.dialData.length}</ul>
                <li>Cashflow Prospect Dials: {this.props.CPDials}</li>
                <li>Business Prospect Dials: {this.props.BPDials}</li>
                <li>Cashflow Client Dials: {this.props.CCDials}</li>
                <li>Business Client Dials: {this.props.BCDials}</li>
                <li>Cashflow Natural Mkt Dials: {this.props.CNDials}</li>
                <li>Business Natural Mkt Dials: {this.props.BNDials}</li>
                <li>Cashflow Suspect Dials: {this.props.CSDials}</li>
                <li>Business Suspect Dials: {this.props.BSDials}</li>
                <li>Cashflow Referral Dials: {this.props.CRDials}</li>
                <li>Business Referral Dials: {this.props.BRDials}</li>
                <li>Cashflow Target Mkt Dials: {this.props.CTDials}</li>
                <li>Business Target Mkt Dials: {this.props.BTDials}</li>
                <br />
                <ul>Contacts: {this.props.contactData.length} </ul>
                <li>Cashflow Prospect Contacts: {this.props.CPContacts}</li>
                <li>Business Prospect Contacts: {this.props.BPContacts}</li>
                <li>Cashflow Client Contacts: {this.props.CCContacts}</li>
                <li>Business Client Contacts: {this.props.BCContacts}</li>
                <li>Cashflow Natural Mkt Contacts: {this.props.CNContacts}</li>
                <li>Business Natural Mkt Contacts: {this.props.BNContacts}</li>
                <li>Cashflow Suspect Contacts: {this.props.CSContacts}</li>
                <li>Business Suspect Contacts: {this.props.BSContacts}</li>
                <li>Cashflow Referral Contacts: {this.props.CRContacts}</li>
                <li>Business Referral Contacts: {this.props.BRContacts}</li>
                <li>Cashflow Target Mkt Contacts: {this.props.CTContacts}</li>
                <li>Business Target Mkt Contacts: {this.props.BTContacts}</li>
                <br />
                <ul>Scheduled: {this.props.apptData.length}</ul>
                <li>Cashflow Prospect Appts: {this.props.CPAppts}</li>
                <li>Business Prospect Appts: {this.props.BPAppts}</li>
                <li>Cashflow Client Appts: {this.props.CCAppts}</li>
                <li>Business Client Appts: {this.props.BCAppts}</li>
                <li>Cashflow Natural Mkt Appts: {this.props.CNAppts}</li>
                <li>Business Natural Mkt Appts: {this.props.BNAppts}</li>
                <li>Cashflow Suspect Appts: {this.props.CSappts}</li>
                <li>Business Suspect Appts: {this.props.BSAppts}</li>
                <li>Cashflow Referral Appts: {this.props.CRAppts}</li>
                <li>Business Referral Appts: {this.props.BRAppts}</li>
                <li>Cashflow Target Mkt Appts: {this.props.CTAppts}</li>
                <li>Business Target Mkt Appts: {this.props.BTAppts}</li>
                <hr />

                <h5 style={{ textAlign: 'center' }}><u>Broken down by Area</u></h5>
                <ul>

                </ul>
            </div>

        )
    }

}

export default DialDataSide;