import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, MapPin, Phone, Plus, Video, Calendar, Heart, Pill, Clock, X, Check, FileText, Building2, User, Share as Pharmacy, ChevronDown, ChevronUp, HelpCircle, Activity, Shield } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
];


const doctors = [
  {
    id: 1,
    name: 'Dr. Alana Rueter',
    specialty: 'Cardiology',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    name: 'Dr. John Wilson',
    specialty: 'Dermatology',
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    specialty: 'Neurology',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function HomeScreen() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('8');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [appointmentType, setAppointmentType] = useState<'video' | 'in-person'>('video');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
 

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedTime) {
      alert('Please select a doctor and time slot');
      return;
    }
    
    setShowBookingModal(false);
    setShowConfirmation(true);
    
    setTimeout(() => {
      setSelectedDoctor(null);
      setSelectedTime('');
      setNotes('');
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#4B5563" />
              <Text style={styles.locationText}>New York, USA</Text>
            </View>
            <Text style={styles.welcomeText}>Good Morning, John! 👋</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/notifications')}
            >
              <Bell size={24} color="#4B5563" />
              <View style={styles.notificationBadge}>
                
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Appointment CTA */}
        <View style={styles.bookingCTAContainer}>
          <View style={styles.bookingCTA}>
            <View style={styles.bookingCTAContent}>
              <Text style={styles.bookingCTATitle}>Need Medical Care?</Text>
              <Text style={styles.bookingCTASubtitle}>Book an appointment with our qualified doctors</Text>
              <TouchableOpacity 
                style={styles.bookingCTAButton}
                onPress={() => setShowBookingModal(true)}
              >
                <Calendar size={20} color="#FFFFFF" />
                <Text style={styles.bookingCTAButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.bookingCTAImage}
            />
          </View>
        </View>

       
        {/* Emergency Section */}
        <View style={styles.emergencyContainer}>
          <View style={styles.emergencyContent}>
            <View style={styles.emergencyLeft}>
              <Text style={styles.emergencyTitle}>Emergency Contact</Text>
              <Text style={styles.emergencySubtitle}>Call 911 or your emergency contact</Text>
            </View>
            <TouchableOpacity style={styles.emergencyButton}>
              <Phone size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={() => router.push('/appointment-history')}>              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.doctorImage}
              />
              <View style={styles.appointmentInfo}>
                <Text style={styles.doctorName}>Dr. Alana Rueter</Text>
                <Text style={styles.doctorSpecialty}>Dental Consultation</Text>
                <View style={styles.appointmentTime}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.timeText}>Monday, Jan 30 | 09:00 - 10:00</Text>
                </View>
              </View>
            </View>
            <View style={styles.appointmentActions}>
              <TouchableOpacity style={styles.videoCallButton}>
                <Video size={16} color="#FFFFFF" />
                <Text style={styles.videoCallText}>Video Call</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => setShowBookingModal(true)}
            >
              <View style={styles.quickActionIcon}>
                <Calendar size={24} color="#4285F4" />
              </View>
              <Text style={styles.quickActionText}>Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push('/lab-results')}
            >
              <View style={styles.quickActionIcon}>
                <FileText size={24} color="#4285F4" />
              </View>
              <Text style={styles.quickActionText}>Lab Results</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push('/medications')}
            >
              <View style={styles.quickActionIcon}>
                <Pill size={24} color="#4285F4" />
              </View>
              <Text style={styles.quickActionText}>Medications</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => setShowMoreOptions(!showMoreOptions)}
            >
              <View style={styles.quickActionIcon}>
                {showMoreOptions ? (
                  <ChevronUp size={24} color="#4285F4" />
                ) : (
                  <Plus size={24} color="#4285F4" />
                )}
              </View>
              <Text style={styles.quickActionText}>More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* More Options - Expandable */}
        {showMoreOptions && (
          <View style={styles.moreOptionsContainer}>
            {/* Health Needs */}
            <View style={styles.moreSection}>
              <Text style={styles.moreSectionTitle}>Health Needs</Text>
              <View style={styles.quickActionsGrid}>
                <TouchableOpacity 
                  style={styles.quickActionCard}
                  onPress={() => router.push('/appointment-history')}
                >
                  <View style={styles.quickActionIcon}>
                    <Calendar size={24} color="#4285F4" />
                  </View>
                  <Text style={styles.quickActionText}>Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickActionCard}
                  onPress={() => router.push('/hospital')}
                >
                  <View style={styles.quickActionIcon}>
                    <Building2 size={24} color="#4285F4" />
                  </View>
                  <Text style={styles.quickActionText}>Hospital</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickActionCard}
                  onPress={() => router.push('/covid-19')}
                >
                  <View style={styles.quickActionIcon}>
                    <Shield size={24} color="#4285F4" />
                  </View>
                  <Text style={styles.quickActionText}>Covid-19</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickActionCard}
                  onPress={() => router.push('/health-tracking')}
                >
                  <View style={styles.quickActionIcon}>
                    <Pharmacy size={24} color="#4285F4" />
                  </View>
                  <Text style={styles.quickActionText}>Pharmacy</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Specialised Care */}
            <View style={styles.moreSection}>
              <Text style={styles.moreSectionTitle}>Specialised Care</Text>
              <View style={styles.quickActionsGrid}>
                <TouchableOpacity 
                  style={styles.quickActionCard}
                  onPress={() => router.push('/health-tracking')}
                >
                  <View style={styles.quickActionIcon}>
                    <Activity size={24} color="#4285F4" />
                  </View>
                  <Text style={styles.quickActionText}>Diabetes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickActionCard}
                  onPress={() => router.push('/heart-care')}
                >
                  <View style={styles.quickActionIcon}>
                    <Heart size={24} color="#4285F4" />
                  </View>
                  <Text style={styles.quickActionText}>Heart Care</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickActionCard}
                  onPress={() => router.push('/health-tracking')}
                >
                  <View style={styles.quickActionIcon}>
                    <Heart size={24} color="#4285F4" />
                  </View>
                  <Text style={styles.quickActionText}>Dental</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.quickActionCard}
                  onPress={() => router.push('/insured')}
                >
                  <View style={styles.quickActionIcon}>
                    <Shield size={24} color="#4285F4" />
                  </View>
                  <Text style={styles.quickActionText}>Insured</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
          
        )}
      
        {/* Health Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Summary</Text>
          <View style={styles.healthSummaryCard}>
            <View style={styles.healthMetric}>
              <Text style={styles.healthMetricValue}>120/80</Text>
              <Text style={styles.healthMetricLabel}>Blood Pressure</Text>
              <Text style={styles.healthMetricStatus}>Normal</Text>
            </View>
            <View style={styles.healthMetric}>
              <Text style={styles.healthMetricValue}>72</Text>
              <Text style={styles.healthMetricLabel}>Heart Rate</Text>
              <Text style={styles.healthMetricStatus}>Normal</Text>
            </View>
            <View style={styles.healthMetric}>
              <Text style={styles.healthMetricValue}>98.6°F</Text>
              <Text style={styles.healthMetricLabel}>Temperature</Text>
              <Text style={styles.healthMetricStatus}>Normal</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Activity size={16} color="#4285F4" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Lab Results Available</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Pill size={16} color="#10B981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Medication Taken</Text>
                <Text style={styles.activityTime}>4 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Calendar size={16} color="#F59E0B" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Appointment Confirmed</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
          </View>
        </View>
      
    
  );

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Book Appointment</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowBookingModal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Doctor Selection */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Select Doctor</Text>
              <View style={styles.doctorsList}>
                {doctors.map((doctor) => (
                  <TouchableOpacity
                    key={doctor.id}
                    style={[
                      styles.doctorOption,
                      selectedDoctor === doctor.id && styles.selectedDoctorOption
                    ]}
                    onPress={() => setSelectedDoctor(doctor.id)}
                  >
                    <Image source={{ uri: doctor.image }} style={styles.doctorOptionImage} />
                    <View style={styles.doctorOptionInfo}>
                      <Text style={styles.doctorOptionName}>{doctor.name}</Text>
                      <Text style={styles.doctorOptionSpecialty}>{doctor.specialty}</Text>
                    </View>
                    {selectedDoctor === doctor.id && (
                      <Check size={20} color="#4285F4" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date Selection */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Select Date</Text>
              <View style={styles.datesContainer}>
                {[6, 7, 8, 9, 10, 11, 12].map((date) => (
                  <TouchableOpacity
                    key={date}
                    style={[styles.dateItem, selectedDate === date.toString() && styles.selectedDate]}
                    onPress={() => setSelectedDate(date.toString())}
                  >
                    <Text style={[styles.dateText, selectedDate === date.toString() && styles.selectedDateText]}>
                      {date}
                    </Text>
                    <Text style={[styles.dayText, selectedDate === date.toString() && styles.selectedDayText]}>
                      {['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'][date - 6]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Time Selection */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Available Times</Text>
              <View style={styles.timeSlots}>
                {timeSlots.map((time) => (
                  <TouchableOpacity 
                    key={time} 
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.selectedTimeSlot
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[
                      styles.timeSlotText,
                      selectedTime === time && styles.selectedTimeSlotText
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Appointment Type */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Appointment Type</Text>
              <View style={styles.appointmentTypes}>
                <TouchableOpacity
                  style={[
                    styles.appointmentTypeOption,
                    appointmentType === 'video' && styles.selectedAppointmentType
                  ]}
                  onPress={() => setAppointmentType('video')}
                >
                  <Video size={20} color={appointmentType === 'video' ? '#FFFFFF' : '#4285F4'} />
                  <Text style={[
                    styles.appointmentTypeText,
                    appointmentType === 'video' && styles.selectedAppointmentTypeText
                  ]}>
                    Video Call
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.appointmentTypeOption,
                    appointmentType === 'in-person' && styles.selectedAppointmentType
                  ]}
                  onPress={() => setAppointmentType('in-person')}
                >
                  <MapPin size={20} color={appointmentType === 'in-person' ? '#FFFFFF' : '#4285F4'} />
                  <Text style={[
                    styles.appointmentTypeText,
                    appointmentType === 'in-person' && styles.selectedAppointmentTypeText
                  ]}>
                    In-Person
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Notes */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Additional Notes (Optional)</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Describe your symptoms or concerns..."
                placeholderTextColor="#9CA3AF"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity 
              style={styles.bookButton}
              onPress={handleBookAppointment}
            >
              <Text style={styles.bookButtonText}>Confirm Appointment</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        animationType="fade"
        transparent
      >
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationModal}>
            <View style={styles.confirmationIcon}>
              <Check size={32} color="#10B981" />
            </View>
            <Text style={styles.confirmationTitle}>Appointment Booked!</Text>
            <Text style={styles.confirmationText}>
              Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.
            </Text>
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '1%',
    marginBottom: 16,
  },
  gridItemText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
    marginTop: 8,
    textAlign: 'center',
  },
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
  headerLeft: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  bookingCTAContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  bookingCTA: {
    backgroundColor: '#4285F4',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bookingCTAContent: {
    flex: 1,
  },
  bookingCTATitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bookingCTASubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E3F2FD',
    marginBottom: 16,
  },
  bookingCTAButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  bookingCTAButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4285F4',
    marginLeft: 8,
  },
  bookingCTAImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 16,
  },
  emergencyContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  emergencyContent: {
    backgroundColor: '#DC2626',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emergencyLeft: {
    flex: 1,
  },
  emergencyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  emergencySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FEE2E2',
  },
  emergencyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
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
  seeAllButton: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4285F4',
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  appointmentActions: {
    flexDirection: 'row',
  },
  videoCallButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoCallText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'center',
  },
  moreOptionsContainer: {
    marginHorizontal: 20,
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  moreSection: {
    marginBottom: 24,
  },
  moreSectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 16,
  },
  healthSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  healthMetric: {
    alignItems: 'center',
  },
  healthMetricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  healthMetricLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  healthMetricStatus: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formSection: {
    marginVertical: 20,
  },
  formLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  doctorsList: {
    gap: 12,
  },
  doctorOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedDoctorOption: {
    borderColor: '#4285F4',
    backgroundColor: '#EBF4FF',
  },
  doctorOptionImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  doctorOptionInfo: {
    flex: 1,
  },
  doctorOptionName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorOptionSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    minWidth: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedDate: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  dateText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  dayText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedTimeSlot: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  timeSlotText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
  },
  appointmentTypes: {
    flexDirection: 'row',
    gap: 12,
  },
  appointmentTypeOption: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedAppointmentType: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  appointmentTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4285F4',
    marginLeft: 8,
  },
  selectedAppointmentTypeText: {
    color: '#FFFFFF',
  },
  notesInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  // Confirmation Modal
  confirmationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  confirmationModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    maxWidth: 300,
    width: '100%',
  },
  confirmationIcon: {
    backgroundColor: '#DCFCE7',
    borderRadius: 50,
    padding: 16,
    marginBottom: 16,
  },
  confirmationTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});