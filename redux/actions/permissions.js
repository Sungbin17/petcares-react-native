import { RNS3 } from "react-native-s3-upload";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const s3Options = {
  keyPrefix: "uploads/",
  bucket: "wecare-dj2odi1",
  region: "ap-northeast-2",
  accessKey: "AKIA555HF2SWRFVEYNWL",
  secretKey: "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",
  successActionStatus: 201
};

const getUniqueIdByDate = () => {
  let date = new Date();
  let components = [
    date.getYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ];

  let id = components.join("");
  return id;
};

// export const getCameraRollPermission = async () => {
//   console.log('getCameraRollPermission');
//   let status = 'granted';
//   if (Platform.OS === 'ios') {
//     check(PERMISSIONS.IOS.PHOTO_LIBRARY)
//       .then(result => {
//         switch (result) {
//           case RESULTS.GRANTED:
//             console.log('The permission is granted');
//             break;

//           default:
//             Linking.openURL('app-settings:');
//             break;
//         }
//       })
//       .catch(error => {
//         Linking.openURL('app-settings:');
//       });
//   }
//   return status;
// };

const uploadImageToS3 = async image => {
  const imageFile = {
    uri: image.uri,
    name: getUniqueIdByDate(),
    type: image.type
  };
  let response;
  response = await RNS3.put(imageFile, s3Options).then(response => {
    if (response.status !== 201) {
      console.log("Failed to upload image to S3");
      return "failed";
    } else {
      return response.body.postResponse;
    }
  });

  return response;
};

export const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
};

export const pickImage = async () => {
  // await this.getPermissionAsync();
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.2,
  });
  console.log("resultresultresultresultresultresult");
  let image = await uploadImageToS3(result);
  console.log(image);
  return image;
  // return result;
};
