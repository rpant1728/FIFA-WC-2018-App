import React from 'react';
import { FlatList, ActivityIndicator, AppRegistry, Text, View, StyleSheet, Button , TouchableHighlight, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import App from './App.js'
import { ImageMap } from './Flags.js'
import { styles } from './styles.js'
import teams from './teams.json'
import { List, ListItem } from 'react-native-elements'

export default class Teams extends React.Component{
    static navigationOptions = {
        title: 'Teams',
    };
    
    render(){
        list = ['njd', 'hjnkdec', 'njmk'];

        var teams = require('./teams.json');

        return(
            <ImageBackground source={require("./img/background.png")} style={{width: '100%', height: '100%'}}>
                {/* <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20}}> */}
                    <View style={{flex: 1, flexDirection: 'column', paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
                        <View style={{flex: 0.1}}>
                            <Text style={styles.text}>(Tap to view squads)</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={{flex: 1}}>
                                <FlatList
                                    data = {teams}
                                    renderItem={({item}) =>
                                        <View style={{paddingBottom: 10, paddingTop: 10}}>
                                            <TouchableHighlight onPress = {() => this.props.navigation.navigate("Squad", {team: item})}>
                                                <View style={{flex:1, flexDirection:'row'}}>
                                                    <View style={{flex: 1}}>
                                                        <Image style={styles.flag_small} source={ImageMap[item.country]}/>
                                                    </View>
                                                    <View style={{flex: 5}}>
                                                        <Text style={styles.text_left}>{item.country}</Text>
                                                    </View>
                                                </View>
                                            </TouchableHighlight>                                    
                                            <View style = {styles.lineStyle_thin} />
                                        </View>
                                    }
                                /> 
                            </View>
                        </View> 
                    </View>
                {/* </View> */}
            </ImageBackground>      
        )
    }
}
