import React, { useState, useEffect } from 'react';
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d4af37',
    paddingBottom: 8,
  },
  logo: {
    width: 50,
    height: 50,
  },
  billInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  billTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  billDate: {
    fontSize: 10,
    color: '#333',
    marginBottom: 0,
  },
  billNumber: {
    fontSize: 9,
    color: '#666',
  },
  goldRatesSection: {
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#d4af37',
    borderRadius: 4,
    width: '100%',
  },
  goldRatesTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 4,
    textAlign: 'center',
  },
  goldRatesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  goldRateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goldRateLabel: {
    fontSize: 9,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  productSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  productImage: {
    width: 240,
    height: 180,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    objectFit: 'cover',
  },
  productInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
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
  let date;
  if (!dateString) {
    // Get IST time reliably:
    const todayIST = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    );
    date = todayIST;
  } else {
    date = new Date(dateString);
  }
  return date.toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
};


const ProductPDF = ({ item, logoUrl, goldRates, todayDate }) => {
  
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
            <Text style={[styles.tableCell, styles.rateCell]}>Rs. {formatPrice(mat.price)}/{mat.unit}</Text>
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
          <View style={styles.billInfo}>
            <Text style={styles.billTitle}>Estimation</Text>
            <Text style={styles.billDate}>Date: {todayDate}</Text>
          </View>
        </View>

        {/* Gold Rates Section */}
        {Object.keys(goldRates).length > 0 && (
          <View style={styles.goldRatesSection}>
            <View style={styles.goldRatesRow}>
              {Object.entries(goldRates).map(([purity, rate]) => (
                <View style={styles.goldRateItem} key={purity}>
                  <Text style={styles.goldRateLabel}>{purity} Gold - {rate} Rs/gm</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Product Section */}
        <View style={styles.productSection}>
          {item.imagelink && <Image style={styles.productImage} src={item.imagelink} />}
          <View style={styles.productInfo}>
            <Text style={styles.productCode}>Product Code: {item.productId}</Text>
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
            <Text style={styles.pricingLabel}>Gold Value ({formatWeight(netWeight)} gm × (Rs. {formatPrice(goldRate)}/gm + {formatWeight(wastagePercent)}%)):</Text>
            <Text style={styles.pricingValue}>Rs. {formatPrice(goldCharges)}</Text>
          </View>
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

      </Page>
    </Document>
  );
};

export default ProductPDF;
