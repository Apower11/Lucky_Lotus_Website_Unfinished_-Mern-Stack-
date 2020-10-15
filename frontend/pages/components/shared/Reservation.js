import React, { useState } from "react";
import Button from "../../../shared/UIElements/Button";
import Modal from "../../../shared/UIElements/Modal";

const Reservation = (props) => {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [date, setDate] = useState("");
  const [persons, setPersons] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handlePersonsChange = (event) => {
    setPersons(event.target.value);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
  };

  

  return (
    <React.Fragment>
      <Modal
        className={`reservation-modal ${
          !showReservationModal && "modal-close"
        }`}
        contentClass="reservation-modal__content"
        show={showReservationModal}
        onCancel={closeReservationModal}
        header={"Complete Reservation"}
        footer={""}
      >
        <form className="reservation-form">
          <div className="upper-half">
            <input
              className="reservation-input"
              type="text"
              placeholder="Your Name*"
              value={name}
            />
            <input
              className="reservation-input"
              type="email"
              placeholder="Your Email*"
              value={email}
            />
            <input
              className="reservation-input"
              type="number"
              placeholder="Mobile Number*"
              value={mobileNumber}
            />
          </div>
          <div className="lower-half">
            <input
              className="reservation-input"
              type="date"
              placeholder="Date*"
              value={date}
            />
            <select className="sort-by" required>
              <option value="" hidden>
                Available Times
              </option>
              <option>12:30pm</option>
              <option>12:45pm</option>
              <option>13:00pm</option>
            </select>
            <input
              className="reservation-input"
              type="number"
              placeholder="No. of Persons*"
              value={persons}
            />
          </div>
        </form>
        <Button type="submit">Make Reservation</Button>
      </Modal>
      <div className="reservation">
        <div className="reservation-background-image" />
        <h1>Reservation</h1>
        <h3>Book Your Table</h3>
        <form
          action="https://www.opentable.com/r/china-lotus-reservations-istanbul?restref=179607&lang=en-US&ot_source=Restaurant%20website"
          className="reservation-form"
        >
          <div className="upper-half">
            <input
              className="reservation-input"
              type="text"
              placeholder="Your Name*"
              onChange={handleNameChange}
            />
            <input
              className="reservation-input"
              type="email"
              placeholder="Your Email*"
              onChange={handleEmailChange}
            />
            <input
              className="reservation-input"
              type="number"
              placeholder="Mobile Number*"
              onChange={handleMobileNumberChange}
            />
          </div>
          <div className="lower-half">
            <input
              className="reservation-input"
              type="date"
              placeholder="Date*"
              onChange={handleDateChange}
            />
            <input
              className="reservation-input"
              type="time"
              placeholder="Time*"
            />
            <input
              className="reservation-input"
              type="number"
              placeholder="No. of Persons*"
              onChange={handlePersonsChange}
            />
          </div>
          <a
            className="button"
            href="https://www.opentable.com/r/china-lotus-reservations-istanbul?restref=179607&lang=en-US&ot_source=Restaurant%20website"
          >
            Book Now
          </a>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Reservation;
