import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

const statusFilters = [
  { id: 'pending', name: 'Pending', icon: Clock },
  { id: 'accepted', name: 'Accepted', icon: CheckCircle },
  { id: 'rejected', name: 'Rejected', icon: XCircle },
];

const mockRequests = [
  {
    id: 1,
    medication: 'Amoxicillin 500mg',
    doctor: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    status: 'pending',
    notes: 'Prescription renewal request',
  },
  {
    id: 2,
    medication: 'Lisinopril 10mg',
    doctor: 'Dr. Michael Brown',
    date: '2024-01-14',
    status: 'accepted',
    notes: 'Monthly prescription',
  },
  {
    id: 3,
    medication: 'Metformin 1000mg',
    doctor: 'Dr. Emily Davis',
    date: '2024-01-13',
    status: 'rejected',
    notes: 'Requires in-person consultation',
  },
];

export default function MedicationRequestsScreen() {
  const [selectedStatus, setSelectedStatus] = useState('pending');

  const filteredRequests = mockRequests.filter(request => request.status === selectedStatus);

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
        <Text style={styles.headerTitle}>Medication Requests</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Status Filter */}
      <View style={styles.filterContainer}>
        {statusFilters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedStatus === filter.id && styles.filterChipActive
            ]}
            onPress={() => setSelectedStatus(filter.id)}
          >
            <filter.icon
              size={20}
              color={selectedStatus === filter.id ? '#4285F4' : '#6B7280'}
            />
            <Text style={[
              styles.filterChipText,
              selectedStatus === filter.id && styles.filterChipTextActive
            ]}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Requests List */}
      <ScrollView style={styles.requestsList}>
        {filteredRequests.map(request => (
          <View key={request.id} style={styles.requestCard}>
            <Text style={styles.medicationName}>{request.medication}</Text>
            <Text style={styles.doctorName}>{request.doctor}</Text>
            <Text style={styles.requestDate}>{request.date}</Text>
            <Text style={styles.requestNotes}>{request.notes}</Text>
          </View>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    gap: 8,
  },
  filterChipActive: {
    backgroundColor: '#EBF5FF',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterChipTextActive: {
    color: '#4285F4',
  },
  requestsList: {
    flex: 1,
    padding: 16,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  requestDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  requestNotes: {
    fontSize: 14,
    color: '#4B5563',
    fontStyle: 'italic',
  },
});