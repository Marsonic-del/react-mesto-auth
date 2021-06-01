import React from 'react';

function Footer() {
  const fullYear = new Date();
  return (
    <footer className="footer">
      <p className="footer__text">&copy; {fullYear.getFullYear()} Mesto</p>
    </footer>
  );
}
  
export default Footer;