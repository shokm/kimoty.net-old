/** グローバル変数を定義 **/
let univName
let univNameEng
let univColor
let imageBase64
let i = 0;

/** ページ読み込み時に実行する処理 **/
onload = function() {
    /* GETパラメータ（クエリ文字列）を取得する処理 */
    let params = new URL(document.location).searchParams; // GETパラメータを読み取る設定
    if (params.get('univName') != null && params.get('univNameEng') != null && params.get('univColor') != null) { // GETパラメータが存在する場合
        /* 各GETパラメータから内容を取得 */
        univName = params.get('univName');
        univNameEng = params.get('univNameEng');
        univColor = params.get('univColor');

        /* 各テキストボックスの内容を取得したGETパラメータの内容で置き換える */
        document.getElementById('univName_id').value = univName;
        document.getElementById('univNameEng_id').value = univNameEng;
        document.getElementById('univColor_id').value = univColor;
    } else { // GETパラメータが存在しない場合
        /* 各テキストボックスから内容を取得 */
        univName = document.getElementById('univName_id').value;
        univNameEng = document.getElementById('univNameEng_id').value;
        univColor = document.getElementById('univColor_id').value;
    }

    drawImage();
    drawHTML();
}

/** ボタンをクリックした際の処理 **/
function clickButton() {
    /* 各テキストボックスから内容を取得 */
    univName = document.getElementById('univName_id').value;
    univNameEng = document.getElementById('univNameEng_id').value;
    univColor = document.getElementById('univColor_id').value;

    /* GETパラメータをURLに追加 */
    history.pushState('','','?univName=' + univName + '&univNameEng=' + univNameEng + '&univColor=' + univColor);

    drawImage();

    /* localStorageに配列を保存する処理 */
    let saveData = [univName, univNameEng, univColor, imageBase64]; // localStorageに保存する配列
    localStorage.setItem(localStorage.length, JSON.stringify(saveData)); // localStorageにJSONに変換した配列を保存（keyは現在のlocalStorageの数）

    drawHTML();
}

/** 画像をCanvasで描画する処理 **/
function drawImage() {
    /* Canvasの描写設定 */
    let canvas = document.getElementById('logoGenerator'); // id="logoGenerator"を取得
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 500, 500); // 描写するたびに初期化
    ctx.fillStyle = '#' + univColor; // ロゴの色指定、カラーコードを変数univColorから読み込む
    ctx.fillRect(50, 52, 86, 46); // ロゴ四角（上）
    ctx.fillRect(61, 109, 24, 24); // ロゴ四角（下）
    ctx.fillStyle = '#333333'; // 文字の色指定
    ctx.font = '50px Kiwi Maru'; // 漢字部分のフォント指定、フォントサイズ指定
    ctx.fillText(univName, 150, 95, 290); // 漢字部分の内容を変数univNameから読み込む
    ctx.font = '23px Source Code Pro'; // 英字部分のフォント指定、フォントサイズ指定
    ctx.fillText(univNameEng, 151, 128, 290); // 英字部分の内容を変数univNameから読み込む

    imageBase64 = canvas.toDataURL("image/png"); // 画像をbase64化して変数imageBase64に入れる

    /* Canvasにフォントが読み込まれないことがあるため、一秒後に再描写 */
    if (document.cookie < 1){ // 1以下の場合なので次回以降は2が設定されリロードしない
        window.setTimeout(
            function(){
                drawImage(); // リロード処理
            }, 1000); // 1000ミリ秒（1秒後）
        document.cookie = 100 + '; max-age=2'; // Cookieに100を設定、2秒後に破棄
    }
}

/** localStorageに保存した情報をHTMLとして書き出す処理 **/
function drawHTML() {
    /* localStorageの保存数の回数繰り返す */
    while (i < localStorage.length) {
        /* localStorageに関する処理 */
        let readData = JSON.parse(localStorage.getItem(i)); // localStorageから保存した情報の読み込み、JSONを配列に変換し直す

        /* HTMLに関する処理 */
        let newElement = document.createElement('div'); // 新規にdiv要素を作成
        newElement.innerHTML = ''
            + '<div class="drawHistory"><br>'
            + (i + 1) + '個目<br>'
            + '<img style="width:200px;height:80px;" src="' + readData[3] + '" alt=""><br>'
            + '単語: ' + readData[0] + '<br>'
            + '英字: ' + readData[1] + '<br>'
            + '色コード: #' + readData[2] + '<br>'
            + '<a href="./index.html?univName=' + readData[0] + '&univNameEng=' + readData[1] + '&univColor=' + readData[2] + '">編集する</a>'
            + '</div>';
        document.getElementById('dispHistory').prepend(newElement); // 作成したHTMLをid="dispHistory"の要素の前に追加する

        i++;
    }
}

/** 履歴全削除ボタンを押した際の処理 **/
function clearHistory() {
    window.localStorage.clear(); // localStorageを全削除
    window.location.reload(); // ページをリロード
}