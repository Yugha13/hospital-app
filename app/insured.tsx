import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Shield, FileText, Clock, AlertCircle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function InsuranceScreen() {
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
        <Text style={styles.headerTitle}>Insurance Coverage</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* Coverage Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coverage Summary</Text>
          <View style={styles.coverageCard}>
            <View style={styles.coverageHeader}>
              <Shield size={24} color="#4285F4" />
              <View style={styles.coverageInfo}>
                <Text style={styles.planName}>Premium Health Plan</Text>
                <Text style={styles.policyNumber}>Policy #: 1234-5678-9012</Text>
              </View>
            </View>
            <View style={styles.coverageDetails}>
              <View style={styles.coverageItem}>
                <Text style={styles.coverageLabel}>Deductible</Text>
                <Text style={styles.coverageValue}>$500 / $2,000</Text>
              </View>
              <View style={styles.coverageItem}>
                <Text style={styles.coverageLabel}>Out-of-pocket Max</Text>
                <Text style={styles.coverageValue}>$3,000 / $6,000</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Claims */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Claims</Text>
          <View style={styles.claimsCard}>
            <View style={styles.claimItem}>
              <FileText size={20} color="#4285F4" />
              <View style={styles.claimInfo}>
                <Text style={styles.claimTitle}>Annual Checkup</Text>
                <Text style={styles.claimDate}>Feb 15, 2024</Text>
                <Text style={styles.claimAmount}>Amount: $150</Text>
                <Text style={styles.claimStatus}>Status: Approved</Text>
              </View>
            </View>
            <View style={styles.claimItem}>
              <FileText size={20} color="#4285F4" />
              <View style={styles.claimInfo}>
                <Text style={styles.claimTitle}>Prescription Refill</Text>
                <Text style={styles.claimDate}>Feb 10, 2024</Text>
                <Text style={styles.claimAmount}>Amount: $45</Text>
                <Text style={styles.claimStatus}>Status: Processing</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Important Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Dates</Text>
          <View style={styles.datesCard}>
            <View style={styles.dateItem}>
              <Clock size={20} color="#4285F4" />
              <View style={styles.dateInfo}>
                <Text style={styles.dateTitle}>Plan Renewal</Text>
                <Text style={styles.dateValue}>January 1, 2025</Text>
              </View>
            </View>
            <View style={styles.dateItem}>
              <Clock size={20} color="#4285F4" />
              <View style={styles.dateInfo}>
                <Text style={styles.dateTitle}>Open Enrollment</Text>
                <Text style={styles.dateValue}>November 1 - December 15, 2024</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Coverage Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coverage Tips</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>Always carry your insurance card</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>Verify provider network status</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>Keep track of your deductible</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  coverageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  coverageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  coverageInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  policyNumber: {
    fontSize: 14,
    color: '#6B7280',
  },
  coverageDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    gap: 12,
  },
  coverageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverageLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  coverageValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  claimsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  claimItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  claimInfo: {
    flex: 1,
  },
  claimTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  claimDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  claimAmount: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 2,
  },
  claimStatus: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  datesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  dateInfo: {
    flex: 1,
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    color: '#4B5563',
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
  },
});