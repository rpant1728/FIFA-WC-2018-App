import React from 'react';
import { FlatList, ActivityIndicator, AppRegistry, Text, View, StyleSheet, Button , TouchableHighlight, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import App from './App.js'
import { ImageMap } from './Flags.js'
import { styles } from './styles.js'
import { PlayerImageMaps } from './PlayerImageMaps.js'

export default class PlayerDetail extends React.Component{
    static navigationOptions = {
        title: 'Player Details',
    };
    
    render(){
        const { navigation } = this.props;
        const player = navigation.getParam('player');

        description = []
        for(var i=0; i<player.description.length; i++){
            description.push(player.description[i.toString]);
        }

        return(
            <ImageBackground source={require("./img/background.png")} style={{width: '100%', height: '100%'}}>
                <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={styles.image_large} source={PlayerImageMaps[player.name]}/>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.text_left}>Name :</Text>
                            <Text style={styles.text_left}>Country :</Text>
                            <Text style={styles.text_left}>Role :</Text>
                            <Text style={styles.text_left}>Age :</Text>
                            <Text style={styles.text_left}>International Goals :</Text>
                            <Text style={styles.text_left}>International Caps :</Text>
                            <Text style={styles.text_left}>Height :</Text>
                            <Text style={styles.text_left}>Date of Birth :</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.text_left}>{player.name}</Text>
                            <Text style={styles.text_left}>{player.country}</Text>
                            <Text style={styles.text_left}>{player.role}</Text>
                            <Text style={styles.text_left}>{player.age}</Text>
                            <Text style={styles.text_left}>{player.int_goals}</Text>
                            <Text style={styles.text_left}>{player.int_caps}</Text>
                            <Text style={styles.text_left}>{player.height}</Text>
                            <Text style={styles.text_left}>{player.dob}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>      
        )
    }
}
