: 1494000941:0;../env http GET http://localhost:5000 f='sqrt(4 - xs**2)' a:=0 b:=2 c:=0 d:=2
: 1494001539:0;../env http PUT http://localhost:5000 f='sqrt(4 - xs**2)' a:=0 b:=2 c:=0 d:=2
: 1494001792:0;http GET http://localhost:5000
: 1494001817:0;http PUT http://localhost:5000 f='sqrt(4 - xs**2)' a:=0 b:=2 c:=0 d:=2
: 1494001822:0;http GET http://localhost:5000
: 1494001971:0;http GET http://localhost:5000/0
: 1494002028:0;http PUT http://localhost:5000 f='sqrt(4 - xs**2)' a:=0 b:=2 c:=0 d:=2
: 1494002032:0;http GET http://localhost:5000
: 1494002035:0;http GET http://localhost:5000/0
: 1494002156:0;less ../history.sh
: 1494002731:0;cd ../frontend
: 1494002779:0;../env conda install -c conda-forge nodejs=6.10.2\

: 1494002856:0;../env npm install
: 1494002920:0;du -hsc node_modules
: 1494003170:0;cd frontend
: 1494003175:0;ls node_modules/.bin
: 1494003181:0;../env node_modules/.bin/gulp watch
: 1494004291:0;../env http GET http://localhost:5000/1
: 1494004294:0;../env http GET http://localhost:5000/0
: 1494004300:0;../env http PUT http://localhost:5000 f='sqrt(4 - xs**2)' a:=0 b:=2 c:=0 d:=2
: 1494004302:0;../env http GET http://localhost:5000/0
