import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RepresentativeCard = ({ representative }) => {
  const handleContact = (type, value) => {
    switch(type) {
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
      case 'website':
        Linking.openURL(value);
        break;
      default:
        break;
    }
  };

  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {representative.photoUrl ? (
          <Image 
            source={{ uri: representative.photoUrl }} 
            style={{ width: 60, height: 60, borderRadius: 30 }} 
          />
        ) : (
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#e0f2fe',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0ea5e9' }}>
              {representative.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
        )}
        
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{representative.name}</Text>
          <Text style={{ color: '#64748b' }}>
            {representative.role} | {representative.party}
          </Text>
        </View>
      </View>
      
      <View style={{ marginTop: 15 }}>
        {representative.contact.email && (
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
            onPress={() => handleContact('email', representative.contact.email)}
          >
            <Icon name="mail" size={20} color="#3b82f6" />
            <Text style={{ marginLeft: 10 }}>{representative.contact.email}</Text>
          </TouchableOpacity>
        )}
        
        {representative.contact.phone && (
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
            onPress={() => handleContact('phone', representative.contact.phone)}
          >
            <Icon name="call" size={20} color="#3b82f6" />
            <Text style={{ marginLeft: 10 }}>{representative.contact.phone}</Text>
          </TouchableOpacity>
        )}
        
        {representative.contact.website && (
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
            onPress={() => handleContact('website', representative.contact.website)}
          >
            <Icon name="globe" size={20} color="#3b82f6" />
            <Text style={{ marginLeft: 10 }}>{representative.contact.website}</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
        <TouchableOpacity style={{
          backgroundColor: '#dbeafe',
          padding: 10,
          borderRadius: 8,
          flex: 1,
          marginRight: 5,
          alignItems: 'center'
        }}>
          <Text style={{ color: '#2563eb' }}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{
          backgroundColor: '#dbeafe',
          padding: 10,
          borderRadius: 8,
          flex: 1,
          marginLeft: 5,
          alignItems: 'center'
        }}>
          <Text style={{ color: '#2563eb' }}>Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RepresentativeCard;
