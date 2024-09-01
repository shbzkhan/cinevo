import {Account, Client, ID, Databases, Avatars } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aora",
  projectId: "66d33ae9001d097140f8",
  databaseId: "66d33e8000342f09ddfe",
  userCollectionId: "66d33eed00028b47662c",
  videoCollectionId: "66d33f24002f9336f3fa",
  storageId: "66d343dc0002051d16cd",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async(email, password, username) => {
 try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )

    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
    )

    return newUser
 } catch (error) {
    console.log(error)
    throw new Error(error)
 }
};


export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
    
}