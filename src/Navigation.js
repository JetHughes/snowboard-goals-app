import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {View,TouchableOpacity,Text} from 'react-native';
import globalStyles from './styles/GlobalStyles';

import {NavigationContainer,DefaultTheme,DarkTheme} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Home from './screens/home/Home';
import TrickLibrary from './screens/trickLibrary/TrickLibrary';
import TrickLists from './screens/trickLists/TrickLists';
import AddTricks from './screens/trickLists/AddTricks';
import NewListModal from './screens/trickLists/NewListModal';
import ViewList from './screens/trickLists/ViewList';
import NewGoalModal from './screens/goals/NewGoalModal';
import GoalsScreen from './screens/goals/GoalsScreen';
import TrickGenerator from './screens/trickGenerator/TrickGenerator'

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        //primary: 'rgb(0,103,255)',
        primary: 'rgba(18,18,18,0.88)'
    },
};

//#region Trick Generator
const TrickGeneratorStack = createNativeStackNavigator();
function TrickGeneratorStackScreens() {
    return (
        <TrickGeneratorStack.Navigator>
            <TrickGeneratorStack.Screen 
                name='Trick Generator' 
                component={TrickGenerator} 
                initialParams={{type: 'rails'}}
            />
        </TrickGeneratorStack.Navigator>
    )
}

//#endregion

//#region Goals
const GoalsTopTabs = createMaterialTopTabNavigator();
function GoalsTobTabsScreen() {
    return (
        <GoalsTopTabs.Navigator>
            <GoalsTopTabs.Screen name='rails' component={GoalsScreen} initialParams={{type: 'rails'}}/>
            <GoalsTopTabs.Screen name='jumps' component={GoalsScreen} initialParams={{type: 'jumps'}}/>
            <GoalsTopTabs.Screen name='pipe' component={GoalsScreen} initialParams={{type: 'pipe'}}/>
        </GoalsTopTabs.Navigator>
    )
}

const GoalsStack = createNativeStackNavigator();
function GoalsStackScreen() {
    return (
        <GoalsStack.Navigator
            initialRouteName="Goals">            
            <GoalsStack.Screen
                name='Goals'
                component={GoalsTobTabsScreen}
            />
        </GoalsStack.Navigator>
    )
}
//#endregion

//#region TrickLists
const TrickListsStack = createStackNavigator();
function TrickListsStackScreen({navigation, route}) {
    return (
        <TrickListsStack.Navigator
            initialRouteName="Trick Lists"
            headerMode="screen">   
            <TrickListsStack.Screen
                name='Trick Lists'
                component={TrickLists}
                headerMode="screen"   
                options={{
                    headerRight: () => (
                        <View style={{marginRight: 16}}>
                        <TouchableOpacity 
                            hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} 
                            onPress={() => navigation.navigate("Tricks")}
                            style={{marginLeft: 16}}
                        >
                            <Icon name="format-list-bulleted" size={24} />
                        </TouchableOpacity>
                    </View>
                    ),
                }}
            />
            <TrickListsStack.Screen 
                name="View List" 
                component={ViewList}                 
                options={({route}) => ({
                    headerTintColor: "#121212",
                    headerTitleAlign: "left",
                    headerBackTitleVisible: false,
                    cardShadowEnabled:true,
                    ...TransitionPresets.SlideFromRightIOS, 
                    title: route.params.trickList.name,
                })}
            />
            <TrickListsStack.Screen 
                name="Add Tricks"
                component={AddTricks}                
            />
        </TrickListsStack.Navigator>
    )
}

//#endregion

//#region Trick Library
const TrickLibraryStack = createNativeStackNavigator();
function TrickLibraryStackScreen() {
    return(
        <TrickLibraryStack.Navigator
            initialRouteName="TrickLibrary">            
            <TrickLibraryStack.Screen
                name='TrickLibrary'
                component={TrickLibraryTopTabsScreen} 
                options={{
                }} 
            />
        </TrickLibraryStack.Navigator>
    )
}

const TrickLibraryTopTabs = createMaterialTopTabNavigator();
function TrickLibraryTopTabsScreen() {
    return(
        <TrickLibraryTopTabs.Navigator
            initialRouteName="RailsTricks" >
            <TrickLibraryTopTabs.Screen name='Rails' component={TrickLibrary} initialParams={{type: "rails"}}/>
            <TrickLibraryTopTabs.Screen name='Jumps' component={TrickLibrary} initialParams={{type: "jumps"}}/>
            <TrickLibraryTopTabs.Screen name='Pipe' component={TrickLibrary} initialParams={{type: "pipe"}}/>
        </TrickLibraryTopTabs.Navigator>
    )

}
//#endregion

//#region Home
const HomeStack = createNativeStackNavigator();
function HomeStackScreen({ navigation }) {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
        >            
            <HomeStack.Screen                
                name='Home'
                component={Home}          
            />
        </HomeStack.Navigator>
    )
}

//#endregion

//#region Main
const MainBottomTabs = createMaterialBottomTabNavigator();
function MainBottomTabScreens() {
    return (
        <MainBottomTabs.Navigator
            initialRouteName="HomeStack"
            activeColor="#fff"                        
            barStyle={{
                backgroundColor: "#121212",                
            }}

            screenOptions={({ route }) => ({
                tabBarIcon: ({color }) => {
                    let iconName;    
                    if (route.name === 'HomeStack') {
                        iconName = 'home';
                    } else if (route.name === 'GoalsStack') {
                        iconName = 'target';
                    } else if (route.name === 'TrickListsStack') {
                        iconName = 'playlist-check';
                    } else if (route.name === 'TrickLibraryStack') {
                        iconName = 'library-shelves';
                    } else if (route.name === 'TrickGeneratorStack') {
                        iconName = 'crystal-ball'
                    }
                    return <Icon name={iconName} size={24} color={color} />;
                },
            })}
        >
            <MainBottomTabs.Screen
                name="HomeStack"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                }}
            />
            <MainBottomTabs.Screen
                name="GoalsStack"
                component={GoalsStackScreen}
                options={{
                    tabBarLabel: 'Goals',
                }}
            />
            <MainBottomTabs.Screen
                name="TrickListsStack"
                component={TrickListsStackScreen}
                options={{
                    tabBarLabel: 'Trick Lists',
                }}
            />
            <MainBottomTabs.Screen
                name="TrickLibraryStack"
                component={TrickLibraryStackScreen}
                options={{
                    tabBarLabel: 'Trick Library',
                }}                
            />
            <MainBottomTabs.Screen
                name="TrickGeneratorStack"
                component={TrickGeneratorStackScreens}
                options={{
                    tabBarLabel: 'Generator',
                }}                
            />

        </MainBottomTabs.Navigator>
    )
}
//#endregion

const ModalStack = createNativeStackNavigator();
function HomeApp(props) {
    return(
        <NavigationContainer theme={MyTheme}>
        <ModalStack.Navigator
          initialRouteName="TrickGeneratorStack"
          screenOptions={() => ({
            headerShown: false,
            gestureEnabled: true,
            stackPresentation: "transparentModal"
          })}
          mode="modal"
          headerMode="none"
        >                   
          <ModalStack.Screen name="Main" component={MainBottomTabScreens} initialParams={props.goalsData, props.tricksData, props.trickListsData}/>
          <ModalStack.Screen name="NewListModal" component={NewListModal}/>
          <ModalStack.Screen name="NewGoalModal" component={NewGoalModal} />
        </ModalStack.Navigator>
        </NavigationContainer>
    )
}

export default HomeApp;