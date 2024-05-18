import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
// import { SymbolView } from 'expo-symbols';

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

  const handleToggle = () => {
    setIsActive(!isActive);
    // console.log(task);
    setCheckTasks(false);
    setTasks((currentTasks) => {
      return [...currentTasks, task];
    });
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
            <View style={tw`flex flex-row justify-center items-center gap-5`}>
              <TouchableOpacity style={tw`py-4 px-6 rounded-md bg-[#ff851b]`} onPress={() => handleToggle()}>
                {isActive ?
                  <Text style={tw`text-[#07121b] text-lg font-bold`}>Pause</Text>
                  :
                  <Text style={tw`text-[#07121b] text-lg font-bold`}>Start</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity style={tw`py-4 px-6 rounded-md bg-[#ff851b]`} onPress={reset}>
                <Ionicons name='add' size={24} color='#07121b' />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={tw`text-xl text-[#fff] font-bold text-center`}>Tasks</Text>
          {checkTasks
            ?
            <Text style={tw`text-xl text-[#ff851b] font-bold text-center`}>No tasks yet!</Text>
            :
            <View style={tw`flex flex-col justify-center items-center gap-5`}>
              {tasks.map((goal, index) => (
                <View style={tw`flex flex-row justify-center items-center gap-12 w-full`}>
                  <Text key={index.toString()} style={tw`text-white font-bold text-xl`}>{goal}</Text>
                  <Text style={tw`text-white font-bold text-lg`}>{`${mins}:${sec}`}</Text>
                  <View style={tw`flex flex-row justify-center items-center gap-2`}>
                    <Ionicons name='trash' size={20} color='#ff851b' onPress={() => setCheckTasks(true)} />
                    <Ionicons name='refresh-outline' size={20} color='#ff851b' onPress={reset} />
                    {isActive
                      ?
                      <Ionicons name="pause" size={20} color={'#ff851b'} onPress={handleToggle} />
                      :
                      <Ionicons name="play" size={30} color={'#ff851b'} onPress={handleToggle} />
                    }
                  </View>
                </View>
              ))}
            </View>
          }
        </View>
      </SafeAreaView>
    </>
  );
}
