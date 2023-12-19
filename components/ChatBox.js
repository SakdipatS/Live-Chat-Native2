import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import moment from "moment";
import iconMore from "../assets/iconMore.png";
import iconBack from "../assets/iconBack.png";
import emoji from "../assets/emoji.png";
import image from "../assets/image.png";
import iconsend from "../assets/iconsend.png";
import { useSocket } from "./SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/Reducer";

const screenWidth =Dimensions.get('window').width;

export default function ChatBox() {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null);
  const [text, setText] = useState("");
  const register = useSelector(selectUser);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked((value) => !value);

  useEffect(() => {
    if (socket) {
      console.log("Socket is connected:", socket.connected);

      socket.on("connect", () => {
        console.log("Socket connected");
        socket.on("messageFormServer", (data) => {
          postChat(data.data);
        });
      });
    } else {
      console.log("Socket is not available");
    }
  }, [socket]);

  const postChat = (data) => {
    const { message, sender } = data;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: message.text,
        sender,
        date: message.date,
      },
    ]);
  };

  const sendMessage = () => {
    if (text !== "") {
      socket.emit("messageToServer", { text }, (data) => {
        setText("");
        console.log("text send to socket " + text);
      });
    }
  };

  useEffect(() => {
    chatWindowRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={chatWindowRef}
        style={styles.chatbox}
        onContentSizeChange={() =>
          chatWindowRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg, index) => (
          <View style={styles.contentMessage} key={index}>
            {index === 0 ||
            moment(messages[index - 1].date).format("YYYY-MM-DD HH:mm") !==
              moment(msg.date).format("YYYY-MM-DD HH:mm") ? (
              <Text style={styles.postTime}>
                {moment(msg.date).format("YYYY-MM-DD HH:mm")}
              </Text>
            ) : null}
            <View
              style={[
                styles.msgContainer,
                {
                  flexDirection:
                    register.username === msg.sender.username
                      ? "row-reverse"
                      : "row",
                },
              ]}
            >
              <Image
                style={styles.userImg}
                source={{ uri: msg.sender.avatar }}
              />
              <View
                style={[
                  styles.msgBox,
                  {
                    backgroundColor:
                      register.username === msg.sender.username
                        ? "#1F3740"
                        : "#293032",
                  },
                ]}
              >
                <View style={styles.flr}>
                  <View style={styles.messages}>
                    <Text
                      style={styles.msg}
                    >
                      {msg.message}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatInput}>
        {!checked ? (
          <View style={styles.check}>
            <TouchableOpacity onPress={toggleChecked}>
              <Image source={iconMore} style={styles.more} />
            </TouchableOpacity>
            <TextInput
              style={styles.messageInput}
              placeholder="Your message here..."
              placeholderTextColor="#909394"
              value={text}
              onChangeText={(newText) => setText(newText)}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Image source={iconsend} style={styles.iconSubmit} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.fileMobile}>
            <TouchableOpacity onPress={toggleChecked}>
              <Image source={iconBack} style={styles.iconBack} />
            </TouchableOpacity>
            <Image source={emoji} style={styles.emojiMobile} />
            <TouchableOpacity>
              <Image source={image} style={styles.iconImageMobile} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  chatbox: {
    flex: 1,
    backgroundColor: "#171B1C",
  },
  fileMobile: {
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  check: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatInput: {
    height: 52,
    backgroundColor: "#30383B",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  iconBack: {
    height: 20,
    width: 20,
  },
  emojiMobile: {
    height: 25,
    width: 25,
  },
  iconImageMobile: {
    height: 25,
    width: 25,
  },
  iconSubmit: {
    height: 18,
    width: 18,
  },
  messageInput: {
    width: "80%",
    color: "#FFFFFF",
  },
  contentMessage: {
    backgroundColor: "transparent",
  },
  postTime: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    color: "#909394",
    backgroundColor: "transparent",
  },
  msgContainer: {
    position: "relative",
    display: "flex",
    width: "100%",
    margin: 0,
    backgroundColor: "transparent",
  },
  userImg: {
    display: "flex",
    borderRadius: 50,
    height: 40,
    width: 40,
    backgroundColor: "#2671ff",
    margin: 10,
  },
  msgBox: {
    margin: 10,
    borderRadius: 8,
    maxWidth: 0.65* screenWidth,
  },
  flr: {
    flex: 1,
    display: "flex",
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },
  messages: {
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: "transparent",
  },
  msg: {
    display: "flex",
    backgroundColor: "transparent",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    margin: 5,
    alignSelf: "auto",
    fontWeight: "400",
    overflow: "hidden",
  },
});
