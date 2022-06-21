# BSSHN

Hospital Information Management Portal

## Installation

Use the following commands on the server terminal.

Ensure it is at the `/home/<server-name>` directory.

```bash
cd ~
```
Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) Community Edition on the server.


Install and configure NGINX.
```bash
sudo apt install nginx
sudo nano etc/nginx/sites-enabled/bsshn-app
```

Type this into the lunched nano editor to configure NGINX

```bash
server {
        listen 80;

        location / {
                proxy_pass http://127.0.0.1:8000;
                proxy_set_header Host ost;
                proxy_set_header X-Forwarded-For roxy_add_x_forwarded_for;
        }
}
```

Use this to unlink the default NGINX site that displays when you visit the default IP address `http://localhost` of the server.

```bash
sudo unlink /etc/nginx/sites-enabled/default
```

Now when you visit the default IP address `http://localhost` of the server, you should see a **502 Bad Gateway**.

Use this to confirm the NGINX configuration was successful.

```bash
sudo nginx -t
```

Then use this to Reload NGINX.

```bash
sudo nginx -s reload
```

Allow port 5000.

```bash
sudo ufw allow 5000
```

Use FileZilla FTP to copy over the project folder containing the files to the `/home` directory of the server.

Go-to the project folder `cd <project-folder>` and install **python3-pip**

```bash
sudo apt install python3-pip
```

Install all dependencies.

```bash
pip3 install -r requirements.txt
sudo apt install gunicorn3
```

Serve the app with `gunicorn3` while setting `workers` to a minimum of **3** for which handles traffic based on the number processor cores for the server. Generally recommended is ```(2 x $num_cores) + 1```

```bash
gunicorn3 --workers=3 app:app
```

Recommended to keep `gunicorn` service running even in the background.

```bash
gunicorn3 --workers=3 app:app --daemon
```

Now the application should be running or the localhost IP address of the server **or** preferably `http://localhost`

To close `gunicorn` and stop the server.

```bash
sudo pkill -f gunicorn3
```

## Usage

Visit `http://localhost` on other machines on the same LAN or wireless network the server is connected to.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
