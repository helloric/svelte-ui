# What is my purpose? 

This web application was created so that RICBOT can have emotions and display them to the visitors during the tour. This aims to make RICBOT more human-like and thus boost his "acceptance" among humans. 

RICBOT has eight different emotions:
- amused
- bored
- calm
- excited
- frustrated
- happy
- sad
- worried

The eight emotions are based on the previous iteration of the HelloRIC project and were adapted for our iteration. The table created then can be seen in the image below

![alt text](image-1.png)

The current emotion can be selected in two ways. Either by selecting it directly or by calculating it based on the two values `arousal` and `valence`. `arousal` and `valence` both have a range from -4 to 3. 0 being on the top of the x-aches. The emotion is then selected depending on the value combination seen above.

Depending on the social context, the LLM behind RICBOT's speech adjusts the emotion RICBOT is currently feeling to influence the output of the LLM. The LLM then sends a ROS Message to the emotion system to update the displayed emotion. 

# FINISH WHEN MODULE COMPLETE