curl 'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1746719930699=' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0' -H 'Accept: */*' -H 'Accept-Language: en-GB,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br, zstd' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Referer: https://www.iplt20.com/' -H 'Sec-Fetch-Dest: script' -H 'Sec-Fetch-Mode: no-cors' -H 'Sec-Fetch-Site: cross-site'>>matches.json

root@zeph:~/cricshort# curl 'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/1855-Innings2.js?callback=onScoring&_=1746729843775' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0' -H 'Accept: */*' -H 'Accept-Language: en-GB,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br, zstd' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Referer: https://www.iplt20.com/' -H 'Sec-Fetch-Dest: script' -H 'Sec-Fetch-Mode: no-cors' -H 'Sec-Fetch-Site: cross-site'>>match.json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  319k  100  319k    0     0   427k      0 --:--:-- --:--:-- --:--:--  428k

root@zeph:~/cricshort# curl 'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp&_1746742781756=' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0' -H 'Accept: */*' -H 'Accept-Language: en-GB,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br, zstd' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Referer: https://www.iplt20.com/' -H 'Sec-Fetch-Dest: script' -H 'Sec-Fetch-Mode: no-cors' -H 'Sec-Fetch-Site: cross-site'>>points.json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  5298  100  5298    0     0  15592      0 --:--:-- --:--:-- --:--:-- 15582
