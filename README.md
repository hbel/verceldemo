# Cyclic.sh and mongodb Atlas demo project with express.js and react

Demo project for using cyclic.sh and mongodb atlas

## Was man für das Deployment beachten muss

1. Es muss eine globale package.json geben. Diese muss install und start für das Backend aufrufen können
2. Das Backend muss den Build-Ordner vom Frontend integrieren (dafür muss dieser in git abgegeben werden)
3. Alternativ kann man Frontend und Backend separat deployen
4. Cyclic unterstützt nur npm, kein yarn.

## Weitere Anpassungen am Backend

1. Umstellen von `multer` auf `"/tmp/uploads/"` (Der Free Tier unterstützt keine beschreibbaren Dateisystemen)
2. Bekanntmachen der Frontend-Dateien über `app.use(express.static(path.join(__dirname, '../frontend/build')));`
3. Weiterleitung an React Router über `app.get('*', (req,res) =>{ res.sendFile(path.join(__dirname+'/../frontend/build/index.html')); });`.
4. ENV-Variablen sind als _Variables_ im Cyclic-Projekt einzutragen.
5. Die API-Zugriffe aus dem Frontend auf das Backend müssen ebenfalls an die Cyclic-Domain angepasst werden.
