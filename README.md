# Prima
Repository for the module "Prototyping interactive media-applications and games" at Furtwangen University

[Pages-Version](https://lobinsan.github.io/PRIMA/)

Final handin:

- [Start Flappy Box](https://lobinsan.github.io/PRIMA/FlappyBox/index.html)
- [Flappy Box (Code)](https://github.com/LobinSan/PRIMA/tree/master/FlappyBox)
- [Designdokument](https://github.com/LobinSan/PRIMA/blob/master/FlappyBox/DesigndukumentFlappyBox.pdf)
- [Gepacktes Archiv Download](https://github.com/LobinSan/PRIMA/blob/master/FlappyBox/FlappyBoxPackedFolder.zip?raw=true)


## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | Flappy Box
|    | Name                  | Robin Pittelkow
|    | Matrikelnummer        | 257730
|  1 | Nutzerinteraktion     | Der Nutzer kann mit einem einzigen Tastendruck das Spiel steuern. Wie beim originalen Flappy Bird ist lediglich das Springen des Characters zu steuern, da das Spiel dem Endlos-Spiel-Prinzip folgt. Mit der Leertaste, "W" oder "Pfeiltaste nach oben" kann dieser Sprung gesteuert werden. Es soll versucht werden, den zu steuernden Character in der Luft zu halten und währenddessen durch Hindernisse hindurch zu fliegen, ohne diese oder den Boden zu berühren. Zudem kann der Nutzer mit der Maus Einstellungen vornehmen oder das Spiel neu starten.                                                                                                                            |
|  2 | Objektinteraktion     | Alle Versuchungen Kollisionen zu implementieren waren Erfolglos, da dauerhaft eine Kollision erkannt wird.                                                                                                                                                                               |
|  3 | Objektanzahl variabel | Ab Spielstart wird alle 2,5 Sekunden ein neues Hindernis gespawnt. Um zu bestimmen, auf welcher Höhe die Öffnung in der Wand sein soll, durch die der Spieler hindruchfliegen soll, wird eine Zufallszahl benutzt, um somit bei jedem Spielstart ein anderes Level vorzufinden zu können.                                                                                                                                                       |
|  4 | Szenenhierarchie      | Es besteht eine "game"-Node, welches das oberste Parent-Objekt des Spiels ist. Zudem wird diesem bei der Initialisierung des Spiels ein "player"-Objekt, ein "floor"-Objekt und ein "level"-Objekt als Children übergeben. Während der Laufzeit werden alle Hindernis-Objekte, die gespawnt werden sofort als Children der "level"-Node hinzugefügt. Auf diese Weise kann einfach auf alle Hindernisse zugegriffen werden. Die einzelnen Hindernis ("wall") -Objekte bestehen wiederum aus einzelnen Wall-Segmenten. Diese stellen einzelne boxen dar, mit denen die Öffnungen in den Wänden realisiert werden. Möglich war es hiermit jeder einzelnen Box eine Funktion zu geben, welche die Kollision mit dem Spieler berechnen sollte. Das "player"-Objekt besteht ebenfalls aus mehreren Nodes: Eine Parent-Node, welche sich in Y-Richtung entsprechend der Gravitation bewegt und einer Node, welche dieser untergeordnet ist, welche die Rotation des Characters realisiert, um nicht die Gravitationsachse zu verdrehen.                                                                                                                                 |
|  5 | Sound                 | Sowohl beim Springen des Characters als auch beim Spielende, sollte der Spieler mit dem Boden oder Hindernissen Kollidieren, wird ein eigener Sound abgespielt, um durchgehend ein auditives Feedback des Spiels zu haben.                                                    |
|  6 | GUI                   | Es besteht sowohl ein grafisches User-Interface, das während des Spiels am oberen Bildschirmrand sichtbar ist, als auch ein "Game Over"-Screen. Auf letzterem kann der Spieler seine erreichte Punktzahl sehen und das Spiel mit einem Klick auf "Play Again" neu starten. Das Einstellungsmenü am oberen Bildschirmrand ermöglicht es dem Spieler die Audioelemente entweder zu muten oder mithilfe eines Schiebereglers in der Lautstärke zu verändern.                                                                                 |
|  7 | Externe Daten         | Es ist eine data.json in den Programmcode eingebunden, in welcher extern Variablen verändert werden  können. In diesem Falle kann beispielsweise die Sprunghöhe, der Rotationswinkel und die Rotationsgeschwindigkeit des Spielers als auch die Spawn-Zeit der Hindernisse extern eingestellt werden.                                                                                                      |
|  8 | Verhaltensklassen     | Um die Übersichtlichkeit im Code zu gewährleisten, wurde Objektspezifisches Verhalten der einzelnen Objekte in dessen Klasse als Methode ausgelagert. So behandelt beispielsweise eine Funktion im Player-Objekt die Erstellung des Charakters, eine andere realisiert den Sprung des Charakters und eine weitere die Kollisionsprüfung mit Szenenobjekten.                                                                                        |
|  9 | Subklassen            | Da sich die im Spiel enthaltenen Objekte zu sehr voneinander in ihrer Funktionalität untersche,iden und grundsätzlich relativ wenig Objekte benötigt wurden, war es nicht möglich einen sinnvollen Einsatz von Subklassen zu finden.                                                                                                |
| 10 | Maße & Positionen     | Der Spieler befindet sich durchgehend leicht links vom Koordinatenursprung (0,0), während sich die Welt um ihn herum bewegt, um die Hindernisse früher erkennen zu können. Zudem sorgt es für visuelles Gleichgewicht, da die linke Seite des Spiels ohnehin uniteressant für den Spieler ist. Die einzelnen Wall-Segmente, welche ein Hinderniss bilden, sind doppelt so breit wie der Player, während die höhe der Hindernis-Öffnung 4x so groß ist wie der Player. Der Player kann also innerhalb der Öffung 4-mal so hoch springen wie er selbst ist. Da dies aber praktisch nahezu umöglich ist für einen Menschen so perfekt umzusetzen, musste die Sprunghöhe etwas heruntergesetzt werden (In externer data.json änderbar). Die doppelte Breite der Hindernisse hat die Wirkung, dass der Spieler gezwungen ist innherhalb der Hindernisse zu springen, und er somit nicht in einem Satz durch das Hindernis hindurch springen kann. Dies erfordert besseres Einschätzden des Spielers, wann gesprungen werden muss, um nicht oben gegen das Hindernis zu stoßen.                                                                                              |
| 11 | Event-System          | Das Event-System wurde nicht verwendet.                                                                                                                                                                               |

## Abgabeformat
* Fasse die Konzeption als ein wohlformatiertes Designdokument in PDF zusammen!
* Platziere einen Link in der Readme-Datei deines PRIMA-Repositories auf Github auf die fertige und in Github-Pages lauffähige Anwendung.
* Platziere ebenso Links zu den Stellen in deinem Repository, an denen der Quellcode und das Designdokument zu finden sind.
* Stelle zudem auf diese Art dort auch ein gepacktes Archiv zur Verfügung, welches folgende Daten enthält
  * Das Designdokument 
  * Die Projektordner inklusive aller erforderlichen Dateien, also auch Bild- und Audiodaten
  * Eine kurze Anleitung zur Installation der Anwendung unter Berücksichtigung erforderlicher Dienste (z.B. Heroku, MongoDB etc.) 
  * Eine kurze Anleitung zur Interaktion mit der Anwendung

## GameZone
Wenn Du dein Spiel bei der Dauerausstellung "GameZone" am Tag der Medien sehen möchtest, ergänze folgendes  
* Einen Ordner mit zwei Screenshots der laufenden Applikation in den Größen 250x100 und 1920x400 pixel sowie ein Textdokument mit den Informationen:
* Titel
* Autor
* Jahr und Semester der Entwicklung (Sose, Wise)
* Studiensemester
* Lehrplansemester
* Studiengang
* Veranstaltung im Rahmen derer die Entwicklung durchgeführt wurde
* betreuender Dozent
* Genre des Spiels
* ggf. passende Tags/ Schlagwörter zu dem Spiel
* Untertitel (max 40 Zeichen), der Menschen zum Spielen animiert
* Kurzbeschreibung (max 250 Zeichen), die kurz erklärt wie zu spielen ist
* Erklärung, dass die Fakultät Digitale Medien die Anwendung bei Veranstaltungen, insbesondere am Tag der Medien, mit einem expliziten Verweis auf den Autor, vorführen darf.
