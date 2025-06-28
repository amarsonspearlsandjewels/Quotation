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
    padding: 32,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
    color: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
    borderBottomWidth: 1.5,
    borderBottomColor: '#d4af37',
    paddingBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  shopInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 8,
  },
  shopName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 2,
    letterSpacing: 1,
  },
  shopTagline: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
    fontStyle: 'italic',
  },
  contact: {
    fontSize: 9,
    color: '#444',
    marginBottom: 1,
  },
  billInfo: {
    minWidth: 120,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 12,
  },
  billTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  billDate: {
    fontSize: 10,
    color: '#333',
    marginBottom: 2,
  },
  billNumber: {
    fontSize: 9,
    color: '#666',
  },
  productSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  productImage: {
    width: 110,
    height: 90,
    marginRight: 18,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    objectFit: 'cover',
  },
  productInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
    letterSpacing: 1,
  },
  productCategory: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  specsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 2,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  specItem: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingRight: 10,
  },
  specLabel: {
    fontSize: 9,
    color: '#555',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 9,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  materialsSection: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#d4af37',
    marginBottom: 2,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  nameCell: { width: '36%', textAlign: 'left' },
  qtyCell: { width: '18%' },
  rateCell: { width: '22%' },
  totalCell: { width: '24%' },
  tableCell: {
    fontSize: 9,
    color: '#333',
    textAlign: 'center',
  },
  pricingSection: {
    marginBottom: 18,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    paddingVertical: 1,
  },
  pricingLabel: {
    fontSize: 10,
    color: '#555',
    maxWidth: '70%',
  },
  pricingValue: {
    fontSize: 10,
    color: '#1a1a1a',
    fontWeight: 'bold',
    minWidth: 60,
    textAlign: 'right',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: '#d4af37',
  },
  subtotalLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtotalValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  gstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#d4af37',
  },
  grandTotalLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#d4af37',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  grandTotalValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'right',
  },
  footer: {
    marginTop: 24,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  termsSection: {
    marginTop: 8,
  },
  termsTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  termsText: {
    fontSize: 7,
    color: '#666',
    marginBottom: 1,
    lineHeight: 1.3,
  },
});

const formatWeight = (value) => parseFloat(value || 0).toFixed(2);
const formatPrice = (value) => {
  const num = parseFloat(value || 0);
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(Math.round(num));
};
const formatDate = (dateString) => {
  if (!dateString) return new Date().toLocaleDateString('en-IN');
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
};

const ProductPDF = ({ item, logoUrl }) => {
  // Use provided fields directly
  const grossWeight = item.grossWeight || 0;
  const netWeight = item.netweight || 0;
  const goldCharges = item.pricingBreakdown?.goldCharges || 0;
  const wastageCharges = item.pricingBreakdown?.wastageCharges || 0;
  const makingCharges = item.pricingBreakdown?.makingCharges || 0;
  const materialCharges = item.pricingBreakdown?.materialCharges || 0;
  const gstPercent = item.pricingBreakdown?.gstPercent || item.gst || 3;
  const goldRate = netWeight > 0 ? goldCharges / netWeight : 0;
  const wastagePercent = goldCharges > 0 ? (wastageCharges / goldCharges) * 100 : 0;
  const subtotal = goldCharges + wastageCharges + makingCharges + materialCharges;
  const gstAmount = subtotal * (gstPercent / 100);
  const grandTotal = Math.round(subtotal + gstAmount);
  const stoneWeightGms = item.totalStoneWeightGms || 0;

  // Generate materials table rows
  const materialsRows = item.itemsUsed && item.itemsUsed.length > 0 
    ? item.itemsUsed.map((mat, idx) => {
        const total = parseFloat(mat.quantity || 0) * parseFloat(mat.price || 0);
        return (
          <View style={styles.tableRow} key={idx}>
            <Text style={[styles.tableCell, styles.nameCell]}>{mat.name}</Text>
            <Text style={[styles.tableCell, styles.qtyCell]}>{mat.quantity} {mat.unit}</Text>
            <Text style={[styles.tableCell, styles.rateCell]}>Rs. {formatPrice(mat.price)}</Text>
            <Text style={[styles.tableCell, styles.totalCell]}>Rs. {formatPrice(total)}</Text>
          </View>
        );
      })
    : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src={logoUrl} />
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>AMARSONS PEARLS & JEWELS</Text>
            <Text style={styles.shopTagline}>Exquisite Jewelry Since 1985</Text>
            <Text style={styles.contact}>Parklane, Secunderabad - 500003</Text>
            <Text style={styles.contact}>Tel: 040-2789 4567 | Mob: 9966000001, 9010101087</Text>
            <Text style={styles.contact}>Email: info@amarsonsjewels.com</Text>
          </View>
          <View style={styles.billInfo}>
            <Text style={styles.billTitle}>Jewelry Quotation</Text>
            <Text style={styles.billDate}>Date: {formatDate(item.createdAt)}</Text>
            <Text style={styles.billNumber}>Quote #: {item.productId}</Text>
          </View>
        </View>

        {/* Product Section */}
        <View style={styles.productSection}>
          {item.imagelink && <Image style={styles.productImage} src={item.imagelink} />}
          <View style={styles.productInfo}>
            <Text style={styles.productCode}>Product Code: {item.productId}</Text>
            <Text style={styles.productCategory}>Category: {item.category}</Text>
            <Text style={styles.productCategory}>Type: {item.subcategory}</Text>
            <Text style={styles.productCategory}>Making Type: {item.makingTypeUsed === 0 ? 'Standard' : 'Victorian'}</Text>
          </View>
        </View>

        {/* Specifications */}
        <View style={styles.specsSection}>
          <Text style={styles.sectionTitle}>Product Specifications</Text>
          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Gold Purity:</Text>
              <Text style={styles.specValue}>{item.goldpurity}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Gross Weight:</Text>
              <Text style={styles.specValue}>{formatWeight(grossWeight)} gm</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Net Gold Weight:</Text>
              <Text style={styles.specValue}>{formatWeight(netWeight)} gm</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Stone Weight (Grams):</Text>
              <Text style={styles.specValue}>{formatWeight(stoneWeightGms)} gm</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Wastage Percentage:</Text>
              <Text style={styles.specValue}>{formatWeight(wastagePercent)}%</Text>
            </View>
            
          </View>
        </View>

        {/* Materials Used */}
        {item.itemsUsed && item.itemsUsed.length > 0 && (
          <View style={styles.materialsSection}>
            <Text style={styles.sectionTitle}>Materials & Stones Used</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.nameCell]}>Material Name</Text>
              <Text style={[styles.tableHeaderCell, styles.qtyCell]}>Quantity</Text>
              <Text style={[styles.tableHeaderCell, styles.rateCell]}>Rate (Rs.)</Text>
              <Text style={[styles.tableHeaderCell, styles.totalCell]}>Total (Rs.)</Text>
            </View>
            {materialsRows}
          </View>
        )}

        {/* Pricing Breakdown */}
        <View style={styles.pricingSection}>
          <Text style={styles.sectionTitle}>Pricing Breakdown</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Gold Value ({formatWeight(netWeight)} gm × Rs. {formatPrice(goldRate)}/gm):</Text>
            <Text style={styles.pricingValue}>Rs. {formatPrice(goldCharges)}</Text>
          </View>
          {/* <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Wastage Charges ({formatWeight(wastagePercent)}%):</Text>
            <Text style={styles.pricingValue}>Rs{formatPrice(wastageCharges)}</Text>
          </View> */}
          {item.itemsUsed && item.itemsUsed.length > 0 && (
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Materials & Stones:</Text>
              <Text style={styles.pricingValue}>Rs. {formatPrice(materialCharges)}</Text>
            </View>
          )}
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Making Charges:</Text>
            <Text style={styles.pricingValue}>Rs. {formatPrice(makingCharges)}</Text>
          </View>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Subtotal:</Text>
            <Text style={styles.subtotalValue}>Rs. {formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.gstRow}>
            <Text style={styles.pricingLabel}>GST ({gstPercent}%):</Text>
            <Text style={styles.pricingValue}>Rs. {formatPrice(gstAmount)}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Grand Total:</Text>
            <Text style={styles.grandTotalValue}>Rs. {formatPrice(grandTotal)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for choosing Amarsons Pearls & Jewels</Text>
          <Text style={styles.footerText}>Your trusted partner in fine jewelry since 1985</Text>
          {/* <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms & Conditions:</Text>
            <Text style={styles.termsText}>• This quotation is valid for 30 days from the date of issue</Text>
            <Text style={styles.termsText}>• Prices are subject to change based on gold rate fluctuations</Text>
            <Text style={styles.termsText}>• All weights are certified and guaranteed</Text>
            <Text style={styles.termsText}>• 1 year warranty on workmanship</Text>
            <Text style={styles.termsText}>• Exchange policy available as per store terms</Text>
          </View> */}
        </View>
      </Page>
    </Document>
  );
};

export default ProductPDF;
