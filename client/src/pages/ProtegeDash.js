import React, { Component } from "react";
import "./Home.css";
import Nav from "../components/Nav";
// import Header from "../components/Header";
import ProtegeCallBtnContainer from "../components/ProtegeCallBtnContainer"
// import ProtegeC1 from "../components/ProtegeC1"
// import ProtegeC2 from "../components/ProtegeC2"
// import ProtegeC3 from "../components/ProtegeC3"
// import ProtegeC4 from "../components/ProtegeC4"
// import ProtegeC5 from "../components/ProtegeC5"
// import ProtegeC6 from "../components/ProtegeC6"
// import ProtegeC7 from "../components/ProtegeC7"
// import DailyResultsProtege from "../components/DailyResultsProtege"
// import RemindersProtege from "../components/RemindersProtege"
// import ToDoInput from "../components/ToDoInput"
// import DataBasicProtege from "../components/DataBasicProtege"
// import DataAdvancedProtege from "../components/DataAdvancedProtege"
import AppointmentItem from "../components/AppointmentItem"
import AppointmentCreator from "../components/AppointmentCreator"
import DialDataSide from "../components/DialDataSide"
import API from "../utils/API";
import SourceCreator from "../components/SourceCreator"



class ProtegeDash extends Component {

    state = {
        user: "",
        appointments: [],
        userData: "",
        dialData: "",
        contactData: "",
        numScheduled: 0,
        CPDials: 0,
        BPDials: 0,
        CCDials: 0,
        BCDials: 0,
        CNDials: 0,
        BNDials: 0,
        CPContacts: 0,
        BPContacts: 0,
        CCContacts: 0,
        BCContacts: 0,
        CNContacts: 0,
        BNContacts: 0,
        CPAppts: 0,
        BPAppts: 0,
        CCAppts: 0,
        BCAppts: 0,
        CNAppts: 0,
        BNAppts: 0,
        CSDials: 0,
        BSDials: 0,
        CSContacts: 0,
        BSContacts: 0,
        CSAppts: 0,
        BSAppts: 0
    }

    componentDidMount = () => {
        // console.log("Loaded Protege Page")
        // this.gatherAppointments()
        // console.log("User Data: " + this.props.user.uid)
        setTimeout(() => { this.getUserData() }, 1200)
    }

    getUserData = () => {
        console.log(this.props.user.uid)
        var userID = this.props.user.uid
        API.getUserData(userID)
            .then(res =>
                this.setState({
                    userData: res.data[0],
                    dialData: res.data[0].dials
                }), this.getContactData(),
                this.gatherAppointments(),
                setTimeout(() => { this.parseDials() }, 500)
            )
    }

    getContactData = () => {
        setTimeout(() => {
            console.log("Searching for contacts using: " + this.state.userData._id)
            API.getContacts(this.state.userData._id)
                .then(res =>
                    // console.log(res.data.length)
                    this.setState({
                        contactData: res.data
                    }),
                    setTimeout(() => { this.parseContacts() }, 500)
                )
        }, 1000)

    }


    gatherAppointments = () => {
        setTimeout(() => {
            console.log("Gathering appointemnts using ID: " + this.state.userData._id)
            API.getAppointments(this.state.userData._id)
                .then(res =>
                    this.setState({
                        appointments: res.data
                    }),
                    setTimeout(() => { this.parseAppointments() }, 500)
                )
        }, 1000)
    };

    parseAppointments = () => {
        console.log("Parsing appointments: " + this.state.appointments)
        var CPA = 0;
        var BPA = 0;
        var CCA = 0;
        var BCA = 0;
        var CNA = 0;
        var BNA = 0;
        var CSA = 0;
        var BSA = 0;
        for (var i = 0; i < this.state.appointments.length; i++) {
            console.log(this.state.appointments[i])
            switch (this.state.appointments[i].type) {
                case "CPD":
                    CPA++
                    break;
                case "BPD":
                    BPA++
                    break;
                case "CCD":
                    CCA++
                    break;
                case "BCD":
                    BCA++
                    break;
                case "CND":
                    CNA++
                    break;
                case "BND":
                    BNA++
                    break;
                case "CSD":
                    CSA++
                    break;
                case "BSD":
                    BSA++
                    break;
                default:
                    break;
            }
        }
        this.setState({
            CPAppts: CPA,
            BPAppts: BPA,
            CCAppts: CCA,
            BCAppts: BCA,
            CNAppts: CNA,
            BNAppts: BNA,
            CSAppts: CSA,
            BSAppts: BSA
        })
    }

    parseDials = () => {
        console.log("Parsing Dials: " + this.state.dialData)
        var CPD = 0;
        var BPD = 0;
        var CCD = 0;
        var BCD = 0;
        var CND = 0;
        var BND = 0;
        var CSD = 0;
        var BSD = 0;
        for (var i = 0; i < this.state.dialData.length; i++) {
            // console.log(this.state.dialData[i])
            switch (this.state.dialData[i].type) {
                case "CPD":
                    CPD++
                    break;
                case "BPD":
                    BPD++
                    break;
                case "CCD":
                    CCD++
                    break;
                case "BCD":
                    BCD++
                    break;
                case "CND":
                    CND++
                    break;
                case "BND":
                    BND++
                    break;
                case "CSD":
                    CSD++
                    break;
                case "BSD":
                    BSD++
                    break;
                default:
                    break;
            }
        }
        this.setState({
            CPDials: CPD,
            BPDials: BPD,
            CCDials: CCD,
            BCDials: BCD,
            CNDials: CND,
            BNDials: BND,
            CSDials: CSD,
            BSDials: BSD
        })
    }

    parseContacts = () => {
        console.log("Parsing Contacts: " + this.state.contactData)
        var CPC = 0;
        var BPC = 0;
        var CCC = 0;
        var BCC = 0;
        var CNC = 0;
        var BNC = 0;
        var CSC = 0;
        var BSC = 0;
        for (var i = 0; i < this.state.contactData.length; i++) {
            switch (this.state.contactData[i].type) {
                case "CPD":
                    CPC++
                    break;
                case "BPD":
                    BPC++
                    break;
                case "CCD":
                    CCC++
                    break;
                case "BCD":
                    BCC++
                    break;
                case "CND":
                    CNC++
                    break;
                case "BND":
                    BNC++
                    break;
                case "CSD":
                    CSC++
                    break;
                case "BSD":
                    BSC++
                    break;
                default:
                    break;
            }
        }
        this.setState({
            CPContacts: CPC,
            BPContacts: BPC,
            CCContacts: CCC,
            BCContacts: BCC,
            CNContacts: CNC,
            BNContacts: BNC,
            CSContacts: CSC,
            BSContacts: BSC
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron" style={{}}>
                    {/* ProtegeHeader */}
                    <h1>Welcome {this.state.userData.firstName} {this.state.userData.lastName}!</h1>
                </div>
                <div className="row">
                    {/* Main Section 8/12 Left
                        --Has Tabbed Card
                        --Each Tab indicated a different button 
                        // Initially can list all buttons on a big ass dashboard
                    */}
                    <div className="col-lg-8">
                        <ProtegeCallBtnContainer
                            rerender={this.getUserData}
                            user={this.state.userData}
                            userID={this.state.userData._id}
                        />
                    </div>

                    {/* Daily Results 4/12 Right
                        /// Top - Half ///
                        Dials: 
                        Contacts:
                        Appointments:
                        /// Bottom - Half ///
                        Todos:
                        Notes:
                    */}
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-12">
                                <DialDataSide
                                    userID={this.state.userData._id}
                                    contactData={this.state.contactData}
                                    dialData={this.state.dialData}
                                    apptData={this.state.appointments}
                                    CPAppts={this.state.CPAppts}
                                    BPAppts={this.state.BPAppts}
                                    CCAppts={this.state.CCAppts}
                                    BCAppts={this.state.BCAppts}
                                    CNAppts={this.state.CNAppts}
                                    BNAppts={this.state.BNAppts}
                                    CPDials={this.state.CPDials}
                                    BPDials={this.state.BPDials}
                                    CCDials={this.state.CCDials}
                                    BCDials={this.state.BCDials}
                                    CNDials={this.state.CNDials}
                                    BNDials={this.state.BNDials}
                                    CPContacts={this.state.CPContacts}
                                    BPContacts={this.state.BPContacts}
                                    CCContacts={this.state.CCContacts}
                                    BCContacts={this.state.BCContacts}
                                    CNContacts={this.stateCNContacts}
                                    BNContacts={this.state.BNContacts}
                                    CSDials={this.state.CSDials}
                                    BSDials={this.state.BSDials}
                                    CSContacts={this.state.CSContacts}
                                    BSContacts={this.state.BSContacts}
                                    CSAppts={this.state.CSAppts}
                                    BSAppts={this.state.BSAppts}
                                />
                            </div>
                            <div className="col-12">
                                <SourceCreator userData={this.state.userData}/>
                            </div>
                        </div>
                    </div>
                    {/* Mid Section narrow height 12/12
                        Reminder / Todo Input 
                    */}
                    {/* Lower Section 12/12
                        Data Dashboard Below
                            Basic Data Showing first:
                                Contacts / Dials
                                Appointments / Contacts
                                Appointments / Dials 
                                Chart of Call Types
                                Chart of Contact Types
                                Web of Appointment Types
                    
                    */}
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card" style={{ textAlign: "center" }}>
                            <h4>Your Appointments:</h4>
                            {this.state.appointments.map(appt => (
                                <AppointmentItem
                                    key={appt._id}
                                    id={appt._id}
                                    apptname={appt.apptname}
                                    type={appt.type}
                                    held={appt.held}
                                    sold={appt.sold}
                                    dialer={appt.dialer}
                                    source={appt.source}
                                    date={appt.date}
                                    notes={appt.notes}
                                    username={this.state.user}
                                    rerender={this.gatherAppointments}
                                />
                            ))}
                        </div>
                    </div>
                    {/* <div className="col-lg-1">

                    </div> */}
                    <div className="col-lg-4">
                        <AppointmentCreator
                            userID={this.state.userData._id}
                            username={this.state.user}
                            rerender={this.gatherAppointments}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProtegeDash