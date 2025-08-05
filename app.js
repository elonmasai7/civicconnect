import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Modal, FlatList, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { LineChart } from 'react-native-chart-kit';

const CivicConnectApp = () => {
  const [activeTab, setActiveTab] = useState('reps');
  const [policyComplexity, setPolicyComplexity] = useState('basic');
  const [selectedPolicy, setSelectedPolicy] = useState('healthcare');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedRep, setSelectedRep] = useState(null);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [address, setAddress] = useState('123 Congress Ave, Austin, TX');
  const [notification, setNotification] = useState({ visible: false, message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ visible: true, message, type });
    setTimeout(() => {
      setNotification({ visible: false, message: '', type: '' });
    }, 3000);
  };

  // Mock data
  const representatives = [
    {
      id: 'sen1',
      name: 'Sen. John Davis',
      role: 'U.S. Senator',
      party: 'Democratic Party',
      district: 'Texas',
      contact: {
        email: 'john.davis@senate.gov',
        phone: '(202) 224-1234',
        website: 'senatordavis.gov',
      },
      avatar: 'JD',
      nextEvent: 'Town Hall - Oct 15, 7 PM',
    },
    {
      id: 'sen2',
      name: 'Sen. Maria Rodriguez',
      role: 'U.S. Senator',
      party: 'Republican Party',
      district: 'Texas',
      contact: {
        email: 'maria.rodriguez@senate.gov',
        phone: '(202) 224-5678',
        website: 'senatorrodriguez.gov',
      },
      avatar: 'MR',
      nextEvent: 'Office Hours - Oct 12, 10 AM',
    },
    {
      id: 'rep',
      name: 'Rep. Alex Johnson',
      role: 'U.S. Representative',
      party: 'Democratic Party',
      district: 'Texas 10th District',
      contact: {
        email: 'alex.johnson@house.gov',
        phone: '(202) 225-9012',
        website: 'repjohnson.gov',
      },
      avatar: 'AJ',
      nextEvent: 'Virtual Q&A - Oct 18, 6 PM',
    },
    {
      id: 'gov',
      name: 'Gov. Sarah Williams',
      role: 'Governor',
      party: 'Independent',
      district: 'State of Texas',
      contact: {
        email: 'governor.williams@texas.gov',
        phone: '(512) 463-2000',
        website: 'governor.texas.gov',
      },
      avatar: 'SW',
      nextEvent: 'Policy Announcement - Oct 20, 2 PM',
    },
  ];

  const policies = {
    healthcare: {
      title: 'Healthcare Reform Act (H.R. 2378)',
      date: 'March 15, 2023',
      sponsor: 'Rep. Jane Smith',
      status: 'In Committee',
      basic: {
        overview: 'This bill aims to make healthcare more affordable for everyone. It will lower costs for families and improve access to doctors.',
        provisions: [
          'Caps prescription drug costs at $35/month',
          'Expands free preventative care services',
          'Provides subsidies to help lower-income families afford insurance',
        ],
      },
      intermediate: {
        overview: 'The Healthcare Reform Act proposes significant changes to reduce out-of-pocket expenses for consumers while expanding coverage options.',
        provisions: [
          'Monthly cap of $35 on essential prescription medications',
          'Expansion of ACA subsidies to households earning up to 600% of the federal poverty level',
          'Requires insurers to cover preventative services without cost-sharing',
          'Creation of a public option for health insurance in underserved areas',
        ],
      },
      advanced: {
        overview: 'H.R. 2378 introduces comprehensive reforms to the healthcare system focused on cost containment and expanded access.',
        provisions: [
          'Section 101: Establishes a maximum out-of-pocket limit of $2,000/year for prescription drugs under Medicare Part D',
          'Section 203: Modifies the premium tax credit calculation to increase subsidies for households at 200-600% FPL',
          'Section 305: Mandates coverage of USPSTF-recommended preventative services without cost-sharing',
          'Section 401: Authorizes the creation of a federally-administered public health insurance option',
          'Section 502: Implements reference pricing for 250 high-cost prescription drugs',
        ],
      },
    },
    education: {
      title: 'Education Equality Act (S. 1845)',
      date: 'May 3, 2023',
      sponsor: 'Sen. Robert Chen',
      status: 'Passed Senate',
      basic: {
        overview: 'This bill aims to provide equal educational opportunities for all students regardless of their background or where they live.',
        provisions: [
          'Increases funding for schools in low-income areas',
          'Provides free school meals for all students',
          'Expands access to advanced courses in underserved schools',
        ],
      },
    },
    climate: {
      title: 'Climate Action Plan (H.R. 3021)',
      date: 'April 20, 2023',
      sponsor: 'Rep. Lisa Green',
      status: 'In Committee',
      basic: {
        overview: 'This comprehensive plan aims to reduce carbon emissions and promote renewable energy to combat climate change.',
        provisions: [
          'Invests in renewable energy infrastructure',
          'Provides tax credits for electric vehicles and solar panels',
          'Sets national carbon reduction targets',
        ],
      },
    },
    infrastructure: {
      title: 'National Infrastructure Bill (S. 2100)',
      date: 'June 12, 2023',
      sponsor: 'Sen. Michael Brown',
      status: 'Signed into Law',
      basic: {
        overview: 'This landmark legislation provides funding to rebuild America\'s roads, bridges, and broadband infrastructure.',
        provisions: [
          '$1.2 trillion investment over 10 years',
          'Modernization of transportation systems',
          'Expansion of high-speed internet access in rural areas',
          'Upgrades to water systems and electrical grid',
        ],
      },
    },
  };

  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        data: [120, 190, 150, 220, 300, 280, 350, 410, 390],
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const handleSendMessage = () => {
    if (!selectedRep) {
      showNotification('Please select a representative', 'error');
      return;
    }
    
    if (!messageSubject.trim() || !messageContent.trim()) {
      showNotification('Please fill in both subject and message', 'error');
      return;
    }
    
    const rep = representatives.find(r => r.id === selectedRep);
    if (rep) {
      showNotification(`Message sent to ${rep.name}!`);
      setShowContactModal(false);
      setMessageSubject('');
      setMessageContent('');
    }
  };

  const handleScheduleMeeting = () => {
    if (!selectedRep) {
      showNotification('Please select a representative', 'error');
      return;
    }
    
    const rep = representatives.find(r => r.id === selectedRep);
    if (rep) {
      showNotification(`Meeting requested with ${rep.name}!`);
      setShowScheduleModal(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reps':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Find Your Representatives</Text>
            
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address"
              />
              <TouchableOpacity 
                style={styles.searchButton}
                onPress={() => showNotification(`Searching representatives for: ${address}`)}
              >
                <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={representatives}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.repCard}>
                  <View style={styles.repHeader}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{item.avatar}</Text>
                    </View>
                    <View style={styles.repInfo}>
                      <Text style={styles.repName}>{item.name}</Text>
                      <Text style={styles.repRole}>{item.role} | {item.party}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.contactItem}>
                    <Ionicons name="mail" size={20} color="#3b82f6" />
                    <Text style={styles.contactText}>{item.contact.email}</Text>
                  </View>
                  
                  <View style={styles.contactItem}>
                    <Ionicons name="call" size={20} color="#3b82f6" />
                    <Text style={styles.contactText}>{item.contact.phone}</Text>
                  </View>
                  
                  <View style={styles.contactItem}>
                    <Ionicons name="globe" size={20} color="#3b82f6" />
                    <Text style={styles.contactText}>{item.contact.website}</Text>
                  </View>
                  
                  <View style={styles.contactItem}>
                    <Ionicons name="calendar" size={20} color="#3b82f6" />
                    <Text style={styles.contactText}>{item.nextEvent}</Text>
                  </View>
                  
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => {
                        setSelectedRep(item.id);
                        setShowContactModal(true);
                      }}
                    >
                      <Ionicons name="mail" size={18} color="white" />
                      <Text style={styles.actionButtonText}>Message</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => {
                        setSelectedRep(item.id);
                        setShowScheduleModal(true);
                      }}
                    >
                      <Ionicons name="calendar" size={18} color="white" />
                      <Text style={styles.actionButtonText}>Schedule</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        );
        
      case 'policy':
        const policy = policies[selectedPolicy];
        const complexityData = policy[policyComplexity] || policy.basic;
        
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Policy Explorer</Text>
            
            <View style={styles.policySelector}>
              <Text style={styles.selectorLabel}>Select Policy:</Text>
              <View style={styles.selectorButtons}>
                {Object.keys(policies).map(key => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.selectorButton,
                      selectedPolicy === key && styles.activeSelectorButton
                    ]}
                    onPress={() => setSelectedPolicy(key)}
                  >
                    <Text style={[
                      styles.selectorButtonText,
                      selectedPolicy === key && styles.activeSelectorButtonText
                    ]}>
                      {policies[key].title.split(' ')[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.policyCard}>
              <View style={styles.policyHeader}>
                <Text style={styles.policyTitle}>{policy.title}</Text>
                <View style={styles.policyMeta}>
                  <Text style={styles.metaItem}><Ionicons name="calendar" size={16} color="white" /> {policy.date}</Text>
                  <Text style={styles.metaItem}><Ionicons name="person" size={16} color="white" /> {policy.sponsor}</Text>
                  <Text style={styles.metaItem}><Ionicons name="document" size={16} color="white" /> {policy.status}</Text>
                </View>
              </View>
              
              <View style={styles.complexitySelector}>
                <TouchableOpacity
                  style={[
                    styles.complexityButton,
                    policyComplexity === 'basic' && styles.activeComplexityButton
                  ]}
                  onPress={() => setPolicyComplexity('basic')}
                >
                  <Text style={[
                    styles.complexityButtonText,
                    policyComplexity === 'basic' && styles.activeComplexityButtonText
                  ]}>
                    Basic
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.complexityButton,
                    policyComplexity === 'intermediate' && styles.activeComplexityButton
                  ]}
                  onPress={() => setPolicyComplexity('intermediate')}
                >
                  <Text style={[
                    styles.complexityButtonText,
                    policyComplexity === 'intermediate' && styles.activeComplexityButtonText
                  ]}>
                    Intermediate
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.complexityButton,
                    policyComplexity === 'advanced' && styles.activeComplexityButton
                  ]}
                  onPress={() => setPolicyComplexity('advanced')}
                >
                  <Text style={[
                    styles.complexityButtonText,
                    policyComplexity === 'advanced' && styles.activeComplexityButtonText
                  ]}>
                    Advanced
                  </Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.policySection}>
                <Text style={styles.sectionSubtitle}>Overview</Text>
                <Text style={styles.policyText}>{complexityData.overview}</Text>
              </View>
              
              <View style={styles.policySection}>
                <Text style={styles.sectionSubtitle}>Key Provisions</Text>
                {complexityData.provisions.map((provision, index) => (
                  <View key={index} style={styles.provisionItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                    <Text style={styles.provisionText}>{provision}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.impactGrid}>
                <View style={styles.impactCard}>
                  <View style={styles.impactIcon}>
                    <Ionicons name="cash" size={24} color="#3b82f6" />
                  </View>
                  <Text style={styles.impactTitle}>Cost Savings</Text>
                  <Text style={styles.impactText}>Average family saves $1,200/year</Text>
                </View>
                
                <View style={styles.impactCard}>
                  <View style={styles.impactIcon}>
                    <Ionicons name="people" size={24} color="#3b82f6" />
                  </View>
                  <Text style={styles.impactTitle}>Coverage</Text>
                  <Text style={styles.impactText}>4M more Americans covered</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.simulateButton}
                onPress={() => showNotification('Policy simulation started!')}
              >
                <Text style={styles.simulateButtonText}>Simulate Policy Impact</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 'action':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Take Action</Text>
            
            <View style={styles.actionGrid}>
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => setShowContactModal(true)}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="mail" size={32} color="#3b82f6" />
                </View>
                <Text style={styles.actionCardTitle}>Contact Reps</Text>
                <Text style={styles.actionCardText}>Send messages to elected officials</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => setShowScheduleModal(true)}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="calendar" size={32} color="#3b82f6" />
                </View>
                <Text style={styles.actionCardTitle}>Schedule Meeting</Text>
                <Text style={styles.actionCardText}>Request in-person or virtual meeting</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => showNotification('Community action center opened!')}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="megaphone" size={32} color="#3b82f6" />
                </View>
                <Text style={styles.actionCardTitle}>Community Action</Text>
                <Text style={styles.actionCardText}>Join events and petitions</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => showNotification('Voting tools accessed!')}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="checkmark-done" size={32} color="#3b82f6" />
                </View>
                <Text style={styles.actionCardTitle}>Voting Tools</Text>
                <Text style={styles.actionCardText}>Register and find polling locations</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.sectionTitle}>Send a Message</Text>
            
            <View style={styles.messageForm}>
              <Text style={styles.inputLabel}>Select Representative:</Text>
              <View style={styles.repSelector}>
                {representatives.map(rep => (
                  <TouchableOpacity
                    key={rep.id}
                    style={[
                      styles.repOption,
                      selectedRep === rep.id && styles.selectedRepOption
                    ]}
                    onPress={() => setSelectedRep(rep.id)}
                  >
                    <Text style={[
                      styles.repOptionText,
                      selectedRep === rep.id && styles.selectedRepOptionText
                    ]}>
                      {rep.name.split(' ')[1]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.inputLabel}>Subject:</Text>
              <TextInput
                style={styles.input}
                value={messageSubject}
                onChangeText={setMessageSubject}
                placeholder="What is your message about?"
              />
              
              <Text style={styles.inputLabel}>Message:</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                value={messageContent}
                onChangeText={setMessageContent}
                placeholder="Type your message here..."
                multiline
              />
              
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendButtonText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 'stats':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Engagement Statistics</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>1,250</Text>
                <Text style={styles.statLabel}>Messages Sent</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statValue}>87%</Text>
                <Text style={styles.statLabel}>Policy Understanding</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statValue}>42</Text>
                <Text style={styles.statLabel}>Meetings Scheduled</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statValue}>92%</Text>
                <Text style={styles.statLabel}>User Satisfaction</Text>
              </View>
            </View>
            
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Monthly Engagement</Text>
              <LineChart
                data={engagementData}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#1e40af',
                  },
                }}
                bezier
                style={styles.chart}
              />
            </View>
            
            <View style={styles.progressCard}>
              <Text style={styles.progressTitle}>Your Civic Engagement</Text>
              <View style={styles.progressContainer}>
                <Progress.Bar 
                  progress={0.65} 
                  width={Dimensions.get('window').width - 80} 
                  color="#3b82f6" 
                  height={12}
                  borderRadius={6}
                />
                <Text style={styles.progressText}>65% Complete</Text>
              </View>
              
              <Text style={styles.badgeTitle}>Next Badges:</Text>
              <View style={styles.badgeContainer}>
                <View style={styles.badgeItem}>
                  <Ionicons name="chatbubbles" size={24} color="#10b981" />
                  <View>
                    <Text style={styles.badgeName}>Communicator</Text>
                    <Text style={styles.badgeDesc}>Send 5 messages to representatives</Text>
                  </View>
                </View>
                
                <View style={styles.badgeItem}>
                  <Ionicons name="school" size={24} color="#f59e0b" />
                  <View>
                    <Text style={styles.badgeName}>Policy Expert</Text>
                    <Text style={styles.badgeDesc}>Read 10 policy summaries</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="people" size={36} color="white" />
          <View>
            <Text style={styles.logoText}>CivicConnect</Text>
            <Text style={styles.tagline}>Your voice in government matters</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="notifications" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="person" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'reps' && styles.activeTab]}
          onPress={() => setActiveTab('reps')}
        >
          <Ionicons 
            name="search" 
            size={24} 
            color={activeTab === 'reps' ? '#1e40af' : '#64748b'} 
          />
          <Text style={[styles.tabText, activeTab === 'reps' && styles.activeTabText]}>
            Reps
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'policy' && styles.activeTab]}
          onPress={() => setActiveTab('policy')}
        >
          <Ionicons 
            name="document-text" 
            size={24} 
            color={activeTab === 'policy' ? '#1e40af' : '#64748b'} 
          />
          <Text style={[styles.tabText, activeTab === 'policy' && styles.activeTabText]}>
            Policy
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'action' && styles.activeTab]}
          onPress={() => setActiveTab('action')}
        >
          <Ionicons 
            name="megaphone" 
            size={24} 
            color={activeTab === 'action' ? '#1e40af' : '#64748b'} 
          />
          <Text style={[styles.tabText, activeTab === 'action' && styles.activeTabText]}>
            Action
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
          onPress={() => setActiveTab('stats')}
        >
          <Ionicons 
            name="stats-chart" 
            size={24} 
            color={activeTab === 'stats' ? '#1e40af' : '#64748b'} 
          />
          <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>
            Stats
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {renderTabContent()}
      </ScrollView>
      
      {/* Notification */}
      {notification.visible && (
        <View style={[
          styles.notification,
          notification.type === 'error' ? styles.errorNotification : styles.successNotification
        ]}>
          <Ionicons 
            name={notification.type === 'error' ? "warning" : "checkmark-circle"} 
            size={24} 
            color="white" 
          />
          <Text style={styles.notificationText}>{notification.message}</Text>
        </View>
      )}
      
      {/* Contact Modal */}
      <Modal
        visible={showContactModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Contact Representative</Text>
              <TouchableOpacity onPress={() => setShowContactModal(false)}>
                <Ionicons name="close" size={28} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Select Representative:</Text>
            <View style={styles.repSelector}>
              {representatives.map(rep => (
                <TouchableOpacity
                  key={rep.id}
                  style={[
                    styles.repOption,
                    selectedRep === rep.id && styles.selectedRepOption
                  ]}
                  onPress={() => setSelectedRep(rep.id)}
                >
                  <Text style={[
                    styles.repOptionText,
                    selectedRep === rep.id && styles.selectedRepOptionText
                  ]}>
                    {rep.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.inputLabel}>Subject:</Text>
            <TextInput
              style={styles.input}
              value={messageSubject}
              onChangeText={setMessageSubject}
              placeholder="What is your message about?"
            />
            
            <Text style={styles.inputLabel}>Message:</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={messageContent}
              onChangeText={setMessageContent}
              placeholder="Type your message here..."
              multiline
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowContactModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.sendButton]}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendButtonText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Schedule Modal */}
      <Modal
        visible={showScheduleModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Schedule Meeting</Text>
              <TouchableOpacity onPress={() => setShowScheduleModal(false)}>
                <Ionicons name="close" size={28} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Select Representative:</Text>
            <View style={styles.repSelector}>
              {representatives.map(rep => (
                <TouchableOpacity
                  key={rep.id}
                  style={[
                    styles.repOption,
                    selectedRep === rep.id && styles.selectedRepOption
                  ]}
                  onPress={() => setSelectedRep(rep.id)}
                >
                  <Text style={[
                    styles.repOptionText,
                    selectedRep === rep.id && styles.selectedRepOptionText
                  ]}>
                    {rep.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.inputLabel}>Meeting Type:</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity style={styles.typeOption}>
                <Ionicons name="videocam" size={24} color="#3b82f6" />
                <Text style={styles.typeOptionText}>Virtual</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.typeOption}>
                <Ionicons name="person" size={24} color="#3b82f6" />
                <Text style={styles.typeOptionText}>In-Person</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.typeOption}>
                <Ionicons name="call" size={24} color="#3b82f6" />
                <Text style={styles.typeOptionText}>Phone</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Preferred Date:</Text>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateInputText}>Select a date</Text>
              <Ionicons name="calendar" size={20} color="#64748b" />
            </TouchableOpacity>
            
            <Text style={styles.inputLabel}>Preferred Time:</Text>
            <View style={styles.timeSelector}>
              <TouchableOpacity style={styles.timeOption}>
                <Text style={styles.timeOptionText}>Morning (9am-12pm)</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.timeOption}>
                <Text style={styles.timeOptionText}>Afternoon (1pm-4pm)</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.timeOption}>
                <Text style={styles.timeOptionText}>Evening (5pm-7pm)</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Meeting Topic:</Text>
            <TextInput
              style={styles.input}
              placeholder="What would you like to discuss?"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowScheduleModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.sendButton]}
                onPress={handleScheduleMeeting}
              >
                <Text style={styles.sendButtonText}>Request Meeting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  tagline: {
    fontSize: 14,
    color: '#dbeafe',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionIcon: {
    padding: 5,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1e40af',
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 5,
  },
  activeTabText: {
    color: '#1e40af',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  repHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  repInfo: {
    marginLeft: 15,
  },
  repName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  repRole: {
    fontSize: 14,
    color: '#64748b',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    color: '#64748b',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  policySelector: {
    marginBottom: 20,
  },
  selectorLabel: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 10,
  },
  selectorButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  selectorButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#e2e8f0',
    borderRadius: 20,
  },
  activeSelectorButton: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  selectorButtonText: {
    color: '#64748b',
  },
  activeSelectorButtonText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  policyCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  policyHeader: {
    backgroundColor: '#0ea5e9',
    padding: 20,
  },
  policyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  policyMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  metaItem: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  complexitySelector: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    gap: 10,
  },
  complexityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  activeComplexityButton: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  complexityButtonText: {
    color: '#64748b',
  },
  activeComplexityButtonText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  policySection: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 10,
  },
  policyText: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  provisionItem: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  provisionText: {
    flex: 1,
    fontSize: 16,
    color: '#334155',
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 15,
    gap: 15,
  },
  impactCard: {
    width: (Dimensions.get('window').width - 70) / 2,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  impactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  impactText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 5,
  },
  simulateButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    margin: 15,
  },
  simulateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 30,
  },
  actionCard: {
    width: (Dimensions.get('window').width - 55) / 2,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    backgroundColor: '#dbeafe',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 5,
  },
  actionCardText: {
    fontSize: 14,
    color: '#64748b',
  },
  messageForm: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  repSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  repOption: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
  },
  selectedRepOption: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  repOptionText: {
    color: '#64748b',
  },
  selectedRepOptionText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  messageInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 30,
  },
  statCard: {
    width: (Dimensions.get('window').width - 55) / 2,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 5,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 15,
  },
  chart: {
    borderRadius: 10,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 15,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    marginTop: 10,
    color: '#64748b',
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 10,
  },
  badgeContainer: {
    gap: 15,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  badgeDesc: {
    fontSize: 14,
    color: '#64748b',
  },
  notification: {
    position: 'absolute',
    top: 100,
    right: 20,
    left: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  successNotification: {
    backgroundColor: '#10b981',
  },
  errorNotification: {
    backgroundColor: '#ef4444',
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  cancelButtonText: {
    color: '#64748b',
    fontWeight: '600',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  typeOption: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    gap: 5,
  },
  typeOptionText: {
    fontSize: 14,
    color: '#64748b',
  },
  dateInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInputText: {
    fontSize: 16,
    color: '#64748b',
  },
  timeSelector: {
    gap: 10,
    marginBottom: 20,
  },
  timeOption: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 10,
  },
  timeOptionText: {
    fontSize: 16,
    color: '#334155',
  },
});

export default CivicConnectApp;
