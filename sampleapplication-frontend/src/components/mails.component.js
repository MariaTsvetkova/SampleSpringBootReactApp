import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMail, deleteMail } from "../actions/mails";
import MailDataService from "../services/mails.service";

class Mail extends Component {
  constructor(props) {
    super(props);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.getMail = this.getMail.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeMail = this.removeMail.bind(this);

    this.state = {
      currentMail: {
        id: null,
        address: "",
        subject: "",
        message:"",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getMail(this.props.match.params.id);
  }

  onChangeAddress(e) {
    const address = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMail: {
          ...prevState.currentMail,
          address: address,
        },
      };
    });
  }

  onChangeSubject(e) {
    const subject = e.target.value;

    this.setState((prevState) => ({
      currentMail: {
        ...prevState.currentMail,
        subject: subject,
      },
    }));
  }

  onChangeMessage(e) {
    const message = e.target.value;

    this.setState((prevState) => ({
      currentMail: {
        ...prevState.currentMail,
        message: message,
      },
    }));
  }

  getMail(id) {
    MailDataService.get(id)
      .then((response) => {
        this.setState({
          currentMail: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateMail(this.state.currentMail.id, this.state.currentMail)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The mail was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeMail() {
    this.props
      .deleteMail(this.state.currentMail.id)
      .then(() => {
        this.props.history.push("/mails");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentMail } = this.state;

    return (
      <div>
        {currentMail ? (
          <div className="edit-form">
            <h4>Mail</h4>
            <form>
              <div className="form-group">
                <label htmlFor="address">E-MAIL</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentMail.address}
                  onChange={this.onChangeAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={currentMail.subject}
                  onChange={this.onChangeSubject}
                />
              </div><div className="form-group">
                <label htmlFor="message">Message</label>
                <input
                  type="text"
                  className="form-control"
                  id="message"
                  value={currentMail.message}
                  onChange={this.onChangeMessage}
                />
              </div>

            </form>

            <button
              className="btn btn-danger"
              onClick={this.removeMail}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-info"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Mail...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateMail, deleteMail })(Mail);