#!/bin/bash

# variables to hold input values
perekBegin=0
perekEnd=0
partName=""
seferName=""
directory=""

# loop through input flags and get values
while getopts ":b:e:p:s:o:" opt; do
  case $opt in
    b)
      # echo "-b was triggered, Parameter: $OPTARG" >&2
      perekBegin=$OPTARG
      ;;
    e)
      # echo "-e was triggered, Parameter: $OPTARG" >&2
      perekEnd=$OPTARG
      difference=$((perekEnd-perekBegin))
      if [ $difference -lt 0 ]
      then
        echo "End perek must be larger than beginning perek" >&2
        exit 1
      fi
      ;;
    p)
      # echo "-p was triggered, Parameter: $OPTARG" >&2
      partName=$OPTARG
      ;;
    s)
      # echo "-s was triggered, Parameter: $OPTARG" >&2
      seferName=$OPTARG
      ;;
    o)
      directory=$OPTARG
      if [ -d $directory ]
      then
        if [ ! -w $directory ]
        then
          echo "Directory $directory not writable, exiting"
          exit 1
        fi
      else
        echo "Directoy $directory does not exist, creating it now"
        mkdir -p $directory
      fi
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

# validate inputs

if [ -z "${partName// }" ]
then
  echo "Must supply a part name" >&2
  exit 1
fi

if [ -z "${seferName// }" ]
then
  echo "Must supply a sefer name" >&2
  exit 1
fi

if [ -z $directory ]
then
  directory="./"
  echo "Output path not supplied, saving to current directory" >&2
fi

if [ $perekBegin -eq 0 ]
then
  echo "Must supply a beginning perek number" >&2
  exit 1
fi

if [ $perekEnd -eq 0 ]
then
  echo "Must supply an ending perek number" >&2
  exit 1
fi

# we have our inputs, let's prepare for making the calls:

base="https://cdn.tanachstudy.com/archives"
url="$base/$partName/$seferName/$seferName-"
echo $url

for i in $seferName; do B=`echo -n "${i:0:1}" | tr "[:lower:]" "[:upper:]"`; echo -n "${B}${i:1} "; done


