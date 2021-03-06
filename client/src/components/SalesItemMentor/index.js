import React, { Component } from "react";
import API from "../../utils/API";
import cogoToast from "cogo-toast";
import Modal from "react-modal"



class SalesItemMentor extends Component {

    state = {
        editModalIsOpen: false,
        saleType: "",
        saleName: "",
        saleSource: "",
        saleNotes: "",
        saleDate: "",
        saleTargetMkt: "",
        saleTagged: "",
        saleCommission: 0,
        salePercentage: 0,
        saleTaggedPercentage: 0,
        saleProduct: ""
    }

    componentDidMount() {
        // console.log("Loaded Appt Item")
        // console.log(this.props)
        this.setState({
            saleType: this.props.saleType,
            saleName: this.props.saleName,
            saleSource: this.props.saleSource,
            saleNotes: this.props.saleNotes,
            saleDate: this.props.saleDate,
            saleTargetMkt: this.props.saleTargetMkt,
            saleCommission: this.props.saleCommission,
            salePercentage: this.props.salePercentage,
            saleTaggedPercentage: this.props.saleTaggedPercentage,
            saleProduct: this.props.saleProduct,
            saleWriter: this.props.protege,
            saleTagged: this.props.saleTagged
        })

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

    handleSaleUpdate = event => {
        event.preventDefault()

        var salesData = {
            clientType: this.state.saleType,
            saleName: this.state.saleName,
            leadSource: this.state.saleSource,
            saleNotes: this.state.saleNotes,
            saleDate: this.state.saleDate,
            targetMarket: this.state.saleTargetMkt,
            commission: this.state.saleCommission,
            percentageMentor: this.state.salePercentage,
            percentageProtege: this.state.saleTaggedPercentage,
            product: this.state.saleProduct,
            protege: this.props.saleTagged,
            mentor: this.state.saleWriter
        }

        console.log(salesData)

        this.setState({
            editModalIsOpen: false
        })

        API.updateSale(this.props.id, {
            clientType: this.state.saleType,
            saleName: this.state.saleName,
            leadSource: this.state.saleSource,
            saleNotes: this.state.saleNotes,
            saleDate: this.state.saleDate,
            targetMarket: this.state.saleTargetMkt,
            commission: this.state.saleCommission,
            percentageMentor: this.state.salePercentage,
            percentageProtege: this.state.saleTaggedPercentage,
            product: this.state.saleProduct,
            protege: this.props.saleTagged,
            mentor: this.state.saleWriter
        }).then(res =>
            cogoToast.info("Updated Sale!")
        ).catch(err => console.log(err))

    }

    prepEditModal = () => {
        this.setState({
            editModalIsOpen: true
        })
    }

    deleteSale = () => {
        API.deleteSale(this.props.id)
            .then(res => cogoToast.error("You deleted this sale"))
            .catch(err => console.log(err))

        setTimeout(() => {
            cogoToast.loading("Updating Appointments")
            // this.props.rerender()
        }, 500)
    }

    render() {
        return (
            <div>
                <div className="card bg-light">
                    {/* <div style={{ height: '', padding: '0 10% 0 10%', textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.75)', overflow: 'auto', borderRadius: '5px' }}> */}

                    <div className="card-header">
                        <h4 style={{ textAlign: 'center' }}><u>{this.props.saleName}:</u></h4>
                    </div>
                    {/* <hr /> */}
                    {/* <hr /> */}

                    <div className="card-body" style={{ padding: '20px' }}>

                        <div></div>
                        {this.props.saleNotes ? <p style={{ color: '' }}>Notes: {this.props.saleNotes}</p> : null}
                        <p style={{ fontSize: '14px', float: 'right' }}>Type:
                        {this.props.saleType === "CPD" ? <span> Cashflow Prospect</span> : null}
                            {this.props.saleType === "BPD" ? <span> Businessowner Prospect</span> : null}
                            {this.props.saleType === "CCD" ? <span> Cashflow Delegated Client</span> : null}
                            {this.props.saleType === "BCD" ? <span> Businessowner Delegated Client</span> : null}
                            {this.props.saleType === "CND" ? <span> Cashflow Natural Market</span> : null}
                            {this.props.saleType === "BND" ? <span> Businessowner Natural Market</span> : null}
                            {this.props.saleType === "CSD" ? <span> Cashflow Vertical/Orphan</span> : null}
                            {this.props.saleType === "BSD" ? <span> Businessowner Vertical/Orphan</span> : null}
                            {this.props.saleType === "CRD" ? <span> Cashflow Referral</span> : null}
                            {this.props.saleType === "BRD" ? <span> Businessowner Referral"</span> : null}
                            {this.props.saleType === "CTD" ? <span> Cashflow Target Industry</span> : null}
                            {this.props.saleType === "BTD" ? <span> Businessowner Target Industry</span> : null}
                        </p>
                        <p style={{ fontSize: '14px', width: '%', float: 'left' }}>Source: {this.props.saleSource}</p>
                        <p style={{ fontSize: '14px', width: '%', float: 'left' }}>Commissions: ${this.props.saleCommission}</p>
                        <br />
                        <p style={{ fontSize: '14px', width: '%', float: 'left' }}>Protege Percentage: {this.props.salePercentage * 100}% Payout: ${this.props.salePercentage * this.props.saleCommission}</p>
                        <p style={{ fontSize: '14px', width: '%', float: 'left' }}>Mentor (You) Percentage: {this.props.saleTaggedPercentage * 100}% Payout: ${this.props.saleTaggedPercentage * this.props.saleCommission}</p>
                    </div>

                    <div style={{ clear: 'both', textAlign: 'center' }}>
                        <button value={this.props.id} onClick={this.prepEditModal} className="btn btn-info btn-sm" style={{ width: '33%' }}>Edit</button>
                        <button value={this.props.id} onClick={this.deleteSale} className="btn btn-danger btn-sm" style={{ width: '33%' }}>X</button>
                    </div>
                </div>


                <div className="form-group" id="appt-holder ">
                    <Modal isOpen={this.state.editModalIsOpen} onAfterOpen={this.afterOpenEditModal} onRequestClose={this.closeEditModal} style={this.customStyles} contentLabel="Your Request Viewer">
                        {/* <div className="card"> */}
                        <h3>Sale Logger</h3>
                        <form className="form-group">
                            <label>Type of Sale</label>
                            <select className="custom-select my-1 mr-sm-2" value={this.state.saleType} onChange={this.handleInputChange} name="saleType" type="text" placeholder="Choose Client type">
                                <option value="CPD">Cashflow Prospect</option>
                                <option value="BPD">Businessowner Prospect</option>
                                <option value="CCD">Cashflow Client</option>
                                <option value="BCD">Businessowner Client</option>
                                <option value="CND">Cashflow Natural Mkt</option>
                                <option value="BND">Business Natural Mkt</option>
                            </select>

                            <label>Sale Name:</label>
                            <input id="apptname-input" className="form-control" value={this.state.saleName} onChange={this.handleInputChange} name="saleName" type="text" placeholder="Give your appointment a name!" />

                            <label>Product Sold:</label>
                            <input id="product-sold" className="form-control" value={this.state.saleProduct} onChange={this.handleInputChange} name="saleProduct" type="text" placeholder="Type of product sold" />

                            <label>Date of Sale:</label>
                            <input id="date-input" className="form-control" value={this.state.saleDate} onChange={this.handleInputChange} name="saleDate" type="date" placeholder="Enter date for your appointment" />

                            <label>Protege Tagged</label>
                            {this.props.proteges ? <select id="mentorDropMenu" value={this.props.saleTagged} onChange={this.handleInputChange} name="saleTagged">
                                <option value={"none"}>--Tag Protege--</option>
                                {this.props.proteges.map(protege => (
                                    <option key={protege._id} value={protege._id}>{protege.firstName} {protege.lastName}</option>
                                ))}
                            </select> : null}

                            <label>Sales Commission [only enter numbers]</label>
                            <input id="saleCommission" className="form-control" value={this.state.saleCommission} onChange={this.handleInputChange} name="saleCommission" />

                            <label>Protege Percentage [only enter numbers]</label>
                            <input id="salePercentage" className="form-control" value={this.state.salePercentage} onChange={this.handleInputChange} name="salePercentage" />

                            <label>Mentor Percentage [only enter numbers]</label>
                            <input id="taggedPercentage" className="form-control" value={this.state.saleTaggedPercentage} onChange={this.handleInputChange} name="saleTaggedPercentage" />



                            <label>Sales Notes:</label>
                            <input id="note-input" className="form-control" value={this.state.saleNotes} onChange={this.handleInputChange} name="saleNotes" type="text" placeholder="Enter any notes here" />
                            <br />
                            <button id="appt-input-btn" className="btn-success form-control" onClick={this.handleSaleUpdate}>Update Sale</button>

                        </form>
                        {/* </div> */}
                    </Modal>
                </div>

            </div >
        )
    }
}

export default SalesItemMentor