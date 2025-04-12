import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native"
import { styles, modalStyles } from '../styles/MoreStyles'
import { Ionicons } from '@expo/vector-icons'

const DATA = [
  { title: 'Self-Assessment' },
  { title: 'Graphs' },
  { title: 'Learn More' },
  { title: 'Licenses' }
]

const More = () => {
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [modalType, setModalType] = useState("")

  type ItemProps = {title: string}
  const Item = ({title}: ItemProps) => {
    return (
      <TouchableOpacity style={styles.infoItemBox} onPress={() => {
        setViewModalVisible(true)
        setModalType(title)
      }}>
        <Text style={styles.infoItemText}>{title}</Text>
      </TouchableOpacity>
  )}

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ borderColor: 'black', borderBottomWidth: 1, justifyContent: 'center', flex: 1}}>
        <Text style={styles.title}>Extra Information</Text>
        </View>
        
        <View style={styles.moreInfoSection}>
        {/* Displays the boxes of info */}
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          scrollEnabled={false}
          numColumns={1}
          
          contentContainerStyle={styles.moreInfoSection}
        />
        </View>
      </SafeAreaView>

      {/* Modals */}
        <Modal visible={viewModalVisible} onRequestClose={() => setViewModalVisible(false)} animationType='slide' presentationStyle='pageSheet'>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ backgroundColor: 'white', flex: 1 }}>
              <SafeAreaView style={modalStyles.container}>
                  {/* Back Button */}
                  <TouchableOpacity style={modalStyles.backButton} onPress={() => setViewModalVisible(false)}>
                    <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                    <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
                  </TouchableOpacity>

                  {/* Modal Type Title */}
                  <Text style={{fontSize: 32, textAlign: 'center', paddingBottom: 32}}>{modalType}</Text>


              </SafeAreaView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
    </>
  )
}



export default More
