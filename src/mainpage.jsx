import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import Carousel from './components/carousel';
import '/src/assets/styles.css';
import Bottombar from './components/bottombar';
import Homescreen from './pages/homescreen';
import UpdatePrice from './pages/updateprices';
import Menupage from './components/menupage';
import AddItemPage from './pages/additem';
import ManageUsers from './pages/manageusers';
import ProductDesc from './pages/productdesc';
import DraftPage from './pages/draftpage';
import EditItemPage from './pages/edititem';
import EditDraftPage from './pages/editdraft';

export default function Mainpage({
  username,
  isAdmin,
  setIsLoggedIn,
  isLoading,
  setIsLoading,
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState([]);
  const [initialPrices, setInitialPrices] = useState([]);
  const [pricesData, setPricesData] = useState([]);
  const [draft, setDraft] = useState([]);
  const [edititem, setedititem] = useState([]);
  // Show popup once per day
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastReminderDate = localStorage.getItem('lastReminderDate');
    if (lastReminderDate !== today) {
      setShowReminder(true);
      localStorage.setItem('lastReminderDate', today);
    }
  }, []);

  //get all items data

  useEffect(() => {
    setIsLoading(true);
    fetch('https://apjapi.vercel.app/getAllItems')
      .then((res) => res.json())
      .then((dataa) => {
        if (dataa.success) {
          setData(dataa.items);

          console.log('Total Prices All Items :', dataa.items);
        }
        setIsLoading(false);
      })
      .catch((err) => console.error('❌ Error fetching prices:', err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://apjapi.vercel.app/getAllDrafts')
      .then((res) => res.json())
      .then((dataa) => {
        if (dataa.success) {
          setDraft(dataa.items);

          console.log('Total Prices All Items :', dataa.items);
        }
        setIsLoading(false);
      })
      .catch((err) => console.error('❌ Error fetching prices:', err))
      .finally(() => setIsLoading(false));
  }, []);

  //fetch Update Items api call

  useEffect(() => {
    setIsLoading(true);
    fetch('https://apjapi.vercel.app/getAllPrices')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPrices(data.PRICES);
          setPricesData(data.PRICES);
          setInitialPrices(JSON.parse(JSON.stringify(data.PRICES)));
          console.log('[Initial Load] Prices:', data.PRICES);
        }
        setIsLoading(false);
      })
      .catch((err) => console.error('❌ Error fetching prices:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handlePriceClick = (item, index) => {
    setSelectedItem(item);
    setSelectedPriceIndex(index);
    setActiveTab('productdesc');
  };

  return (
    <>
      {/* Daily Reminder Popup */}
      {showReminder && (
        <div className="reminder-popup">
          <div className="popup-content">
            <h3>Update Gold Prices</h3>
            <p>
              Please update today's gold prices to ensure accurate quotations.
            </p>
            <div className="popup-buttons">
              <button onClick={() => setShowReminder(false)}>Cancel</button>
              <button
                onClick={() => {
                  setShowReminder(false);
                  setActiveTab('price');
                }}
              >
                Go to Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UI Components */}
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        username={username}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Carousel isLoading={isLoading} setIsLoading={setIsLoading} />
      <Menupage
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {activeTab === 'home' && (
        <Homescreen
          onPriceClick={handlePriceClick}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          data={data}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          setSelectedPriceIndex={setSelectedPriceIndex}
          selectedPriceIndex={selectedPriceIndex}
          setActiveTab={setActiveTab}
          setedititem={setedititem}
          edititem={edititem}
        />
      )}
      {activeTab === 'price' && (
        <UpdatePrice
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          prices={prices}
          initialPrices={initialPrices}
          setPrices={setPrices}
          setInitialPrices={setInitialPrices}
        />
      )}
      {activeTab === 'add' && (
        <AddItemPage
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          pricesData={pricesData}
          setActiveTab={setActiveTab}
        />
      )}
      {activeTab === 'edit' && (
        <EditItemPage
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          pricesData={pricesData}
          setActiveTab={setActiveTab}
          setedititem={setedititem}
          item={edititem}
        />
      )}
      {activeTab === 'editdraft' && (
        <EditDraftPage
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          pricesData={pricesData}
          setActiveTab={setActiveTab}
          setedititem={setedititem}
          item={edititem}
        />
      )}
      {activeTab === 'users' && (
        <ManageUsers isLoading={isLoading} setIsLoading={setIsLoading} />
      )}
      {activeTab === 'productdesc' && (
        <ProductDesc
          item={selectedItem}
          priceIndex={selectedPriceIndex}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onBack={() => setActiveTab('home')}
          selectedPriceIndex={selectedPriceIndex}
          setActiveTab={setActiveTab}
        />
      )}
      {activeTab === 'draft' && (
        <DraftPage
          onPriceClick={handlePriceClick}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          data={draft}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          setSelectedPriceIndex={setSelectedPriceIndex}
          selectedPriceIndex={selectedPriceIndex}
          setActiveTab={setActiveTab}
          setedititem={setedititem}
          edititem={edititem}
        />
      )}

      <Bottombar
        activeTab={activeTab}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setActiveTab={setActiveTab}
      />
    </>
  );
}
