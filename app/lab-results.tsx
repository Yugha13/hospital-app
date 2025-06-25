import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Download, Share, FileText, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface LabResult {
  id: number;
  testName: string;
  date: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  results: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'normal' | 'high' | 'low' | 'critical';
  }[];
  doctorName: string;
  notes?: string;
}

const labResults: LabResult[] = [
  {
    id: 1,
    testName: 'Complete Blood Count (CBC)',
    date: '2024-01-28',
    status: 'normal',
    doctorName: 'Dr. Sarah Johnson',
    results: [
      {
        parameter: 'White Blood Cells',
        value: '7.2',
        unit: 'K/uL',
        referenceRange: '4.0-11.0',
        status: 'normal'
      },
      {
        parameter: 'Red Blood Cells',
        value: '4.8',
        unit: 'M/uL',
        referenceRange: '4.2-5.4',
        status: 'normal'
      },
      {
        parameter: 'Hemoglobin',
        value: '14.2',
        unit: 'g/dL',
        referenceRange: '12.0-16.0',
        status: 'normal'
      },
      {
        parameter: 'Hematocrit',
        value: '42.1',
        unit: '%',
        referenceRange: '36.0-46.0',
        status: 'normal'
      }
    ]
  },
  {
    id: 2,
    testName: 'Lipid Panel',
    date: '2024-01-25',
    status: 'high',
    doctorName: 'Dr. Alana Rueter',
    notes: 'Cholesterol levels slightly elevated. Recommend dietary changes.',
    results: [
      {
        parameter: 'Total Cholesterol',
        value: '220',
        unit: 'mg/dL',
        referenceRange: '<200',
        status: 'high'
      },
      {
        parameter: 'LDL Cholesterol',
        value: '145',
        unit: 'mg/dL',
        referenceRange: '<100',
        status: 'high'
      },
      {
        parameter: 'HDL Cholesterol',
        value: '55',
        unit: 'mg/dL',
        referenceRange: '>40',
        status: 'normal'
      },
      {
        parameter: 'Triglycerides',
        value: '98',
        unit: 'mg/dL',
        referenceRange: '<150',
        status: 'normal'
      }
    ]
  },
  {
    id: 3,
    testName: 'Basic Metabolic Panel',
    date: '2024-01-20',
    status: 'normal',
    doctorName: 'Dr. Michael Chen',
    results: [
      {
        parameter: 'Glucose',
        value: '92',
        unit: 'mg/dL',
        referenceRange: '70-100',
        status: 'normal'
      },
      {
        parameter: 'Sodium',
        value: '140',
        unit: 'mEq/L',
        referenceRange: '136-145',
        status: 'normal'
      },
      {
        parameter: 'Potassium',
        value: '4.2',
        unit: 'mEq/L',
        referenceRange: '3.5-5.0',
        status: 'normal'
      },
      {
        parameter: 'Creatinine',
        value: '0.9',
        unit: 'mg/dL',
        referenceRange: '0.6-1.2',
        status: 'normal'
      }
    ]
  },
  {
    id: 4,
    testName: 'Thyroid Function Test',
    date: '2024-01-15',
    status: 'low',
    doctorName: 'Dr. Emily Rodriguez',
    notes: 'TSH slightly below normal range. Follow-up recommended.',
    results: [
      {
        parameter: 'TSH',
        value: '0.3',
        unit: 'mIU/L',
        referenceRange: '0.4-4.0',
        status: 'low'
      },
      {
        parameter: 'Free T4',
        value: '1.2',
        unit: 'ng/dL',
        referenceRange: '0.8-1.8',
        status: 'normal'
      },
      {
        parameter: 'Free T3',
        value: '3.1',
        unit: 'pg/mL',
        referenceRange: '2.3-4.2',
        status: 'normal'
      }
    ]
  }
];

export default function LabResultsScreen() {
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return '#10B981';
      case 'high':
        return '#F59E0B';
      case 'low':
        return '#3B82F6';
      case 'critical':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high':
        return <TrendingUp size={16} color="#F59E0B" />;
      case 'low':
        return <TrendingDown size={16} color="#3B82F6" />;
      case 'normal':
        return <Minus size={16} color="#10B981" />;
      default:
        return <Minus size={16} color="#6B7280" />;
    }
  };

  const handleDownload = (result: LabResult) => {
    Alert.alert(
      'Download Report',
      `Download ${result.testName} report?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => console.log('Downloading...') }
      ]
    );
  };

  const handleShare = (result: LabResult) => {
    Alert.alert(
      'Share Report',
      `Share ${result.testName} report?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Sharing...') }
      ]
    );
  };

  if (selectedResult) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setSelectedResult(null)}
          >
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Test Results</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerActionButton}
              onPress={() => handleShare(selectedResult)}
            >
              <Share size={20} color="#4285F4" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerActionButton}
              onPress={() => handleDownload(selectedResult)}
            >
              <Download size={20} color="#4285F4" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.detailContainer}>
          {/* Test Info */}
          <View style={styles.testInfoCard}>
            <Text style={styles.testName}>{selectedResult.testName}</Text>
            <View style={styles.testMeta}>
              <View style={styles.testMetaItem}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.testMetaText}>
                  {new Date(selectedResult.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
              <Text style={styles.doctorName}>Ordered by {selectedResult.doctorName}</Text>
            </View>
            <View style={[
              styles.overallStatus,
              { backgroundColor: getStatusColor(selectedResult.status) + '20' }
            ]}>
              {getStatusIcon(selectedResult.status)}
              <Text style={[
                styles.overallStatusText,
                { color: getStatusColor(selectedResult.status) }
              ]}>
                Overall: {selectedResult.status.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Results */}
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>Test Results</Text>
            {selectedResult.results.map((result, index) => (
              <View key={index} style={styles.resultItem}>
                <View style={styles.resultHeader}>
                  <Text style={styles.parameterName}>{result.parameter}</Text>
                  {getStatusIcon(result.status)}
                </View>
                <View style={styles.resultValues}>
                  <Text style={[
                    styles.resultValue,
                    { color: getStatusColor(result.status) }
                  ]}>
                    {result.value} {result.unit}
                  </Text>
                  <Text style={styles.referenceRange}>
                    Reference: {result.referenceRange} {result.unit}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Notes */}
          {selectedResult.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.sectionTitle}>Doctor's Notes</Text>
              <Text style={styles.notesText}>{selectedResult.notes}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lab Results</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Stats */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{labResults.length}</Text>
            <Text style={styles.summaryLabel}>Total Tests</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {labResults.filter(r => r.status === 'normal').length}
            </Text>
            <Text style={styles.summaryLabel}>Normal</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {labResults.filter(r => r.status !== 'normal').length}
            </Text>
            <Text style={styles.summaryLabel}>Needs Attention</Text>
          </View>
        </View>

        {/* Results List */}
        <View style={styles.resultsListSection}>
          <Text style={styles.sectionTitle}>Recent Results</Text>
          {labResults.map((result) => (
            <TouchableOpacity
              key={result.id}
              style={styles.resultCard}
              onPress={() => setSelectedResult(result)}
            >
              <View style={styles.resultCardHeader}>
                <View style={styles.resultCardLeft}>
                  <View style={[
                    styles.resultIcon,
                    { backgroundColor: getStatusColor(result.status) + '20' }
                  ]}>
                    <FileText size={20} color={getStatusColor(result.status)} />
                  </View>
                  <View style={styles.resultCardInfo}>
                    <Text style={styles.resultCardTitle}>{result.testName}</Text>
                    <Text style={styles.resultCardDate}>
                      {new Date(result.date).toLocaleDateString()}
                    </Text>
                    <Text style={styles.resultCardDoctor}>{result.doctorName}</Text>
                  </View>
                </View>
                <View style={styles.resultCardRight}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(result.status) + '20' }
                  ]}>
                    {getStatusIcon(result.status)}
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(result.status) }
                    ]}>
                      {result.status.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.resultActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleShare(result)}
                    >
                      <Share size={16} color="#6B7280" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDownload(result)}
                    >
                      <Download size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerActionButton: {
    padding: 8,
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
  resultsListSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resultCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resultIcon: {
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  resultCardInfo: {
    flex: 1,
  },
  resultCardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  resultCardDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  resultCardDoctor: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  resultCardRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    marginLeft: 4,
  },
  resultActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  // Detail View Styles
  detailContainer: {
    flex: 1,
    padding: 20,
  },
  testInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  testName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 12,
  },
  testMeta: {
    marginBottom: 16,
  },
  testMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  testMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  doctorName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  overallStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  overallStatusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 8,
  },
  resultsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resultItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  parameterName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  resultValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  referenceRange: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  notesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});