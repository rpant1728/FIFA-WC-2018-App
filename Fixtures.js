import React from 'react';
import { FlatList, ActivityIndicator, AppRegistry, Text, View, StyleSheet, Button , TouchableHighlight, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import App from './App.js'
import { ImageMap } from './Flags.js'
import { styles } from './styles.js'

export default class Fixtures extends React.Component{
  static navigationOptions = {
    title: 'Fixtures',
  };

  getTime(str){
      flag = 0
      hours = str.split(":")[0];
      minutes = str.split(":")[1];
      ist_hours = Number(hours%12) + 5;
      ist_minutes = Number(minutes) + 30;
      time = ist_hours.toString() + ":" + ist_minutes.toString() + " PM (IST)"
      return time;
    }
    
  render(){
    const { navigation } = this.props;
    const matches = navigation.getParam('matches');
    return(
        <ImageBackground source={require("./img/background.png")} style={{width: '100%', height: '100%'}}>
            <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                <FlatList 
                    data={matches}  
                    renderItem={({item}) => 
                    <View>
                        <View>
                            <Text style={styles.text}>{item.datetime.split("T")[0].split("-")[2]}/{item.datetime.split("T")[0].split("-")[1]}</Text>
                            <Text style={styles.text}>{this.getTime(item.datetime.split("T")[1].split("Z")[0])}</Text>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 0.5}}>
                                {item.home_team_country != null &&
                                <Image style={styles.flag} source={ImageMap[item.home_team_country]}/>
                                }
                                {item.home_team_country === null &&
                                    <Image style={styles.flag} source={require("./img/tbd.svg")}/>
                                }
                            </View>
                            <View style={{flex: 1}}>
                                {(item.home_team_country != null || item.home_team_country != null) &&
                                <Text style={{textAlign: 'center'}} style={styles.text}> {item.home_team_country} vs {item.away_team_country} </Text>
                                }
                                {(item.home_team_country === null || item.home_team_country === null) &&
                                <Text style={{textAlign: 'center'}} style={styles.text}> TBD vs TBD </Text>
                                }
                            </View>  
                            <View style={{flex: 0.5, flexDirection: 'row'}}>
                                <View style={{flex: 0.22}}/>
                                <View style={{flex: 0.78}}>
                                    {item.home_team_country != null &&
                                    <Image style={styles.flag} source={ImageMap[item.away_team_country]}/>
                                    }
                                    {item.home_team_country === null &&
                                    <Image style={styles.flag} source={require("./img/tbd.svg")}/>
                                    }
                                </View>
                                </View>
                            </View> 
                            <Text style={styles.text}>{item.location}, {item.venue}</Text> 
                            <Text style={styles.text}>{item.stage_name}</Text>   
                        </View>    
                        <View style = {styles.lineStyle} />
                    </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        </ImageBackground>
    );
  }
}

