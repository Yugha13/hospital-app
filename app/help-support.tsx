import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, FileText, Video, ChevronRight, ChevronDown, ChevronUp, X, Send } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment by tapping the "Book Appointment" button on the home screen, selecting your preferred doctor, date, and time slot.',
    category: 'Appointments',
  },
  {
    id: 2,
    question: 'Can I reschedule my appointment?',
    answer: 'Yes, you can reschedule your appointment up to 24 hours before the scheduled time. Go to your appointments and tap "Reschedule".',
    category: 'Appointments',
  },
  {
    id: 3,
    question: 'How do I access my lab results?',
    answer: 'Lab results are available in the "Lab Results" section. You\'ll receive a notification when new results are available.',
    category: 'Lab Results',
  },
  {
    id: 4,
    question: 'How do I request medication refills?',
    answer: 'Go to the Medications section and tap "Request Refill" next to the medication you need to refill.',
    category: 'Medications',
  },
  {
    id: 5,
    question: 'Is my health data secure?',
    answer: 'Yes, we use industry-standard encryption and security measures to protect your health information. Your data is HIPAA compliant.',
    category: 'Privacy',
  },
  {
    id: 6,
    question: 'How do I join a video call appointment?',
    answer: 'You\'ll receive a notification 15 minutes before your appointment. Tap "Join Call" from the notification or your appointments list.',
    category: 'Video Calls',
  },
];

const categories = ['All', 'Appointments', 'Lab Results', 'Medications', 'Privacy', 'Video Calls'];

export default function HelpSupportScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketCategory, setTicketCategory] = useState('General');

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleWhatsAppSupport = () => {
    const phoneNumber = '+1234567890'; // Replace with actual WhatsApp number
    const message = 'Hello, I need help with the HealthCare app.';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert('WhatsApp is not installed on your device');
      }
    });
  };

  const handleSubmitTicket = () => {
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Handle ticket submission logic here
    console.log('Ticket submitted:', {
      subject: ticketSubject,
      message: ticketMessage,
      category: ticketCategory,
    });

    setShowTicketModal(false);
    setTicketSubject('');
    setTicketMessage('');
    alert('Your support ticket has been submitted. We\'ll get back to you within 24 hours.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Support Options */}
        <View style={styles.quickSupportContainer}>
          <Text style={styles.sectionTitle}>Get Help</Text>
          <View style={styles.supportOptionsGrid}>
            <TouchableOpacity 
              style={styles.supportOption}
              onPress={handleWhatsAppSupport}
            >
              <View style={styles.supportIcon}>
                <MessageCircle size={24} color="#25D366" />
              </View>
              <Text style={styles.supportOptionTitle}>WhatsApp</Text>
              <Text style={styles.supportOptionSubtitle}>Instant support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportOption}>
              <View style={styles.supportIcon}>
                <Phone size={24} color="#4285F4" />
              </View>
              <Text style={styles.supportOptionTitle}>Call Us</Text>
              <Text style={styles.supportOptionSubtitle}>+1 (555) 123-4567</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportOption}>
              <View style={styles.supportIcon}>
                <Mail size={24} color="#EF4444" />
              </View>
              <Text style={styles.supportOptionTitle}>Email</Text>
              <Text style={styles.supportOptionSubtitle}>support@healthcare.com</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.supportOption}
              onPress={() => setShowTicketModal(true)}
            >
              <View style={styles.supportIcon}>
                <FileText size={24} color="#F59E0B" />
              </View>
              <Text style={styles.supportOptionTitle}>Submit Ticket</Text>
              <Text style={styles.supportOptionSubtitle}>Detailed support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Video Tutorials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Video Tutorials</Text>
          <View style={styles.tutorialsList}>
            <TouchableOpacity style={styles.tutorialItem}>
              <View style={styles.tutorialIcon}>
                <Video size={20} color="#4285F4" />
              </View>
              <View style={styles.tutorialInfo}>
                <Text style={styles.tutorialTitle}>How to Book an Appointment</Text>
                <Text style={styles.tutorialDuration}>2:30 min</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tutorialItem}>
              <View style={styles.tutorialIcon}>
                <Video size={20} color="#4285F4" />
              </View>
              <View style={styles.tutorialInfo}>
                <Text style={styles.tutorialTitle}>Managing Your Medications</Text>
                <Text style={styles.tutorialDuration}>3:15 min</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tutorialItem}>
              <View style={styles.tutorialIcon}>
                <Video size={20} color="#4285F4" />
              </View>
              <View style={styles.tutorialInfo}>
                <Text style={styles.tutorialTitle}>Understanding Lab Results</Text>
                <Text style={styles.tutorialDuration}>4:00 min</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          {/* Search */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#9CA3AF" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search FAQs..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.selectedCategoryChip
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.selectedCategoryChipText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* FAQ List */}
          <View style={styles.faqList}>
            {filteredFAQs.length === 0 ? (
              <View style={styles.emptyState}>
                <FileText size={48} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>No FAQs found</Text>
                <Text style={styles.emptySubtitle}>
                  Try adjusting your search or category filter
                </Text>
              </View>
            ) : (
              filteredFAQs.map((faq) => (
                <View key={faq.id} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  >
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp size={20} color="#6B7280" />
                    ) : (
                      <ChevronDown size={20} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                  {expandedFAQ === faq.id && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              ))
            )}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Phone size={20} color="#4285F4" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone Support</Text>
                <Text style={styles.contactValue}>+1 (555) 123-4567</Text>
                <Text style={styles.contactHours}>Mon-Fri 8AM-8PM EST</Text>
              </View>
            </View>
            
            <View style={styles.contactItem}>
              <Mail size={20} color="#4285F4" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email Support</Text>
                <Text style={styles.contactValue}>support@healthcare.com</Text>
                <Text style={styles.contactHours}>Response within 24 hours</Text>
              </View>
            </View>
            
            <View style={styles.contactItem}>
              <MessageCircle size={20} color="#4285F4" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Live Chat</Text>
                <Text style={styles.contactValue}>Available 24/7</Text>
                <Text style={styles.contactHours}>Instant responses</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Ticket Modal */}
      <Modal
        visible={showTicketModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Submit Support Ticket</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowTicketModal(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Category</Text>
              <View style={styles.categorySelector}>
                {['General', 'Technical', 'Billing', 'Medical'].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryOption,
                      ticketCategory === cat && styles.selectedCategoryOption
                    ]}
                    onPress={() => setTicketCategory(cat)}
                  >
                    <Text style={[
                      styles.categoryOptionText,
                      ticketCategory === cat && styles.selectedCategoryOptionText
                    ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Subject *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Brief description of your issue"
                placeholderTextColor="#9CA3AF"
                value={ticketSubject}
                onChangeText={setTicketSubject}
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Message *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Please provide detailed information about your issue..."
                placeholderTextColor="#9CA3AF"
                value={ticketMessage}
                onChangeText={setTicketMessage}
                multiline
                numberOfLines={6}
              />
            </View>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitTicket}
            >
              <Send size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Submit Ticket</Text>
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
  headerSpacer: {
    width: 40,
  },
  quickSupportContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  supportOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  supportOption: {
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
  supportIcon: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  supportOptionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  supportOptionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  tutorialsList: {
    gap: 12,
  },
  tutorialItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  tutorialIcon: {
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  tutorialInfo: {
    flex: 1,
  },
  tutorialTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  tutorialDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedCategoryChip: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  categoryChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  selectedCategoryChipText: {
    color: '#FFFFFF',
  },
  faqList: {
    gap: 12,
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
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  faqAnswerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  contactValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4285F4',
    marginBottom: 2,
  },
  contactHours: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
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
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedCategoryOption: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  categoryOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  selectedCategoryOptionText: {
    color: '#FFFFFF',
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
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});