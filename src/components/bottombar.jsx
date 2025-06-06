export default function Bottombar({ activeTab, setActiveTab }) {
  return (
    <div className="bottombar">
      <div
        className={`tab ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
      >
        <img src="/home.png" alt="Home" className="tabicon" />
        <div className="tabtag">Home</div>
      </div>
      <div
        className={`tab ${activeTab === 'price' ? 'active' : ''}`}
        onClick={() => setActiveTab('price')}
      >
        <img src="/updateprice.png" alt="Update Price" className="tabicon" />
        <div className="tabtag">Update Price</div>
      </div>
      <div
        className={`tab ${activeTab === 'add' ? 'active' : ''}`}
        onClick={() => setActiveTab('add')}
      >
        <img src="/add.png" alt="Add" className="tabicon" />
        <div className="tabtag">Add Product</div>
      </div>
    </div>
  );
}
