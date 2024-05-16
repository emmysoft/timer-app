import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const sec = time - mins * 60;
  return { mins: formatNumber(mins), sec: formatNumber(sec) };
}

export default function App() {

  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, sec } = getRemaining(remainingSecs);

  const [task, setTask] = useState("");

  const handleToggle = () => {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
  }

  return (
    <>
      <StatusBar backgroundColor="#07121B" />
      <SafeAreaView style={{ marginTop: Constants.statusBarHeight }}>
        <View style={tw`flex justify-start items-center gap-4 bg-[#07121B] h-full p-24`}>
          <View style={tw`p-2`}>
            <Text style={tw`font-bold text-3xl text-[#fff] bg-[#07121B]`}>Timer App</Text>
          </View>
          <View style={tw`p-4 flex flex-row justify-center items-center gap-3 w-full`}>
            <TextInput
              style={tw`border-[#fff] border-2 rounded-md min-w-full py-4 px-4 text-white`}
              placeholder='Enter new task here...'
              placeholderTextColor={"#fff"}
              onChangeText={(e) => setTask(e)}
              value={task}
            />
            <TouchableOpacity style={tw`py-4 px-6 rounded-md bg-[#ff851b]`} onPress={() => handleToggle()}>
              {isActive ?
                <Text style={tw`text-[#07121b] text-lg font-bold`}>Pause</Text> :
                <Text style={tw`text-[#07121b] text-lg font-bold`}>Start</Text>}
            </TouchableOpacity>
          </View>
          <View style={tw`flex justify-center items-center gap-6 pt-12`}>
            {isActive
              ?
              <Ionicons name='pause' size={70} color='#fff' />
              :
              <Ionicons name='play' size={70} color='#fff' />
            }
            <Text style={tw`text-[#fff] text-5xl font-bold`}>{`${mins}:${sec}`}</Text>
            <View style={tw`p-4`}>
              <TouchableOpacity onPress={() => reset()} style={tw`px-6 py-2 rounded-md border-[#ff851b] border-2 w-full`}>
                <Text style={tw`text-[#ff851b] text-xl font-bold`}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={tw`p-8 min-w-full`}>
            <Text style={tw`text-xl text-[#fff] font-bold text-center`}>Tasks</Text>
            <View style={tw`flex flex-row justify-center items-center gap-12 pt-12`}>
              <Text style={tw`text-white font-bold text-xl`}>Task A</Text>
              <Text style={tw`text-white font-bold text-lg`}>{`${mins}:${sec}`}</Text>
            </View>
            <View style={tw`flex flex-row justify-center items-center gap-12 pt-12`}>
              <Text style={tw`text-white font-bold text-xl`}>Task A</Text>
              <Text style={tw`text-white font-bold text-lg`}>{`${mins}:${sec}`}</Text>
            </View><View style={tw`flex flex-row justify-center items-center gap-12 pt-12`}>
              <Text style={tw`text-white font-bold text-xl`}>Task A</Text>
              <Text style={tw`text-white font-bold text-lg`}>{`${mins}:${sec}`}</Text>
            </View><View style={tw`flex flex-row justify-center items-center gap-12 pt-12`}>
              <Text style={tw`text-white font-bold text-xl`}>Task A</Text>
              <Text style={tw`text-white font-bold text-lg`}>{`${mins}:${sec}`}</Text>
            </View><View style={tw`flex flex-row justify-center items-center gap-12 pt-12`}>
              <Text style={tw`text-white font-bold text-xl`}>Task A</Text>
              <Text style={tw`text-white font-bold text-lg`}>{`${mins}:${sec}`}</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
