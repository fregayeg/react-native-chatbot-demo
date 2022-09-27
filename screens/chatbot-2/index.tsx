// import React, { Component } from 'react';
// import {
//     Button,
//     View
// } from 'react-native';
// import { Dialogflow_V2 } from 'react-native-dialogflow';
// import {
//     GiftedChat,
//     IMessage,
// } from 'react-native-gifted-chat';
// import Constants from "expo-constants";
// import { RootStackScreenProps } from "../../types";
//
// const dialogflowConfig = Constants.manifest?.extra?.dialogFlowConfig;
//
// // Bot
// const BOT_USER = {
//     _id: 2,
//     name: 'Mr Bot',
//     avatar: 'https://placeimg.com/140/140/any',
// };
//
// // Human
// const USER = {
//     _id: 1,
//     name: 'John Doe',
//     avatar: 'https://placeimg.com/140/140/any',
// };
//
// export default function ChatBotScreens( {navigation}: RootStackScreenProps<'ChatScreen'> ) {
//
//     const [messages, updateMessages] = React.useState<Array<IMessage>>( [] );
//
//     // component did mount
//     React.useEffect( () => {
//
//         Dialogflow_V2.setConfiguration(
//             dialogflowConfig.client_email,
//             dialogflowConfig.private_key,
//             Dialogflow_V2.LANG_ENGLISH_US,
//             dialogflowConfig.project_id,
//         );
//
//         // initial msg
//         updateMessages([
//                 {
//                     "_id": 1,
//                     "text": `Hello, I am Bot!`,
//                     "quickReplies": {
//                         "type": 'radio',
//                         "keepIt": true,
//                         "values": [
//                             {
//                                 "title": 'Word of the day',
//                                 "value": 'Word of the day',
//                             },
//                             {
//                                 "title": 'What is Loan?',
//                                 "value": 'What is Loan?',
//                             },
//                             {
//                                 "title": 'Define interest',
//                                 "value": 'Define interest',
//                             },
//                         ],
//                     },
//                     "createdAt": new Date(),
//                     "user": BOT_USER,
//                 }
//             ])
//     }, [] )
//
//     function onSend(messages: Array<IMessage> = []): void {
//         // console.log(messages);
//         updateMessages((prevMessages: Array<IMessage>) => ( GiftedChat.append(prevMessages, messages)));
//
//         let message = messages[0].text;
//         Dialogflow_V2.requestQuery(
//             message,
//             result => {
//                 // console.log(result);
//                 return handleGoogleResponse(result);
//             },
//             error => console.log(error),
//         );
//     }
//
//     // TODO - check the arg type
//     function handleGoogleResponse(result: any) {
//
//         if (result.queryResult.webhookPayload !== undefined) {
//             let text = result.queryResult.fulfillmentMessages[0].text.text[0];
//             // console.log(result.queryResult.webhookPayload.google.richResponse.items[0].simpleResponse.displayText);
//             let qp = result.queryResult.webhookPayload.google.richResponse.suggestions;
//             let QuickReplies = [qp[0].title, qp[1].title, qp[2].title];
//             // console.log(QuickReplies);
//             sendBotResponse(text, QuickReplies);
//             // console.log('QuickReplies');
//         } else {
//             let text = result.queryResult.fulfillmentMessages[0].text.text[0];
//             sendBotResponse2(text);
//             // if(result.queryResult.webhookPayload != undefined) {
//             //     console.log(result.queryResult.webhookPayload);
//             // }
//             // console.log('no QuickReplies');
//         }
//     }
//
//     function sendBotResponse(text:string, quickReplies: string[]) {
//         if(quickReplies) {
//             let msg: IMessage = {
//                 _id: messages.length + 1,
//                 text: text,
//                 quickReplies: {
//                     type: 'radio',
//                     keepIt: true,
//                     values: [
//                         {
//                             title: quickReplies[0],
//                             value: quickReplies[0],
//                         },
//                         {
//                             title: quickReplies[1],
//                             value: quickReplies[1],
//                         },
//                         {
//                             title: quickReplies[2],
//                             value: quickReplies[2],
//                         },
//                     ],
//                 },
//                 createdAt: new Date(),
//                 user: BOT_USER,
//             };
//
//             updateMessages( previousState => (GiftedChat.append( previousState, [msg] )) );
//         }
//     }
//
//     function sendBotResponse2(text: string) {
//         let msg = {
//             _id: messages.length + 1,
//             text: text,
//             createdAt: new Date(),
//             user: BOT_USER,
//         };
//
//         updateMessages((previousState:Array<IMessage>) => (
//             GiftedChat.append(previousState, [msg])));
//     }
//
//     function  onQuickReply(messages: Array<IMessage> = []) {
//
//         // console.log(messages);
//         messages = [
//             {
//                 _id: messages.length + 1,
//                 // @ts-ignore
//                 text: messages[0].value,
//                 createdAt: new Date(),
//                 user: USER,
//             },
//         ];
//
//         // console.log(messages);
//         updateMessages( previousState => (GiftedChat.append( previousState, messages )) );
//
//         let message = messages[0].text;
//
//         // console.log(message);
//         Dialogflow_V2.requestQuery(
//             message,
//             result => {
//                 // console.log(result);
//                 return handleGoogleResponse(result);
//             },
//             error => console.log(error),
//         );
//     }
//
//     return (
//         <View style={{ flex: 1, backgroundColor: '#fff' }} >
//             <GiftedChat
//                 messages={messages}
//                 onSend={messages => onSend(messages)}
//                 // @ts-ignore
//                 onQuickReply={messagesArg => onQuickReply(messagesArg)}
//                 showAvatarForEveryMessage={false}
//                 showUserAvatar={true}
//                 user={BOT_USER}
//             />
//             <Button
//                 title="talk"
//                 onPress={() => {
//                     Dialogflow_V2.startListening(
//                         result => {
//                             console.log(result);
//                         },
//                         error => {
//                             console.log(error);
//                         },
//                     );
//                 }}
//             />
//         </View>
//     );
// }
