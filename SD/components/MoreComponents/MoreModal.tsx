import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Modal, 
  TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Linking } from "react-native";
import { modalStyles } from '../../styles/MoreStyles';
import { Ionicons } from '@expo/vector-icons';
import { MIT, Apache, Licenses } from '../../additionalFiles/licenses';
import { GraphInput } from './GraphInput'
import { SelfAssessment } from './SelfAssessment';
import type { ModalType } from './types'

export const ModalUsed = ({ 
  type, 
  visible, 
  onClose 
}: { 
  type: ModalType; 
  visible: boolean;
  onClose: () => void; 
}) => {
  const [modalType, setModalType] = useState<ModalType>(type);
  const [packageUsed, setPackageUsed] = useState("");
  const [licenseUsed, setLicenseUsed] = useState("");
  const [copyrightUsed, setCopyrightUsed] = useState("");
  const [urlUsed, setUrlUsed] = useState("");

  useEffect(() => {
      setModalType(type);
  }, [type]);

  useEffect(() => {
    if (!visible) {
      setPackageUsed("");
      setLicenseUsed("");
      setCopyrightUsed("");
      setUrlUsed("");
    }
  }, [visible]);

  const handleBack = () => {
    if (modalType === "LicenseChosen") {
      setModalType("Licenses");
    } else {
      onClose();
    }
  };

  const Package = (licenseUsed: string, copyrightUsed: string) => {
    if(licenseUsed.includes("MIT")) {
      return (
        <ScrollView style={modalStyles.licenseContainer}>
          <Text style={modalStyles.licenseText}>{MIT(copyrightUsed)}</Text>
        </ScrollView>
      );
    }
    return (
      <ScrollView style={modalStyles.licenseContainer}>
        <Text style={modalStyles.licenseText}>{Apache}</Text>
      </ScrollView>
    );
  };

  type LicenseProps = {
    packageName: string; // Fixed prop name
    license: string;
    copyright: string;
    url: string;
  };

  const License = (props: LicenseProps) => (
    <TouchableOpacity 
      style={modalStyles.packageButtons} 
      onPress={() => {
        setModalType("LicenseChosen");
        setPackageUsed(props.packageName);
        setLicenseUsed(props.license);
        setCopyrightUsed(props.copyright);
        setUrlUsed(props.url);
      }}
    >
      <Text style={{fontSize: 20, textAlign: 'center'}}>{props.packageName}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal 
      visible={visible} 
      animationType='slide' 
      presentationStyle='pageSheet' 
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? "padding" : undefined} 
          style={{ flex: 1, backgroundColor: 'white' }}
        >
          <SafeAreaView style={modalStyles.container}>
            <TouchableOpacity style={modalStyles.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" color={'#18576D'} size={20} />
              <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
            </TouchableOpacity>
             
            {modalType === "Graphs" && (
              <>
                <Text style={modalStyles.modalTypeTitle}>Graphs</Text>
                <GraphInput />
              </>
            )}

            {modalType === "Self-Assessment" && (
              <>
                <Text style={modalStyles.modalTypeTitle}>Self-Assessment</Text>
                <SelfAssessment />
              </>
            )}

            {modalType === "Licenses" && (
              <View style={{ borderBottomWidth: 1, flex: 1 }}>
                <Text style={modalStyles.modalTypeTitle}>{modalType}</Text>
                <FlatList 
                  data={Licenses}
                  keyExtractor={(item) => item.packageName}
                  renderItem={({ item }) => (
                    <License 
                      packageName={item.packageName}
                      license={item.licenseType}
                      copyright={item.licenseCopyright}
                      url={item.licenseURL}
                    />
                  )}
                />
              </View>
            )}

            {modalType === "LicenseChosen" && (
              <View style={{ flex: 1 }}>
                <Text style={modalStyles.modalTypeTitle}>{packageUsed}</Text>
                {Package(licenseUsed, copyrightUsed)}
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18, padding: 4 }}>View Repository At:</Text>
                  <Text 
                    onPress={() => Linking.openURL(urlUsed)} 
                    style={{ color: '#18576D', fontSize: 16, textAlign: 'center', padding: 4 }}
                  >
                    {urlUsed}
                  </Text>
                </View>
              </View>
            )}

            {/* Add other modal types here following the same pattern */}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


