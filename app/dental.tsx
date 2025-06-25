import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function DentalScreen() {
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
        <Text style={styles.headerTitle}>{t('dental.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* Next Appointment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dental.next_appointment.title')}</Text>
          <View style={styles.appointmentCard}>
            <Calendar size={24} color="#4285F4" />
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentType}>{t('dental.next_appointment.type')}</Text>
              <Text style={styles.appointmentDate}>March 15, 2024 at 10:00 AM</Text>
              <Text style={styles.appointmentLocation}>{t('dental.next_appointment.location')}</Text>
            </View>
          </View>
        </View>

        {/* Care Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dental.care_schedule.title')}</Text>
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleItem}>
              <Clock size={20} color="#4285F4" />
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>{t('dental.care_schedule.morning.title')}</Text>
                <Text style={styles.scheduleTime}>{t('dental.care_schedule.morning.time')}</Text>
                <View style={styles.taskList}>
                  <View style={styles.taskItem}>
                    <CheckCircle size={16} color="#10B981" />
                    <Text style={styles.taskText}>{t('dental.care_schedule.morning.tasks.brush')}</Text>
                  </View>
                  <View style={styles.taskItem}>
                    <CheckCircle size={16} color="#10B981" />
                    <Text style={styles.taskText}>{t('dental.care_schedule.morning.tasks.floss')}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.scheduleItem}>
              <Clock size={20} color="#4285F4" />
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>{t('dental.care_schedule.evening.title')}</Text>
                <Text style={styles.scheduleTime}>{t('dental.care_schedule.evening.time')}</Text>
                <View style={styles.taskList}>
                  <View style={styles.taskItem}>
                    <CheckCircle size={16} color="#10B981" />
                    <Text style={styles.taskText}>{t('dental.care_schedule.evening.tasks.brush')}</Text>
                  </View>
                  <View style={styles.taskItem}>
                    <CheckCircle size={16} color="#10B981" />
                    <Text style={styles.taskText}>{t('dental.care_schedule.evening.tasks.mouthwash')}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Care Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dental.health_tips.title')}</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>{t('dental.health_tips.tips.brush_twice')}</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>{t('dental.health_tips.tips.floss_daily')}</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>{t('dental.health_tips.tips.fluoride')}</Text>
            </View>
            <View style={styles.tipItem}>
              <AlertCircle size={20} color="#4285F4" />
              <Text style={styles.tipText}>{t('dental.health_tips.tips.replace_brush')}</Text>
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
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 2,
  },
  appointmentLocation: {
    fontSize: 14,
    color: '#6B7280',
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
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  taskList: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskText: {
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