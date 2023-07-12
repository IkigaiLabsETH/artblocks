Voice Coding with iOS Shortcuts + Node.js
Instructions:

Copy and paste the server.js into a new folder called genart or whatever
Run npm init -y to generate a package.json
Install the dependencies:
npm install body-parser openai express canvas dotenv
Add .env file with your OpenAI API key:
OPENAI_API_KEY="your_key_here"
Now you should be able to run the following, it will print a URL with your local IP address:
node server.js
Install the Shortcut and Add to Homescreen: https://www.icloud.com/shortcuts/f7bc8aecd68b4e53b13d68208349c589
Edit the Shortcut in iOS or macOS, setup dictation if needed to be able to dictate your voice into the shortcut.
Still editing the shortcut, change "your_server_ip" to the IP address printed by the server
Start voice coding by running the shortcut and telling it to draw things!

Check Draw.js !!!