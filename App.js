import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [tasks, setTasks] = useState([]);
  const [checkTasks, setCheckTasks] = useState(true);

  const handleTime = () => {
    setIsActive(!isActive);
    setCheckTasks(false);
  }

  const handleAddTasks = () => {
    setTasks((currentTasks) => {
      return [...currentTasks, task]
    })
    setIsActive(!isActive)
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
          <View style={tw`px-12 flex justify-center items-center gap-6`}>
            <TextInput
              style={tw`border-[#fff] border-2 rounded-md w-full py-4 px-12 text-white`}
              placeholder='Enter new task here...'
              placeholderTextColor={"#fff"}
              onChangeText={(e) => setTask(e)}
              value={task}
            />
            <View style={tw`flex flex-row justify-center items-center gap-5 p-2`}>
              <TouchableOpacity style={tw`py-4 px-6 rounded-md bg-[#ff851b]`} onPress={handleTime}>
                {isActive ?
                  <Text style={tw`text-[#07121b] text-lg font-bold`}>Pause</Text>
                  :
                  <Text style={tw`text-[#07121b] text-lg font-bold`}>Start</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity style={tw`py-4 px-6 rounded-md bg-[#ff851b]`} onPress={handleAddTasks}>
                <Ionicons name='add-outline' size={24} color='#07121b' />
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`flex flex-col justify-center items-center gap-6 pt-5`}>
            <Text style={tw`text-3xl text-[#fff] font-bold text-center`}>Tasks</Text>
            <View style={tw`min-w-full`}>
              {checkTasks
                ?
                <Text style={tw`text-sm text-[#ff851b] text-center`}>No tasks yet!</Text>
                :
                <FlatList
                  data={tasks}
                  renderItem={(itemData) => (
                    <View style={tw`flex flex-row justify-center items-center gap-12`}>
                      <Text style={tw`text-white font-bold text-xl`}>{itemData.item}</Text>
                      <Text style={tw`text-white font-bold text-lg`}>{`${mins}:${sec}`}</Text>
                      <View style={tw`flex flex-row justify-center items-center gap-2`}>
                        <Ionicons name='trash' size={20} color='#ff851b' onPress={() => setCheckTasks(true)} />
                        <Ionicons name='refresh-outline' size={20} color='#ff851b' onPress={reset} />
                        {isActive
                          ?
                          <Ionicons name="pause" size={20} color={'#ff851b'} onPress={handleTime} />
                          :
                          <Ionicons name="play" size={30} color={'#ff851b'} onPress={handleTime} />
                        }
                      </View>
                    </View>
                  )}
                  // keyExtractor={(item, index) => index.toString()}
                  alwaysBounceVertical={false}
                />
              }
            </View>
          </View>
        </View>
      </SafeAreaView >
    </>
  );
}
