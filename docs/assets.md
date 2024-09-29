# Assets
### How to find:
Navigate to _src_ , then _lib_ . Then you'll find the _assets_ folder.

### What's inside?
Depending on the emotion RICBOT uses different eyes or a different mouth. All the files for those can be found inside this folder. All of them are SVG graphics. 

The files inside are: 
- `base.svg` for RICBOTs facial base
- `eye_amused.svg` and `mouth_amused.svg` for the emotion amused
- `eye_bored.svg` and `mouth_bored.svg` for the emotion bored
- `eye_calm.svg` and `mouth_calm.svg` for the emotion calm
- `eye_excited.svg` and `mouth_excited.svg` for the emotion excited
- `eye_frustrated.svg` and `mouth_frustrated.svg` for the emotion frustrated
- `eye_happy.svg` and `mouth_happy.svg` for the emotion happy
- `eye_sad.svg` and `mouth_sad.svg` for the emotion sad
- `eye_worried.svg` and `mouth_worried.svg` for the emotion worried
- `eye_sleeping.svg` and `mouth_speeping.svg` which are used as the assets for blinking and speaking
- `eye.thinking_r.svg` and `mouth_thinking.svg` which are used to create the thinking emotion

### Nice to keep in mind:
If you take a look inside the individual SVG files, you'll notice the different object properties and color properties for each of them.

For example:`ellipse cx="21.809" cy="31.511" rx="21.809" ry="31.511"` and `fill="none" stroke="#70c1e2" `

Depending on those parameters, different CSS functions are used later to color the pieces. Let's look at the color properties: Either fill is used, stroke is used, or both of them are used. For each of those cases, there are different CCS functions used to color the SVG. This allows RICBOT to have more than the default light blue face color. This will be expanded on in "The CSS behind". Just keep the importance of the color properties in mind. 