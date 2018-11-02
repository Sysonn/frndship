import React from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  StatusBar,

 } from 'react-native';
//import api from './utilities/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class SettingsScreen extends React.Component {

  constructor(props){
    super(props);
    
    //this.state ={ isLoading: true, results:{items: [] }}
    this.state = { isLoading: true, refreshing: false, dataSource: [] }
  }

  

    componentDidMount(){
      return fetch('http://159.203.185.162/users/')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            isLoading: false,
            dataSource: responseJson,
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
    }
  
    _onRefresh = () => {
      this.setState({refreshing: true});
      this.componentDidMount().then(() => {
        this.setState({refreshing: false});
      });
    }

    render() {
      
      // JSON.stringify(responseJson);
      // test = reso
      //console.log(fetch('http://159.203.185.162/snippets/2/'));

      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }

      return (
        <View style={styles.container}>
        <StatusBar
          backgroundColor="#C43F3F"
          barStyle="light-content"
        />
          <View style={styles.navBar}>
            {/* <Image source={require('./images/flogo.png')} style={{ width: 100, height: 50 }} /> */}
            <Icon style={styles.noteItem} name="notifications" size={25} />
            <Text style={{alignItems: 'center', justifyContent: 'center', color: 'white', marginLeft: 60, fontSize: 20, fontWeight:'bold', }} >Frnds</Text>
            <View style={styles.rightNav}>
              <TouchableOpacity>
                <Icon style={styles.navItem} name="search" size={25} />
              </TouchableOpacity>
              <TouchableOpacity>
              <Icon style={styles.navItem} name="more-vert" size={25} />
              </TouchableOpacity>
            </View>
          </View>

        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>

        
          {/* <Text>Frnds</Text> */}
          <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          <View style={styles.bodyButt}>
          <Text style={styles.profileName}>@{item.username}</Text>
          <Text style={styles.emailName}>{item.email}</Text>
          </View>
        }
          keyExtractor={({id}) => id}
          style={{marginTop: 25}}
        />
        </ScrollView>
        </View>
      );
    }
  }

   const styles = StyleSheet.create({
  
   // defaultColor = '#ED4A4A'
  
    container: {
      flex: 1,
      backgroundColor: '#BC4444',
    },
    navBar: {
      height: 50,
      backgroundColor: '#ED4A4A',
      elevation: 5,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    rightNav: {
      flexDirection: 'row'
    },
    navItem: {
      marginLeft: 25,
      color: 'white',
    },
    noteItem: {
      marginLeft: 10,
      color: 'white',
    },
    postIconItem: {
      marginLeft: 25,
      color: '#ED4A4A',
      alignSelf: 'flex-end', 
    },
    proPicHome: {
      marginLeft: 5,
      height: 50,
      width: 50,
      padding: 20,
      marginTop: 5,
      backgroundColor: 'white',
      borderColor: '#ED4A4A',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      elevation: 5,
    },
    profileName: {
      elevation: 2,
      //fontFamily:'varelaround',
      fontSize: 22,
      alignItems: 'center',
      fontWeight: 'bold',
      color: '#ED4A4A',
      marginLeft: 10,
    },
    emailName: {
      elevation: 2,
      //fontFamily:'varelaround',
      fontSize: 16,
      alignItems: 'center',
      fontWeight: 'bold',
      color: 'grey',
      marginLeft: 10,
    },
    
    body: {
      flex: 1,
      //backgroundColor: '#EFEFEF',
      backgroundColor: '#BC4444',
      
    },
    tabBar: {
      //backgroundColor: 'white',
      backgroundColor: '#ED4A4A',
      height: 50,
      // borderTopWidth: 2,
      //borderColor: '#ED4A4A',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    tabItem: {
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabnavItem: {
      marginLeft: 25,
     // color:  '#ED4A4A',
     color: 'white',
    },
    tabTitle: {
      fontSize: 11,
     
      paddingTop: 4
    },
    bodyButt: {
      width: 350,
      marginLeft: 10,
      minHeight: 100,
      flex: 1,
      padding: 5,
      paddingTop: 5,
      marginTop: 0,
      backgroundColor: 'white',
      margin: 10,
      borderRadius: 10,
      elevation: 2,
    },
    modalButt: {
      width: 200,
      borderColor: 'red',
      borderWidth: 2,
      marginTop: 100,
      marginLeft: 50,
    },
    modalStyle: {
      height: 500,
      width: 375,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20,
      borderRadius: 10,
      marginTop: 100,
      borderWidth: 2,
      borderColor: 'grey',
      elevation: 8,
  
    }
  });