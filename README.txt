MO Note（iPhone 用の記録アプリ）の入れ方

このフォルダの中身（index.html, sw.js, manifest.webmanifest, icon-*.png）を、
https で始まるURLに一度だけ置きます。置くのはプログラムだけで、記録した内容はiPhoneの中にだけ保存されます。

■ GitHub Pages に置く場合（無料）
1. https://github.com で無料アカウントを作る
2. 右上の「＋」→「New repository」。名前は mo-note、Public を選んで「Create repository」
3. 「uploading an existing file」をクリックし、このフォルダのファイルを全部ドラッグして「Commit changes」
4. 「Settings」→ 左の「Pages」→ Branch を「main」「/(root)」にして「Save」
5. 1〜2分後、https://（アカウント名）.github.io/mo-note/ で開けるようになる

■ iPhone に入れる
1. iPhone の Safari で上のURLを開く
2. 下の共有ボタン（□に↑）→「ホーム画面に追加」
3. ホーム画面の「MO Note」アイコンから起動する（一度起動すれば、以後は電波がなくても動きます）

■ ノートPC（Windows）に送る
「記録」タブ →「MO Spectrumへ送る」→ 共有メニューで、自分宛てのメール・OneDrive（「"ファイル"に保存」→ OneDrive）などを選ぶ。
ノートPCの MO Spectrum で「登録」タブ →「MO Note（iPhone）やメモから取り込む」→「ファイルを読み込む」でそのファイルを選び、「取り込む」を押す。

■ 注意
・記録はiPhoneの中だけにあります。iPhoneを機種変更する前に、すべて送っておいてください。
・アプリを更新したいときは、GitHub のファイルを新しいものに置き換え、sw.js の VERSION の数字を1つ上げてください。
