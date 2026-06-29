# Operacijski sistem — kratek pregled

Operacijski sistem (OS) je programska plast, ki stoji med strojno opremo računalnika in uporabniškimi programi. Njegova naloga je upravljanje virov — procesorja, pomnilnika, diskov in vhodno-izhodnih naprav — ter zagotavljanje vmesnikov in storitev, kot so datotečni sistem, upravljanje procesov in varnost. Ko zaženeš program, OS naloži njegove podatke v pomnilnik, zagotovi dostop do potrebnih naprav in nadzoruje njegovo izvajanje, hkrati pa poskrbi, da so programi izolirani in da delovanje celotnega sistema ostane stabilno.

## Jedro

Jedro ali kernel je glavni del operacijskega sistema — najbolj privilegirana komponenta, ki neposredno komunicira s strojno opremo. Jedro izvaja temeljne storitve: upravljanje procesov (ustvarjanje/fork, prekinjanje/wait, ubijanje/exit), upravljanje pomnilnika (dodeljevanje in sproščanje, virtualni pomnilnik), upravljanje naprav preko gonilnikov ter obdelavo sistemskih klicev iz uporabniških programov. Sistemski klic je način, kako uporabniški program zaprosi operacijski sistem za dostop do privilegiranih storitev (npr. branje/pisanje datotek, ustvarjanje procesov ali upravljanje naprav). Ko program naredi sistemski klic, se izvrševanje preslika iz uporabniškega načina ("user mode") v jedrni način ("kernel mode"), kernel izvrši zahtevo in vrne rezultat programu. Ker jedro teče v "kernel mode", ima neposreden dostop do strojnih virov, medtem ko aplikacije tečejo v manj privilegiranem "user mode" — to ločevanje pomaga preprečevati napake in varnostne zlorabe.

## Razvrščanje / scheduling na CPU

Razvrščanje na CPU-ju je mehanizem, s katerim kernel odloča, kateri proces ali nit bo dobil čas procesorja in v katerem vrstnem redu. Ker več programov pogosto tekmuje za omejene procesorske vire, scheduler uporablja algoritme (npr. round-robin, priority-based, multilevel feedback queue), da zagotovi poštenost, odzivnost in čim boljše izkoriščenost CPU-ja. Na enoprocesorskih sistemih scheduler hitro preklaplja med opravili (time-slicing), na večjedrnih pa razporeja naloge po jederh ter upošteva prioritete in zaklepanje virov.

---

# Delo v PowerShell (v terminalu znotraj VS Code)

Spodaj so osnovni ukazi in primeri, ki delujejo v PowerShellu na Windows (v terminalu znotraj VS Code). Kadar napišemo ukaz, ga vstavimo v blok kode z označeno jezikovno hlajenostjo `powershell`.

### Osnovni ukazi

```powershell
# Premik med imeniki
cd C:\Users\HP-win-Admin\Documents\Git repos
cd ..             # premik eno raven višje

# Pregled trenutnega direktorija
dir #ali
Get-ChildItem

# Ustvarjanje mape/direktorija
mkdir novaMapa

# Brisanje mape (če ni prazna, uporabimo -Recurse)
Remove-Item -Recurse -Force .\staraMapa
# ali rmdir .\staraMapa  # rmdir ima lahko drugačno vedenje pri ne-praznih mapah

# Izpis besedila
Write-Output "Pozdravljen, svet!" #ali
Write-Host "Pozdravljen, svet!" # ali 
echo "Pozdravljen"  

# Prikaz vsebine datoteke 
Get-Content .\datoteka.txt # ali
cat .\datoteka.txt # ali 
type .\datoteka.txt

Get-Content .\datoteka.txt -Head 10 # vrne prvih 10 vrstic
Get-Content .\datoteka.txt -Tail 5 # vrne zadnjih 5 vrstic

# Ustvarjena nova datoteka
New-Item novaDatoteka.txt
New-Item -ItemType File .\novaDatoteka.txt # bolj na široko

# Zagon programa (primer: kalkulator)
Start-Process calc        # odpre klasični kalkulator

# Odpri trenutno mapo v VS Code (če je ukaz 'code' v PATH)
code .
```

### Pomen "." in ".."

- "." predstavlja trenutni imenik (current directory).
- ".." predstavlja nadrejeni imenik (ena raven višje).

Uporabimo ju za relativne poti, npr. `cd ..\drugaMapa`.

### Spremenljivka PATH

`PATH` je okoljska spremenljivka, ki vsebuje seznam imenikov, ločenih s podpičjem (`;`), v katerih sistem išče izvajljive datoteke (executables). V PowerShellu preberemo ali spremenimo trenutni PATH z uporabo `$env:PATH`.

```powershell
# Prikaz trenutnega PATH
$env:PATH

# Dodajanje mape v PATH za trenutno sejo (ni trajno)
$env:PATH += ";C:\\mytools\\bin"
```

### Definicija spremenljivk in primeri

```powershell
# Definicija spremenljivke
$ime = "Ana"
Write-Output "Zdravo, $ime"

# Okoljska spremenljivka
$env:MOJA_VAR = "nekaj"
Write-Output $env:MOJA_VAR
```

### Primer zanke za izpis vseh datotek/imenikov v trenutnem imeniku

V PowerShellu je običajna forma za iteracijo uporaba `Get-ChildItem` in `ForEach-Object` ali `foreach`:

```powershell
# Preprosta verzija z ForEach-Object
Get-ChildItem | ForEach-Object { Write-Output $_.Name }

# Ali s konstrukcijo foreach
foreach ($item in Get-ChildItem) {
	Write-Output $item.Name
}

# Ali, če želite samo datoteke (brez imenikov), izpisati v eni vrstici po principu cevovoda/pipeline
Get-ChildItem -File | ForEach-Object { Write-Output $_.Name }
```
