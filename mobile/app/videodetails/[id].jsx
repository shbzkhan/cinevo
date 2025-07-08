import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useGlobalContext } from "../../context/GlobalProvider";
import Loader from "../../components/Loader";

const VideoDetails = () => {
  const [video, setVideo] = useState(null);
  const [videoSource, setVideoSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  // const {loading, setLoading}= useGlobalContext()
  const { id } = useLocalSearchParams();
  console.log("user id", user._id);

  const getVideoById = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_MONGODB}/videos/${id}`
      );
      setVideo(data.video);
      setVideoSource(data.video.videoUrl);
    } catch (error) {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };
  // console.log("VVVVIDEO",video)
  
  const deleteVideo = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.EXPO_PUBLIC_MONGODB}/videos/delete/${id}`,
        {
          data: {
            userId: user._id,
          },
        }
      );
      console.log("video deleted");
      if (data.success) {
        Alert.alert("Successfully", "Post deleted, please refresh the page");
        router.back();
      }
    } catch (error) {
      console.log(error.response.data.message);
      Alert.alert("Error", error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAlert = () => {
    Alert.alert("Delete", "You want to delete the post", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: deleteVideo,
        style: "destructive",
      },
    ]);
  };

  console.log("fetch video via id", video);
  useEffect(() => {
    getVideoById();
  }, [id]);

  const player = useVideoPlayer(videoSource, (player) => {});
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  console.log("Data fetch By id ", video);

  return (
    <>
    <SafeAreaView className="bg-white h-full dark:bg-black">
      <VideoView
        player={player}
        className="w-full h-60"
        allowsFullscreen
        allowsVideoFrameAnalysis
        allowsPictureInPicture
      />
      <ScrollView className="p-2">
        <Text className="text-black font-psemibold text-xl dark:text-white">
          {video.title}
        </Text>
        <Text className=" font-pregular size-md mt-2 dark:text-gray-300">
          {video.description}
        </Text>
        <View className="flex flex-row items-center justify-between mt-3 px-2">
          <View className="flex flex-row items-center gap-1">
            <View className="bg-gray-200 h-11 w-11 rounded-full overflow-hidden">
              <Image
                source={{ uri: video.user.image }}
                className="w-11 h-11"
                resizeMode="cover"
              />
            </View>

            <Text className="font-psemibold dark:text-white">
              {video.user.username}
            </Text>
          </View>
          <TouchableOpacity
            onPress={deleteAlert}
            className="px-4  py-1 rounded-md border-2 border-red-500"
          >
            <Text className="text-red-500 font-pmedium">Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
      {/* loader */}
      {isLoading && <Loader title="Video deleting.." />}
    </>
  );
};

export default VideoDetails;
