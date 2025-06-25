import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Download, Calendar, Search } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface MedicalRecord {
  id: number;
  type: string;
  date: string;
  doctor: string;
  description: string;
  fileUrl?: string;
}

const medicalRecords: MedicalRecord[] = [
  {
    id: 1,
    type: 'Lab Report',
    date: '2024-01-15',
    doctor: 'Dr. Alana Rueter',
    description: 'Complete Blood Count (CBC)',
    fileUrl: 'https://example.com/lab-report.pdf'
  },
  {
    id: 2,
    type: 'X-Ray',
    date: '2024-01-10',
    doctor: 'Dr. John Wilson',
    description: 'Chest X-Ray',
    fileUrl: 'https://example.com/x-ray.pdf'
  },
  {
    id: 3,
    type: 'Prescription',
    date: '2024-01-05',
    doctor: 'Dr. Sarah Johnson',
    description: 'Medication for Hypertension',
    fileUrl: 'https://example.com/prescription.pdf'
  },
];

export default function MedicalRecordsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = medicalRecords.filter(record =>
    record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Text style={styles.headerTitle}>Medical Records</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search records..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Records List */}
        <View style={styles.recordsList}>
          {filteredRecords.map(record => (
            <View key={record.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <View style={styles.recordType}>
                  <FileText size={20} color="#4285F4" />
                  <Text style={styles.recordTypeText}>{record.type}</Text>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <Download size={20} color="#4285F4" />
                </TouchableOpacity>
              </View>
              <View style={styles.recordInfo}>
                <Text style={styles.recordDescription}>{record.description}</Text>
                <View style={styles.recordMeta}>
                  <View style={styles.metaItem}>
                    <Calendar size={14} color="#6B7280" />
                    <Text style={styles.metaText}>{record.date}</Text>
                  </View>
                  <Text style={styles.doctorName}>{record.doctor}</Text>
                </View>
              </View>
            </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerSpacer: {
    width: 32,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  recordsList: {
    padding: 20,
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordTypeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  downloadButton: {
    padding: 8,
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
  },
  recordInfo: {
    gap: 8,
  },
  recordDescription: {
    fontSize: 14,
    color: '#4B5563',
  },
  recordMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  doctorName: {
    fontSize: 12,
    color: '#6B7280',
  },
});