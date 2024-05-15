import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
// import tw from 'twrnc';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <>
      <View className={tw`flex-1 justify-center items-center gap-4 bg-white`}>
        <Ionicons name='play' size={70} color='black'/>
        <Text className={tw`text-[#ff0000] text-lg dark:text-white`}>Start</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}