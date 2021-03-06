import React, { Component } from "react";
import "./Home.css";
// import ProtegeCallBtnContainer from "../components/ProtegeCallBtnContainer"
import ProtegeCallBtnContainer2 from "../components/ProtegeCallBtnContainer2"
import AppointmentItem from "../components/AppointmentItem"
import AppointmentCreator from "../components/AppointmentCreator"
import DialDataSide from "../components/DialDataSide"
import API from "../utils/API";
import SourceCreator from "../components/SourceCreator"
// import SourceSelector from "../components/SourceSelector"
// import TargetMarketSelector from "../components/TargetMarketSelector"
import TargetMarketCreator from "../components/TargetMarketCreator"
import MainDataViewer from "../components/MainDataViewer"
import NoteCreator from "../components/NoteCreator"
import NoteViewer from "../components/NoteViewer"
import SalesCreator from "../components/SalesCreator"
import SalesItem from "../components/SalesItem"
// import SideNavPage from "../components/SideNavPage"
import MainCalendar from "../components/MainCalendar"
import moment from 'moment'


class ProtegeDash extends Component {

    state = {
        user: "",
        appointments: [],
        mentors: "",
        proteges: "",
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
        BSAppts: 0,
        CRDials: 0,
        CRContacts: 0,
        CRAppts: 0,
        BRDials: 0,
        BRContacts: 0,
        BRAppts: 0,
        CTDials: 0,
        CTContacts: 0,
        CTAppts: 0,
        BTDials: 0,
        BTContacts: 0,
        BTAppts: 0,
        leadSource: "none",
        targetMarket: "none",
        showDials: true,
        showNotes: false,
        // showCreate: false,
        showAnalytics: false,
        showAppts: false,
        showSales: false,
        showNoteViewer: false,
        showCreate: false,
        showSideBars: true
    }

    componentDidMount = () => {
        // console.log("Loaded Protege Page")
        // this.gatherAppointments()
        // console.log("User Data: " + this.props.user.uid)
        setTimeout(() => {
            this.getUserData()
            this.gatherMentors()
            this.gatherProteges()

        }, 1500)
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    setParentState = (data) => {
        this.setState({
            leadSource: data
        })
    }

    setParentStateTargetMkt = (data) => {
        this.setState({
            targetMarket: data
        })
    }


    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////    Data Querying Functions        //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    getWeeklyDials = () => {

        API.getWeeklyDials(this.state.userData._id, {
            todayDate: moment(new Date()).format("YYYY-MM-DD"),
            weekPrior: moment().subtract(6, 'd').format("YYYY-MM-DD")
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    weeklyDials: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })


        setTimeout(() => {
            this.parseWeeklyDials()
            this.parseWeeklyContacts()

        }, 1500)
    }

    getWeeklyAppts = () => {
        API.getWeeklyAppts(this.state.userData._id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    weeklyAppts: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        setTimeout(() => {
            this.parseWeeklyAppointments()
        }, 1000)

    }

 
    getUserData = () => {
        // console.log(this.props.user.uid)
        var userID = this.props.user.uid
        API.getUserData(userID)
            .then(res =>
                this.setState({
                    userData: res.data[0],
                    dialData: res.data[0].dials
                }), this.getContactData(),
                this.gatherAppointments(),
                this.gatherSales(),

                setTimeout(() => {
                    this.parseDials()
                    this.getProtegeNoteData()
                    this.getWeeklyDials()
                    this.getWeeklyAppts()
                }, 500)
            )
    }

    getProtegeNoteData = () => {
        // console.log(this.state.userData._id)

        API.getProtegeNotes(this.state.userData._id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    notes: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    gatherMentors = () => {
        API.getMentors()
            .then((res) => {
                this.setState({
                    mentors: res.data
                })
            })
    }

    gatherProteges = () => {
        API.getProteges()
            .then((res) => {
                this.setState({
                    proteges: res.data
                })
            })
    }

    getContactData = () => {
        setTimeout(() => {
            // console.log("Searching for contacts using: " + this.state.userData._id)
            API.getContacts(this.state.userData._id)
                .then(res =>
                    // console.log("Contacts: " )
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
            // console.log("Gathering appointemnts using ID: " + this.state.userData._id)
            API.getAppointments(this.state.userData._id)
                .then(res =>
                    this.setState({
                        appointments: res.data
                    }),
                    setTimeout(() => { this.parseAppointments() }, 500)
                )
        }, 1000)
    };

    gatherSales = () => {
        setTimeout(() => {
            // console.log("Gathering sales using ID: " + this.state.userData._id)
            API.getSales(this.state.userData._id)
                .then(res =>
                    this.setState({
                        sales: res.data
                    })
                    // ,setTimeout(() => { this.parseSales}, 500)
                )
        }, 1000)
    };

    gatherNotes = () => {
        API.gatherNotes(this.state.userData._id)
            .then(res =>
                this.setState({

                })
            )
    }

    showApptViewer = () => {

        if (this.state.showApptViewer === true) {
            this.setState({
                showApptViewer: false
            })
        } else {
            this.setState({
                showApptViewer: true
            })
        }

    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Parse Functions for Data ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    parseAppointments = () => {
        // console.log("Parsing appointments: " + this.state.appointments)
        var CPA = 0;
        var BPA = 0;
        var CCA = 0;
        var BCA = 0;
        var CNA = 0;
        var BNA = 0;
        var CSA = 0;
        var BSA = 0;
        var CRA = 0;
        var BRA = 0;
        var CTA = 0;
        var BTA = 0;
        for (var i = 0; i < this.state.appointments.length; i++) {
            // console.log(this.state.appointments[i])
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
                case "CRD":
                    CRA++
                    break;
                case "BRD":
                    BRA++
                    break;
                case "CTD":
                    CTA++
                    break;
                case "BTD":
                    BTA++
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
            BSAppts: BSA,
            CRAppts: CRA,
            BRAppts: BRA,
            CTAppts: CTA,
            BTAppts: BTA
        })
    }

    parseDials = () => {
        // console.log("Parsing Dials: " + this.state.dialData)
        var CPD = 0;
        var BPD = 0;
        var CCD = 0;
        var BCD = 0;
        var CND = 0;
        var BND = 0;
        var CSD = 0;
        var BSD = 0;
        var CRD = 0;
        var BRD = 0;
        var CTD = 0;
        var BTD = 0;
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
                case "CRD":
                    CRD++
                    break;
                case "BRD":
                    BRD++
                    break;
                case "CTD":
                    CTD++
                    break;
                case "BTD":
                    BTD++
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
            BSDials: BSD,
            CRDials: CRD,
            BRDials: BRD,
            CTDials: CTD,
            BTDials: BTD
        })
    }

    parseContacts = () => {
        // console.log("Parsing Contacts: " + this.state.contactData)
        var CPC = 0;
        var BPC = 0;
        var CCC = 0;
        var BCC = 0;
        var CNC = 0;
        var BNC = 0;
        var CSC = 0;
        var BSC = 0;
        var CRC = 0;
        var BRC = 0;
        var CTC = 0;
        var BTC = 0;
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
                case "CRD":
                    CRC++
                    break;
                case "BRD":
                    BRC++
                    break;
                case "CTD":
                    CTC++
                    break;
                case "BTD":
                    BTC++
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
            BSContacts: BSC,
            CRContacts: CRC,
            BRContacts: BRC,
            CTContacts: CTC,
            BTContacts: BTC
        })
    }

    parseWeeklyAppointments = () => {
        // console.log("Parsing appointments: " + this.state.appointments)
        var wCPA = 0;
        var wBPA = 0;
        var wCCA = 0;
        var wBCA = 0;
        var wCNA = 0;
        var wBNA = 0;
        var wCSA = 0;
        var wBSA = 0;
        var wCRA = 0;
        var wBRA = 0;
        var wCTA = 0;
        var wBTA = 0;
        for (var i = 0; i < this.state.weeklyAppts.length; i++) {
            // console.log(this.state.appointments[i])
            switch (this.state.weeklyAppts[i].type) {
                case "CPD":
                    wCPA++
                    break;
                case "BPD":
                    wBPA++
                    break;
                case "CCD":
                    wCCA++
                    break;
                case "BCD":
                    wBCA++
                    break;
                case "CND":
                    wCNA++
                    break;
                case "BND":
                    wBNA++
                    break;
                case "CSD":
                    wCSA++
                    break;
                case "BSD":
                    wBSA++
                    break;
                case "CRD":
                    wCRA++
                    break;
                case "BRD":
                    wBRA++
                    break;
                case "CTD":
                    wCTA++
                    break;
                case "BTD":
                    wBTA++
                    break;
                default:
                    break;
            }
        }
        this.setState({
            wCPAppts: wCPA,
            wBPAppts: wBPA,
            wCCAppts: wCCA,
            wBCAppts: wBCA,
            wCNAppts: wCNA,
            wBNAppts: wBNA,
            wCSAppts: wCSA,
            wBSAppts: wBSA,
            wCRAppts: wCRA,
            wBRAppts: wBRA,
            wCTAppts: wCTA,
            wBTAppts: wBTA
        })
    }

    parseWeeklyDials = () => {
        // console.log("Parsing Dials: " + this.state.dialData)
        var wCPD = 0;
        var wBPD = 0;
        var wCCD = 0;
        var wBCD = 0;
        var wCND = 0;
        var wBND = 0;
        var wCSD = 0;
        var wBSD = 0;
        var wCRD = 0;
        var wBRD = 0;
        var wCTD = 0;
        var wBTD = 0;
        for (var i = 0; i < this.state.weeklyDials.length; i++) {
            // console.log(this.state.dialData[i])
            switch (this.state.weeklyDials[i].type) {
                case "CPD":
                    wCPD++
                    break;
                case "BPD":
                    wBPD++
                    break;
                case "CCD":
                    wCCD++
                    break;
                case "BCD":
                    wBCD++
                    break;
                case "CND":
                    wCND++
                    break;
                case "BND":
                    wBND++
                    break;
                case "CSD":
                    wCSD++
                    break;
                case "BSD":
                    wBSD++
                    break;
                case "CRD":
                    wCRD++
                    break;
                case "BRD":
                    wBRD++
                    break;
                case "CTD":
                    wCTD++
                    break;
                case "BTD":
                    wBTD++
                    break;
                default:
                    break;
            }
        }
        this.setState({
            wCPDials: wCPD,
            wBPDials: wBPD,
            wCCDials: wCCD,
            wBCDials: wBCD,
            wCNDials: wCND,
            wBNDials: wBND,
            wCSDials: wCSD,
            wBSDials: wBSD,
            wCRDials: wCRD,
            wBRDials: wBRD,
            wCTDials: wCTD,
            wBTDials: wBTD
        })
    }

    parseWeeklyContacts = () => {
        // console.log("Parsing Contacts: " + this.state.contactData)
        var wCPC = 0;
        var wBPC = 0;
        var wCCC = 0;
        var wBCC = 0;
        var wCNC = 0;
        var wBNC = 0;
        var wCSC = 0;
        var wBSC = 0;
        var wCRC = 0;
        var wBRC = 0;
        var wCTC = 0;
        var wBTC = 0;
        for (var i = 0; i < this.state.weeklyDials.length; i++) {

            if (this.state.weeklyDials[i].contact === true) {
                switch (this.state.weeklyDials[i].type) {
                    case "CPD":
                        wCPC++
                        break;
                    case "BPD":
                        wBPC++
                        break;
                    case "CCD":
                        wCCC++
                        break;
                    case "BCD":
                        wBCC++
                        break;
                    case "CND":
                        wCNC++
                        break;
                    case "BND":
                        wBNC++
                        break;
                    case "CSD":
                        wCSC++
                        break;
                    case "BSD":
                        wBSC++
                        break;
                    case "CRD":
                        wCRC++
                        break;
                    case "BRD":
                        wBRC++
                        break;
                    case "CTD":
                        wCTC++
                        break;
                    case "BTD":
                        wBTC++
                        break;
                    default:
                        break;
                }
            }
        }
        this.setState({
            wCPContacts: wCPC,
            wBPContacts: wBPC,
            wCCContacts: wCCC,
            wBCContacts: wBCC,
            wCNContacts: wCNC,
            wBNContacts: wBNC,
            wCSContacts: wCSC,
            wBSContacts: wBSC,
            wCRContacts: wCRC,
            wBRContacts: wBRC,
            wCTContacts: wCTC,
            wBTContacts: wBTC
        })
    }


    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////// Show / Hide Modules Functions///////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    showDials = () => {

        if (this.state.showDials === true) {
            this.setState({
                showDials: false
            })
        } else {
            this.setState({
                showDials: true,
                showNotes: false,
                showCreate: false,
                showAnalytics: false,
                showAppts: false,
                showSales: false,
                showSideBars: true
            })
        }
    }

    showNotes = () => {
        if (this.state.showNotes === true) {
            this.setState({
                showNotes: false
            })
        } else {
            this.setState({
                showDials: false,
                showNotes: true,
                showCreate: false,
                showAnalytics: false,
                showAppts: false,
                showSales: false,
                showSideBars: true
            })
        }
    }

    showCreate = () => {
        if (this.state.showCreate === true) {
            this.setState({
                showCreate: false
            })
        } else {
            this.setState({
                showDials: false,
                showNotes: false,
                showCreate: true,
                showAnalytics: false,
                showAppts: false,
                showSales: false,
                showSideBars: true
            })
        }
    }

    showAnalytics = () => {
        if (this.state.showAnalytics === true) {
            this.setState({
                showAnalytics: false,
                showSideBars: true
            })
        } else {
            this.setState({
                showDials: false,
                showNotes: false,
                showCreate: false,
                showAnalytics: true,
                showAppts: false,
                showSales: false,
                showSideBars: false
            })
        }
    }

    showAppts = () => {
        if (this.state.showAppts === true) {
            this.setState({
                showAppts: false
            })
        } else {
            this.setState({
                showDials: false,
                showNotes: false,
                showCreate: false,
                showAnalytics: false,
                showAppts: true,
                showSales: false,
                showSideBars: true
            })
        }
    }

    showSales = () => {
        if (this.state.showSales === true) {
            this.setState({
                showSales: false
            })
        } else {
            this.setState({
                showDials: false,
                showNotes: false,
                showCreate: false,
                showAnalytics: false,
                showAppts: false,
                showSales: true
            })
        }
    }

    showSalesViewer = () => {
        if (this.state.showSaleViewer === true) {
            this.setState({
                showSaleViewer: false
            })
        } else {
            this.setState({
                showSaleViewer: true
            })
        }
    }

    showNoteViewer = () => {
        if (this.state.showNoteViewer === true) {
            this.setState({
                showNoteViewer: false
            })
        } else {
            this.setState({
                showNoteViewer: true
            })
        }
    }


    handleScopeChange = (e) => {
        e.preventDefault()
        console.log(this.state.scopeSelected)
        if (this.state.scopeSelected === "viewAll") {
            this.parseDials()
            this.parseContacts()
            this.parseAppointments()
        } else if (this.state.scopeSelected === "viewWeekly") {
            this.getWeeklyDials()
            this.getWeeklyAppts()
        } else if (this.state.scopeSelected === "viewMonthly") {
            this.getMonthlyDials()
            this.getMonthlyAppts()
        }
    }


    getWeeklyDials = () => {
        API.getWeeklyDials(this.state.userData._id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    weeklyDials: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        setTimeout(() => {
            this.parseWeeklyDials()
            this.parseWeeklyContacts()
        }, 1000)
    }

    getMonthlyDials = () => {
        API.getMonthlyDials(this.state.userData._id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    monthlyDials: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        setTimeout(() => {
            this.parseMonthlyDials()
            this.parseMonthlyContacts()
        }, 1000)
    }

    getMonthlyAppts = () => {
        API.getMonthlyAppts(this.state.userData._id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    monthlyAppts: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        setTimeout(() => {
            this.parseMonthlyAppts()
        }, 1000)
    }


    getWeeklyAppts = () => {
        API.getWeeklyAppts(this.state.userData._id)
            .then(res => {
                this.setState({
                    weeklyAppts: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

        setTimeout(() => {
            this.parseWeeklyAppointments()
        }, 1000)
    }


    parseWeeklyDials = () => {
        // console.log("Parsing Dials: " + this.state.dialData)
        var wCPD = 0;
        var wBPD = 0;
        var wCCD = 0;
        var wBCD = 0;
        var wCND = 0;
        var wBND = 0;
        var wCSD = 0;
        var wBSD = 0;
        var wCRD = 0;
        var wBRD = 0;
        var wCTD = 0;
        var wBTD = 0;
        for (var i = 0; i < this.state.weeklyDials.length; i++) {
            // console.log(this.state.dialData[i])
            switch (this.state.weeklyDials[i].type) {
                case "CPD":
                    wCPD++
                    break;
                case "BPD":
                    wBPD++
                    break;
                case "CCD":
                    wCCD++
                    break;
                case "BCD":
                    wBCD++
                    break;
                case "CND":
                    wCND++
                    break;
                case "BND":
                    wBND++
                    break;
                case "CSD":
                    wCSD++
                    break;
                case "BSD":
                    wBSD++
                    break;
                case "CRD":
                    wCRD++
                    break;
                case "BRD":
                    wBRD++
                    break;
                case "CTD":
                    wCTD++
                    break;
                case "BTD":
                    wBTD++
                    break;
                default:
                    break;
            }
        }
        this.setState({
            CPDials: wCPD,
            BPDials: wBPD,
            CCDials: wCCD,
            BCDials: wBCD,
            CNDials: wCND,
            BNDials: wBND,
            CSDials: wCSD,
            BSDials: wBSD,
            CRDials: wCRD,
            BRDials: wBRD,
            CTDials: wCTD,
            BTDials: wBTD
        })
    }

    parseMonthlyDials = () => {
        // console.log("Parsing Dials: " + this.state.dialData)
        var wCPD = 0;
        var wBPD = 0;
        var wCCD = 0;
        var wBCD = 0;
        var wCND = 0;
        var wBND = 0;
        var wCSD = 0;
        var wBSD = 0;
        var wCRD = 0;
        var wBRD = 0;
        var wCTD = 0;
        var wBTD = 0;
        for (var i = 0; i < this.state.monthlyDials.length; i++) {
            // console.log(this.state.dialData[i])
            switch (this.state.monthlyDials[i].type) {
                case "CPD":
                    wCPD++
                    break;
                case "BPD":
                    wBPD++
                    break;
                case "CCD":
                    wCCD++
                    break;
                case "BCD":
                    wBCD++
                    break;
                case "CND":
                    wCND++
                    break;
                case "BND":
                    wBND++
                    break;
                case "CSD":
                    wCSD++
                    break;
                case "BSD":
                    wBSD++
                    break;
                case "CRD":
                    wCRD++
                    break;
                case "BRD":
                    wBRD++
                    break;
                case "CTD":
                    wCTD++
                    break;
                case "BTD":
                    wBTD++
                    break;
                default:
                    break;
            }
        }
        this.setState({
            CPDials: wCPD,
            BPDials: wBPD,
            CCDials: wCCD,
            BCDials: wBCD,
            CNDials: wCND,
            BNDials: wBND,
            CSDials: wCSD,
            BSDials: wBSD,
            CRDials: wCRD,
            BRDials: wBRD,
            CTDials: wCTD,
            BTDials: wBTD
        })
    }




    parseWeeklyContacts = () => {
        // console.log("Parsing Contacts: " + this.state.contactData)
        var wCPC = 0;
        var wBPC = 0;
        var wCCC = 0;
        var wBCC = 0;
        var wCNC = 0;
        var wBNC = 0;
        var wCSC = 0;
        var wBSC = 0;
        var wCRC = 0;
        var wBRC = 0;
        var wCTC = 0;
        var wBTC = 0;
        for (var i = 0; i < this.state.weeklyDials.length; i++) {

            if (this.state.weeklyDials[i].contact === true) {
                switch (this.state.weeklyDials[i].type) {
                    case "CPD":
                        wCPC++
                        break;
                    case "BPD":
                        wBPC++
                        break;
                    case "CCD":
                        wCCC++
                        break;
                    case "BCD":
                        wBCC++
                        break;
                    case "CND":
                        wCNC++
                        break;
                    case "BND":
                        wBNC++
                        break;
                    case "CSD":
                        wCSC++
                        break;
                    case "BSD":
                        wBSC++
                        break;
                    case "CRD":
                        wCRC++
                        break;
                    case "BRD":
                        wBRC++
                        break;
                    case "CTD":
                        wCTC++
                        break;
                    case "BTD":
                        wBTC++
                        break;
                    default:
                        break;
                }
            }
        }
        this.setState({
            CPContacts: wCPC,
            BPContacts: wBPC,
            CCContacts: wCCC,
            BCContacts: wBCC,
            CNContacts: wCNC,
            BNContacts: wBNC,
            CSContacts: wCSC,
            BSContacts: wBSC,
            CRContacts: wCRC,
            BRContacts: wBRC,
            CTContacts: wCTC,
            BTContacts: wBTC
        })
    }

    parseMonthlyContacts = () => {
        // console.log("Parsing Contacts: " + this.state.contactData)
        var wCPC = 0;
        var wBPC = 0;
        var wCCC = 0;
        var wBCC = 0;
        var wCNC = 0;
        var wBNC = 0;
        var wCSC = 0;
        var wBSC = 0;
        var wCRC = 0;
        var wBRC = 0;
        var wCTC = 0;
        var wBTC = 0;
        for (var i = 0; i < this.state.monthlyDials.length; i++) {

            if (this.state.monthlyDials[i].contact === true) {
                switch (this.state.monthlyDials[i].type) {
                    case "CPD":
                        wCPC++
                        break;
                    case "BPD":
                        wBPC++
                        break;
                    case "CCD":
                        wCCC++
                        break;
                    case "BCD":
                        wBCC++
                        break;
                    case "CND":
                        wCNC++
                        break;
                    case "BND":
                        wBNC++
                        break;
                    case "CSD":
                        wCSC++
                        break;
                    case "BSD":
                        wBSC++
                        break;
                    case "CRD":
                        wCRC++
                        break;
                    case "BRD":
                        wBRC++
                        break;
                    case "CTD":
                        wCTC++
                        break;
                    case "BTD":
                        wBTC++
                        break;
                    default:
                        break;
                }
            }
        }
        this.setState({
            CPContacts: wCPC,
            BPContacts: wBPC,
            CCContacts: wCCC,
            BCContacts: wBCC,
            CNContacts: wCNC,
            BNContacts: wBNC,
            CSContacts: wCSC,
            BSContacts: wBSC,
            CRContacts: wCRC,
            BRContacts: wBRC,
            CTContacts: wCTC,
            BTContacts: wBTC
        })
    }

    parseWeeklyAppointments = () => {
        // console.log("Parsing appointments: " + this.state.appointments)
        var wCPA = 0;
        var wBPA = 0;
        var wCCA = 0;
        var wBCA = 0;
        var wCNA = 0;
        var wBNA = 0;
        var wCSA = 0;
        var wBSA = 0;
        var wCRA = 0;
        var wBRA = 0;
        var wCTA = 0;
        var wBTA = 0;
        for (var i = 0; i < this.state.weeklyAppts.length; i++) {
            // console.log(this.state.appointments[i])
            switch (this.state.weeklyAppts[i].type) {
                case "CPD":
                    wCPA++
                    break;
                case "BPD":
                    wBPA++
                    break;
                case "CCD":
                    wCCA++
                    break;
                case "BCD":
                    wBCA++
                    break;
                case "CND":
                    wCNA++
                    break;
                case "BND":
                    wBNA++
                    break;
                case "CSD":
                    wCSA++
                    break;
                case "BSD":
                    wBSA++
                    break;
                case "CRD":
                    wCRA++
                    break;
                case "BRD":
                    wBRA++
                    break;
                case "CTD":
                    wCTA++
                    break;
                case "BTD":
                    wBTA++
                    break;
                default:
                    break;
            }
        }
        this.setState({
            CPAppts: wCPA,
            BPAppts: wBPA,
            CCAppts: wCCA,
            BCAppts: wBCA,
            CNAppts: wCNA,
            BNAppts: wBNA,
            CSAppts: wCSA,
            BSAppts: wBSA,
            CRAppts: wCRA,
            BRAppts: wBRA,
            CTAppts: wCTA,
            BTAppts: wBTA
        })
    }

    parseMonthlyAppts = () => {
        // console.log("Parsing appointments: " + this.state.appointments)
        var wCPA = 0;
        var wBPA = 0;
        var wCCA = 0;
        var wBCA = 0;
        var wCNA = 0;
        var wBNA = 0;
        var wCSA = 0;
        var wBSA = 0;
        var wCRA = 0;
        var wBRA = 0;
        var wCTA = 0;
        var wBTA = 0;
        for (var i = 0; i < this.state.monthlyAppts.length; i++) {
            // console.log(this.state.appointments[i])
            switch (this.state.monthlyAppts[i].type) {
                case "CPD":
                    wCPA++
                    break;
                case "BPD":
                    wBPA++
                    break;
                case "CCD":
                    wCCA++
                    break;
                case "BCD":
                    wBCA++
                    break;
                case "CND":
                    wCNA++
                    break;
                case "BND":
                    wBNA++
                    break;
                case "CSD":
                    wCSA++
                    break;
                case "BSD":
                    wBSA++
                    break;
                case "CRD":
                    wCRA++
                    break;
                case "BRD":
                    wBRA++
                    break;
                case "CTD":
                    wCTA++
                    break;
                case "BTD":
                    wBTA++
                    break;
                default:
                    break;
            }
        }
        this.setState({
            CPAppts: wCPA,
            BPAppts: wBPA,
            CCAppts: wCCA,
            BCAppts: wBCA,
            CNAppts: wCNA,
            BNAppts: wBNA,
            CSAppts: wCSA,
            BSAppts: wBSA,
            CRAppts: wCRA,
            BRAppts: wBRA,
            CTAppts: wCTA,
            BTAppts: wBTA
        })
    }




    render() {
        return (
            <div>
                {/* <SideNavPage
                    dialOption={this.showDials}
                    noteOption={this.showNotes}
                    createOption={this.showCreate}
                    analyzeOption={this.showAnalytics}
                    scheduleOption={this.showAppts}
                    salesOption={this.showSales}
                /> */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: '30px' }}>
                    <div className="navbar-brand" style={{color: 'whitesmoke'}}>{this.state.userData.firstName} {this.state.userData.lastName} Dashboard</div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <div className="nav-link" onClick={this.showDials}>Home</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" onClick={this.showDials}>Dialing Tool</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" onClick={this.showAnalytics}>Analytics</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" onClick={this.showNotes}>Notes</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" onClick={this.showAppts}>Schedule</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" onClick={this.showSales}>Sales</div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container" style={{ backgroundColor: 'transparent' }}>
                    <div className="row">
                        <div className="col-12">

                        </div>
                    </div>
                   

                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                    {/*  /////////////////////////    Analytics Module      /////////////////////////////// */}
                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                    <div className="row">
                        <div className="col-12">


                            {
                                this.state.showAnalytics ?
                                    <div id="protege-data-viewer-container" style={{ marginTop: '50px' }}>
                                        <div className="row">
                                            <div className="col-1"></div>
                                            <div className="col-10">
                                                <div className="jumbotron" style={{ backgroundColor: 'rgba(0,0,0,0.4)', height: '200px' }}>
                                                    <h4 style={{ textAlign: 'center', color: 'white' }}>Please select your Scope</h4>
                                                    <form>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <select style={{}} id="protegeSelector" value={this.state.scopeSelected} onChange={this.handleInputChange} type="text" name="scopeSelected" className="customDropMentor" placeholder="Choose your protege">
                                                                <option value={"none"}>---------------</option>
                                                                <option value={"viewAll"}>All Data</option>
                                                                <option value={"viewWeekly"}>Weekly Data</option>
                                                                <option value={"viewMonthly"}>Monthly Data</option>
                                                            </select>
                                                            <br />
                                                            <button style={{}} onClick={this.handleScopeChange} className="btn btn-sm btn-outline-light">Apply</button>
                                                            <br />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-1"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-1"></div>
                                            <div className="col-10">
                                                <MainDataViewer
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
                                                    CNContacts={this.state.CNContacts}
                                                    BNContacts={this.state.BNContacts}
                                                    CSDials={this.state.CSDials}
                                                    BSDials={this.state.BSDials}
                                                    CSContacts={this.state.CSContacts}
                                                    BSContacts={this.state.BSContacts}
                                                    CSAppts={this.state.CSAppts}
                                                    BSAppts={this.state.BSAppts}
                                                    CRDials={this.state.CRDials}
                                                    BRDials={this.state.BRDials}
                                                    CRContacts={this.state.CRContacts}
                                                    BRContacts={this.state.BRContacts}
                                                    CRAppts={this.state.CRAppts}
                                                    BRAppts={this.state.BRAppts}
                                                    CTDials={this.state.CTDials}
                                                    BTDials={this.state.BTDials}
                                                    CTContacts={this.state.CTContacts}
                                                    BTContacts={this.state.BTContacts}
                                                    CTAppts={this.state.CTAppts}
                                                    BTAppts={this.state.BTAppts}
                                                    userData={this.state.userData}
                                                // sources={this.state.leadSource}
                                                />
                                            </div>
                                            <div className="col-1"></div>
                                        </div>
                                    </div>
                                    : null
                            }


                            <div className="row" style={{ marginTop: '20px' }}>
                                <div className="col-lg-6">
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  /////////////////////////    Dial Controller       /////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}

                                    {this.state.showDials ?
                                        <div id="call-button-container" style={{ textAlign: 'center' }}>
                                            <div className="row">

                                                <div className="col-lg-12">
                                                    <div className="row">
                                                        <div className="col">

                                                            <ProtegeCallBtnContainer2
                                                                rerender={this.getUserData}
                                                                user={this.state.userData}
                                                                userID={this.state.userData._id}
                                                                source={this.state.leadSource}
                                                                targetMarket={this.state.targetMarket}
                                                                userData={this.state.userData}
                                                                setParentState={this.setParentState}
                                                                setParentStateTargetMkt={this.setParentStateTargetMkt}
                                                                username={this.state.user}
                                                                // userID={this.props.user.uid}
                                                                mentors={this.state.mentors}
                                                            />

                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <div className="col-6" style={{ height: '', overflow: 'auto', textAlign: 'center' }}>
                                                            <div className="card">
                                                                <SourceCreator userData={this.state.userData} />
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="col-6" style={{ height: '', overflow: 'auto', textAlign: 'center' }}>
                                                            <div className="card">
                                                                <TargetMarketCreator userData={this.state.userData} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  /////////////////////////    Note Module           /////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}

                                    {this.state.showNotes ?
                                        <div id="note-container">
                                            <div className="row">
                                                {/* <div className="card" style={{ padding: '50px', backgroundColor: 'rgba(77,160,255,0.80)', color: 'whitesmoke' }}>
                                                    <h2 style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', margin: '20px', borderRadius: '10px' }}>N O T E S</h2> */}
                                                <NoteCreator
                                                    userData={this.state.userData}
                                                    userID={this.state.userData._id}
                                                    proteges={this.state.proteges}
                                                    mentors={this.state.mentors}
                                                />
                                                {/* <hr /> */}
                                                <br />
                                                <br />
                                                <div className="card bg-light" style={{ marginTop: '15px' }}>

                                                    <div className="card-header">
                                                        <h4 style={{ textAlign: 'center', paddingTop: '5px', width: '100%' }}>Your Notes</h4>
                                                        {/* <span button className="btn btn-sm btn-outline-dark" onClick={this.showNoteViewer}>Show</span> */}

                                                    </div>

                                                    <div className="card-body bg-dark" style={{ padding: '0px 10px 0px 10px', marginBottom: '20px' }}>
                                                        {/* {this.state.showNoteViewer ? */}
                                                        <NoteViewer
                                                            userData={this.state.userData}
                                                            userID={this.state.userData._id}
                                                            proteges={this.state.proteges}
                                                            mentors={this.state.mentors}
                                                            taggedNotes={this.state.notes}
                                                            rerender={this.getProtegeNoteData}
                                                            fontSize={'20px'}
                                                            height={'600px'}
                                                        />
                                                        {/* : null} */}
                                                    </div>
                                                    {/* <div style={{ height: '20px', color: 'black', backgroundColor: 'rgba(0,0,0,0.50)' }}>
                                                    </div> */}
                                                </div>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        : null}

                                    {/*  /////////////////////////////'///////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  /////////////////////////    Creation Tool         /////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}

                                    {this.state.showCreate ?
                                        <div className="col card" style={{ padding: '50px', backgroundColor: 'rgba(77,160,255,0.80)', color: 'whitesmoke' }}>
                                            <h2 style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(255,255,255,0.75)', color: 'black', margin: '20px', borderRadius: '10px' }}>C R E A T E</h2>
                                            <div className="row">

                                                <div className="col-md-6" style={{ padding: '2%', textAlign: 'center' }}>
                                                    {/* <p>Lead Source Creation:</p> */}
                                                    <SourceCreator userData={this.state.userData} />
                                                    {/* Add a View/Edit Source option */}
                                                    <hr />
                                                </div>
                                                <div className="col-md-6" style={{ padding: '2%', textAlign: 'center' }}>
                                                    {/* <p>Target Market Creation:</p> */}
                                                    <TargetMarketCreator userData={this.state.userData} />
                                                    {/* Add a View/Edit Target Market option */}
                                                </div>
                                                <div className="col-12" style={{ padding: '2%' }}>
                                                    <p></p>
                                                    <AppointmentCreator
                                                        userID={this.state.userData._id}
                                                        username={this.state.user}
                                                        rerender={this.gatherAppointments}
                                                        userData={this.state.userData}
                                                        mentors={this.state.mentors}

                                                    />
                                                </div>
                                                <div className="col-12" style={{ padding: '2%' }}>
                                                    <p></p>
                                                    <SalesCreator
                                                        userID={this.state.userData._id}
                                                        username={this.state.user}
                                                        // rerender={this.gatherSales}
                                                        userData={this.state.userData}
                                                        mentors={this.state.mentors}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  /////////////////////////    Analytics Module      /////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}

                                    {this.state.showAnalyticsMini ?
                                        <div id="protege-data-viewer-container">

                                            <div className="row">
                                                <div className="col-12">
                                                    <MainDataViewer
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
                                                        CNContacts={this.state.CNContacts}
                                                        BNContacts={this.state.BNContacts}
                                                        CSDials={this.state.CSDials}
                                                        BSDials={this.state.BSDials}
                                                        CSContacts={this.state.CSContacts}
                                                        BSContacts={this.state.BSContacts}
                                                        CSAppts={this.state.CSAppts}
                                                        BSAppts={this.state.BSAppts}
                                                        CRDials={this.state.CRDials}
                                                        BRDials={this.state.BRDials}
                                                        CRContacts={this.state.CRContacts}
                                                        BRContacts={this.state.BRContacts}
                                                        CRAppts={this.state.CRAppts}
                                                        BRAppts={this.state.BRAppts}
                                                        CTDials={this.state.CTDials}
                                                        BTDials={this.state.BTDials}
                                                        CTContacts={this.state.CTContacts}
                                                        BTContacts={this.state.BTContacts}
                                                        CTAppts={this.state.CTAppts}
                                                        BTAppts={this.state.BTAppts}
                                                        userData={this.state.userData}
                                                    // sources={this.state.leadSource}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        : null}



                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  /////////////////////////    Appointment Tool      /////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}

                                    {this.state.showAppts ?

                                        <div id="appointments-container">
                                            <div className="row">
                                                <div className="col-12" style={{ zIndex: 0, padding: '20px' }}>
                                                    <div className="card">
                                                        <h4 style={{ textAlign: 'center' }}>Quickview Calendar</h4>
                                                        <MainCalendar
                                                            appointments={this.state.appointments}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <p></p>
                                                    <AppointmentCreator
                                                        userID={this.state.userData._id}
                                                        username={this.state.user}
                                                        rerender={this.gatherAppointments}
                                                        userData={this.state.userData}
                                                        mentors={this.state.mentors}
                                                    />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-12">
                                                    <div style={{ width: '100%' }}
                                                    // className="card" style={{ marginBottom: '10px', marginTop: '10px', textAlign: "left", padding: 10, height: '', overflow: 'auto', backgroundColor: 'rgba(36,138,255,0.8)' }}
                                                    >
                                                        <div className="card bg-light">
                                                            <div className="card-header">
                                                                <h4 style={{ textAlign: 'center', padding: '10%', color: 'black', margin: '20px' }}>Appointment Manager
                                                                <br />

                                                                    {/* <span button className="btn btn-sm btn-outline-dark" onClick={this.showApptViewer}>Show</span> */}
                                                                </h4>
                                                            </div>
                                                            {/* {this.state.showApptViewer ? */}
                                                            <div className="card-body bg-dark" style={{ padding: '0px 10px 0px 10px', marginBottom: '20px' }}>
                                                                {
                                                                    this.state.appointments ?
                                                                        <div style={{ height: '800px', overflow: 'auto' }}>
                                                                            {
                                                                                this.state.appointments.map(appt => (
                                                                                    <AppointmentItem
                                                                                        key={appt._id}
                                                                                        id={appt._id}
                                                                                        apptname={appt.apptname}
                                                                                        mentor={appt.mentor}
                                                                                        type={appt.type}
                                                                                        held={appt.held}
                                                                                        sold={appt.sold}
                                                                                        dialer={appt.dialer}
                                                                                        source={appt.source}
                                                                                        date={appt.date}
                                                                                        notes={appt.notes}
                                                                                        username={this.state.user}
                                                                                        rerender={this.gatherAppointments}
                                                                                        user={this.state.userData}
                                                                                        targetMarket={appt.targetMarket}
                                                                                        mentors={this.state.mentors}
                                                                                        headerFont={'20px'}
                                                                                        textFont={'14px'}
                                                                                        time={appt.time}
                                                                                    />
                                                                                ))
                                                                            }
                                                                        </div>
                                                                        : null
                                                                }
                                                            </div>
                                                            {/* : null} */}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  /////////////////////////    Sales Tool            /////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                    {/*  ////////////////////////////////////////////////////////////////////////////////// */}

                                    {this.state.showSales ?
                                        <div id="sales-container">
                                            <div className="row">
                                                {/* <div className="col-12"> */}

                                                <SalesCreator
                                                    userID={this.state.userData._id}
                                                    username={this.state.user}
                                                    // rerender={this.gatherSales}
                                                    userData={this.state.userData}
                                                    mentors={this.state.mentors}
                                                />
                                                {/* </div> */}
                                            </div>
                                            <br />
                                            <br />

                                            <div className="row">
                                                <div className="col-12">
                                                    <div style={{ width: '%' }}>

                                                        {/* <div className="card" style={{ marginBottom: '10px', marginTop: '10px', textAlign: "left", padding: 10, height: '', overflow: 'auto', backgroundColor: 'rgba(36,138,255,0.8)' }}> */}
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h4 style={{ textAlign: 'center', padding: '10%', backgroundColor: '', color: 'black' }}>Your Sales<br /><span><button className="btn btn-outline-dark" onClick={this.showSalesViewer}>Show</button></span></h4>
                                                            </div>
                                                            {this.state.showSaleViewer ?
                                                                <div>
                                                                    {this.state.sales ?
                                                                        <div className="card-body">
                                                                            <div style={{ height: '400px', overflow: 'auto' }}>
                                                                                {this.state.sales.map(sale => (
                                                                                    <SalesItem
                                                                                        key={sale._id}
                                                                                        id={sale._id}
                                                                                        saleType={sale.clientType}
                                                                                        saleName={sale.saleName}
                                                                                        saleSource={sale.leadSource}
                                                                                        saleNotes={sale.saleNotes}
                                                                                        saleDate={sale.saleDate}
                                                                                        saleTargetMkt={sale.targetMarket}
                                                                                        saleCommission={sale.commission}
                                                                                        salePercentage={sale.percentageProtege}
                                                                                        saleTaggedPercentage={sale.percentageMentor}
                                                                                        saleProduct={sale.product}
                                                                                        saleWriter={sale.protege}
                                                                                        saleTagged={sale.mentor}
                                                                                        mentors={this.state.mentors}
                                                                                        userData={this.state.userData}
                                                                                    />
                                                                                ))
                                                                                } </div>
                                                                        </div>
                                                                        : null}
                                                                </div>
                                                                : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                </div>

                                {this.state.showSideBars ?

                                    <div className="col-lg-6">

                                        <div className="row">
                                            <div className="col-md-6">

                                                {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                                {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                                {/*  /////////////////////////    Middle Quick Data Viewer       ////////////////////// */}
                                                {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                                {/*  ////////////////////////////////////////////////////////////////////////////////// */}

                                                <div className="side-date-container">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            {this.state.weeklyDials ?
                                                                <DialDataSide
                                                                    userID={this.state.userData._id}
                                                                    dialData={this.state.weeklyDials}
                                                                />
                                                                : null}
                                                        </div>
                                                        <br />
                                                        <br />
                                                        {this.state.showDials ?
                                                            <div></div>
                                                            :
                                                            <div className="row" style={{ padding: '10px' }}>
                                                                <div className="col-12" style={{ height: '', textAlign: 'center' }}>
                                                                    <div className="card">
                                                                        <SourceCreator userData={this.state.userData} />
                                                                    </div>
                                                                </div>
                                                                <br />
                                                                <br />
                                                                <div className="col-12" style={{ height: '', textAlign: 'center' }}>
                                                                    <div className="card">
                                                                        <TargetMarketCreator userData={this.state.userData} />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        }
                                                    </div>
                                                </div>
                                            </div>



                                            {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                            {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                            {/*  /////////////////////////    Side Data Tools      /////////////////////////////// */}
                                            {/*  ////////////////////////////////////////////////////////////////////////////////// */}
                                            {/*  ////////////////////////////////////////////////////////////////////////////////// */}

                                            <br />
                                            <br />
                                            <div className="col-md-6">
                                                <div id="">
                                                    <div className="row">

                                                        {/* <div className="col-12"> */}
                                                        <div style={{ width: '100%', marginBottom: '10px' }}>
                                                            <AppointmentCreator
                                                                userID={this.state.userData._id}
                                                                username={this.state.user}
                                                                rerender={this.gatherAppointments}
                                                                userData={this.state.userData}
                                                                mentors={this.state.mentors}

                                                            />
                                                        </div>
                                                        {/* </div> */}
                                                        <br />
                                                        <br />
                                                    </div>

                                                    <div className="row">
                                                        {/* <div className="col-12"> */}

                                                        <div style={{ width: '100%', marginBottom: '10px' }}
                                                        // style={{ marginBottom: '10px', textAlign: "left", padding: 10, height: '', overflow: 'auto' }}
                                                        >
                                                            <div className="card bg-light">
                                                                <div className="card-header">
                                                                    <h4 style={{ textAlign: 'center', padding: '10% 10% 0 10%', color: 'black', margin: '0px' }}>View Appointments
                                                                    <br />
                                                                        <span>< button className="btn btn-sm btn-outline-dark" onClick={this.showApptViewer}>Show</button></span>
                                                                        {/* <span button className="btn btn-sm btn-outline-dark" onClick={this.showAppts}>Show Full</span> */}
                                                                    </h4>
                                                                </div>

                                                                {/* <div className="card-body"> */}
                                                                {this.state.showApptViewer ?
                                                                    <div className="card-body bg-dark" style={{ padding: '0px 5px 0px 5px' }}>
                                                                        {
                                                                            this.state.appointments ?
                                                                                <div style={{ height: '400px', overflow: 'auto', marginTop: '5px' }}>
                                                                                    {
                                                                                        this.state.appointments.map(appt => (
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
                                                                                                user={this.state.userData}
                                                                                                targetMarket={appt.targetMarket}
                                                                                                mentors={this.state.mentors}
                                                                                                time={appt.time}
                                                                                            />
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                                : null
                                                                        }
                                                                    </div> : null}
                                                                {/* </div> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* </div> */}
                                                    {/* <div className="col-12" style={{ zIndex: 0 }}> */}
                                                    {/* <div className="card col-12" style={{ zIndex: 0, marginBottom: '10px', textAlign: 'center', padding: 10, height: '350px', overflow: 'auto', backgroundColor: 'rgba(36,138,255,0.8', padding: '10px' }}> */}
                                                    <div className="row" style={{ marginBottom: '10px' }}>
                                                        {/* <div className="col-12" style={{ zIndex: 0, marginBottom: '10px', textAlign: 'center', padding: 10, height: '250px', overflow: 'auto', backgroundColor: 'rgba(36,138,255,0.8', padding: '10px' }}> */}
                                                        <NoteCreator
                                                            userData={this.state.userData}
                                                            userID={this.state.userData._id}
                                                            proteges={this.state.proteges}
                                                            mentors={this.state.mentors}
                                                            rerender={this.getProtegeNoteData}
                                                        />
                                                        {/* </div> */}
                                                    </div>

                                                    <div className="row">
                                                        {/* <div style={{ height: '50px', textAlign: 'center', color: 'white', backgroundColor: 'rgba(0,0,0,0.50)' }}> */}
                                                        {/* <p style={{ textAlign: 'center', paddingTop: '5px' }}>Your Notes</p> */}
                                                        {/* </div> */}

                                                        <div className="card bg-light" style={{ marginBottom: '10px', width: '100%' }}>
                                                            <div className="card-header">
                                                                <h4 style={{ textAlign: 'center', padding: '10% 10% 0 10%', color: 'black', margin: '0px' }}>

                                                                    View Notes
                                                                    <br />
                                                                    <span>< button className="btn btn-sm btn-outline-dark" onClick={this.showNoteViewer}>Show</button></span>

                                                                </h4>
                                                            </div>

                                                            {this.state.showNoteViewer ?
                                                                <div className="card-body bg-dark" style={{ padding: '0px 5px 0px 5px' }}>
                                                                    <div style={{ fontSize: '12px' }}>
                                                                        <NoteViewer
                                                                            userData={this.state.userData}
                                                                            userID={this.state.userData._id}
                                                                            proteges={this.state.proteges}
                                                                            mentors={this.state.mentors}
                                                                            taggedNotes={this.state.notes}
                                                                            rerender={this.getProtegeNoteData}
                                                                            fontSize={'14px'}
                                                                            height={"300px"}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                : <div style={{ height: '20px' }}></div>}

                                                            {/* <div style={{ height: '20px', color: 'black', backgroundColor: 'rgba(0,0,0,0)' }}> */}
                                                            {/* </div> */}
                                                        </div>
                                                    </div>

                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/*  */}
                                    </div>

                                    : null}
                                {/* </div> */}
                            </div>
                        </div >
                    </div >
                </div>
            </div >

        )
    }
}

export default ProtegeDash