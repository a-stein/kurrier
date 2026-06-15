#!/bin/sh
set -eu

cp /seed/init/garage/garage.toml /target/garage-config/garage.toml
cp /seed/init/baikal-init/baikal.sql /target/baikal-init/baikal.sql
cp /seed/init/dav_config/.htaccess /target/dav-config/.htaccess
cp /seed/init/dav_config/baikal.yaml /target/dav-config/baikal.yaml
