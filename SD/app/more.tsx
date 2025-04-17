import React, { useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { styles } from '../styles/MoreStyles';
import { ModalUsed} from '../components/MoreComponents/MoreModal';
import type { ModalType } from '../components/MoreComponents/types'

const DATA = [
  { title: 'Self-Assessment' as ModalType},
  { title: 'Graphs' as ModalType},
  { title: 'Licenses' as ModalType}
];


const More = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("Licenses");
  
  type ItemProps = { title: ModalType};
  const Item = ({ title }: ItemProps) => (
    <TouchableOpacity
      style={styles.infoItemBox}
      onPress={() => {
        setModalType(title);
        setIsModalVisible(true);
      }}
    >
      <Text style={styles.infoItemText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ borderColor: 'black', borderBottomWidth: 1, justifyContent: 'center', flex: 1 }}>
        <Text style={styles.title}>Extra Information</Text>
      </View>
      
      {/* Content */}
      <View style={styles.moreInfoSection}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          scrollEnabled={false}
          numColumns={1}
          contentContainerStyle={styles.moreInfoSection}
          keyExtractor={(item) => item.title}
        />
      </View>

      {/* Single Modal Instance */}
      <ModalUsed
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        type={modalType}
      />
    </SafeAreaView>
  );
};

export default More;