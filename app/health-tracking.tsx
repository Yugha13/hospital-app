import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Activity, Heart, Thermometer, Scale, Droplets, X, Calendar } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

interface HealthRecord {
  id: number;
  type: 'blood_pressure' | 'heart_rate' | 'weight' | 'temperature' | 'blood_sugar';
  value: string;
  date: string;
  time: string;
  notes?: string;
}

const healthRecords: HealthRecord[] = [
  {
    id: 1,
    type: 'blood_pressure',
    value: '120/80',
    date: '2024-02-10',
    time: '08:30',
    notes: 'Morning reading after breakfast',
  },
  {
    id: 2,
    type: 'heart_rate',
    value: '72',
    date: '2024-02-10',
    time: '08:35',
  },
  {
    id: 3,
    type: 'weight',
    value: '68.5',
    date: '2024-02-09',
    time: '07:00',
  },
  {
    id: 4,
    type: 'temperature',
    value: '98.6',
    date: '2024-02-08',
    time: '19:00',
    notes: 'Feeling slightly unwell',
  },
  {
    id: 5,
    type: 'blood_sugar',
    value: '95',
    date: '2024-02-08',
    time: '12:00',
    notes: 'Post-lunch reading',
  },
];

interface VitalType {
  id: string;
  name: string;
  unit: string;
  icon: any;
  color: string;
  normalRange: string;
}

export default function HealthTrackingScreen() {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVitalType, setSelectedVitalType] = useState('blood_pressure');
  const [vitalValue, setVitalValue] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const vitalTypes: VitalType[] = [
    {
      id: 'blood_pressure',
      name: t('health.bloodPressure'),
      unit: 'mmHg',
      icon: Activity,
      color: '#EF4444',
      normalRange: '90/60 - 120/80',
    },
    {
      id: 'heart_rate',
      name: t('health.heartRate'),
      unit: 'bpm',
      icon: Heart,
      color: '#DC2626',
      normalRange: '60 - 100',
    },
    {
      id: 'weight',
      name: t('health.weight'),
      unit: 'kg',
      icon: Scale,
      color: '#4285F4',
      normalRange: 'BMI 18.5 - 24.9',
    },
    {
      id: 'temperature',
      name: t('health.temperature'),
      unit: '°F',
      icon: Thermometer,
      color: '#F59E0B',
      normalRange: '97.0 - 99.0',
    },
    {
      id: 'blood_sugar',
      name: t('health.bloodSugar'),
      unit: 'mg/dL',
      icon: Droplets,
      color: '#10B981',
      normalRange: '70 - 140',
    },
  ];

  const getVitalTypeInfo = (type: string) => {
    return vitalTypes.find(vital => vital.id === type) || vitalTypes[0];
  };

  const getLatestReading = (type: string) => {
    const readings = healthRecords.filter(record => record.type === type);
    return readings.sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime())[0];
  };

  const getTrend = (type: string) => {
    const readings = healthRecords
      .filter(record => record.type === type)
      .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());
    
    if (readings.length < 2) return 'stable';
    
    const latest = readings[readings.length - 1];
    const previous = readings[readings.length - 2];
    
    // Simple comparison for demonstration
    const latestValue = parseFloat(latest.value.split('/')[0] || latest.value);
    const previousValue = parseFloat(previous.value.split('/')[0] || previous.value);
    
    if (latestValue > previousValue) return 'up';
    if (latestValue < previousValue) return 'down';
    return 'stable';
  };

  const handleAddReading = () => {
    if (!vitalValue.trim()) {
      alert(t('health.enterValue'));
      return;
    }

    // Add new reading logic here
    console.log('Adding reading:', {
      type: selectedVitalType,
      value: vitalValue,
      date: selectedDate,
      notes: notes,
    });

    setShowAddModal(false);
    setVitalValue('');
    setNotes('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('health.title')}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#4285F4" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Overview Cards */}
        <View style={styles.overviewContainer}>
          <Text style={styles.sectionTitle}>{t('health.todayOverview')}</Text>
          <View style={styles.overviewGrid}>
            {vitalTypes.map((vital) => {
              const latestReading = getLatestReading(vital.id);
              const trend = getTrend(vital.id);
              const IconComponent = vital.icon;

              return (
                <View key={vital.id} style={styles.overviewCard}>
                  <View style={styles.overviewCardHeader}>
                    <View style={[styles.vitalIcon, { backgroundColor: vital.color + '20' }]}>
                      <IconComponent size={20} color={vital.color} />
                    </View>
                    <View style={styles.trendContainer}>
                      {trend === 'up' && <TrendingUp size={16} color="#EF4444" />}
                      {trend === 'down' && <TrendingDown size={16} color="#10B981" />}
                      {trend === 'stable' && <View style={styles.stableTrend} />}
                    </View>
                  </View>
                  <Text style={styles.vitalName}>{vital.name}</Text>
                  <Text style={styles.vitalValue}>
                    {latestReading ? `${latestReading.value} ${vital.unit}` : t('health.noData')}
                  </Text>
                  <Text style={styles.vitalTime}>
                    {latestReading ? `${latestReading.date} ${latestReading.time}` : ''}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Quick Add */}
        <View style={styles.quickAddContainer}>
          <Text style={styles.sectionTitle}>{t('health.quickAdd')}</Text>
          <View style={styles.quickAddGrid}>
            {vitalTypes.slice(0, 4).map((vital) => {
              const IconComponent = vital.icon;
              return (
                <TouchableOpacity
                  key={vital.id}
                  style={styles.quickAddCard}
                  onPress={() => {
                    setSelectedVitalType(vital.id);
                    setShowAddModal(true);
                  }}
                >
                  <View style={[styles.quickAddIcon, { backgroundColor: vital.color + '20' }]}>
                    <IconComponent size={24} color={vital.color} />
                  </View>
                  <Text style={styles.quickAddText}>{vital.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Readings */}
        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>{t('health.recentReadings')}</Text>
          {healthRecords
            .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime())
            .slice(0, 10)
            .map((record) => {
              const vitalInfo = getVitalTypeInfo(record.type);
              const IconComponent = vitalInfo.icon;

              return (
                <View key={record.id} style={styles.readingCard}>
                  <View style={styles.readingHeader}>
                    <View style={[styles.readingIcon, { backgroundColor: vitalInfo.color + '20' }]}>
                      <IconComponent size={16} color={vitalInfo.color} />
                    </View>
                    <View style={styles.readingInfo}>
                      <Text style={styles.readingType}>{vitalInfo.name}</Text>
                      <Text style={styles.readingDateTime}>
                        {new Date(record.date + ' ' + record.time).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                    <Text style={styles.readingValue}>
                      {record.value} {vitalInfo.unit}
                    </Text>
                  </View>
                  {record.notes && (
                    <Text style={styles.readingNotes}>{record.notes}</Text>
                  )}
                </View>
              );
            })}
        </View>

        {/* Health Insights */}
        <View style={styles.insightsContainer}>
          <Text style={styles.sectionTitle}>{t('health.insights')}</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>{t('health.weeklySummary')}</Text>
            <Text style={styles.insightText}>{t('health.weeklySummaryText')}</Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>{t('health.recommendation')}</Text>
            <Text style={styles.insightText}>{t('health.recommendationText')}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add Reading Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t('health.addReading')}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowAddModal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Vital Type Selection */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>{t('health.selectVitalType')}</Text>
              <View style={styles.vitalTypeGrid}>
                {vitalTypes.map((vital) => {
                  const IconComponent = vital.icon;
                  return (
                    <TouchableOpacity
                      key={vital.id}
                      style={[
                        styles.vitalTypeOption,
                        selectedVitalType === vital.id && styles.selectedVitalTypeOption
                      ]}
                      onPress={() => setSelectedVitalType(vital.id)}
                    >
                      <View style={[styles.vitalTypeIcon, { backgroundColor: vital.color + '20' }]}>
                        <IconComponent size={20} color={vital.color} />
                      </View>
                      <Text style={[
                        styles.vitalTypeText,
                        selectedVitalType === vital.id && styles.selectedVitalTypeText
                      ]}>
                        {vital.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Value Input */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>
                {t('health.value')} ({getVitalTypeInfo(selectedVitalType).unit})
              </Text>
              <TextInput
                style={styles.valueInput}
                placeholder={t('health.enterValue')}
                placeholderTextColor="#9CA3AF"
                value={vitalValue}
                onChangeText={setVitalValue}
                keyboardType="numeric"
              />
              <Text style={styles.normalRange}>
                {t('health.normalRange')}: {getVitalTypeInfo(selectedVitalType).normalRange}
              </Text>
            </View>

            {/* Date Selection */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>{t('common.date')}</Text>
              <View style={styles.dateInput}>
                <Calendar size={16} color="#6B7280" />
                <TextInput
                  style={styles.dateInputText}
                  value={selectedDate}
                  onChangeText={setSelectedDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Notes */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>{t('health.notesOptional')}</Text>
              <TextInput
                style={styles.notesInput}
                placeholder={t('health.addNotesPlaceholder')}
                placeholderTextColor="#9CA3AF"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleAddReading}
            >
              <Text style={styles.saveButtonText}>{t('health.saveReading')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
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
  overviewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overviewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vitalIcon: {
    borderRadius: 8,
    padding: 8,
  },
  trendContainer: {
    alignItems: 'center',
  },
  stableTrend: {
    width: 16,
    height: 2,
    backgroundColor: '#6B7280',
    borderRadius: 1,
  },
  vitalName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  vitalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  vitalTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#9CA3AF',
  },
  quickAddContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  quickAddGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAddCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickAddIcon: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  quickAddText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
  recentContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  readingCard: {
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
  readingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readingIcon: {
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  readingInfo: {
    flex: 1,
  },
  readingType: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  readingDateTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  readingValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  readingNotes: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    fontStyle: 'italic',
  },
  insightsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  insightCard: {
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
  insightTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  insightText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
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
  vitalTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vitalTypeOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    width: '48%',
  },
  selectedVitalTypeOption: {
    borderColor: '#4285F4',
    backgroundColor: '#EBF4FF',
  },
  vitalTypeIcon: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  vitalTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedVitalTypeText: {
    color: '#4285F4',
  },
  valueInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  normalRange: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  dateInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  dateInputText: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
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
    minHeight: 80,
  },
  saveButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});