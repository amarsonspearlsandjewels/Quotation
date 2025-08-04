import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ProductPDF from './productPDF';
import { useState } from 'react';

export default function ProductDesc({
  item,
  priceIndex,
  isLoading,
  setIsLoading,
  onBack,
  selectedPriceIndex,
  setActiveTab,
  goldRates
}) {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleDownload = async () => {
    console.log(item);
    
    try {
      const blob = await pdf(
        <ProductPDF
          item={item}
          priceIndex={priceIndex}
          logoUrl={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpUQWDaUTeJ180nuMsWJwVVpLsDm2xVEycw&s'
          }
          goldRates={goldRates}
          todayDate={getTodayDate()}
        />
      ).toBlob();

      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      const filename = `${item.id || 'item'}_${formattedDate}.pdf`;

      saveAs(blob, filename);
      
      // Show success toast
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 3000);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (!item) return <div>No item selected.</div>;

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
      const response = await fetch(
        `https://apj-quotation-backend.vercel.app/deleteItem/productId=${encodeURIComponent(
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

      setTimeout(() => window.location.reload(), 300);
    } catch (error) {
      console.error('❌ Network/Server Error:', error);
      alert(
        'Something went wrong while deleting the item. Please try again later.'
      );
    }
  }

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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get today's date in DD/MM/YYYY format
  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
        <div className="productdescid">Product ID - {item.productId}</div>
        <div className="productdescpillsection">
          <div className="pill">{item.category}</div>
          <div className="pill">{item.subcategory}</div>
        </div>
      </div>

      {/* Price Section */}
      <div className="productdescgolddata">
        <div className="golddatatag">Final Price -&nbsp;</div>
        <div className="golddataval">{formatAmount(item.finalPrice)} ₹</div>
        <img
          src="/info.png"
          alt=""
          className="breakupbutton"
          onClick={() => setShowBreakdown(true)}
        />
      </div>

      {/* Basic Details Section */}
      <div className="productdesc-section">
        <div className="productdesc-section-title">Product Details</div>
        <div className="productdescgolddata">
          <div className="golddatatag">Gold Purity -&nbsp;</div>
          <div className="golddataval">{item.goldpurity}</div>
        </div>
        <div className="productdescgolddata">
          <div className="golddatatag">Net Weight -&nbsp;</div>
          <div className="golddataval">
            {(() => {
              if (!item.itemsUsed || item.itemsUsed.length === 0) {
                return formatWeight(item.netweight);
              }
              
              // Calculate total stone weight in grams
              let totalStoneWeightGms = 0;
              item.itemsUsed.forEach(mat => {
                const unit = (mat.unit || 'ct').toLowerCase();
                if (unit === 'ct') {
                  totalStoneWeightGms += parseFloat(mat.quantity) * 0.2; // Convert carats to grams
                } else if (unit === 'gms' || unit === 'gram') {
                  totalStoneWeightGms += parseFloat(mat.quantity); // Use grams directly
                }
              });
              
              // Calculate net weight: gross weight - stone weight
              const calculatedNetWeight = parseFloat(item.grossWeight) - totalStoneWeightGms;
              return formatWeight(calculatedNetWeight);
            })()} gm
          </div>
        </div>
        <div className="productdescgolddata">
          <div className="golddatatag">Gross Weight -&nbsp;</div>
          <div className="golddataval">{formatWeight(item.grossWeight)} gm</div>
        </div>
        <div className="productdescgolddata">
          <div className="golddatatag">Stone Weight (Carats) -&nbsp;</div>
          <div className="golddataval">
            {(() => {
              if (!item.itemsUsed || item.itemsUsed.length === 0) return '0.00';
              
              let totalCts = 0;
              item.itemsUsed.forEach(mat => {
                const unit = (mat.unit || 'ct').toLowerCase();
                if (unit === 'ct') {
                  totalCts += parseFloat(mat.quantity);
                } else if (unit === 'gms' || unit === 'gram') {
                  totalCts += parseFloat(mat.quantity) / 0.2; // Convert grams to carats
                }
              });
              return formatWeight(totalCts);
            })()} ct
          </div>
        </div>
        <div className="productdescgolddata">
          <div className="golddatatag">Stone Weight (Grams) -&nbsp;</div>
          <div className="golddataval">
            {(() => {
              if (!item.itemsUsed || item.itemsUsed.length === 0) return '0.00';
              
              let totalGms = 0;
              item.itemsUsed.forEach(mat => {
                const unit = (mat.unit || 'ct').toLowerCase();
                if (unit === 'ct') {
                  totalGms += parseFloat(mat.quantity) * 0.2; // Convert carats to grams
                } else if (unit === 'gms' || unit === 'gram') {
                  totalGms += parseFloat(mat.quantity); // Use grams directly
                }
              });
              return formatWeight(totalGms);
            })()} gm
          </div>
        </div>
        <div className="productdescgolddata">
          <div className="golddatatag">Stone Price -&nbsp;</div>
          <div className="golddataval">
            {(() => {
              if (!item.itemsUsed || item.itemsUsed.length === 0) return '0';
              
              const totalPrice = item.itemsUsed.reduce((sum, mat) => {
                return sum + (parseFloat(mat.quantity) * parseFloat(mat.price));
              }, 0);
              return formatAmount(totalPrice);
            })()} ₹
          </div>
        </div>
        <div className="productdescgolddata">
          <div className="golddatatag">GST -&nbsp;</div>
          <div className="golddataval">{item.gst}%</div>
        </div>
        <div className="productdescgolddata">
          <div className="golddatatag">Making Type -&nbsp;</div>
          <div className="golddataval">
            {item.makingTypeUsed === 0 ? 'Standard' : 'Victorian'}
          </div>
        </div>
        <div className="productdescgolddata">
          <div className="golddatatag">Created Date -&nbsp;</div>
          <div className="golddataval">{formatDate(item.createdAt)}</div>
        </div>
      </div>

      {/* Items Used Section */}
      {item.itemsUsed && item.itemsUsed.length > 0 && (
        <div className="productdesc-section">
          <div className="productdesc-section-title">Materials Used</div>
          <div className="productdesc-itemsused">
            {item.itemsUsed.map((material, index) => (
              <div key={index} className="productdesc-material-item">
                <div className="material-name">{material.name}</div>
                <div className="material-details">
                  <span className="material-quantity">{material.quantity}</span>
                  <span className="material-unit">{material.unit}</span>
                  <span className="material-price">@ ₹{formatAmount(material.price)}</span>
                  <span className="material-total">= ₹{formatAmount(material.quantity * material.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Breakdown Modal */}
      {showBreakdown && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Price Breakdown</h2>
            {item.pricingBreakdown ? (
              <div className="breakdown-content">
                <div className="breakdown-item">
                  <span className="breakdown-label">Gold Charges:</span>
                  <span className="breakdown-value">₹{formatAmount(item.pricingBreakdown.goldCharges)}</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Wastage Charges:</span>
                  <span className="breakdown-value">₹{formatAmount(item.pricingBreakdown.wastageCharges)}</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Making Charges:</span>
                  <span className="breakdown-value">₹{formatAmount(item.pricingBreakdown.makingCharges)}</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Material Charges:</span>
                  <span className="breakdown-value">₹{formatAmount(item.pricingBreakdown.materialCharges)}</span>
                </div>
                <div className="breakdown-item breakdown-total">
                  <span className="breakdown-label">Subtotal:</span>
                  <span className="breakdown-value">
                    ₹{formatAmount(
                      item.pricingBreakdown.goldCharges +
                      item.pricingBreakdown.wastageCharges +
                      item.pricingBreakdown.makingCharges +
                      item.pricingBreakdown.materialCharges
                    )}
                  </span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">GST ({item.pricingBreakdown.gstPercent}%):</span>
                  <span className="breakdown-value">
                    ₹{formatAmount(
                      (item.pricingBreakdown.goldCharges +
                      item.pricingBreakdown.wastageCharges +
                      item.pricingBreakdown.makingCharges +
                      item.pricingBreakdown.materialCharges) * 
                      (item.pricingBreakdown.gstPercent / 100)
                    )}
                  </span>
                </div>
                <div className="breakdown-item breakdown-final">
                  <span className="breakdown-label">Final Price:</span>
                  <span className="breakdown-value">₹{formatAmount(item.pricingBreakdown.finalPrice)}</span>
                </div>
              </div>
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
