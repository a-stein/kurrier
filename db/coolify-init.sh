#!/bin/sh
set -eu

if [ -f /target/garage-config/garage.toml ]; then
  rpc_secret=$(sed -n 's/^rpc_secret = "\(.*\)"$/\1/p' /target/garage-config/garage.toml | head -n 1)
else
  rpc_secret=""
fi

if ! printf '%s' "$rpc_secret" | grep -Eq '^[0-9a-fA-F]{64}$'; then
  rpc_secret=$(od -An -N32 -tx1 /dev/urandom | tr -d ' \n')
fi

{
  printf 'rpc_secret = "%s"\n\n' "$rpc_secret"
  sed '/^rpc_secret = /d' /seed/init/garage/garage.toml
} > /target/garage-config/garage.toml

cp /seed/init/baikal-init/baikal.sql /target/baikal-init/baikal.sql
cp /seed/init/dav_config/.htaccess /target/dav-config/.htaccess
cp /seed/init/dav_config/baikal.yaml /target/dav-config/baikal.yaml
