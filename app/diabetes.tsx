import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Activity, Droplet, Clock, AlertCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function DiabetesScreen() {
  const { t } = useTranslation();
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
        <Text style={styles.headerTitle}>{t('diabetes.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* Glucose Monitoring */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('diabetes.glucose_monitoring.title')}</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Droplet size={24} color="#4285F4" />
              <Text style={styles.metricTitle}>{t('diabetes.glucose_monitoring.current_level.title')}</Text>
              <Text style={styles.metricValue}>120 mg/dL</Text>
              <Text style={styles.metricStatus}>{t('diabetes.glucose_monitoring.current_level.status')}</Text>
            </View>
            <View style={styles.metricCard}>
              <Activity size={24} color="#4285F4" />
              <Text style={styles.metricTitle}>{t('diabetes.glucose_monitoring.daily_average.title')}</Text>
              <Text style={styles.metricValue}>118 mg/dL</Text>
              <Text style={styles.metricStatus}>{t('diabetes.glucose_monitoring.daily_average.status')}</Text>
            </View>
          </View>
        </View>

        {/* Medication Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('diabetes.medication_schedule.title')}</Text>
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleItem}>
              <Clock size={20} color="#4285F4" />
              <View style={styles.scheduleInfo}>
                <Text style={styles.medicationName}>{t('diabetes.medication_schedule.morning.medicine')}</Text>
                <Text style={styles.scheduleTime}>{t('diabetes.medication_schedule.morning.time')}</Text>
              </View>
            </View>
            <View style={styles.scheduleItem}>
              <Clock size={20} color="#4285F4" />
              <View style={styles.scheduleInfo}>
                <Text style={styles.medicationName}>{t('diabetes.medication_schedule.evening.medicine')}</Text>
                <Text style={styles.scheduleTime}>{t('diabetes.medication_schedule.evening.time')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Care Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('diabetes.care_tips.title')}</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>{t('diabetes.care_tips.tips.check_sugar')}</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>{t('diabetes.care_tips.tips.take_meds')}</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>{t('diabetes.care_tips.tips.exercise')}</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>{t('diabetes.care_tips.tips.monitor_carbs')}</Text>
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
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricTitle: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  metricStatus: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  scheduleCard: {
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
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  scheduleInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#6B7280',
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