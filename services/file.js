import * as FileSystem from "expo-file-system";

export const checkAndCreateFolder = async folderPath => {
  const path = `${FileSystem.cacheDirectory}${folderPath}`;
  const folderInfo = await FileSystem.getInfoAsync(path);

  if (!folderInfo.exists) {
    try {
      await FileSystem.makeDirectoryAsync(path, {
        intermediates: true
      });
      return Promise.resolve();
    } catch (error) {
      const newFolderInfo = await FileSystem.getInfoAsync(path);
      const debug = `checkAndCreateFolder: ${
        error.message
      } old:${JSON.stringify(folderInfo)} new:${JSON.stringify(newFolderInfo)}`;
      return Promise.reject(debug);
    }
  }
  return Promise.resolve();
};

export const movePhoto = (uri, folderPath, nameFile) => {
  return checkAndCreateFolder(folderPath).then(() => {
    return FileSystem.moveAsync({
      from: uri,
      to: `${FileSystem.cacheDirectory}${folderPath}/${nameFile}`
    }).catch(err => console.log(err));
  });
};

export const getPhoto = path => {
  return FileSystem.getInfoAsync(FileSystem.cacheDirectory + path);
};

export const deletePhoto = path => {
  return FileSystem.deleteAsync(path);
};
