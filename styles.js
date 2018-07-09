import React from 'react';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    status_live: {
      fontSize: 17,
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'red',
    },

    status_fulltime: {
      fontSize: 17,
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'black',
    },

    nav: {
      color: 'white',
      fontWeight: '500',
      textAlign: 'center',
      textDecorationLine: 'underline',
    },

    lineup :{
      color: 'white',
      fontWeight: '500',
      textAlign: 'center',
    },

    flag: {
      height: 30,
      width: 60,
    },

    flag_small: {
      height: 20,
      width: 40,
    },
    
    image: {
      height: 60,
      width: 60,
    },

    image_large: {
      height: 200,
      width: 200,
      justifyContent: 'center', 
      alignItems: 'center'
    },

    text: {
      color: 'white',
      fontWeight: '400',
      textAlign: 'center',
    },

    text_big: {
      fontSize: 20,
      color: 'black',
      fontWeight: '400',
      textAlign: 'center',
    },

    text_red: {
      fontSize: 20,
      color: 'black',
      fontWeight: '400',
      textAlign: 'center',
    },

    text_left: {
      color: 'white',
      fontWeight: '400',
      textAlign: 'left',
    },

    text_right: {
      color: 'white',
      fontWeight: '400',
      textAlign: 'right',
    },


    list: {
        height: 60,
    },

    away_win: {
      color: 'red',
      fontWeight: '600',
      fontSize: 22,
      textAlign: 'right', 
      paddingRight: 8
    },

    home_win: {
      color: 'red',
      fontWeight: '600',
      fontSize: 22,
      textAlign: 'left', 
      paddingLeft: 8
    },

    lineStyle:{
      borderWidth: 1,
      borderColor:'black',
      margin:10,
    },

    lineStyle_thin:{
      borderWidth: 0.5,
      borderColor:'black',
      margin:10,
    },

    draw: {
      color: 'green', 
      fontWeight: '500',
      textAlign: 'center',
      fontSize: 18
    },

    score: {
      color: 'white',
      fontWeight: '400',
      textAlign: 'center',
      fontSize: 40
    },

    container:{
        justifyContent: 'center',
        flex:1,  
    },

    ActivityNameTextCss:{
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
    }
    
  })