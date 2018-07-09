import React from 'react';
import { FlatList, ActivityIndicator, AppRegistry, Text, View, StyleSheet, Button , TouchableHighlight, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import App from './App.js'
import { ImageMap } from './Flags.js'
import { styles } from './styles.js'

export default class PointsTable extends React.Component{
  constructor(props){
    super(props);
    this.state = { isLoading: true }
  }

  static navigationOptions = {
    title: 'Points Table',
  };

  componentDidMount(){
    return fetch('https://worldcup.sfg.io/teams/group_results')
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

    return(
      <ImageBackground source={require("./img/background.png")} style={{width: '100%', height: '100%'}}>
        <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
          <FlatList
            data = {this.state.dataSource}
            renderItem={({item}) =>
              <View style={{paddingBottom: 20}}>
                <Text style={styles.text}>Group {item.letter}</Text>
                <View style={{flex: 1, flexDirection: 'row', paddingTop:10}}>
                  <View style={{flex: 2}}></View>
                  <View style={{flex: 4}}>
                    <Text style={styles.text_left}>Teams</Text>      
                  </View>
                  <View style={{flex: 0.9}}>
                    <Text style={styles.text}>P</Text>      
                  </View>
                  <View style={{flex: 0.9}}>
                    <Text style={styles.text}>W</Text>      
                  </View>
                  <View style={{flex: 0.9}}>
                    <Text style={styles.text}>L</Text>      
                  </View>
                  <View style={{flex: 0.9}}>
                    <Text style={styles.text}>D</Text>      
                  </View>
                  <View style={{flex: 1.1}}>
                    <Text style={styles.text}>GF</Text>      
                  </View>
                  <View style={{flex: 1.1}}>
                    <Text style={styles.text}>GA</Text>      
                  </View>
                  <View style={{flex: 1.1}}>
                    <Text style={styles.text}>GD</Text>      
                  </View>
                  <View style={{flex: 1.1}}>
                    <Text style={styles.text}>Pts</Text>      
                  </View>
                </View>
                <View style = {styles.lineStyle_thin} />
                <FlatList
                  data = {item.ordered_teams}
                  renderItem={({item}) =>
                    <View>
                      <View style={{flex: 1, flexDirection: 'row', paddingTop:10}}>
                        <View style={{flex: 2}}>
                          <Image style={styles.flag_small} source={ImageMap[item.country]}/>
                        </View>
                        <View style={{flex: 4}}>
                          <Text style={styles.text_left}>{item.country}</Text>      
                        </View>
                        <View style={{flex: 0.9}}>
                          <Text style={styles.text}>{item.games_played}</Text>      
                        </View>
                        <View style={{flex: 0.9}}>
                          <Text style={styles.text}>{item.wins}</Text>      
                        </View>
                        <View style={{flex: 0.9}}>
                          <Text style={styles.text}>{item.losses}</Text>      
                        </View>
                        <View style={{flex: 0.9}}>
                          <Text style={styles.text}>{item.draws}</Text>      
                        </View>
                        <View style={{flex: 1.1}}>
                          <Text style={styles.text}>{item.goals_for}</Text>      
                        </View>
                        <View style={{flex: 1.1}}>
                          <Text style={styles.text}>{item.goals_against}</Text>      
                        </View>
                        <View style={{flex: 1.1}}>
                          <Text style={styles.text}>{item.goal_differential}</Text>      
                        </View>
                        <View style={{flex: 1.1}}>
                          <Text style={styles.text}>{item.points}</Text>      
                        </View>
                      </View> 
                      <View style = {styles.lineStyle_thin} />
                    </View>        
                  }
                />
              </View>  
            }
            keyExtractor={(item, index) => index}    
          />
        </View>
      </ImageBackground>
    )    
  }
}
