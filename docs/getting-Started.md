# WORK IN PROGRESS
# What is my puropse? 

This webapplication was created so that RICBOT can have emotions and display them to the visitors during the tour. This aims to make RICBOT more human-like and thus to boost the "aceptance" for him amoung humans. 

RICBOT has eight different emotions:
- amused
- bored
- calm
- excited
- frustrated
- happy
- sad
- worried

The eight emotions are based on the previous iteration of the HelloRIC project and were adaped for our iteration. 

Depending on the social context, the LLM behind RICBOT's speech ajusts the emotion RICBOT is currently feeling to influence the output of the LLM. The LLM then sends a ROS Message to the emotionsystem to update the displayed emotion. 
....................................