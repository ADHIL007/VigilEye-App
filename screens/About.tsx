import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';

const About = () => {
  const developers = [
    { name: 'Adhil Shah', linkedin: 'https://www.linkedin.com/in/shah717/' },
    { name: 'Ahammed Musharaf', linkedin: 'https://www.linkedin.com/in/ahammed-musharaf-n-k-42b430279/' },
    { name: 'Ajil Benny', linkedin: '' },
    { name: 'Muhammed Hashif', linkedin: 'https://www.linkedin.com/in/muhammed-hashif-v-43091826a/' }
  ];

  const openLinkedInProfile = (url) => {
    Linking.openURL(url);
  };

  const openEmail = () => {
    Linking.openURL('mailto:adhilshaht111@gmail.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.introduction}>
        We are a group of passionate undergraduate BTech Computer Science students dedicated to innovating in the field of surveillance and security. Our project focuses on enhancing CCTV camera systems to detect violence and ensure public safety.
      </Text>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Meet Developers</Text>
        {developers.map((developer, index) => (
          <TouchableOpacity key={index} onPress={() => openLinkedInProfile(developer.linkedin)} style={styles.developerContainer}>
            <Text style={styles.text}>{developer.name}</Text>
            {developer.linkedin !== '' && (
              <FontAwesome5Icon name={'linkedin-square'} color="#123456" size={20} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Project Information</Text>
        <Text style={styles.text}>
          Enhancing CCTV camera systems in the detection of violence. The system alerts if violence occurs and records the event for later analysis. Utilizing the RTSP protocol for video analysis.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>License</Text>
        <Text style={styles.text}>
          This project is licensed under the terms of the MIT License.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Contact Us</Text>
        <TouchableOpacity onPress={openEmail} style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Send us an Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#123456',
  },
  introduction: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: '#123456',
  },
  section: {
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#123456',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: 'darkgrey',
  },
  developerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 15,
  },
  contactButton: {
    backgroundColor: '#123456',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
