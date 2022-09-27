import React from 'react';
import {
  StyleSheet,
  Platform,
  Image
} from 'react-native';
import {
  GiftedChat,
  IMessage,
  User,
  Reply,
  Message,
  Bubble,
} from 'react-native-gifted-chat';
import { RootStackScreenProps } from "../../types";
import messagesData from "./messages";
import { List } from "react-native-paper";

interface IChatState {
  stepIndex: number,
  inverted: boolean,
  messages: Array<IMessage>,
  botIsTyping: boolean
}

const findStep = (step: number) => (message: IMessage) => message._id === step;

const filterBotMessages = (message: IMessage) =>
  !message.system
  && message.user
  && message.user._id
  && message.user._id === 1;

export default function ChatBotDemo( {navigation}: RootStackScreenProps<'ChatScreen'> ){

  /** Users **/
  const botUserAvatarUri:string = "https://e7.pngegg.com/pngimages/498/917/png-clipart-computer-icons-desktop-chatbot-icon-blue-angle.png";
    
  // const botUser : User = {
  //   _id: 1,
  //   name: 'Bot',
  //   avatar: botUserAvatarUri
  // }
  
  // FRE - TODO - use insured real data 
  const insuredUser : User = {
    _id: 2,
    name: 'Insured',
  }

  const [chatState, setChatState] = React.useState<IChatState>({
    stepIndex: 0,
    inverted: false,
    messages: [],
    botIsTyping: false
  })

  // component did mount effect
  React.useEffect(() => {

    setChatState({
      ...chatState,
      // messagesData.filter(message => message.system),
      messages: [messagesData[0]],
    });

  },[])

  // send msg handler
  const onSendMsg = (messages:Array<IMessage> = []) => {

    let { stepIndex } = chatState;

    stepIndex++;

    setChatState((previousState: IChatState) => {

      const sentMessages: Array<IMessage> = [
        {
          ...messages[0],
          sent: true,
          received: true
        }
      ];

      return {
        ...previousState,
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        ),
        stepIndex,
      }
    })
  }

  // bot send msg handler
  const botSend = (step: number = 0) => {
    
    const newMessage = (messagesData as IMessage[])
    .reverse()
    .filter(filterBotMessages)
    .find(findStep(step))

    if (newMessage) {
      setChatState((previousState) => ({
        ...previousState,
        messages: GiftedChat.append(
          previousState.messages,
          [newMessage],
          Platform.OS !== 'web',
        ),
        botIsTyping: false
      }))
    }
  }

  // FRE - TODO - check how to parse text for url, phone and mail.
  // const parsePatterns = (_linkStyle: any) => {
  //   const commonStyle = {
  //     textDecorationLine: "underline", 
  //     color: '#15ec65'
  //   };
  //  
  //   return [
  //     {
  //       pattern: /#(\w+)/,
  //       style: commonStyle,
  //       onPress: (s: string) => Linking.openURL(`url:${s}`),
  //       _linkStyle,
  //     },
  //     {
  //       type: 'phone',
  //       pattern: /#\+((\d|-){15})/,
  //       style: commonStyle,
  //       onPress: (s: string) => Linking.openURL(`tel:${s}`),
  //       _linkStyle,
  //     },
  //   ]
  // }

  // 
  const onQuickReply = (replies: Array<Reply>) => {

    setChatState({
      ...chatState,
      botIsTyping: true
    });
    
    const createdAt = new Date();
    
    const repliesHasOneItem: boolean = replies.length === 1;
    const repliesHasMoreThanItem: boolean = replies.length > 1;

    if (repliesHasOneItem) {

      // FRE - TODO - send the msg to backend
      onSendMsg([
        {
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user: insuredUser,
          createdAt,
        }
      ]);
      setTimeout(() =>
          botSend(replies[0].messageId),
        1200);
    }
    else {
      console.warn('replies param is not set correctly')
    }
  }

  return (
      <GiftedChat
        user={insuredUser}
        messages={chatState.messages}
        scrollToBottom={true}
        quickReplyTextStyle={{
          fontWeight: '200',
        }}
        inverted={Platform.OS !== 'web'}
        isTyping={chatState.botIsTyping}
        alignTop={true}
        messagesContainerStyle={{ height:"100%", backgroundColor:"#cae5ef" }}
        // timeTextStyle={{
        //   left: { color: 'red' },
        //   right: { color: 'yellow' }
        // }}
        // infiniteScroll={false}
        onSend={onSendMsg}
        // parsePatterns={parsePatterns}
        onQuickReply={onQuickReply}
        quickReplyStyle={{flexDirection:"column",borderRadius: 2, backgroundColor:"#d59494"}}
        renderQuickReplies={(quickReplies) => {
          
          if(!quickReplies.nextMessage?.received) {
            const replies: Reply[] | undefined = quickReplies.currentMessage?.quickReplies?.values;

            if (replies) {

              return replies.map((q, idx) => (
                <List.Item
                  key={q.value}
                  onPress={() => onQuickReply([q])}
                  style={{
                    width: "90%",
                    backgroundColor: "transparent",
                    borderRadius: 10,
                    borderWidth: 1,
                    marginTop: 10,
                  }}
                  title={q.title}
                  titleStyle={{
                    color: "black",
                    bottom: "50%",
                    left: "2%",
                  }}
                />
              ))
            }
          }
        }}
        renderAvatarOnTop={true}
        renderAvatar={()=> {
          return (
            <Image 
            width={50} 
            height={50} 
            source={{uri:botUserAvatarUri}} 
            defaultSource={{uri: botUserAvatarUri}}
            style={{width:40, height: 40, backgroundColor:"transparent"}}
            />)
        }}
        renderInputToolbar={ () => null }
        renderMessage={(m) => (
          <Message {...m} />
        )}
        renderBubble={(b) => (
          <Bubble {...b} renderTicks={()=>null}/>
        )}
      />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 , height: "100%"},
})
