import { useState, useEffect } from 'react';

export default function DraftPage({
  onPriceClick,
  isLoading,
  setIsLoading,
  data,
  setSelectedItem,
  selectedItem,
  setSelectedPriceIndex,
  selectedPriceIndex,
  setActiveTab,
  setedititem,
  edititem,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Items');

  console.log(data);

  // Extract unique categories
  const subcategories = Array.from(
    new Set(data.map((item) => item.subcategory))
  );

  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Filter data by category and search term
  const filteredData = sortedData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Items' || item.subcategory === selectedCategory;
    const matchesSearch = item.productId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  async function additem(item) {
    const finaldata = {
      category: item.category,
      subcategory: item.subcategory,
      goldpurity: item.goldpurity,
      netweight: parseFloat(item.netweight || 0), // NEW: Ensure proper number format
      grossWeight: item.grossWeight,
      totalprice: item.finalPrice || item.totalprice,
      finalPrice: item.finalPrice || item.totalprice, // NEW: Add finalPrice field
      itemsUsed: item.itemsUsed,
      gst: 3,
      imagelink: item.imagelink,
      productId: item.productId,
      making: item.making,
      // NEW: Include manual making charges from draft
      manualMakingCharges: item.manualMakingCharges || 0,
    };

    console.log('🔍 Validated Final Data:', finaldata);

    try {
      setIsLoading(true);

      // Add item
      const response = await fetch(
        'https://apj-quotation-backend.vercel.app/addItem',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finaldata),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error('❌ Failed to add item:', result);
        alert(`Error adding item: ${result.message}`);
        return;
      }

      console.log('✅ Item added successfully:', result);
      alert(`✅ ${result.message}`);

      // Delete draft
      const draftDeleteUrl = `https://apj-quotation-backend.vercel.app/deleteDraft/productId=${encodeURIComponent(
        finaldata.productId
      )}`;
      const response3 = await fetch(draftDeleteUrl);

      const deleteResult = await response3.json();

      if (!response3.ok) {
        console.warn('⚠️ Draft deletion failed:', deleteResult);
        alert(`Warning: ${deleteResult.message}`);
      } else {
        console.log(`🗑️ Draft deleted: ${deleteResult.message}`);
      }

      // Switch tab and refresh
      setActiveTab('home');
      setTimeout(() => window.location.reload(), 300);
    } catch (error) {
      console.error('❌ Network/Server Error:', error);
      alert(
        'Something went wrong while saving the item. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  }

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
        `https://apj-quotation-backend.vercel.app/deleteDraft/productId=${encodeURIComponent(
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

  return (
    <div className="homescreen">
      {/* Search Bar */}
      <div className="searchdiv">
        <div className="searchinp">
          <img src="/searchicon.png" alt="" className="searchicon" />
          <input
            type="text"
            name="searchinput"
            id="searchinput"
            className="searchinput"
            placeholder="Search with Product Code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Dynamic Categories */}
      <div className="categoriesdiv">
        <div
          className={`category ${
            selectedCategory === 'All Items' ? 'catactive' : ''
          }`}
          onClick={() => setSelectedCategory('All Items')}
        >
          <img src="/allitems.png" alt="caticon" className="caticon" />
          <div className="cattag">All Items</div>
        </div>
        {subcategories.map((cat) => (
          <div
            key={cat}
            className={`category ${
              selectedCategory === cat ? 'catactive' : ''
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            <img
              src={`/${cat.toLowerCase()}.png`}
              alt={`${cat} icon`}
              className="caticon"
            />
            <div className="cattag">{cat}</div>
          </div>
        ))}
      </div>

      <div className="additemheadingdraft">Draft Page</div>
      {/* Render Filtered Items (optional section) */}
      <div className="itemsdiv">
        {filteredData.map((item) => (
          <div className="comp">
            <data className="itemcard">
              <div className="first">
                <img
                  src={item.imagelink}
                  alt="Product Image"
                  className="productimage"
                />
              </div>
              <div className="second">
                <div className="pillsection">
                  <div className="pilldiv">
                    <div className="pill">{item.category}</div>
                    <div className="pill">{item.subcategory}</div>
                  </div>
                  <div className="editbutton">
                    <div
                      className="btn"
                      onClick={() => {
                        console.log(item + 'Edit Item');
                        setedititem(item);
                        setActiveTab('editdraft');
                      }}
                    >
                      <img
                        src="/edit.png"
                        alt="editicon"
                        className="editicon"
                      />
                    </div>
                    <div
                      className="btn"
                      onClick={() => {
                        additem(item);
                      }}
                    >
                      <img src="/add.png" alt="editicon" className="editicon" />
                    </div>
                    <div
                      className="btn btnred"
                      onClick={() => {
                        handleDelete(item.productId);
                      }}
                    >
                      <img
                        src="/delete.png"
                        alt="editicon"
                        className="editicon"
                      />
                    </div>
                  </div>
                </div>
                <div className="medium">Product ID - {item.productId}</div>
                <div className="bottom">
                  <div
                    className="downloadbutton"
                    onClick={() => {
                      setSelectedItem(item);
                      setSelectedPriceIndex(0);
                      setActiveTab('productdesc');
                    }}
                  >
                    <div className="dwntag">
                      Price :{' '}
                      {Number(item.finalPrice || item.totalprice || 0).toLocaleString('en-IN', {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                    <div className="dwnicon">
                      <img
                        src="/download.png"
                        alt="download icon"
                        className="downicon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </data>
            <div className="sep"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
