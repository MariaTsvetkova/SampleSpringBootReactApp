import React, { Component } from "react";
import { connect } from 'react-redux';
import { retrieveMails, findMailsByAddress, deleteAllMails } from "../actions/mails";
import { Link } from "react-router-dom";

class MailsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchAddress = this.onChangeSearchAddress.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveMail = this.setActiveMail.bind(this);
    this.findByAddress = this.findByAddress.bind(this);
    this.removeAllMails = this.removeAllMails.bind(this);

    this.state = {
      currentMail: null,
      currentIndex: -1,
      searchAddress: "",
    };
  }

  componentDidMount() {
    this.props.retrieveMails();
  }

  onChangeSearchAddress(e) {
    const searchAddress = e.target.value;

    this.setState({
      searchAddress: searchAddress,
    });
  }

  refreshData() {
    this.setState({
      currentMail: null,
      currentIndex: -1,
    });
  }

  setActiveMail(mail, index) {
    this.setState({
      currentMail: mail,
      currentIndex: index,
    });
  }

  removeAllMails() {
    this.props
      .deleteAllMails()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByAddress() {
    this.refreshData();

    this.props.findMailsByAddress(this.state.searchAddress);
  }

  render() {
    const { searchAddress, currentMail, currentIndex } = this.state;
    const { mails } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Address"
              value={searchAddress}
              onChange={this.onChangeSearchAddress}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByAddress}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Mails List</h4>

          <ul className="list-group">
            {mails &&
              mails.map((mail, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMail(mail, index)}
                  key={index}
                >
                  {mail.address}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMails}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentMail ? (
            <div>
              <h4>Mail</h4>
              <div>
                <label>
                  <strong>E-MAIL:</strong>
                </label>{" "}
                {currentMail.address}
              </div>
              <div>
                <label>
                  <strong>Subject:</strong>
                </label>{" "}
                {currentMail.subject}
              </div>
              <div>
                <label>
                  <strong>Message:</strong>
                </label>{" "}
                {currentMail.message}
              </div>

              <Link
                to={"/mails/" + currentMail.id}
                className="badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Mail...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mails: state.mails,
  };
};

export default connect(mapStateToProps, { retrieveMails, findMailsByAddress, deleteAllMails })(MailsList);