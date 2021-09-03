#!/bin/bash

cd "$(dirname "$0")"

default_ip="127.0.0.1"
ip=${1:-$default_ip}

read -r -d '' hosts << EOM
$ip\tapi.local.metics.io
$ip\tcdn.local.metics.io
$ip\tcdn-private.local.metics.io
$ip\tfrontend.local.metics.io
$ip\tlocal.metics.io
EOM

replaceStringWithoutNewline=${hosts//$'\n'/\\n}
echo $replaceStringWithoutNewline
sudo ./manage-block-in-file.sh /etc/hosts "$replaceStringWithoutNewline"