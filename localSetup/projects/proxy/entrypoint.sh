#!/bin/sh
set -e

CA_DIR=/etc/ca
CERTS_DIR=/etc/ssl/private

DOMAINS="\
DNS:api.local.metics.io, \
DNS:frontend.local.metics.io, \
DNS:local.metics.io \
"

if [ ! -f "$CA_DIR/ca.key" ]; then
  echo Generating CA key..
  openssl genrsa -out "$CA_DIR/ca.key" 4096

  echo Generating CA cert..
  openssl req \
    -x509 \
    -new \
    -nodes \
    -key "$CA_DIR/ca.key" \
    -sha256 \
    -days 3650 \
    -out "$CA_DIR/cacert.pem" \
    -subj '/C=NO/ST=Nordland/L=Myre/O=Moment Technologies AS/OU=local/CN=metics.io/emailAddress=local@metics.io'
fi

if [ ! -f "$CERTS_DIR/metics.key" ] || [ ! -f "$CERTS_DIR/metics.crt" ]; then
  echo "Generating site certificate..."
  rm -f "$CERTS_DIR/metics.*"

  OPENSSL_CONFIG=$(mktemp)
  {
    echo '[dn]'
    echo 'CN=localhost'
    echo '[req]'
    echo 'distinguished_name = dn'
    echo '[EXT]'
    echo "subjectAltName = $DOMAINS"
    echo 'keyUsage=digitalSignature'
    echo 'extendedKeyUsage=serverAuth'
  } > "$OPENSSL_CONFIG"

  openssl req \
    -nodes \
    -newkey rsa:2048 \
    -subj '/CN=localhost' \
    -extensions EXT \
    -keyout "$CERTS_DIR/metics.key" \
    -out "$CERTS_DIR/metics.csr" \
    -config "$OPENSSL_CONFIG"
  rm "$OPENSSL_CONFIG"

  EXTFILE=$(mktemp)
  echo "subjectAltName = $DOMAINS" > "$EXTFILE"
  openssl x509 \
    -req \
    -in "$CERTS_DIR/metics.csr" \
    -CA "$CA_DIR/cacert.pem" \
    -CAkey "$CA_DIR/ca.key" \
    -CAcreateserial \
    -out "$CERTS_DIR/metics.crt" \
    -days 3649 \
    -sha256 \
    -extfile "$EXTFILE"
  rm "$EXTFILE"
fi

exec "$@"