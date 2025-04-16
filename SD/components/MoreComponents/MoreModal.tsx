import React, { useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Linking } from "react-native"
import { modalStyles } from '../../styles/MoreStyles'
import { Ionicons } from '@expo/vector-icons'
import { MIT, Apache, Licenses } from '../../additionalFiles/licenses'
import { GraphInput } from './GraphInput'

/* Determines the view based on what button was selected */
export const ModalUsed = (type: string, visible: boolean) => {
    const [viewModalVisible, setViewModalVisible] = useState(visible)
    const [modalType, setModalType] = useState(type)
    
    const [packageUsed, setPackageUsed] = useState("")
    const [licenseUsed, setLicenseUsed] = useState("")
    const [copyrightUsed, setCopyrightUsed] = useState("")
    const [urlUsed, setUrlUsed] = useState("")


    /* Displays the correct license description based on the package selected under the Licenses button */
    const Package = (licenseUsed: string, copyrightUsed: string) => {
        /* Determines which of the two licenses used is currently being viewed */
        if(licenseUsed.includes("MIT")) {
            return (
                <View style={modalStyles.licenseContainer}>
                    <Text style={modalStyles.licenseText}>{MIT(copyrightUsed)}</Text>
                </View>
            )
        }
        else {
            return (
                <ScrollView  style={modalStyles.licenseContainer}>
                    <Text style={modalStyles.licenseText}>{Apache}</Text>
                </ScrollView>
            )
        }
    }

    /* Displays all license packages under Licenses button */
    type LicenseProps = {package: string, license: string, copyright: string, url: string}
    const License = (props: LicenseProps) => {
        return (
            <TouchableOpacity style={modalStyles.packageButtons} onPress={() => {
                setModalType("LicenseChosen")
                setPackageUsed(props.package)
                setLicenseUsed(props.license)
                setCopyrightUsed(props.copyright)
                setUrlUsed(props.url)
            }}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>{props.package}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal visible={viewModalVisible} animationType='slide' presentationStyle='pageSheet' onRequestClose={() => { setViewModalVisible(false) }} >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ backgroundColor: 'white', flex: 1 }}>
                    <SafeAreaView style={modalStyles.container}>
                        {/* Modal Type Query in const to allow for immediate refreshing upon a button being selected */}
                        {modalType === "Main"
                        ?
                            <>
                            {/* Back Button */}
                            <TouchableOpacity style={modalStyles.backButton} onPress={() => setViewModalVisible(false)}>
                                <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                                <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
                            </TouchableOpacity>
                    
                            {/* Modal Type Title */}
                            <Text style={modalStyles.modalTypeTitle}>{modalType}</Text>
                    
                            {/* Modal Type Chosen */}
                            <Text>{modalType}</Text>
                            </>
                        :
                        modalType === "Self-Assessment"
                        ?
                            <>
                            {/* Back Button */}
                            <TouchableOpacity style={modalStyles.backButton} onPress={() => setViewModalVisible(false)}>
                                <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                                <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
                            </TouchableOpacity>
                    
                            {/* Modal Type Title */}
                            <Text style={modalStyles.modalTypeTitle}>{modalType}</Text>
                    
                            <Text>{modalType}</Text>
                            </>
                        :
                        modalType === "Graphs"
                        ?
                            <>
                            {/* Back Button */}
                            <TouchableOpacity style={modalStyles.backButton} onPress={() => setViewModalVisible(false)}>
                                <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                                <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
                            </TouchableOpacity>

                            <Text style={modalStyles.modalTypeTitle}>{modalType}</Text>
                    
                            {/* Modal Type Title */}
                            <GraphInput />
                            
                            </>
                        :
                        modalType === "Learn More"
                        ?
                            <>
                            {/* Back Button */}
                            <TouchableOpacity style={modalStyles.backButton} onPress={() => setViewModalVisible(false)}>
                                <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                                <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
                            </TouchableOpacity>
                    
                            {/* Modal Type Title */}
                            <Text style={modalStyles.modalTypeTitle}>{modalType}</Text>
                    
                            <Text>{modalType}</Text>
                            </>
                        :
                        modalType === "Licenses" 
                        ? 
                            <View style={{borderBottomWidth: 1, flex: 1}}>
                            {/* Back Button */}
                            <TouchableOpacity style={modalStyles.backButton} onPress={() => setViewModalVisible(false)}>
                                <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                                <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
                            </TouchableOpacity>
                    
                            {/* Modal Type Title */}
                            <Text style={modalStyles.modalTypeTitle}>{modalType}</Text>
                            
                            <FlatList 
                                data={Licenses}
                                renderItem={({item}) => {
                                return( 
                                    <License package={item.packageName} license={item.licenseType} copyright={item.licenseCopyright} url={item.licenseURL}/>
                                )
                                }}
                            />
                            </View>
                        : /* License That Was Selected */
                            <View style={{flex: 1}}>
                                {/* Back Button */}
                                <TouchableOpacity style={modalStyles.backButton} onPress={() => setModalType("Licenses")}>
                                    <Ionicons name="chevron-back" color={'#18576D'} size={20} />
                                    <Text style={{ color: '#18576D', fontSize: 16 }}>Back</Text>
                                </TouchableOpacity>
                        
                                {/* Modal Type Title */}
                                <Text style={modalStyles.modalTypeTitle}>{packageUsed}</Text>
                        
                                {/* Package-Specific License */}
                                {Package(licenseUsed, copyrightUsed)}

                                {/* License URL */}
                                <View style={{justifyContent: 'center'}}>
                                    <Text style={{fontSize: 18, padding: 4}}>View Repository At:</Text>
                                    <Text onPress={() => Linking.openURL(urlUsed)} style={{color: '#18576D', fontSize: 16, textAlign: 'center', padding: 4}}>{urlUsed}</Text>
                                </View>
                            </View>
                        }
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    )  
}
