let provinces = []; 


async function layDanhSachTinh() {
  const res = await fetch("https://provinces.open-api.vn/api/?depth=3");
  provinces = await res.json();

  const citySelect = document.getElementById("city");
  provinces.forEach(function (p) {
    let opt = document.createElement("option");
    opt.value = p.code; 
    opt.textContent = p.name;
    citySelect.appendChild(opt);
  });
}

function chonTinh() {
  const cityCode = parseInt(document.getElementById("city").value);
  const districtSelect = document.getElementById("district");
  
  const wardSelect = document.getElementById("ward");



  districtSelect.innerHTML = "<option value=''>-- Quận/Huyện --</option>";
  wardSelect.innerHTML = "<option value=''>-- Phường/Xã --</option>";

  const city = provinces.find(c => c.code === cityCode);
  if (city) {
    city.districts.forEach(function (d) {
      let opt = document.createElement("option");
      opt.value = d.code; 
      opt.textContent = d.name;
      districtSelect.appendChild(opt);
    });
  }

  hienThiDiaChi();
}



function chonHuyen() {
  const cityCode = parseInt(document.getElementById("city").value);
  const districtCode = parseInt(document.getElementById("district").value);
  const wardSelect = document.getElementById("ward");

  wardSelect.innerHTML = "<option value=''>-- Phường/Xã --</option>";

  const city = provinces.find(c => c.code === cityCode);
  if (city) {
    const district = city.districts.find(d => d.code === districtCode);
    if (district) {
      district.wards.forEach(function (w) {
        let opt = document.createElement("option");
        opt.value = w.code; 
        opt.textContent = w.name;
        wardSelect.appendChild(opt);
      });
    }
  }

  hienThiDiaChi();
}

function hienThiDiaChi() {
  const city = document.getElementById("city");
  const district = document.getElementById("district");
  const ward = document.getElementById("ward");

  let diaChi = "";
  if (ward.value) diaChi += ward.options[ward.selectedIndex].text + ", ";
  if (district.value) diaChi += district.options[district.selectedIndex].text + ", ";
  if (city.value) diaChi += city.options[city.selectedIndex].text;

  document.getElementById("output").innerText = diaChi;
}

layDanhSachTinh();
