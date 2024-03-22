import firestore from "@react-native-firebase/firestore";


export const specificData = async (name) => {
  const data = await  firestore().collection("fooditems").where("category","==",name).get()
  const items = [] ;
  data.forEach(item => items.push(item.data())) ;
  return items;
}


export const getAllData = async () => {
    const data = await firestore().collection("fooditems").get() ;
    const items = [] ;
    data.forEach(item => items.push(item.data())) ;
    return items ;
}