#!/bin/bash

echo SECURITY_ENABLED=$SECURITY_ENABLED;
echo SECURITY_REALM=$SECURITY_REALM;
echo SECURITY_KEYCLOAK_URL=$SECURITY_KEYCLOAK_URL;
echo SECURITY_CLIENT_ID=$SECURITY_CLIENT_ID;

sed -i "s|var isSecurityModuleEnabled = true;|var isSecurityModuleEnabled = $SECURITY_ENABLED;|g" webapp/scripts/app.js

sed -i "s|SUBST_REALM|$SECURITY_REALM|g" ./keycloak.json
sed -i "s|SUBST_KEYCLOAK_URL|$SECURITY_KEYCLOAK_URL|g" ./keycloak.json
sed -i "s|SUBST_CLIENT_ID|$SECURITY_CLIENT_ID|g" ./keycloak.json

mv keycloak.json ./webapp/keycloak.json

exec "$@"
