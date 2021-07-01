# How To Job Scrapper Server Setting

## Server Environment 
- This service is served with DigitalOcean
- Ubuntu 16.04
- node 6.11.0
- npm 5.3.0
- 512MB RAM, 20G disk

## Server setting
- add new user
    > adduser 'username'
	> usermod -aG sudo 'username'

- install essential packages
    > sudo apt-get update
    > sudo apt-get install git vim build-essential

- install haved, unzip (for selenium)
    > sudo apt-get install haveged unzip
    > /etc/init.d/haveged start

- run selenium_install.sh (install selenium standalone)
    > ./selenium_install.sh

- install mongodb
    > ./mongodb_install.sh 

- install pm2/nginx
    > npm i -g pm2
    > sudo apt-get install nginx

- setting nginx
    > sudo vim /etc/nginx/sites-available/default
    > 
	> (add below configs)
    >    ...
    >    location / {
    >        proxy_pass http://localhost:8080;
    >        proxy_http_version 1.1;
    >        proxy_set_header Upgrade $http_upgrade;
    >        proxy_set_header Connection 'upgrade';
    >        proxy_set_header Host $host;
    >        proxy_cache_bypass $http_upgrade;
    >    }
    > 
    > sudo nginx -t
    > sudo systemctl restart nginx

- install global npm packages for application
    > npm i -g cross-env nodemon

- clone react-jobScrapper
    > git clone https://github.com/thebluewhale/react-jobScrapper

- install local/dev npm packages for application
    > npm install 

- for test
    > npm run dev
