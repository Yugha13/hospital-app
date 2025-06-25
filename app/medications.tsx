import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Pill, Plus, Clock, Calendar, MapPin, X, Check } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  startDate: string;
  endDate: string;
  instructions: string;
  status: 'active' | 'completed' | 'discontinued';
}

const medications: Medication[] = [
  {
    id: 1,
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    duration: '30 days',
    prescribedBy: 'Dr. Alana Rueter',
    startDate: '2024-01-15',
    endDate: '2024-02-14',
    instructions: 'Take with or without food. Best taken at the same time each day.',
    status: 'active'
  },
  {
    id: 2,
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '90 days',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2024-01-10',
    endDate: '2024-04-10',
    instructions: 'Take with meals to reduce stomach upset.',
    status: 'active'
  },
  {
    id: 3,
    name: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'As needed',
    duration: '14 days',
    prescribedBy: 'Dr. Michael Chen',
    startDate: '2024-01-20',
    endDate: '2024-02-03',
    instructions: 'Take with food. Do not exceed 6 tablets in 24 hours.',
    status: 'active'
  },
  {
    id: 4,
    name: 'Amoxicillin',
    dosage: '250mg',
    frequency: 'Three times daily',
    duration: '7 days',
    prescribedBy: 'Dr. John Wilson',
    startDate: '2024-01-05',
    endDate: '2024-01-12',
    instructions: 'Complete the full course even if feeling better.',
    status: 'completed'
  }
];

export default function MedicationsScreen() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTab, setSelectedTab] = useState('active');
  
  // Request form state
  const [medicationName, setMedicationName] = useState('');
  const [currentPrescription, setCurrentPrescription] = useState('');
  const [reason, setReason] = useState('');
  const [pharmacy, setPharmacy] = useState('');

  const filteredMedications = medications.filter(med => 
    selectedTab === 'all' || med.status === selectedTab
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'completed':
        return '#6B7280';
      case 'discontinued':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const handleRequestMedication = () => {
    if (!medicationName || !reason) {
      alert('Please fill in all required fields');
      return;
    }
    
    setShowRequestModal(false);
    setShowConfirmation(true);
    
    // Reset form
    setTimeout(() => {
      setMedicationName('');
      setCurrentPrescription('');
      setReason('');
      setPharmacy('');
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medications</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowRequestModal(true)}
        >
          <Plus size={20} color="#4285F4" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Stats */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {medications.filter(m => m.status === 'active').length}
            </Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {medications.filter(m => m.status === 'completed').length}
            </Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{medications.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
        </View>

        {/* Request Medication Button */}
        <View style={styles.requestSection}>
          <TouchableOpacity 
            style={styles.requestButton}
            onPress={() => setShowRequestModal(true)}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.requestButtonText}>Request Medication</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {['active', 'completed', 'all'].map((tab) => (
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

        {/* Medications List */}
        <View style={styles.medicationsSection}>
          {filteredMedications.length === 0 ? (
            <View style={styles.emptyState}>
              <Pill size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No medications found</Text>
              <Text style={styles.emptySubtitle}>
                {selectedTab === 'active' 
                  ? 'You have no active medications' 
                  : 'No medications in this category'}
              </Text>
            </View>
          ) : (
            filteredMedications.map((medication) => (
              <View key={medication.id} style={styles.medicationCard}>
                <View style={styles.medicationHeader}>
                  <View style={[
                    styles.medicationIcon,
                    { backgroundColor: getStatusColor(medication.status) + '20' }
                  ]}>
                    <Pill size={20} color={getStatusColor(medication.status)} />
                  </View>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>{medication.name}</Text>
                    <Text style={styles.medicationDosage}>{medication.dosage} - {medication.frequency}</Text>
                    <Text style={styles.medicationDoctor}>Prescribed by {medication.prescribedBy}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(medication.status) + '20' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(medication.status) }
                    ]}>
                      {medication.status}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.medicationDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={14} color="#6B7280" />
                    <Text style={styles.detailText}>
                      {new Date(medication.startDate).toLocaleDateString()} - {new Date(medication.endDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Clock size={14} color="#6B7280" />
                    <Text style={styles.detailText}>{medication.duration}</Text>
                  </View>
                </View>
                
                <View style={styles.instructionsSection}>
                  <Text style={styles.instructionsTitle}>Instructions:</Text>
                  <Text style={styles.instructionsText}>{medication.instructions}</Text>
                </View>
                
                {medication.status === 'active' && (
                  <View style={styles.medicationActions}>
                    <TouchableOpacity style={styles.refillButton}>
                      <Text style={styles.refillButtonText}>Request Refill</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reminderButton}>
                      <Clock size={16} color="#4285F4" />
                      <Text style={styles.reminderButtonText}>Set Reminder</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Request Medication Modal */}
      <Modal
        visible={showRequestModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Request Medication</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowRequestModal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Medication Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter medication name"
                placeholderTextColor="#9CA3AF"
                value={medicationName}
                onChangeText={setMedicationName}
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Current Prescription Details</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Dosage, frequency, etc."
                placeholderTextColor="#9CA3AF"
                value={currentPrescription}
                onChangeText={setCurrentPrescription}
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Reason for Request *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Describe your symptoms or reason for requesting this medication"
                placeholderTextColor="#9CA3AF"
                value={reason}
                onChangeText={setReason}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Preferred Pharmacy</Text>
              <View style={styles.pharmacyOptions}>
                {['CVS Pharmacy - Main St', 'Walgreens - Broadway', 'Rite Aid - 5th Ave'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.pharmacyOption,
                      pharmacy === option && styles.selectedPharmacyOption
                    ]}
                    onPress={() => setPharmacy(option)}
                  >
                    <MapPin size={16} color={pharmacy === option ? '#4285F4' : '#6B7280'} />
                    <Text style={[
                      styles.pharmacyOptionText,
                      pharmacy === option && styles.selectedPharmacyOptionText
                    ]}>
                      {option}
                    </Text>
                    {pharmacy === option && (
                      <Check size={16} color="#4285F4" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleRequestMedication}
            >
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

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
            <Text style={styles.confirmationTitle}>Request Submitted!</Text>
            <Text style={styles.confirmationText}>
              Your medication request has been submitted successfully. A doctor will review it and get back to you within 24 hours.
            </Text>
          </View>
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    padding: 12,
  },
  summarySection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  summaryCard: {
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
  summaryNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  requestSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  requestButton: {
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
  requestButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
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
  medicationsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  medicationCard: {
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
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  medicationIcon: {
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  medicationDosage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  medicationDoctor: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  medicationDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  instructionsSection: {
    marginBottom: 16,
  },
  instructionsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  instructionsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  medicationActions: {
    flexDirection: 'row',
    gap: 12,
  },
  refillButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  refillButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  reminderButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4285F4',
    marginLeft: 8,
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
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  textArea: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  pharmacyOptions: {
    gap: 12,
  },
  pharmacyOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedPharmacyOption: {
    borderColor: '#4285F4',
    backgroundColor: '#EBF4FF',
  },
  pharmacyOptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
  },
  selectedPharmacyOptionText: {
    color: '#4285F4',
    fontFamily: 'Inter-Medium',
  },
  submitButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
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