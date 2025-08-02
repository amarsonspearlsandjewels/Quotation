import React, { useState, useEffect, useRef } from 'react';

export default function EditItemPage({
  isLoading,
  setIsLoading,
  pricesData,
  setActiveTab,
  setedititem,
  item,
  itemsused,
  setItemsused,
}) {
  // Static categories
  const categories = ['GOLD', 'DIAMOND', 'POLKI','VICTORIAN'];
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [grossWeight, setGrossWeight] = useState(''); // purity
  const [grossWeightAmount, setGrossWeightAmount] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');
  const [selectedItemUnit, setSelectedItemUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState(0);
  const [codeprefix, setCodePrefix] = useState('');
  const [codeSuffix, setCodeSuffix] = useState('');
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageLinkText, setImageLinkText] = useState('');
  const [polkiType, setPolkiType] = useState(0); // default
  const [manualMakingCharges, setManualMakingCharges] = useState(''); // NEW: Manual making charges input

  // Making charges from pricesData (docname: 'making')
  const makingObj = pricesData.find((p) => p.docname === 'making') || {};
  // Wastage from pricesData (docname: 'wastage')
  const wastageObj = pricesData.find((p) => p.docname === 'wastage') || {};

  // Pre-fill all fields from item prop
  useEffect(() => {
    if (item) {
      setCategory(item.category || '');
      setSubcategory(item.subcategory || '');
      setGrossWeight(item.goldpurity || '');
      setGrossWeightAmount(item.grossWeight || '');
      setSelectedItems(item.itemsUsed || []);
      setImageLinkText(item.imagelink || '');
      setPolkiType(item.making || 0);
      setCodePrefix(item.productId?.replace(/\d+$/, '') || '');
      setCodeSuffix(item.productId?.replace(/\D+/, '') || '');
      
      // NEW: Handle manual making charges for existing products
      if (item.manualMakingCharges !== undefined) {
        // If item already has manual making charges, use them
        setManualMakingCharges(item.manualMakingCharges || '');
      } else {
        // For existing products without manual making charges, calculate from old system
        // This helps workers see what the old making charges were
        let oldMakingCharges = 0;
        if (item.category === 'GOLD') {
          oldMakingCharges = (item.netweight || 0) * (makingObj['Gold Making'] || 0);
        } else if (item.category === 'DIAMOND') {
          oldMakingCharges = (item.netweight || 0) * (makingObj['Diamond Making'] || 0);
        } else if (item.category === 'POLKI') {
          oldMakingCharges = (item.netweight || 0) * (makingObj['Polki Making'] || 0);
        } else if (item.category === 'VICTORIAN') {
          oldMakingCharges = (item.netweight || 0) * (makingObj['Victorian Making'] || 0);
        }
        setManualMakingCharges(oldMakingCharges.toString());
      }
    }
  }, [item, makingObj]);

  // Subcategories (static)
  const subcategories = [
    'Necklace','Choker','Ring','Earring','Bracelet','Bangle','Vaddanam','Pendant','Champa','Nose Ring','Kada','Maang Tikka','Chain','Mangalsutra','Anklet'
  ];

  // Purity options from pricesData (docname: 'prices')
  const purityOptions = (() => {
    const pricesObj = pricesData.find((p) => p.docname === 'prices');
    if (!pricesObj) return [];
    return Object.keys(pricesObj).filter((k) => k.endsWith('k'));
  })();

  // Product code prefix (static for each category)
  const codep = {
    DIAMOND: [ 'DNS', 'DC', 'DB', 'DBRL', 'DH', 'DJ', 'DL', 'DNP', 'DRL', 'DT', 'DVAD', 'DNAT', 'EDNS','NAIL' ],
    GOLD: [ 'GNS', 'GJ', 'GL', 'GT', 'GRL', 'GB', 'GBRL', 'GC', 'BC', 'CHAMP', 'CHO', 'GUT', 'JB', 'NAIL', 'NATH', 'TIKA', 'VAD', 'MANGO', 'MS', 'TM', 'TMH' ],
    POLKI: [ 'PNS', 'PTH', 'PL', 'PCL', 'PB', 'PBRL', 'PJ', 'PR', 'PSL', 'PT', 'VNS','NAIL' ],
    VICTORIAN: [ 'PNS', 'PTH', 'PL', 'PCL', 'PB', 'PBRL', 'PJ', 'PR', 'PSL', 'PT', 'VNS','NAIL' ],
  };
  const [codeprefixlist, setcodeprefixlist] = useState([]);
  useEffect(() => {
    if (category === 'GOLD') setcodeprefixlist(codep.GOLD);
    else if (category === 'DIAMOND') setcodeprefixlist(codep.DIAMOND);
    else if (category === 'POLKI') setcodeprefixlist(codep.POLKI);
    else if (category === 'VICTORIAN') setcodeprefixlist(codep.VICTORIAN);
    else setcodeprefixlist([]);
  }, [category]);
  const finalProductCode = `${codeprefix}${codeSuffix}`;

  // Items Used logic
  const handleAddItemUsed = () => {
    if (!selectedItemName || !quantity || !price) return;
    setSelectedItems([
      ...selectedItems,
      {
        name: selectedItemName,
        unit: selectedItemUnit,
        quantity: Number(quantity),
        price: Number(price),
      },
    ]);
    setSelectedItemName('');
    setSelectedItemUnit('');
    setQuantity('');
    setPrice('');
  };
  const handleRemoveItemUsed = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };
  useEffect(() => {
    const totalPrice = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [selectedItems]);

  // Net weight calculation
  const getNetWeight = () => {
    if (!grossWeightAmount || isNaN(grossWeightAmount)) return '';
    let totalStoneWeightGms = 0;
    for (const item of selectedItems) {
      const quantity = parseFloat(item.quantity);
      const unit = (item.unit || 'ct').toLowerCase();
      // If unit is gram/gms, use quantity directly as grams
      // If unit is carat/ct, convert to grams (0.2g per carat)
      const weightInGms = unit === 'gram' || unit === 'gms' ? quantity : quantity * 0.2;
      totalStoneWeightGms += weightInGms;
    }
    return (grossWeightAmount - totalStoneWeightGms).toFixed(2);
  };
  const netWeight = getNetWeight();

  // Wastage percent
  const goldWastage = wastageObj.wastage || 0;

  // Get gold rate for selected purity
  const getGoldRate = (purity) => {
    const pricesObj = pricesData.find((p) => p.docname === 'prices');
    if (!pricesObj) return 0;
    return pricesObj[purity] || 0;
  };

  // Making charges for each category
  // COMMENTED OUT: Original automatic making charges calculation
  // const getMakingCharges = () => {
  //   if (category === 'GOLD') return makingObj['Gold Making'] || 0;
  //   if (category === 'DIAMOND') return makingObj['Diamond Making'] || 0;
  //   if (category === 'POLKI') return makingObj['Polki Making'] || 0;
  //   if (category === 'VICTORIAN') return makingObj['Victorian Making'] || 0;
  //   return 0;
  // };

  // NEW: Manual making charges - user enters final amount
  const getMakingCharges = () => {
    return Number(manualMakingCharges) || 0;
  };

  // Calculation logic
  const calcWastage = (percent, base) => (Number(percent) * Number(base)) / 100;

  // Gold calculation
  const goldRate = getGoldRate(grossWeight);
  const goldAmt = Number(netWeight) && Number(goldRate) ? Number(netWeight) * Number(goldRate) : 0;
  const wastageAmt = Number(goldWastage) && goldAmt ? calcWastage(goldWastage, goldAmt) : 0;
  // COMMENTED OUT: Original making charges calculation based on weight
  // const makingAmt = Number(getMakingCharges()) && Number(netWeight) ? Number(getMakingCharges()) * Number(netWeight) : 0;
  // NEW: Manual making charges - user enters final amount directly
  const makingAmt = Number(getMakingCharges()) || 0;
  const itemsUsedAmt = selectedItems.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

  // Subtotal: gold + wastage + making + items used
  const subtotal = goldAmt + wastageAmt + makingAmt + itemsUsedAmt;
  const gstAmt = calcWastage(3, subtotal);
  const grandTotal = subtotal + gstAmt;

  // Image upload logic (unchanged)
  const openFilePicker = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file.');
    }
  };

  // Save handler (call /addeditedItem)
  async function handleSave() {
    if (!category || !subcategory || !grossWeight || !netWeight || !grossWeightAmount || !finalProductCode || selectedItems.length === 0) {
      alert('All fields must be filled and at least one item must be selected.');
      return;
    }
    setIsLoading(true);
    let imageUrl = imageLinkText;
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'apjimagedatabase');
      formData.append('folder', 'apjimages');
      try {
        const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dmqvtwlv2/image/upload', { method: 'POST', body: formData });
        const uploadResult = await uploadResponse.json();
        if (!uploadResult.secure_url) {
          setIsLoading(false);
          alert('Image upload failed. Please try again.');
          return;
        }
        imageUrl = uploadResult.secure_url;
        setUploadedUrl(imageUrl);
        setImageLinkText(imageUrl);
      } catch (error) {
        setIsLoading(false);
        alert('Something went wrong during image upload.');
        return;
      }
    }
    // --- Calculate totalprice/finalPrice as per additem logic ---
    // 1. Stone/materials
    let materialTotal = 0;
    let totalStoneWeightCts = 0;
    let totalStoneWeightGms = 0;
    for (const mat of selectedItems) {
      const quantity = parseFloat(mat.quantity);
      const price = parseFloat(mat.price || 0);
      const unit = (mat.unit || 'ct').toLowerCase();
      const weightInGms = unit === 'gram' || unit === 'gms' ? quantity : quantity * 0.2;
      const matPrice = quantity * price;
      materialTotal += matPrice;
      if (unit === 'ct') totalStoneWeightCts += quantity;
      totalStoneWeightGms += weightInGms;
    }
    // 2. Net weight
    const gross = parseFloat(grossWeightAmount);
    const netWeightBeforeWastage = gross - totalStoneWeightGms;
    // 3. Wastage
    const wastagePercent = parseFloat(pricesData.find(p => p.docname === 'wastage')?.wastage || 0);
    const wastage = (wastagePercent / 100) * netWeightBeforeWastage;
    // 4. Final netWeight = metal part only
    const netWeightFinal = netWeightBeforeWastage - wastage;
    // 5. Gold price
    const goldPrice = parseFloat(pricesData.find(p => p.docname === 'prices')?.[grossWeight] || 0);
    const goldBase = goldPrice * netWeightFinal;
    // 6. Making charges
    let makingCharge = 0;
    let makingTypeUsed = polkiType;
    // COMMENTED OUT: Original complex making charges calculation
    // if (category === 'POLKI') {
    //   const polki = netWeightFinal * (pricesData.find(p => p.docname === 'making')?.['Polki Making'] || 0);
    //   makingCharge = polki;
    // }
    // else if (category === 'VICTORIAN') {
    //   makingCharge = netWeightFinal * (pricesData.find(p => p.docname === 'making')?.['Victorian Making'] || 0);
    // } else if (category === 'DIAMOND') {
    //   makingCharge = netWeightFinal * (pricesData.find(p => p.docname === 'making')?.['Diamond Making'] || 0);
    // } else {
    //   makingCharge = netWeightFinal * (pricesData.find(p => p.docname === 'making')?.['Gold Making'] || 0);
    // }
    // NEW: Manual making charges - user enters final amount directly
    makingCharge = Number(manualMakingCharges) || 0;
    // 7. Subtotal and GST
    const subtotal = goldBase + wastage * goldPrice + makingCharge + materialTotal;
    const gstPercent = 3;
    const calculatedPrice = parseFloat((subtotal * (1 + gstPercent / 100)).toFixed(1));
    // --- Prepare data for API ---
    const data = {
      category,
      subcategory,
      goldpurity: grossWeight,
      grossWeight: grossWeightAmount,
      gst: gstPercent,
      itemsUsed: selectedItems,
      finalPrice: calculatedPrice,
      totalprice: calculatedPrice,
      making: category === 'POLKI' ? polkiType : 0,
      netweight: parseFloat(netWeightFinal.toFixed(2)),
      imagelink: imageUrl,
      productId: finalProductCode,
      // NEW: Include manual making charges in the data
      manualMakingCharges: Number(manualMakingCharges) || 0,
      pricingBreakdown: {
        goldCharges: parseFloat(goldBase.toFixed(1)),
        wastageCharges: parseFloat((wastage * goldPrice).toFixed(1)),
        makingCharges: parseFloat(makingCharge.toFixed(1)),
        materialCharges: parseFloat(materialTotal.toFixed(1)),
        gstPercent,
        finalPrice: calculatedPrice,
      },
    };
    console.log('🔍 Validated Final Data:', data);
    try {
      setIsLoading(true);
      const response = await fetch('https://apj-quotation-backend.vercel.app/addeditedItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setIsLoading(false);
      setTimeout(() => { window.location.reload(); }, 300);
      if (!response.ok) {
        alert(`Error: ${result.message}`);
        return;
      }
      alert(`✅ ${result.message}`);
      setActiveTab('home');
    } catch (error) {
      alert('Something went wrong while saving the item. Please try again later.');
    }
  }

  // --- RENDER ---
  return (
    <div className="additems-container">
      <div className="additemheading">Edit Product</div>
      <div className="additems-field">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="additems-input"
        >
          <option value="">Select the Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="additems-field">
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="additems-input"
        >
          <option value="">Select the Type of Jewellery</option>
          {subcategories.map((subcat) => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
      </div>
      <div className="additemheadingsmall">Product Code - {finalProductCode}</div>
      <div className="grossweightsection">
        <select
          value={codeprefix}
          onChange={(e) => setCodePrefix(e.target.value)}
          className="additems-input"
        >
          <option value="">Select Code Prefix</option>
          {codeprefixlist.map((pre) => (
            <option key={pre} value={pre}>{pre}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Code"
          className="grosswtinp"
          value={codeSuffix}
          onChange={(e) => setCodeSuffix(e.target.value)}
        />
      </div>
      <div className="additemheadingsmall">Gross Weight</div>
      <div className="grossweightsection">
        <select
          value={grossWeight}
          onChange={(e) => setGrossWeight(e.target.value)}
          className="additems-input"
        >
          <option value="">Select the Purity</option>
          {purityOptions.map((pur) => (
            <option key={pur} value={pur}>{pur}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Weight"
          className="grosswtinp"
          value={grossWeightAmount}
          onChange={(e) => setGrossWeightAmount(e.target.value)}
        />
        <div className="unit">gms</div>
      </div>
      <div className="additemheadingsmall">Items Used</div>
      <div className="itemsused-section">
        {selectedItems.map((item, index) => (
          <div key={index} className="itemsused-row">
            <div className="item-name">{item.name}</div>
            <div className="unit">{item.unit}</div>
            <input
              type="number"
              value={item.quantity}
              onChange={e => {
                const updated = [...selectedItems];
                updated[index].quantity = Number(e.target.value);
                setSelectedItems(updated);
              }}
              className="item-qty-input"
              placeholder="Qty"
            />
            <input
              type="number"
              value={item.price}
              onChange={e => {
                const updated = [...selectedItems];
                updated[index].price = Number(e.target.value);
                setSelectedItems(updated);
              }}
              className="item-qty-input"
              placeholder="Price"
            />
            <button onClick={() => handleRemoveItemUsed(index)} className="delete-btn">
              <img src="/delete.png" alt="Delete Icon" className="delicon" />
            </button>
            <div className="item-total">
              ₹{(item.quantity * item.price).toLocaleString()}
            </div>
          </div>
        ))}
        <div className="additem-dropdown-row">
          <select
            value={selectedItemName}
            onChange={e => {
              const name = e.target.value;
              setSelectedItemName(name);
              const found = itemsused.find(i => i.name === name);
              setSelectedItemUnit(found ? found.unit : '');
            }}
            className="additems-input"
          >
            <option value="">Select item</option>
            {itemsused.map((opt, idx) => (
              <option key={opt.name + idx} value={opt.name}>{opt.name} ({opt.unit})</option>
            ))}
          </select>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="item-qty-input"
            placeholder="Qty"
          />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="item-qty-input"
            placeholder="Price"
          />
          <button onClick={handleAddItemUsed} className="add-btn">Add</button>
        </div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall2">Net Weight</div>
        <div className="netwtval">{netWeight ? `${netWeight} gms` : '-'}</div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall2">+ Wastage</div>
        <div className="netwtval">{goldWastage} %</div>
        <div className="netwtval finprice">{calcWastage(goldWastage, getGoldRate(grossWeight) * netWeight).toFixed(1)} ₹</div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall2">x {grossWeight ? grossWeight : '-'} Rate</div>
        <div className="netwtval">{getGoldRate(grossWeight)} ₹</div>
        <div className="netwtval finprice">{(getGoldRate(grossWeight) * netWeight).toFixed(1)} ₹</div>
      </div>
      {/* COMMENTED OUT: Original automatic making charges display */}
      {/* <div className="netwt">
        <div className="additemheadingsmall2">+ Making Charges</div>
        <div className="netwtval">{getMakingCharges()} ₹/gm</div>
        <div className="netwtval finprice">{(getMakingCharges() * netWeight).toFixed(1)} ₹</div>
      </div> */}
      {/* NEW: Manual making charges input field */}
      <div className="netwt">
        <div className="additemheadingsmall2">+ Making Charges</div>
        <input
          type="number"
          placeholder="Enter Making Charges"
          className="grosswtinp"
          value={manualMakingCharges}
          onChange={(e) => setManualMakingCharges(e.target.value)}
        />
        <div className="unit">₹</div>
      </div>
      {/* {category === 'POLKI' && (
        <div className="netwt">
          <select
            name="polki making"
            id="polkimaking"
            className="additems-input polkiselect"
            value={polkiType}
            onChange={e => setPolkiType(Number(e.target.value))}
          >
            <option value={0}>POLKI MC</option>
            <option value={1}>VICTORIAN MC</option>
          </select>
        </div>
      )} */}
      <div className="netwt">
        <div className="additemheadingsmall">SubTotal</div>
        <div className="netwtval finprice">{subtotal.toFixed(1)} ₹</div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall2">3% GST</div>
        <div className="netwtval finprice">{gstAmt.toFixed(1)} ₹</div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall">Grand Total</div>
        <div className="netwtval finprice">{grandTotal.toFixed(1)} ₹</div>
      </div>
      <div className="buttonsectionaddpage">
        <div className="savebutton" onClick={handleSave}>Save Changes</div>
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <button disabled={uploadedUrl} className="savebutton" onClick={openFilePicker}>Upload Picture</button>
      </div>
      {previewUrl && (
        <div style={{ marginTop: 10 }} className="prevdiv">
          <img src={previewUrl} alt="Preview" className="previmg" />
        </div>
      )}
    </div>
  );
}
