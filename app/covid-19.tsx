import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Activity, Thermometer, Shield, AlertCircle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CovidTrackingScreen() {
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
        <Text style={styles.headerTitle}>{t('covid19.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Shield size={24} color="#10B981" />
            <Text style={styles.statusTitle}>{t('covid19.status.title')}</Text>
          </View>
          <Text style={styles.statusText}>{t('covid19.status.no_exposure')}</Text>
          <Text style={styles.lastUpdated}>{t('covid19.status.last_updated')}: Today, 9:00 AM</Text>
        </View>

        {/* Symptoms Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('covid19.symptoms.title')}</Text>
          <View style={styles.symptomsGrid}>
            <View style={styles.symptomCard}>
              <Thermometer size={24} color="#4285F4" />
              <Text style={styles.symptomTitle}>{t('covid19.symptoms.temperature')}</Text>
              <Text style={styles.symptomValue}>98.6°F</Text>
              <Text style={styles.symptomStatus}>{t('covid19.symptoms.normal')}</Text>
            </View>
            <View style={styles.symptomCard}>
              <Activity size={24} color="#4285F4" />
              <Text style={styles.symptomTitle}>{t('covid19.symptoms.oxygen_level')}</Text>
              <Text style={styles.symptomValue}>98%</Text>
              <Text style={styles.symptomStatus}>{t('covid19.symptoms.normal')}</Text>
            </View>
          </View>
        </View>

        {/* Local Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('covid19.statistics.title')}</Text>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>{t('covid19.statistics.active_cases')}</Text>
              <Text style={styles.statValue}>1,234</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>{t('covid19.statistics.recovered')}</Text>
              <Text style={styles.statValue}>12,345</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>{t('covid19.statistics.vaccinated')}</Text>
              <Text style={styles.statValue}>85%</Text>
            </View>
          </View>
        </View>

        {/* Guidelines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('covid19.guidelines.title')}</Text>
          <View style={styles.guidelineCard}>
            <View style={styles.guidelineItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.guidelineText}>{t('covid19.guidelines.wear_mask')}</Text>
            </View>
            <View style={styles.guidelineItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.guidelineText}>{t('covid19.guidelines.social_distance')}</Text>
            </View>
            <View style={styles.guidelineItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.guidelineText}>{t('covid19.guidelines.wash_hands')}</Text>
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
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '500',
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6B7280',
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
  symptomsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  symptomCard: {
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
  symptomTitle: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 8,
    marginBottom: 4,
  },
  symptomValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  symptomStatus: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  guidelineCard: {
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
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  guidelineText: {
    fontSize: 14,
    color: '#4B5563',
  },
});