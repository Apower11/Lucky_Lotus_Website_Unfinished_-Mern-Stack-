import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const OurTeam = (props) => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="our-team">
      <h1>Meet the Team</h1>
      <h3>Some Great Guys</h3>
      <div className="team-members">
        <div data-aos="fade-right" id="team-member-one" className="team-member">
          <div className="team-member__image"></div>
          <div className="team-member__info">
            <h3>John Doe</h3>
            <h5>Head Chef</h5>
          </div>
        </div>
        <div data-aos="fade-down" id="team-member-two" className="team-member">
          <div className="team-member__image"></div>
          <div className="team-member__info">
            <h3>Michael Smith</h3>
            <h5>Founder and Owner</h5>
          </div>
        </div>
        <div
          data-aos="fade-left"
          id="team-member-three"
          className="team-member"
        >
          <div className="team-member__image"></div>
          <div className="team-member__info">
            <h3>Callum Davies</h3>
            <h5>Restaurant Manager</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
