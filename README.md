buildGenerator

izrađuje install skriptu za spuštanje preko sqlplus-a.

ključne datoteke:
db.mapping.properties -  
  se nalaze database konekcije.
  primjer : "user.hrm = hrm/hrm@COHRT" to znači da kad da za hrm usera na bazi se koristi taj db string
  konekcije za druge instance se zakomentiraju ("#") prije pokretanja

datoteka config.json - 
  se nalazi konfiugracija ponašanja generiranja skirpte


changelog.chunk.sql - 
  u ovu datoteku se stavlja chunk iz changelog koji se želi spustit


instalacija:
  1) kopirati cijeli direktoriji u željeni folder odakle će se pokretati skripta
  2) instalirati node.js (https://nodejs.org/en/)
  3) kroz terminal od node.js navigirati u folder gdje kopirana skripta (u sami root direktoriji skripte)
  4) u terminalu pokrenuti "npm install"  

  