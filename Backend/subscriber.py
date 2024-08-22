import rospy
from std_msgs.msg import Bool

def callback(data):
    is_speaking = data.data
    if is_speaking:
        print("Now talking")
        # Animation start
    else:
        print("Der Roboter spricht nicht.")

def speaking_status_listener():
    rospy.init_node('speaking_status_listener', anonymous=True)
    rospy.Subscriber('/robot/speaking_status', Bool, callback)
    rospy.spin()

if __name__ == '__main__':
    speaking_status_listener()