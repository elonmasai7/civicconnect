import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import RepresentativeCard from '../components/RepresentativeCard';
import { getRepresentatives } from '../services/api';

const RepresentativesScreen = () => {
  const [address, setAddress] = useState('');
  const [reps, setReps] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!address.trim()) return;
    
    setLoading(true);
    try {
      const representatives = await getRepresentatives(address);
      setReps(representatives);
    } catch (error) {
      console.error('Error fetching representatives:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Find Your Representatives
      </Text>
      
      <TextInput
        style={{ 
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1, 
          padding: 10,
          marginBottom: 10
        }}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />
      
      <Button 
        title={loading ? "Searching..." : "Search"} 
        onPress={handleSearch} 
        disabled={loading}
      />
      
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={reps}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <RepresentativeCard representative={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default RepresentativesScreen;
