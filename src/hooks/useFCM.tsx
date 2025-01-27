import { useEffect, useState } from "react";
import { MessagePayload, onMessage } from "firebase/messaging";
import useFCMToken from "./useFCMToken";
import { messaging } from "#src/utils/firebase";

const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const fcmmessaging = messaging();
      const unsubscribe = onMessage(fcmmessaging, (payload) => {
        console.log("notificationWorker",payload.notification?.title)
        setMessages((messages) => [...messages, payload]);
      });
      return () => unsubscribe();
    }
  }, [fcmToken]);
  return { fcmToken, messages };
};

export default useFCM;