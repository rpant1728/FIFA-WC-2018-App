import React from 'react';
import { FlatList, ActivityIndicator, Text, View, ScrollView, StyleSheet, Button, ImageBackground,
         Image, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import App from './App.js'
import { ImageMap } from './Flags.js'
import { PlayerImageMaps } from './PlayerImageMaps'
import { styles } from './styles.js'
import teams from './teams.json'
  
export default class Match_Detail extends React.Component{    
  static navigationOptions =  {
     title: 'Lineups',
     header: null
  };

  lastname(name){
    name_list = name.split(" ");
    if(name_list.length === 2){
      return name;
    }
    shortened_name = "";
    for(i=1; i<name_list.length; i++){
      shortened_name = shortened_name + name_list[i];
    }
    return shortened_name;
  }

  player_profile(name){
    for(var i=0; i<teams.length; i++){
      if(teams[i].country === match.home_team_country){
        curr_team = teams[i];
        break;
      }
    }
    for(var i=0; i<curr_team.players.length; i++){
      if(curr_team.players[i].name === name){
        player = curr_team.players[i];
        return player;
      }
    }
  }
 
  render(){
    const { navigation } = this.props;
    const match = navigation.getParam('match');

    home_team_lineup = match.home_team_statistics.starting_eleven;
    for(var i=0; i<home_team_lineup.length; i++){
      player_name = home_team_lineup[i].name.split(" ");
      temp = ""
      console.log(player_name);
      for(var j=0; j<player_name.length; j++){
        if(player_name[j].length > 0){
          temp = temp + player_name[j].charAt(0).toUpperCase() + player_name[j].slice(1).toLowerCase() + " ";
        }
      }
      home_team_lineup[i].name = temp;
    }
    defenders = home_team_lineup.filter(l =>{
      return l.position.match("Defender");
    });
    forwards = home_team_lineup.filter(l =>{
      return l.position.match("Forward");
    });
    goalie = home_team_lineup.filter(l =>{
      return l.position.match("Goalie");
    });
    midfielders = home_team_lineup.filter(l =>{
      return l.position.match("Midfield");
    });

    midfielders_view = []
    for(var i=0; i<midfielders.length; i++){
      midfielders_view.push(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.image} source={PlayerImageMaps[midfielders[i].name]}/>
          <Text style={styles.lineup}>{this.lastname(midfielders[i].name)}</Text>
          <Text style={styles.text}>Midfielder</Text>
        </View>
      )
    }

    forwards_view = []
    for(var i=0; i<forwards.length; i++){
      forwards_view.push(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.image} source={PlayerImageMaps[forwards[i].name]}/>
          <Text style={styles.lineup}>{this.lastname(forwards[i].name)}</Text>
          <Text style={styles.text}>Forward</Text>
        </View>
      )
    }

    defenders_view = []
    for(var i=0; i<defenders.length; i++){
      defenders_view.push(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <TouchableHighlight onPress = {() => this.props.navigation.navigate("Player_Details", {player: this.player_profile(defenders[i].name)})}>
          <View> */}
            <Image style={styles.image} source={PlayerImageMaps[defenders[i].name]}/>
            <Text style={styles.lineup}>{this.lastname(defenders[i].name)}</Text>
            <Text style={styles.text}>Defender</Text>
          {/* </View>
        </TouchableHighlight> */}
        </View>
      )
    }

    goalie_view = <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={styles.image} source={PlayerImageMaps[goalie[0].name]}/>
                    <Text style={styles.lineup}>{this.lastname(goalie[0].name)}</Text>
                    <Text style={styles.text}>Goalkeeper</Text>
                  </View>

      return(
        <ImageBackground source={require("./img/background1.jpg")} style={{width: '100%', height: '100%'}}>
          <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingTop: 20}}>   
            <View style={{flex: 1}}>   
              <View style={{flex: 1, flexDirection: 'row'}}>
                {forwards_view}                   
              </View>
            </View>  
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {midfielders_view}
              </View>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {defenders_view}
              </View>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {goalie_view}
              </View>  
            </View>
          </View>
        </ImageBackground>
      )
  }
}