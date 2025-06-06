export default function Header({
  isMenuOpen,
  setIsMenuOpen,
  // activeTab,
  setActiveTab,
  username,
}) {
  return (
    <div className="header">
      <div className="greeting">
        {/* <img src="/amarsonslogo.png" alt="" className="greetlogo" /> */}
        <div className="greettext">
          <div className="topgreet">
            Welcome
            {/* <span className="bl">{username}</span> */}
          </div>
          <div className="bottomgreet">{username}</div>
        </div>
      </div>
      <div className="actions">
        <div
          className="actionbutton menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img src="/menu.png" alt="MenuIcon" className="menubuttonicon" />
        </div>
      </div>
    </div>
  );
}
