import { useState } from 'react';
export default function Menupage({
  isMenuOpen,
  setIsMenuOpen,
  activeTab,
  setActiveTab,
  setIsLoggedIn,
  isAdmin,
}) {
  const handleMenuClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div className={`menupage ${isMenuOpen ? 'menuopen' : 'menuclose'}`}>
      <div className="topmenubar">
        <div className="topmenubartag">Menu</div>
        <div className="topmenubarbutton" onClick={() => setIsMenuOpen(false)}>
          <img src="/close.png" alt="Close button" className="closebutton" />
        </div>
      </div>

      <div className="menuitems">
        <div className="menuitem item1" onClick={() => handleMenuClick('home')}>
          <img src="/home.png" alt="Home Icon" className="itemicon" />
          <div className="itemtag">Home</div>
        </div>

        <div className="menuitem item1" onClick={() => handleMenuClick('add')}>
          <img src="/add.png" alt="Add Icon" className="itemicon" />
          <div className="itemtag">Add Products</div>
        </div>

        <div
          className="menuitem item1"
          onClick={() => handleMenuClick('price')}
        >
          <img src="/updateprice.png" alt="Price Icon" className="itemicon" />
          <div className="itemtag">Update Prices</div>
        </div>

        {isAdmin && (
          <div
            className="menuitem item1"
            onClick={() => handleMenuClick('users')}
          >
            <img src="/user.png" alt="User Icon" className="itemicon" />
            <div className="itemtag">Manage Users</div>
          </div>
        )}

        {isAdmin && (
          <div
            className="menuitem item1"
            onClick={() => handleMenuClick('draft')}
          >
            <img src="/draft.png" alt="Logout Icon" className="itemicon" />
            <div className="itemtag">Draft Page</div>
          </div>
        )}
         <div
            className="menuitem item1"
            onClick={() => handleMenuClick('itemsused')}
          >
            <img src="/itemsused.png" alt="Logout Icon" className="itemicon" />
            <div className="itemtag">Items Used Page</div>
          </div>

        <div className="menuitem item1" onClick={() => handleLogout()}>
          <img src="/exit.png" alt="Logout Icon" className="itemicon" />
          <div className="itemtag">Logout</div>
        </div>
      </div>

      <div className="loggedintag">
        <div className="loggedininfo">
          Logged In As: {isAdmin ? 'Admin' : 'User'}
        </div>
      </div>
    </div>
  );
}
