import React from 'react';
import { FlatList, ActivityIndicator, Text, View, ScrollView, StyleSheet, Button, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import App from './App.js'
import { ImageMap } from './Flags.js'
import { styles } from './styles.js'
  
export default class Match_Detail extends React.Component{    
  static navigationOptions =  {
     title: 'Match Details',
  };
 
  render(){
    const { navigation } = this.props;
    const match = navigation.getParam('match');
    home_team_events = match.home_team_events;
    home_team_goals = home_team_events.filter(x => x.type_of_event === 'goal' || x.type_of_event === 'goal-penalty');
    away_team_events = match.away_team_events;
    away_team_goals = away_team_events.filter(x => x.type_of_event === 'goal' || x.type_of_event === 'goal-penalty');
    home_team_own_goals = home_team_events.filter(x => x.type_of_event === 'goal-own');
    away_team_own_goals = away_team_events.filter(x => x.type_of_event === 'goal-own');
    home_team_goals = home_team_goals.concat(away_team_own_goals);

    for(var i=0; i<home_team_goals.length; i++){
      if(home_team_goals[i].player.includes(" ")){
        name = home_team_goals[i].player.split(" ")[0];
        surname = home_team_goals[i].player.split(" ")[1];
        home_team_goals[i].player = name + " " + surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase();
      }
      else{
        home_team_goals[i].player = home_team_goals[i].player.charAt(0).toUpperCase() + home_team_goals[i].player.slice(1).toLowerCase();
      }
    }
    away_team_goals = away_team_goals.concat(home_team_own_goals);
    for(var i=0; i<away_team_goals.length; i++){
      if(away_team_goals[i].player.includes(" ")){
        name = away_team_goals[i].player.split(" ")[0];
        surname = away_team_goals[i].player.split(" ")[1];
        surname_normalized = surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase();
        away_team_goals[i].player = name + " " + surname_normalized;
      }
      else{
        away_team_goals[i].player = away_team_goals[i].player.charAt(0).toUpperCase() + away_team_goals[i].player.slice(1).toLowerCase();
      }
    }

    return(      
      <ImageBackground source={require("./img/background.png")} style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 20, height: 100}}>
          <ScrollView style={{flex: 1}}>
            {/* <View style={{flex: 1}}> */}
              <View style={{flex: 1, flexDirection: 'column'}}>
                {match.status === 'in progress' && match.time != 'full-time' &&
                  <View style={{flex: 0.1}}>
                    <Text style={styles.status_live}>Live</Text>
                  </View>
                }
                {(match.status === 'completed' || match.time === 'full-time') &&
                  <View style={{flex: 0.2}}>
                    <Text style={styles.status_fulltime}>Full-Time</Text>
                    <Text style={{textAlign: 'center'}} style={styles.text}>{match.datetime.split("T")[0].split("-")[2]}/{match.datetime.split("T")[0].split("-")[1]}</Text>
                  </View>
                }
                <View style={{flex: 0.35}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.5}}>
                      <Image style={styles.flag} source={ImageMap[match.home_team_country]}/>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={{textAlign: 'center'}} style={styles.text}> {match.home_team_country} vs {match.away_team_country} </Text>
                    </View>  
                    <View style={{flex: 0.5, flexDirection: 'row'}}>
                      <View style={{flex: 0.22}}/>
                      <View style={{flex: 0.78}}>
                        <Image style={styles.flag} source={ImageMap[match.away_team_country]}/>
                      </View>
                    </View>
                  </View> 
                  <View>
                    <Text style={{textAlign: 'center'}} style={styles.score}>{match.home_team.goals} - {match.away_team.goals}</Text> 
                      {(match.home_team.penalties != 0 || match.away_team.penalties != 0) &&
                        <Text style={styles.text}>{match.home_team.penalties} - {match.away_team.penalties} (P)</Text>
                      }
                      {match.status === 'in progress' && match.time != 'full-time' &&
                        <Text style={styles.text}>{match.time}</Text>
                      } 
                    <Text style={styles.text}>{match.stage_name}</Text>  
                  </View> 
                </View>
                {/* <View style={{flex: 0.3}}>   */}
                {/* <ScrollView>    */}
                  <View style={styles.list} style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, height: 150}}>
                      <FlatList style={styles.list}
                        data={home_team_goals}  
                        renderItem={({item}) => 
                          <View>
                            {item.type_of_event === 'goal-penalty' &&
                              <Text style={styles.text_left}>{item.player} {item.time} (P)</Text>
                            }
                            {item.type_of_event === 'goal-own' &&
                              <Text style={styles.text_left}>{item.player} {item.time} (OG)</Text>
                            } 
                            {item.type_of_event === 'goal' &&
                              <Text style={styles.text_left}>{item.player} {item.time} </Text>                              
                            }                                
                          </View>
                        }
                        keyExtractor={(item, index) => index}
                      />
                    </View>  
                    <View style={{flex: 1, height: 100}}>
                      <View style={styles.list}>
                        <FlatList style={styles.list}
                          data={away_team_goals}  
                          renderItem={({item}) => 
                            <View>
                              {item.type_of_event === 'goal-penalty' &&
                                <Text style={styles.text_right}>{item.player} {item.time} (P)</Text>
                              }                       
                              {item.type_of_event === 'goal-own' &&
                                <Text style={styles.text_right}>{item.player} {item.time} (OG)</Text>
                              }  
                              {item.type_of_event === 'goal' &&
                                <Text style={styles.text_right}>{item.player} {item.time}</Text>
                              }  
                            </View>
                          }
                          keyExtractor={(item, index) => index}
                        />
                      </View>
                    </View>
                  </View>  
                  {/* </ScrollView> */}
                </View>    
              {/* </View> */}
            {/* </View>   */}
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                <View style={{flex: 0.5}}>
                  <Text style={styles.text}>{match.home_team_statistics.attempts_on_goal}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.on_target}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.off_target}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.corners}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.offsides}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.ball_possession}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.pass_accuracy}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.num_passes}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.yellow_cards}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.red_cards}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.fouls_committed}</Text>
                  <Text style={styles.text}>{match.home_team_statistics.tactics}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.text}>Attempts on goal</Text>
                  <Text style={styles.text}>Shots on target</Text>
                  <Text style={styles.text}>Shots off target</Text>
                  <Text style={styles.text}>Corners</Text>
                  <Text style={styles.text}>Offsides</Text>
                  <Text style={styles.text}>Ball Possession</Text>
                  <Text style={styles.text}>Pass Accuracy</Text>
                  <Text style={styles.text}>Passes</Text>
                  <Text style={styles.text}>Yellow Cards</Text>
                  <Text style={styles.text}>Red Cards</Text>
                  <Text style={styles.text}>Fouls Committed</Text>
                  <Text style={styles.text}>Tactics</Text>
                </View>
                <View style={{flex: 0.5}}>
                  <Text style={styles.text}>{match.away_team_statistics.attempts_on_goal}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.on_target}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.off_target}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.corners}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.offsides}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.ball_possession}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.pass_accuracy}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.num_passes}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.yellow_cards}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.red_cards}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.fouls_committed}</Text>
                  <Text style={styles.text}>{match.away_team_statistics.tactics}</Text>
                </View>
              </View> 
            </View> 
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text></Text>
                <Text></Text>
                <TouchableHighlight onPress = {() => this.props.navigation.navigate("Lineup_Home", {match: match})}>
                  <Text style={styles.nav}>See {match.home_team_country}'s Lineup</Text>
                </TouchableHighlight>
                <Text></Text>
              <Text></Text>
              </View>
              <View style={{flex: 1}}>
              <Text></Text>
              <Text></Text>
                <TouchableHighlight onPress = {() => this.props.navigation.navigate("Lineup_Away", {match: match})}>
                  <Text style={styles.nav}>See {match.away_team_country}'s Lineup</Text>
                </TouchableHighlight>
                <Text></Text>
                <Text></Text>  
              </View>
            </View>
          </ScrollView>
        </View>        
      </ImageBackground>
    );
  }
}


