import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screen/HomeScreen";
import LoginScreen from "./src/screen/LoginScreen";
import CreerCompt from "./src/screen/CreerCompt";
import TaskList from "./src/screen/TaskList";
import NewTask from "./src/screen/NewTask";
import { Dashboard } from "./src/screen/Dashboard";

import { TaskProvider } from "./src/context/TaskContext"; // ✅ مهم

const Stack = createNativeStackNavigator();

function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreerCompt" component={CreerCompt} options={{ headerShown: false }} />
          <Stack.Screen name="TaskList" component={TaskList} options={{ headerShown: false }} />
          <Stack.Screen name="NewTask" component={NewTask} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}

export default App;
