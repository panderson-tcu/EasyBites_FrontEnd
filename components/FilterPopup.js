import React, { useState } from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import styles from "./FilterPopupStyle";
import RNPickerSelect from 'react-native-picker-select';

const FilterPopup = ({ visible, onClose, onApply }) => {
  const [maxPrice, setMaxPrice] = useState('');
  const [maxCookTime, setMaxCookTime] = useState('');
  const [selectedProteins, setSelectedProteins] = useState([]);
  
  const toggleProtein = (protein) => {
    const updatedProteins = selectedProteins.includes(protein)
      ? selectedProteins.filter(p => p !== protein)
      : [...selectedProteins, protein];
    setSelectedProteins(updatedProteins);
  };

  const handleApply = () => {
    const filters = {};
    if (maxPrice !== '') filters.maxPrice = parseFloat(maxPrice);
    if (maxCookTime !== '') filters.maxCookTime = parseInt(maxCookTime);
    if (selectedProteins.length > 0) filters.selectedProteins = selectedProteins;
    onApply(filters);
    console.log(filters)
  };


  const handleReset = () => {
    setMaxPrice('');
    setMaxCookTime('');
    setSelectedProteins([]);
    onApply(null);
  };
  

  const renderProteinButtons = () => {
    return ['Chicken', 'Beef', 'Pork', 'Turkey', 'Vegetarian', 'Seafood'].map(protein => (
      <Pressable
        key={protein}
        style={[styles.proteinButton, selectedProteins.includes(protein) && styles.selectedProteinButton]}
        onPress={() => toggleProtein(protein)}
      >
        <Text style={[styles.proteinButtonText, selectedProteins.includes(protein)]}>
          {protein}
        </Text>
      </Pressable>
    ));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Recipes</Text>
          <View style={styles.pickerContainer}>
            <Text style={styles.sectionTitle}>Max Price</Text>
            <RNPickerSelect
              style={styles.pickerStyles}
              value={maxPrice}
              onValueChange={(itemValue, itemIndex) => setMaxPrice(itemValue)}
              items={[
                { label: '$5 or less', value: '5' },
                { label: '$10 or less', value: '10' },
                { label: '$15 or less', value: '15' },
                { label: '$20', value: '20' },
              ]}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.sectionTitle}>Cook Time</Text>
            <RNPickerSelect
              value={maxCookTime}
              style={styles.pickerStyles}
              onValueChange={(itemValue, itemIndex) => setMaxCookTime(itemValue)}
              items={[
                { label: '5 Minutes', value: '5' },
                { label: '10 Minutes', value: '10' },
                { label: '15 Minutes', value: '15' },
                { label: '20 Minutes', value: '20' },
                { label: '25 Minutes', value: '25' },
                { label: '30 Minutes', value: '30' },
                { label: '35 Minutes', value: '35' },
                { label: '40 Minutes', value: '40' },
                { label: '45 Minutes', value: '45' },
                { label: '50 Minutes', value: '50' },
                { label: '1 Hour or more', value: '60' },
              ]}
            />
          </View>
          <Text style={styles.sectionTitle}>Select Protein(s)</Text>
          <ScrollView style={styles.proteinContainer}>
            {renderProteinButtons()}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleReset} style={styles.resetButton}>
              <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
            </Pressable>
            <Pressable onPress={handleApply} style={styles.applyButton}>
              <Text style={[styles.buttonText, styles.applyButtonText]}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterPopup;
