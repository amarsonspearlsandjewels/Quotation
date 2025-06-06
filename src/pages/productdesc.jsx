import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ProductPDF from './productPDF';
import { useState, useEffect } from 'react';

export default function ProductDesc({
  item,
  priceIndex,
  isLoading,
  setIsLoading,
  onBack,
  selectedPriceIndex,
  setActiveTab,
}) {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [allPrices, setAllPrices] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const breakdown = item?.pricingBreakdown?.[`tier${priceIndex + 1}`];

  useEffect(() => {
    fetch('https://apjapi.vercel.app/getAllPrices')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllPrices(data.PRICES);
        }
      });
  }, []);

  const handleDownload = async () => {
    const blob = await pdf(
      <ProductPDF
        item={item}
        priceIndex={priceIndex}
        logoUrl={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpUQWDaUTeJ180nuMsWJwVVpLsDm2xVEycw&s'
        }
      />
    ).toBlob();

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const filename = `${item.id || 'item'}_${formattedDate}.pdf`;

    saveAs(blob, filename);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2000);
  };

  if (!item) return <div>No item selected.</div>;
  const tag = `tier${priceIndex + 1}price`;
  const price = item[tag];

  const groupedItems = item.itemsUsed?.reduce((acc, material) => {
    if (!acc[material.category]) acc[material.category] = [];
    acc[material.category].push(material);
    return acc;
  }, {});

  async function handleDelete(productId) {
    if (!productId) {
      alert('❌ Product ID is missing.');
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete item ${productId}?`
    );
    if (!confirmDelete) return;

    try {
      // Send GET request to delete the item
      const response = await fetch(
        `https://apjapi.vercel.app/deleteItem/productId=${encodeURIComponent(
          productId
        )}`
      );

      const result = await response.json();

      if (!response.ok) {
        console.error('❌ Deletion failed:', result);
        alert(`Failed to delete item: ${result.message}`);
        return;
      }

      console.log('✅ Item deleted:', result);
      alert(`✅ ${result.message}`);

      // Optional: refresh or remove item from UI
      setTimeout(() => window.location.reload(), 300);
    } catch (error) {
      console.error('❌ Network/Server Error:', error);
      alert(
        'Something went wrong while deleting the item. Please try again later.'
      );
    }
  }

  // Helper function to get material price from allPrices
  const getMaterialPrice = (category, label) => {
    if (!allPrices) return null;
    const categoryData = allPrices.find((entry) => entry.docname === category);
    if (!categoryData || !categoryData[label]) return null;
    const tierPrices = categoryData[label];
    const selectedPrice = tierPrices[priceIndex];
    return typeof selectedPrice === 'string'
      ? parseFloat(selectedPrice)
      : selectedPrice;
  };

  const formatWeight = (num) => {
    if (isNaN(num)) return '0.0';
    return parseFloat(num).toFixed(2);
  };

  const formatAmount = (num) => {
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(Number(num));
  };

  return (
    <div className="productdescriptionpage">
      <div className="productdescbuttonsection">
        <div
          className="backbutton"
          onClick={() => {
            onBack();
          }}
        >
          <img src="/back.png" alt="" className="backicon" />
        </div>
        <div
          className="backbutton"
          onClick={() => {
            handleDownload();
          }}
        >
          <img src="/downloadpdf.png" alt="" className="backicon" />
        </div>
        <div
          className="backbutton"
          onClick={() => {
            handleDelete(item.id);
          }}
        >
          <img src="/delete.png" alt="" className="backicon" />
        </div>
      </div>
      <img src={item.imagelink} alt="" className="productdescimage" />
      <div className="productdesccategory">
        <div className="productdescid">Product ID - {item.id}</div>
        <div className="productdescpillsection">
          <div className="pill">{item.category}</div>
          <div className="pill">{item.subcategory}</div>
        </div>
      </div>

      <div className="productdescgolddata">
        <div className="golddatatag">Total Price -&nbsp;</div>
        <div className="golddataval">{formatAmount(price)} ₹</div>
        <img
          src="/info.png"
          alt=""
          className="breakupbutton"
          onClick={() => setShowBreakdown(true)}
        />
      </div>
      <div className="productdescgolddata">
        <div className="golddatatag">Gold Purity -&nbsp;</div>
        <div className="golddataval">{item.goldpurity}</div>
      </div>
      <div className="productdescgolddata">
        <div className="golddatatag">Gold Weight -&nbsp;</div>
        <div className="golddataval">{formatWeight(item.netweight)} gm</div>
      </div>
      <div className="productdescgolddata">
        <div className="golddatatag">Stone Weight -&nbsp;</div>
        <div className="golddataval">
          {formatWeight(item.grossWeight - item.netweight)} gm
        </div>
      </div>
      <div className="productdescgolddata">
        <div className="golddatatag">Total Weight -&nbsp;</div>
        <div className="golddataval">{formatWeight(item.grossWeight)} gm</div>
      </div>

      <div className="productdesc-groupedlist">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category}>
            <div className="productdesc-category">{category}</div>
            <ul className="productdesc-itemlist">
              {items.map((mat, idx) => {
                const unitPrice = getMaterialPrice(mat.category, mat.label);
                const total =
                  unitPrice != null
                    ? formatAmount(unitPrice * mat.quantity)
                    : 'N/A';
                return (
                  <li className="productdesc-item" key={idx}>
                    {mat.label} – {mat.quantity} x
                    {unitPrice != null && (
                      <>
                        {' '}
                        ₹{unitPrice} / unit = ₹{total}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showBreakdown && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Price Breakdown - Tier {priceIndex + 1}</h2>
            {breakdown ? (
              <table className="breakdown-table">
                <tbody>
                  {Object.entries(breakdown).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key.replace(/([A-Z])/g, ' $1')}</td>
                      <td>
                        {key === 'gstPercent'
                          ? `${value}%`
                          : `₹${formatAmount(Number(value))}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No breakdown available.</p>
            )}
            <button
              className="close-button"
              onClick={() => setShowBreakdown(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {snackbarVisible && (
        <div className="snackbar">PDF downloaded successfully!</div>
      )}
    </div>
  );
}
