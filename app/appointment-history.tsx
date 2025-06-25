import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Calendar, Clock, Video, Phone, Download, RotateCcw, X } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'video' | 'in-person';
  image: string;
  location: string;
  notes?: string;
  prescription?: string;
}

const appointments: Appointment[] = [
  {
    id: 1,
    doctor: 'Dr. Alana Rueter',
    specialty: 'Cardiology',
    date: '2024-02-15',
    time: '09:00 - 10:00',
    status: 'upcoming',
    type: 'video',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Manhattan Medical Center',
  },
  {
    id: 2,
    doctor: 'Dr. John Wilson',
    specialty: 'Dermatology',
    date: '2024-02-20',
    time: '14:00 - 15:00',
    status: 'upcoming',
    type: 'in-person',
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Brooklyn Health Clinic',
  },
  {
    id: 3,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Neurology',
    date: '2024-01-28',
    time: '11:00 - 12:00',
    status: 'completed',
    type: 'video',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Queens Neurological Institute',
    notes: 'Follow-up in 3 months. Continue current medication.',
    prescription: 'Prescribed: Gabapentin 300mg, twice daily',
  },
  {
    id: 4,
    doctor: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    date: '2024-01-25',
    time: '10:30 - 11:30',
    status: 'completed',
    type: 'in-person',
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Heart Care Center',
    notes: 'Blood pressure under control. Continue lifestyle modifications.',
    prescription: 'Prescribed: Lisinopril 10mg, once daily',
  },
  {
    id: 5,
    doctor: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    date: '2024-01-20',
    time: '15:30 - 16:30',
    status: 'completed',
    type: 'in-person',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Children\'s Health Center',
    notes: 'Annual checkup completed. All vitals normal.',
  },
  {
    id: 6,
    doctor: 'Dr. Robert Kim',
    specialty: 'Orthopedic',
    date: '2024-01-15',
    time: '09:00 - 10:00',
    status: 'cancelled',
    type: 'in-person',
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Orthopedic Specialists',
  },
  {
    id: 7,
    doctor: 'Dr. Lisa Thompson',
    specialty: 'General Medicine',
    date: '2024-01-10',
    time: '16:00 - 17:00',
    status: 'cancelled',
    type: 'video',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Family Medicine Clinic',
  },
];

export default function AppointmentHistoryScreen() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const filteredAppointments = appointments.filter(appointment => {
    const matchesTab = selectedTab === 'all' || appointment.status === selectedTab;
    const matchesSearch = searchQuery === '' || 
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = selectedDate === '' || appointment.date === selectedDate;
    
    return matchesTab && matchesSearch && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#4285F4';
      case 'completed':
        return '#10B981';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#EBF4FF';
      case 'completed':
        return '#DCFCE7';
      case 'cancelled':
        return '#FEF2F2';
      default:
        return '#F3F4F6';
    }
  };

  const handleReschedule = (appointmentId: number) => {
    // Navigate to booking with appointment details
    router.push('/(tabs)');
  };

  const handleCancel = (appointmentId: number) => {
    // Handle appointment cancellation
    console.log('Cancel appointment:', appointmentId);
  };

  const handleExport = () => {
    // Handle export functionality
    console.log('Export medical records');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('appointments.title')}</Text>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Download size={20} color="#4285F4" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder={t('common.searchPlaceholder')}
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

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {['upcoming', 'completed', 'cancelled'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {t(`appointments.${tab}`)}
              </Text>
              <Text style={[styles.tabCount, selectedTab === tab && styles.activeTabCount]}>
                {appointments.filter(apt => apt.status === tab).length}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Appointments List */}
        <View style={styles.appointmentsContainer}>
          {filteredAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>{t('appointments.noAppointments')}</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery || selectedDate 
                  ? t('appointments.adjustSearch')
                  : t('appointments.noAppointmentsType', { type: t(`appointments.${selectedTab}`) })}
              </Text>
            </View>
          ) : (
            filteredAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Image source={{ uri: appointment.image }} style={styles.doctorImage} />
                  <View style={styles.appointmentInfo}>
                    <View style={styles.appointmentTitleRow}>
                      <Text style={styles.doctorName}>{appointment.doctor}</Text>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusBgColor(appointment.status) }
                      ]}>
                        <Text style={[
                          styles.statusText,
                          { color: getStatusColor(appointment.status) }
                        ]}>
                          {appointment.status}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.specialty}>{appointment.specialty}</Text>
                    <View style={styles.appointmentDetails}>
                      <View style={styles.detailRow}>
                        <Calendar size={14} color="#6B7280" />
                        <Text style={styles.detailText}>
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{appointment.time}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        {appointment.type === 'video' ? (
                          <Video size={14} color="#6B7280" />
                        ) : (
                          <Phone size={14} color="#6B7280" />
                        )}
                        <Text style={styles.detailText}>
                          {appointment.type === 'video' ? t('appointments.videoCall') : appointment.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Notes and Prescription for completed appointments */}
                {appointment.status === 'completed' && (appointment.notes || appointment.prescription) && (
                  <View style={styles.appointmentNotes}>
                    {appointment.notes && (
                      <View style={styles.noteSection}>
                        <Text style={styles.noteTitle}>{t('common.notes')}:</Text>
                        <Text style={styles.noteText}>{appointment.notes}</Text>
                      </View>
                    )}
                    {appointment.prescription && (
                      <View style={styles.noteSection}>
                        <Text style={styles.noteTitle}>{t('common.prescription')}:</Text>
                        <Text style={styles.noteText}>{appointment.prescription}</Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Action Buttons */}
                {appointment.status === 'upcoming' && (
                  <View style={styles.appointmentActions}>
                    <TouchableOpacity 
                      style={styles.rescheduleButton}
                      onPress={() => handleReschedule(appointment.id)}
                    >
                      <RotateCcw size={16} color="#4285F4" />
                      <Text style={styles.rescheduleText}>{t('appointments.reschedule')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => handleCancel(appointment.id)}
                    >
                      <X size={16} color="#EF4444" />
                      <Text style={styles.cancelText}>{t('appointments.cancel')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinButton}>
                      {appointment.type === 'video' ? (
                        <Video size={16} color="#FFFFFF" />
                      ) : (
                        <Phone size={16} color="#FFFFFF" />
                      )}
                      <Text style={styles.joinButtonText}>
                        {appointment.type === 'video' ? t('appointments.joinCall') : t('appointments.call')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {appointment.status === 'completed' && (
                  <View style={styles.appointmentActions}>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Download size={16} color="#10B981" />
                      <Text style={styles.downloadText}>{t('appointments.downloadReport')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.rebookButton}
                      onPress={() => handleReschedule(appointment.id)}
                    >
                      <Calendar size={16} color="#4285F4" />
                      <Text style={styles.rebookText}>{t('appointments.bookAgain')}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
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
  exportButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    padding: 12,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
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
  dateFilter: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
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
  tabCount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  activeTabCount: {
    color: '#E3F2FD',
  },
  appointmentsContainer: {
    paddingHorizontal: 20,
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
  appointmentTitleRow: {
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
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    textTransform: 'capitalize',
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
  appointmentNotes: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  noteSection: {
    marginBottom: 12,
  },
  noteTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  noteText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  rescheduleButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rescheduleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4285F4',
    marginLeft: 4,
  },
  cancelButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#EF4444',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  joinButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  downloadButton: {
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  downloadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
    marginLeft: 4,
  },
  rebookButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rebookText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4285F4',
    marginLeft: 4,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
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
  summaryNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 4,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
});