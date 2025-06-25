import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Phone, Clock, Star, Users, Award, Building2, Car, Wifi, Coffee, Accessibility } from 'lucide-react-native';
import { router } from 'expo-router';

const departments = [
  { name: 'Emergency Department', icon: '🚨', available: '24/7' },
  { name: 'Cardiology', icon: '❤️', available: 'Mon-Fri 8AM-6PM' },
  { name: 'Neurology', icon: '🧠', available: 'Mon-Fri 9AM-5PM' },
  { name: 'Orthopedics', icon: '🦴', available: 'Mon-Sat 8AM-4PM' },
  { name: 'Pediatrics', icon: '👶', available: 'Mon-Fri 8AM-6PM' },
  { name: 'Radiology', icon: '📷', available: 'Mon-Fri 7AM-7PM' },
  { name: 'Laboratory', icon: '🔬', available: 'Mon-Fri 6AM-8PM' },
  { name: 'Pharmacy', icon: '💊', available: 'Mon-Fri 8AM-8PM' },
];

const facilities = [
  { name: 'Free Parking', icon: Car },
  { name: 'Free WiFi', icon: Wifi },
  { name: 'Cafeteria', icon: Coffee },
  { name: 'Wheelchair Access', icon: Accessibility },
];

export default function HospitalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Hospital</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hospital Hero Image */}
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.hospitalName}>Manhattan Medical Center</Text>
            <View style={styles.hospitalRating}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>4.8</Text>
              <Text style={styles.reviewsText}>(2,456 reviews)</Text>
            </View>
          </View>
        </View>

        {/* Quick Info */}
        <View style={styles.quickInfoSection}>
          <View style={styles.quickInfoCard}>
            <View style={styles.quickInfoItem}>
              <MapPin size={20} color="#4285F4" />
              <View style={styles.quickInfoText}>
                <Text style={styles.quickInfoLabel}>Address</Text>
                <Text style={styles.quickInfoValue}>123 Medical Plaza, New York, NY 10001</Text>
              </View>
            </View>
            <View style={styles.quickInfoItem}>
              <Phone size={20} color="#4285F4" />
              <View style={styles.quickInfoText}>
                <Text style={styles.quickInfoLabel}>Phone</Text>
                <Text style={styles.quickInfoValue}>+1 (555) 123-4567</Text>
              </View>
            </View>
            <View style={styles.quickInfoItem}>
              <Clock size={20} color="#4285F4" />
              <View style={styles.quickInfoText}>
                <Text style={styles.quickInfoLabel}>Emergency</Text>
                <Text style={styles.quickInfoValue}>24/7 Available</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Our Hospital</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              Manhattan Medical Center is a leading healthcare facility committed to providing exceptional medical care to our community. With over 50 years of experience, we combine cutting-edge technology with compassionate care to deliver the best possible outcomes for our patients.
            </Text>
            <Text style={styles.aboutText}>
              Our team of highly skilled physicians, nurses, and healthcare professionals work together to ensure that every patient receives personalized, comprehensive care in a comfortable and healing environment.
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hospital Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Beds</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>200+</Text>
              <Text style={styles.statLabel}>Doctors</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Emergency</Text>
            </View>
          </View>
        </View>

        {/* Departments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Departments</Text>
          <View style={styles.departmentsGrid}>
            {departments.map((dept, index) => (
              <View key={index} style={styles.departmentCard}>
                <Text style={styles.departmentIcon}>{dept.icon}</Text>
                <Text style={styles.departmentName}>{dept.name}</Text>
                <Text style={styles.departmentHours}>{dept.available}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Facilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities & Amenities</Text>
          <View style={styles.facilitiesGrid}>
            {facilities.map((facility, index) => (
              <View key={index} style={styles.facilityCard}>
                <View style={styles.facilityIcon}>
                  <facility.icon size={24} color="#4285F4" />
                </View>
                <Text style={styles.facilityName}>{facility.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Awards & Certifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Awards & Certifications</Text>
          <View style={styles.awardsCard}>
            <View style={styles.awardItem}>
              <Award size={20} color="#F59E0B" />
              <Text style={styles.awardText}>Joint Commission Accredited</Text>
            </View>
            <View style={styles.awardItem}>
              <Award size={20} color="#F59E0B" />
              <Text style={styles.awardText}>Magnet Recognition for Nursing Excellence</Text>
            </View>
            <View style={styles.awardItem}>
              <Award size={20} color="#F59E0B" />
              <Text style={styles.awardText}>Top 100 Hospitals in America</Text>
            </View>
            <View style={styles.awardItem}>
              <Award size={20} color="#F59E0B" />
              <Text style={styles.awardText}>Patient Safety Excellence Award</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Building2 size={20} color="#4285F4" />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Main Hospital</Text>
                <Text style={styles.contactValue}>123 Medical Plaza, New York, NY 10001</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Phone size={20} color="#4285F4" />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>General Information</Text>
                <Text style={styles.contactValue}>+1 (555) 123-4567</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Phone size={20} color="#DC2626" />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Emergency</Text>
                <Text style={styles.contactValue}>+1 (555) 911-HELP</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Users size={20} color="#4285F4" />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Patient Services</Text>
                <Text style={styles.contactValue}>+1 (555) 123-CARE</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.primaryButton}>
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Call Hospital</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <MapPin size={20} color="#4285F4" />
            <Text style={styles.secondaryButtonText}>Get Directions</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
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
  heroSection: {
    position: 'relative',
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  hospitalName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  hospitalRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  reviewsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E5E7EB',
    marginLeft: 8,
  },
  quickInfoSection: {
    padding: 20,
  },
  quickInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickInfoText: {
    marginLeft: 12,
    flex: 1,
  },
  quickInfoLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  quickInfoValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 16,
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  aboutText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    minWidth: '22%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#4285F4',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  departmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  departmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  departmentIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  departmentName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  departmentHours: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  facilityIcon: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  facilityName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'center',
  },
  awardsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  awardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  awardText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  contactText: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4285F4',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4285F4',
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4285F4',
    marginLeft: 8,
  },
});