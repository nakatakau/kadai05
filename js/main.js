// APIの総数を取得
async function getAPIData(URL) {
  // APIの取得
  const api = await fetch(URL);
  const api_obj = await api.json(); // JSONをオブジェクト化
  const data_array = await api_obj.objectIDs; //オブジェクトよりID数を取得
  return data_array;
}
// getAPILength(URL1).then(value => console.log(value)); で値の長さが帰ってくる

// シャッフル関数
async function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--){
    // 総数の後順よりidを取得
    let j = Math.floor(Math.random() * i);
    // i番目とj番目を入れ替え
    let tmp = array[j];
    array[j] = array[i];
    array[i] = tmp;
  }
  return array;
}

// APIのデータをｎ個取得して表示(降順)
async function insertAPI(URL2, id, n, a, b) {
  for (let i = 0; i < n+b; i++) {
    // i回目の処理
    let x = i + a;
    let get_api = await fetch(URL2 + '/' + id[x]);
    let obj = await get_api.json();
    let imageUrl = obj.primaryImageSmall.trim();
    // 画像の取得
    if (!(imageUrl == '')) {
      let title = obj.title;
      let obj_url = obj.objectURL;
      let id_a = "a" + id[x];
      const post_area = document.getElementById('post_area');
      let add_code = '<div class="art" id="' + id_a + '"><a href="' + obj_url + '" target="_blank"><p class = "obj-title">' + title + '</p><img class="obj-image" src="' + imageUrl + '"></a><i class="fas fa-star" id="' + obj_url + '|' + title + '|' + imageUrl + '|' + id[x] + '">LIKE</i></div>';
      post_area.insertAdjacentHTML('beforeend', add_code);
    } else {
      b++;
    }
    if (x == id.length) {
      break;
    }
    if ((n + b) - i == 1) {
      return x + 1;
    }
  }
}

// カテゴリーAPIを取得
async function get_category(URL3, target) {
  const category = await fetch(URL3);
  const cate_obj = await category.json();
  for (let i = 0; i < cate_obj.departments.length; i++) {
    const value = cate_obj.departments[i].departmentId;
    const name = cate_obj.departments[i].displayName;
    target.innerHTML += '<option value="' + value + '">' + name + '</option>';
  }
}
