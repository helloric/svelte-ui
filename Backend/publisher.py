import rospy
from std_msgs.msg import Int8

def publish_emotion(emotion):
    rospy.init_node('emotion_publisher', anonymous=True)
    pub = rospy.Publisher('/robot/emotion', Int8, queue_size=10)
    rate = rospy.Rate(10)
    while not rospy.is_shutdown():
        pub.publish(emotion)
        rate.sleep()

if __name__ == '__main__':
    try:
        # Beispiel für eine Emotion aus CalculateEmotion
        emotion = "happy" 
        publish_emotion(emotion)
    except rospy.ROSInterruptException:
        pass