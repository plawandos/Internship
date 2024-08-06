# Internship Overview: Meme X Bot Development 
https://memexbot.web.app

## Bot Command Overview

### /help Command
- **Description**: This command provides users with a comprehensive list of available bot commands and functionalities, making it easier for users to navigate and utilize the bot's features.
- ![image](https://github.com/user-attachments/assets/d2c64603-79cc-41f1-9b7b-66036a892e56)

## Creator Search and Follow System

### Search for Creators by Tag
- **Description**: Users can search for content creators by specific tags, such as 'Gaming', 'Music', 'Education', etc. This feature allows users to find and follow creators that match their interests, enhancing user engagement and content discovery.
- ![image](https://github.com/user-attachments/assets/955e73aa-2a08-4f13-b749-d5ef44aea3e5)

### Display of Searched Users
- **Description**: The bot displays a list of creators matching the search criteria, along with relevant information such as the creator's name, description, follower count, and verification status. Pagination controls are included to navigate through the results.
- ![image](https://github.com/user-attachments/assets/c1e25da7-1a8e-4c02-9423-fa4172d94a27)

## Creator Dashboard

### Creator Profile Management
- **Description**: A dashboard for creators to manage their profiles, including updating their name, description, and tags. This feature ensures that creators can keep their information up-to-date and accurately represent their content.
- ![image](https://github.com/user-attachments/assets/13abcf2e-11bf-4c9b-bf71-989d3d8eb88d)

## Infrastructure and Deployment

### VPS Hosting and Bot Management
- **Description**: The bot is hosted on a VPS, ensuring high availability and performance. Regular maintenance and updates are performed to keep the bot running smoothly and efficiently.
- ![image](https://github.com/user-attachments/assets/848e5d4f-d628-4ff0-8ab0-8dec9ba169a1)

### Startup Command
- **Command**: 
  ```bash
  if [[ -d .git ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then npm install ${NODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then npm install --production; fi; node --expose-gc /home/container/run.js

![image](https://github.com/user-attachments/assets/3c67c9fe-1c97-4f95-94a2-b198e95f113a)
