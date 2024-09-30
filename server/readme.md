How to run

1. use ports in vs code
2. change visiblity for public
3. change port potocal to https
4. change .env in client , value REACT_APP_API_URL

How to use ssl certificate

- docker pull alpine/openssl
- docker run --rm -it -v %cd%:/certs alpine/openssl req -new -newkey rsa:2048 -days 365 -nodes -keyout /certs/private.key -out /certs/certificate.csr
- docker run --rm -it -v %cd%:/certs alpine/openssl req -x509 -newkey rsa:2048 -keyout /certs/private.key -out /certs/certificate.crt -days 365 -nodes
