import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';

const Stack = createStackNavigator();

export default class StackNavigator extends Component {
    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="App" 
                        component={App} 
                        options={{ 
                            title: '',
                            headerStyle: {
                                backgroundColor: '#2D363D',
                            },
                            headerTintColor: '#fff'
                        }}
                        initialParams={{
                            page: 'inicial'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}