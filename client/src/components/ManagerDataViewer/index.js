import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import "./style.css"
import API from "../../utils/API";
import MainCalendar from "../../components/MainCalendar"
import AppointmentItem from "../../components/AppointmentItem"
// import SalesItem from "../../components/SalesItem"
import SalesItemMentor from "../../components/SalesItemMentor"
import NoteCreator from "../../components/NoteCreator"
import NoteViewer from "../../components/NoteViewer"
import DataViewerDialChart from "../DataViewerDialChart";
import DataViewerContactChart from "../DataViewerContactChart";
import DataViewerAppointmentChart from "../DataViewerAppointmentChart";
import DataViewerCFDialChart from "../DataViewerCFDialChart";
import DataViewerCFContactChart from "../DataViewerCFContactChart";
import DataViewerCFAppointmentChart from '../DataViewerCFAppointmentChart';
import DataViewerBODialChart from "../DataViewerBODialChart";
import DataViewerBOContactChart from "../DataViewerBOContactChart";
import DataViewerBOAppointmentChart from '../DataViewerBOAppointmentChart';
import DataViewerProspectPerformance from '../DataViewerProspectPerformance';
import DataViewerClientPerformance from '../DataViewerClientPerformance';
import DataViewerNaturalPerformance from '../DataViewerNaturalPerformance';
import DataViewerSuspectPerformance from '../DataViewerSuspectPerformance';
import DataViewerReferralPerformance from '../DataViewerReferralPerformance';
import DataViewerTargetPerformance from '../DataViewerTargetPerformance';
import moment from "moment";
import cogoToast from 'cogo-toast';

class ManagerDataViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeProtegeData: "",
            activeProtegeDataPopulated: false,
            showProtegeAnalyticsViewer: false,
            showMentorAnalyticsViewer: false,
            showGlobalAnalyticsViewer: false,
            showSourcePerformance: false,
            viewProtegeCallData: false,
            viewProtegeSchedule: false,
            viewProtegeAppointments: false,
            viewProtegeSales: false,
            viewProtegeNotes: false,
            viewProtegeProfile: false,
            viewProtegeWeeklyReport: false,
            viewProtegeMonthlyReport: false,
            viewProtegeBenchmarkReport: false,
            viewMentorsProtegeStatistics: false,
            viewMentorSchedule: false,
            viewMentorAppointments: false,
            viewMentorSales: false,
            viewMentorWeeklyReport: false,
            viewMentorMonthlyReport: false,
            viewMentorBenchmarkReport: false,
            showDialChart: false,
            showContactChart: false,
            showApptChart: false,
            showCashflowDials: false,
            showCashflowContacts: false,
            showCashflowAppts: false,
            showBusinessDials: false,
            showBusinessContacts: false,
            showBusinessAppts: false,
            showProspectPerformance: false,
            showClientPerformance: false,
            showNaturalPerformance: false,
            showSuspectPerformance: false,
            showReferralPerformance: false,
            showTargetPerformance: false,
            showSelectedTargetPerformance: false,
            updatedProtegeFirstName: "",
            updateProtegeLastName: ""
        }
    }

    componentDidMount = () => {
        console.log("Current Date: " + moment(new Date()).format())
        console.log("7 Days Prior: " + moment().subtract(6, 'd').format("YYYY-MM-DD"))
    }

    updateProtege = () => {
        console.log(this.state.updatedProtegeFirstName);
        console.log(this.state.updatedProtegeLastName)
        console.log(this.state.updatedProtegeAlmaMater)
        console.log(this.state.updatedProtegeHomeTown)
        console.log(this.state.updatedProtegeProfilePicture)
        console.log(this.state.activeProtegeData._id)



    }

    assignProtegeFields = () => {

        this.setState({
            updatedProtegeFirstName: this.state.activeProtegeData.firstName,
            updatedProtegeLastName: this.state.activeProtegeData.lastName,
            updatedProtegeProfilePicture: this.state.activeProtegeData.imageURL,
            updatedProtegeAlmaMater: this.state.activeProtegeData.almaMater,
            updatedProtegeHomeTown: this.state.activeProtegeData.homeTown,
            updatedProtegeStartQuarter:
                this.state.activeProtegeData.startQuarter
        })

    }

    submitProtegeUpdate = () => {

        console.log("New First Name: " + this.state.updatedProtegeFirstName)
        console.log("New Last Name: " + this.state.updatedProtegeLastName)
        console.log("New Profile Image: " + this.state.updatedProtegeProfilePicture)
        console.log("New Protege Alma Mater: " + this.state.updatedProtegeAlmaMater)
        console.log("New Protege Home Town: " + this.state.updatedProtegeHomeTown)

        // this.updateProtege();

        setTimeout(() => {

            API.updateProtege(this.state.activeProtegeData._id, {
                almaMater: this.state.updatedProtegeAlmaMater,
                homeTown: this.state.updatedProtegeHomeTown,
                imageURL: this.state.updatedProtegeProfilePicture,
                firstName: this.state.updatedProtegeFirstName,
                lastName: this.state.updatedProtegeLastName
            }).then(res => {
                cogoToast.info("Updated Protege!")
                console.log("Completed Post")
            }).catch(err => console.log(err))

        }, 1000)

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    handleSourceChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        setTimeout(() => { this.changeSourceData() }, 500)
    }

    handleTargetChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        setTimeout(() => { this.changeTargetData() }, 500)
    }

    showProtegeAnalytics = () => {
        if (this.state.showProtegeAnalyticsViewer === false) {
            this.setState({
                showProtegeAnalyticsViewer: true,
                showMentorAnalyticsViewer: false,
                showGlobalAnalyticsViewer: false,
                activeMentorDataPopulated: false
            })
        } else {
            this.setState({
                showProtegeAnalyticsViewer: false,
                activeProtegeDataPopulated: false,
                activeProtegeData: "",
                appointments: "",
                contactData: "",
                dialData: "",
                BCAppts: 0,
                BCContacts: 0,
                BCDials: 0,
                BNAppts: 0,
                BNContacts: 0,
                BNDials: 0,
                BPAppts: 0,
                BPContacts: 0,
                BPDials: 0,
                BRAppts: 0,
                BRContacts: 0,
                BRDials: 0,
                BSAppts: 0,
                BSContacts: 0,
                BSDials: 0,
                BTAppts: 0,
                BTContacts: 0,
                BTDials: 0,
                CCAppts: 0,
                CCContacts: 0,
                CCDials: 0,
                CNAppts: 0,
                CNContacts: 0,
                CNDials: 0,
                CPAppts: 0,
                CPContacts: 0,
                CPDials: 0,
                CRAppts: 0,
                CRContacts: 0,
                CRDials: 0,
                CSAppts: 0,
                CSContacts: 0,
                CSDials: 0,
                CTAppts: 0,
                CTContacts: 0,
                CTDials: 0
            })
        }
        console.log("Show Protege Analytics using: " + this.props.allProtegeData)
    }

    showMentorAnalytics = () => {
        console.log("Show Mentor Analytics using: " + this.props.allMentorData)
        if (this.state.showMentorAnalyticsViewer === false) {
            this.setState({
                showProtegeAnalyticsViewer: false,
                showMentorAnalyticsViewer: true,
                showGlobalAnalyticsViewer: false,
                activeProtegeDataPopulated: false
            })
        } else {
            this.setState({
                showMentorAnalyticsViewer: false,
                activeMentorsProtegeDataPopulated: false,
                activeMentorsProtegeData: "",
                appointments: "",
                contactData: "",
                dialData: "",
                BCAppts: 0,
                BCContacts: 0,
                BCDials: 0,
                BNAppts: 0,
                BNContacts: 0,
                BNDials: 0,
                BPAppts: 0,
                BPContacts: 0,
                BPDials: 0,
                BRAppts: 0,
                BRContacts: 0,
                BRDials: 0,
                BSAppts: 0,
                BSContacts: 0,
                BSDials: 0,
                BTAppts: 0,
                BTContacts: 0,
                BTDials: 0,
                CCAppts: 0,
                CCContacts: 0,
                CCDials: 0,
                CNAppts: 0,
                CNContacts: 0,
                CNDials: 0,
                CPAppts: 0,
                CPContacts: 0,
                CPDials: 0,
                CRAppts: 0,
                CRContacts: 0,
                CRDials: 0,
                CSAppts: 0,
                CSContacts: 0,
                CSDials: 0,
                CTAppts: 0,
                CTContacts: 0,
                CTDials: 0
            })
        }
    }

    showGlobalAnalytics = () => {
        console.log("Show Global Analytics using: " + this.props.allProtegeData)
        console.log("Show Global Analytics using: " + this.props.allMentorData)
        if (this.state.showMentorAnalyticsViewer === false) {
            this.setState({
                showProtegeAnalyticsViewer: false,
                showMentorAnalyticsViewer: false,
                showGlobalAnalyticsViewer: true
            })
        } else {
            this.setState({
                showGlobalAnalyticsViewer: true
            })
        }
    }

    ////////////////////////////////////////////////////////////////////////
    ///////////////////////Protege Data Gathering //////////////////////////
    ////////////////////////////////////////////////////////////////////////

    viewProtegeData = () => {

        if (this.state.activeProtegeDataPopulated === true) {
            this.setState({
                activeProtegeDataPopulated: false,
                activeProtegeData: "",
                updatedProtegeFirstName: "",
                updatedProtegeLastName: "",
                updatedProtegeProfilePicture: "",
                updatedProfileHomeTown: "",
                updatedProfileAlmaMater: "",
                appointments: "",
                contactData: "",
                dialData: "",
                BCAppts: 0,
                BCContacts: 0,
                BCDials: 0,
                BNAppts: 0,
                BNContacts: 0,
                BNDials: 0,
                BPAppts: 0,
                BPContacts: 0,
                BPDials: 0,
                BRAppts: 0,
                BRContacts: 0,
                BRDials: 0,
                BSAppts: 0,
                BSContacts: 0,
                BSDials: 0,
                BTAppts: 0,
                BTContacts: 0,
                BTDials: 0,
                CCAppts: 0,
                CCContacts: 0,
                CCDials: 0,
                CNAppts: 0,
                CNContacts: 0,
                CNDials: 0,
                CPAppts: 0,
                CPContacts: 0,
                CPDials: 0,
                CRAppts: 0,
                CRContacts: 0,
                CRDials: 0,
                CSAppts: 0,
                CSContacts: 0,
                CSDials: 0,
                CTAppts: 0,
                CTContacts: 0,
                CTDials: 0
            })
        } else {
            console.log(this.state.protegeToView)
            API.getUserDataById(this.state.protegeToView)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        activeProtegeData: res.data[0],
                        activeProtegeDataPopulated: true,
                        dialData: res.data[0].dials,
                        protegeSelected: res.data[0]._id,
                        appointments: res.data[0].appointments
                    })
                },
                    this.gatherSales(),
                    this.getContactData(),
                    this.getProtegeNoteData(),
                    setTimeout(() => {
                        this.assignProtegeFields()
                    }, 500)
                    ,
                    setTimeout(() => {
                        this.parseDials()
                        this.parseAppointments()
                    }, 500)
                )

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
        API.getWeeklyDials(this.state.protegeToView)
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
        API.getMonthlyDials(this.state.protegeToView)
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
        API.getMonthlyAppts(this.state.protegeToView)
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
        API.getWeeklyAppts(this.state.protegeToView)
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



    gatherSales = () => {
        setTimeout(() => {
            API.getSales(this.state.protegeToView)
                .then(res => {
                    this.setState({
                        sales: res.data
                    })
                })
        })
    }

    gatherAppointments = () => {
        API.getUserDataById(this.state.protegeToView)
            .then(res => {
                this.setState({
                    appointments: res.data[0].appointments
                })
            })
    }

    getProtegeNoteData = () => {
        // console.log(this.state.userData._id)

        API.getProtegeNotes(this.state.protegeToView)
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

    viewMentorsProtegeData = () => {
        if (this.state.activeMentorsProtegeDataPopulated === true) {
            this.setState({
                activeMentorsProtegeDataPopulated: false,
                activeMentorProtegeData: "",
                appointments: "",
                contactData: "",
                dialData: "",
                BCAppts: 0,
                BCContacts: 0,
                BCDials: 0,
                BNAppts: 0,
                BNContacts: 0,
                BNDials: 0,
                BPAppts: 0,
                BPContacts: 0,
                BPDials: 0,
                BRAppts: 0,
                BRContacts: 0,
                BRDials: 0,
                BSAppts: 0,
                BSContacts: 0,
                BSDials: 0,
                BTAppts: 0,
                BTContacts: 0,
                BTDials: 0,
                CCAppts: 0,
                CCContacts: 0,
                CCDials: 0,
                CNAppts: 0,
                CNContacts: 0,
                CNDials: 0,
                CPAppts: 0,
                CPContacts: 0,
                CPDials: 0,
                CRAppts: 0,
                CRContacts: 0,
                CRDials: 0,
                CSAppts: 0,
                CSContacts: 0,
                CSDials: 0,
                CTAppts: 0,
                CTContacts: 0,
                CTDials: 0
            })
        } else {
            console.log(this.state.mentorsProtegeToView)
            API.getUserDataById(this.state.mentorsProtegeToView)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        activeMentorsProtegeData: res.data[0],
                        activeMentorsProtegeDataPopulated: true,
                        dialData: res.data[0].dials,
                        protegeSelected: res.data[0]._id,
                        appointments: res.data[0].appointments
                    })
                },

                    this.getMContactData(),
                    setTimeout(() => {
                        this.parseDials()
                        this.parseAppointments()
                    }, 500)

                )
        }
    }

    ////////////////////////////////////////////////////////////////////////
    ///////////////////////Data Parsing ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    getContactData = () => {
        setTimeout(() => {
            console.log("Searching contacts using: " + this.state.activeProtegeData._id)
            API.getContacts(this.state.activeProtegeData._id)
                .then(res =>
                    this.setState({
                        contactData: res.data
                    }),
                    setTimeout(() => { this.parseContacts() }, 500)
                )
        }, 1000)

    }

    getMContactData = () => {
        setTimeout(() => {
            console.log("Searching contacts using: " + this.state.activeMentorsProtegeData._id)
            API.getContacts(this.state.activeMentorsProtegeData._id)
                .then(res =>
                    this.setState({
                        contactData: res.data
                    }),
                    setTimeout(() => { this.parseContacts() }, 500)
                )
        }, 1000)

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
        console.log("Parsing Contacts: " + this.state.contactData)
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
        var CRA = 0;
        var BRA = 0;
        var CTA = 0;
        var BTA = 0;
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





    viewMentorData = () => {
        console.log(this.state.mentorToView)
        if (this.state.activeMentorDataPopulated === false) {
            API.getMentorById(this.state.mentorToView)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        activeMentorData: res.data[0],
                        activeMentorDataPopulated: true
                    })

                }, setTimeout(() => { this.getMentorAppointmentData() }, 500),
                    setTimeout(() => { this.gatherMentorSales() }, 500)
                )

        } else {
            this.setState({
                activeMentorDataPopulated: false,
                activeMentorData: "",
                appointments: "",
                contactData: "",
                dialData: "",
                BCAppts: 0,
                BCContacts: 0,
                BCDials: 0,
                BNAppts: 0,
                BNContacts: 0,
                BNDials: 0,
                BPAppts: 0,
                BPContacts: 0,
                BPDials: 0,
                BRAppts: 0,
                BRContacts: 0,
                BRDials: 0,
                BSAppts: 0,
                BSContacts: 0,
                BSDials: 0,
                BTAppts: 0,
                BTContacts: 0,
                BTDials: 0,
                CCAppts: 0,
                CCContacts: 0,
                CCDials: 0,
                CNAppts: 0,
                CNContacts: 0,
                CNDials: 0,
                CPAppts: 0,
                CPContacts: 0,
                CPDials: 0,
                CRAppts: 0,
                CRContacts: 0,
                CRDials: 0,
                CSAppts: 0,
                CSContacts: 0,
                CSDials: 0,
                CTAppts: 0,
                CTContacts: 0,
                CTDials: 0
            })
        }
    }

    getMentorAppointmentData = () => {
        API.getMentorAppts(this.state.activeMentorData._id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    mentorAppts: res.data
                })
            })
    }

    gatherMentorSales = () => {
        API.getMentorSales(this.state.activeMentorData._id)
            .then(res => {
                this.setState({
                    mentorSales: res.data
                })
            })

    }

    viewProtegeCallData = () => {
        if (this.state.viewProtegeCallData === true) {
            this.setState({
                viewProtegeCallData: false
            })
        } else {
            this.setState({
                viewProtegeCallData: true,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewProtegeSchedule = () => {
        if (this.state.viewProtegeSchedule === true) {
            this.setState({
                viewProtegeSchedule: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: true,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewProtegeAppointments = () => {
        if (this.state.viewProtegeAppointments === true) {
            this.setState({
                viewProtegeAppointments: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: true,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewProtegeSales = () => {
        if (this.state.viewProtegeSales === true) {
            this.setState({
                viewProtegeSales: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: true,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewProtegeNotes = () => {
        if (this.state.viewProtegeNotes === true) {
            this.setState({
                viewProtegeNotes: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: true,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
            setTimeout(() => { this.getProtegeNoteData() }, 500)
        }
    }

    // getProtegeNoteData = () => {
    //     // console.log(this.state.userData._id)

    //     API.getProtegeNotes(this.state.activeProtegeData._id)
    //         .then(res =>
    //             this.setState({
    //                 taggedNotes: res.data
    //             })
    //         )
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    viewProtegeProfile = () => {
        if (this.state.viewProtegeProfile === true) {
            this.setState({
                viewProtegeProfile: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: true,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewProtegeWeeklyReport = () => {
        if (this.state.viewProtegeWeeklyReport === true) {
            this.setState({
                viewProtegeWeeklyReport: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: true,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewProtegeMonthlyReport = () => {
        if (this.state.viewProtegeMonthlyReport === true) {
            this.setState({
                viewProtegeMonthlyReport: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: true,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewProtegeBenchmarkReport = () => {
        if (this.state.viewProtegeBenchmarkReport === true) {
            this.setState({
                viewProtegeBenchmarkReport: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: true,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewMentorsProtegeStatistics = () => {
        if (this.state.viewMentorsProtegeStatistics === true) {
            this.setState({
                viewMentorsProtegeStatistics: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: true,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewMentorSchedule = () => {
        if (this.state.viewMentorSchedule === true) {
            this.setState({
                viewMentorSchedule: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: true,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewMentorAppointments = () => {
        if (this.state.viewMentorAppointments === true) {
            this.setState({
                viewMentorAppointments: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: true,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewMentorSales = () => {
        if (this.state.viewMentorSales === true) {
            this.setState({
                viewMentorSales: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: true,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewMentorWeeklyReport = () => {
        if (this.state.viewMentorWeeklyReport === true) {
            this.setState({
                viewMentorWeeklyReport: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: true,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewMentorMonthlyReport = () => {
        if (this.state.viewMentorMonthlyReport === true) {
            this.setState({
                viewMentorMonthlyReport: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: true,
                viewMentorBenchmarkReport: false
            })
        }
    }

    viewMentorBenchmarkReport = () => {
        if (this.state.viewMentorBenchmarkReport === true) {
            this.setState({
                viewMentorBenchmarkReport: false
            })
        } else {
            this.setState({
                viewProtegeCallData: false,
                viewProtegeSchedule: false,
                viewProtegeAppointments: false,
                viewProtegeSales: false,
                viewProtegeNotes: false,
                viewProtegeProfile: false,
                viewProtegeWeeklyReport: false,
                viewProtegeMonthlyReport: false,
                viewProtegeBenchmarkReport: false,
                viewMentorsProtegeStatistics: false,
                viewMentorSchedule: false,
                viewMentorAppointments: false,
                viewMentorSales: false,
                viewMentorWeeklyReport: false,
                viewMentorMonthlyReport: false,
                viewMentorBenchmarkReport: true
            })
        }
    }


    showDataOption = (e) => {
        e.preventDefault()
        switch (this.state.dataOption) {
            case "genDials":
                this.viewDialChart()
                break;
            case "genContacts":
                this.viewContactChart()
                break;
            case "genAppts":
                this.viewApptChart()
                break;
            case "cfDials":
                this.viewCFDialChart()
                break;
            case "cfContacts":
                this.viewCFContactChart()
                break;
            case "cfAppts":
                this.viewCFApptChart()
                break;
            case "boDials":
                this.viewBODialChart()
                break;
            case "boContacts":
                this.viewBOContactChart()
                break;
            case "boAppts":
                this.viewBOApptChart()
                break;
            default:
                console.log("No option selected")
                break;
        }

    }

    showCategoryOption = (e) => {
        e.preventDefault()

        switch (this.state.categoryOption) {
            case "pData":
                this.viewProspectPerformance()
                break;
            case "cData":
                this.viewClientPerformance()
                break;
            case "sData":
                this.viewSuspectPerformance()
                break;
            case "nData":
                this.viewNaturalPerformance()
                break;
            case "rData":
                this.viewReferralPerformance()
                break;
            case "tData":
                this.viewTargetPerformance()
                break;
            default:
                console.log("No proper selection made")
                break;
        }
    }


    viewDialChart = () => {
        if (this.state.showDialChart === true) {
            this.setState({
                showDialChart: false
            })
        } else {
            this.setState({
                showDialChart: true,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewContactChart = () => {
        if (this.state.showContactChart === true) {
            this.setState({
                showContactChart: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: true,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewApptChart = () => {
        if (this.state.showApptChart === true) {
            this.setState({
                showApptChart: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: true,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewCFDialChart = () => {
        if (this.state.showCashflowDials === true) {
            this.setState({
                showCashflowDials: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: true,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewCFContactChart = () => {
        if (this.state.showCashflowContacts === true) {
            this.setState({
                showCashflowContacts: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: true,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewCFApptChart = () => {
        if (this.state.showCashflowAppts === true) {
            this.setState({
                showCashflowAppts: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: true,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewBODialChart = () => {
        if (this.state.showBusinessDials === true) {
            this.setState({
                showBusinessDials: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: true,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewBOContactChart = () => {
        if (this.state.showBusinessContacts === true) {
            this.setState({
                showBusinessContacts: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: true,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewBOApptChart = () => {
        if (this.state.showBusinessAppts === true) {
            this.setState({
                showBusinessAppts: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: true,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewProspectPerformance = () => {
        if (this.state.showProspectPerformance === true) {
            this.setState({
                showProspectPerformance: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: true,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewClientPerformance = () => {
        if (this.state.showClientPerformance === true) {
            this.setState({
                showClientPerformance: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: true,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewNaturalPerformance = () => {
        if (this.state.showNaturalPerformance === true) {
            this.setState({
                showNaturalPerformance: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: true,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewSuspectPerformance = () => {
        if (this.state.showSuspectPerformance === true) {
            this.setState({
                showSuspectPerformance: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: true,
                showReferralPerformance: false,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewReferralPerformance = () => {
        if (this.state.showReferralPerformance === true) {
            this.setState({
                showReferralPerformance: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: true,
                showTargetPerformance: false,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewTargetPerformance = () => {
        if (this.state.showTargetPerformance === true) {
            this.setState({
                showTargetPerformance: false
            })
        } else {
            this.setState({
                showDialChart: false,
                showContactChart: false,
                showApptChart: false,
                showCashflowDials: false,
                showCashflowContacts: false,
                showCashflowAppts: false,
                showBusinessDials: false,
                showBusinessContacts: false,
                showBusinessAppts: false,
                showProspectPerformance: false,
                showClientPerformance: false,
                showNaturalPerformance: false,
                showSuspectPerformance: false,
                showReferralPerformance: false,
                showTargetPerformance: true,
                showSourcePerformance: false,
                showSelectedTargetPerformance: false
            })
        }
    }

    viewSourcePerformance = () => {
        // if (this.state.showSourcePerformance === true) {
        //     this.setState({
        //         SCPDials: 0,
        //         SBPDials: 0,
        //         SCCDials: 0,
        //         SBCDials: 0,
        //         SCNDials: 0,
        //         SBNDials: 0,
        //         SCSDials: 0,
        //         SBSDials: 0,
        //         SCRDials: 0,
        //         SBRDials: 0,
        //         SCTDials: 0,
        //         SBTDials: 0,
        //         SourceDials: "",
        //         SCPContacts: 0,
        //         SBPContacts: 0,
        //         SCCContacts: 0,
        //         SBCContacts: 0,
        //         SCNContacts: 0,
        //         SBNContacts: 0,
        //         SCSContacts: 0,
        //         SBSContacts: 0,
        //         SCRContacts: 0,
        //         SBRContacts: 0,
        //         SCTContacts: 0,
        //         SBTContacts: 0,
        //         SourceContacts: "",
        //         SCPAppts: 0,
        //         SBPAppts: 0,
        //         SCCAppts: 0,
        //         SBCAppts: 0,
        //         SCNAppts: 0,
        //         SBNAppts: 0,
        //         SCSAppts: 0,
        //         SBSAppts: 0,
        //         SCRAppts: 0,
        //         SBRAppts: 0,
        //         SCTAppts: 0,
        //         SBTAppts: 0,
        //         SourceAppts: ""
        //     })
        // } else {
        this.setState({
            showDialChart: false,
            showContactChart: false,
            showApptChart: false,
            showCashflowDials: false,
            showCashflowContacts: false,
            showCashflowAppts: false,
            showBusinessDials: false,
            showBusinessContacts: false,
            showBusinessAppts: false,
            showProspectPerformance: false,
            showClientPerformance: false,
            showNaturalPerformance: false,
            showSuspectPerformance: false,
            showReferralPerformance: false,
            showTargetPerformance: false,
            showSourcePerformance: true,
            showSelectedTargetPerformance: false
        })
        // }
    }

    viewSelectedTargetPerformance = () => {
        // if (this.state.showSelectedTargetPerformance === true) {
        //     this.setState({
        //         showSelectedTargetPerformance: false
        //     })
        // } else {
        this.setState({
            showDialChart: false,
            showContactChart: false,
            showApptChart: false,
            showCashflowDials: false,
            showCashflowContacts: false,
            showCashflowAppts: false,
            showBusinessDials: false,
            showBusinessContacts: false,
            showBusinessAppts: false,
            showProspectPerformance: false,
            showClientPerformance: false,
            showNaturalPerformance: false,
            showSuspectPerformance: false,
            showReferralPerformance: false,
            showTargetPerformance: false,
            showSourcePerformance: false,
            showSelectedTargetPerformance: true
        })
        // }
    }

    changeSourceData = () => {
        // event.preventDefault()
        console.log("Gathering data on source: " + this.state.leadSource)
        // var parsedDials = []
        var parsedSourceData = {
            parsedDials: [],
            parsedContacts: [],
            parsedAppts: []
        }
        for (var i = 0; i < this.state.dialData.length; i++) {
            if (this.state.dialData[i].source === this.state.leadSource) {
                parsedSourceData.parsedDials.push(this.state.dialData[i])
            }
        }

        for (var j = 0; j < this.state.contactData.length; j++) {
            if (this.state.contactData[j].source === this.state.leadSource) {
                parsedSourceData.parsedContacts.push(this.state.contactData[j])
            }
        }

        for (var k = 0; k < this.state.appointments.length; k++) {
            if (this.state.appointments[k].source === this.state.leadSource) {
                parsedSourceData.parsedAppts.push(this.state.appointments[k])
            }
        }

        setTimeout(() => {

            this.setState({
                sourceDialData: parsedSourceData.parsedDials,
                sourceContactData: parsedSourceData.parsedContacts,
                sourceApptData: parsedSourceData.parsedAppts
            })
            setTimeout(() => {
                this.parseSourceAppts()
                this.parseSourceContacts()
                this.parseSourceDials()

                // setTimeout(() => { this.viewSourcePerformance() }, 500)
            }, 500)

        }, 500)
    }

    gatherSourceData = (event) => {
        event.preventDefault()
        console.log("Gathering data on source: " + this.state.leadSource)
        // var parsedDials = []
        var parsedSourceData = {
            parsedDials: [],
            parsedContacts: [],
            parsedAppts: []
        }
        for (var i = 0; i < this.state.dialData.length; i++) {
            if (this.state.dialData[i].source === this.state.leadSource) {
                parsedSourceData.parsedDials.push(this.state.dialData[i])
            }
        }

        for (var j = 0; j < this.state.contactData.length; j++) {
            if (this.state.contactData[j].source === this.state.leadSource) {
                parsedSourceData.parsedContacts.push(this.state.contactData[j])
            }
        }

        for (var k = 0; k < this.state.appointments.length; k++) {
            if (this.state.appointments[k].source === this.state.leadSource) {
                parsedSourceData.parsedAppts.push(this.state.appointments[k])
            }
        }

        setTimeout(() => {

            this.setState({
                sourceDialData: parsedSourceData.parsedDials,
                sourceContactData: parsedSourceData.parsedContacts,
                sourceApptData: parsedSourceData.parsedAppts
            })
            setTimeout(() => {
                this.parseSourceAppts()
                this.parseSourceContacts()
                this.parseSourceDials()

                setTimeout(() => { this.viewSourcePerformance() }, 500)
            }, 500)

        }, 500)

    }

    parseSourceDials = () => {
        console.log("Parsing: " + this.state.sourceDialData)
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
        var SDials = 0;
        for (var i = 0; i < this.state.sourceDialData.length; i++) {
            // console.log(this.state.dialData[i])
            switch (this.state.sourceDialData[i].type) {
                case "CPD":
                    CPD++
                    SDials++
                    break;
                case "BPD":
                    BPD++
                    SDials++
                    break;
                case "CCD":
                    CCD++
                    SDials++
                    break;
                case "BCD":
                    BCD++
                    SDials++
                    break;
                case "CND":
                    CND++
                    SDials++
                    break;
                case "BND":
                    BND++
                    SDials++
                    break;
                case "CSD":
                    CSD++
                    SDials++
                    break;
                case "BSD":
                    BSD++
                    SDials++
                    break;
                case "CRD":
                    CRD++
                    SDials++
                    break;
                case "BRD":
                    BRD++
                    SDials++
                    break;
                case "CTD":
                    CTD++
                    SDials++
                    break;
                case "BTD":
                    BTD++
                    SDials++
                    break;
                default:
                    SDials++
                    break;
            }
        }
        this.setState({
            SCPDials: CPD,
            SBPDials: BPD,
            SCCDials: CCD,
            SBCDials: BCD,
            SCNDials: CND,
            SBNDials: BND,
            SCSDials: CSD,
            SBSDials: BSD,
            SCRDials: CRD,
            SBRDials: BRD,
            SCTDials: CTD,
            SBTDials: BTD,
            SourceDials: SDials
        })
    }


    parseSourceContacts = () => {
        console.log("Parsing: " + this.state.sourceContactData)
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
        var SContacts = 0;
        for (var i = 0; i < this.state.sourceContactData.length; i++) {
            switch (this.state.sourceContactData[i].type) {
                case "CPD":
                    CPC++
                    SContacts++
                    break;
                case "BPD":
                    BPC++
                    SContacts++
                    break;
                case "CCD":
                    CCC++
                    SContacts++
                    break;
                case "BCD":
                    BCC++
                    SContacts++
                    break;
                case "CND":
                    CNC++
                    SContacts++
                    break;
                case "BND":
                    BNC++
                    SContacts++
                    break;
                case "CSD":
                    CSC++
                    SContacts++
                    break;
                case "BSD":
                    BSC++
                    SContacts++
                    break;
                case "CRD":
                    CRC++
                    SContacts++
                    break;
                case "BRD":
                    BRC++
                    SContacts++
                    break;
                case "CTD":
                    SContacts++
                    CTC++
                    break;
                case "BTD":
                    SContacts++
                    BTC++
                    break;
                default:
                    SContacts++
                    break;
            }
        }
        this.setState({
            SCPContacts: CPC,
            SBPContacts: BPC,
            SCCContacts: CCC,
            SBCContacts: BCC,
            SCNContacts: CNC,
            SBNContacts: BNC,
            SCSContacts: CSC,
            SBSContacts: BSC,
            SCRContacts: CRC,
            SBRContacts: BRC,
            SCTContacts: CTC,
            SBTContacts: BTC,
            SourceContacts: SContacts
        })
    }

    parseSourceAppts = () => {
        console.log("Parsing: " + this.state.sourceApptData)
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
        var SAppts = 0;
        for (var i = 0; i < this.state.sourceApptData.length; i++) {
            console.log(this.state.sourceApptData[i])
            switch (this.state.sourceApptData[i].type) {
                case "CPD":
                    CPA++
                    SAppts++
                    break;
                case "BPD":
                    BPA++
                    SAppts++
                    break;
                case "CCD":
                    CCA++
                    SAppts++
                    break;
                case "BCD":
                    BCA++
                    SAppts++
                    break;
                case "CND":
                    CNA++
                    SAppts++
                    break;
                case "BND":
                    BNA++
                    SAppts++
                    break;
                case "CSD":
                    CSA++
                    SAppts++
                    break;
                case "BSD":
                    BSA++
                    SAppts++
                    break;
                case "CRD":
                    CRA++
                    SAppts++
                    break;
                case "BRD":
                    BRA++
                    SAppts++
                    break;
                case "CTD":
                    CTA++
                    SAppts++
                    break;
                case "BTD":
                    BTA++
                    SAppts++
                    break;
                default:
                    SAppts++
                    break;
            }
        }
        this.setState({
            SCPAppts: CPA,
            SBPAppts: BPA,
            SCCAppts: CCA,
            SBCAppts: BCA,
            SCNAppts: CNA,
            SBNAppts: BNA,
            SCSAppts: CSA,
            SBSAppts: BSA,
            SCRAppts: CRA,
            SBRAppts: BRA,
            SCTAppts: CTA,
            SBTAppts: BTA,
            SourceAppts: SAppts
        })
    }

    changeTargetData = () => {
        // event.preventDefault()
        console.log("Gathering data on source: " + this.state.targetMarket)
        // var parsedDials = []
        var parsedTargetData = {
            parsedDials: [],
            parsedContacts: [],
            parsedAppts: []
        }
        for (var i = 0; i < this.state.dialData.length; i++) {
            if (this.state.dialData[i].targetMarket === this.state.targetMarket) {
                parsedTargetData.parsedDials.push(this.state.dialData[i])
            }
        }

        for (var j = 0; j < this.state.contactData.length; j++) {
            if (this.state.contactData[j].targetMarket === this.state.targetMarket) {
                parsedTargetData.parsedContacts.push(this.state.contactData[j])
            }
        }

        for (var k = 0; k < this.state.appointments.length; k++) {
            if (this.state.appointments[k].targetMarket === this.state.targetMarket) {
                parsedTargetData.parsedAppts.push(this.state.appointments[k])
            }
        }

        setTimeout(() => {

            this.setState({
                targetDialData: parsedTargetData.parsedDials,
                targetContactData: parsedTargetData.parsedContacts,
                targetApptData: parsedTargetData.parsedAppts
            })
            setTimeout(() => {
                this.parseTargetAppts()
                this.parseTargetContacts()
                this.parseTargetDials()

                // setTimeout(() => { this.viewSelectedTargetPerformance() }, 500)
            }, 500)

        }, 500)

    }

    gatherTargetData = (event) => {
        event.preventDefault()
        console.log("Gathering data on source: " + this.state.targetMarket)
        // var parsedDials = []
        var parsedTargetData = {
            parsedDials: [],
            parsedContacts: [],
            parsedAppts: []
        }
        for (var i = 0; i < this.state.dialData.length; i++) {
            if (this.state.dialData[i].targetMarket === this.state.targetMarket) {
                parsedTargetData.parsedDials.push(this.state.dialData[i])
            }
        }

        for (var j = 0; j < this.state.contactData.length; j++) {
            if (this.state.contactData[j].targetMarket === this.state.targetMarket) {
                parsedTargetData.parsedContacts.push(this.state.contactData[j])
            }
        }

        for (var k = 0; k < this.state.appointments.length; k++) {
            if (this.state.appointments[k].targetMarket === this.state.targetMarket) {
                parsedTargetData.parsedAppts.push(this.state.appointments[k])
            }
        }

        setTimeout(() => {

            this.setState({
                targetDialData: parsedTargetData.parsedDials,
                targetContactData: parsedTargetData.parsedContacts,
                targetApptData: parsedTargetData.parsedAppts
            })
            setTimeout(() => {
                this.parseTargetAppts()
                this.parseTargetContacts()
                this.parseTargetDials()

                setTimeout(() => { this.viewSelectedTargetPerformance() }, 500)
            }, 500)

        }, 500)

    }

    parseTargetDials = () => {
        console.log("Parsing: " + this.state.targetDialData)
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
        var TDials = 0;
        for (var i = 0; i < this.state.targetDialData.length; i++) {
            // console.log(this.state.dialData[i])
            switch (this.state.targetDialData[i].type) {
                case "CPD":
                    CPD++
                    TDials++
                    break;
                case "BPD":
                    BPD++
                    TDials++
                    break;
                case "CCD":
                    CCD++
                    TDials++
                    break;
                case "BCD":
                    BCD++
                    TDials++
                    break;
                case "CND":
                    CND++
                    TDials++
                    break;
                case "BND":
                    BND++
                    TDials++
                    break;
                case "CSD":
                    CSD++
                    TDials++
                    break;
                case "BSD":
                    BSD++
                    TDials++
                    break;
                case "CRD":
                    CRD++
                    TDials++
                    break;
                case "BRD":
                    BRD++
                    TDials++
                    break;
                case "CTD":
                    CTD++
                    TDials++
                    break;
                case "BTD":
                    BTD++
                    TDials++
                    break;
                default:
                    TDials++
                    break;
            }
        }
        this.setState({
            TCPDials: CPD,
            TBPDials: BPD,
            TCCDials: CCD,
            TBCDials: BCD,
            TCNDials: CND,
            TBNDials: BND,
            TCSDials: CSD,
            TBSDials: BSD,
            TCRDials: CRD,
            TBRDials: BRD,
            TCTDials: CTD,
            TBTDials: BTD,
            TargetDials: TDials
        })
    }

    parseTargetContacts = () => {
        console.log("Parsing: " + this.state.targetContactData)
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
        var TContacts = 0;
        for (var i = 0; i < this.state.targetContactData.length; i++) {
            switch (this.state.targetContactData[i].type) {
                case "CPD":
                    CPC++
                    TContacts++
                    break;
                case "BPD":
                    BPC++
                    TContacts++
                    break;
                case "CCD":
                    CCC++
                    TContacts++
                    break;
                case "BCD":
                    BCC++
                    TContacts++
                    break;
                case "CND":
                    CNC++
                    TContacts++
                    break;
                case "BND":
                    BNC++
                    TContacts++
                    break;
                case "CSD":
                    CSC++
                    TContacts++
                    break;
                case "BSD":
                    BSC++
                    TContacts++
                    break;
                case "CRD":
                    CRC++
                    TContacts++
                    break;
                case "BRD":
                    BRC++
                    TContacts++
                    break;
                case "CTD":
                    TContacts++
                    CTC++
                    break;
                case "BTD":
                    TContacts++
                    BTC++
                    break;
                default:
                    TContacts++
                    break;
            }
        }
        this.setState({
            TCPContacts: CPC,
            TBPContacts: BPC,
            TCCContacts: CCC,
            TBCContacts: BCC,
            TCNContacts: CNC,
            TBNContacts: BNC,
            TCSContacts: CSC,
            TBSContacts: BSC,
            TCRContacts: CRC,
            TBRContacts: BRC,
            TCTContacts: CTC,
            TBTContacts: BTC,
            TargetContacts: TContacts
        })
    }


    parseTargetAppts = () => {
        console.log("Parsing: " + this.state.targetApptData)
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
        var TAppts = 0;
        for (var i = 0; i < this.state.targetApptData.length; i++) {
            console.log(this.state.targetApptData[i])
            switch (this.state.targetApptData[i].type) {
                case "CPD":
                    CPA++
                    TAppts++
                    break;
                case "BPD":
                    BPA++
                    TAppts++
                    break;
                case "CCD":
                    CCA++
                    TAppts++
                    break;
                case "BCD":
                    BCA++
                    TAppts++
                    break;
                case "CND":
                    CNA++
                    TAppts++
                    break;
                case "BND":
                    BNA++
                    TAppts++
                    break;
                case "CSD":
                    CSA++
                    TAppts++
                    break;
                case "BSD":
                    BSA++
                    TAppts++
                    break;
                case "CRD":
                    CRA++
                    TAppts++
                    break;
                case "BRD":
                    BRA++
                    TAppts++
                    break;
                case "CTD":
                    CTA++
                    TAppts++
                    break;
                case "BTD":
                    BTA++
                    TAppts++
                    break;
                default:
                    TAppts++
                    break;
            }
        }
        this.setState({
            TCPAppts: CPA,
            TBPAppts: BPA,
            TCCAppts: CCA,
            TBCAppts: BCA,
            TCNAppts: CNA,
            TBNAppts: BNA,
            TCSAppts: CSA,
            TBSAppts: BSA,
            TCRAppts: CRA,
            TBRAppts: BRA,
            TCTAppts: CTA,
            TBTAppts: BTA,
            TargetAppts: TAppts
        })
    }

    





    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <div className="card bg-light"
                style={{
                    padding: '50px',
                    // backgroundColor: 'rgba(77,160,255,0.80)', 
                    // color: 'whitesmoke' 
                }}>

                <div className="card-header">
                    <h2 style={{ textAlign: 'center', color: 'black', margin: '20px', borderRadius: '10px' }}>A N A L Y T I C S</h2>

                    <div className="row">
                        <div className="col-12 card" style={{ padding: '50px', backgroundColor: '', color: 'black', textAlign: 'left' }}>
                            <div className="card-header">
                                <h3 style={{ textAlign: 'center' }}>Select an Option</h3>
                            </div>
                            {/* <br /> */}
                            {/* <hr />
                            <hr /> */}
                            <div style={{ textAlign: 'center' }}>
                                <h4 style={{ textAlign: 'center' }}>Review Proteges <br /><button className="btn btn-outline-dark" onClick={this.showProtegeAnalytics}>Show/Hide</button></h4>
                                {/* <hr /> */}
                                <br />
                                <h4 style={{ textAlign: 'center' }}>Review Mentors <br /><button className="btn btn-outline-dark" onClick={this.showMentorAnalytics}>Show/Hide</button></h4>
                                {/* <br /> */}
                                <br />
                                <h4 style={{ textAlign: 'center' }}>Review Global <br /><button className="btn btn-outline-dark" onClick={this.showGlobalAnalytics}>Show/Hide</button></h4>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <div className="row">
                    <div className="card-body">
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////// PROTEGE DATA VIEWER TOOLS AND OPTS////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                        {this.state.showProtegeAnalyticsViewer ?
                            <div className="card bg-light" style={{ padding: '50px', backgroundColor: '', color: 'black', textAlign: 'left' }}>
                                <div className="card-header">
                                    <h4 style={{ textAlign: 'center' }}>Select a Protege</h4>
                                </div>
                                {this.props.allProtegeData ?
                                    <div className="card-body">
                                        {/* <ul> */}
                                        <p style={{ textAlign: 'center' }}>
                                            <select id="mentorsDropDownMenu" value={this.state.protegeToView} onChange={this.handleInputChange} name="protegeToView">
                                                <option value="none">--Select a Protege--</option>
                                                {this.props.allProtegeData.map(protege => (<option key={protege._id} value={protege._id}>{protege.firstName} {protege.lastName}</option>))}
                                            </select>
                                            {/* <button>Placeholder</button> */}
                                            <br />
                                            <button onClick={this.viewProtegeData} className="btn btn-outline-dark btn-sm">View/Change</button>
                                            {/* <button onClick={this.removeMentorFromProtege} className="btn btn-outline-danger btn-sm">Remove Mentor</button> */}
                                        </p>
                                        {/* </ul> */}
                                    </div>
                                    : null}
                            </div>
                            : null}
                        <br />
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {this.state.activeProtegeDataPopulated ?
                            <div className="card" style={{ color: 'black', textAlign: 'left' }}>


                                <div className="card-header">
                                    <h4 style={{ textAlign: 'center' }}>Select what you'd like to view</h4>
                                </div>
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                <button className="btn btn-outline-dark" onClick={this.viewProtegeCallData}>View Call Data</button>
                                {this.state.viewProtegeCallData ?
                                    <div className="card" style={{ padding: '50px', backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', textAlign: 'left' }}>
                                        <div className="card-header">
                                            <h4 style={{ textAlign: 'center' }}>Protege Call Data:</h4>


                                            <h5 style={{ textAlign: 'center', color: 'black' }}> <i>Please select your Scope (Defaulted to All)</i></h5>

                                            <form>

                                                <hr />


                                                <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', backgroundColor: '' }}>

                                                    <select style={{}} id="protegeSelector" value={this.state.scopeSelected} onChange={this.handleInputChange} type="text" name="scopeSelected" className="customDropManager" placeholder="Choose your protege">
                                                        <option value={"none"}>---------------</option>
                                                        <option value={"viewAll"}>All Data</option>
                                                        <option value={"viewWeekly"}>Weekly Data</option>
                                                        <option value={"viewMonthly"}>Monthly Data</option>
                                                    </select>
                                                    <br />
                                                    <button style={{}} onClick={this.handleScopeChange} className="btn btn-sm btn-outline-dark">Apply</button>

                                                    <br />

                                                </div>
                                            </form>
                                        </div>
                                        {/* Type of Call Breakdown */}

                                        <form>
                                            <div>
                                                <select id="sourceDropMenu" className="" value={this.state.dataOption} onChange={this.handleInputChange} name="dataOption">
                                                    <option value={"none"}>--Choose a Type of Call--</option>
                                                    <option value={"genDials"}>Dial Data</option>
                                                    <option value={"genContacts"}>Contact Data</option>
                                                    <option value={"genAppts"}>Appointment Data</option>
                                                    <option value={"cfDials"}>Cashflow Dial Data</option>
                                                    <option value={"cfContacts"}>Cashflow Contact Data</option>
                                                    <option value={"cfAppts"}>Cashflow Appointment Data</option>
                                                    <option value={"boDials"}>Tier Dial Data</option>
                                                    <option value={"boContacts"}>Tier-1 Contact Data</option>
                                                    <option value={"boAppts"}>Tier-1 Appointment Data</option>
                                                </select>
                                                <button className="btn-outline-dark btn-sm btn" onClick={this.showDataOption}>Get Data</button>
                                            </div>
                                        </form>

                                        {/* Category of Call Breakdown */}

                                        <form>
                                            <div>
                                                <select id="sourceDropMenu" className="" value={this.state.categoryOption} onChange={this.handleInputChange} name="categoryOption">
                                                    <option value={"none"}>--Choose a Category--</option>
                                                    <option value={"pData"}>Prospects Call Data</option>
                                                    <option value={"cData"}>Clients Call Data</option>
                                                    <option value={"nData"}>Natural Market Call Data</option>
                                                    <option value={"sData"}>Suspect Call Data</option>
                                                    <option value={"rData"}>Referral Call Data</option>
                                                    <option value={"tData"}>Target Market Call Data</option>
                                                </select>
                                                <button className="btn-outline-dark btn-sm btn" onClick={this.showCategoryOption}>Get Data</button>
                                            </div>
                                        </form>

                                        <form>
                                            {this.state.activeProtegeData.sources ?
                                                <div>
                                                    <select id="sourceDropMenu" className="" value={this.state.leadSource} onChange={this.handleSourceChange} name="leadSource">
                                                        <option value={"none"}>No Lead Source Selected</option>
                                                        {this.state.activeProtegeData.sources.map(source => (
                                                            <option value={source}>{source}</option>
                                                        ))}
                                                    </select>
                                                    <button className="btn-outline-dark btn-sm btn" onClick={this.gatherSourceData}>Get Data</button>
                                                    {/* <button className="btn-outline-light btn-sm btn" onClick={this.changeSourceData}>Change Source</button> */}
                                                </div>
                                                : null}
                                        </form>

                                        <form>
                                            {this.state.activeProtegeData.targetMarkets ?
                                                <div>
                                                    <select id="sourceDropMenu" value={this.state.targetMarket} className="" onChange={this.handleTargetChange} name="targetMarket">
                                                        <option value={"none"}>No Target Market Selected</option>
                                                        {this.state.activeProtegeData.targetMarkets.map(target => (
                                                            <option value={target}>{target}</option>
                                                        ))}
                                                    </select> <button className="btn-outline-dark btn-sm btn" onClick={this.gatherTargetData}>Get Data</button>
                                                </div>
                                                : null}
                                        </form>



                                        {this.state.showDialChart ?
                                            <DataViewerDialChart
                                                activeProtegeData={this.state.activeProtegeData}
                                                dialData={this.state.dialData}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}

                                        {this.state.showContactChart ?
                                            <div>
                                                <DataViewerContactChart
                                                    activeProtegeData={this.state.activeProtegeData}
                                                    contactData={this.state.contactData}
                                                    BCAppts={this.state.BCAppts}
                                                    BCContacts={this.state.BCContacts}
                                                    BCDials={this.state.BCDials}
                                                    BNAppts={this.state.BNAppts}
                                                    BNContacts={this.state.BNContacts}
                                                    BNDials={this.state.BNDials}
                                                    BPAppts={this.state.BPAppts}
                                                    BPContacts={this.state.BPContacts}
                                                    BPDials={this.state.BPDials}
                                                    BRAppts={this.state.BRAppts}
                                                    BRContacts={this.state.BRContacts}
                                                    BRDials={this.state.BRDials}
                                                    BSAppts={this.state.BSAppts}
                                                    BSContacts={this.state.BSContacts}
                                                    BSDials={this.state.BSDials}
                                                    BTAppts={this.state.BTAppts}
                                                    BTContacts={this.state.BTContacts}
                                                    BTDials={this.state.BTDials}
                                                    CCAppts={this.state.CCAppts}
                                                    CCContacts={this.state.CCContacts}
                                                    CCDials={this.state.CCDials}
                                                    CNAppts={this.state.CNAppts}
                                                    CNContacts={this.state.CNContacts}
                                                    CNDials={this.state.CNDials}
                                                    CPAppts={this.state.CPAppts}
                                                    CPContacts={this.state.CPContacts}
                                                    CPDials={this.state.CPDials}
                                                    CRAppts={this.state.CRAppts}
                                                    CRContacts={this.state.CRContacts}
                                                    CRDials={this.state.CRDials}
                                                    CSAppts={this.state.CSAppts}
                                                    CSContacts={this.state.CSContacts}
                                                    CSDials={this.state.CSDials}
                                                    CTAppts={this.state.CTAppts}
                                                    CTContacts={this.state.CTContacts}
                                                    CTDials={this.state.CTDials}
                                                />
                                            </div>

                                            : null}


                                        {this.state.showApptChart ?

                                            <DataViewerAppointmentChart
                                                activeProtegeData={this.state.activeProtegeData}
                                                appointments={this.state.appointments}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}

                                        <hr />

                                        {/* //////////////////////////////////////////////////
                /////////////////////////////////////////////////
                ///////////////////////////////////////////////////// */}

                                        {this.state.showCashflowDials ?
                                            <DataViewerCFDialChart
                                                activeProtegeData={this.state.activeProtegeData}
                                                dialData={this.state.dialData}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}

                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


                                        {this.state.showCashflowContacts ?
                                            <DataViewerCFContactChart
                                                activeProtegeData={this.state.activeProtegeData}
                                                contactData={this.state.contactData}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}


                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        <br />
                                        {this.state.showCashflowAppts ?
                                            <DataViewerCFAppointmentChart
                                                activeProtegeData={this.state.activeProtegeData}
                                                appointments={this.state.appointments}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}


                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showBusinessDials ?
                                            <DataViewerBODialChart
                                                activeProtegeData={this.state.activeProtegeData}
                                                dialData={this.state.dialData}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}


                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showBusinessContacts ?
                                            <DataViewerBOContactChart
                                                activeProtegeData={this.state.activeProtegeData}
                                                contactData={this.state.contactData}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}



                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showBusinessAppts ?
                                            <DataViewerBOAppointmentChart
                                                activeProtegeData={this.state.activeProtegeData}
                                                appointments={this.state.appointments}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}



                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showProspectPerformance ?
                                            <DataViewerProspectPerformance
                                                category={"Prospect"}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}

                                            />

                                            : null}

                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showClientPerformance ?
                                            <DataViewerClientPerformance
                                                category={"Client"}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}

                                            />

                                            : null}


                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showNaturalPerformance ?
                                            <DataViewerNaturalPerformance
                                                category={"Natural"}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}

                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showSuspectPerformance ?
                                            <DataViewerSuspectPerformance
                                                category={"Suspect"}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}

                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showReferralPerformance ?
                                            <DataViewerReferralPerformance
                                                category={"Referral"}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />


                                            : null}

                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showTargetPerformance ?
                                            <DataViewerTargetPerformance
                                                category={"Target"}
                                                BCAppts={this.state.BCAppts}
                                                BCContacts={this.state.BCContacts}
                                                BCDials={this.state.BCDials}
                                                BNAppts={this.state.BNAppts}
                                                BNContacts={this.state.BNContacts}
                                                BNDials={this.state.BNDials}
                                                BPAppts={this.state.BPAppts}
                                                BPContacts={this.state.BPContacts}
                                                BPDials={this.state.BPDials}
                                                BRAppts={this.state.BRAppts}
                                                BRContacts={this.state.BRContacts}
                                                BRDials={this.state.BRDials}
                                                BSAppts={this.state.BSAppts}
                                                BSContacts={this.state.BSContacts}
                                                BSDials={this.state.BSDials}
                                                BTAppts={this.state.BTAppts}
                                                BTContacts={this.state.BTContacts}
                                                BTDials={this.state.BTDials}
                                                CCAppts={this.state.CCAppts}
                                                CCContacts={this.state.CCContacts}
                                                CCDials={this.state.CCDials}
                                                CNAppts={this.state.CNAppts}
                                                CNContacts={this.state.CNContacts}
                                                CNDials={this.state.CNDials}
                                                CPAppts={this.state.CPAppts}
                                                CPContacts={this.state.CPContacts}
                                                CPDials={this.state.CPDials}
                                                CRAppts={this.state.CRAppts}
                                                CRContacts={this.state.CRContacts}
                                                CRDials={this.state.CRDials}
                                                CSAppts={this.state.CSAppts}
                                                CSContacts={this.state.CSContacts}
                                                CSDials={this.state.CSDials}
                                                CTAppts={this.state.CTAppts}
                                                CTContacts={this.state.CTContacts}
                                                CTDials={this.state.CTDials}
                                            />

                                            : null}


                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showSourcePerformance ?
                                            <div style={{ textAlign: 'center' }}>

                                                <div style={{ color: 'black' }}>
                                                    <h3><u>{this.state.leadSource} Types of Calls</u></h3>


                                                    <div className="card"
                                                        style={{
                                                            width: '80%',
                                                            marginLeft: '10%',
                                                            backgroundColor: 'rgba(0,0,0,0.1)',
                                                            padding: '5%'
                                                        }}>



                                                        <p style={{ textAlign: 'center' }}>All Time Dials: {this.state.sourceDialData.length}</p>

                                                        {/* <div className="card" style={{ backgroundColor: 'rgba(255,255,255,0.8)', padding: '5%' }}> */}
                                                        <Pie data={{
                                                            labels: [
                                                                "Standard/Cashflow",
                                                                "Tier-1/Businessowner"],
                                                            datasets: [{
                                                                data: [
                                                                    this.state.SCPDials +
                                                                    this.state.SCCDials +
                                                                    this.state.SCNDials +
                                                                    this.state.SCSDials +
                                                                    this.state.SCRDials +
                                                                    this.state.SCTDials,


                                                                    this.state.SBRDials +
                                                                    this.state.SBSDials +
                                                                    this.state.SBNDials +
                                                                    this.state.SBCDials +
                                                                    this.state.SBPDials +
                                                                    this.state.SBTDials
                                                                ],
                                                                backgroundColor: [
                                                                    "#3ac178",
                                                                    "#443959"
                                                                ]
                                                            }]
                                                        }}
                                                            options={{
                                                                legend: {
                                                                    position: 'left',
                                                                    labels: {
                                                                        boxWidth: 10
                                                                    }
                                                                }
                                                            }}
                                                        /> </div>
                                                    {/* </div> */}
                                                </div>
                                                <br />
                                                {/* /////////////////////////////////////////
                                            ////////////////////////////////////////////
                                            /////// SOURCE PIE CHARTS BELOW ////////////
                                            ///////////////////////////////////////////
                                            /////////////////////////////////////////// */}
                                                <br />

                                                <div className="card" style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '5%' }}>
                                                    <h3>{this.state.leadSource} Lead Performance:</h3>
                                                    <div className="row" style={{ textAlign: 'center' }}>

                                                        <div className="col-lg-4">
                                                            <hr />
                                                            <h5>Contacts/Dial Ratio</h5>
                                                            <h6>Total Dials: {this.state.SourceDials}</h6>

                                                            <Pie data={{
                                                                labels: [
                                                                    `Missed Calls`,
                                                                    `Contacts`,
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        this.state.SourceDials - this.state.SourceContacts,
                                                                        this.state.SourceContacts
                                                                    ],
                                                                    backgroundColor: [
                                                                        "#51aef7",
                                                                        "#25517b"
                                                                    ]
                                                                }]
                                                            }}
                                                                options={{
                                                                    legend: {
                                                                        display: false
                                                                    }
                                                                }}

                                                            />
                                                            <br />
                                                            <h6>Made Contact on:</h6>
                                                            <h6>{Math.round((this.state.SourceContacts / this.state.SourceDials) * 100)}% of dials</h6>
                                                        </div>

                                                        <div className="col-lg-4">
                                                            <hr />
                                                            <h5>Appointment / Contact Ratio</h5>
                                                            <h6>Total Contacts: {this.state.SourceContacts}</h6>
                                                            <Pie data={{
                                                                labels: [
                                                                    `Contacts without Scheduling`,
                                                                    `Appointments`,
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        this.state.SourceContacts - this.state.SourceAppts,
                                                                        this.state.SourceAppts
                                                                    ],
                                                                    backgroundColor: [
                                                                        "#51aef7",
                                                                        "#25517b"
                                                                    ]
                                                                }]
                                                            }}
                                                                options={{
                                                                    legend: {
                                                                        display: false
                                                                    }
                                                                }}
                                                            />
                                                            <h6>Scheduled Appointments on:</h6>
                                                            <h6> {Math.round((this.state.SourceAppts / this.state.SourceContacts) * 100)}% of Contacts</h6>
                                                        </div>

                                                        <div className="col-lg-4">
                                                            <hr />
                                                            <h5>Appointment / Dial Ratio</h5>
                                                            <h6>Total Appointments: {this.state.SourceAppts}</h6>
                                                            {/* <h6>Appointment Ratio: {Math.round((this.state.SourceAppts / this.state.SourceDials) * 100)}%</h6> */}
                                                            <Pie data={{
                                                                labels: [
                                                                    `Calls without Scheduling`,
                                                                    `Scheduled`,
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        this.state.SourceDials - this.state.SourceAppts,
                                                                        this.state.SourceAppts
                                                                    ],
                                                                    backgroundColor: [
                                                                        "#51aef7",
                                                                        "#25517b"
                                                                    ]
                                                                }]
                                                            }}
                                                                options={{
                                                                    legend: {
                                                                        display: false
                                                                    }
                                                                }}
                                                            />
                                                            <h6>Scheduled Appointments on:</h6>
                                                            <h6>{Math.round((this.state.SourceAppts / this.state.SourceDials) * 100)}% of Dials</h6>
                                                        </div>


                                                    </div>
                                                </div>

                                            </div>
                                            : null}



                                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                        {this.state.showSelectedTargetPerformance ?
                                            <div style={{ textAlign: 'center' }}>

                                                <div className="card" style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '5%' }}>
                                                    <div style={{ color: 'black' }}>
                                                        <h3><u>{this.state.targetMarket} Market</u></h3>
                                                        <p style={{ textAlign: 'center' }}>Total Dials: {this.state.targetDialData.length}</p>

                                                        <Pie data={{
                                                            labels: [
                                                                "Standard/Cashflow",
                                                                "Tier-1/Businessowner"],
                                                            datasets: [{
                                                                data: [
                                                                    this.state.TCPDials +
                                                                    this.state.TCCDials +
                                                                    this.state.TCNDials +
                                                                    this.state.TCSDials +
                                                                    this.state.TCRDials +
                                                                    this.state.TCTDials,


                                                                    this.state.TBRDials +
                                                                    this.state.TBSDials +
                                                                    this.state.TBNDials +
                                                                    this.state.TBCDials +
                                                                    this.state.TBPDials +
                                                                    this.state.TBTDials
                                                                ],
                                                                backgroundColor: [
                                                                    "#3ac178",
                                                                    "#443959"
                                                                ]
                                                            }]
                                                        }}
                                                            options={{
                                                                legend: {
                                                                    position: 'left',
                                                                    labels: {
                                                                        boxWidth: 10
                                                                    }
                                                                }
                                                            }}
                                                        /> </div>
                                                </div>
                                                <br />

                                                {/* /////////////////////////////////////////
                                            ////////////////////////////////////////////
                                            /////// SOURCE PIE CHARTS BELOW ////////////
                                            ///////////////////////////////////////////
                                            /////////////////////////////////////////// */}
                                                <div className="card" style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '5%' }}>
                                                    <h4>{this.state.targetMarket} Calls Performance:</h4>
                                                    <div className="row" style={{ textAlign: 'center' }}>

                                                        <div className="col-lg-4">
                                                            <hr />
                                                            <h5>Contact / Dial Ratio</h5>
                                                            <h6>Total Dials: {this.state.TargetDials}</h6>

                                                            <Pie data={{
                                                                labels: [
                                                                    `${this.state.targetMarket} Missed Calls`,
                                                                    `${this.state.targetMarket} Contacts`,
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        this.state.TargetDials - this.state.TargetContacts,
                                                                        this.state.TargetContacts
                                                                    ],
                                                                    backgroundColor: [
                                                                        "#51aef7",
                                                                        "#25517b"
                                                                    ]
                                                                }]
                                                            }}
                                                                options={{
                                                                    legend: {
                                                                        display: false
                                                                    }
                                                                }}
                                                            />
                                                            <h6>Made Contact on:</h6>
                                                            <h6>{Math.round((this.state.TargetContacts / this.state.TargetDials) * 100)}% of Dials</h6>
                                                        </div>

                                                        <div className="col-lg-4">
                                                            <hr />
                                                            <h5>Appointment / Contact Ratio</h5>
                                                            <h6>Total Contacts: {this.state.TargetContacts}</h6>

                                                            <Pie data={{
                                                                labels: [
                                                                    `${this.state.targetMarket} calls without Scheduling`,
                                                                    `${this.state.targetMarket} calls Scheduled`,
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        this.state.TargetContacts - this.state.TargetAppts,
                                                                        this.state.TargetAppts
                                                                    ],
                                                                    backgroundColor: [
                                                                        "#51aef7",
                                                                        "#25517b"
                                                                    ]
                                                                }]
                                                            }}
                                                                options={{
                                                                    legend: {
                                                                        display: false
                                                                    }
                                                                }}
                                                            />
                                                            <h6>Scheduled Appointments on:</h6>
                                                            <h6>{Math.round((this.state.TargetAppts / this.state.TargetContacts) * 100)}% of Contacts</h6>
                                                        </div>

                                                        <div className="col-lg-4">
                                                            <hr />
                                                            <h5>Appointment / Dials Ratio</h5>
                                                            <h6>Total Appointments {this.state.TargetAppts}</h6>

                                                            <Pie data={{
                                                                labels: [
                                                                    `${this.state.targetMarket} calls without Scheduling`,
                                                                    `${this.state.targetMarket} calls Scheduled`,
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        this.state.TargetDials - this.state.TargetAppts,
                                                                        this.state.TargetAppts
                                                                    ],
                                                                    backgroundColor: [
                                                                        "#51aef7",
                                                                        "#25517b"
                                                                    ]
                                                                }]
                                                            }}
                                                                options={{
                                                                    legend: {
                                                                        display: false
                                                                    }
                                                                }}
                                                            />
                                                            <h6>Scheduled Appointments on:</h6>
                                                            <h6>{Math.round((this.state.TargetAppts / this.state.TargetDials) * 100)}% of Dials</h6>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            : null}




                                    </div>
                                    : null}

                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                <button className="btn btn-outline-dark" onClick={this.viewProtegeSchedule}>View Schedule</button>
                                {this.state.viewProtegeSchedule ?
                                    <div>
                                        <div className="col-lg-3"></div>
                                        <div className="col-lg-6">
                                            <div className="card bg-light" style={{ color: 'darkslategrey' }}>
                                                <h4 style={{ textAlign: 'center', color: '' }}>Protege Schedule:</h4>
                                                <MainCalendar
                                                    appointments={this.state.appointments}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3"></div>
                                    </div>
                                    : null}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                <button className="btn btn-outline-dark" onClick={this.viewProtegeAppointments}>View Appointments</button>
                                {this.state.viewProtegeAppointments ?
                                    <div className="card bg-light" style={{ color: 'black' }}>
                                        {/* <h4 style={{ textAlign: 'center' }}>Protege Appointments:</h4> */}
                                        {/* <div className="col-12"> */}
                                        <div className="card bg-light" style={{ textAlign: "center", margin: 20, padding: 40, height: 1000, overflow: 'auto', backgroundColor: 'rgba(114,180,255,0.8)' }}>
                                            <h4 style={{ color: 'black' }}>View {this.state.activeProtegeData.firstName + " " + this.state.activeProtegeData.lastName}'s Appointments:</h4>
                                            {this.state.appointments ?
                                                <div className="card-body bg-info" style={{ color: 'darkslategrey', padding: '0px 25px 0px 25px' }}>
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
                                                                // username={this.state.user}
                                                                rerender={this.gatherAppointments}
                                                                user={this.state.activeProtegeData}
                                                                targetMarket={appt.targetMarket}
                                                                mentors={this.props.mentors}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                : null}
                                        </div>
                                        {/* </div> */}
                                    </div>
                                    : null}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                <button className="btn btn-outline-dark" onClick={this.viewProtegeSales}>View Sales</button>
                                {this.state.viewProtegeSales ?
                                    <div className="col-12">

                                        <div className="card bg-light"
                                            style={{
                                                textAlign: "center",
                                                margin: 20,
                                                padding: 40,
                                                height: 1000,
                                                overflow: 'auto'
                                            }}>
                                            <div className="card-header">
                                                <h4 style={{ color: '' }}>{this.state.activeProtegeData.firstName + " " + this.state.activeProtegeData.lastName}  Sales: </h4>
                                            </div>
                                            {this.state.sales ? <div className="card-body bg-info" style={{ padding: '0px 25px 0px 25px' }}>
                                                {this.state.sales.map(sale => (
                                                    <div style={{ marginBottom: '15px' }}>
                                                        <SalesItemMentor
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
                                                            // mentors={this.state.mentors}
                                                            userData={this.state.activeProtegeData}
                                                        />

                                                    </div>
                                                ))
                                                } </div>
                                                : null}
                                        </div>

                                    </div>
                                    : null}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                <button className="btn btn-outline-dark" onClick={this.viewProtegeNotes}>View Notes</button>
                                {this.state.viewProtegeNotes ?
                                    <div className="card bg-light" style={{ color: 'black' }}>
                                        <div className="card-header">
                                            <h4 style={{ textAlign: 'center' }}>Protege Notes:</h4>
                                        </div>



                                        <div className="card bg-light" style={{ padding: '50px', color: 'black', marginTop: '25px' }}>
                                            {/* <div className="card-header">
                                                <h1 style={{ textAlign: 'center' }}> Create Notes</h1>
                                            </div> */}
                                            <div className="card-body">
                                                <NoteCreator
                                                    userData={this.state.activeProtegeData}
                                                    userID={this.state.activeProtegeData._id}
                                                    proteges={this.props.proteges}
                                                    mentors={this.props.mentors}
                                                />
                                            </div>
                                        </div>

                                        <div className="card bg-light" style={{ padding: '50px', color: 'black', marginTop: '25px' }}>
                                            <div className="card-header">
                                                <h3 style={{ textAlign: 'center' }}>{this.state.activeProtegeData.firstName + " " + this.state.activeProtegeData.lastName} Tagged Notes</h3>
                                            </div>

                                            <div className="card-body">

                                                <NoteViewer
                                                    userData={this.state.activeProtegeData}
                                                    userID={this.state.activeProtegeData._id}
                                                    proteges={this.props.proteges}
                                                    mentors={this.props.mentors}
                                                    taggedNotes={this.state.notes}
                                                    postNotes={this.state.activeProtegeData.notes}
                                                    height={'600px'}
                                                />

                                            </div>
                                        </div>
                                    </div>


                                    : null}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}


                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                <button className="btn btn-outline-dark" onClick={this.viewProtegeProfile}>View Profile</button>
                                {this.state.viewProtegeProfile ?
                                    <div className="card bg-light" style={{ color: 'black' }}>
                                        <div className="card-header">
                                            <h4 style={{ textAlign: 'center' }}>{this.state.activeProtegeData.firstName + " " + this.state.activeProtegeData.lastName} Profile:</h4>
                                        </div>
                                        <br />
                                        <div className="card-body">
                                            <form>
                                                <label>First Name</label>
                                                {/* <p>{this.state.activeProtegeData.firstName}</p> */}
                                                <input type="text" value={this.state.updatedProtegeFirstName} onChange={this.handleInputChange} name="updatedProtegeFirstName" />
                                                <br />
                                                <label>Last Name</label>
                                                {/* <p>{this.state.activeProtegeData.lastName}</p> */}
                                                <input type="text" value={this.state.updatedProtegeLastName} onChange={this.handleInputChange} name="updatedProtegeLastName" />
                                                <br />
                                                <label>Alma Mater</label>
                                                <input type="text" value={this.state.updatedProtegeAlmaMater} onChange={this.handleInputChange} name="updatedProtegeAlmaMater" />
                                                <br />
                                                <label>Home Town</label>
                                                <input type="text" value={this.state.updatedProtegeHomeTown} onChange={this.handleInputChange} name="updatedProtegeHomeTown" />
                                                <br />
                                                <label>Profile Image</label>
                                                <input type="text" value={this.state.updatedProtegeProfilePicture} onChange={this.handleInputChange}
                                                    name="updatedProtegeProfilePicture" />
                                                <br />
                                                {/* <label>Starting Quarter</label>
                                                <input type="text" value={this.state.updatedProtegeStartQuarter}
                                                name="updatedProtegeStartQuarter" />
                                                <br /> */}
                                            </form>
                                            <button className="btn btn-outline-dark" onClick={this.submitProtegeUpdate}>Update Protege</button>
                                        </div>
                                    </div>
                                    : null}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                <button className="btn btn-outline-dark" onClick={this.viewProtegeWeeklyReport}>View Weekly Report</button>
                                {this.state.viewProtegeWeeklyReport ?
                                    <div className="col-12 card bg-primary" style={{ color: 'whitesmoke' }}>
                                        <h4 style={{ textAlign: 'center' }}>Protege Weekly Report:</h4>
                                    </div>
                                    : null}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                <button className="btn btn-outline-dark" onClick={this.viewProtegeMonthlyReport}>View Monthly Report</button>
                                {this.state.viewProtegeMonthlyReport ?
                                    <div className="col-12 card bg-primary" style={{ color: 'whitesmoke' }}>
                                        <h4 style={{ textAlign: 'center' }}>Protege Monthly Report:</h4>
                                    </div>
                                    : null}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                <button className="btn btn-outline-dark" onClick={this.viewProtegeBenchmarkReport}>View Benchmark Report</button>
                                {this.state.viewProtegeBenchmarkReport ?
                                    <div className="col-12 card bg-primary" style={{ color: 'whitesmoke' }}>
                                        <h4 style={{ textAlign: 'center' }}>Protege Benchmark Report:</h4>
                                    </div>
                                    : null}
                            </div>
                            : null}
                        <br />




                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* /////////////////////////////// MENTOR DATA VIEWER TOOLS AND OPTS/////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                        {this.state.showMentorAnalyticsViewer ?
                            <div className="card bg-light" style={{ color: 'black' }}>
                                <div className="card-header">
                                    <h4 style={{ textAlign: 'center' }}>Select a Mentor</h4>
                                </div>
                                <div className="card-body">
                                    {this.props.allMentorData ?
                                        <div style={{ textAlign: 'center' }}>
                                            <select id="mentorsDropDownMenu" value={this.state.mentorToView} onChange={this.handleInputChange} name="mentorToView">
                                                <option value="none">--Select a Mentor--</option>
                                                {this.props.allMentorData.map(mentor => (<option key={mentor._id} value={mentor._id}>{mentor.firstName} {mentor.lastName}</option>))}
                                            </select>
                                            <br />
                                            {/* <button>Placeholder</button> */}
                                            <button onClick={this.viewMentorData} className="btn btn-outline-dark btn-sm">View/Change</button>
                                            {/* <button onClick={this.removeMentorFromProtege} className="btn btn-outline-danger btn-sm">Remove Mentor</button> */}
                                        </div>
                                        : null}
                                </div>
                            </div>
                            : null}
                        <br />

                        {this.state.activeMentorDataPopulated ?

                            <div className="col-12 card bg-light" style={{ color: 'black' }} >
                                <div className="card-header">
                                    <h4 style={{ textAlign: 'center' }}>Choose Your Option:</h4>
                                </div>
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                <button className="btn btn-outline-dark" onClick={this.viewMentorsProtegeStatistics}>View Protege Statistics</button>

                                {this.state.viewMentorsProtegeStatistics ?
                                    <div className="col-12 card bg-light" style={{ color: 'black' }}>
                                        <div className="card-header">
                                            <h4 style={{ textAlign: 'center' }}>Protege Statistics:</h4>
                                        </div>
                                        {this.state.activeMentorDataPopulated ?
                                            <div style={{ textAlign: 'center' }}>
                                                <select id="mentorsDropDownMenu" value={this.state.mentorsProtegeToView} onChange={this.handleInputChange} name="mentorsProtegeToView">
                                                    <option value="none">--Select a Protege--</option>
                                                    {this.state.activeMentorData.proteges.map(protege => (<option key={protege._id} value={protege._id}>{protege.firstName} {protege.lastName}</option>))}
                                                </select>
                                                <br />
                                                {/* <button>Placeholder</button> */}
                                                <button onClick={this.viewMentorsProtegeData} className="btn btn-outline-dark btn-sm">View Data</button>
                                                {/* <button onClick={this.removeMentorFromProtege} className="btn btn-outline-danger btn-sm">Remove Mentor</button> */}
                                            </div>
                                            : null}

                                        {this.state.activeMentorsProtegeDataPopulated ?
                                            <>
                                                <ul>
                                                    <li>Dials: {this.state.activeMentorsProtegeData.dials.length} </li>
                                                    <li>Contacts: {this.state.contactData.length}
                                                        {/* {this.state.CPContacts + this.state.BPContacts + this.state.CCContacts + this.state.BCContacts + this.state.CNContacts + this.state.BNContacts + this.state.CSContacts + this.state.BSContacts + this.state.CRContacts + this.state.BRContacts + this.state.CTContacts + this.state.BTContacts } */}


                                                    </li>
                                                    <li>Appointments:{this.state.activeMentorsProtegeData.appointments.length}</li>
                                                    <li>Sales:</li>
                                                    {/* <li>Sources: {this.state.activeProtegeData.sources.length}</li> */}
                                                    {/* <li>Target Markets{this.state.activeProtegeData.targetMarkets.length}</li> */}
                                                </ul>
                                                <ul>
                                                    <li>Contact to Call Ratio: {Math.trunc((this.state.contactData.length / this.state.activeMentorsProtegeData.dials.length) * 100)}%</li>
                                                    <li>Appointment to Contact Ratio: {Math.trunc((this.state.activeMentorsProtegeData.appointments.length / this.state.contactData.length) * 100)}%</li>
                                                    <li>Appointments to Dial Ratio: {Math.trunc((this.state.activeMentorsProtegeData.appointments.length / this.state.activeMentorsProtegeData.dials.length) * 100)}%</li>
                                                    <li>Sales to Appointment Ratio: </li>
                                                </ul>
                                                <ul>
                                                    <li>Types of Leads (Pie Chart):
                                                    <DataViewerDialChart
                                                            activeProtegeData={this.state.activeMentorsProtegeData}
                                                            dialData={this.state.dialData}
                                                            BCAppts={this.state.BCAppts}
                                                            BCContacts={this.state.BCContacts}
                                                            BCDials={this.state.BCDials}
                                                            BNAppts={this.state.BNAppts}
                                                            BNContacts={this.state.BNContacts}
                                                            BNDials={this.state.BNDials}
                                                            BPAppts={this.state.BPAppts}
                                                            BPContacts={this.state.BPContacts}
                                                            BPDials={this.state.BPDials}
                                                            BRAppts={this.state.BRAppts}
                                                            BRContacts={this.state.BRContacts}
                                                            BRDials={this.state.BRDials}
                                                            BSAppts={this.state.BSAppts}
                                                            BSContacts={this.state.BSContacts}
                                                            BSDials={this.state.BSDials}
                                                            BTAppts={this.state.BTAppts}
                                                            BTContacts={this.state.BTContacts}
                                                            BTDials={this.state.BTDials}
                                                            CCAppts={this.state.CCAppts}
                                                            CCContacts={this.state.CCContacts}
                                                            CCDials={this.state.CCDials}
                                                            CNAppts={this.state.CNAppts}
                                                            CNContacts={this.state.CNContacts}
                                                            CNDials={this.state.CNDials}
                                                            CPAppts={this.state.CPAppts}
                                                            CPContacts={this.state.CPContacts}
                                                            CPDials={this.state.CPDials}
                                                            CRAppts={this.state.CRAppts}
                                                            CRContacts={this.state.CRContacts}
                                                            CRDials={this.state.CRDials}
                                                            CSAppts={this.state.CSAppts}
                                                            CSContacts={this.state.CSContacts}
                                                            CSDials={this.state.CSDials}
                                                            CTAppts={this.state.CTAppts}
                                                            CTContacts={this.state.CTContacts}
                                                            CTDials={this.state.CTDials}
                                                        />


                                                    </li>

                                                    <li>Types of Appointments (Pie Chart):
                                                    <DataViewerAppointmentChart
                                                            activeProtegeData={this.state.activeMentorsProtegeData}
                                                            appointments={this.state.appointments}
                                                            BCAppts={this.state.BCAppts}
                                                            BCContacts={this.state.BCContacts}
                                                            BCDials={this.state.BCDials}
                                                            BNAppts={this.state.BNAppts}
                                                            BNContacts={this.state.BNContacts}
                                                            BNDials={this.state.BNDials}
                                                            BPAppts={this.state.BPAppts}
                                                            BPContacts={this.state.BPContacts}
                                                            BPDials={this.state.BPDials}
                                                            BRAppts={this.state.BRAppts}
                                                            BRContacts={this.state.BRContacts}
                                                            BRDials={this.state.BRDials}
                                                            BSAppts={this.state.BSAppts}
                                                            BSContacts={this.state.BSContacts}
                                                            BSDials={this.state.BSDials}
                                                            BTAppts={this.state.BTAppts}
                                                            BTContacts={this.state.BTContacts}
                                                            BTDials={this.state.BTDials}
                                                            CCAppts={this.state.CCAppts}
                                                            CCContacts={this.state.CCContacts}
                                                            CCDials={this.state.CCDials}
                                                            CNAppts={this.state.CNAppts}
                                                            CNContacts={this.state.CNContacts}
                                                            CNDials={this.state.CNDials}
                                                            CPAppts={this.state.CPAppts}
                                                            CPContacts={this.state.CPContacts}
                                                            CPDials={this.state.CPDials}
                                                            CRAppts={this.state.CRAppts}
                                                            CRContacts={this.state.CRContacts}
                                                            CRDials={this.state.CRDials}
                                                            CSAppts={this.state.CSAppts}
                                                            CSContacts={this.state.CSContacts}
                                                            CSDials={this.state.CSDials}
                                                            CTAppts={this.state.CTAppts}
                                                            CTContacts={this.state.CTContacts}
                                                            CTDials={this.state.CTDials}
                                                        />
                                                    </li>
                                                </ul>


                                            </>
                                            : <p style={{ textAlign: 'center' }}>Select a Protege to view Data!</p>}
                                    </div>
                                    : null}



                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                <button className="btn btn-outline-dark" onClick={this.viewMentorSchedule}>View Mentor Schedule</button>
                                {this.state.viewMentorSchedule ?

                                    <div className="card bg-light" style={{ color: 'black' }}>
                                        <div className="card-header">
                                            <h4 style={{ textAlign: 'center' }}>Mentor Schedule:</h4>
                                        </div>
                                        <div className="card-body">

                                            <MainCalendar
                                                appointments={this.state.mentorAppts}
                                            />

                                        </div>
                                    </div>

                                    : null}

                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                <button className="btn btn-outline-dark" onClick={this.viewMentorAppointments}>View Mentor Appointments</button>
                                {this.state.viewMentorAppointments ?

                                    <div className="card bg-light"
                                        style={{
                                            textAlign: 'center',
                                            margin: 20,
                                            padding: 40,
                                            height: 1000,
                                            overflow: 'auto',
                                            // backgroundColor: ''
                                        }}>

                                        <div className="card-header">
                                            <h4 style={{ textAlign: 'center' }}>{this.state.activeMentorData.firstName + " " + this.state.activeMentorData.lastName} Appointments:</h4>
                                        </div>

                                        {this.state.mentorAppts ?
                                            <div className="card-body bg-info"
                                                style={{
                                                    color: 'black',
                                                    padding: '0px 25px 0px 25px'
                                                }}>
                                                {
                                                    this.state.mentorAppts.map(appt => (
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
                                                            // username={this.state.user}
                                                            rerender={this.getMentorAppointmentData}
                                                            user={this.state.activeMentorData}
                                                            targetMarket={appt.targetMarket}
                                                            mentors={this.props.mentors}
                                                        />
                                                    ))

                                                }
                                            </div>
                                            : null}

                                    </div>

                                    : null}

                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                <button className="btn btn-outline-dark" onClick={this.viewMentorSales}>View Mentor Sales</button>
                                {this.state.viewMentorSales ?

                                    <div className="col-12">
                                        <div className="card bg-light"
                                            style={{
                                                textAlign: 'center',
                                                margin: 20,
                                                padding: 40,
                                                height: 1000,
                                                overflow: 'auto'
                                            }}>

                                            <div className="card-header">

                                                <h4 style={{ textAlign: 'center' }}>{this.state.activeMentorData.firstName + " " + this.state.activeMentorData.lastName} Sales:</h4>
                                            </div>

                                            {this.state.mentorSales ?
                                                <div className="card-body bg-info"
                                                    style={{
                                                        padding: '0px 25px 0px 25px'
                                                    }}>
                                                    <div style={{ marginBottom: '15px' }}>

                                                        {this.state.mentorSales.map(sale => (
                                                            <div style={{ marginBottom: '15px' }}>
                                                                <SalesItemMentor
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
                                                                    // mentors={this.state.mentors}
                                                                    userData={this.state.activeMentorData}
                                                                />

                                                            </div>
                                                        ))
                                                        }

                                                    </div>
                                                </div>
                                                : <p>No Sales for this Mentor yet!</p>}


                                        </div>
                                    </div>

                                    : null}

                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                <button className="btn btn-outline-dark" onClick={this.viewMentorWeeklyReport}>View Mentor Weekly Report</button>
                                {this.state.viewMentorWeeklyReport ?

                                    <div className="col-12 card bg-light" style={{ color: 'black' }}>
                                        <h4 style={{ textAlign: 'center' }}>Mentor Weekly Report:</h4>
                                    </div>

                                    : null}

                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                <button className="btn btn-outline-dark" onClick={this.viewMentorMonthlyReport}>View Mentor Monthly Report</button>
                                {this.state.viewMentorMonthlyReport ?

                                    <div className="col-12 card bg-light" style={{ color: 'black' }}>
                                        <h4 style={{ textAlign: 'center' }}>Mentor Monthly Report:</h4>
                                    </div>

                                    : null}

                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                                <button className="btn btn-outline-dark" onClick={this.viewMentorBenchmarkReport}>View Mentor Benchmark Report</button>
                                {this.state.viewMentorBenchmarkReport ?

                                    <div className="col-12 card bg-light" style={{ color: 'black' }}>
                                        <h4 style={{ textAlign: 'center' }}>Mentor Benchmark Report:</h4>
                                    </div>

                                    : null}




                            </div>
                            : null}



                    </div>
                </div>

            </div >
        )
    }

}

export default ManagerDataViewer