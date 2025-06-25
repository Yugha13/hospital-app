import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, MapPin, Star, Clock, Calendar, Video, Phone } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';


  const { t } = useTranslation();

  const specialties = [
  { id: 'all', name: t('doctors.specialties.all') },
  { id: 'cardiology', name: t('doctors.specialties.cardiology') },
  { id: 'dermatology', name: t('doctors.specialties.dermatology') },
  { id: 'neurology', name: t('doctors.specialties.neurology') },
  { id: 'orthopedic', name: t('doctors.specialties.orthopedic') },
  { id: 'pediatrics', name: t('doctors.specialties.pediatrics') },
  { id: 'dental', name: t('doctors.specialties.dental') },
  { id: 'ophthalmology', name: t('doctors.specialties.ophthalmology') },
  { id: 'psychiatry', name: t('doctors.specialties.psychiatry') },
];

const allDoctors = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Dr. ${['John', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'Robert', 'Anna'][Math.floor(Math.random() * 8)]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'][Math.floor(Math.random() * 8)]}`,
  specialty: specialties[Math.floor(Math.random() * (specialties.length - 1)) + 1].name,
  rating: (4 + Math.random()).toFixed(1),
  reviews: Math.floor(Math.random() * 900) + 100,
  experience: `${Math.floor(Math.random() * 15) + 5} years`,
  location: [t('doctors.locations.manhattan'), t('doctors.locations.brooklyn'), t('doctors.locations.queens'), t('doctors.locations.bronx')][Math.floor(Math.random() * 4)],
  image: `https://picsum.photos/200?random=${i}`,
  available: Math.random() > 0.3,
  nextSlot: Math.random() > 0.5 ? t('doctors.doctor_info.today') + ' ' + Math.floor(Math.random() * 12 + 1) + ':00 ' + (Math.random() > 0.5 ? t('doctors.doctor_info.am') : t('doctors.doctor_info.pm')) : t('doctors.doctor_info.tomorrow') + ' ' + Math.floor(Math.random() * 12 + 1) + ':00 ' + (Math.random() > 0.5 ? t('doctors.doctor_info.am') : t('doctors.doctor_info.pm')),
  consultationFee: '$' + (Math.floor(Math.random() * 11) + 10) + '0'
}));

export default function DoctorsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const filteredDoctors = allDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = selectedSpecialty === 'all' || 
      doctor.specialty === specialties.find(s => s.id === selectedSpecialty)?.name;

    return matchesSearch && matchesSpecialty;
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
        <Text style={styles.headerTitle}>{t('doctors.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder={t('doctors.search.placeholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Specialty Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {specialties.map(specialty => (
          <TouchableOpacity
            key={specialty.id}
            style={[
              styles.filterChip,
              selectedSpecialty === specialty.id && styles.filterChipActive
            ]}
            onPress={() => setSelectedSpecialty(specialty.id)}
          >
            <Text style={[
              styles.filterChipText,
              selectedSpecialty === specialty.id && styles.filterChipTextActive
            ]}>{specialty.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Doctors List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.doctorsList}>
          {filteredDoctors.map(doctor => (
            <TouchableOpacity
              key={doctor.id}
              style={styles.doctorCard}
              onPress={() => router.push(`/search/${doctor.id}`)}>

               <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
               <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFC107" fill="#FFC107" />
                  <Text style={styles.ratingText}>{doctor.rating}</Text>
                  <Text style={styles.reviewsText}>({doctor.reviews} reviews)</Text>
                </View>
                <View style={styles.experienceContainer}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.experienceText}>{doctor.experience}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.locationText}>{doctor.location}</Text>
                </View>
                <View style={styles.slotContainer}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.slotText}>Next available: {doctor.nextSlot}</Text>
                </View>
                <View style={styles.feeContainer}>
                  <Text style={styles.feeText}>Consultation fee: {doctor.consultationFee}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#4285F4',
  },
  filterChipText: {
    fontSize: 14,
    color: '#4B5563',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  doctorsList: {
    padding: 16,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  experienceText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  slotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  slotText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  feeContainer: {
    marginTop: 4,
  },
  feeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4285F4',
  },
});
              



 