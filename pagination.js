// select elemen
const element = document.querySelector(".pagination ul");
let totalPages = 10;
let page = 5;

//manggil function dengan passing parameters dan menambahnya ke dalam elemen  ul tag
element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page) {
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    // show next btn kalau page value>1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
      page - 1
    })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (page > 2) {
    // //kalau page value < 2, maka tambah 1 setelah previous btn
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      //jika page value > 3, maka tambahkan (...) setelah first li atau page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // brp banyak page atau li ditampilkan sebelum li saat ini
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // / brp banyak page atau li ditampilkan sebelum li saat ini
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //jika plength > dri totalPage makan continue
      continue;
    }
    if (plength == 0) {
      //jika plength=0 maka tambah +1 di plength value
      plength = plength + 1;
    }
    if (page == plength) {
      // jika page == plength maka assign active string di variabel active
      active = "active";
    } else {
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    //jika page value < totalPage-1 maka show li / page terakhir
    if (page < totalPages - 2) {
      //jika page value<totalPage-2, add (...) sebelum li/page terakhir
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    //show nextbtn kalau page value < totalPage
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
      page + 1
    })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag; //nambah tag li didalam tag ul
  return liTag; //return liTag
}
