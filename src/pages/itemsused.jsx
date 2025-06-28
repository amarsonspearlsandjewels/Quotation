import React, { useState } from 'react';
import '../App.css';

export default function ItemsUsed({ itemsused, setItemsused, isLoading, setIsLoading }) {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', unit: 'ct' });

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      setItemsused([...itemsused, { ...newItem, id: Date.now() }]);
      setNewItem({ name: '', unit: 'ct' });
      setShowModal(false);
    }
  };

  const handleRemoveItem = (index) => {
    setItemsused(itemsused.filter((_, i) => i !== index));
  };

  const handleSaveToDatabase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://apj-quotation-backend.vercel.app/addItemsUsed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: itemsused }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Items saved successfully!');
      } else {
        alert('Failed to save items: ' + data.message);
      }
    } catch (error) {
      alert('Error saving items to database');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="itemsusedpage-container">
      {/* Sticky Add/Save Bar */}
      <div className="itemsusedpage-sticky-bar">
        <button
          className="itemsusedpage-add-btn"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
        <button
          className="itemsusedpage-save-btn"
          onClick={handleSaveToDatabase}
          disabled={isLoading || itemsused.length === 0}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Table Header */}
      <div className="itemsusedpage-table-header">
        <div>Item Name</div>
        <div>Unit</div>
        <div>Actions</div>
      </div>

      {/* Table Body */}
      <div className="itemsusedpage-table-body">
        {itemsused.length === 0 ? (
          <div className="itemsusedpage-empty-state">
            No items yet. Click Add to add your first item.
          </div>
        ) : (
          itemsused.map((item, index) => (
            <div key={item.id || index} className="itemsusedpage-table-row">
              <div className="itemsusedpage-table-cell">{item.name}</div>
              <div className="itemsusedpage-table-cell">{item.unit}</div>
              <div className="itemsusedpage-table-cell">
                <button
                  className="itemsusedpage-delete-btn"
                  onClick={() => handleRemoveItem(index)}
                  aria-label="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="itemsusedpage-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="itemsusedpage-modal" onClick={e => e.stopPropagation()}>
            <div className="itemsusedpage-modal-header">
              <h2>Add Item</h2>
              <button
                className="itemsusedpage-close-btn"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="itemsusedpage-modal-body">
              <div className="itemsusedpage-form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Enter item name"
                  autoFocus
                />
              </div>
              <div className="itemsusedpage-form-group">
                <label>Unit</label>
                <select
                  value={newItem.unit}
                  onChange={e => setNewItem({ ...newItem, unit: e.target.value })}
                >
                  <option value="ct">Carats (ct)</option>
                  <option value="gms">Grams (gms)</option>
                </select>
              </div>
            </div>
            <div className="itemsusedpage-modal-footer">
              <button
                className="itemsusedpage-cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="itemsusedpage-add-item-btn"
                onClick={handleAddItem}
                disabled={!newItem.name.trim()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}