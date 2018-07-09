import React from 'react';
import { FlatList, ActivityIndicator, AppRegistry, Text, View, StyleSheet, Button , TouchableHighlight, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import App from './App.js'
import { ImageMap } from './Flags.js'
import { styles } from './styles.js'
import { PlayerImageMaps } from './PlayerImageMaps'
import { CoachImageMaps } from './CoachImageMaps'
// import teams from './teams.json';

export default class Squad extends React.Component{
    static navigationOptions = {
        title: 'Squad',
    };
    
    render(){
        var teams = require('./teams.json');
        const { navigation } = this.props;
        const team = navigation.getParam('team');

        return(
            <ImageBackground source={require("./img/background.png")} style={{width: '100%', height: '100%'}}>
                <View style={{flex:1, flexDirection:'column', paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
                    <View style={{flex: 0.08}}>
                        {/* <View style={{paddingBottom: 10, paddingTop: 10}}> */}
                            {/* <TouchableHighlight onPress = {() => this.props.navigation.navigate("Coach_Details", {coach: team.coach})}> */}
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex: 1}}>
                                        <Image style={{height:40, width:40}} source={CoachImageMaps[team.coach.name]}/>
                                    </View>
                                    <View style={{flex: 5}}>
                                        <Text style={styles.text_left}>Coach - {team.coach.name}</Text>
                                    </View>
                                </View> 
                            {/* </TouchableHighlight>    */}
                        {/* </View>                    */}
                        {/* <View style = {styles.lineStyle_thin} /> */}
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.nav}>Players</Text><Text style={styles.text}>(Tap to view Profile)</Text>
                        <FlatList
                            data = {team.players}
                            renderItem={({item}) =>
                                <View style={{paddingBottom: 10, paddingTop: 10}}>
                                    <TouchableHighlight onPress = {() => this.props.navigation.navigate("Player_Details", {player: item})}>
                                        <View style={{flex:1, flexDirection:'row'}}>
                                            <View style={{flex: 1}}>
                                                <Image style={{height:40, width:40}} source={PlayerImageMaps[item.name]}/>
                                            </View>
                                            <View style={{flex: 5}}>
                                                <Text style={styles.text_left}>{item.name} ({item.role})</Text>
                                            </View>
                                        </View>                                        
                                    </TouchableHighlight>                                    
                                    <View style = {styles.lineStyle_thin} />
                                </View>
                            }
                        />
                    </View>    
                </View>    
            </ImageBackground>      
        )
    }
}
