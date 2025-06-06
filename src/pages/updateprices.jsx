import React, { useEffect, useState } from 'react';

export default function UpdatePrice({
  isLoading,
  setIsLoading,
  prices,
  initialPrices,
  setPrices,
  setInitialPrices,
}) {
  const [editingCategory, setEditingCategory] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [newItem, setNewItem] = useState({
    category: '',
    itemName: '',
    values: ['', '', ''],
    unit: 'gm',
  });

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://apj-quotation-backend.vercel.app/getAllPrices')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setPrices(data.PRICES);
  //         setInitialPrices(JSON.parse(JSON.stringify(data.PRICES)));
  //         console.log('[Initial Load] Prices:', data.PRICES);
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((err) => console.error('❌ Error fetching prices:', err))
  //     .finally(() => setIsLoading(false));
  // }, []);

  const handleInputChange = (categoryIndex, itemKey, tierIndex, value) => {
    const updatedPrices = [...prices];
    const oldValue = updatedPrices[categoryIndex][itemKey][tierIndex];
    updatedPrices[categoryIndex][itemKey][tierIndex] = value;
    setPrices(updatedPrices);

    console.log(`[Change Detected]`);
    console.log(`→ Category: ${updatedPrices[categoryIndex].docname}`);
    console.log(`→ Item: ${itemKey}`);
    console.log(`→ Tier: ${tierIndex + 1}`);
    console.log(`→ Old: ${oldValue} → New: ${value}`);
    console.log(`→ Updated Entry:`, updatedPrices[categoryIndex][itemKey]);
  };

  const handleDeleteItem = (categoryIndex, itemKey) => {
    const updatedPrices = [...prices];
    delete updatedPrices[categoryIndex][itemKey];
    setPrices(updatedPrices);
    console.log(`[Item Deleted]`);
    console.log(`→ Category: ${updatedPrices[categoryIndex].docname}`);
    console.log(`→ Deleted Item: ${itemKey}`);
    console.log(`→ Updated Category:`, updatedPrices[categoryIndex]);
  };

  const handleEditCategory = (docname) => {
    setEditingCategory((prev) => (prev === docname ? null : docname));
    console.log(
      `[Edit Mode] ${docname} is now ${
        editingCategory === docname ? 'closed' : 'open'
      }`
    );
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    console.log('[Saving Changes] Final prices to send:', prices);
    fetch('https://apj-quotation-backend.vercel.app/updatePrices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ PRICES: prices }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('[Server Response]', data);
        if (data.success) {
          alert('✅ Prices updated successfully.');
          setInitialPrices(JSON.parse(JSON.stringify(prices)));
          setEditingCategory(null);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert('❌ Failed to update prices.');
        }
      })
      .catch((err) => console.error('❌ Error sending updated prices:', err));
  };

  const openPopup = () => {
    setShowPopup(true);
    setNewItem({
      category: '',
      itemName: '',
      values: ['', '', ''],
      unit: 'gm',
    });
  };

  const handleAddNewItem = () => {
    const { category, itemName, values, unit } = newItem;
    if (!category || !itemName || values.some((v) => v === '')) {
      alert('⚠️ Please fill in all fields.');
      return;
    }

    const updatedPrices = [...prices];
    const index = updatedPrices.findIndex((cat) => cat.docname === category);

    if (index !== -1) {
      const keyName = `${itemName.trim()}`;
      updatedPrices[index][keyName] = values.map(Number);
      setPrices(updatedPrices);
      setShowPopup(false);

      console.log('[Item Added]');
      console.log(`→ Category: ${category}`);
      console.log(`→ Item: ${keyName}`);
      console.log(`→ Values:`, values);
    }
  };

  return (
    <div className="updateprices-container">
      <div className="headingup">
        <h2 className="updateprices-heading">Update Prices</h2>
        <button className="additem-btn" onClick={openPopup}>
          + Add Item
        </button>
        <button className="savechanges" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>

      {showPopup && (
        <div className="updprices-popup-overlay">
          <div className="updprices-popup-content">
            <h3 className="updprices-popup-heading">Add New Item</h3>

            <select
              className="updprices-popup-select"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {prices.map((cat) => (
                <option key={cat.docname} value={cat.docname}>
                  {cat.docname}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="updprices-popup-input"
              placeholder="Item Name"
              value={newItem.itemName}
              onChange={(e) =>
                setNewItem({ ...newItem, itemName: e.target.value })
              }
            />

            <div className="updprices-popup-tier-inputs">
              {newItem.values.map((val, i) => (
                <input
                  key={i}
                  type="number"
                  placeholder={`Tier ${i + 1}`}
                  value={val}
                  className="updprices-popup-tier-input"
                  onChange={(e) => {
                    const updated = [...newItem.values];
                    updated[i] = e.target.value;
                    setNewItem({ ...newItem, values: updated });
                  }}
                />
              ))}
            </div>

            <select
              className="updprices-popup-select"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
            >
              <option value="gm">gm</option>
              <option value="ct">ct</option>
              <option value="%">%</option>
            </select>

            <div className="btns">
              <button
                className="updprices-popup-addbtn"
                onClick={handleAddNewItem}
              >
                Add
              </button>
              <button
                className="updprices-popup-cancelbtn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="updateprices-loading">Loading...</p>
      ) : (
        <>
          <div className="topheaderupd updateprices-items">
            <div className="updateprices-item-row">
              <label className="updateprices-item-label l1">Item name</label>
              <div className="updateprices-input-group">
                <div className="Q3">Q3 : Owner</div>
                <div className="Q3">Q2 : RQ</div>
                <div className="Q3">Q1 : Highest</div>
              </div>
            </div>
          </div>
          {prices.map((category, categoryIndex) => (
            <div key={category.docname} className="updateprices-category">
              <div className="updateprices-category-header">
                <h3>{category.docname}</h3>
                <button
                  className="updateprices-edit-button"
                  onClick={() => handleEditCategory(category.docname)}
                >
                  {editingCategory === category.docname ? 'Close' : 'Edit'}
                </button>
              </div>
              <div className="updateprices-items">
                {Object.entries(category).map(([itemKey, values]) => {
                  if (itemKey === 'docname') return null;
                  return (
                    <div key={itemKey} className="updateprices-item-row">
                      <label className="updateprices-item-label">
                        {itemKey}
                      </label>
                      <div className="updateprices-input-group">
                        {values.map((value, tierIndex) => {
                          const isChanged =
                            initialPrices?.[categoryIndex]?.[itemKey]?.[
                              tierIndex
                            ] != value;
                          return (
                            <input
                              key={tierIndex}
                              type="number"
                              value={value}
                              onChange={(e) =>
                                handleInputChange(
                                  categoryIndex,
                                  itemKey,
                                  tierIndex,
                                  e.target.value
                                )
                              }
                              className={`updateprices-input ${
                                isChanged ? 'updateprices-changed' : ''
                              }`}
                              disabled={editingCategory !== category.docname}
                            />
                          );
                        })}
                        {editingCategory === category.docname && (
                          <button
                            className="updateprices-delete-button"
                            onClick={() =>
                              handleDeleteItem(categoryIndex, itemKey)
                            }
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
