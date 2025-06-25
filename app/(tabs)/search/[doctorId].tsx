import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Star, MapPin, Clock, Phone, Video, Calendar, Award, Users, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useState } from 'react';

const doctorsData = {
  '1': {
    id: 1,
    name: 'Dr. Alana Rueter',
    specialty: 'Cardiology',
    location: 'Manhattan Medical Center, New York',
    rating: 4.9,
    reviews: 1258,
    experience: '10+ years',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
    about: 'Dr. Alana Rueter is a board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology, heart failure management, and cardiac imaging.',
    education: 'MD from Harvard Medical School',
    languages: ['English', 'Spanish', 'French'],
    consultationFee: '$150',
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    services: ['Cardiac Consultation', 'ECG', 'Echocardiogram', 'Stress Testing'],
    achievements: [
      'Best Cardiologist Award 2023',
      'Published 50+ research papers',
      'Fellow of American College of Cardiology'
    ]
  },
  '2': {
    id: 2,
    name: 'Dr. John Wilson',
    specialty: 'Dermatology',
    location: 'Brooklyn Health Clinic, New York',
    rating: 4.8,
    reviews: 956,
    experience: '8+ years',
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: false,
    about: 'Dr. John Wilson is a skilled dermatologist specializing in medical and cosmetic dermatology. He has extensive experience in treating skin conditions and performing aesthetic procedures.',
    education: 'MD from Johns Hopkins University',
    languages: ['English', 'German'],
    consultationFee: '$120',
    availableSlots: ['11:00 AM', '01:00 PM', '04:00 PM'],
    services: ['Skin Consultation', 'Acne Treatment', 'Mole Removal', 'Botox'],
    achievements: [
      'Top Dermatologist 2022',
      'Board Certified Dermatologist',
      'Member of American Academy of Dermatology'
    ]
  },
  '3': {
    id: 3,
    name: 'Dr. Sarah Johnson',
    specialty: 'Neurology',
    location: 'Queens Neurological Institute, New York',
    rating: 4.9,
    reviews: 1432,
    experience: '12+ years',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
    about: 'Dr. Sarah Johnson is a renowned neurologist with expertise in treating neurological disorders including epilepsy, migraines, and movement disorders. She is committed to providing comprehensive neurological care.',
    education: 'MD from Stanford University',
    languages: ['English', 'Mandarin'],
    consultationFee: '$180',
    availableSlots: ['08:30 AM', '10:00 AM', '01:30 PM', '03:00 PM'],
    services: ['Neurological Consultation', 'EEG', 'EMG', 'Migraine Treatment'],
    achievements: [
      'Excellence in Neurology Award 2023',
      'Research Grant Recipient',
      'Published 75+ peer-reviewed articles'
    ]
  }
};

export default function DoctorDetailsScreen() {
  const { doctorId } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState('about');
  
  const doctor = doctorsData[doctorId as string];
  
  if (!doctor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Doctor not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBookAppointment = () => {
    // Navigate to home tab and trigger booking modal
    router.push('/(tabs)');
    // In a real app, you would pass the doctor data to the booking flow
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Doctor Profile Card */}
        <View style={styles.profileCard}>
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
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.locationText}>{doctor.location}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.statText}>{doctor.rating}</Text>
                <Text style={styles.statSubtext}>({doctor.reviews} reviews)</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.statText}>{doctor.experience}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={20} color="#4285F4" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Video size={20} color="#4285F4" />
            <Text style={styles.actionText}>Video Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={20} color="#4285F4" />
            <Text style={styles.actionText}>Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {['about', 'services', 'reviews'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === 'about' && (
            <View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.aboutText}>{doctor.about}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education & Experience</Text>
                <View style={styles.infoRow}>
                  <Award size={20} color="#4285F4" />
                  <Text style={styles.infoText}>{doctor.education}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Clock size={20} color="#4285F4" />
                  <Text style={styles.infoText}>{doctor.experience} of experience</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                <View style={styles.languagesContainer}>
                  {doctor.languages.map((language, index) => (
                    <View key={index} style={styles.languageTag}>
                      <Text style={styles.languageText}>{language}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                {doctor.achievements.map((achievement, index) => (
                  <View key={index} style={styles.achievementItem}>
                    <CheckCircle size={16} color="#10B981" />
                    <Text style={styles.achievementText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {selectedTab === 'services' && (
            <View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Services Offered</Text>
                {doctor.services.map((service, index) => (
                  <View key={index} style={styles.serviceItem}>
                    <CheckCircle size={16} color="#4285F4" />
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Consultation Fee</Text>
                <View style={styles.feeContainer}>
                  <Text style={styles.feeAmount}>{doctor.consultationFee}</Text>
                  <Text style={styles.feeLabel}>per consultation</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Available Time Slots</Text>
                <View style={styles.slotsContainer}>
                  {doctor.availableSlots.map((slot, index) => (
                    <View key={index} style={styles.slotItem}>
                      <Text style={styles.slotText}>{slot}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {selectedTab === 'reviews' && (
            <View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Patient Reviews</Text>
                <View style={styles.reviewsHeader}>
                  <View style={styles.ratingOverview}>
                    <Text style={styles.ratingNumber}>{doctor.rating}</Text>
                    <View style={styles.starsContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          color="#F59E0B"
                          fill={star <= Math.floor(doctor.rating) ? "#F59E0B" : "transparent"}
                        />
                      ))}
                    </View>
                    <Text style={styles.reviewCount}>{doctor.reviews} reviews</Text>
                  </View>
                </View>

                {/* Sample Reviews */}
                <View style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>Sarah M.</Text>
                    <View style={styles.reviewStars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={12} color="#F59E0B" fill="#F59E0B" />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>
                    Excellent doctor! Very thorough examination and clear explanations. 
                    Highly recommend for anyone looking for quality cardiac care.
                  </Text>
                  <Text style={styles.reviewDate}>2 weeks ago</Text>
                </View>

                <View style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>Michael R.</Text>
                    <View style={styles.reviewStars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={12} color="#F59E0B" fill={star <= 4 ? "#F59E0B" : "transparent"} />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewText}>
                    Professional and knowledgeable. The appointment was on time and 
                    the staff was very helpful throughout the process.
                  </Text>
                  <Text style={styles.reviewDate}>1 month ago</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Book Appointment Button */}
      <View style={styles.bookingContainer}>
        <TouchableOpacity 
          style={[styles.bookButton, !doctor.available && styles.bookButtonDisabled]}
          onPress={handleBookAppointment}
          disabled={!doctor.available}
        >
          <Calendar size={20} color="#FFFFFF" />
          <Text style={styles.bookButtonText}>
            {doctor.available ? 'Book Appointment' : 'Currently Unavailable'}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerBackButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  doctorInfo: {
    alignItems: 'center',
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginRight: 12,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  availableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  availableText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
  },
  doctorSpecialty: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#4285F4',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 6,
  },
  statSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4285F4',
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#4285F4',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabContent: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 12,
  },
  aboutText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageTag: {
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  languageText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4285F4',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  serviceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  feeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  feeAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#4285F4',
    marginBottom: 4,
  },
  feeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  slotText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  reviewsHeader: {
    marginBottom: 20,
  },
  ratingOverview: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ratingNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: '#1F2937',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  reviewItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  bookingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  bookButton: {
    backgroundColor: '#4285F4',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#DC2626',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});