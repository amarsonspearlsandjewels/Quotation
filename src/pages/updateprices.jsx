import React from 'react';

export default function UpdatePrice({
  isLoading,
  setIsLoading,
  prices,
  initialPrices,
  setPrices,
  setInitialPrices,
}) {
  // Helper to get category by docname
  const getCategory = (docname) => prices.find((cat) => cat.docname === docname) || {};
  const getInitialCategory = (docname) => initialPrices.find((cat) => cat.docname === docname) || {};

  // Handler for input changes
  const handleInputChange = (categoryDoc, key, value) => {
    const updatedPrices = prices.map((cat) => {
      if (cat.docname !== categoryDoc) return cat;
      return { ...cat, [key]: value };
    });
    setPrices(updatedPrices);
  };

  // Save changes
  const handleSaveChanges = () => {
    setIsLoading(true);
    fetch('https://apj-quotation-backend.vercel.app/updatePrices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ PRICES: prices }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('✅ Prices updated successfully.');
          setInitialPrices(JSON.parse(JSON.stringify(prices)));
        } else {
          alert('❌ Failed to update prices.');
        }
        setIsLoading(false);
      })
      .catch(() => {
        alert('❌ Error sending updated prices.');
        setIsLoading(false);
      });
  };

  // Making charges keys
  const makingKeys = [
    { label: 'Diamond Making', key: 'Diamond Making' },
    { label: 'Gold Making', key: 'Gold Making' },
    { label: 'Polki Making', key: 'Polki Making' },
    { label: 'Victorian Making', key: 'Victorian Making' },
  ];
  // Gold prices keys
  const goldKeys = [
    { label: '14k', key: '14k' },
    { label: '18k', key: '18k' },
    { label: '22k', key: '22k' },
  ];

  // Wastage key
  const wastageKey = { label: 'Wastage (%)', key: 'wastage' };

  // Get categories
  const makingCat = getCategory('making');
  const makingCatInit = getInitialCategory('making');
  const goldCat = getCategory('prices');
  const goldCatInit = getInitialCategory('prices');
  const wastageCat = getCategory('wastage');
  const wastageCatInit = getInitialCategory('wastage');

  return (
    <div className="updateprices-container">
      <div className="headingup">
        <h2 className="updateprices-heading">Update Prices</h2>
        <button className="savechanges" onClick={handleSaveChanges} disabled={isLoading}>
          Save Changes
        </button>
      </div>
      {isLoading ? (
        <p className="updateprices-loading">Loading...</p>
      ) : (
        <div className="updateprices-simple-table">
          {/* Making Charges */}
          <div className="updateprices-category">
            <h3>Making Charges</h3>
            {makingKeys.map(({ label, key }) => (
              <div className="updateprices-item-row" key={key}>
                <label className="updateprices-item-label">{label}</label>
                <input
                  type="number"
                  value={makingCat[key] ?? ''}
                  onChange={(e) => handleInputChange('making', key, Number(e.target.value))}
                  className={`updateprices-input${
                    makingCat[key] != makingCatInit[key] ? ' updateprices-changed' : ''
                  }`}
                />
              </div>
            ))}
          </div>
          {/* Gold Prices */}
          <div className="updateprices-category">
            <h3>Gold Prices</h3>
            {goldKeys.map(({ label, key }) => (
              <div className="updateprices-item-row" key={key}>
                <label className="updateprices-item-label">{label}</label>
                <input
                  type="number"
                  value={goldCat[key] ?? ''}
                  onChange={(e) => handleInputChange('prices', key, Number(e.target.value))}
                  className={`updateprices-input${
                    goldCat[key] != goldCatInit[key] ? ' updateprices-changed' : ''
                  }`}
                />
              </div>
            ))}
          </div>
          {/* Wastage */}
          <div className="updateprices-category">
            <h3>Wastage</h3>
            <div className="updateprices-item-row">
              <label className="updateprices-item-label">{wastageKey.label}</label>
              <input
                type="number"
                value={wastageCat[wastageKey.key] ?? ''}
                onChange={(e) => handleInputChange('wastage', wastageKey.key, Number(e.target.value))}
                className={`updateprices-input${
                  wastageCat[wastageKey.key] != wastageCatInit[wastageKey.key] ? ' updateprices-changed' : ''
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
