import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, Activity, Clock, AlertCircle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function HeartCareScreen() {
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
        <Text style={styles.headerTitle}>Heart Care</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* Vital Signs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vital Signs</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Heart size={24} color="#4285F4" />
              <Text style={styles.metricTitle}>Heart Rate</Text>
              <Text style={styles.metricValue}>72 bpm</Text>
              <Text style={styles.metricStatus}>Normal</Text>
            </View>
            <View style={styles.metricCard}>
              <Activity size={24} color="#4285F4" />
              <Text style={styles.metricTitle}>Blood Pressure</Text>
              <Text style={styles.metricValue}>120/80</Text>
              <Text style={styles.metricStatus}>Normal</Text>
            </View>
          </View>
        </View>

        {/* Medication Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medication Schedule</Text>
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleItem}>
              <Clock size={20} color="#4285F4" />
              <View style={styles.scheduleInfo}>
                <Text style={styles.medicationName}>Aspirin 81mg</Text>
                <Text style={styles.scheduleTime}>8:00 AM - With breakfast</Text>
              </View>
            </View>
            <View style={styles.scheduleItem}>
              <Clock size={20} color="#4285F4" />
              <View style={styles.scheduleInfo}>
                <Text style={styles.medicationName}>Lisinopril 10mg</Text>
                <Text style={styles.scheduleTime}>8:00 PM - Before bed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Activity Tracking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <Text style={styles.activityLabel}>Steps</Text>
              <Text style={styles.activityValue}>8,547</Text>
              <Text style={styles.activityTarget}>Goal: 10,000</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityLabel}>Exercise</Text>
              <Text style={styles.activityValue}>35 min</Text>
              <Text style={styles.activityTarget}>Goal: 30 min</Text>
            </View>
          </View>
        </View>

        {/* Care Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Heart Health Tips</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>Monitor blood pressure daily</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>Maintain a heart-healthy diet</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>Exercise regularly</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>Manage stress levels</Text>
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
  activityCard: {
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
  activityItem: {
    alignItems: 'center',
  },
  activityLabel: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  activityValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTarget: {
    fontSize: 12,
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