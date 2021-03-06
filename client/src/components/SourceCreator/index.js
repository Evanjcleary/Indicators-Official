import React, { Component } from "react";
// import { Input } from "../Form";
import API from "../../utils/API";
import cogoToast from "cogo-toast"
import "./style.css";


class SourceCreator extends Component {

    state = {
        source: "",
        userData: "",
        showCreateSource: false
    }

    componentDidMount() {

        // console.log(this.props.sources);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSuccess = () => {
        cogoToast.success("Added new Source!")
        // this.props.rerender();
    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        API.saveSourceToProtege(this.props.userData._id, {
            source: this.state.source
        })
            .then(res => this.handleSuccess())
            .catch(err => console.log(err));
    }

    // saveCategory = body => {
    //     // event.preventDefault()

    //     API.saveCategory(body)
    //         .then(res => console.log("You've saved this category to your DB!"))
    //         .catch(err => console.log(err));

    // }

    showCreate = () => {
        if (this.state.showCreateSource === false) {
            this.setState({
                showCreateSource: true
            })
        } else {
            this.setState({
                showCreateSource: false
            })
        }
    }

    render() {
        return (
            <div style={{}}>
                {/* {this.state.showCreateSource ? */}
                <div>
                    {/* <div className="input-group"> */}

                        <div className="card-header">
                            <p style={{}}><>Create Lead Source:</></p>
                        </div>
                        <div className="card-body">
                            <div style={{ width: '', margin: '0' }}>
                                <label>Enter Source:</label>
                                <input value={this.state.source} onChange={this.handleInputChange} className="input-group" name="source" placeholder="" />
                                <button style={{}} id="admin-createCategoryBtn" className="btn-outline-dark btn btn-sm" onClick={this.handleFormSubmit}>Save</button>
                            </div>
                        </div>
                    {/* </div> */}



                    {/* List of Existing Sources */}
                    {/* {this.state.showExistingSources ?
                        <div>
                            <br />
                            <h6 id="admin-requestHeadCat">Existing Sources: </h6>
                            <div style={{ padding: 15, height: '150px', overflow: 'auto' }}>

                                {this.props.userData.sources.map(source => (
                                    <p key={source}>>> {source}<span><button id="delete-source" className="btn-outline-danger btn btn-sm" style={{ marginRight: '0px', float: 'right', textAlign: 'center' }}>X</button></span></p>
                                ))}
                            </div>
                        </div>
                        : null} */}
                </div>
                {/* : null} */}
            </div>
        )
    }

}

export default SourceCreator
