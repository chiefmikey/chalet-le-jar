import React from 'react';

const Footer = ({
  footerValue,
  activePlayerCount,
}: {
  footerValue: string;
  activePlayerCount: number;
}) => {
  return (
    <div className="footer">
      <div className="footerValue">
        <span>{`${footerValue}`}</span>
      </div>{' '}
      <div className="activePlayerCount">
        <span>{`Active: ${activePlayerCount}`}</span>
      </div>
    </div>
  );
};

export default Footer;
