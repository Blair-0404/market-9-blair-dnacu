// 우편번호 찾기 화면을 넣을 element
const element_layer_wrap = document.getElementById("layer-wrap");
const element_layer = document.getElementById("layer");
document.body;

export function closeDaumPostcode() {
  // iframe을 넣은 element를 안보이게 한다.
  element_layer_wrap.style.display = "none";
  document.body.style.overflow = "auto";
}

export function execDaumPostcode() {
  document.body.style.overflow = "hidden";
  new daum.Postcode({
    oncomplete: function (data) {
      // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.

        // document.getElementById("sample2_extraAddress").value = extraAddr;
      } else {
        // document.getElementById("sample2_extraAddress").value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      // document.querySelector("zip-code").value = data.zonecode;
      // document.querySelector("address-text").value = addr;
      const zipCodeInput = document.querySelector(".zip-code");
      const roadAddress = document.querySelector(".address-text");
      zipCodeInput.value = data.zonecode;
      roadAddress.value = data.roadAddress;

      // 커서를 상세주소 필드로 이동한다.
      document.querySelector(".address-detail-text").focus();

      // iframe을 넣은 element를 안보이게 한다.
      // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
      element_layer_wrap.style.display = "none";
    },
    width: "100%",
    height: "100%",
    maxSuggestItems: 5,
  }).embed(element_layer);

  // iframe을 넣은 element를 보이게 한다.
  element_layer_wrap.style.display = "block";

  // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
}
