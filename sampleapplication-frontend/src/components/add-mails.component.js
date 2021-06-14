import React, { Component } from "react";
import { connect } from "react-redux";
import { createMail } from "../actions/mails";

class AddMail extends Component {
  constructor(props) {
    super(props);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.saveMail = this.saveMail.bind(this);
    this.newMail = this.newMail.bind(this);

    this.state = {
      id: null,
      address: "",
      subject: "",
      message:"",

      submitted: false,
    };
  }

  onChangeAddress(e) {
    this.setState({
     address: e.target.value,
    });
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value,
    });
  }

  onChangeMessage(e) {
    this.setState({
      message: e.target.value,
    });
  }

  saveMail() {
    const { address, subject, message } = this.state;

    this.props
      .createMail(address, subject, message)
      .then((data) => {
        this.setState({
          id: data.id,
          address: data.address,
          subject: data.subject,
          message: data.message,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newMail() {
    this.setState({
      id: null,
      address: "",
      subject: "",
      message:"",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMail}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={this.state.address}
                onChange={this.onChangeAddress}
                name="address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                required
                value={this.state.subject}
                onChange={this.onChangeSubject}
                name="subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <input
                type="text"
                className="form-control"
                id="message"
                required
                value={this.state.message}
                onChange={this.onChangeMessage}
                name="message"
              />
            </div>

            <button onClick={this.saveMail} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createMail })(AddMail);