# API Name

## description
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Sources](#sources)
  * [License](#license)

## Description

## Installation

### On FDNDVM

This server is for testing purposes by FDND staff or students only. It’s not to be permanently used as a hosting solution for clients. Make sure all parties associated with a project know this.

#### Create folder for project

Create a new folder in /var/www, use the exact URL to the resource as folder name, in this way we can easily find the projects we need when we need it.

#### FilePermissionsACLs

POSIX Access Control Lists (ACLs) are fine-grained access rights for files and directories. An ACL consists of entries specifying access permissions on an associated object. ACLs can be configured per user, per group or via the effective rights mask.

1. Check permissions on a folder using `getfacl api.fdnd.nl`
2. Set permissions on a new folder using the old settings: `getfacl api.fdnd.nl/ | setfacl -b -n -M - tribe.api.fdnd.nl`

#### Create symlinks

Make a symlink to all user folders that need acces to this folder using `ln -s /var/www/homedir`, please do this using the user that own’s the homedir or `chown` the symlinks after creating them.

#### Create an NGINX 
Copy an NGINX file from one of the other API’s, remove the certbot lines and listen to port 80 only. Link it to the `sites-enabled` folder and fire it up. Then call `certbot` and install certificates for the API. Hook up the correct port number for proxying to Node.js

#### Test installation
Modify the settings in .env and run `npm install` and `npm start` to test the API. If everything works as it should then you can automate starting and stopping the API using systemctl.

#### Start as a service
Add a `apiname.service` file to the /etc/systemd/system folder using the following format.

```
[Service]
PIDFile=/tmp/fdnd-name
User=your_username
Group=your_groupname
Restart=always
KillSignal=SIGQUIT
WorkingDirectory=/var/www/name.api.fdnd.nl/
ExecStart=/var/www/name.api.fdnd.nl/bin/www

[Install]
WantedBy=multi-user.target
Alias=fdnd-name.service
```

Enable it using `sudo systemctl enable fdnd-name.service`
Start it using `sudo systemctl start fdnd-name`
Maybe you have to run `sudo systemctl daemon-reload`
You can check specific logs using `sudo journalctl -fu find-name`

It it all works, your fresh API wil automagically start during boot and will be restarted at crash. If it continually is brought down please test in a local environment before changing things at server-level. This is not a livedev environment.

## Usage

## Sources

## License

![GNU GPL V3](https://www.gnu.org/graphics/gplv3-127x51.png)

This work is licensed under [GNU GPLv3](./LICENSE).
