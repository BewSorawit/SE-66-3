1. ssl certificate
   - docker pull alpine/openssl
   - docker run --rm -it -v %cd%:/certs alpine/openssl req -new -newkey rsa:2048 -days 365 -nodes -keyout /certs/private.key -out /certs/certificate.csr
