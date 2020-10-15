import React, { useState } from "react";
import Button from "../../../shared/UIElements/Button";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const ContactForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { sendRequest } = useHttpClient();
  const contactSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/one/contact",
        "POST",
        JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };
  return (
    <div className="contact-form">
      <h1>Keep in Touch</h1>
      <h3>Some Great Guys</h3>
      <div className="contact-form-content">
        <div>
          <form onSubmit={contactSubmitHandler}>
            <input
              id="name"
              placeholder="Your Name*"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              id="email"
              placeholder="Your Email*"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="subject"
              placeholder="Subject*"
              type="text"
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              id="message"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
        <div className="contact-details">
          <h1>Contact Details</h1>
          <div className="address">
            <i className="fa fa-map-marker"></i>
            <div>
              <p>2721 Ingersoll Ave, Des Moines</p>
              <p>IA 50312, United States</p>
            </div>
          </div>
          <div className="phone-number">
            <i className="fa fa-phone"></i>
            <div>
              <p>020 7654 8103</p>
              <p>020 9054 1760</p>
            </div>
          </div>
          <div className="email-address">
            <i className="fa fa-envelope"></i>
            <div>
              <p>admin@luckylotus.com</p>
              <p>info@luckylotus.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
