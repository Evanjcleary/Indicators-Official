import React, { Component } from "react";
import API from "../../utils/API";
import cogoToast from "cogo-toast";
// import './style.css'



class SalesCreator extends Component {

    state = {
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
        saleProduct: "",
        showSale: false
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

    handleSaleSubmit = event => {
        event.preventDefault()
        console.log("Submitting sale under user ID: " + this.props.userID)

        console.log(this.state)

        var SaleData = {
            clientType: this.state.saleType,
            saleName: this.state.saleName,
            saleNotes: this.state.saleNotes,
            saleDate: this.state.saleDate,
            protege: this.props.userData._id,
            mentor: this.state.saleTagged,
            product: this.state.saleProduct,
            commission: parseInt(this.state.saleCommission),
            percentageProtege: parseInt(this.state.salePercentage) / 100,
            percentageMentor: parseInt(this.state.saleTaggedPercentage) / 100,
            leadSource: this.state.saleSource,
            targetMarket: this.state.saleTargetMkt
        }

        console.log(SaleData)


        API.saveSale({
            clientType: this.state.saleType,
            saleName: this.state.saleName,
            saleNotes: this.state.saleNotes,
            saleDate: this.state.saleDate,
            protege: this.props.userData._id,
            mentor: this.state.saleTagged,
            product: this.state.saleProduct,
            commission: parseInt(this.state.saleCommission),
            percentageProtege: parseInt(this.state.salePercentage) / 100,
            percentageMentor: parseInt(this.state.saleTaggedPercentage) / 100,
            leadSource: this.state.saleSource,
            targetMarket: this.state.saleTargetMkt
        }).then(res =>
            cogoToast.info("Saved Sale!")
        ).catch(err => console.log(err))

        // setTimeout(() => {
        //     // cogoToast.loading("Re-loading appointments")
        //     this.props.rerender()
        // }, 1000)

    }




    showSaleForm = () => {
        if (this.state.showSale === false) {
            this.setState({
                showSale: true
            })
        } else {
            this.setState({
                showSale: false
            })
        }
    }

    render() {
        return (
            <div className="col-12" id="sale-creator" style={{ textAlign: 'left', padding: '0' }}>
                <div className="card bg-light">

                    <div className="card-header">
                        <h4 style={{ textAlign: 'center', padding: '10%', color: 'black', margin: '' }}>Create Sale
                <br /> <button className="btn btn-sm btn-outline-dark" onClick={this.showSaleForm}>Show</button></h4>
                    </div>



                    {this.state.showSale ?
                        <div className="card-body" style={{ padding: '10px', height: '400px', overflow: 'auto' }}>
                            <form>
                                <div style={{ color: 'black', padding: '20px', borderRadius: '30px' }}>

                                    <label>Type:</label>
                                    <select className="custom-select my-1 mr-sm-2" value={this.state.saleType} onChange={this.handleInputChange} name="saleType" type="text" placeholder="Choose Client type">
                                        <option value="CPD">Cashflow Prospect</option>
                                        <option value="BPD">Businessowner Prospect</option>
                                        <option value="CCD">Cashflow Client</option>
                                        <option value="BCD">Businessowner Client</option>
                                        <option value="CND">Cashflow Natural Mkt</option>
                                        <option value="BND">Business Natural Mkt</option>
                                    </select>
                                    <hr />

                                    <label>Sale Name:</label>
                                    <input id="apptname-input" className="form-control" value={this.state.saleName} onChange={this.handleInputChange} name="saleName" type="text" placeholder="Give your Sale a name!" />

                                    <hr />
                                    <label>Product Sold:</label>
                                    <input id="product-sold" className="form-control" value={this.state.saleProduct} onChange={this.handleInputChange} name="saleProduct" type="text" placeholder="Type of product sold" />
                                    <hr />
                                    <label>Date of Sale:</label>
                                    <input id="date-input" className="form-control" value={this.state.saleDate} onChange={this.handleInputChange} name="saleDate" type="date" placeholder="Enter date for your appointment" />
                                    <hr />
                                    <label>Mentor Tagged</label>
                                    {this.props.mentors ? <select id="mentorDropMenu" value={this.state.saleTagged} className="" onChange={this.handleInputChange} name="saleTagged">
                                        <option value={"none"}>--Tag Mentor--</option>
                                        {this.props.mentors.map(mentor => (
                                            <option key={mentor._id} value={mentor._id}>{mentor.firstName} {mentor.lastName}</option>
                                        ))}
                                    </select> : null}
                                    <hr />
                                    <label>Sales Commission [only enter numbers]</label>
                                    <input id="saleCommission" className="form-control" value={this.state.saleCommission} onChange={this.handleInputChange} name="saleCommission" />
                                    <hr />
                                    <label>Your Percentage [only enter numbers]</label>
                                    <input id="salePercentage" className="form-control" value={this.state.salePercentage} onChange={this.handleInputChange} name="salePercentage" />
                                    <hr />
                                    <label>Mentor Percentage [only enter numbers]</label>
                                    <input id="taggedPercentage" className="form-control" value={this.state.saleTaggedPercentage} onChange={this.handleInputChange} name="saleTaggedPercentage" />

                                    <hr />
                                    <label>Lead Source:</label>
                                    {/* <input id="source-input" className="form-control" value={this.state.apptsource} onChange={this.handleInputChange} name="apptsource" type="text" placeholder="Source of Lead" /> */}
                                    {this.props.userData.sources ? <select id="sourceDropMenu" value={this.state.saleSource} className="" onChange={this.handleInputChange} name="saleSource">
                                        <option value={"none"}>No Lead Source Selected</option>
                                        {this.props.userData.sources.map(source => (
                                            <option key={source} value={source}>{source}</option>
                                        ))}
                                    </select> : <p style={{ color: 'whitesmoke' }}>"No lead sources created yet"</p>}

                                    <hr />
                                    <label>Target Market:</label>
                                    {/* <input id="targetmkt-input" className="form-control" value={this.state.apptTargetMkt} onChange={this.handleInputChange} name="appttargetmkt" type="text" placeholder="Target Market goes here" /> */}
                                    {this.props.userData.targetMarkets ? <select id="sourceDropMenu" value={this.state.saleTargetMkt} className="" onChange={this.handleInputChange} name="saleTargetMkt">
                                        <option value={"none"}>No Target Market Selected</option>
                                        {this.props.userData.targetMarkets.map(target => (
                                            <option key={target} value={target}>{target}</option>
                                        ))}
                                    </select> : <p style={{ color: 'black' }}>"No target markets created yet"</p>}
                                    <hr />
                                    <label>Sales Notes:</label>
                                    <input id="note-input" className="form-control" value={this.state.saleNotes} onChange={this.handleInputChange} name="saleNotes" type="text" placeholder="Enter any notes here" />
                                    <br />
                                    <button id="appt-input-btn" className="btn-success form-control" onClick={this.handleSaleSubmit}>Submit Sale</button>
                                </div>
                            </form>
                        </div>
                        : null}
                </div>
            </div>
        )

    }
}

export default SalesCreator