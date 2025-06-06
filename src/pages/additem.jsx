import React, { useState, useEffect, useRef } from 'react';

export default function AddItemPage({
  isLoading,
  setIsLoading,
  pricesData,
  setActiveTab,
}) {
  // const [pricesData, setPricesData] = useState([]);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [grossWeightAmount, setGrossWeightAmount] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [total, setTotal] = useState(0);
  const [codeprefix, setCodePrefix] = useState('');
  const [codeprefixlist, setcodeprefixlist] = useState([]);
  const [codeSuffix, setCodeSuffix] = useState('');
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageLinkText, setImageLinkText] = useState('');
  const [polkiType, setPolkiType] = useState(0); // default
  // const [makingT, setMakingT] = useState(0);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // 📷 Handle file input & show preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file.');
    }
  };

  // ⬆️ Upload to Cloudinary
  const uploadToCloudinary = async () => {
    if (!imageFile) {
      alert('No image selected');
      return;
    }

    setUploading(true);
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'apjimagedatabase'); // 🔁 Replace with your preset name
    formData.append('folder', 'apjimages'); // Optional

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dmqvtwlv2/image/upload', // 🔁 Replace with your cloud name
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
        setImageLinkText(data.secure_url);
        console.log('Image uploaded to:', data.secure_url);
      } else {
        console.error('Upload failed:', data);
      }
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setUploading(false);
      setIsLoading(false);
    }
  };

  const subcategories = [
    'Necklace',
    'Ring',
    'Earring',
    'Bracelet',
    'Bangle',
    'Pendant',
    'Anklet',
    'Kada',
    'Maang Tikka',
    'Chain',
  ];

  const getAllMaterialOptions = () => {
    const materials = [];
    pricesData.forEach((cat) => {
      Object.entries(cat).forEach(([key, value]) => {
        if (key !== 'docname' && key !== 'MAKING' && key !== 'WASTAGE') {
          materials.push({
            label: key,
            category: cat.docname,
            price: Number(value[0]),
          });
        }
      });
    });
    return materials;
  };

  const allOptions = getAllMaterialOptions();

  const handleAddItem = () => {
    if (!newItem) return;
    const item = allOptions.find((opt) => opt.label === newItem);
    if (!item) return;
    setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    setNewItem('');
  };

  const updateQuantity = (index, qty) => {
    const updated = [...selectedItems];
    updated[index].quantity = Number(qty);
    setSelectedItems(updated);
  };

  const deleteItem = (index) => {
    const updated = [...selectedItems];
    updated.splice(index, 1);
    setSelectedItems(updated);
  };

  const getNetWeight = () => {
    if (!grossWeightAmount || isNaN(grossWeightAmount)) return '';
    const totalCtQty = selectedItems.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    const deduction = totalCtQty * 0.2;
    return (grossWeightAmount - deduction).toFixed(2);
  };

  const netWeight = getNetWeight();

  function getWastage(n) {
    let goldWastage =
      pricesData.find((cat) => cat.docname === 'GOLD')?.WASTAGE?.[n] ?? '-';
    return goldWastage;
  }

  let goldWastage = getWastage(0);
  function getGoldRate(k, n) {
    const goldRate =
      pricesData.find((cat) => cat.docname === 'GOLD')?.[k]?.[n] ?? '-';
    return goldRate;
  }

  function getMakingCharges(k, i, n) {
    var goldRate = '';
    if (i === 'POLKI') {
      if (n == 0) {
        goldRate =
          pricesData.find((cat) => cat.docname === i)?.POLKIMC?.[k] ?? '-';
      } else {
        goldRate =
          pricesData.find((cat) => cat.docname === i)?.VICTORIANMC?.[k] ?? '-';
      }
    } else {
      goldRate =
        pricesData.find((cat) => cat.docname === i)?.MAKING?.[k] ?? '-';
    }
    return goldRate;
  }

  function calcWastage(k, n) {
    return (k * n) / 100;
  }

  useEffect(() => {
    const totalPrice = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [selectedItems]);

  const codes = ['GNS', 'DNS', 'PNS'];
  const codep = {
    DIAMOND: [
      'DNS',
      'DC',
      'DB',
      'DBRL',
      'DH',
      'DJ',
      'DL',
      'DNP',
      'DRL',
      'DT',
      'DVAD',
      'DNAT',
      'EDNS',
    ],
    GOLD: [
      'GNS',
      'GJ',
      'GL',
      'GT',
      'GRL',
      'GB',
      'GBRL',
      'GC',
      'BC',
      'CHAMP',
      'CHO',
      'GUT',
      'JB',
      'NARL',
      'NATH',
      'TIKA',
      'VAD',
      'MANGO',
      'MS',
      'TM',
      'TMH',
      'VNS',
    ],
    POLKI: ['PNS', 'PTH', 'PL', 'PCL', 'PB', 'PBRL', 'PJ', 'PR', 'PSL', 'PT'],
  };
  const finalProductCode = `${codeprefix}${codeSuffix}`;

  useEffect(() => {
    if (category === 'GOLD') setcodeprefixlist(codep.GOLD);
    else if (category === 'DIAMONDS') setcodeprefixlist(codep.DIAMOND);
    else if (category === 'POLKI') setcodeprefixlist(codep.POLKI);
  }, [category]);

  function calculateSelectedTotal(i) {
    let total = 0;

    selectedItems.forEach((item) => {
      const { label, category, quantity } = item;

      // Find the matching category object in pricesData
      const categoryData = pricesData.find((cat) => cat.docname === category);
      if (!categoryData) {
        console.warn(`Category "${category}" not found in pricesData.`);
        return;
      }

      // Get the price array for the given label
      const priceArray = categoryData[label];
      if (!priceArray || !Array.isArray(priceArray)) {
        console.warn(`Item "${label}" not found in category "${category}".`);
        return;
      }

      // Convert the price at index i to a number
      const price = Number(priceArray[i]);
      if (isNaN(price)) {
        console.warn(
          `Price for "${label}" at index ${i} is not a valid number.`
        );
        return;
      }

      // Calculate total for this item
      const itemTotal = price * quantity;
      total += itemTotal;
    });

    return total;
  }

  const tier1price = calculateSelectedTotal(0);
  const tier2price = calculateSelectedTotal(1);
  const tier3price = calculateSelectedTotal(2);

  function calculateFirstPrice(goldpurity, gst) {
    console.log(selectedItems);
    console.log(pricesData);
    const goldamount = netWeight * getGoldRate(goldpurity, 0);
    console.log(goldamount);
    const wastagepercent = getWastage(0);
    let wasteandgold = goldamount + (wastagepercent / 100) * goldamount;
    console.log(wasteandgold);
    let makingcharges = 0;
    if (category === 'POLKI') {
      if (polkiType === 0) {
        makingcharges = getMakingCharges(0, category, 0);
      } else {
        makingcharges = getMakingCharges(0, category, 1);
      }
    } else {
      makingcharges = getMakingCharges(0, category, 0);
    }
    let totalmaking = makingcharges * netWeight;
    console.log(totalmaking);
    console.log(wasteandgold + totalmaking);
    let totalbeforetax = wasteandgold + totalmaking + tier1price;
    let gstamt = (gst / 100) * totalbeforetax;
    console.log(gstamt);
    let finaltotal = gstamt + totalbeforetax;
    console.log(finaltotal.toFixed(1) + '- Final Total');
    // console.log(totalbeforetax + gstamt);
    return finaltotal.toFixed(1);
  }

  function calculateSecondPrice(goldpurity, gst) {
    console.log(selectedItems);
    console.log(pricesData);
    const goldamount = netWeight * getGoldRate(goldpurity, 1);
    console.log(goldamount);
    const wastagepercent = getWastage(1);
    let wasteandgold = goldamount + (wastagepercent / 100) * goldamount;
    console.log(wasteandgold);
    let makingcharges = 0;
    if (category === 'POLKI') {
      if (polkiType === 0) {
        makingcharges = getMakingCharges(1, category, 0);
      } else {
        makingcharges = getMakingCharges(1, category, 1);
      }
    } else {
      makingcharges = getMakingCharges(1, category, 0);
    }
    let totalmaking = makingcharges * netWeight;
    console.log(totalmaking);
    console.log(wasteandgold + totalmaking);
    let totalbeforetax = wasteandgold + totalmaking + tier2price;
    let gstamt = (gst / 100) * totalbeforetax;
    console.log(gstamt);
    const finaltotal = gstamt + totalbeforetax;
    console.log(finaltotal.toFixed(1));
    // console.log(totalbeforetax + gstamt);
    return finaltotal.toFixed(1);
  }

  function calculateThirdPrice(goldpurity, gst) {
    console.log(selectedItems);
    console.log(pricesData);
    const goldamount = netWeight * getGoldRate(goldpurity, 2);
    console.log(goldamount);
    const wastagepercent = getWastage(2);
    let wasteandgold = goldamount + (wastagepercent / 100) * goldamount;
    console.log(wasteandgold);
    let makingcharges = 0;
    if (category === 'POLKI') {
      if (polkiType === 0) {
        makingcharges = getMakingCharges(2, category, 0);
      } else {
        makingcharges = getMakingCharges(2, category, 1);
      }
    } else {
      makingcharges = getMakingCharges(2, category, 0);
    }

    let totalmaking = makingcharges * netWeight;
    console.log(totalmaking);
    console.log(wasteandgold + totalmaking);
    let totalbeforetax = wasteandgold + totalmaking + tier3price;
    let gstamt = (gst / 100) * totalbeforetax;
    console.log(gstamt);
    const finaltotal = gstamt + totalbeforetax;
    console.log(finaltotal.toFixed(1));
    // console.log(totalbeforetax + gstamt);
    return finaltotal.toFixed(1);
  }

  // useEffect(() => {
  //   if (category === 'POLKI') {
  //     setMakingT(polkiType == 1 ? 1 : 0);
  //   } else {
  //     setMakingT(0);
  //   }
  // }, [category, polkiType]);

  async function handleSave() {
    // Frontend Validation
    if (
      !category ||
      !subcategory ||
      !grossWeight ||
      !netWeight ||
      !grossWeightAmount ||
      // !imageLinkText ||
      !finalProductCode ||
      selectedItems.length === 0
    ) {
      alert(
        'All fields must be filled and at least one item must be selected.'
      );
      return;
    }

    setIsLoading(true);

    // 🔄 Step 1: Upload image to Cloudinary
    let imageUrl = '';
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'apjimagedatabase'); // your preset
    formData.append('folder', 'apjimages'); // optional

    try {
      const uploadResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dmqvtwlv2/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.secure_url) {
        setIsLoading(false);
        console.error('❌ Image upload failed:', uploadResult);
        alert('Image upload failed. Please try again.');
        return;
      }

      imageUrl = uploadResult.secure_url;
      console.log(imageUrl);
      setUploadedUrl(imageUrl);
      setImageLinkText(imageUrl);
      console.log('✅ Image uploaded:', imageUrl);
    } catch (error) {
      setIsLoading(false);
      console.error('❌ Error uploading image:', error);
      alert('Something went wrong during image upload.');
      return;
    }
    var making = 0;
    if (polkiType === 1) {
      making = 1;
    }

    // Construct final data object
    const data = {
      category: category,
      subcategory: subcategory,
      goldpurity: grossWeight,
      netweight: netWeight,
      grossWeight: grossWeightAmount,
      tier1price: calculateFirstPrice(grossWeight, 3),
      tier2price: calculateSecondPrice(grossWeight, 3),
      tier3price: calculateThirdPrice(grossWeight, 3),
      itemsUsed: selectedItems,
      gst: 3,
      imagelink: imageUrl,
      productId: finalProductCode,
      making: (() => {
        if (category === 'POLKI') return polkiType; // 0 or 1 for POLKI
        if (category === 'DIAMONDS') return 0; // Default for diamonds
        if (category === 'GOLD') return 0; // Default for gold
        return 0; // Fallback
      })(),
    };

    console.log('🔍 Validated Final Data:', data);

    try {
      setIsLoading(true);
      const response = await fetch('https://apjapi.vercel.app/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 300);

      if (!response.ok) {
        console.error('❌ API Error:', result);
        alert(`Error: ${result.message}`);
        return;
      }

      // ✅ Success
      alert(`✅ ${result.message}`);
      console.log('✅ Item saved successfully:', result);
      setActiveTab('home');
    } catch (error) {
      console.error('❌ Network/Server Error:', error);
      alert(
        'Something went wrong while saving the item. Please try again later.'
      );
    }
  }

  async function handleDraft() {
    // Frontend Validation
    if (
      !category ||
      !subcategory ||
      !grossWeight ||
      !netWeight ||
      !grossWeightAmount ||
      // !imageLinkText ||
      !finalProductCode ||
      selectedItems.length === 0
    ) {
      alert(
        'All fields must be filled and at least one item must be selected.'
      );
      return;
    }

    setIsLoading(true);

    // 🔄 Step 1: Upload image to Cloudinary
    let imageUrl = '';
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'apjimagedatabase'); // your preset
    formData.append('folder', 'apjimages'); // optional

    try {
      const uploadResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dmqvtwlv2/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.secure_url) {
        setIsLoading(false);
        console.error('❌ Image upload failed:', uploadResult);
        alert('Image upload failed. Please try again.');
        return;
      }

      imageUrl = uploadResult.secure_url;
      console.log(imageUrl);
      setUploadedUrl(imageUrl);
      setImageLinkText(imageUrl);
      console.log('✅ Image uploaded:', imageUrl);
    } catch (error) {
      setIsLoading(false);
      console.error('❌ Error uploading image:', error);
      alert('Something went wrong during image upload.');
      return;
    }

    // Construct final data object
    const data = {
      category: category,
      subcategory: subcategory,
      goldpurity: grossWeight,
      netweight: netWeight,
      grossWeight: grossWeightAmount,
      tier1price: calculateFirstPrice(grossWeight, 3),
      tier2price: calculateSecondPrice(grossWeight, 3),
      tier3price: calculateThirdPrice(grossWeight, 3),
      itemsUsed: selectedItems,
      gst: 3,
      imagelink: imageUrl,
      productId: finalProductCode,
      making: (() => {
        if (category === 'POLKI') return polkiType; // 0 or 1 for POLKI
        if (category === 'DIAMONDS') return 0; // Default for diamonds
        if (category === 'GOLD') return 0; // Default for gold
        return 0; // Fallback
      })(),
    };

    console.log('🔍 Validated Final Data:', data);

    try {
      setIsLoading(true);
      const response = await fetch('https://apjapi.vercel.app/addDraft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 300);

      if (!response.ok) {
        console.error('❌ API Error:', result);
        alert(`Error: ${result.message}`);
        return;
      }

      // ✅ Success
      alert(`✅ ${result.message}`);
      console.log('✅ Item saved successfully:', result);
      setActiveTab('home');
    } catch (error) {
      console.error('❌ Network/Server Error:', error);
      alert(
        'Something went wrong while saving the item. Please try again later.'
      );
    }
  }

  return (
    <div className="additems-container">
      <div className="additemheading">Add Product</div>
      <div className="additems-field">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="additems-input"
        >
          <option value="">Select the Category</option>
          {pricesData.map((cat) => (
            <option key={cat.docname} value={cat.docname}>
              {cat.docname}
            </option>
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
            <option key={subcat} value={subcat}>
              {subcat}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="additemheadingsmall">Add Image Link</div>
      <div className="grossweightsection">
        <input
          type="text"
          placeholder="image link"
          className="grosswtinp imglinkinp"
          value={imageLinkText}
          onChange={(e) => setImageLinkText(e.target.value)}
        />
      </div> */}
      <div className="additemheadingsmall">
        Product Code - {finalProductCode}
      </div>
      <div className="grossweightsection">
        <select
          value={codeprefix}
          onChange={(e) => setCodePrefix(e.target.value)}
          className="additems-input"
        >
          <option value="">Select Code Prefix</option>
          {codeprefixlist.map((pre) => (
            <option key={pre} value={pre}>
              {pre}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Code"
          className="grosswtinp"
          value={codeSuffix}
          onChange={(e) => setCodeSuffix(parseFloat(e.target.value))}
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
          {pricesData.find((cat) => cat.docname === 'GOLD') &&
            Object.keys(pricesData.find((cat) => cat.docname === 'GOLD'))
              .filter((key) => key.endsWith('k'))
              .map((goldType) => (
                <option key={goldType} value={goldType}>
                  {goldType}
                </option>
              ))}
        </select>

        <input
          type="number"
          placeholder="Weight"
          className="grosswtinp"
          value={grossWeightAmount}
          onChange={(e) => setGrossWeightAmount(parseFloat(e.target.value))}
        />
        <div className="unit">gms</div>
      </div>
      <div className="additemheadingsmall">Items Used</div>
      <div className="itemsused-section">
        {selectedItems.map((item, index) => (
          <div key={index} className="itemsused-row">
            <div className="item-name">{item.label}</div>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(index, e.target.value)}
              className="item-qty-input"
            />
            <span className="unit">ct</span>
            <button onClick={() => deleteItem(index)} className="delete-btn">
              <img src="/delete.png" alt="Delete Icon" className="delicon" />
            </button>
            <div className="item-total">
              ₹{(item.quantity * item.price).toLocaleString()}
            </div>
          </div>
        ))}

        <div className="additem-dropdown-row">
          <select
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="additems-input"
          >
            <option value="">Select field</option>
            {allOptions.map((opt) => (
              <option key={opt.label} value={opt.label}>
                {opt.label} - ₹{opt.price}
              </option>
            ))}
          </select>
          <button onClick={handleAddItem} className="add-btn">
            Add
          </button>
        </div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall2">Net Weight</div>
        <div className="netwtval">{netWeight ? `${netWeight} gms` : '-'}</div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall2">+ Wastage</div>
        <div className="netwtval">{goldWastage} %</div>
        <div className="netwtval finprice">
          {calcWastage(
            goldWastage,
            getGoldRate(grossWeight, 0) * netWeight
          ).toFixed(1)}{' '}
          ₹
        </div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall2">
          x {grossWeight ? grossWeight : '-'} Rate
        </div>
        <div className="netwtval">{getGoldRate(grossWeight, 0)} ₹</div>
        <div className="netwtval finprice">
          {(getGoldRate(grossWeight, 0) * netWeight).toFixed(1)} ₹
        </div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall2">+ Making Charges</div>
        {category == 'POLKI' ? (
          <>
            <div className="netwtval">
              {polkiType === 0
                ? getMakingCharges(0, category, 0)
                : getMakingCharges(0, category, 1)}{' '}
              ₹/gm
            </div>
            <div className="netwtval finprice">
              {(
                (polkiType === 0
                  ? getMakingCharges(0, category, 0)
                  : getMakingCharges(0, category, 1)) * netWeight
              ).toFixed(1)}{' '}
              ₹
            </div>
          </>
        ) : (
          <>
            <div className="netwtval">
              {getMakingCharges(0, category, 0)} ₹/gm
            </div>
            <div className="netwtval finprice">
              {(getMakingCharges(0, category, 0) * netWeight).toFixed(1)} ₹
            </div>
          </>
        )}
      </div>
      {category == 'POLKI' ? (
        <div className="netwt">
          <select
            name="polki making"
            id="polkimaking"
            className="additems-input polkiselect"
            value={polkiType}
            onChange={(e) => {
              console.log(e.target.value);
              // setMakingT(e.target.value);
              setPolkiType(Number(e.target.value));
            }}
          >
            <option value={0}>POLKI MC</option>
            <option value={1}>VICTORIAN MC</option>
          </select>
        </div>
      ) : (
        <></>
      )}
      <div className="netwt">
        <div className="additemheadingsmall">SubTotal</div>
        {/* <div className="netwtval">{getMakingCharges(0)} ₹/gm</div> */}
        <div className="netwtval finprice">
          {(
            calcWastage(goldWastage, getGoldRate(grossWeight, 0) * netWeight) +
            getGoldRate(grossWeight, 0) * netWeight +
            (polkiType === 0 && category === 'POLKI'
              ? getMakingCharges(0, category, 0)
              : getMakingCharges(0, category, 1)) *
              netWeight +
            total
          ).toFixed(1)}
          ₹
        </div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall2">3% GST</div>
        {/* <div className="netwtval">{getMakingCharges(0)} ₹/gm</div> */}
        <div className="netwtval finprice">
          {calcWastage(
            3,
            calcWastage(goldWastage, getGoldRate(grossWeight, 0) * netWeight) +
              getGoldRate(grossWeight, 0) * netWeight +
              (polkiType === 0 && category === 'POLKI'
                ? getMakingCharges(0, category, 0)
                : getMakingCharges(0, category, 1)) *
                netWeight +
              total
          ).toFixed(1)}
          ₹
        </div>
      </div>
      <div className="netwt">
        <div className="additemheadingsmall">Grand Total</div>
        {/* <div className="netwtval">{getMakingCharges(0)} ₹/gm</div> */}
        <div className="netwtval finprice">
          {calculateFirstPrice(grossWeight, 3)}₹
        </div>
      </div>{' '}
      <div className="buttonsectionaddpage">
        <div
          className="savebutton"
          onClick={() => {
            handleSave();
          }}
        >
          Save Product
        </div>
        <div
          className="savebutton"
          onClick={() => {
            handleDraft();
          }}
        >
          Add as Draft
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <button
          disabled={uploadedUrl}
          className="savebutton"
          onClick={openFilePicker}
        >
          Upload Picture
        </button>
      </div>
      {/* Upload button */}
      {previewUrl && (
        <div style={{ marginTop: 10 }} className="prevdiv">
          <img
            src={previewUrl}
            alt="Preview"
            // style={{ width: 200, borderRadius: 8 }}
            className="previmg"
          />
          {/* {imageFile && (
            <div style={{ marginTop: 10 }} className="imgupload">
              <button
                onClick={uploadToCloudinary}
                disabled={uploading}
                className="savebutton"
              >
                {uploading ? 'Uploading...' : 'Upload Database'}
              </button>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
