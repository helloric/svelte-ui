import { emotionsNumber } from "$lib/router";

const ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });
  
  const emotionTopic = new ROSLIB.Topic({
    ros : ros,
    name : '/robot/emotion',
    messageType : 'std_msgs/String'
  });
  
  function sendEmotion(emotionsNumber) {
    const emotionMsg = new ROSLIB.Message({
      data : emotionsNumber
    });
    emotionTopic.publish(emotionMsg);
  }
  
  // Beispiel
  sendEmotion(1);