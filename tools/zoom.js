function save() {
    for (let i = 1; i < 49; i++){
        // Cookieに保存
        document.cookie = 'zoom_' + i + '=' + encodeURIComponent(document.getElementById('num_' + i).value) + '; max-age=31536000';
    };
};
function cookie() {
    // Cookieの処理
    let obj = {};
    let r = document.cookie.split('; ');
    for (let i = 0; i < r.length; i++){
        data = r[i].split('=');
        // 連想配列にする
        obj[data[0]] = decodeURIComponent(data[1]);
    };
    return obj;
};
// Cookieに保存した値の表示
function display() {
    let obj = cookie();
    for (let i = 1; i < 49; i++){
        if (eval('obj.zoom_' + i) != undefined) {
            if (i % 2 == 1) {
                document.getElementById('id_' + i).innerHTML = "<a target='_blank' href='https://us02web.zoom.us/j/" + eval('obj.zoom_' + i) + "'>" + eval('obj.zoom_' + i) + "</a>";
            } else {
                document.getElementById('id_' + i).innerHTML = eval('obj.zoom_' + i);
            };
        };
    };
    // 表示切り替え
    document.getElementById("table_1").style.display ="block";
    document.getElementById("table_2").style.display ="none";
};
function display2() {
    let obj = cookie();
    for (let i = 1; i < 49; i++){
        if (eval('obj.zoom_' + i) != undefined) {
            document.getElementById('num_' + i).value = eval('obj.zoom_' + i);
        };
    };
    // 表示切り替え
    document.getElementById("table_1").style.display ="none";
    document.getElementById("table_2").style.display ="block";
};
// 読み込み時に実行
window.onload = function() {
    display();
};
