import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { useGlobalContext } from "../../context/GlobalProvider";
import axios from "axios";
import { router } from "expo-router";
import Loader from "../../components/Loader";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    description: "",
  });

  const openPicker = async (SelectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        SelectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (SelectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
        console.log("thumbnail uploaded");
      }

      if (SelectType === "video") {
        setForm({ ...form, video: result.assets[0] });
        console.log("video uploaded");
      }
    }
  };

  const submit = async () => {
    // setLoading()
    if (!form.description || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Please fill in all the field ");
    }
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("video", {
        uri: form.video.uri,
        name: `video.${Date.now()}`,
        type: "video/mp4",
      });

      formData.append("thumbnail", {
        uri: form.thumbnail.uri,
        name: `thumbnail.${Date.now()}`,
        type: "image/jpeg",
      });
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("userId", user._id);
      // console.log("user id ", user._id)

      await axios.post(`${process.env.EXPO_PUBLIC_MONGODB}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/home");
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Video uploaded successfully please refresh page",
          ToastAndroid.SHORT
        );
      } else {
        Alert.alert(
          "Upload failed",
          "Video uploaded successfully please refresh page"
        );
      }
    } catch (error) {
      console.log("upload error", error);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };
  console.log("user_id!!!", user._id);
  return (
    <>
    <SafeAreaView className="bg-white h-full dark:bg-black">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-black font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title"
          handleChangerText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-7">
          <Text className=" text-base text-black font-pmedium dark:text-white">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 rounded-2xl justify-center items-center border border-gray-300 dark:border-gray-600">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className=" text-base text-black font-pmedium dark:text-white">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 px-4  rounded-2xl justify-center items-center border border-gray-200 focus:border-gray-600 flex-row space-x-2 dark:border-gray-600">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-sm text-gray-600 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Description"
          value={form.description}
          placeholder="Give your video a description"
          handleChangerText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
    {uploading && <Loader title="Video uploading..." />}
    </>
  );
};

export default Create;
