import React from 'react';
import { FlatList, ActivityIndicator, AppRegistry, Text, View, StyleSheet, Button , TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MatchDetail from './MatchDetail.js'
import HomeScreen from './Home.js'
import PointsTable from './PointsTable.js'
import Teams from './Teams.js'
import Fixtures from './Fixtures.js'
import Squad from './Squad.js'
import PlayerDetails from './PlayerDetails.js'
import CoachDetails from './CoachDetails.js'
import LineupHome from './LineupHome.js'
import LineupAway from './LineupAway.js'

const RootStack = createStackNavigator({
    Home: HomeScreen,
    Match_Detail: MatchDetail,
    Teams: Teams,
    Points_Table: PointsTable,
    Fixtures: Fixtures,
    Squad: Squad,
    Player_Details: PlayerDetails,
    Coach_Details: CoachDetails,
    Lineup_Home: LineupHome,
    Lineup_Away: LineupAway,
},
{
    initialRouteName: 'Home',
}
);

export default class App extends React.Component {
    render(){
        return <RootStack />;
    }
}

AppRegistry.registerComponent('App', () => App);



