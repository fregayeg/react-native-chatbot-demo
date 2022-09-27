// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Keyboard,
//   FlatList,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import { Icon } from 'react-native-elements';
// import { 
//   RootStackScreenProps
// } from ".../../../types";
// import { staticMessages } from "./data";
//
// function getTime(date:Date) {
//   var hours = date.getHours();
//   var minutes: string | number = date.getMinutes();
//   var ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12;
//   minutes = minutes < 10 ? '0' + minutes : minutes;
//   var strTime = hours + ':' + minutes + ' ' + ampm;
//   return strTime;
// }
//
//
// export default function ChatScreen({ navigation }: RootStackScreenProps<'ChatScreen'>)  {
// 
//   const [chatUser] = React.useState({
//     name: 'My bot',
//     profileImage: 'https://freesvg.org/img/1538298822.png',
//     lastSeen: 'online',
//   });
//
//   const [currentUser] = React.useState<{name: 'currentUser'|'bot'}>({
//     name: 'currentUser',
//   });
//
//   const [messages, setMessages] = React.useState<object[]>(staticMessages);
//
//   const [inputTextMsg, setInputTextMsg] = React.useState<string>('');
//  
//   function sendMessage() {
//    
//     if (inputTextMsg === '') {
//       return setInputTextMsg('');
//     }
//    
//     let t = getTime(new Date());
//    
//     setMessages([
//       ...messages,
//       {
//         sender: currentUser.name,
//         message: inputTextMsg,
//         time: t,
//       },
//     ]);
//    
//     setInputTextMsg('');
//   }
//
//   /** navigation screen header effect **/
//   React.useEffect(() => {
//     navigation.setOptions({
//       title: '',
//       headerLeft: () => (
//         <View style={styles.headerLeft}>
//           <TouchableOpacity
//             style={{ paddingRight: 10 }}
//             onPress={() => {
//               navigation.goBack();
//             }}
//           >
//             <Icon
//               tvParallaxProperties={undefined}
//               name='angle-left'
//               type='font-awesome'
//               size={30}
//               color='#fff'
//             />
//           </TouchableOpacity>
//           <Image
//             style={styles.userProfileImage}
//             source={{ uri: chatUser.profileImage }}
//           />
//           <View
//             style={{
//               paddingLeft: 10,
//               justifyContent: 'center',
//             }}
//           >
//             <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
//               {chatUser.name}
//             </Text>
//             <Text style={{ color: '#fff', fontWeight: '300' }}>
//               {chatUser.lastSeen}
//             </Text>
//           </View>
//         </View>
//       ),
//       headerRight: () => (
//         <TouchableOpacity
//           style={{ paddingRight: 10 }}
//           onPress={() => {
//             Alert.alert('Audio Call', 'Audio Call Button Pressed');
//           }}
//         >
//           <Icon tvParallaxProperties={undefined} name='call' size={28} color='#fff' />
//         </TouchableOpacity>
//       ),
//     });
//   }, []);
//
//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       <View style={styles.container}>
//         <FlatList
//           style={{ backgroundColor: '#d0e7d4' }}
//           inverted={true}
//           data={JSON.parse(JSON.stringify(messages)).reverse()}
//           renderItem={({ item }) => (
//             <TouchableWithoutFeedback>
//               <View style={{ marginVertical: 10 }}>
//                 <View
//                   style={{
//                     maxWidth: Dimensions.get('screen').width * 0.8,
//                     backgroundColor: '#14b0b0',
//                     alignSelf:
//                       item.sender === currentUser.name
//                         ? 'flex-end'
//                         : 'flex-start',
//                     marginHorizontal: 10,
//                     padding: 10,
//                     borderRadius: 8,
//                     borderBottomLeftRadius:
//                       item.sender === currentUser.name ? 8 : 0,
//                     borderBottomRightRadius:
//                       item.sender === currentUser.name ? 0 : 8,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: '#fff',
//                       fontSize: 16,
//                     }}
//                   >
//                     {item.message}
//                   </Text>
//                   <Text
//                     style={{
//                       color: '#dfe4ea',
//                       fontSize: 14,
//                       alignSelf: 'flex-end',
//                     }}
//                   >
//                     {item.time}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           )}
//         />
//
//         <View style={{ paddingVertical: 10 }}>
//           <View style={styles.messageInputView}>
//             <TextInput
//               defaultValue={inputTextMsg}
//               style={styles.messageInput}
//               placeholder='Message'
//               onChangeText={(text) => setInputTextMsg(text)}
//               onSubmitEditing={() => {
//                 sendMessage();
//               }}
//             />
//             <TouchableOpacity
//               style={styles.messageSendView}
//               onPress={() => {
//                 sendMessage();
//               }}
//             >
//               <Icon tvParallaxProperties={undefined} name='send' type='material' />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }
//
// export const styles = StyleSheet.create({
//   headerLeft: {
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2ff',
//   },
//   messageInputView: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginHorizontal: 14,
//     backgroundColor: '#fff',
//     borderRadius: 4,
//   },
//   messageInput: {
//     height: 40,
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   messageSendView: {
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//   },
// });
