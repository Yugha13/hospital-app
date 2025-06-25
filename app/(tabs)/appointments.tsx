import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Video, Phone, Filter, MapPin, Star } from 'lucide-react-native';
import { useState } from 'react';

const appointments = [
  {
    id: 1,
    doctor: 'Dr. Alana Rueter',
    specialty: 'Dental Consultation',
    date: 'Today',
    time: '09:00 - 10:00',
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'video',
    location: 'Manhattan Medical Center',
  },
  {
    id: 2,
    doctor: 'Dr. John Wilson',
    specialty: 'Dermatology',
    date: 'Tomorrow',
    time: '14:00 - 15:00',
    status: 'upcoming',
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'in-person',
    location: 'Brooklyn Health Clinic',
  },
  {
    id: 3,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Neurology',
    date: 'Jan 28',
    time: '11:00 - 12:00',
    status: 'completed',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'video',
    location: 'Queens Neurological Institute',
  },
  {
    id: 4,
    doctor: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    date: 'Jan 25',
    time: '10:30 - 11:30',
    status: 'completed',
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'in-person',
    location: 'Heart Care Center',
  },
  {
    id: 5,
    doctor: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    date: 'Jan 20',
    time: '15:30 - 16:30',
    status: 'completed',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'in-person',
    location: 'Children\'s Health Center',
  },
];

export default function AppointmentsScreen() {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const filteredAppointments = appointments.filter(appointment => 
    selectedTab === 'all' || appointment.status === selectedTab
  );

  const upcomingCount = appointments.filter(apt => apt.status === 'upcoming').length;
  const completedCount = appointments.filter(apt => apt.status === 'completed').length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Appointments</Text>
          <Text style={styles.subtitle}>Manage your healthcare schedule</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#4285F4" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{upcomingCount}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
            <View style={styles.statIndicator} />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
            <View style={[styles.statIndicator, styles.completedIndicator]} />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{appointments.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
            <View style={[styles.statIndicator, styles.totalIndicator]} />
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {['upcoming', 'completed', 'all'].map((tab) => (
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

        {/* Appointments List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedTab === 'upcoming' ? 'Upcoming Appointments' : 
             selectedTab === 'completed' ? 'Past Appointments' : 'All Appointments'}
          </Text>
          
          {filteredAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No appointments found</Text>
              <Text style={styles.emptySubtitle}>
                {selectedTab === 'upcoming' 
                  ? 'You have no upcoming appointments' 
                  : 'No appointments in this category'}
              </Text>
            </View>
          ) : (
            filteredAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Image source={{ uri: appointment.image }} style={styles.doctorImage} />
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.doctorName}>{appointment.doctor}</Text>
                    <Text style={styles.specialty}>{appointment.specialty}</Text>
                    <View style={styles.appointmentDetails}>
                      <View style={styles.detailRow}>
                        <Calendar size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{appointment.date}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{appointment.time}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <MapPin size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{appointment.location}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, 
                    appointment.status === 'upcoming' ? styles.upcomingBadge : styles.completedBadge
                  ]}>
                    <Text style={[styles.statusText,
                      appointment.status === 'upcoming' ? styles.upcomingText : styles.completedText
                    ]}>
                      {appointment.status}
                    </Text>
                  </View>
                </View>
                
                {appointment.status === 'upcoming' && (
                  <View style={styles.appointmentActions}>
                    <TouchableOpacity style={styles.rescheduleButton}>
                      <Text style={styles.rescheduleText}>Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinButton}>
                      {appointment.type === 'video' ? (
                        <Video size={16} color="#FFFFFF" />
                      ) : (
                        <Phone size={16} color="#FFFFFF" />
                      )}
                      <Text style={styles.joinButtonText}>
                        {appointment.type === 'video' ? 'Join Call' : 'Call'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {appointment.status === 'completed' && (
                  <View style={styles.completedActions}>
                    <TouchableOpacity style={styles.reviewButton}>
                      <Star size={16} color="#F59E0B" />
                      <Text style={styles.reviewText}>Leave Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rebookButton}>
                      <Calendar size={16} color="#4285F4" />
                      <Text style={styles.rebookText}>Book Again</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* Patient Information Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.patientCard}>
            <View style={styles.patientRow}>
              <Text style={styles.patientLabel}>Patient ID:</Text>
              <Text style={styles.patientValue}>HC-2024-001</Text>
            </View>
            <View style={styles.patientRow}>
              <Text style={styles.patientLabel}>Insurance:</Text>
              <Text style={styles.patientValue}>Blue Cross Blue Shield</Text>
            </View>
            <View style={styles.patientRow}>
              <Text style={styles.patientLabel}>Primary Care:</Text>
              <Text style={styles.patientValue}>Dr. Sarah Johnson</Text>
            </View>
            <View style={styles.patientRow}>
              <Text style={styles.patientLabel}>Emergency Contact:</Text>
              <Text style={styles.patientValue}>John Johnson (+1 555-987-6543)</Text>
            </View>
          </View>
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
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  filterButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    padding: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
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
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  statIndicator: {
    width: 24,
    height: 3,
    backgroundColor: '#4285F4',
    borderRadius: 2,
  },
  completedIndicator: {
    backgroundColor: '#10B981',
  },
  totalIndicator: {
    backgroundColor: '#F59E0B',
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
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
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
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  specialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  appointmentDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  upcomingBadge: {
    backgroundColor: '#DBEAFE',
  },
  completedBadge: {
    backgroundColor: '#DCFCE7',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  upcomingText: {
    color: '#1D4ED8',
  },
  completedText: {
    color: '#16A34A',
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rescheduleButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  rescheduleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  joinButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  completedActions: {
    flexDirection: 'row',
    gap: 12,
  },
  reviewButton: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#D97706',
    marginLeft: 8,
  },
  rebookButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rebookText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4285F4',
    marginLeft: 8,
  },
  patientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  patientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  patientLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  patientValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
  },
});