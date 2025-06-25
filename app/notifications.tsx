import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Calendar, FileText, Pill, Trash2, Check } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface Notification {
  id: number;
  type: 'appointment' | 'lab' | 'medication' | 'general';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'appointment',
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Alana Rueter is tomorrow at 9:00 AM',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'lab',
    title: 'Lab Results Available',
    message: 'Your blood test results are now available for review',
    time: '4 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'medication',
    title: 'Medication Refill Reminder',
    message: 'Time to refill your prescription for Lisinopril',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'general',
    title: 'Health Tip',
    message: 'Remember to stay hydrated and get at least 8 hours of sleep',
    time: '2 days ago',
    read: true,
  },
  {
    id: 5,
    type: 'appointment',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Sarah Johnson has been confirmed',
    time: '3 days ago',
    read: true,
  },
  {
    id: 6,
    type: 'lab',
    title: 'Test Scheduled',
    message: 'Your MRI scan has been scheduled for next week',
    time: '1 week ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const [notificationList, setNotificationList] = useState(notifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={20} color="#4285F4" />;
      case 'lab':
        return <FileText size={20} color="#10B981" />;
      case 'medication':
        return <Pill size={20} color="#F59E0B" />;
      default:
        return <Bell size={20} color="#6B7280" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return '#EBF4FF';
      case 'lab':
        return '#DCFCE7';
      case 'medication':
        return '#FEF3C7';
      default:
        return '#F3F4F6';
    }
  };

  const markAsRead = (id: number) => {
    setNotificationList(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    setNotificationList([]);
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Action Buttons */}
      {notificationList.length > 0 && (
        <View style={styles.actionButtons}>
          {unreadCount > 0 && (
            <TouchableOpacity style={styles.actionButton} onPress={markAllAsRead}>
              <Check size={16} color="#4285F4" />
              <Text style={styles.actionButtonText}>Mark All Read</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.actionButton} onPress={clearAll}>
            <Trash2 size={16} color="#DC2626" />
            <Text style={[styles.actionButtonText, { color: '#DC2626' }]}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {notificationList.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySubtitle}>
              You're all caught up! New notifications will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {notificationList.map((notification) => (
              <View
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.read && styles.unreadNotification
                ]}
              >
                <View style={styles.notificationContent}>
                  <View style={[
                    styles.notificationIcon,
                    { backgroundColor: getNotificationColor(notification.type) }
                  ]}>
                    {getNotificationIcon(notification.type)}
                  </View>
                  <View style={styles.notificationText}>
                    <Text style={[
                      styles.notificationTitle,
                      !notification.read && styles.unreadTitle
                    ]}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>
                  {!notification.read && (
                    <View style={styles.unreadDot} />
                  )}
                </View>
                <View style={styles.notificationActions}>
                  {!notification.read && (
                    <TouchableOpacity
                      style={styles.markReadButton}
                      onPress={() => markAsRead(notification.id)}
                    >
                      <Check size={16} color="#4285F4" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteNotification(notification.id)}
                  >
                    <Trash2 size={16} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
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
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 40,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4285F4',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  notificationsList: {
    padding: 20,
  },
  notificationCard: {
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
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#4285F4',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  notificationIcon: {
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  unreadTitle: {
    fontFamily: 'Inter-SemiBold',
  },
  notificationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4285F4',
    marginLeft: 8,
    marginTop: 4,
  },
  notificationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  markReadButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
    padding: 8,
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 8,
  },
});