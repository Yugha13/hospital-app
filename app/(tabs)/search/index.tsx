import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star, Clock, X } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const specialties = [
  { id: 'all', name: 'All', icon: '👨‍⚕️' },
  { id: 'cardiology', name: 'Cardiology', icon: '❤️' },
  { id: 'dermatology', name: 'Dermatology', icon: '🔬' },
  { id: 'neurology', name: 'Neurology', icon: '🧠' },
  { id: 'orthopedic', name: 'Orthopedic', icon: '🦴' },
  { id: 'pediatrics', name: 'Pediatrics', icon: '👶' },
  { id: 'general', name: 'General', icon: '👨‍⚕️' },
];

const experienceLevels = [
  { id: 'all', name: 'All Experience' },
  { id: 'junior', name: '1-5 years' },
  { id: 'mid', name: '5-10 years' },
  { id: 'senior', name: '10+ years' },
];

const availabilityOptions = [
  { id: 'all', name: 'All' },
  { id: 'available', name: 'Available Now' },
  { id: 'today', name: 'Available Today' },
  { id: 'week', name: 'This Week' },
];

const ratingOptions = [
  { id: 'all', name: 'All Ratings' },
  { id: '4+', name: '4+ Stars' },
  { id: '4.5+', name: '4.5+ Stars' },
  { id: '4.8+', name: '4.8+ Stars' },
];

const allDoctors = [
  {
    id: 1,
    name: 'Dr. Alana Rueter',
    specialty: 'cardiology',
    location: 'New York, USA',
    rating: 4.9,
    reviews: 1258,
    experience: '10+ years',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. John Wilson',
    specialty: 'dermatology',
    location: 'New York, USA',
    rating: 4.8,
    reviews: 956,
    experience: '8+ years',
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: false,
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    specialty: 'neurology',
    location: 'New York, USA',
    rating: 4.9,
    reviews: 1432,
    experience: '12+ years',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: 4,
    name: 'Dr. Michael Chen',
    specialty: 'cardiology',
    location: 'New York, USA',
    rating: 4.7,
    reviews: 892,
    experience: '15+ years',
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: 5,
    name: 'Dr. Emily Rodriguez',
    specialty: 'pediatrics',
    location: 'New York, USA',
    rating: 4.8,
    reviews: 743,
    experience: '7+ years',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'orthopedic',
    location: 'New York, USA',
    rating: 4.6,
    reviews: 567,
    experience: '9+ years',
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: false,
  },
  {
    id: 7,
    name: 'Dr. Lisa Thompson',
    specialty: 'general',
    location: 'New York, USA',
    rating: 4.5,
    reviews: 423,
    experience: '6+ years',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: 8,
    name: 'Dr. James Park',
    specialty: 'dermatology',
    location: 'New York, USA',
    rating: 4.7,
    reviews: 634,
    experience: '11+ years',
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  
  // Filter states
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  const handleDoctorPress = (doctorId: number) => {
    router.push(`/search/${doctorId}`);
  };

  const getExperienceYears = (experience: string) => {
    const years = parseInt(experience);
    if (years >= 10) return 'senior';
    if (years >= 5) return 'mid';
    return 'junior';
  };

  const filterDoctors = () => {
    let filtered = allDoctors;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    // Filter by experience
    if (selectedExperience !== 'all') {
      filtered = filtered.filter(doctor => getExperienceYears(doctor.experience) === selectedExperience);
    }

    // Filter by availability
    if (selectedAvailability === 'available') {
      filtered = filtered.filter(doctor => doctor.available);
    }

    // Filter by rating
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating.replace('+', ''));
      filtered = filtered.filter(doctor => doctor.rating >= minRating);
    }

    return filtered;
  };

  const filteredDoctors = filterDoctors();
  const displayedDoctors = showAllDoctors ? filteredDoctors : filteredDoctors.slice(0, 3);

  const clearFilters = () => {
    setSelectedSpecialty('all');
    setSelectedExperience('all');
    setSelectedAvailability('all');
    setSelectedRating('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedSpecialty !== 'all' || selectedExperience !== 'all' || 
                         selectedAvailability !== 'all' || selectedRating !== 'all' || searchQuery !== '';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Doctor</Text>
        <TouchableOpacity 
          style={[styles.filterButton, hasActiveFilters && styles.filterButtonActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={hasActiveFilters ? "#FFFFFF" : "#4285F4"} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Doctor, Hospital..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters Panel */}
        {showFilters && (
          <View style={styles.filtersPanel}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filters</Text>
              {hasActiveFilters && (
                <TouchableOpacity onPress={clearFilters}>
                  <Text style={styles.clearFiltersText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Experience Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Experience Level</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterOptions}>
                  {experienceLevels.map((level) => (
                    <TouchableOpacity
                      key={level.id}
                      style={[
                        styles.filterOption,
                        selectedExperience === level.id && styles.filterOptionSelected
                      ]}
                      onPress={() => setSelectedExperience(level.id)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedExperience === level.id && styles.filterOptionTextSelected
                      ]}>
                        {level.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Availability Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Availability</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterOptions}>
                  {availabilityOptions.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.filterOption,
                        selectedAvailability === option.id && styles.filterOptionSelected
                      ]}
                      onPress={() => setSelectedAvailability(option.id)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedAvailability === option.id && styles.filterOptionTextSelected
                      ]}>
                        {option.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Rating Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Rating</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterOptions}>
                  {ratingOptions.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.filterOption,
                        selectedRating === option.id && styles.filterOptionSelected
                      ]}
                      onPress={() => setSelectedRating(option.id)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedRating === option.id && styles.filterOptionTextSelected
                      ]}>
                        {option.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        )}

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctor Specialty</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialtiesContainer}
          >
            {specialties.map((specialty) => (
              <TouchableOpacity
                key={specialty.id}
                style={[
                  styles.specialtyCard,
                  selectedSpecialty === specialty.id && styles.specialtyCardSelected
                ]}
                onPress={() => setSelectedSpecialty(specialty.id)}
              >
                <Text style={styles.specialtyIcon}>{specialty.icon}</Text>
                <Text style={[
                  styles.specialtyName,
                  selectedSpecialty === specialty.id && styles.specialtyNameSelected
                ]}>
                  {specialty.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Summary */}
        {hasActiveFilters && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsText}>
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </Text>
          </View>
        )}

        {/* Available Doctors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {hasActiveFilters ? 'Search Results' : 'Available Doctors'}
            </Text>
            {!showAllDoctors && filteredDoctors.length > 3 && (
              <TouchableOpacity onPress={() => setShowAllDoctors(true)}>
                <Text style={styles.seeAllButton}>See All ({filteredDoctors.length})</Text>
              </TouchableOpacity>
            )}
          </View>

          {displayedDoctors.length === 0 ? (
            <View style={styles.emptyState}>
              <Search size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No doctors found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search criteria or filters
              </Text>
            </View>
          ) : (
            displayedDoctors.map((doctor) => (
              <TouchableOpacity 
                key={doctor.id} 
                style={styles.doctorCard}
                onPress={() => handleDoctorPress(doctor.id)}
              >
                <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                  <View style={styles.doctorHeader}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    {doctor.available && (
                      <View style={styles.availableBadge}>
                        <View style={styles.availableDot} />
                        <Text style={styles.availableText}>Available</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.doctorSpecialty}>
                    {specialties.find(s => s.id === doctor.specialty)?.name || doctor.specialty}
                  </Text>
                  <View style={styles.doctorLocation}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.locationText}>{doctor.location}</Text>
                  </View>
                  <View style={styles.doctorStats}>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.ratingText}>{doctor.rating}</Text>
                      <Text style={styles.reviewsText}>({doctor.reviews})</Text>
                    </View>
                    <View style={styles.experienceContainer}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.experienceText}>{doctor.experience}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}

          {showAllDoctors && filteredDoctors.length > 3 && (
            <TouchableOpacity 
              style={styles.showLessButton}
              onPress={() => setShowAllDoctors(false)}
            >
              <Text style={styles.showLessText}>Show Less</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Our Hospital Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Hospital</Text>
          <TouchableOpacity 
            style={styles.hospitalCard}
            onPress={() => router.push('/hospital')}
          >
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.hospitalImage}
            />
            <View style={styles.hospitalOverlay}>
              <Text style={styles.hospitalName}>Manhattan Medical Center</Text>
              <View style={styles.hospitalLocation}>
                <MapPin size={14} color="#FFFFFF" />
                <Text style={styles.hospitalLocationText}>2.5 km away</Text>
              </View>
              <View style={styles.hospitalRating}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.hospitalRatingText}>4.8</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    padding: 12,
  },
  filterButtonActive: {
    backgroundColor: '#4285F4',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  filtersPanel: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  clearFiltersText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4285F4',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterOption: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterOptionSelected: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  filterOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  filterOptionTextSelected: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  seeAllButton: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4285F4',
  },
  resultsSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
  specialtiesContainer: {
    paddingRight: 20,
  },
  specialtyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  specialtyCardSelected: {
    backgroundColor: '#4285F4',
  },
  specialtyIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  specialtyName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
  specialtyNameSelected: {
    color: '#FFFFFF',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  doctorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  availableText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#10B981',
  },
  doctorSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  doctorLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  doctorStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  showLessButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  showLessText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  hospitalCard: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  hospitalImage: {
    width: '100%',
    height: '100%',
  },
  hospitalOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  hospitalName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  hospitalLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hospitalLocationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  hospitalRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalRatingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
});