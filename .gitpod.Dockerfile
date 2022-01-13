FROM devfactory/workspace-mysql

RUN sudo apt update -y && sudo apt install redis -y
RUN npm i -g nodemon