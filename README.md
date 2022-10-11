# Cyclic.sh and mongodb Atlas demo project with express.js and react

Demo project for using cyclic.sh and mongodb atlas

## Wenn frontend und Backend in einem Repo sind

### Was man für das Deployment beachten muss

1. Es muss eine globale `package.json` im Hauptverzeichnis geben. Diese muss die Skripte `install` und `start` für das Backend aufrufen können
2. Das Backend muss den Build-Ordner vom Frontend integrieren (dafür muss dieser in git abgegeben werden)
3. Cyclic unterstützt nur npm, kein yarn.

Vorteil: CORS spielt hier keine Rolle, weil Frontend und Backend

### Weitere Anpassungen am Backend

1. Umstellen von `multer` auf `"/tmp/uploads/"` (Der Free Tier unterstützt keine beschreibbaren Dateisystemen)
2. Bekanntmachen der Frontend-Dateien über `app.use(express.static(path.join(__dirname, '../frontend/build')));`
3. Weiterleitung an React Router über `app.get('*', (req,res) =>{ res.sendFile(path.join(__dirname+'/../frontend/build/index.html')); });`.
4. ENV-Variablen sind als _Variables_ im Cyclic-Projekt einzutragen. (MONGODB_URI, PORT etc)
5. Die API-Zugriffe aus dem Frontend auf das Backend müssen ebenfalls an die Cyclic-Domain angepasst werden. Vorteil: Hier können jetzt absolute Pfade ohne Angabe der Domain benutzt werden, denn die Domain ist ja für Frontend und Backend gleich.
6. Die Backend-Routen sollten alle so umbenannt werden, dass sie nicht mit dem Frontend kollidieren. Sprich aus `/user` wird `/api/user` usw.

## Wenn frontend und backend zwei Repos sind

Beide Repos können jeweils als eigene Projekte in cyclis.sh angelegt werden. Ihr solltet zuerst das Backend anlegen, damit ihr dessen Domainnamen kennt.

### Anpassungen Backend

1. Umstellen von `multer` auf `"/tmp/uploads/"` (Der Free Tier unterstützt keine beschreibbaren Dateisystemen)
2. ENV-Variablen sind als _Variables_ im Cyclic-Projekt einzutragen. (MONGODB_URI, PORT etc)
3. CORS-Domain muss auf die Domain des Frontends gesetzt werden

### Anpassungen frontend

1. Die Adresse des Backends ist für die API-Calls anzupassen
