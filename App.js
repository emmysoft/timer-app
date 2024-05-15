import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
// import tw from 'twrnc';
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
      <View style={tw`flex justify-center items-center gap-4 bg-[#07121B] h-full pt-24`}>
        <View style={tw`bottom-72 right-28`}>
          <Text style={tw`font-bold text-3xl text-[#fff] bg-[#07121B]`}>Timer App</Text>
        </View>
        <View style={tw`flex justify-center items-center gap-6`}>
          {isActive
            ?
            <Ionicons name='pause' size={70} color='#fff' />
            :
            <Ionicons name='play' size={70} color='#fff' />
          }
          <Text style={tw`text-[#fff] text-xl font-bold`}>{`${mins}:${sec}`}</Text>
          <View style={tw`flex flex-row justify-center items-center gap-5`}>
            <TouchableOpacity onPress={() => handleToggle()} style={tw`p-2 rounded-md border-[#fff] border-2`}>
              {isActive ? <Text style={tw`text-[#fff] text-xl font-bold`}>Pause</Text> : <Text style={tw`text-[#fff] text-xl font-bold`}>Start</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => reset()} style={tw`p-2 rounded-md border-[#ff851b] border-2`}>
              <Text style={tw`text-[#ff851b] text-xl font-bold`}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </>
  );
}
