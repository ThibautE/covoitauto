#!/bin/bash
echo "Importation de la bdd"

mongoimport --db covoitauto --collection users --file users.json  --jsonArray --drop
mongoimport --db covoitauto --collection trips --file trips.json  --jsonArray --drop

echo "Bdd importée avec succès"