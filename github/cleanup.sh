#!/bin/bash

tar -zcvf "$(date +%Y%m%d)_html.tar.gz" html
tar -zcvf "$(date +%Y%m%d)_img.tar.gz" img

rm html/*
rm img/*

echo "done"