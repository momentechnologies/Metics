#!/bin/bash

cd "$(dirname "$0")"

startBlock='### METICS BLOCK (autogenerated) ###'
endBlock='### END METICS BLOCK ###'
file=$1
replaceString=$2

exists=$(sed -n "/^$startBlock$/,/^$endBlock/p" $file)

if [ ${#exists} -ge 4 ]; then
  sed -i -n "/$startBlock/{p;:a;N;/$endBlock/!ba;s/.*\n/$replaceString\n/};p" $file
else
  echo -e "\n$startBlock
$replaceString
$endBlock\n" >> $file
fi