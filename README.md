# Testy z ustaw

Aplikacja do nauki przepisów w formie testów jednokrotnego wyboru. Każde pytanie ma cztery odpowiedzi i wyjaśnienie.

[Otwórz aplikację na GitHub Pages](https://domel.github.io/justyna3/)

| Zestaw | Strony PDF | Pytania |
| --- | ---: | ---: |
| Usługi hotelarskie oraz usługi pilotów wycieczek i przewodników turystycznych | 14 | 43 |
| Rozporządzenie (UE) 2024/1028 o danych dotyczących najmu krótkoterminowego | 19 | 56 |
| Samorząd gminny | 37 | 123 |
| Pracownicy samorządowi | 13 | 43 |
| Kodeks postępowania administracyjnego | 46 | 330 |
| Nabór nr 43/26 na stanowisko podinspektora | | 50 |

Zestaw 06 obejmuje zadania podinspektora w Departamencie Kultury, Promocji i Sportu Urzędu Miejskiego w Białymstoku oraz stosowanie pięciu aktów wskazanych w ogłoszeniu. [Ogłoszenie nr 43/26 w BIP](https://www.bip.bialystok.pl/postepowania/nabor_na_stanowiska_urzednicze/podinspektor-w-departamencie-kultury-promocji-i-sportu-7.html)

Cztery nowe zestawy opierają się na wersjach aktów dostępnych w sekcji „Nauka”. Zestaw pytań z KPA pochodzi z poprzedniej wersji aplikacji. Sekcja „Nauka” zawiera pięć plików PDF oraz infografiki dotyczące KPA, usług hotelarskich, najmu krótkoterminowego, samorządu gminnego i pracowników samorządowych.

Postęp i rozpoczęte sesje są zapisywane lokalnie w przeglądarce. Strzałki pozwalają pominąć pytanie i wrócić do niego później. Pytanie, na które udzielono poprawnej odpowiedzi w dwóch kolejnych ukończonych sesjach, wypada z puli. Można też usunąć je ręcznie. Przycisk „Przywróć wszystkie pytania” resetuje postęp nauki i niedokończone sesje. W teście dostępny jest odczyt głosowy, jeśli przeglądarka go obsługuje.

## Instalacja i tryb offline

Po pierwszym pełnym wczytaniu testy i materiały są dostępne także offline. W Chrome na Androidzie użyj przycisku „Zainstaluj aplikację”, gdy pojawi się na stronie głównej. Możesz też użyć opcji instalacji lub dodania do ekranu głównego w menu przeglądarki.

## Uruchomienie lokalne

W katalogu repozytorium uruchom serwer HTTP i otwórz [stronę lokalną](http://localhost:8000/).

```bash
python3 -m http.server 8000
```

Bezpośrednie adresy testów zawierają parametr `quiz`, np. `index.html?quiz=kpa` albo `index.html?quiz=samorzad-gminny`.

## Aktualizacja pytań i materiałów

Pliki w katalogu `data` są zapisane w formacie CSV w kodowaniu UTF-8. Zawierają kolumny `pytanie`, `odpowiedz 1`, `odpowiedz 2`, `odpowiedz 3`, `odpowiedz 4`, `poprawna`, `opis`. W kolumnie `poprawna` podaj numer prawidłowej odpowiedzi od 1 do 4.

Przy dodawaniu lub usuwaniu zasobów zaktualizuj listy `QUIZZES` i `STUDY_MATERIALS` w `js/app.js` oraz `APP_FILES` w `sw.js`. Gdy zmienią się zasoby zapisane offline, zwiększ wersję `CACHE_NAME` w `sw.js`.
