import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Pill, Heart, Thermometer, Droplet } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const { t } = useTranslation();

const categories = [
  { id: 'all', name: t('pharmacy.categories.all'), icon: Pill },
  { id: 'prescription', name: t('pharmacy.categories.prescription'), icon: Heart },
  { id: 'otc', name: t('pharmacy.categories.otc'), icon: Thermometer },
  { id: 'supplements', name: t('pharmacy.categories.supplements'), icon: Droplet },
];

const medications = [
  {
    id: 1,
    name: 'Amoxicillin 500mg',
    category: 'prescription',
    price: '$12.99',
    description: t('pharmacy.medication.description.antibiotic'),
    image: 'https://picsum.photos/200?random=1',
    requiresPrescription: true,
  },
  {
    id: 2,
    name: 'Ibuprofen 200mg',
    category: 'otc',
    price: '$8.99',
    description: t('pharmacy.medication.description.pain_reliever'),
    image: 'https://picsum.photos/200?random=2',
    requiresPrescription: false,
  },
  {
    id: 3,
    name: 'Vitamin D3 1000IU',
    category: 'supplements',
    price: '$15.99',
    description: t('pharmacy.medication.description.vitamin_d'),
    image: 'https://picsum.photos/200?random=3',
    requiresPrescription: false,
  },
];

export default function PharmacyScreen() {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMedications = medications.filter(medication => {
    const matchesSearch = medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medication.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || medication.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('pharmacy.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder={t('pharmacy.search.placeholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <category.icon
              size={20}
              color={selectedCategory === category.id ? '#4285F4' : '#6B7280'}
            />
            <Text style={[
              styles.categoryChipText,
              selectedCategory === category.id && styles.categoryChipTextActive
            ]}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Medications List */}
      <ScrollView style={styles.medicationsList}>
        {filteredMedications.map(medication => (
          <TouchableOpacity 
            key={medication.id} 
            style={styles.medicationCard}
            onPress={() => router.push('/medications')}
          >
            <Image 
              source={{ uri: medication.image }} 
              style={styles.medicationImage} 
            />
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationDescription}>{medication.description}</Text>
              <View style={styles.medicationFooter}>
                <Text style={styles.medicationPrice}>{medication.price}</Text>
                {medication.requiresPrescription && (
                  <Text style={styles.prescriptionRequired}>Prescription Required</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginRight: 40,
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoriesContent: {
    paddingRight: 16,
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryChipActive: {
    backgroundColor: '#EBF5FF',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryChipTextActive: {
    color: '#4285F4',
  },
  medicationsList: {
    flex: 1,
    padding: 16,
  },
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medicationImage: {
    width: 100,
    height: 100,
  },
  medicationInfo: {
    flex: 1,
    padding: 12,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  medicationDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  medicationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicationPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4285F4',
  },
  prescriptionRequired: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
  },
});