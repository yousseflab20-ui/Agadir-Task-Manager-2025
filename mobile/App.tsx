import HomeScreen from "./src/screen/HomeScreen"
import LoginScreen from "./src/screen/LoginScreen"
import CreerCompt from "./src/screen/CreerCompt"
import TaskList from "./src/screen/TaskList"
import NewTask from "./src/screen/NewTask"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="HomeScreen" >
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreerCompt" component={CreerCompt} options={{ headerShown: false }} />
        <Stack.Screen name="TaskList" component={TaskList} options={{ headerShown: false }} />
        <Stack.Screen name="NewTask" component={NewTask} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
