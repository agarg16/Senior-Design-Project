import React, { useState } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native"
import { styles } from '../styles/MoreStyles'
import { ModalUsed } from '../components/MoreComponents/MoreModal'

const DATA = [
  { title: 'Self-Assessment' },
  { title: 'Graphs' },
  { title: 'Licenses' }
]

const More = () => {
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [modalType, setModalType] = useState("")
  const [updateType, setUpdateType] = useState(false) /* Provides the user with the ability to re-open the most recently closed module (upon updating this value) */

  /* Lists the buttons the user can select on the (main) Extra Information screen */
  type ItemProps = {title: string}
  const Item = ({title}: ItemProps) => {
    return (
      <TouchableOpacity style={styles.infoItemBox} onPress={() => {
        setViewModalVisible(true)
        setModalType(title)
        setUpdateType(!updateType)
      }}>
        <Text style={styles.infoItemText}>{title}</Text>
        <Modals />
      </TouchableOpacity>
  )}


  /* Ensures the user can interact with the different buttons more than once */
  const Modals = () => {
    return ( <View>{ModalUsed(modalType, viewModalVisible)}</View> )
  }

  return (
    <SafeAreaView style={styles.container}>
        {/* Extra Information Title Header */}
        <View style={{ borderColor: 'black', borderBottomWidth: 1, justifyContent: 'center', flex: 1}}>
          <Text style={styles.title}>Extra Information</Text>
        </View>
        
        {/* Displays the Extra Information's Boxes of Info */}
        <View style={styles.moreInfoSection}>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
            scrollEnabled={false}
            numColumns={1}
            
            contentContainerStyle={styles.moreInfoSection}
          />
        </View>
    </SafeAreaView>
  )
}



export default More
