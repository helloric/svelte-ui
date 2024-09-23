# The +page.svelte

The actual "displaying" happens inside the `+page.svelte` file inside the _routes_ folder. The `+page.svelte` can be seen as the homepage or main page of a website. Different subpages, such as settings in this project, are just additional `+page.svelte` files inside their own folder in the _routes_ folder. To access settings in the browser, just type in [http://localhost:5173/settings](http://localhost:5173/settings) while running the emotionsystem. The face itself only needs one display page because we just swap the face components in and out based on the current emotion. This saves us the trouble of creating multiple subpages for each emotion. Furthermore, the Websocket connection and the speech input and output from the LLM are also handled here in the main `+page.svelte`.

## The content

First, we import the necessary stuff for the display to function properly. Next, two arrays, one for the allowed emotions and one for the allowed colors, are declared. Lastly, the current emotion in the array is set. The following, really complicated looking code is for establishing, opening and regulating the Websocket that connects the emotionsystem to the LLM via ROS Nodes:

   
1. Declaring the necessary variables
2. Audio playing and receiving functions, which are needed by the LLM. More in "The Audio Manager" and "The Communication with the LLM"
3. The `function reconnect()`. It handles the reconnection of the Websocket if the connection is lost.
4. The `function connect()` establishes the Websocket connection.
5. The `ws.onopen` sets the Websocket to open and manages the received messages.
6. `ws.onmessage` which handles the messages for the emotionsystem and the output of the speech
7. The initialization of the microphone and the binding of the face itself
8. Some debug features allowing you to change the emotions and color of the face manually.

## The connection with LLM (Emotionsystem)

The emotionsystem has a built-in subscriber to ROS messages coming from the LLM. Necessary for the displaying of the emotion are which emotion the LLM is currently feeling and if the LLM is currently outputting text. These are handled here:

```JavaScript
 ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.emotion != undefined) {
        emotion = emotions[data.emotion];
      }
      if (data.speaking != undefined) {
        speaking = data.speaking;
      }
      ...
 }
```
Basically, the LLM sends a ROS Message containing the current emotion of the LLM as an int8 and a boolean if the LLM is currently speaking (output text). The received integer is used inside the `setEmotion()` function to, surprise, set the emotion, and the boolean is used to update the `convesation` variable so that the mouth movement can be started or cancelled depending on the received data.
Beware that this is just the little part necessary for displaying the emotion. The main part is the audio input and output, which are handled in a different chapter. 