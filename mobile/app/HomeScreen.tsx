import { Button, Text, View } from "react-native";

export default function HomeScreen(props: any) {
    console.log(props)
    return (
        <View>
            <Text>hello</Text>
            <Button
                title="Go to Index"
                onPress={() => props.navigation.navigate("Index")}
            />
        </View>
    );
}
