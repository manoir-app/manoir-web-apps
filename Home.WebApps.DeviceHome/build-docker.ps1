docker build . -f ..\..\..\Dockerfile.Release -t 192.168.2.184:5000/webapps-devicehome:latest

docker tag 192.168.2.184:5000/webapps-devicehome:latest 192.168.2.100:5000/webapps-devicehome:latest

docker push 192.168.2.184:5000/webapps-devicehome:latest
docker push 192.168.2.100:5000/webapps-devicehome:latest

docker image rm 192.168.2.184:5000/webapps-devicehome:latest
docker image rm 192.168.2.100:5000/webapps-devicehome:latest
