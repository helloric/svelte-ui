import rclpy
import requests
from std_msgs.msg import Int8, Bool
from rclpy.node import Node

class emotionSubscriber(Node):
    def __init__(self):
        super().__init__('Subscriber')
        self.speak = self.create_subscription(Bool, 'llm/speech/speaking', self.changeSpeakingState, qos_profile = 0)

        self.sub = self.create_subscription(Int8, 'llm/speech/emotion', self.callback, qos_profile = 0)

    def changeSpeakingState(self, msg):
        self.get_logger().info(str(msg))
        print(requests.post('http://localhost:5173/server', {'speaking': msg.data}).content)

    def callback(self, msg):
        self.get_logger().info(str(msg))

def main(args = None):
    rclpy.init(args=args)
    node = emotionSubscriber()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()
    