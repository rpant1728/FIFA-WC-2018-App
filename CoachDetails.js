import React from 'react';
import { FlatList, ActivityIndicator, AppRegistry, Text, View, StyleSheet, Button , TouchableHighlight, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import App from './App.js'
import { ImageMap } from './Flags.js'
import { styles } from './styles.js'
import { CoachImageMaps } from './CoachImageMaps.js'

export default class CoachDetail extends React.Component{
    static navigationOptions = {
        title: 'Coach Details',
    };
    
    render(){
        const { navigation } = this.props;
        const coach = navigation.getParam('coach');

        return(
            <ImageBackground source={require("./img/background.png")} style={{width: '100%', height: '100%'}}>
                <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={styles.image_large} source={CoachImageMaps[coach.name]}/>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.text_left}>Name :</Text>
                            <Text style={styles.text_left}>Country :</Text>
                            <Text style={styles.text_left}>Age :</Text>
                            <Text style={styles.text_left}>Date of Birth :</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.text}>{coach.name}</Text>
                            <Text style={styles.text}>{coach.country}</Text>
                            <Text style={styles.text}>{coach.age}</Text>
                            <Text style={styles.text}>{coach.dob}</Text>
                        </View>
                    </View>    
                </View>
            </ImageBackground>      
        )
    }
}
