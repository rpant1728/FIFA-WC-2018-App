import React from 'react';
import { 
  FlatList, ActivityIndicator, AppRegistry, Text, View, StyleSheet, Button , TouchableHighlight, 
  Image, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import App from './App.js'
import { ImageMap } from './Flags.js'
import { styles } from './styles.js'

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true }
  }

  static navigationOptions = {
      title: 'Home',
      header: null
   }; 

  componentDidMount(){
    this.fetchData()
  }

  onRefresh(){
      this.setState({ isLoading: true }, function() { this.fetchData() });
    }
    
   fetchData(){return fetch('https://worldcup.sfg.io/matches')
      .then((response) => response.json())
      .then((responseJSON) => {

        this.setState({
          isLoading: false,
          dataSource: responseJSON,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    const { navigate } = this.props.navigation;

    if(this.state.isLoading){
      return(
        <View>
          <ImageBackground source={require("./img/background.png")} style={{width: '100%', height: '100%'}}> 
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
              <Image source={require("./img/cup.png")} style={{height: 100, width: 90}}/> 
              <Text style={styles.text_big}>Loading...</Text>
            </View> 
          </ImageBackground>
          <ActivityIndicator/>   
        </View>    
      )
    } 

    completed = this.state.dataSource.filter(l => {
      return l.status.match("completed");
    })
    completed = completed.reverse();
    live = this.state.dataSource.filter(l => {
      return l.status.match("in progress");
    })  
    live = live.reverse();
    matches = live.concat(completed);
    future = this.state.dataSource.filter(l => {
      return l.status.match("future");
    })

    return(
      <ImageBackground source={require("./img/background.png")} style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex:0.125}}>
            <View style={{flex: 1, flexDirection: 'row', paddingTop:20, backgroundColor: '#6495ED'}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableHighlight onPress = {() => this.props.navigation.navigate("Fixtures", {matches: future})}>
                  <Text style={styles.nav}>Fixtures</Text>
                </TouchableHighlight>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableHighlight onPress = {() => this.props.navigation.navigate("Points_Table")}>
                  <Text style={styles.nav}>Points Table</Text>
                </TouchableHighlight>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableHighlight onPress = {() => this.props.navigation.navigate("Teams")}>
                  <Text style={styles.nav}>Teams</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View> 
          <View style={{flex:1}}>
            <View style={{flex: 1, paddingTop:10}} style={styles.container}>
              <FlatList
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isLoading}
                data={matches}  
                renderItem={({item}) => 
                  <View style={{paddingTop: 15, paddingLeft: 25, paddingRight: 25}}>
                    <TouchableHighlight onPress = {() => this.props.navigation.navigate("Match_Detail", {match:item})}>
                      <View>
                          {item.status === 'in progress' && item.time != 'full-time' &&
                            <View>
                              <Text style={styles.status_live}>Live</Text>
                            </View>
                          }
                          {(item.status === 'completed' || item.time === 'full-time') &&
                            <View>
                              <Text style={styles.status_fulltime}>Full-Time</Text>
                              <Text style={{textAlign: 'center'}} style={styles.text}>{item.datetime.split("T")[0].split("-")[2]}/{item.datetime.split("T")[0].split("-")[1]}</Text>
                            </View>
                          }
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 0.5}}>
                              <Image style={styles.flag} source={ImageMap[item.home_team_country]}/>
                            </View>
                            <View style={{flex: 1}}>
                              <Text style={{textAlign: 'center'}} style={styles.text}> {item.home_team_country} vs {item.away_team_country} </Text>
                            </View>  
                            <View style={{flex: 0.5, flexDirection: 'row'}}>
                              <View style={{flex: 0.22}}/>
                              <View style={{flex: 0.78}}>
                                <Image style={styles.flag} source={ImageMap[item.away_team_country]}/>
                              </View>
                            </View>
                          </View> 
                          <Text style={{textAlign: 'center'}} style={styles.score}>{item.home_team.goals} - {item.away_team.goals}</Text> 
                            {(item.home_team.penalties != 0 || item.away_team.penalties != 0) &&
                              <Text style={styles.text}>{item.home_team.penalties} - {item.away_team.penalties} (P)</Text>
                            }
                            {((item.home_team.goals > item.away_team.goals) || 
                              (item.home_team.goals === item.away_team.goals && item.home_team.penalties > item.away_team.penalties)) &&
                              (item.status != 'in progress' || item.time === 'full-time') &&                     
                              // <Text style={styles.home_win}>Winner</Text>
                              <Text style={styles.home_win}></Text>
                            }
                            {((item.home_team.goals < item.away_team.goals) || 
                              (item.home_team.goals === item.away_team.goals && item.home_team.penalties < item.away_team.penalties)) &&
                              (item.status != 'in progress' || item.time === 'full-time') &&
                              // <Text style={styles.away_win}>Winner</Text>
                              <Text style={styles.home_win}></Text>
                            }
                            {item.home_team.goals === item.away_team.goals && item.home_team.penalties === item.away_team.penalties &&
                              (item.status != 'in progress' || item.time === 'full-time') &&
                              <Text style={styles.draw}>Draw</Text>
                            }
                            {item.status === 'in progress' && item.time != 'full-time' &&
                              <Text style={styles.text}>{item.time}</Text>
                            } 
                          <Text style={styles.text}>{item.stage_name}</Text>   
                      </View>    
                    </TouchableHighlight>
                    <View style = {styles.lineStyle} />
                  </View>
                }
                keyExtractor={(item, index) => index}
              />
            </View>
          </View>  
        </View>  
      </ImageBackground>  
    );
  }
}

