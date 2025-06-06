import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Courier',
    backgroundColor: '#fff',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'dotted',
    marginBottom: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  shopInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  shopName: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  contactLine: {
    fontSize: 8,
    marginBottom: 1,
  },
  title: {
    fontSize: 13,
    textAlign: 'center',
    textDecoration: 'underline',
    marginVertical: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  image: {
    width: 160,
    height: 160,
    marginVertical: 8,
    alignSelf: 'center',
    borderRadius: 20,
  },
  section: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    borderBottomStyle: 'dotted',
    paddingVertical: 2,
  },
  label: {
    fontWeight: 'normal',
    width: '45%',
    letterSpacing: 0.8,
  },
  value: {
    width: '55%',
    textAlign: 'right',
    letterSpacing: 0.8,
  },
  subHeader: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    fontSize: 11,
    textDecoration: 'underline',
    letterSpacing: 1,
  },
  materialItem: {
    fontSize: 9,
    marginBottom: 1,
    letterSpacing: 0.5,
  },
  footer: {
    fontSize: 8,
    textAlign: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'dotted',
    paddingTop: 6,
    letterSpacing: 0.7,
  },
});

// 📦 Format helpers
const formatWeight = (value) => parseFloat(value).toFixed(2);
const formatPrice = (value) =>
  Number(Math.round(value)).toLocaleString('en-IN');

const ProductPDF = ({ item, priceIndex, logoUrl }) => {
  const priceTiers = ['tier1', 'tier2', 'tier3'];
  const selectedTier = item.pricingBreakdown[priceTiers[priceIndex]];

  return (
    // <Document>
    //   <Page size="A4" style={styles.page}>
    //     {/* Header */}
    //     <View style={styles.header}>
    //       {logoUrl && <Image style={styles.logo} src={logoUrl} />}
    //       <View style={styles.shopInfo}>
    //         <Text style={styles.shopName}>Amarsons Pearl and Jewels</Text>
    //         <Text style={styles.contactLine}>
    //           Address: Infront of Anil Medico, Aurangabad, Maharashtra
    //         </Text>
    //         <Text style={styles.contactLine}>Phone: +91 98765 43210</Text>
    //         <Text style={styles.contactLine}>Email: contact@amarsons.in</Text>
    //         <Text style={styles.contactLine}>Website: www.amarsons.in</Text>
    //       </View>
    //     </View>

    //     {/* Title */}
    //     <Text style={styles.title}>Jewelry Quotation</Text>

    //     {/* Product Image */}
    //     {item.imagelink && <Image style={styles.image} src={item.imagelink} />}

    //     {/* Product Details */}
    //     <View style={styles.section}>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Product ID:</Text>
    //         <Text style={styles.value}>{item.productId}</Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Category:</Text>
    //         <Text style={styles.value}>{item.category}</Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Jewellery Type:</Text>
    //         <Text style={styles.value}>{item.subcategory}</Text>
    //       </View>

    //       <View style={styles.row}>
    //         <Text style={styles.label}>Gold Purity:</Text>
    //         <Text style={styles.value}>{item.goldpurity}</Text>
    //       </View>

    //       <View style={styles.row}>
    //         <Text style={styles.label}>Gold Weight:</Text>
    //         <Text style={styles.value}>{item.netweight} g</Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Total Weight:</Text>
    //         <Text style={styles.value}>{item.grossWeight} g</Text>
    //       </View>
    //     </View>

    //     {/* Materials Used */}
    //     <Text style={styles.subHeader}>Materials Used</Text>
    //     <View style={styles.section}>
    //       {item.itemsUsed.map((mat, idx) => (
    //         <Text key={idx} style={styles.materialItem}>
    //           • {mat.label} ({mat.category}) - {mat.quantity}
    //         </Text>
    //       ))}
    //     </View>

    //     {/* Pricing Breakdown */}
    //     <Text style={styles.subHeader}>Pricing Breakdown</Text>
    //     <View style={styles.section}>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Gold Charges:</Text>
    //         <Text style={styles.value}>₹ {selectedTier.goldCharges}</Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Wastage Charges:</Text>
    //         <Text style={styles.value}>₹ {selectedTier.wastageCharges} Rs</Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Making Charges:</Text>
    //         <Text style={styles.value}>₹ {selectedTier.makingCharges} Rs</Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Other Material Charges:</Text>
    //         <Text style={styles.value}>
    //           ₹ {selectedTier.materialCharges} Rs
    //         </Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>GST ({item.gst}%):</Text>
    //         <Text style={styles.value}>Included</Text>
    //       </View>
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Final Price:</Text>
    //         <Text style={styles.value}>₹ {selectedTier.finalPrice} Rs</Text>
    //       </View>
    //     </View>

    //     {/* Footer */}
    //     <Text style={styles.footer}>
    //       Thank you for shopping with us! We appreciate your trust and support.
    //     </Text>
    //   </Page>
    // </Document>

    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {logoUrl && <Image style={styles.logo} src={logoUrl} />}
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>Amarsons Pearl and Jewels</Text>
            <Text style={styles.contactLine}>
              Address: Infront of Anil Medico, Aurangabad, Maharashtra
            </Text>
            <Text style={styles.contactLine}>Phone: +91 98765 43210</Text>
            <Text style={styles.contactLine}>Email: contact@amarsons.in</Text>
            <Text style={styles.contactLine}>Website: www.amarsons.in</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Jewelry Quotation</Text>

        {/* Product Image */}
        {item.imagelink && <Image style={styles.image} src={item.imagelink} />}

        {/* Product Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Product ID:</Text>
            <Text style={styles.value}>{item.productId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.value}>{item.category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Jewellery Type:</Text>
            <Text style={styles.value}>{item.subcategory}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gold Purity:</Text>
            <Text style={styles.value}>{item.goldpurity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gold Weight:</Text>
            <Text style={styles.value}>{formatWeight(item.netweight)} g</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Weight:</Text>
            <Text style={styles.value}>{formatWeight(item.grossWeight)} g</Text>
          </View>
        </View>

        {/* Materials Used */}
        <Text style={styles.subHeader}>Materials Used</Text>
        <View style={styles.section}>
          {item.itemsUsed.map((mat, idx) => (
            <Text key={idx} style={styles.materialItem}>
              • {mat.label} ({mat.category}) - {mat.quantity}
            </Text>
          ))}
        </View>

        {/* Pricing Breakdown */}
        <Text style={styles.subHeader}>Pricing Breakdown</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Gold Charges:</Text>
            <Text style={styles.value}>
              ₹ {formatPrice(selectedTier.goldCharges)} Rs
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wastage Charges:</Text>
            <Text style={styles.value}>
              ₹ {formatPrice(selectedTier.wastageCharges)} Rs
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Making Charges:</Text>
            <Text style={styles.value}>
              ₹ {formatPrice(selectedTier.makingCharges)} Rs
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Other Material Charges:</Text>
            <Text style={styles.value}>
              ₹ {formatPrice(selectedTier.materialCharges)} Rs
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>GST ({item.gst}%):</Text>
            <Text style={styles.value}>Included</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Final Price:</Text>
            <Text style={styles.value}>
              ₹ {formatPrice(selectedTier.finalPrice)} Rs
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for shopping with us! We appreciate your trust and support.
        </Text>
      </Page>
    </Document>
  );
};

export default ProductPDF;
